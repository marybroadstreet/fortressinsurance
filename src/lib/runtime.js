// Browser-only helpers: public config from the Worker, script loading, analytics.

let configPromise;
export function getConfig() {
  if (!configPromise) {
    configPromise = fetch('/api/config', { credentials: 'same-origin' })
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({}));
  }
  return configPromise;
}

const loaded = new Map();
export function loadScript(src) {
  if (!loaded.has(src)) {
    loaded.set(src, new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    }));
  }
  return loaded.get(src);
}

/** GA4 (and optional Google Ads) — loaded once, after the page is idle, so it never blocks rendering. */
export function initAnalytics() {
  if (window.__fisAnalytics) return;
  window.__fisAnalytics = true;
  const start = async () => {
    const { gaId, adsId } = await getConfig();
    const first = gaId || adsId;
    if (!first) return;
    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line prefer-rest-params
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    if (gaId) window.gtag('config', gaId);
    if (adsId) window.gtag('config', adsId);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(first)}`).catch(() => {});
  };
  const idle = () => ('requestIdleCallback' in window ? requestIdleCallback(start, { timeout: 4000 }) : setTimeout(start, 2000));
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
}

export function track(event, params) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', event, params);
}
