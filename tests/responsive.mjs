/* =========================================================================
   RESPONSIVE GATE — DX §18

   Why this file exists.

   The main suite grew to 1,029 checks and every one of them passed while the
   site scrolled 330px sideways on every page at phone width, the Arabic pages
   had 261 overflowing elements, and fifteen tap targets per page sat under
   40px. None of that was subtle. It was invisible because the suite parsed
   strings and never opened a viewport.

   A stylesheet cannot be checked by reading it. This file opens a real browser
   at real phone widths and measures the rendered result. It is the only kind
   of check that could have caught what shipped.

   Run: node tests/responsive.mjs   (requires a built dist/ and Chromium)
   Skips cleanly — exit 0 with a stated reason — where no browser exists, so
   the deploy is never blocked by a missing binary. It is never silently
   skipped: the reason is always printed.
   ========================================================================= */
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.log('\nRESPONSIVE GATE SKIPPED — playwright is not installed here.');
  console.log('This is a local-only gate; it does not run on the deploy host.\n');
  process.exit(0);
}
const EXEC = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium';
if (!existsSync(EXEC)) {
  console.log(`\nRESPONSIVE GATE SKIPPED — no Chromium at ${EXEC}.\n`);
  process.exit(0);
}

/* ---- a static server over dist/ ---- */
const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json',
  '.xml': 'application/xml', '.txt': 'text/plain' };
const server = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const f = join(DIST, p);
  if (!f.startsWith(DIST) || !existsSync(f)) { res.writeHead(404); return res.end('404'); }
  res.writeHead(200, { 'content-type': MIME[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}`;

let pass = 0;
const fails = [];
const ok = (name, cond, detail = '') => (cond ? pass++ : fails.push(`${name}${detail ? ' — ' + detail : ''}`));

/* Real device widths, not round numbers. 360 is the most common Android
   viewport in Nigeria and across Africa — the market this College is FOR
   (EB §14 accessibility: "a three-year-old Android phone, on 3G"). 320 is
   the narrowest still in meaningful use. */
const WIDTHS = [320, 360, 375, 390, 414, 768];
const PAGES = ['/', '/about/', '/programmes/', '/admissions/', '/fees/', '/contact/',
               '/verify/', '/signin/', '/portal/'];
const LANGS = ['', '/ar'];

const browser = await chromium.launch({ executablePath: EXEC });

for (const width of WIDTHS) {
  for (const lang of LANGS) {
    for (const path of PAGES) {
      const url = BASE + (lang ? lang + path : path);
      const page = await browser.newPage({
        viewport: { width, height: 800 }, deviceScaleFactor: 2,
        isMobile: width < 768, hasTouch: width < 768,
      });
      await page.goto(url, { waitUntil: 'networkidle' });
      const r = await page.evaluate(() => {
        const docW = document.documentElement.clientWidth;
        const over = [];
        document.querySelectorAll('body *').forEach((el) => {
          const s = getComputedStyle(el);
          if (s.position === 'fixed' || s.display === 'none' || s.visibility === 'hidden') return;
          // An element inside a container that scrolls or CLIPS on the inline
          // axis cannot overflow the viewport: the decorative bleeds (girih,
          // watermark, hero ground) are deliberately wider than their band and
          // are cut off by it. What matters is whether the PAGE overflows,
          // which is asserted separately against document.scrollWidth.
          let a = el.parentElement, contained = false;
          while (a && a !== document.body) {
            const ox = getComputedStyle(a).overflowX;
            if (ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') { contained = true; break; }
            a = a.parentElement;
          }
          if (contained) return;
          const b = el.getBoundingClientRect();
          if (b.width === 0 || b.height === 0) return;
          if (b.right > docW + 1 || b.left < -1) {
            over.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().trim().split(/\s+/)[0] || '?'}`
              + ` [${Math.round(b.left)}→${Math.round(b.right)}]`);
          }
        });
        const tiny = [];
        document.querySelectorAll('a[href],button:not([disabled]),input,select,textarea').forEach((el) => {
          const s = getComputedStyle(el);
          if (s.display === 'none' || s.visibility === 'hidden') return;
          const b = el.getBoundingClientRect();
          if (b.width === 0 || b.height === 0) return;
          if (b.left < 0 || b.top < -2000) return;           // the skip link, parked off-screen
          if (el.closest('p, li.txt, .txt, figcaption')) return;  // inline links in prose
          if (b.height < 44) tiny.push(`${el.tagName.toLowerCase()} "${(el.textContent || '').trim().slice(0, 22)}" ${Math.round(b.height)}px`);
        });
        return {
          docW, scrollW: document.documentElement.scrollWidth,
          bodyW: document.body.scrollWidth,
          over: over.slice(0, 5), overN: over.length,
          tiny: tiny.slice(0, 4), tinyN: tiny.length,
        };
      });
      const id = `${width}px ${lang || 'en'}${path}`;
      /* THE check. If the document is wider than the viewport, the page
         scrolls sideways, and everything else about it is academic. */
      ok(`no sideways scroll · ${id}`, r.scrollW <= r.docW + 1, `scrollWidth ${r.scrollW} > ${r.docW}`);
      ok(`nothing overflows the viewport · ${id}`, r.overN === 0, `${r.overN}: ${r.over.join(' | ')}`);
      if (width < 768) {
        ok(`tap targets reach 44px · ${id}`, r.tinyN === 0, `${r.tinyN}: ${r.tiny.join(' | ')}`);
      }
      await page.close();
    }
  }
}

/* The drawer must not reintroduce the overflow it was rebuilt to remove. */
for (const lang of ['', '/ar']) {
  const page = await browser.newPage({ viewport: { width: 375, height: 800 }, isMobile: true, hasTouch: true });
  await page.goto(BASE + (lang || '') + '/', { waitUntil: 'networkidle' });
  const before = await page.evaluate(() => document.documentElement.scrollWidth);
  await page.click('.navtoggle');
  await page.waitForTimeout(250);
  const open = await page.evaluate(() => {
    const n = document.getElementById('nav');
    const r = n.getBoundingClientRect();
    const last = [...n.querySelectorAll('a')].pop();
    return {
      scrollW: document.documentElement.scrollWidth,
      docW: document.documentElement.clientWidth,
      vh: window.innerHeight,
      visible: getComputedStyle(n).display !== 'none',
      h: Math.round(r.height), top: Math.round(r.top),
      locked: document.body.classList.contains('nav-lock'),
      /* Only VISIBLE links are tap targets. A link inside a collapsed
         accordion has zero height and is not something a finger can miss. */
      links: [...n.querySelectorAll('a')].filter((a) => {
        const b = a.getBoundingClientRect();
        return b.height === 0 || b.height >= 44;
      }).length,
      total: n.querySelectorAll('a').length,
      /* Is the last item actually reachable? A drawer can pass every other
         check while rendering as a sliver — which it did, because a
         backdrop-filter on the header made it the containing block for the
         fixed panel. Checking display alone proves nothing. */
      lastVisible: last ? document.elementFromPoint(
        Math.min(Math.max(last.getBoundingClientRect().left + 8, 1), window.innerWidth - 1),
        Math.min(Math.max(last.getBoundingClientRect().top + 8, 1), window.innerHeight - 1),
      ) : null,
      lastInside: last ? last.getBoundingClientRect().bottom <= window.innerHeight + 1 : false,
    };
  });
  const L = lang || 'en';
  ok(`drawer opens · ${L}`, open.visible);
  ok(`drawer locks the body · ${L}`, open.locked);
  ok(`drawer adds no sideways scroll · ${L}`, open.scrollW <= open.docW + 1, `${before} → ${open.scrollW}`);
  ok(`every drawer link is 44px+ · ${L}`, open.links === open.total, `${open.links}/${open.total}`);
  /* The drawer must fill the viewport, not the element it happens to sit in. */
  ok(`drawer fills the screen · ${L}`, open.h >= open.vh - 2 && open.top <= 1,
     `${open.h}px tall at top:${open.top}, viewport ${open.vh}`);
  ok(`the last drawer item is on screen · ${L}`, open.lastInside);
  /* Every accordion inside the drawer, opened. A collapsed panel is invisible
     to the overflow sweep, so a panel that only misbehaves once opened would
     never be seen — and one did: :focus-within fires on tap, which re-applied
     the desktop translateX(-50%) and slid the panel half a screen off the
     left edge while every other check passed. */
  const drops = await page.$$('.drop__x');
  for (let i = 0; i < drops.length; i++) {
    await drops[i].click();
    await page.waitForTimeout(300);
    const panel = await page.evaluate((n) => {
      const d = document.querySelectorAll('.drop')[n];
      const m = d.querySelector('.mega');
      const b = m.getBoundingClientRect();
      return {
        open: getComputedStyle(m).display !== 'none',
        left: Math.round(b.left), right: Math.round(b.right),
        docW: document.documentElement.clientWidth,
        scrollW: document.documentElement.scrollWidth,
      };
    }, i);
    ok(`drawer panel ${i + 1} opens · ${L}`, panel.open);
    ok(`drawer panel ${i + 1} sits inside the viewport · ${L}`,
       panel.left >= -1 && panel.right <= panel.docW + 1,
       `[${panel.left} → ${panel.right}] in ${panel.docW}`);
    ok(`drawer panel ${i + 1} adds no sideways scroll · ${L}`,
       panel.scrollW <= panel.docW + 1, `${panel.scrollW} > ${panel.docW}`);
  }

  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  ok(`Escape closes the drawer · ${L}`,
     await page.evaluate(() => !document.body.classList.contains('nav-lock')));
  await page.close();
}

/* =========================================================================
   THE COLOUR GATE — EB §14, DX §19

   Why this exists. The Founder reported that the site was overwhelmingly blue
   with no cream, ivory or parchment anywhere, while every screenshot I took
   showed a warm light page. Both were accurate. Playwright defaults to LIGHT,
   the Founder's phone was in DARK, and the stylesheet's auto-dark block mapped
   all six warm grounds onto navy — --white:#152549, --ivory:#0B1533,
   --parchment:#101D3E. Measured, the dark rendering was 99.2% blue.

   Two people describing the same URL and disagreeing completely is a signal
   that a rendering variable is untested. So the palette is now measured from
   actual pixels, in every scheme a reader can arrive in.
   ========================================================================= */
const classify = (r, g, b) => {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  if (b > r + 14 && b > g + 8) return 'blue';
  if (mx - mn < 18 && mx > 225) return 'white';
  if (r >= g && g >= b && mx - mn >= 6) return 'warm';   // cream/ivory/parchment/gilt, light OR dark
  if (mx < 90) return 'ink';
  return 'other';
};

/* Every way a reader can arrive: system-light, system-dark, and an explicit
   opt-in to each. The second row is the one that was never tested. */
const MODES = [
  ['system light', 'light', null],
  ['system dark  (must still render the light register)', 'dark', null],
  ['chose light', 'dark', 'light'],
  ['chose dark', 'light', 'dark'],
];
for (const [label, scheme, explicit] of MODES) {
  for (const path of ['/', '/programmes/', '/fees/', '/ar/']) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: scheme });
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    if (explicit) await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), explicit);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(900);
    await page.evaluate(() => window.scrollTo(0, 0));
    const buf = await page.screenshot({ fullPage: true });
    const px = await page.evaluate(async (u) => {
      const i = new Image(); i.src = u; await i.decode();
      const c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(i.width / 5)); c.height = Math.max(1, Math.round(i.height / 5));
      const x = c.getContext('2d'); x.drawImage(i, 0, 0, c.width, c.height);
      return Array.from(x.getImageData(0, 0, c.width, c.height).data);
    }, 'data:image/png;base64,' + buf.toString('base64'));
    const t = {}; let n = 0;
    for (let i = 0; i < px.length; i += 4) { const k = classify(px[i], px[i + 1], px[i + 2]); t[k] = (t[k] || 0) + 1; n++; }
    const pc = (k) => (100 * (t[k] || 0)) / n;
    const id = `${path} · ${label}`;
    /* Blue is a primary colour of this institution. It is not the page.
       DX §10 budgets it at ~18%; 35% is the hard ceiling, generous enough
       for a page whose flagship band is blue and strict enough that a
       theme which paints everything blue cannot pass. */
    ok(`blue stays a minority · ${id}`, pc('blue') <= 35,
       `blue ${pc('blue').toFixed(1)}%  warm ${pc('warm').toFixed(1)}%  white ${pc('white').toFixed(1)}%`);
    /* And the warm register must actually be present — the complaint was not
       only "too much blue" but "no cream, no parchment, no ivory". */
    ok(`the warm register is present · ${id}`, pc('warm') + pc('white') >= 45,
       `warm ${pc('warm').toFixed(1)}% + white ${pc('white').toFixed(1)}%`);
    await page.close();
  }
}

await browser.close();
server.close();

console.log(`\nRESPONSIVE GATE — ${pass} passed, ${fails.length} failed`);
if (fails.length) {
  console.log('\nFailures:');
  for (const f of fails.slice(0, 30)) console.log('  ✗ ' + f);
  if (fails.length > 30) console.log(`  … and ${fails.length - 30} more`);
  process.exit(1);
}
console.log('Every page holds its width at 320, 360, 375, 390, 414 and 768.\n');
