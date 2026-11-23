import { useEffect, useId, useRef, useState } from 'react';
import { FORMS, HONEYPOT_FIELD, validateField } from '../forms/schema.js';
import { getConfig, loadScript, track } from '../lib/runtime.js';
import { Icon } from './Icons.jsx';
import { BUSINESS } from '../data/site.js';

/* ---------- reCAPTCHA v2 (checkbox), loaded only when the form is near the viewport ---------- */
function useRecaptcha(formRef) {
  const holder = useRef(null);
  const widget = useRef(null);
  const [state, setState] = useState('idle'); // idle | loading | ready | unavailable

  useEffect(() => {
    const el = formRef.current;
    if (!el) return undefined;
    let cancelled = false;
    const start = async () => {
      if (widget.current !== null || cancelled) return;
      setState('loading');
      const { recaptchaSiteKey } = await getConfig();
      if (!recaptchaSiteKey) { if (!cancelled) setState('unavailable'); return; }
      try {
        await loadScript('https://www.google.com/recaptcha/api.js?render=explicit');
        window.grecaptcha.ready(() => {
          if (cancelled || widget.current !== null || !holder.current) return;
          widget.current = window.grecaptcha.render(holder.current, { sitekey: recaptchaSiteKey });
          setState('ready');
        });
      } catch {
        if (!cancelled) setState('unavailable');
      }
    };
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); start(); }
    }, { rootMargin: '400px' });
    io.observe(el);
    el.addEventListener('focusin', start, { once: true });
    return () => { cancelled = true; io.disconnect(); el.removeEventListener('focusin', start); };
  }, [formRef]);

  return {
    holder,
    state,
    token: () => (widget.current !== null && window.grecaptcha ? window.grecaptcha.getResponse(widget.current) : ''),
    reset: () => { if (widget.current !== null && window.grecaptcha) window.grecaptcha.reset(widget.current); },
  };
}

/* ---------- Field ---------- */
function Field({ field, value, error, onChange, onBlur, idPrefix, wide }) {
  const id = `${idPrefix}-${field.name}`;
  const errId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [field.hint && hintId, error && errId].filter(Boolean).join(' ') || undefined;
  const common = {
    id,
    name: field.name,
    value,
    required: field.required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
    autoComplete: field.autoComplete || 'off',
    onChange: (e) => onChange(field, e.target.value),
    onBlur: (e) => onBlur(field, e.target.value),
  };
  let control;
  if (field.type === 'textarea') control = <textarea {...common} rows={5} maxLength={field.max} />;
  else if (field.type === 'select') {
    control = (
      <select {...common}>
        <option value="">Select…</option>
        {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  } else {
    const typeMap = { email: 'email', tel: 'tel', date: 'date', zip: 'text', year: 'text' };
    control = (
      <input
        {...common}
        type={typeMap[field.type] || 'text'}
        maxLength={field.max}
        inputMode={field.type === 'zip' || field.type === 'year' ? 'numeric' : field.inputMode}
      />
    );
  }
  return (
    <div className={`field${wide || field.type === 'textarea' ? ' field--wide' : ''}${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>
        {field.label}
        {field.required ? <span className="field__req" aria-hidden="true"> *</span> : <span className="field__opt"> (optional)</span>}
      </label>
      {field.hint && <p className="field__hint" id={hintId}>{field.hint}</p>}
      {control}
      {error && <p className="field__error" id={errId}><Icon name="close" size={14} /> {error}</p>}
    </div>
  );
}

/* ---------- Honeypot (hidden with CSS, never type="hidden") ---------- */
function Honeypot({ value, onChange, idPrefix }) {
  return (
    <div className="hp-field" aria-hidden="true">
      <label htmlFor={`${idPrefix}-hp`}>Leave this field empty</label>
      <input
        id={`${idPrefix}-hp`}
        type="text"
        name={HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
        data-1p-ignore=""
        data-lpignore="true"
        data-bwignore=""
        data-form-type="other"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

const SECTIONS = {
  contact: [{ title: null, groups: [undefined] }],
  quote: [{ title: 'Your information', groups: [undefined] }],
  auto: [
    { title: 'Your information', groups: [undefined] },
    { title: 'Insurance history', groups: ['history'] },
    { title: 'Vehicles', groups: ['vehicle1', 'vehicle2', 'vehicle3'], repeat: 'vehicle' },
    { title: 'Drivers', groups: ['driver1', 'driver2', 'driver3'], repeat: 'driver' },
    { title: 'Anything else?', groups: ['extra'] },
  ],
};

/**
 * Data-driven form for contact + quote requests. Validates in the browser for
 * fast feedback; the Worker re-validates everything server-side.
 */
export function SmartForm({ formKey = 'contact', quoteType = '', submitLabel = 'Send Message', page }) {
  const def = FORMS[formKey];
  const idPrefix = useId().replace(/:/g, '');
  const formRef = useRef(null);
  const statusRef = useRef(null);
  const summaryRef = useRef(null);
  const recaptcha = useRecaptcha(formRef);
  const initial = Object.fromEntries(def.fields.map((f) => [f.name, f.defaultValue || '']));
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [hp, setHp] = useState('');
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [extra, setExtra] = useState({ vehicle: 1, driver: 1 });

  const visibleFields = def.fields.filter((f) => {
    const m = /^(vehicle|driver)(\d)$/.exec(f.group || '');
    return !m || Number(m[2]) <= extra[m[1]];
  });

  const onChange = (field, v) => {
    setValues((s) => ({ ...s, [field.name]: v }));
    if (errors[field.name]) setErrors((e) => ({ ...e, [field.name]: validateField(field, v) }));
  };
  const onBlur = (field, v) => {
    if (v) setErrors((e) => ({ ...e, [field.name]: validateField(field, v) }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status.type === 'sending') return;
    const errs = {};
    for (const f of visibleFields) {
      const msg = validateField(f, values[f.name]);
      if (msg) errs[f.name] = msg;
    }
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus({ type: 'invalid', message: '' });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    const token = recaptcha.token();
    if (recaptcha.state === 'ready' && !token) {
      setStatus({ type: 'error', message: 'Please check the “I’m not a robot” box, then send again.' });
      requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }
    setStatus({ type: 'sending', message: 'Sending…' });
    const payload = { form: formKey, quoteType, page: page || window.location.pathname, recaptchaToken: token, [HONEYPOT_FIELD]: hp };
    for (const f of visibleFields) payload[f.name] = values[f.name];
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        setStatus({ type: 'success', message: body.message });
        setValues(initial);
        setErrors({});
        recaptcha.reset();
        track('generate_lead', { form: formKey, quote_type: quoteType || undefined });
      } else {
        if (body.errors) setErrors(body.errors);
        recaptcha.reset();
        setStatus({ type: 'error', message: body.message || `Something went wrong. Please try again or call ${BUSINESS.phoneDisplay}.` });
      }
    } catch {
      setStatus({ type: 'error', message: `We couldn’t reach our server. Please check your connection, or call ${BUSINESS.phoneDisplay}.` });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const errorList = visibleFields.filter((f) => errors[f.name]);

  if (status.type === 'success') {
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={statusRef}>
        <span className="form-success__icon"><Icon name="check" size={28} /></span>
        <p className="form-success__title">Message sent</p>
        <p>{status.message}</p>
        <button type="button" className="btn btn--outline" onClick={() => setStatus({ type: 'idle', message: '' })}>Send another message</button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="form" noValidate onSubmit={onSubmit} aria-describedby={`${idPrefix}-reqnote`}>
      <p className="form__note" id={`${idPrefix}-reqnote`}>Fields marked with <span aria-hidden="true">*</span><span className="sr-only">an asterisk</span> are required.</p>

      {status.type === 'invalid' && errorList.length > 0 && (
        <div className="form__summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <p><strong>Please fix {errorList.length === 1 ? 'this field' : `these ${errorList.length} fields`}:</strong></p>
          <ul>
            {errorList.map((f) => (
              <li key={f.name}><a href={`#${idPrefix}-${f.name}`}>{f.label}: {errors[f.name]}</a></li>
            ))}
          </ul>
        </div>
      )}

      {SECTIONS[formKey].map((section) => {
        const groups = section.repeat ? section.groups.slice(0, extra[section.repeat]) : section.groups;
        return (
          <fieldset className="form__section" key={section.title || 'main'}>
            {section.title && <legend className="form__legend">{section.title}</legend>}
            {groups.map((g, gi) => (
              <div className="form__group" key={g || 'base'}>
                {section.repeat && <p className="form__sub">{section.repeat === 'vehicle' ? 'Vehicle' : 'Driver'} {gi + 1}{gi === 0 ? ' (primary)' : ''}</p>}
                <div className="form__grid">
                  {def.fields.filter((f) => f.group === g).map((f) => (
                    <Field key={f.name} field={f} value={values[f.name]} error={errors[f.name]} onChange={onChange} onBlur={onBlur} idPrefix={idPrefix} />
                  ))}
                </div>
              </div>
            ))}
            {section.repeat && extra[section.repeat] < 3 && (
              <button type="button" className="btn btn--outline btn--sm" onClick={() => setExtra((x) => ({ ...x, [section.repeat]: x[section.repeat] + 1 }))}>
                + Add another {section.repeat}
              </button>
            )}
          </fieldset>
        );
      })}

      <Honeypot value={hp} onChange={setHp} idPrefix={idPrefix} />

      <div className="form__captcha">
        <div ref={recaptcha.holder} />
        {recaptcha.state === 'unavailable' && <p className="field__hint">Spam check unavailable in this preview.</p>}
      </div>

      <div className="form__footer">
        <button type="submit" className="btn btn--primary btn--lg" disabled={status.type === 'sending'}>
          {status.type === 'sending' ? 'Sending…' : submitLabel} <Icon name="arrow" size={18} />
        </button>
        <p className="form__privacy">We’ll only use your information to respond to your request.</p>
      </div>

      <div className="form__status" role="status" aria-live="polite" tabIndex={-1} ref={statusRef}>
        {status.type === 'error' && <p className="form__error"><Icon name="close" size={16} /> {status.message}</p>}
        {status.type === 'sending' && <p className="sr-only">{status.message}</p>}
      </div>
    </form>
  );
}
