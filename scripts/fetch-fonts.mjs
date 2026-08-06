#!/usr/bin/env node
/**
 * Fetches the self-hosted font subsets if they are not already present.
 *
 * The deployed site serves these from our own origin — there is no runtime
 * dependency on any font CDN (IA §19, Q4). This script exists only so a clean
 * build environment can obtain the files; locally they are committed.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'fonts');
mkdirSync(DIR, { recursive: true });

const FONTS = [
  ['cinzel-400.woff2', 'https://fonts.gstatic.com/s/cinzel/v26/8vIJ7ww63mVu7gt79mT7.woff2'],
  ['cormorant-300.woff2', 'https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2'],
  ['amiri-400.woff2', 'https://fonts.gstatic.com/s/amiri/v30/J7aRnpd8CGxBHpUrtLMA7w.woff2'],
  ['amiri-700.woff2', 'https://fonts.gstatic.com/s/amiri/v30/J7acnpd8CGxBHp2VkaY6zp5yGw.woff2'],
  ['plex-arabic-400.woff2', 'https://fonts.gstatic.com/s/ibmplexsansarabic/v15/Qw3CZRtWPQCuHme67tEYUIx3Kh0PHR9N6Ys43PWrfQ.woff2'],
  ['plex-arabic-500.woff2', 'https://fonts.gstatic.com/s/ibmplexsansarabic/v15/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YPO_-CRXMR5Kw.woff2'],
  ['plex-arabic-600.woff2', 'https://fonts.gstatic.com/s/ibmplexsansarabic/v15/Qw3NZRtWPQCuHme67tEYUIx3Kh0PHR9N6YPi-OCRXMR5Kw.woff2'],
  ['plex-sans-400.woff2', 'https://fonts.gstatic.com/s/ibmplexsans/v23/zYXzKVElMYYaJe8bpLHnCwDKr932-G7dytD-Dmu1syxeKYY.woff2'],
  ['source-serif-400.woff2', 'https://fonts.gstatic.com/s/sourceserif4/v14/vEFI2_tTDB4M7-auWDN0ahZJW1gb8tc.woff2']
];

let fetched = 0;
for (const [name, url] of FONTS) {
  const dest = join(DIR, name);
  if (existsSync(dest)) continue;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) Chrome/126' } });
  if (!res.ok) throw new Error(`font fetch failed: ${name} ${res.status}`);
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  fetched++;
}
console.log(fetched ? `fetched ${fetched} font file(s)` : 'fonts already present');
