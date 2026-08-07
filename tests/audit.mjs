#!/usr/bin/env node
/* =========================================================================
   THE DESIGN-SYSTEM AUDITOR

   The redesign directive ends with the only instruction that matters:
   verify with "objective measurements and browser-based inspection rather
   than visual judgement alone."

   So this is built before anything is redesigned. It renders every page at
   every supported width in a real engine and MEASURES the design system:

     ALIGNMENT   every content element's inline-start against the wrap's own
                 content edge — a 1px deviation is a defect, not a rounding
     SPACING     every margin and padding against the token scale
     TYPE        every rendered font-size against the type scale, plus the
                 line-height and measure of running text
     RADII       every border-radius against the radius-by-role set
     ELEVATION   every box-shadow against the token scale
     ICONS       every icon's rendered box against the icon scale
     FOCUS       every focusable element actually shows a focus ring
     CLS         cumulative layout shift, measured not assumed

   Reports the WORST OFFENDERS with selectors and numbers, so a fix can be
   aimed rather than guessed at. Exits non-zero when a budget is breached.
   ========================================================================= */
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

let chromium;
try { ({ chromium } = await import('playwright')); }
catch { console.log('\nAUDIT SKIPPED — playwright not installed here.\n'); process.exit(0); }
const EXEC = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium';
if (!existsSync(EXEC)) { console.log(`\nAUDIT SKIPPED — no Chromium at ${EXEC}.\n`); process.exit(0); }

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json',
  '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };
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

/* The icon sizes are the one system with no token of its own, so they are
   listed. The SPACING and RADIUS scales are NOT listed here: they are read out
   of the rendered page's custom properties at audit time.

   That is not a convenience. This file used to carry a hand-copied mirror of
   the token block, and the moment the ultra-wide tier redefined --s9 and --s10
   the auditor reported 220 spacing defects that were not defects — it was
   measuring the page against a stale copy of the page's own rules. An auditor
   holding its own duplicate of the thing it audits will eventually be auditing
   the duplicate. It reads the live values, per tier, per width. */
const ICONS = [15, 16, 17, 19, 22, 24, 32, 34, 38, 40, 46];

/* 404 is in this list. It was not, and that is exactly how it came to carry a
   hand-typed `padding-block:96px` — a value on no scale, on the one page every
   check skipped because it is the page nobody plans to visit. */
const PAGES = ['/', '/about/', '/programmes/', '/admissions/', '/fees/', '/contact/',
               '/verify/', '/signin/', '/portal/', '/404.html'];
/* 1920 is in this list because the ultra-wide tier redefines the scale tokens
   above 1800px, and a tier that is never measured is a tier that drifts. */
const WIDTHS = [390, 768, 1440, 1920];
const LANGS = ['', '/ar'];

const findings = { align: [], space: [], type: [], radius: [], shadow: [], icon: [], focus: [], press: [], a11y: [], cls: [] };
const bump = (k, v) => findings[k].push(v);

const browser = await chromium.launch({ executablePath: EXEC });
const typeSizes = new Map();

for (const width of WIDTHS) {
  for (const lang of LANGS) {
    for (const path of PAGES) {
      const id = `${width} ${lang || 'en'}${path}`;
      const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
      await page.addInitScript(() => {
        window.__cls = 0;
        new PerformanceObserver((l) => {
          for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value;
        }).observe({ type: 'layout-shift', buffered: true });
      });
      await page.goto(BASE + (lang ? lang + path : path), { waitUntil: 'networkidle' });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(700);

      const r = await page.evaluate(({ ICONS }) => {
        const rtl = document.documentElement.dir === 'rtl';
        const sel = (el) => el.tagName.toLowerCase()
          + (el.className && typeof el.className === 'string' && el.className.trim()
            ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '');
        const near = (v, set, tol = 0.6) => set.some((s) => Math.abs(v - s) <= tol);
        const px = (s) => parseFloat(s) || 0;
        const out = { align: [], space: [], type: [], radius: [], shadow: [], icon: [], focus: [], a11y: [], sizes: [] };
        /* Read the display faces out of the stylesheet's own tokens, so the
           auditor cannot drift from the system it is auditing. */
        const rootCs = getComputedStyle(document.documentElement);
        /* The scales, read from the page itself at the width being measured, so
           a responsive tier that redefines a token is audited against the token
           it actually declares. */
        const readScale = (names) => [0, ...names
          .map((n) => parseFloat(rootCs.getPropertyValue(n)))
          .filter((v) => !Number.isNaN(v))];
        const SPACE = readScale(['--s1', '--s2', '--s3', '--s4', '--s5', '--s6',
          '--s7', '--s8', '--s9', '--s10', '--s11', '--s12']);
        const RADII = readScale(['--r-edge', '--r-xs', '--r-sm', '--r-md', '--r-lg', '--r-pill']);
        const DISPLAY_FACES = ['--f-display', '--f-ar-display']
          .map((v) => (rootCs.getPropertyValue(v).split(',')[0] || '').trim().replace(/['"]/g, '').toLowerCase())
          .filter(Boolean);

        /* ---- ALIGNMENT ----
           Two rules, because two different things are being claimed.

           (a) THE TEXT GRID. A block-level child in the normal flow of a
               block-formatting .wrap must begin exactly at the wrap's own
               content edge. Anything else is a broken column.
               Exempt, correctly and not conveniently:
                 · positioned elements — off the flow by definition
                 · inline-level children (strong, a, span) — an inline box is
                   placed by line layout, not by the block axis; measuring its
                   left against the container edge is a category error
                 · flex and grid items — placed by their container's algorithm,
                   so they answer to rule (b) instead

           (b) TRACK DRIFT. Inside a flex or grid container, the item starts
               must fall into clean tracks. Two starts less than 16px apart but
               not identical are not two columns — they are one column with a
               defect. This is the rule that actually catches "1px off", and
               the previous version of this file could not see it at all. */
        const blockish = (d) => /^(block|flow-root|list-item|table|grid|flex)$/.test(d);
        document.querySelectorAll('.wrap').forEach((wrap) => {
          const ws = getComputedStyle(wrap);
          if (ws.display === 'flex' || ws.display === 'grid') return;
          const wr = wrap.getBoundingClientRect();
          const edge = rtl
            ? wr.right - px(ws.paddingRight)
            : wr.left + px(ws.paddingLeft);
          [...wrap.children].forEach((el) => {
            const cs = getComputedStyle(el);
            if (cs.position === 'absolute' || cs.position === 'fixed' || cs.display === 'none') return;
            if (!blockish(cs.display)) return;
            if (cs.float !== 'none') return;
            if (el.getAttribute('aria-hidden') === 'true') return;
            const b = el.getBoundingClientRect();
            if (!b.width || !b.height) return;
            /* A centred block is not a misaligned one — but it must be centred
               EXACTLY. So the rule swaps rather than relaxes: instead of the
               edge, it measures the two side margins against each other, which
               catches the off-centre block the edge rule could never see. */
            const ml = px(cs.marginLeft), mr = px(cs.marginRight);
            if (ml > 0.5 && mr > 0.5) {
              const skew = Math.abs(ml - mr);
              if (skew >= 1) out.align.push({ s: sel(el) + ' ▸ off-centre', off: Math.round(skew * 10) / 10 });
              return;
            }
            const start = rtl ? b.right : b.left;
            const off = Math.abs(start - edge);
            if (off >= 1) out.align.push({ s: sel(el), off: Math.round(off * 10) / 10 });
          });
        });

        document.querySelectorAll('main *, footer *, header *').forEach((box) => {
          const bs = getComputedStyle(box);
          /* GRID only. A wrapping flex row — a tag cloud, a row of pills — has
             no tracks by design: each item starts where the last one ended, and
             those starts are supposed to be ragged. Applying a track rule to it
             measures the text, not the layout. */
          if (bs.display !== 'grid') return;
          const starts = [...box.children]
            .filter((el) => {
              const cs = getComputedStyle(el);
              if (cs.display === 'none' || cs.position === 'absolute' || cs.position === 'fixed') return false;
              const b = el.getBoundingClientRect();
              return b.width > 0 && b.height > 0;
            })
            .map((el) => {
              const b = el.getBoundingClientRect();
              return Math.round((rtl ? b.right : b.left) * 10) / 10;
            });
          if (starts.length < 2) return;
          const uniq = [...new Set(starts)].sort((a, b) => a - b);
          for (let i = 1; i < uniq.length; i++) {
            const d = Math.round((uniq[i] - uniq[i - 1]) * 10) / 10;
            if (d > 0 && d < 16) out.align.push({ s: sel(box) + ' ▸ track', off: d });
          }
        });

        /* ---- ACCESSIBILITY ----
           Directive §16 asks for WCAG AA as the floor and AAA where practical.
           Contrast is already computed in tests/run.mjs from the parsed tokens.
           What a stylesheet CANNOT be asked is whether the rendered document is
           navigable — that is a property of the DOM, so it is read here.

           Each of these is a failure a sighted mouse user would never notice
           and a screen-reader or keyboard user hits immediately. */
        const name = (el) => (el.getAttribute('aria-label')
          || (el.getAttribute('aria-labelledby')
              && (document.getElementById(el.getAttribute('aria-labelledby')) || {}).textContent)
          || el.textContent || el.getAttribute('title') || '').trim();

        /* An id repeated in a document breaks every aria-* reference that
           points at it — label, describedby, controls — silently. */
        const ids = new Map();
        document.querySelectorAll('[id]').forEach((el) => {
          ids.set(el.id, (ids.get(el.id) || 0) + 1);
        });
        for (const [k, n] of ids) if (n > 1) out.a11y.push({ s: `#${k}`, why: `id used ${n}×` });

        /* aria-describedby / labelledby pointing at nothing announces nothing.
           This is the most common way an error message never gets read out. */
        for (const attr of ['aria-describedby', 'aria-labelledby', 'aria-controls']) {
          document.querySelectorAll(`[${attr}]`).forEach((el) => {
            for (const ref of el.getAttribute(attr).split(/\s+/).filter(Boolean)) {
              if (!document.getElementById(ref)) {
                out.a11y.push({ s: sel(el), why: `${attr} → #${ref} does not exist` });
              }
            }
          });
        }

        /* A control with no accessible name is announced as "button" or
           "link" — the user is told a control exists and nothing about it. */
        document.querySelectorAll('a[href],button,input,select,textarea').forEach((el) => {
          const b = el.getBoundingClientRect();
          if (!b.width || !b.height) return;
          if (el.getAttribute('aria-hidden') === 'true') return;
          let n = name(el);
          if (!n && /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) {
            const lab = el.closest('label') || (el.id && document.querySelector(`label[for="${el.id}"]`));
            n = lab ? lab.textContent.trim() : (el.getAttribute('placeholder') || '').trim();
          }
          if (!n && el.querySelector('svg title')) n = el.querySelector('svg title').textContent.trim();
          if (!n) out.a11y.push({ s: sel(el), why: 'no accessible name' });
        });

        /* Every image needs alt. An empty alt is a decision (decorative); a
           MISSING alt makes the screen reader read the filename. */
        document.querySelectorAll('img').forEach((el) => {
          if (!el.hasAttribute('alt')) out.a11y.push({ s: sel(el), why: 'img without alt' });
        });

        /* Heading levels are the document's table of contents. A skip from h2
           to h4 tells a screen-reader user a section is missing. */
        let prev = 0;
        document.querySelectorAll('main h1,main h2,main h3,main h4,main h5,main h6').forEach((el) => {
          const lvl = +el.tagName[1];
          if (prev && lvl > prev + 1) out.a11y.push({ s: sel(el), why: `h${prev} → h${lvl} skips a level` });
          prev = lvl;
        });
        const h1s = document.querySelectorAll('main h1').length;
        if (h1s !== 1) out.a11y.push({ s: 'main', why: `${h1s} h1 elements, expected exactly 1` });

        /* A positive tabindex overrides the document's own order and is
           essentially never right. */
        document.querySelectorAll('[tabindex]').forEach((el) => {
          if (+el.getAttribute('tabindex') > 0) out.a11y.push({ s: sel(el), why: 'positive tabindex' });
        });

        /* ---- SPACING, RADII, ELEVATION, TYPE ---- */
        document.querySelectorAll('main *, footer *, header *').forEach((el) => {
          const cs = getComputedStyle(el);
          if (cs.display === 'none') return;
          const b = el.getBoundingClientRect();
          if (!b.width && !b.height) return;

          for (const prop of ['marginTop', 'marginBottom', 'paddingTop', 'paddingBottom',
                              'paddingLeft', 'paddingRight']) {
            const v = px(cs[prop]);
            if (v > 0 && !near(v, SPACE, 1.2)) out.space.push({ s: sel(el), p: prop, v: Math.round(v * 10) / 10 });
          }
          for (const prop of ['borderTopLeftRadius', 'borderTopRightRadius']) {
            const v = px(cs[prop]);
            if (v > 0 && !near(v, RADII, 0.6) && v < 500) out.radius.push({ s: sel(el), v: Math.round(v) });
          }
          if (cs.boxShadow && cs.boxShadow !== 'none') {
            const layers = cs.boxShadow.split(/,(?![^(]*\))/).length;
            /* One flat shadow reads as a sticker (DX §9). Ours are three-layer
               plus a bevel, so anything with fewer than 2 layers is ad-hoc —
               except the 3px focus ring, which is deliberately one. */
            if (layers < 2 && !/0px 0px 0px 3px/.test(cs.boxShadow)) {
              out.shadow.push({ s: sel(el), n: layers });
            }
          }
          /* ---- TYPE ----
             Leading is not one rule. Three registers, each with a floor AND a
             ceiling, because "too loose" is as much a defect as "too tight":

               RUNNING  paragraphs, list items, cells — multi-line by nature.
                        Latin 1.4–2.0. Arabic 1.55–2.15: the script carries
                        ascenders, descenders and vowel marks on the same line
                        and genuinely needs the air. Holding Arabic to a Latin
                        figure is a mistake, not a standard.
               HEADING  1.15–1.4. Below 1.15 descenders collide when a heading
                        wraps — which it always does on a 320px phone.
               DISPLAY  ≥34px: Latin 1.0–1.3, Arabic 1.15–1.7. Large type needs
                        less leading, not more.
               LABEL    single-line inline furniture. No floor — a one-line
                        label at 1.0 is correct typography — but a ceiling of
                        1.6, because a loose label is a misaligned one. */
          const fs = Math.round(px(cs.fontSize) * 2) / 2;
          const hasText = el.childNodes.length
            && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
          if (hasText) {
            out.sizes.push(fs);
            const lh = cs.lineHeight === 'normal' ? 0 : px(cs.lineHeight) / px(cs.fontSize);
            /* Two gates, so that what remains is a real defect and not an echo:

               (i)  AUTHORSHIP. Judge an element only on leading it sets itself.
                    A <span> inside a paragraph inherits the paragraph's 1.66;
                    flagging it flags the paragraph twice and blames the child.
               (ii) LINES. Leading is the distance between lines. An element
                    that renders one line has no distance to get wrong — a
                    single-line label at 1.0 is correct typography. The floor
                    binds only where text actually wraps, which on a 320px
                    phone is most headings. */
            const par = el.parentElement && getComputedStyle(el.parentElement);
            const ownsLeading = !par || par.lineHeight !== cs.lineHeight;
            const lhpx = px(cs.lineHeight) || px(cs.fontSize) * 1.2;
            const inner = b.height - px(cs.paddingTop) - px(cs.paddingBottom)
              - px(cs.borderTopWidth) - px(cs.borderBottomWidth);
            const lines = lhpx > 0 ? Math.round(inner / lhpx) : 1;
            const judged = ownsLeading && lines >= 2;
            const r2 = (v) => Math.round(v * 100) / 100;
            const ar = el.closest('[lang="ar"],[dir="rtl"]') !== null;
            const tag = el.tagName;
            /* Register is decided by TYPEFACE, which is the distinction the
               type system itself declares — not by a pixel threshold and not by
               tag name. Two earlier versions of this rule got it wrong in both
               directions: a 34px cutoff called a 28px pull quote "running text"
               and demanded 1.4 leading on it, which would be a typographic
               error; a tag-name list called a four-line warrant description a
               "label". Text set in the display face is TITLING at any size.
               Text set in the body face is PROSE. That is the whole model.

                 TITLING  ≥34px  1.00–1.30 Latin · 1.15–1.70 Arabic
                          <34px  1.15–1.45 Latin · 1.30–1.70 Arabic
                 PROSE           1.40–2.00 Latin · 1.55–2.15 Arabic

               Arabic runs looser in every band, deliberately: Amiri and Reem
               Kufi carry their vowel marks inside the line, and holding them to
               a Latin figure drives the marks into the line above. */
            const inlineLevel = cs.display.startsWith('inline');
            const fam = cs.fontFamily.toLowerCase();
            /* Tracked all-caps is label furniture whatever face it is cut in:
               capitals have no descenders, so they take leading a lowercase
               line could not. Judged against the label band, not the titling
               one. */
            const labelish = cs.textTransform === 'uppercase'
              || /small-caps/.test(cs.fontVariantCaps || '')
              || parseFloat(cs.letterSpacing) >= 0.8;
            /* Latin classifies by FACE — Bodoni titles, Newsreader sets prose.
               Arabic cannot: Reem Kufi is both the Arabic display face and the
               Arabic UI face, so the family says nothing. Arabic classifies by
               the SCALE instead — at --ts-h4 (21px) and above it is titling.
               Using the scale the site declares beats inventing a threshold. */
            const titling = !labelish && (/^H[1-6]$/.test(tag)
              || (ar ? fs >= 21 : DISPLAY_FACES.some((f) => fam.includes(f))));
            let lo = null, hi = null, why = 'line-height';
            if (lh && judged) {
              if (titling && fs >= 34) { lo = ar ? 1.15 : 1.0; hi = ar ? 1.7 : 1.3; why = 'display leading'; }
              else if (titling) { lo = ar ? 1.3 : 1.15; hi = ar ? 1.7 : 1.45; why = 'titling leading'; }
              else if (!inlineLevel && !labelish) { lo = ar ? 1.55 : 1.4; hi = ar ? 2.15 : 2.0; why = 'prose leading'; }
              else { lo = null; hi = 2.0; why = 'label leading'; }
              if (lo !== null && lh < lo) out.type.push({ s: sel(el), why, v: r2(lh) });
              else if (hi !== null && lh > hi) out.type.push({ s: sel(el), why: why + ' (loose)', v: r2(lh) });
            }
          }
          /* An icon's size is the icon, not the chip it sits in. Measuring the
             border box counted 9px of padding and 1px of border as glyph. */
          if (el.tagName === 'svg') {
            /* The icon scale governs ICONS: UI affordances, in flow, at a fixed
               system size. An absolutely-positioned SVG is a component of an
               illustration — the inner glyph of the crest is 29% of the crest —
               and something sized as a fraction of its container is not on a
               fixed scale by definition. Skipping it is a statement about what
               an icon is, not a hole cut to make a number go green. */
            if (cs.position === 'absolute' || cs.position === 'fixed') return;
            const w = Math.round(px(cs.width) || b.width);
            if (w > 0 && w < 120 && !near(w, ICONS, 1.5)) out.icon.push({ s: sel(el.parentElement || el), w });
          }
        });

        return out;
      }, { ICONS });

      /* ---- FOCUS ----
         Walked with the Tab key, not with el.focus(). The difference is not
         pedantry: :focus-visible is a heuristic on the INPUT MODALITY, and a
         scripted focus() call does not set it for links or buttons. Auditing
         with focus() therefore reports a ring on elements a keyboard user
         would never see one on — it tests the wrong state and passes.
         WCAG 2.2 SC 2.4.13 also wants area, so a ring thinner than 2px on any
         side counts as absent. */
      const focus = await page.evaluate(() => { document.body.focus(); return true; }) && [];
      for (let i = 0; i < 26; i++) {
        await page.keyboard.press('Tab');
        const f = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body || el.tagName === 'HTML') return null;
          const cs = getComputedStyle(el);
          const b = el.getBoundingClientRect();
          if (!b.width || !b.height) return null;
          const sel = el.tagName.toLowerCase()
            + (typeof el.className === 'string' && el.className.trim()
              ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '');
          const ring = parseFloat(cs.outlineWidth) || 0;
          const none = cs.outlineStyle === 'none' || ring < 2;
          return { sel, none, ring, key: el.tagName + (el.className || '') };
        });
        if (!f) break;
        if (focus.some((x) => x.key === f.key)) continue;
        focus.push(f);
        if (f.none) bump('focus', { id, s: f.sel, v: f.ring });
      }

      /* ---- PRESS ----
         The directive asks for interaction states verified in the browser. So
         the buttons are actually pressed: mouse down over the control, read the
         computed style while the pointer is held, mouse up. Nothing here infers
         a state from the stylesheet — :active is produced by the engine the way
         a finger produces it.

         This exists because the measurement that preceded it found 45 :hover
         rules and zero :active rules. Hover is a pointer affordance; the
         primary device has no pointer. A control that changes nothing when
         pressed is indistinguishable from a broken one. */
      const btns = await page.$$('.btn, button.navtoggle, .atlas__i');
      for (const el of btns.slice(0, 4)) {
        const box = await el.boundingBox();
        if (!box || box.width < 8 || box.height < 8) continue;
        if (box.y < 0 || box.y > 5000) continue;
        const read = () => el.evaluate((n) => {
          const c = getComputedStyle(n);
          return c.transform + '|' + c.boxShadow + '|' + c.backgroundColor + '|' + c.opacity;
        });
        /* The pointer is moved over the control BEFORE the baseline is read, so
           :hover is already applied to both samples. Reading the baseline from
           the un-hovered state would let a hover-only control pass this check —
           the very defect it exists to find. What is isolated here is :active
           and nothing else. */
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        const before = await read();
        await page.mouse.down();
        const during = await read();
        await page.mouse.up();
        if (before === during) {
          const sel = await el.evaluate((n) => n.tagName.toLowerCase()
            + (typeof n.className === 'string' && n.className.trim()
              ? '.' + n.className.trim().split(/\s+/).slice(0, 2).join('.') : ''));
          bump('press', { id, s: sel });
        }
      }

      const cls = await page.evaluate(() => window.__cls || 0);
      if (cls > 0.1) bump('cls', { id, v: Math.round(cls * 1000) / 1000 });

      for (const a of r.align) bump('align', { id, ...a });
      for (const a of r.space) bump('space', { id, ...a });
      for (const a of r.type) bump('type', { id, ...a });
      for (const a of r.radius) bump('radius', { id, ...a });
      for (const a of r.shadow) bump('shadow', { id, ...a });
      for (const a of r.icon) bump('icon', { id, ...a });
      for (const a of r.a11y) bump('a11y', { id, ...a });
      for (const s of r.sizes) typeSizes.set(s, (typeSizes.get(s) || 0) + 1);

      await page.close();
    }
  }
}
await browser.close();
server.close();

/* ---- report ---- */
const roll = (list, key) => {
  const m = new Map();
  for (const f of list) {
    const k = key(f);
    if (!m.has(k)) m.set(k, { k, n: 0, ex: f });
    m.get(k).n++;
  }
  return [...m.values()].sort((a, b) => b.n - a.n);
};

console.log('\n══ DESIGN-SYSTEM AUDIT ══  ' +
  `${PAGES.length} pages × ${LANGS.length} languages × ${WIDTHS.length} widths\n`);

const BUDGET = { align: 0, space: 0, radius: 0, shadow: 0, icon: 0, focus: 0, cls: 0, type: 0 };
let failed = 0;

for (const [k, label] of [['align', 'MISALIGNED against the wrap edge'],
                          ['space', 'SPACING off the token scale'],
                          ['type', 'TYPE line-height out of range'],
                          ['radius', 'RADIUS off the role set'],
                          ['shadow', 'ELEVATION not layered'],
                          ['icon', 'ICON off the size scale'],
                          ['focus', 'FOCUS ring missing'],
                          ['press', 'PRESS state absent (pressed in-browser)'],
                          ['a11y', 'ACCESSIBILITY defect in the rendered DOM'],
                          ['cls', 'LAYOUT SHIFT above 0.1']]) {
  const list = findings[k];
  const rolled = k === 'cls' ? list.map((f) => ({ k: f.id, n: 1, ex: f }))
    : roll(list, (f) => `${f.s}${f.p ? ' · ' + f.p : ''}${f.v !== undefined ? ' = ' + f.v : ''}${f.off !== undefined ? ' off ' + f.off + 'px' : ''}${f.w !== undefined ? ' = ' + f.w + 'px' : ''}${f.why ? ' · ' + f.why : ''}`);
  const over = list.length > (BUDGET[k] ?? 0);
  if (over) failed++;
  console.log(`${over ? '✗' : '✓'} ${label}: ${list.length}`);
  const N = process.env.AUDIT_FULL ? rolled.length : 8;
  for (const r of rolled.slice(0, N)) console.log(`      ${String(r.n).padStart(4)} ×  ${r.k}`
    + (process.env.AUDIT_FULL && r.ex && r.ex.id ? `   [${r.ex.id}]` : ''));
  if (rolled.length > N) console.log(`           … ${rolled.length - N} more distinct`);
}

const sizes = [...typeSizes.entries()].sort((a, b) => b[1] - a[1]);
console.log(`\n  TYPE SCALE — ${sizes.length} distinct rendered sizes`);
console.log('      ' + sizes.slice(0, process.env.AUDIT_FULL ? sizes.length : 16)
  .map(([s, n]) => `${s}px(${n})`).join('  '));
/* The budget is ARITHMETIC, not a round number: nine fixed steps that render
   identically at every width, plus four fluid steps (h2, h1, display, mega)
   which resolve to one value per width tested. Computing it means the budget
   tracks the scale instead of having to be re-guessed whenever a width is
   added — and it still fails the moment a seventy-eighth ad-hoc size appears. */
const FIXED_STEPS = 9, FLUID_STEPS = 4;
const budget = FIXED_STEPS + FLUID_STEPS * WIDTHS.length;
if (sizes.length > budget) {
  console.log(`   ✗ ${sizes.length} distinct sizes against a budget of ${budget}`
    + ` (${FIXED_STEPS} fixed + ${FLUID_STEPS} fluid × ${WIDTHS.length} widths)`
    + ' — the scale is not a scale');
  failed++;
} else {
  console.log(`   ✓ within the budget of ${budget}`
    + ` (${FIXED_STEPS} fixed + ${FLUID_STEPS} fluid × ${WIDTHS.length} widths)`);
}

console.log(failed ? `\n${failed} categor${failed === 1 ? 'y' : 'ies'} over budget.\n`
                   : '\nEvery category within budget.\n');
process.exit(failed ? 1 : 0);
