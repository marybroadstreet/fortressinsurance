// Subsets the self-hosted fonts to the characters the site uses (Basic Latin +
// typographic punctuation) and trims the variable axes to the ranges in use.
// Run: node scripts/subset-fonts.mjs   (outputs are committed to public/fonts)
import subsetFont from 'subset-font';
import { readFile, writeFile } from 'node:fs/promises';

const chars =
  Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join('') + // printable ASCII
  ' ’‘“”–—•·…©®™°×éñ';

const jobs = [
  {
    src: 'node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2',
    out: 'public/fonts/archivo-subset.woff2',
    axes: { wght: { min: 400, max: 850 }, wdth: { min: 100, max: 125 } },
  },
  {
    src: 'node_modules/@fontsource/libre-caslon-text/files/libre-caslon-text-latin-400-italic.woff2',
    out: 'public/fonts/libre-caslon-italic-subset.woff2',
  },
];

for (const j of jobs) {
  const input = await readFile(j.src);
  const output = await subsetFont(input, chars, { targetFormat: 'woff2', ...(j.axes ? { variationAxes: j.axes } : {}) });
  await writeFile(j.out, output);
  console.log(`${j.out}: ${(input.length / 1024).toFixed(1)} KB -> ${(output.length / 1024).toFixed(1)} KB`);
}
