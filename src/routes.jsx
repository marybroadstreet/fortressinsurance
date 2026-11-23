import Home from './pages/Home.jsx';
import { ProductPage, QuotePage, GetQuotePage } from './pages/Coverage.jsx';
import { AboutPage, ContactPage, ReviewsPage, PortalPage, AccessibilityPage, NotFoundPage } from './pages/Info.jsx';
import { PRODUCTS, QUOTES } from './data/site.js';

/** Every prerendered page. `priority` feeds sitemap.xml. */
export const ROUTES = [
  { path: '/', render: () => <Home />, priority: '1.0' },
  ...PRODUCTS.map((p) => ({ path: p.path, render: () => <ProductPage product={p} />, priority: '0.9' })),
  { path: '/get-a-quote', render: () => <GetQuotePage />, priority: '0.8' },
  ...QUOTES.map((q) => ({ path: q.path, render: () => <QuotePage quote={q} />, priority: '0.7' })),
  { path: '/about-us', render: () => <AboutPage />, priority: '0.6' },
  { path: '/contact-us', render: () => <ContactPage />, priority: '0.7' },
  { path: '/reviews', render: () => <ReviewsPage />, priority: '0.5' },
  { path: '/secure-customer-service-portal', render: () => <PortalPage />, priority: '0.6' },
  { path: '/accessibility', render: () => <AccessibilityPage />, priority: '0.3' },
  { path: '/404', render: () => <NotFoundPage />, sitemap: false },
];

export function findRoute(path) {
  return ROUTES.find((r) => r.path === path) || ROUTES.find((r) => r.path === '/404');
}
