// Checks every prerendered page in ./dist for title/description length and
// uniqueness, one <h1>, canonical, OG/Twitter tags, lang, and a single valid
// JSON-LD @graph. Run after `npm run build`: node scripts/audit-seo.mjs
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.name.endsWith('.html')) yield p;
  }
}
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const titles = new Map();
const descs = new Map();
let issues = 0;
for await (const file of walk(dist)) {
  const rel = '/' + path.relative(dist, file).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\.html$/, '');
  const html = await readFile(file, 'utf8');
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] || '');
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || '');
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const notes = [];
  if (title.length < 30 || title.length > 65) notes.push(`title ${title.length} chars`);
  if (desc.length < 120 || desc.length > 165) notes.push(`description ${desc.length} chars`);
  if (h1 !== 1) notes.push(`${h1} h1`);
  if (!/<html lang="en-US"/.test(html)) notes.push('no lang');
  const is404 = rel === '/404';
  if (!is404 && !/<link rel="canonical"/.test(html)) notes.push('no canonical');
  if (!/property="og:title"/.test(html) || !/name="twitter:card"/.test(html)) notes.push('no OG/Twitter');
  if (!is404) {
    if (ld.length !== 1) notes.push(`${ld.length} JSON-LD blocks`);
    else {
      try {
        const g = JSON.parse(ld[0][1].replace(/\\u003c/g, '<'));
        const types = g['@graph'].map((n) => n['@type']);
        if (!types.includes('InsuranceAgency')) notes.push('no InsuranceAgency');
        if (rel !== '/' && !types.includes('BreadcrumbList')) notes.push('no BreadcrumbList');
        notes.push(`schema: ${[...new Set(types)].join(', ')}`);
      } catch (e) { notes.push('INVALID JSON-LD'); }
    }
  }
  if (titles.has(title)) notes.push(`duplicate title with ${titles.get(title)}`);
  if (descs.has(desc)) notes.push(`duplicate description with ${descs.get(desc)}`);
  titles.set(title, rel); descs.set(desc, rel);
  const bad = notes.filter((n) => !n.startsWith('schema:'));
  issues += bad.length;
  console.log(`${bad.length ? '!!' : 'ok'} ${rel.padEnd(42)} ${notes.join(' | ')}`);
}
console.log(issues ? `\n${issues} issue(s)` : '\nAll pages pass.');
