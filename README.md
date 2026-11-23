# Fortress Insurance Solutions — website

Redesign of [fortressinsurancesolutions.com](https://fortressinsurancesolutions.com): React 19, fully prerendered
to static HTML at build time, served by a Cloudflare Worker that also handles the contact and quote forms.

- **Fast:** every page is static HTML; React loads only after the page has painted, then hydrates the
  interactive parts (menus, hero slideshow, forms). WebP images, self-hosted subset fonts.
- **Secure:** strict security headers (`public/_headers`), all secrets live in the Worker, every form is
  validated server-side (honeypot → reCAPTCHA v2 → Brevo).
- **SEO:** unique title/description/canonical/OG tags per page, one JSON-LD `@graph` per page
  (`InsuranceAgency`, `WebSite`, `BreadcrumbList`, `Service`, `FAQPage`, `Review`), `sitemap.xml`, `robots.txt`,
  301s for old URLs. All product and quote URLs from the old site were kept.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run build` | Build to `./dist` (Vite client build → SSR build → prerender every page + sitemap) |
| `npm run dev` | Build, then run the site + Worker locally at http://localhost:8787 (`wrangler dev`) |
| `npm run deploy` | Build and deploy with Wrangler |
| `npm run check` | Crawl a running local site for broken links (add `--external` to test outside links) |
| `node scripts/audit-seo.mjs` | Check titles, descriptions, H1s, canonicals and JSON-LD on every built page |
| `npm run images -- <folder>` | Re-create the WebP images from original files (see `scripts/optimize-images.mjs`) |
| `npm run fonts` | Re-subset the self-hosted fonts |

## Cloudflare setup (Workers Builds from GitHub)

1. Workers & Pages → Create → Import a repository → this repo.
2. **Build command:** `npm run build` **Deploy command:** `npx wrangler deploy`
3. The Worker name must match `name` in `wrangler.jsonc` (currently **`fortressinsurance`** — change one or the other so they match).
4. `assets.directory` in `wrangler.jsonc` is `./dist`, which is what `npm run build` produces. If you change the build output, change both together.
5. Add the settings below, then add the custom domain under Settings → Domains & Routes.

Before pushing config changes, run `npx wrangler deploy --dry-run` and confirm it reads `./dist`.

### Settings (Cloudflare → Worker → Settings → Variables and Secrets)

`wrangler.jsonc` has `keep_vars: true` and **no** `vars` block, so values you set in the dashboard are never
overwritten by a deploy.

| Name | Type | Purpose |
|---|---|---|
| `BREVO_API_KEY` | **Secret** | Brevo transactional email API key |
| `RECAPTCHA_SECRET_KEY` | **Secret** | Google reCAPTCHA **v2 (checkbox)** secret key |
| `RECAPTCHA_SITE_KEY` | Variable | reCAPTCHA v2 site key (sent to the browser by `/api/config`) |
| `GA_MEASUREMENT_ID` | Variable | Google Analytics 4 ID, `G-XXXXXXXXXX` |
| `CONTACT_TO_EMAIL` | Variable | Who receives form notifications (comma-separate several) |
| `BREVO_SENDER_EMAIL` | Variable | Verified Brevo sender **on fortressinsurancesolutions.com** (with Brevo's DKIM records on the domain) |
| `GOOGLE_ADS_ID` | Variable (optional) | Google Ads tag `AW-…`; the old site used `AW-970237936` |

Secrets can also be set from a terminal: `npx wrangler secret put BREVO_API_KEY`.

For local development copy `.dev.vars.example` to `.dev.vars` (git-ignored). `DEV_SKIP_RECAPTCHA=true` lets the
form run locally without reCAPTCHA keys — never set it in Cloudflare.

## Forms

All forms post JSON to `/api/submit` (see `worker/index.js`). Field definitions and validation rules live in
`src/forms/schema.js` and are shared by the browser and the Worker.

Order of checks: same-origin → **honeypot** (`fis_hp_7q`; silently "succeeds" and logs `form_honeypot_drop`) →
**reCAPTCHA v2** `siteverify` → server-side validation → **Brevo** `smtp/email`.

- Subject: `Fortress Insurance Solutions | Contact Form: {First} {Last}`; reply-to is the visitor.
- Every outcome is logged (`form_sent` with Brevo `messageId`, `form_brevo_error` with status,
  `form_recaptcha_failed`, `form_honeypot_drop`, `form_validation_failed`, `form_config_error`).
  View them in Cloudflare → Workers → fortressinsurance → Observability → Logs.

## Google Analytics

GA4 loads once per page, after the page is idle, from the ID in `GA_MEASUREMENT_ID` (served by `/api/config`).
The old Universal Analytics tag (`UA-183631690-1`) has been removed. If Google Tag Manager is added later, don't
also set `GA_MEASUREMENT_ID`, or GA will load twice.

## Project layout

```
src/
  data/site.js        Business info, coverage pages, quote pages, slides, reviews, carriers, FAQ
  data/schema.js      JSON-LD builders
  forms/schema.js     Form fields + validation (shared with the Worker)
  components/         Layout (header/footer/mobile bar), Hero, Forms, Seo, UI pieces
  pages/              Home, Coverage (product, quote, quote hub), Info (about, contact, reviews, portal, accessibility, 404)
  routes.jsx          Every prerendered URL
  Document.jsx        The full HTML document
  entry-client.jsx    Tiny bootstrap; loads hydrate.jsx after first paint / first interaction
  entry-server.jsx    Used by scripts/prerender.mjs
worker/index.js       Cloudflare Worker: /api/config, /api/submit, everything else → static assets
public/_headers       Security + cache headers
public/_redirects     301s from old URLs
```

To change text, phone numbers, hours, reviews, or carriers, edit `src/data/site.js` and rebuild.

## Redirects from the old site

Kept as-is (no redirect needed): all `/products/…`, `/insurance-solutions/commercial`, every quote form URL,
`/about-us`, `/contact-us`, `/reviews`, `/secure-customer-service-portal`.
301s (`public/_redirects`): `/home`, `/home-0`, `/node/*` → `/`; `/home-insurance` →
`/homeowners-insurance-request-quote`; `/life-insurance-quote` → `/life-insurance`; `/homeowner` →
`/products/homeowners-insurance`; `/contact-us-confirmation` → `/contact-us`.
Check Google Search Console for any other old URLs reporting 404s after launch.

## Still needed before launch

- reCAPTCHA v2 site + secret keys, Brevo API key, sender address, notification address, GA4 Measurement ID.
- Confirm the Worker name in Cloudflare matches `wrangler.jsonc`.
- Confirm the business name, address and phone match the Google Business Profile exactly, and that the map
  coordinates in `src/data/site.js` are the office's exact location.
- Brevo DKIM/SPF records on fortressinsurancesolutions.com.
