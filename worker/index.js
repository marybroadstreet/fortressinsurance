// Cloudflare Worker for fortressinsurancesolutions.com
// - Static, prerendered pages are served from ./dist by the assets binding.
// - /api/config   -> public settings for the browser (GA ID, reCAPTCHA site key)
// - /api/submit   -> form handler: honeypot -> reCAPTCHA -> Brevo
//
// Settings come from the Worker environment (Cloudflare dashboard → Settings →
// Variables and Secrets, or `wrangler secret put`). See README.md.
import { FORMS, HONEYPOT_FIELD, validateForm } from '../src/forms/schema.js';

const COMPANY = 'Fortress Insurance Solutions';
const MAX_BODY_BYTES = 32 * 1024;

const API_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'",
};

const json = (body, status = 200, extra = {}) =>
  new Response(JSON.stringify(body), { status, headers: { ...API_HEADERS, 'Cache-Control': 'no-store', ...extra } });

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/config') {
      if (request.method !== 'GET') return json({ ok: false }, 405, { Allow: 'GET' });
      return json(
        {
          gaId: /^G-[A-Z0-9]+$/i.test(env.GA_MEASUREMENT_ID || '') ? env.GA_MEASUREMENT_ID : null,
          adsId: /^AW-\d+$/i.test(env.GOOGLE_ADS_ID || '') ? env.GOOGLE_ADS_ID : null,
          recaptchaSiteKey: env.RECAPTCHA_SITE_KEY || null,
        },
        200,
        { 'Cache-Control': 'public, max-age=300' },
      );
    }

    if (url.pathname === '/api/submit') {
      if (request.method !== 'POST') return json({ ok: false, message: 'Method not allowed.' }, 405, { Allow: 'POST' });
      return handleSubmit(request, env, url);
    }

    if (url.pathname.startsWith('/api/')) return json({ ok: false, message: 'Not found.' }, 404);

    // Everything else: static assets (404s use dist/404.html with a real 404 status).
    return env.ASSETS.fetch(request);
  },
};

async function handleSubmit(request, env, url) {
  // Same-origin only
  const origin = request.headers.get('Origin');
  if (origin && origin !== url.origin) {
    console.log(JSON.stringify({ event: 'form_rejected', reason: 'cross_origin' }));
    return json({ ok: false, message: 'This form can only be sent from our website.' }, 403);
  }
  const len = Number(request.headers.get('Content-Length') || 0);
  if (len > MAX_BODY_BYTES) return json({ ok: false, message: 'Your message is too long. Please shorten it and try again.' }, 413);

  let data;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return json({ ok: false, message: 'Your message is too long. Please shorten it and try again.' }, 413);
    data = JSON.parse(text);
  } catch {
    return json({ ok: false, message: 'We couldn’t read that submission. Please try again.' }, 400);
  }
  if (!data || typeof data !== 'object') return json({ ok: false, message: 'Invalid submission.' }, 400);

  const formKey = typeof data.form === 'string' && FORMS[data.form] ? data.form : null;
  if (!formKey) return json({ ok: false, message: 'Unknown form.' }, 400);
  const page = typeof data.page === 'string' ? data.page.slice(0, 120) : '';
  const quoteType = typeof data.quoteType === 'string' ? data.quoteType.slice(0, 60) : '';

  // 1) Honeypot — pretend success, send nothing, log without personal data.
  if (typeof data[HONEYPOT_FIELD] === 'string' && data[HONEYPOT_FIELD].trim() !== '') {
    console.log(JSON.stringify({ event: 'form_honeypot_drop', form: formKey, page }));
    return json({ ok: true, message: successMessage(formKey) });
  }

  // 2) reCAPTCHA v2
  const token = typeof data.recaptchaToken === 'string' ? data.recaptchaToken : '';
  if (!env.RECAPTCHA_SECRET_KEY) {
    if (env.DEV_SKIP_RECAPTCHA === 'true') {
      console.log(JSON.stringify({ event: 'form_recaptcha_skipped_dev', form: formKey }));
    } else {
      console.log(JSON.stringify({ event: 'form_config_error', missing: 'RECAPTCHA_SECRET_KEY', form: formKey }));
      return json({ ok: false, message: 'Our form is temporarily unavailable. Please call us at (803) 272-4585.' }, 503);
    }
  } else {
    if (!token) return json({ ok: false, message: 'Please check the “I’m not a robot” box and try again.' }, 400);
    const verified = await verifyRecaptcha(token, env.RECAPTCHA_SECRET_KEY, request.headers.get('CF-Connecting-IP'));
    if (!verified.success) {
      console.log(JSON.stringify({ event: 'form_recaptcha_failed', form: formKey, codes: verified['error-codes'] || [] }));
      return json({ ok: false, message: 'We couldn’t verify the “I’m not a robot” check. Please check the box again and resend.' }, 400);
    }
  }

  // Server-side validation (authoritative)
  const { values, errors } = validateForm(formKey, data);
  if (Object.keys(errors).length) {
    console.log(JSON.stringify({ event: 'form_validation_failed', form: formKey, fields: Object.keys(errors) }));
    return json({ ok: false, message: 'Please fix the highlighted fields and try again.', errors }, 422);
  }

  // 3) Brevo
  if (!env.BREVO_API_KEY || !env.CONTACT_TO_EMAIL || !env.BREVO_SENDER_EMAIL) {
    console.log(JSON.stringify({ event: 'form_config_error', missing: ['BREVO_API_KEY', 'CONTACT_TO_EMAIL', 'BREVO_SENDER_EMAIL'].filter((k) => !env[k]), form: formKey }));
    return json({ ok: false, message: 'Our form is temporarily unavailable. Please call us at (803) 272-4585.' }, 503);
  }

  const first = oneLine(values.firstName);
  const last = oneLine(values.lastName);
  const subject = `${COMPANY} | Contact Form: ${first} ${last}`;
  const heading = formKey === 'contact' ? 'New contact form message' : `New ${quoteType ? quoteType + ' ' : ''}${FORMS[formKey].title.toLowerCase()}`;
  const rows = FORMS[formKey].fields.filter((fld) => values[fld.name]).map((fld) => [fld.label, values[fld.name]]);
  if (quoteType) rows.unshift(['Quote type', quoteType]);
  if (page) rows.push(['Sent from page', page]);

  const to = env.CONTACT_TO_EMAIL.split(',').map((e) => e.trim()).filter(Boolean).map((email) => ({ email }));
  const payload = {
    sender: { name: `${COMPANY} Website`, email: env.BREVO_SENDER_EMAIL },
    to,
    replyTo: { email: values.email, name: `${first} ${last}` },
    subject,
    htmlContent: emailHtml(heading, rows),
    textContent: `${heading}\n\n` + rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
  };

  let res;
  try {
    res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': env.BREVO_API_KEY, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.log(JSON.stringify({ event: 'form_brevo_error', form: formKey, status: 0, error: String(err).slice(0, 200) }));
    return json({ ok: false, message: 'We couldn’t send your message just now. Please try again or call (803) 272-4585.' }, 502);
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.log(JSON.stringify({ event: 'form_brevo_error', form: formKey, status: res.status, code: body.code || null }));
    return json({ ok: false, message: 'We couldn’t send your message just now. Please try again or call (803) 272-4585.' }, 502);
  }
  console.log(JSON.stringify({ event: 'form_sent', form: formKey, messageId: body.messageId || null }));
  return json({ ok: true, message: successMessage(formKey) });
}

function successMessage(formKey) {
  return formKey === 'contact'
    ? 'Thank you! Your message has been sent. We’ll get back to you within one business day.'
    : 'Thank you! Your quote request has been sent. An agent will reach out within one business day.';
}

async function verifyRecaptcha(token, secret, ip) {
  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set('remoteip', ip);
  try {
    const r = await fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'POST', body: form });
    return await r.json();
  } catch {
    return { success: false, 'error-codes': ['network-error'] };
  }
}

const oneLine = (s = '') => String(s).replace(/[\r\n]+/g, ' ').trim();
const esc = (s = '') => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function emailHtml(heading, rows) {
  const tr = rows
    .map(([k, v]) => `<tr><th align="left" style="padding:8px 12px;background:#f3f6f9;border-bottom:1px solid #e3e8ee;font:600 14px Arial,sans-serif;color:#1b2733;vertical-align:top;width:38%">${esc(k)}</th><td style="padding:8px 12px;border-bottom:1px solid #e3e8ee;font:14px Arial,sans-serif;color:#1b2733;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('');
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#ffffff"><h1 style="font:700 20px Arial,sans-serif;color:#0076BD;margin:0 0 16px">${esc(heading)}</h1><table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:640px;border:1px solid #e3e8ee">${tr}</table><p style="font:12px Arial,sans-serif;color:#5b6673;margin-top:16px">Sent from the ${esc(COMPANY)} website. Reply to this email to respond to the sender.</p></body></html>`;
}
