#!/usr/bin/env node
/**
 * Build verification. These are not generic HTML checks — each one encodes a rule
 * from the Editorial Bible or the Identity System, so a regression against the
 * institution's own constitution fails the build rather than shipping quietly.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

let pass = 0;
const fails = [];
const ok = (name, cond, detail = '') => (cond ? pass++ : fails.push(`${name}${detail ? ' — ' + detail : ''}`));

const walk = (d, out = []) => {
  for (const e of readdirSync(d)) {
    const p = join(d, e);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
};

const files = walk(DIST);
const html = files.filter((f) => f.endsWith('.html'));
const rel = (f) => f.slice(DIST.length);
const doc = (f) => readFileSync(f, 'utf8');

/* ---- structure ---- */
ok('builds 20 pages', html.length === 20, `got ${html.length}`);

for (const f of html) {
  const s = doc(f);
  const name = rel(f);
  const isAr = name.startsWith('/ar/');

  ok(`${name}: doctype`, s.startsWith('<!doctype html>'));
  ok(`${name}: lang+dir`, isAr ? s.includes('lang="ar" dir="rtl"') : s.includes('lang="en" dir="ltr"'));
  ok(`${name}: single h1`, (s.match(/<h1[\s>]/g) || []).length === 1, `${(s.match(/<h1[\s>]/g) || []).length} found`);
  ok(`${name}: has title`, /<title>[^<]{5,}<\/title>/.test(s));
  ok(`${name}: skip link`, s.includes('class="skip"'));
  ok(`${name}: main landmark`, s.includes('id="main"'));
  ok(`${name}: viewport`, s.includes('name="viewport"'));
  ok(`${name}: og:locale matches page language`,
     s.includes(isAr ? 'og:locale" content="ar_AR' : 'og:locale" content="en_GB'));
  ok(`${name}: og:url matches canonical`, s.includes(`og:url" content="https://almadinah.college${name.replace(/index\.html$/, '') || '/'}"`));

  /* EB §46 — the honesty protocol. No unresolved template tokens may ship. */
  ok(`${name}: no unfilled tokens`, !/\{\{\w+\}\}/.test(s), (s.match(/\{\{\w+\}\}/) || [])[0]);

  /* EB §10.2 Rule 2 — no comparative claim about the institution that we cannot cite.
     Matches claim shapes, not bare words: "the best version we know how to make" is a
     self-critical test (EB §3, value 5), not a boast, and must not trip this. */
  const banned = new RegExp(
    [
      'world[- ]?class',
      "(?:africa|nigeria|the world)'s (?:leading|best|finest|foremost|top)",
      '\\b(?:we are|is|are) the (?:best|leading|finest|foremost|number one)\\b',
      'leading (?:institution|college|academy|university)',
      '(?:^|\\s)#1(?:\\s|$)',
      'award[- ]winning',
      'unrivalled|unparalleled|second to none',
    ].join('|'),
    'i'
  );
  const prose = s.replace(/<!--[\s\S]*?-->/g, '');
  ok(`${name}: no uncitable comparative claim`, !banned.test(prose), (prose.match(banned) || [])[0]);

  /* EB §25.2 — focus must never be removed. */
  ok(`${name}: no outline:none`, !/outline\s*:\s*none/i.test(s));

  /* Images carry alt text (none are used yet — EB §20.5 — so this must stay true). */
  const imgs = s.match(/<img\b[^>]*>/g) || [];
  ok(`${name}: images have alt`, imgs.every((t) => /\balt=/.test(t)), `${imgs.length} img tags`);

  /* Forms that cannot submit must be visibly disabled rather than silently dead. */
  const forms = s.match(/<form[\s\S]*?<\/form>/g) || [];
  for (const fm of forms) {
    ok(`${name}: inert form is disabled`, /disabled/.test(fm) || /mailto:/.test(fm));
  }
}

/* ---- bilingual parity (EB §26.2 / IA §9) ---- */
const enPaths = html.filter((f) => !rel(f).startsWith('/ar/')).map(rel);
for (const p of enPaths) {
  const arCounterpart = join(DIST, 'ar', p);
  ok(`AR counterpart exists for ${p}`, existsSync(arCounterpart));
}
ok('equal EN/AR page count', enPaths.length === html.length - enPaths.length);

/* ---- hreflang correctness (not merely presence) ----
   A pair that exists but is inverted is worse than none: it tells search engines
   the Arabic page is the English one. Shipped once; guarded now. */
for (const f of html) {
  const s = doc(f);
  const name = rel(f);
  const path = (tag) =>
    (s.match(new RegExp(`hreflang="${tag}" href="https://almadinah\\.college(/[^"]*)"`)) || [])[1];
  const en = path('en');
  const arh = path('ar');
  const xd = path('x-default');
  ok(`${name}: hreflang en/ar/x-default present`, !!en && !!arh && !!xd);
  ok(`${name}: hreflang="en" points at a non-/ar/ path`, en && !en.startsWith('/ar/'), en);
  ok(`${name}: hreflang="ar" points at an /ar/ path`, arh && arh.startsWith('/ar/'), arh);
  ok(`${name}: x-default matches the en URL`, xd === en, `${xd} vs ${en}`);
  const canon = (s.match(/rel="canonical" href="https:\/\/almadinah\.college(\/[^"]*)"/) || [])[1];
  const expected = name.replace(/index\.html$/, '') || '/';
  ok(`${name}: canonical is self-referential`, canon === expected, `${canon} vs ${expected}`);
}

/* ---- internal links resolve (IA §9 — no dead ends) ---- */
const known = new Set(html.map((f) => rel(f).replace(/index\.html$/, '').replace(/\/$/, '') || '/'));
let linkCount = 0;
for (const f of html) {
  const s = doc(f);
  for (const m of s.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1];
    if (href.startsWith('/assets/') || href.endsWith('.css') || href.endsWith('.js')) continue;
    linkCount++;
    const norm = href.replace(/\/$/, '') || '/';
    ok(`link ${href} (in ${rel(f)})`, known.has(norm) || existsSync(join(DIST, href)));
  }
}
ok('internal links were checked', linkCount > 40, `${linkCount} checked`);

/* ---- performance budget (EB §24) ---- */
const css = readFileSync(join(DIST, 'brand.css'));
const js = readFileSync(join(DIST, 'site.js'));
const homeHtml = readFileSync(join(DIST, 'index.html'));
const critical = gzipSync(Buffer.concat([homeHtml, css, js])).length;
ok('critical path <= 120KB gzipped', critical <= 120 * 1024, `${(critical / 1024).toFixed(1)} KB`);

const fontDir = join(DIST, 'assets/fonts');
const latinFonts = readdirSync(fontDir).filter((f) => !f.includes('arabic') && !f.includes('amiri'));
ok('<= 4 Latin font files (EB §24)', latinFonts.length <= 4, `${latinFonts.length}`);

/* ---- Arabic typography guards (EB §15.3) ---- */
const brand = css.toString();
ok('font-synthesis disabled globally', /font-synthesis\s*:\s*none/.test(brand));
ok('RTL letter-spacing neutralised', /\[dir=rtl\][^{]*\{[^}]*letter-spacing\s*:\s*normal/.test(brand));
ok('reduced-motion honoured', /prefers-reduced-motion\s*:\s*reduce/.test(brand));
ok('logical properties used, not physical', !/(margin|padding)-(left|right)\s*:/.test(brand));

/* ---- identity guards (IS §17.2, IS §31) ---- */
ok('no gradient on the accent', !/linear-gradient[^;]*var\(--dhahab\)/.test(brand));
ok('no box-shadow used as card structure', (brand.match(/box-shadow/g) || []).length <= 3);

/* ---- WCAG contrast, computed from the palette itself (EB §14.3, IS §33) ----
   The Bible states target ratios; a document cannot enforce them. These parse the
   real token values out of the shipped CSS and compute the ratios, so changing a
   colour to something illegible fails the build rather than the next audit. */
const token = (name) => {
  const m = brand.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`));
  return m && m[1];
};
const srgb = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => srgb(parseInt(hex.slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const PAIRS = [
  ['hibr', 'jiss', 7.0, 'body text on light — AAA'],
  ['hibr-soft', 'jiss', 4.5, 'secondary text on light — AA'],
  ['waraq', 'lazaward', 7.0, 'reversed body on the primary ground — AAA'],
  ['waraq', 'lazaward-deep', 7.0, 'reversed body on the deepest ground — AAA'],
  ['dhahab-light', 'lazaward', 4.5, 'headings and eyebrows on dark — AA'],
  ['aqiq', 'jiss', 4.5, 'emphasis / eyebrow on light — AA'],
  ['firuzi', 'jiss', 4.5, 'turquoise as text on light — AA'],
  ['firuzi-light', 'lazaward', 4.5, 'turquoise on dark — AA'],
  ['ok', 'jiss', 4.5, 'success state — AA'],
  ['wip', 'jiss', 4.5, 'in-progress state — AA'],
  ['attn', 'jiss', 4.5, 'attention state — AA'],
  ['dhahab', 'jiss', 3.0, 'gold on light — large text and non-text ONLY'],
  ['dhahab', 'lazaward', 3.0, 'gold rules on the primary ground — non-text'],
];
for (const [fg, bg, min, why] of PAIRS) {
  const a = token(fg);
  const b = token(bg);
  ok(`contrast: --${fg} on --${bg} >= ${min} (${why})`,
     a && b && contrast(a, b) >= min,
     a && b ? `${contrast(a, b).toFixed(2)}` : 'token missing');
}

/* Gold must never be used for body-sized text: it cannot reach 4.5 on our
   grounds and never will. Asserted so nobody "fixes" a contrast failure by
   lightening the ground instead of changing the usage. */
ok('gold is correctly below AA for body text (line/accent only, IS §32)',
   contrast(token('dhahab'), token('jiss')) < 4.5);

/* ---- noindex on previews (IA §4) ---- */
for (const p of ['/portal/index.html', '/ar/portal/index.html', '/404.html']) {
  ok(`${p} is noindex`, doc(join(DIST, p)).includes('name="robots" content="noindex"'));
}
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
ok('sitemap excludes portal preview', !sitemap.includes('/portal/'));
ok('sitemap has 16 public urls', (sitemap.match(/<url>/g) || []).length === 16, `${(sitemap.match(/<url>/g) || []).length}`);

/* ---- report ---- */
console.log(`\n${pass} passed, ${fails.length} failed`);
if (fails.length) {
  console.log('\nFailures:');
  for (const f of fails.slice(0, 40)) console.log('  ✗ ' + f);
  if (fails.length > 40) console.log(`  … and ${fails.length - 40} more`);
  process.exit(1);
}
console.log('All checks passed.\n');
