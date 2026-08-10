/* Markdown → typeset PDF, printed by Chromium.
   LibreOffice cannot load a .docx in this container (it fails on a two-line file),
   so the PDF is not a conversion of the Word file — it is set directly, which is the
   better artefact anyway: the institution's own palette, its own faces, and real RTL. */
import { readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
/* playwright is a LOCAL tool dependency, deliberately not in package.json: the site
   itself has zero runtime dependencies (EB §24) and nothing in the build path needs a
   browser. Same posture as tests/responsive.mjs. */

const [SRC, OUT] = process.argv.slice(2);
const md = readFileSync(SRC, 'utf8').split('\n');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const AR = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;

function inline(t) {
  let s = esc(t)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)]*)\)/g, '<a>$1</a>');
  /* wrap Arabic spans so they get the Arabic face and RTL, mid-sentence included */
  s = s.replace(/([؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿][؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿\sً-ْ،؛؟ـ٠-٩]*)/g,
    '<span class="ar" dir="rtl" lang="ar">$1</span>');
  return s;
}

const out = [];
const toc = [];
let i = 0, tbl = null, list = null;
const cells = (l) => l.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
const closeList = () => { if (list) { out.push(`</${list}>`); list = null; } };
const flush = () => {
  if (!tbl) return;
  const [h, ...b] = tbl;
  out.push('<div class="tw"><table><thead><tr>' + h.map((c) => `<th>${inline(c)}</th>`).join('') +
    '</tr></thead><tbody>' + b.map((r) => '<tr>' + h.map((_, k) => `<td>${inline(r[k] ?? '')}</td>`).join('') + '</tr>').join('') +
    '</tbody></table></div>');
  tbl = null;
};
let hn = 0, inBody = false;  /* front matter is not a contents entry */
while (i < md.length) {
  const l = md[i];
  if (/^\s*\|/.test(l)) { closeList(); const c = cells(l); if (!/^[-: ]+$/.test(c.join(''))) (tbl ||= []).push(c); i++; continue; }
  flush();
  if (/^# /.test(l)) { const t = l.slice(2); const id = 'h' + (++hn); if (/^PART|^CLOSING/.test(t)) inBody = true; if (inBody) toc.push({ lv: 1, t, id }); closeList(); out.push(`<h1 id="${id}" class="${/^PART|^CLOSING/.test(t) ? 'brk' : ''}">${inline(t)}</h1>`); }
  else if (/^## /.test(l)) { const t = l.slice(3); const id = 'h' + (++hn); if (inBody) toc.push({ lv: 2, t, id }); closeList(); out.push(`<h2 id="${id}">${inline(t)}</h2>`); }
  else if (/^### /.test(l)) { closeList(); out.push(`<h3>${inline(l.slice(4))}</h3>`); }
  else if (/^---+$/.test(l)) { closeList(); out.push('<hr>'); }
  else if (/^> /.test(l)) { closeList(); out.push(`<blockquote>${inline(l.slice(2))}</blockquote>`); }
  else if (/^\s*[-*] /.test(l)) { if (list !== 'ul') { closeList(); out.push('<ul>'); list = 'ul'; } out.push(`<li>${inline(l.replace(/^\s*[-*] /, ''))}</li>`); }
  else if (/^\s*\d+\. /.test(l)) { if (list !== 'ol') { closeList(); out.push('<ol>'); list = 'ol'; } out.push(`<li>${inline(l.replace(/^\s*\d+\. /, ''))}</li>`); }
  else if (l.trim() === '') { closeList(); }
  else {
    let t = l;
    while (i + 1 < md.length && md[i + 1].trim() !== '' && !/^([#>|-]|\s*[-*] |\s*\d+\. )/.test(md[i + 1])) t += ' ' + md[++i].trim();
    closeList(); out.push(`<p>${inline(t)}</p>`);
  }
  i++;
}
flush(); closeList();

const tocHtml = toc.filter((x) => !/^Contents$/.test(x.t))
  .map((x) => `<div class="toc${x.lv}">${inline(x.t)}</div>`).join('');

const css = `
@page{size:A4;margin:22mm 20mm 20mm}
:root{--blue:#1A3280;--deep:#0D1A45;--gold:#755A1A;--gilt:#9C7826;--ink:#131A26;
      --soft:#4A5464;--ivory:#F6F0E1;--cream:#EFE5CE;--rule:#C9BFA6}
*{box-sizing:border-box}
body{font-family:'EB Garamond',Georgia,serif;font-size:10.4pt;line-height:1.55;color:var(--ink);margin:0}
.ar{font-family:'Amiri',serif;font-size:1.12em;line-height:1.9}
h1,h2,h3{font-family:'EB Garamond',Georgia,serif;font-weight:600;line-height:1.22;break-after:avoid}
h1{font-size:18pt;color:var(--deep);margin:24pt 0 10pt;padding-bottom:5pt;border-bottom:1.4pt solid var(--gilt);letter-spacing:.01em}
h1.brk{break-before:page;margin-top:0}
h2{font-size:13pt;color:var(--blue);margin:17pt 0 6pt}
h3{font-size:11pt;color:var(--gold);margin:13pt 0 5pt}
p{margin:0 0 6pt;text-align:justify;hyphens:auto;orphans:2;widows:2}
ul,ol{margin:0 0 7pt;padding-inline-start:16pt}
li{margin-bottom:3pt;text-align:justify}
code{font-family:'DejaVu Sans Mono',monospace;font-size:.82em;color:var(--gold);
  background:var(--ivory);padding:.5pt 2.5pt;border-radius:2pt}
strong{color:var(--deep)}
a{color:var(--blue);text-decoration:none}
blockquote{margin:8pt 0;padding:7pt 11pt;background:var(--ivory);
  border-inline-start:2.4pt solid var(--gilt);font-style:italic;color:var(--deep);break-inside:avoid}
hr{border:0;border-top:.6pt solid var(--rule);margin:12pt 0}
.tw{margin:7pt 0 11pt;break-inside:avoid}
table{width:100%;border-collapse:collapse;font-size:9pt}
th{background:var(--cream);color:var(--deep);font-weight:600;text-align:start;
   padding:4pt 6pt;border:.5pt solid var(--rule);line-height:1.35}
td{padding:4pt 6pt;border:.5pt solid var(--rule);vertical-align:top;line-height:1.42}
tbody tr:nth-child(even) td{background:#FCFAF4}
/* cover */
.cover{height:247mm;display:flex;flex-direction:column;justify-content:center;
  align-items:center;text-align:center;break-after:page}
.cover .arname{font-family:'Amiri',serif;font-size:21pt;color:var(--deep);line-height:1.75;margin-bottom:9pt}
.cover .enname{font-size:13pt;color:var(--deep);padding-bottom:13pt;
  border-bottom:1.2pt solid var(--gilt);margin-bottom:32pt;max-width:118mm}
.cover .title{font-size:27pt;color:var(--blue);letter-spacing:.06em;margin-bottom:7pt}
.cover .sub{font-size:11.5pt;font-style:italic;color:var(--soft);margin-bottom:60pt}
.cover dl{display:grid;grid-template-columns:auto auto;gap:3pt 12pt;font-size:9.5pt}
.cover dt{text-transform:uppercase;letter-spacing:.14em;font-size:7.6pt;color:var(--gilt);text-align:end;padding-top:1.5pt}
.cover dd{margin:0;text-align:start;color:var(--ink)}
/* contents */
.toch{break-before:page;font-size:18pt;color:var(--deep);border-bottom:1.4pt solid var(--gilt);
  padding-bottom:5pt;margin:0 0 12pt}
.toc1{font-weight:600;color:var(--deep);margin:7pt 0 2pt;font-size:10.5pt}
.toc2{color:var(--soft);margin-inline-start:14pt;font-size:9.4pt}
`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Academic &amp; Editorial Bible v1.0</title><style>${css}</style></head><body>
<section class="cover">
  <div class="arname">كلية المدينة العالمية<br>للدراسات العربية والإسلامية</div>
  <div class="enname">Al-Madeenah International College for Arabic &amp; Islamic Studies</div>
  <div class="title">THE ACADEMIC &amp; EDITORIAL BIBLE</div>
  <div class="sub">The academic and editorial constitution of the College</div>
  <dl><dt>Version</dt><dd>1.0</dd>
      <dt>Date</dt><dd>10 August 2026</dd>
      <dt>Status</dt><dd>Written · internally audited · awaiting Founder ratification</dd>
      <dt>Cited as</dt><dd>AEB §n</dd></dl>
</section>
<h1 class="toch">Contents</h1>${tocHtml}
${out.join('\n')}
</body></html>`;

/* The intermediate HTML is written only on request. It is derived from the markdown
   and would otherwise sit in the repository as a second, silently-diverging copy of a
   document whose whole point is that it has one source. */
if (process.env.KEEP_HTML) writeFileSync(OUT.replace(/\.pdf$/, '.html'), html);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
await page.pdf({
  path: OUT, format: 'A4', printBackground: true,
  margin: { top: '20mm', bottom: '17mm', left: '20mm', right: '20mm' },
  displayHeaderFooter: true,
  headerTemplate: `<div style="width:100%;font-family:Georgia,serif;font-size:6.6pt;color:#9C7826;
    letter-spacing:.16em;text-align:center;padding:0 20mm 3pt;border-bottom:.4pt solid #C9BFA6;
    margin:0 20mm;">AL-MADEENAH INTERNATIONAL COLLEGE &nbsp;·&nbsp; ACADEMIC &amp; EDITORIAL BIBLE v1.0</div>`,
  footerTemplate: `<div style="width:100%;font-family:Georgia,serif;font-size:8pt;color:#4A5464;
    text-align:center;padding-top:5pt;">— <span class="pageNumber"></span> —</div>`,
});
await browser.close();
console.log('wrote', OUT);
