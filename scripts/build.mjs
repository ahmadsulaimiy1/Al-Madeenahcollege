#!/usr/bin/env node
/**
 * Static site generator.
 *
 * Content lives as files in this repository, never in a CMS — IA §19 (Q4):
 * an institution planning in decades cannot have its record trapped in a
 * vendor's database. Assembling partials + page content into complete HTML
 * documents is the whole of the build.
 */
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const OUT = join(ROOT, 'dist');

const read = (p) => readFileSync(join(SRC, p), 'utf8');
const manifest = JSON.parse(read('pages/manifest.json'));

/* Tokens are replaced with a function so `$&`-style sequences inside
   content (e.g. a `$` in copy) can never corrupt the output. */
const fill = (tpl, vars) =>
  tpl.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in vars ? vars[k] : m));

const partials = {
  head: read('partials/head.html'),
  topbar: read('partials/topbar.html'),
  topbarAr: read('partials/topbar.ar.html'),
  header: read('partials/header.html'),
  headerAr: read('partials/header.ar.html'),
  footer: read('partials/footer.html'),
  footerAr: read('partials/footer.ar.html'),
};

const BUILT = new Date().toISOString().slice(0, 10);

function render(page) {
  const ar = page.lang === 'ar';
  const dir = ar ? 'rtl' : 'ltr';
  const content = read(`pages/${page.contentFile}`);
  const head = fill(partials.head, {
    TITLE: page.title,
    DESCRIPTION: page.description,
    LANG: page.lang || 'en',
    ALT_HREF: page.altHref,
    CANONICAL: page.output === 'index.html' ? '/' : '/' + page.output.replace(/index\.html$/, ''),
    NOINDEX: page.noindex ? '<meta name="robots" content="noindex">' : '',
  });

  let body;
  if (page.layout === 'portal') {
    body = content; // portal pages carry their own shell
  } else {
    const topbar = fill(ar ? partials.topbarAr : partials.topbar, { ALT_HREF: page.altHref });
    const header = fill(ar ? partials.headerAr : partials.header, { ALT_HREF: page.altHref });
    const footer = fill(ar ? partials.footerAr : partials.footer, { BUILT });
    body = `${topbar}\n${header}\n<main id="main">\n${content}\n</main>\n${footer}`;
  }

  return `<!doctype html>
<html lang="${page.lang || 'en'}" dir="${dir}">
<head>
${head}
</head>
<body>
<a class="skip" href="#main">${ar ? 'تخطَّ إلى المحتوى' : 'Skip to content'}</a>
<div class="previewbar"><div class="wrap">${
    ar
      ? '<strong>معاينة تصميمية</strong> — هذه معاينة قيد التطوير، وليست موقعًا رسميًا. المحتوى العربي بانتظار مراجعة متحدّث أصلي.'
      : '<strong>Design preview</strong> — a work in progress, not a live institutional site. Arabic copy awaits native-speaker review (EB §11.8).'
  }</div></div>
${body}
<script src="/site.js" defer></script>
</body>
</html>
`;
}

/* ---------------- build ---------------- */
if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });

let n = 0;
for (const page of manifest.pages) {
  const dest = join(OUT, page.output);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, render(page), 'utf8');
  n++;
}

/* CSS: fonts.css is generated (self-hosted @font-face), brand.css is authored.
   Concatenated so a page makes one stylesheet request — EB §24. */
writeFileSync(join(OUT, 'brand.css'), read('fonts.css') + '\n' + read('brand.css'), 'utf8');
cpSync(join(SRC, 'site.js'), join(OUT, 'site.js'));
cpSync(join(ROOT, 'assets'), join(OUT, 'assets'), { recursive: true });

/* robots + sitemap. The verification host is noindex by policy (IA §4) and
   is not part of this deployment. */
const urls = manifest.pages
  .filter((p) => !p.noindex)
  .map((p) => `  <url><loc>https://almadinah.college/${p.output.replace(/index\.html$/, '')}</loc></url>`)
  .join('\n');
writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
writeFileSync(join(OUT, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: https://almadinah.college/sitemap.xml\n');
writeFileSync(
  join(OUT, '_headers'),
  `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Permissions-Policy: geolocation=(), microphone=(), camera=()\n/assets/fonts/*\n  Cache-Control: public, max-age=31536000, immutable\n`
);

console.log(`built ${n} pages → dist/`);
