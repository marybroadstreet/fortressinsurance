import { SITE_URL, BUSINESS } from '../data/site.js';

// Per-page metadata. React 19 hoists <title>, <meta> and <link> into <head>
// during prerendering, so every page ships its own tags in the HTML.
export default function Seo({ title, description, path, image = '/images/og-fortress-insurance.jpg', noindex = false, jsonLd }) {
  const url = `${SITE_URL}${path}`;
  const img = `${SITE_URL}${image}`;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : <link rel="canonical" href={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={BUSINESS.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="A family standing in front of their home" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      )}
    </>
  );
}
