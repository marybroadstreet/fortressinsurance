// One-time image pipeline: converts the original images pulled from the
// current fortressinsurancesolutions.com into correctly sized WebP files in
// public/images. Run with: node scripts/optimize-images.mjs <source-folder>
// The outputs are committed, so this only needs re-running when images change.
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const src = process.argv[2];
if (!src) {
  console.error('Usage: node scripts/optimize-images.mjs <folder with original images>');
  process.exit(1);
}
const out = path.resolve('public/images');
const pub = path.resolve('public');
await mkdir(out, { recursive: true });

const webp = (file, name, width, opts = {}) =>
  sharp(path.join(src, file))
    .resize({ width, withoutEnlargement: true, ...(opts.resize || {}) })
    .webp({ quality: opts.quality ?? 72, effort: 6 })
    .toFile(path.join(out, `${name}-${width}.webp`));

const jobs = [];

// Hero slides (1600x800 originals)
for (const n of ['home', 'auto', 'commercial', 'farm', 'boat', 'motorcycle', 'rv', 'classic-car']) {
  for (const w of [1600, 1100, 800, 640]) jobs.push(webp(`hero-${n}.png`, `hero-${n}`, w, { quality: 68 }));
}
// Product photos
for (const n of ['auto', 'home', 'recreational', 'farm', 'commercial', 'life', 'pet']) {
  for (const w of [800, 480]) jobs.push(webp(`product-${n}.png`, `product-${n}`, w));
}
// Line icons (shield style) — displayed ~64-80px, keep 2x
for (const n of ['travel', 'auto', 'home', 'farm', 'commercial', 'recreational', 'life', 'pet']) {
  jobs.push(webp(`icon-${n}.png`, `icon-${n}`, 164, { quality: 85 }));
}
// Carrier logos
for (const n of ['progressive', 'nationwide', 'travelers', 'aegis', 'geico', 'american-modern', 'hartford',
  'liberty-mutual', 'foremost', 'us-assure', 'hagerty', 'national-general']) {
  jobs.push(webp(`carrier-${n}.png`, `carrier-${n}`, 250, { quality: 85 }));
}
jobs.push(webp('carrier-safeco.png', 'carrier-slide', 250, { quality: 85 })); // file on old site was named safeco_slide.png; logo is Slide Insurance
jobs.push(webp('carrier-more.png', 'carrier-universal', 250, { quality: 85 })); // 'fortress insurance carriers.png' = Universal Property & Casualty
// Misc photos
for (const w of [960, 560]) {
  jobs.push(webp('umbrella.png', 'umbrella', w));
  jobs.push(webp('home-agents.png', 'home-agents', w));
  jobs.push(webp('about-team.png', 'about-team', Math.min(w, 600)));
}
for (const w of [1400, 800]) jobs.push(webp('about-office.jpg', 'about-office', w));
jobs.push(webp('map.png', 'map', 343, { quality: 85 }));

// Logo (transparent original is 7193x2423)
for (const w of [720, 360]) jobs.push(webp('logo-site.png', 'logo', w, { quality: 90 }));
jobs.push(sharp(path.join(src, 'logo-site.png')).resize({ width: 600 }).png({ compressionLevel: 9 }).toFile(path.join(out, 'logo.png')));

// Social share image 1200x630
jobs.push(sharp(path.join(src, 'hero-home.png')).resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(out, 'og-fortress-insurance.jpg')));

await Promise.all(jobs);

// Favicons: the tower emblem is the left square of the logo
const meta = await sharp(path.join(src, 'logo-site.png')).metadata();
const emblem = () => sharp(path.join(src, 'logo-site.png')).extract({ left: 0, top: 0, width: meta.height, height: meta.height });
await emblem().resize(512, 512).png().toFile(path.join(pub, 'icon-512.png'));
await emblem().resize(192, 192).png().toFile(path.join(pub, 'icon-192.png'));
await emblem().resize(180, 180).flatten({ background: '#ffffff' }).png().toFile(path.join(pub, 'apple-touch-icon.png'));
const png32 = await emblem().resize(32, 32).png().toBuffer();
await writeFile(path.join(pub, 'favicon-32.png'), png32);
// favicon.ico containing a single PNG image
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14); header.writeUInt32LE(22, 18);
await writeFile(path.join(pub, 'favicon.ico'), Buffer.concat([header, png32]));

console.log(`Done: ${jobs.length} images written to ${out}`);
