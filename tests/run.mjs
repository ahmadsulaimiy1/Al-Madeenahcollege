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

/* ---- hreflang pairs both ways ---- */
for (const f of html) {
  const s = doc(f);
  ok(`${rel(f)}: hreflang pair`, s.includes('hreflang="en"') && s.includes('hreflang="ar"'));
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
ok('no gradient on the mark', !/linear-gradient[^;]*var\(--nuhas\)/.test(brand));
ok('palette token present', brand.includes('--nakhil:#16332A'));
ok('no box-shadow used as card structure', (brand.match(/box-shadow/g) || []).length <= 3);

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
