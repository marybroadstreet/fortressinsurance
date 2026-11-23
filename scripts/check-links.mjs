// Crawls the site and reports broken internal links/assets and dead external links.
// Usage: npm run build && npx wrangler dev   (in one terminal)
//        node scripts/check-links.mjs [baseUrl] [--external]
const base = (process.argv.find((a) => a.startsWith('http')) || 'http://127.0.0.1:8787').replace(/\/$/, '');
const checkExternal = process.argv.includes('--external');

const seen = new Map(); // url -> status
const external = new Map(); // url -> Set(pages)
const queue = ['/'];
const problems = [];

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
for (const m of sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)) queue.push(m[1] || '/');

function collect(html) {
  const urls = new Set();
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) urls.add(m[1]);
  for (const m of html.matchAll(/\s(?:srcSet|srcset|imageSrcSet)="([^"]+)"/g)) m[1].split(',').forEach((s) => urls.add(s.trim().split(/\s+/)[0]));
  for (const m of html.matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) urls.add(m[1]);
  return [...urls];
}

async function status(url) {
  const res = await fetch(url, { redirect: 'manual' });
  return { code: res.status, type: res.headers.get('content-type') || '', body: (res.headers.get('content-type') || '').includes('text') ? await res.text() : '' };
}

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  const { code, type, body } = await status(base + path);
  seen.set(path, code);
  if (code !== 200) continue;
  if (!type.includes('html') && !type.includes('css')) continue;
  for (const raw of collect(body)) {
    if (/^(mailto:|tel:|#|data:)/.test(raw)) continue;
    let u;
    try { u = new URL(raw, base + path); } catch { problems.push(`Bad URL "${raw}" on ${path}`); continue; }
    if (u.origin === base || u.origin === 'https://fortressinsurancesolutions.com') {
      const p = u.pathname;
      if (!seen.has(p) && !queue.includes(p)) queue.push(p);
      if (!external.has(`ref:${p}`)) external.set(`ref:${p}`, new Set());
      external.get(`ref:${p}`).add(path);
    } else if (u.protocol.startsWith('http')) {
      if (!external.has(u.href)) external.set(u.href, new Set());
      external.get(u.href).add(path);
    }
  }
  // CSS files referenced from HTML
}

for (const [p, code] of seen) {
  if (code !== 200) {
    const from = [...(external.get(`ref:${p}`) || [])].slice(0, 3).join(', ') || 'sitemap';
    problems.push(`${code} ${p}  (linked from ${from})`);
  }
}

console.log(`Checked ${seen.size} internal URLs on ${base}`);
if (checkExternal) {
  const ext = [...external.keys()].filter((k) => !k.startsWith('ref:'));
  console.log(`Checking ${ext.length} external URLs...`);
  for (const url of ext) {
    if (/googletagmanager|google\.com\/recaptcha/.test(url)) continue;
    let code = 0;
    try {
      const r = await fetch(url, { method: 'GET', redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (link checker)' }, signal: AbortSignal.timeout(15000) });
      code = r.status;
    } catch (e) { code = `ERR ${e.cause?.code || e.name}`; }
    const ok = typeof code === 'number' && code < 400;
    console.log(`${ok ? 'ok ' : 'BAD'} ${code} ${url}`);
    if (!ok) problems.push(`External ${code} ${url} (on ${[...external.get(url)].slice(0, 2).join(', ')})`);
  }
}

if (problems.length) {
  console.log(`\n${problems.length} problem(s):\n` + problems.join('\n'));
  process.exitCode = 1;
} else {
  console.log('No broken links found.');
}
