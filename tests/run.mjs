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

/* EB §22.4 — every animation-bearing class must carry a reduced-motion opt-out,
   so a new effect cannot ship without one. Extracts the reduced-motion blocks and
   requires each animated selector to appear inside them. */
/* Brace-counted rather than regex-matched: a reduced-motion block written on one
   line has no newline before its closing brace, and a lazy `[\s\S]*?\n\}` silently
   skips it — which is exactly how this check first reported a false failure. */
const rmBlocks = (() => {
  const out = [];
  const re = /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{/g;
  let m;
  while ((m = re.exec(brand))) {
    let depth = 1;
    let i = m.index + m[0].length;
    while (i < brand.length && depth > 0) {
      if (brand[i] === '{') depth++;
      else if (brand[i] === '}') depth--;
      i++;
    }
    out.push(brand.slice(m.index, i));
  }
  return out.join('\n');
})();
ok('reduced-motion blocks were located', rmBlocks.length > 200, `${rmBlocks.length} chars`);
for (const sel of ['girih--draw', 'mark-draw', '.rv', 'grow', 'gilt']) {
  ok(`EB §22.4: "${sel}" has a reduced-motion override`, rmBlocks.includes(sel));
}
/* Nothing may loop: infinite animations repeat while the reader is reading. */
ok('no infinite animation', !/animation[^;]*infinite/.test(brand));
ok('logical properties used, not physical', !/(margin|padding)-(left|right)\s*:/.test(brand));

/* ---- identity guards (IS §17.2, IS §31) ---- */
/* IS §17.1 — gold is never a gradient FILL. A 1px rule that fades to transparent
   at both ends is a hairline, not a fill, and is permitted: so every gold gradient
   must sit in a block that also declares height:1px. Scoped to the real intent
   rather than to the substring, which would ban the hairline too. */
const goldGradients = (brand.match(/[^}]*linear-gradient[^;}]*--dhahab[^;}]*;[^}]*/g) || []);
const goldFills = goldGradients.filter((b) => !/height:\s*1px/.test(b));
ok('gold gradients are hairlines only, never fills', goldFills.length === 0, goldFills[0] || '');
/* Elevation is now layered by design (v2): a single flat shadow reads as a
   sticker, three stacked blurs read as physical depth. What matters is that
   every elevation comes from the token scale rather than an ad-hoc value. */
const shadowDecls = brand.match(/box-shadow:[^;}]+/g) || [];
const adHoc = shadowDecls.filter((d) => !/var\(--sh|var\(--bevel|none|0 0 0 3px/.test(d));
ok('every elevation uses the token scale, none ad-hoc', adHoc.length === 0, adHoc[0] || '');
ok('three-layer elevation tokens exist', /--sh-soft:[^;]+,[^;]+,[^;]+;/.test(brand));

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
  if (!hex) return null;
  const [r, g, b] = [1, 3, 5].map((i) => srgb(parseInt(hex.slice(i, i + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const la = lum(a); const lb = lum(b);
  if (la === null || lb === null) return null;   // missing token -> reported, never thrown
  const [x, y] = [la, lb].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const PAIRS = [
  /* Body text must clear AAA on every light ground the rhythm uses, not just one. */
  ['hibr', 'white', 7.0, 'body on white'],
  ['hibr', 'milk', 7.0, 'body on milk'],
  ['hibr', 'ivory', 7.0, 'body on ivory — the default ground'],
  ['hibr', 'cream', 7.0, 'body on cream'],
  ['hibr', 'parchment', 7.0, 'body on parchment'],
  ['hibr-soft', 'ivory', 4.5, 'secondary text — AA'],
  ['hibr-faint', 'ivory', 4.5, 'tertiary text — AA'],
  ['milk', 'lazaward', 7.0, 'reversed body on blue — AAA'],
  ['milk', 'lazaward-deep', 7.0, 'reversed body on deep blue — AAA'],
  ['dhahab-light', 'lazaward', 4.5, 'headings and labels on blue — AA'],
  ['dhahab-light', 'lazaward-deep', 4.5, 'headings and labels on deep blue — AA'],
  ['aqiq', 'ivory', 4.5, 'emphasis — AA'],
  ['firuzi', 'ivory', 4.5, 'turquoise as text — AA'],
  ['ok', 'ivory', 4.5, 'success state — AA'],
  ['wip', 'ivory', 4.5, 'in-progress state — AA'],
  ['attn', 'ivory', 4.5, 'attention state — AA'],
  ['dhahab', 'ivory', 3.0, 'gold on light — large text and non-text ONLY'],
  ['dhahab', 'cream', 3.0, 'gold on cream — non-text'],
  ['dhahab', 'parchment', 3.0, 'gold on parchment — non-text'],
];
for (const [fg, bg, min, why] of PAIRS) {
  const a = token(fg);
  const b = token(bg);
  const r = contrast(a, b);
  ok(`contrast: --${fg} on --${bg} >= ${min} (${why})`,
     r !== null && r >= min,
     r === null ? `token missing (${fg}=${a}, ${bg}=${b})` : r.toFixed(2));
}

/* Gold must never be used for body-sized text: it cannot reach 4.5 on our
   grounds and never will. Asserted so nobody "fixes" a contrast failure by
   lightening the ground instead of changing the usage. */
ok('gold is correctly below AA for body text (line/accent only, IS §32)',
   contrast(token('dhahab'), token('ivory')) < 4.5);

/* The light register (design system v2): the page must be predominantly light.
   Deep blue is punctuation. If a rebuild ever inverts that ratio, this fails. */
const homeBody = readFileSync(join(DIST, 'index.html'), 'utf8');
const sectionClasses = homeBody.match(/class="section[^"]*"/g) || [];
const darkSections = sectionClasses.filter((c) => /--deep|--blue|--dark/.test(c)).length;
ok('home is light-dominant: dark bands are a minority of sections',
   darkSections * 2 <= sectionClasses.length,
   `${darkSections} dark of ${sectionClasses.length}`);

/* =========================================================================
   THE EXCELLENCE GATES — DX §14

   The Design Excellence Bible states what excellent means; a document cannot
   enforce itself. These encode the two gates that are mechanically checkable —
   vocabulary (G1) and space (G2) — plus the register of rejected conventions.
   G4 (removal), G5 (persona) and G6 (truth) are human gates and are walked in
   the phase review, not here.
   ========================================================================= */

/* DX §6 — the component canon. Excellence is a vocabulary problem: a system
   with fifteen components can only compose in a few ways, so every section
   starts to resemble every other one. Each of these must exist in the system
   before a page can be built from it. */
const CANON = ['folio', 'monorail', 'pledge', 'path', 'quad', 'creds', 'doc',
               'letter', 'watermark', 'ledger', 'dotlist', 'figrow', 'info', 'illum'];
for (const c of CANON) {
  ok(`DX §6: the canon defines .${c}`, new RegExp(`\\.${c}[\\s,.:{[]`).test(brand));
}

/* The folio marker replaced the generic eyebrow (DX §6.5). The convention it
   replaced must be gone from both the system and the markup, or we have grown
   the vocabulary without retiring anything — which is how systems rot. */
ok('DX §6.5: the generic module marker is retired from the system',
   !brand.includes('module-marker'));
ok('DX §6.5: no page still carries a module marker',
   !html.some((f) => doc(f).includes('module-marker')));

/* G1 · VOCABULARY — every content page composes from the canon. A page built
   from generic divs would pass every other check in this file and still look
   like a template, which is precisely the failure this gate exists to catch.
   Sign-in and verify are single-purpose utilities and are exempt by design. */
const CONTENT = ['/', '/about/', '/programmes/', '/admissions/', '/fees/', '/contact/', '/portal/'];
const canonUsed = (body) => CANON.filter((c) => new RegExp(`class="[^"]*\\b${c}\\b`).test(body));
for (const p of CONTENT) {
  for (const [label, path] of [['en', p], ['ar', '/ar' + p]]) {
    const body = doc(join(DIST, path.replace(/^\//, ''), 'index.html'));
    const used = canonUsed(body);
    ok(`DX G1: ${label} ${p} is built from the canon`, used.length >= 2,
       `${used.length} components: ${used.join(', ') || 'none'}`);
  }
  /* EB §26 — Arabic is authored in parallel, not translated. Parallel authoring
     means the same composition, not merely the same words. */
  const en = canonUsed(doc(join(DIST, p.replace(/^\//, ''), 'index.html'))).join(',');
  const ar = canonUsed(doc(join(DIST, ('/ar' + p).replace(/^\//, ''), 'index.html'))).join(',');
  ok(`EB §26: ${p} composes identically in both languages`, en === ar, `en=[${en}] ar=[${ar}]`);
}

/* DX §6.5 — folio markers run in sequence down the page, so the page reads as
   a bound document. An out-of-order or duplicated numeral is the tell that a
   section was inserted without renumbering; it happened once already. */
const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const ARABIC = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠'];
for (const f of html) {
  const nums = [...doc(f).matchAll(/<p class="folio"><i>([^<]+)<\/i>/g)].map((m) => m[1]);
  if (!nums.length) continue;
  const idx = nums.map((n) => {
    const i = NUMERALS.indexOf(n);
    return i >= 0 ? i : ARABIC.indexOf(n);
  });
  ok(`DX §6.5: folio numerals on ${rel(f)} are all recognised`, idx.every((i) => i >= 0), nums.join(' '));
  ok(`DX §6.5: folio numerals on ${rel(f)} run in sequence`,
     idx.every((v, i) => i === 0 ? v === 0 : v === idx[i - 1] + 1), nums.join(' '));
}

/* G2 · SPACE — DX §2's binding minimum: no section is padded below 112px
   vertically, ever. Asserted on the token itself so it cannot be quietly
   reduced, and on the section rules so a new modifier cannot undercut it. */
const spaceToken = (n) => {
  const m = brand.match(new RegExp(`--s${n}:\\s*(\\d+)px`));
  return m ? Number(m[1]) : null;
};
ok('DX §2: --s9, the section-padding floor, is at least 112px', spaceToken(9) >= 112, `${spaceToken(9)}px`);
ok('DX §2: --s10, desktop section padding, is at least 160px', spaceToken(10) >= 160, `${spaceToken(10)}px`);
ok('DX §2: --s11, the flagship band, exceeds --s10', spaceToken(11) > spaceToken(10),
   `${spaceToken(11)} vs ${spaceToken(10)}`);
const sectionPads = [...brand.matchAll(/\.section[^{]*\{[^}]*padding-block:\s*var\(--s(\d+)\)/g)]
  .map((m) => Number(m[1]));
ok('DX §2: every section padding rule sits at --s9 or above', sectionPads.length > 0 && sectionPads.every((n) => n >= 9),
   sectionPads.join(', '));
/* DX §2.4 — reading measure is capped. A line longer than this is unreadable
   however much space surrounds it. */
ok('DX §2.4: body measure capped at 66ch or less', /--measure:\s*6[0-6]ch/.test(brand));
ok('DX §2.4: leads capped tighter than body', /\.lead\{[^}]*max-width:\s*6[0-2]ch/.test(brand));
ok('DX §2.4: captions capped tighter than leads', /figcaption\{[^}]*max-width:\s*5[0-6]ch/.test(brand));

/* DX §15 — the register of rejected conventions. Each argument is won once;
   these have no trigger and will not be revisited. Enforced so a later build
   cannot reintroduce one by habit. */
const REJECTED = [
  [/carousel|\bslider\b|swiper/i, 'carousels and sliders of any kind'],
  [/marquee/i, 'marquees'],
  [/testimonial/i, 'testimonial carousels'],
  [/>\s*Learn more\s*</i, '"learn more" as a button label'],
  [/countdown/i, 'countdown timers'],
  [/[\u{1F300}-\u{1FAFF}]/u, 'emoji in institutional copy'],
];
for (const f of html) {
  for (const [re, why] of REJECTED) {
    ok(`DX §15: ${rel(f)} carries no ${why}`, !re.test(doc(f)));
  }
}
/* Colour lives in the token system, not in the markup. An inline hex in a page
   is a colour nobody can audit for contrast — and two had already crept in. */
for (const f of html) {
  const inlineHex = (doc(f).match(/style="[^"]*#[0-9A-Fa-f]{3,6}/g) || []);
  ok(`EB §14: ${rel(f)} declares no inline colour`, inlineHex.length === 0, inlineHex[0] || '');
}

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
