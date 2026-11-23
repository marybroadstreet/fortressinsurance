// Tiny bootstrap: every page is fully prerendered, so React (and hydration)
// loads only after the page has painted and finished loading — or sooner, the
// moment the visitor starts interacting. This keeps first paint (and LCP)
// free of JavaScript work.
import { initAnalytics } from './lib/runtime.js';
import './styles.css';

let started = false;
const events = ['pointerdown', 'keydown', 'touchstart', 'focusin', 'scroll'];

function start() {
  if (started) return;
  started = true;
  events.forEach((e) => window.removeEventListener(e, start, true));
  import('./hydrate.jsx');
}
events.forEach((e) => window.addEventListener(e, start, { capture: true, passive: true, once: true }));

const firstPaint = new Promise((resolve) => {
  setTimeout(resolve, 3000); // fallback for browsers without paint timing
  try {
    const po = new PerformanceObserver((list) => {
      if (list.getEntriesByName('first-contentful-paint').length) { po.disconnect(); resolve(); }
    });
    po.observe({ type: 'paint', buffered: true });
  } catch {
    resolve();
  }
});
const loaded = new Promise((resolve) => {
  if (document.readyState === 'complete') resolve();
  else window.addEventListener('load', resolve, { once: true });
});
Promise.all([firstPaint, loaded]).then(() => setTimeout(start, 50));

initAnalytics();
