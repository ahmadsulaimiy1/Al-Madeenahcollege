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

/* THE TYPE SYSTEM — v3.
   Cormorant Garamond + Cinzel + IBM Plex Sans was replaced because that exact
   trio is the most-used "luxury" Google Fonts stack on the web. It is what a
   template ships with, and it reads as one however carefully it is set.
   Worse, running text was in a technical SANS, which is what makes a page read
   as an app rather than a publication.

   Three faces, all VARIABLE with a real optical-size axis — which is the thing
   a template stack never has. A display cut at 96pt has finer hairlines and
   tighter fit than the same face at 10pt; serving one static weight for both
   is why headlines look inflated and body copy looks thin.

     BODONI MODA   opsz 6–96. Didone: extreme thick/thin. The luxury register —
                   the letterform of a jewellery house and a fashion plate.
                   Titles and display ONLY; a Didone at reading size is cruel.
     NEWSREADER    opsz 6–72, with a true italic. The reading face. Running
                   text in a serif is the single largest publication signal
                   there is.
     REEM KUFI     Arabic display. Geometric kufi, built on the same square-and-
                   circle construction as the girih plates — so the Arabic
                   title and the illumination share one geometry.
     AMIRI         Arabic reading face (kept): a Naskh revival of the Bulaq
                   press types, and the correct scholarly register. */
const FONTS = [
  ['bodoni-roman.woff2', 'https://fonts.gstatic.com/s/bodonimoda/v28/aFTQ7PxzY382XsXX63LUYJSKSKg.woff2'],
  ['bodoni-italic.woff2', 'https://fonts.gstatic.com/s/bodonimoda/v28/aFTS7PxzY382XsXX63LUYJSPeKrcWw.woff2'],
  ['newsreader-roman.woff2', 'https://fonts.gstatic.com/s/newsreader/v26/cY9AfjOCX1hbuyalUrK4397yjA.woff2'],
  ['newsreader-italic.woff2', 'https://fonts.gstatic.com/s/newsreader/v26/cY9CfjOCX1hbuyalUrK439vCjohC.woff2'],
  ['reemkufi.woff2', 'https://fonts.gstatic.com/s/reemkufi/v28/2sDcZGJLip7W2J7v7wQzbWW5O7w.woff2'],
  ['amiri-400.woff2', 'https://fonts.gstatic.com/s/amiri/v30/J7aRnpd8CGxBHpUrtLMA7w.woff2'],
  ['amiri-700.woff2', 'https://fonts.gstatic.com/s/amiri/v30/J7acnpd8CGxBHp2VkaY6zp5yGw.woff2']
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
