// schema.org JSON-LD builders. One @graph per page; the business is defined
// once per graph and referenced elsewhere by @id.
import { BUSINESS, SITE_URL } from './site.js';

export const BIZ_ID = `${SITE_URL}/#business`;
export const SITE_ID = `${SITE_URL}/#website`;

export function businessNode() {
  return {
    '@type': 'InsuranceAgency',
    '@id': BIZ_ID,
    name: BUSINESS.name,
    slogan: BUSINESS.tagline,
    url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png`, width: 600, height: 202 },
    image: `${SITE_URL}/images/og-fortress-insurance.jpg`,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
    hasMap: BUSINESS.mapUrl,
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
    ],
    areaServed: [
      { '@type': 'City', name: 'Camden, SC' },
      { '@type': 'State', name: 'South Carolina' },
    ],
    priceRange: '$$',
    sameAs: [BUSINESS.facebook],
  };
}

export const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: `${SITE_URL}/`,
  name: BUSINESS.name,
  publisher: { '@id': BIZ_ID },
  inLanguage: 'en-US',
});

export const webPageNode = ({ path, title, description, type = 'WebPage' }) => ({
  '@type': type,
  '@id': `${SITE_URL}${path}#webpage`,
  url: `${SITE_URL}${path}`,
  name: title,
  description,
  isPartOf: { '@id': SITE_ID },
  about: { '@id': BIZ_ID },
  inLanguage: 'en-US',
  ...(path !== '/' ? { breadcrumb: { '@id': `${SITE_URL}${path}#breadcrumb` } } : {}),
});

export const breadcrumbNode = (path, crumbs) => ({
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}${path}#breadcrumb`,
  itemListElement: crumbs.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    ...(c.href ? { item: `${SITE_URL}${c.href === '/' ? '/' : c.href}` } : { item: `${SITE_URL}${path}` }),
  })),
});

export const serviceNode = ({ path, name, description, list }) => ({
  '@type': 'Service',
  '@id': `${SITE_URL}${path}#service`,
  name,
  serviceType: name,
  description,
  url: `${SITE_URL}${path}`,
  provider: { '@id': BIZ_ID },
  areaServed: [
    { '@type': 'City', name: 'Camden, SC' },
    { '@type': 'State', name: 'South Carolina' },
  ],
  ...(list?.length ? { hasOfferCatalog: { '@type': 'OfferCatalog', name, itemListElement: list.map((l) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: l } })) } } : {}),
});

export const faqNode = (path, faqs) => ({
  '@type': 'FAQPage',
  '@id': `${SITE_URL}${path}#faq`,
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const reviewNodes = (reviews) =>
  reviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.author },
    reviewBody: r.text,
    itemReviewed: { '@id': BIZ_ID },
  }));

export const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': nodes.flat().filter(Boolean) });
