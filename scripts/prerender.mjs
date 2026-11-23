// Prerenders every route to static HTML in ./dist and writes sitemap.xml.
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const SITE_URL = 'https://fortressinsurancesolutions.com';

const manifest = JSON.parse(await readFile(path.join(dist, '.vite/manifest.json'), 'utf8'));
const entry = manifest['src/entry-client.jsx'];
if (!entry) throw new Error('Client entry missing from Vite manifest');
const cssFiles = new Set(entry.css || []);
for (const chunk of Object.values(manifest)) {
  if (chunk.file?.endsWith('.css')) cssFiles.add(chunk.file);
  (chunk.css || []).forEach((c) => cssFiles.add(c));
}
if (!cssFiles.size) throw new Error('No CSS found in Vite manifest');
const assets = { js: `/${entry.file}`, css: [...cssFiles].map((c) => `/${c}`) };

const { render, ROUTES } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);

let count = 0;
for (const route of ROUTES) {
  const html = render(route.path, assets);
  const file = route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`;
  const out = path.join(dist, file);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
  count++;
}

const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.filter((r) => r.sitemap !== false)
  .map((r) => `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${r.priority || '0.5'}</priority>\n  </url>`)
  .join('\n');
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

// Don't publish build internals
await rm(path.join(dist, '.vite'), { recursive: true, force: true });
await rm(path.resolve('dist-ssr'), { recursive: true, force: true });

console.log(`Prerendered ${count} pages + sitemap.xml (${assets.js})`);
