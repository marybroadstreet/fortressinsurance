import Layout from './components/Layout.jsx';
import { findRoute } from './routes.jsx';

/**
 * The full HTML document. Rendered to static HTML at build time and hydrated
 * in the browser with the same props (read from the #__fis JSON block).
 */
export default function Document({ path, assets }) {
  const route = findRoute(path);
  const data = JSON.stringify({ path, assets }).replace(/</g, '\\u003c');
  return (
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0076BD" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preload" href="/fonts/archivo-subset.woff2" as="font" type="font/woff2" crossOrigin="" />
        {assets.css.map((href) => <link key={href} rel="stylesheet" href={href} />)}
        <script type="module" src={assets.js} fetchPriority="low" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <Layout path={path}>{route.render()}</Layout>
        <script type="application/json" id="__fis" dangerouslySetInnerHTML={{ __html: data }} />
      </body>
    </html>
  );
}
