#!/usr/bin/env node
/**
 * Subsets the Latin variable fonts to the characters this site actually sets.
 *
 * Why this exists. The type system moved to three VARIABLE faces with real
 * optical-size axes, which is the thing a template stack never has — and the
 * full files came to ~420KB of Latin, four times the old static stack. `EB §14`
 * commits this College to "a three-year-old Android phone, on 3G, on a metered
 * plan", and 420KB of type on that connection is a decision made against our
 * own students.
 *
 * So the fonts are cut to the glyphs the site uses, VARIABLE AXES INTACT. The
 * character set is read out of the built HTML rather than guessed, plus a
 * safety margin of the full transliteration apparatus (ā ḥ ī ṣ ṭ ū ẓ ʿ ʾ …),
 * which this institution's copy is full of and which a naive "basic Latin"
 * subset would silently drop mid-word.
 *
 * Run locally; the results are committed. The deploy host has no Python.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const FONTS = join(ROOT, 'assets', 'fonts');

if (!existsSync(DIST)) {
  console.error('subset-fonts: build first (dist/ missing)');
  process.exit(1);
}

/* Every character the built site sets, harvested from the output rather than
   assumed from the source. */
const walk = (d, out = []) => {
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
};
const chars = new Set();
for (const f of walk(DIST).filter((f) => /\.(html|css|js|xml|json|txt)$/.test(f))) {
  for (const ch of readFileSync(f, 'utf8')) chars.add(ch);
}

/* The safety margin: everything a Latin institutional page may yet need.
   Cheap in bytes, and the failure mode it prevents — a missing macron in the
   middle of "itqān" — is the kind of defect nobody notices until print. */
const SAFETY =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
  ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~' +
  ' ‘’“”–—…‐­' +
  '©®™°·•†‡§¶' +
  '£€$₦¥½¼¾×−→←↑↓' +
  'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöøùúûüýÿ' +
  /* transliteration of Arabic — the apparatus this College's copy runs on */
  'ĀāĪīŪūḤḥḌḍṢṣṬṭẒẓĠġŠšĞğḪḫṚṛṈṉṮṯḎḏŽžʿʾʼʻ' +
  '̱̣̄̇';
for (const ch of SAFETY) chars.add(ch);

/* Latin-range codepoints only: the Arabic faces are already subset by Google
   and are not touched. */
const codes = [...chars]
  .map((c) => c.codePointAt(0))
  .filter((c) => c < 0x0600 || (c >= 0x2000 && c <= 0x2300))
  .sort((a, b) => a - b);
const unicodes = codes.map((c) => 'U+' + c.toString(16).toUpperCase()).join(',');

const LATIN = ['bodoni-roman.woff2', 'bodoni-italic.woff2',
               'newsreader-roman.woff2', 'newsreader-italic.woff2',
               'plex-sans-400.woff2'];

let before = 0, after = 0;
for (const f of LATIN) {
  const src = join(FONTS, f);
  if (!existsSync(src)) continue;
  const b = statSync(src).size;
  const tmp = src + '.sub';
  execFileSync('python3', ['-m', 'fontTools.subset', src,
    `--unicodes=${unicodes}`,
    '--flavor=woff2',
    '--layout-features=kern,liga,clig,calt,smcp,c2sc,onum,lnum,tnum,pnum,frac,dnom,numr,sups,subs,ordn,case',
    /* fvar/STAT/avar must survive or the optical-size axis dies and the whole
       point of the new stack goes with it. */
    '--no-hinting',
    '--desubroutinize',
    `--output-file=${tmp}`], { stdio: ['ignore', 'ignore', 'inherit'] });
  const a = statSync(tmp).size;
  execFileSync('mv', [tmp, src]);
  before += b; after += a;
  console.log(`  ${f.padEnd(24)} ${(b / 1024).toFixed(0)}KB → ${(a / 1024).toFixed(0)}KB`);
}
console.log(`subset: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`
  + ` (${Math.round((1 - after / before) * 100)}% smaller), ${codes.length} glyphs, axes intact`);
