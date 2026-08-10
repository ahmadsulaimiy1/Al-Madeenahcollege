/* Markdown → DOCX for the Academic & Editorial Bible.
   Written rather than reached for because pandoc is absent here, and because the
   document needs three things a generic converter would not give it: real RTL runs
   for the Arabic, a cover that is typeset rather than a heading, and running heads. */
import { readFileSync, writeFileSync } from 'node:fs';
/* `docx` is a LOCAL tool dependency, deliberately not in package.json — the site has
   zero runtime dependencies and the build never touches this script. Install with
   `npm i docx` before regenerating the Word edition. */
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, TableOfContents,
  Header, Footer, PageNumber, LevelFormat, convertInchesToTwip,
} from 'docx';

const SRC = process.argv[2], OUT = process.argv[3];
const md = readFileSync(SRC, 'utf8').split('\n');

const LATIN = 'EB Garamond', ARABIC = 'Amiri', UI = 'EB Garamond';
const BLUE = '1A3280', DEEP = '0D1A45', GOLD = '755A1A', INK = '131A26', SOFT = '4A5464';
const RULE = 'C9BFA6', BAND = 'F6F0E1', HEAD = 'EFE5CE';

const AR = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;
const isAr = (s) => AR.test(s);

/* Inline: **bold**, *italic*, `code`, and Arabic segmentation so every Arabic run
   carries rtl + the Arabic face instead of inheriting a Latin one. */
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]*\))/g;
  let last = 0, m;
  const push = (t, extra) => {
    if (!t) return;
    for (const seg of t.split(/([؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿][؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿\s،؛؟ـً-ْ.,()«»0-9٠-٩]*)/)) {
      if (!seg) continue;
      const a = isAr(seg);
      out.push(new TextRun({
        text: seg, font: a ? ARABIC : (extra.code ? 'DejaVu Sans Mono' : LATIN),
        rightToLeft: a || undefined, size: a ? (base.size ? base.size + 4 : 24) : base.size,
        ...base, ...extra,
      }));
    }
  };
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index), {});
    const t = m[0];
    if (t.startsWith('**')) push(t.slice(2, -2), { bold: true });
    else if (t.startsWith('`')) push(t.slice(1, -1), { code: true, color: GOLD });
    else if (t.startsWith('[')) push(t.slice(1, t.indexOf(']')), { color: BLUE, underline: {} });
    else push(t.slice(1, -1), { italics: true });
    last = re.lastIndex;
  }
  push(text.slice(last), {});
  return out.length ? out : [new TextRun({ text: '', font: LATIN })];
}

const P = (text, opts = {}) => new Paragraph({
  children: runs(text, opts.run || {}), spacing: { after: 120, line: 300 }, ...opts.para,
});

/* ---- table ---- */
const TW = convertInchesToTwip(6.3);
function table(rows) {
  const n = Math.max(...rows.map((r) => r.length));
  const cw = Array.from({ length: n }, () => Math.floor(TW / n));
  const cell = (t, head, i) => new TableCell({
    width: { size: cw[i], type: WidthType.DXA },
    shading: head ? { type: ShadingType.CLEAR, fill: HEAD, color: 'auto' } : undefined,
    margins: { top: 80, bottom: 80, left: 110, right: 110 },
    children: [new Paragraph({
      children: runs(t, head ? { bold: true, color: DEEP, size: 18 } : { size: 19 }),
      spacing: { after: 0, line: 260 },
    })],
  });
  return new Table({
    columnWidths: cw,
    width: { size: TW, type: WidthType.DXA },
    borders: ['top', 'bottom', 'left', 'right', 'insideHorizontal', 'insideVertical']
      .reduce((a, k) => (a[k] = { style: BorderStyle.SINGLE, size: 3, color: RULE }, a), {}),
    rows: rows.map((r, ri) => new TableRow({
      tableHeader: ri === 0,
      children: Array.from({ length: n }, (_, i) => cell(r[i] ?? '', ri === 0, i)),
    })),
  });
}

/* ---- cover ---- */
const cover = [
  new Paragraph({ text: '', spacing: { after: 1500 } }),
  new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 160 },
    children: [new TextRun({ text: 'كلية المدينة العالمية للدراسات العربية والإسلامية', font: ARABIC, size: 40, rightToLeft: true, color: DEEP })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 700 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD, space: 14 } },
    children: [new TextRun({ text: 'Al-Madeenah International College for Arabic & Islamic Studies', font: LATIN, size: 26, color: DEEP })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 100 },
    children: [new TextRun({ text: 'THE ACADEMIC & EDITORIAL BIBLE', font: LATIN, size: 46, color: BLUE, characterSpacing: 40 })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 1400 },
    children: [new TextRun({ text: 'The academic and editorial constitution of the College', font: LATIN, size: 24, italics: true, color: SOFT })],
  }),
  ...[['Version', '1.0'], ['Date', '10 August 2026'],
      ['Status', 'Written · internally audited · awaiting Founder ratification'],
      ['Cited as', 'AEB §n']].map(([k, v]) => new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { after: 60 },
    children: [
      new TextRun({ text: k.toUpperCase() + '   ', font: LATIN, size: 16, color: GOLD, characterSpacing: 30 }),
      new TextRun({ text: v, font: LATIN, size: 20, color: INK }),
    ],
  })),
  new Paragraph({ children: [new PageBreak()] }),
  new Paragraph({ text: 'Contents', heading: HeadingLevel.HEADING_1, spacing: { after: 240 } }),
  new TableOfContents('Contents', { hyperlink: true, headingStyleRange: '1-2' }),
  new Paragraph({ children: [new PageBreak()] }),
];

/* ---- body ---- */
const body = [];
let i = 0, inTable = null;
const flushTable = () => { if (inTable) { body.push(table(inTable)); body.push(new Paragraph({ text: '', spacing: { after: 160 } })); inTable = null; } };
const cells = (l) => l.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

while (i < md.length) {
  const l = md[i];
  if (/^\s*\|/.test(l)) {
    const c = cells(l);
    if (/^[-: ]+$/.test(c.join(''))) { i++; continue; }
    (inTable ||= []).push(c); i++; continue;
  }
  flushTable();
  if (/^# /.test(l)) body.push(new Paragraph({ children: runs(l.slice(2), { bold: true, color: DEEP, size: 34 }), heading: HeadingLevel.HEADING_1, spacing: { before: 420, after: 200 }, pageBreakBefore: /^# PART|^# CLOSING/.test(l) }));
  else if (/^## /.test(l)) body.push(new Paragraph({ children: runs(l.slice(3), { bold: true, color: BLUE, size: 26 }), heading: HeadingLevel.HEADING_2, spacing: { before: 320, after: 140 } }));
  else if (/^### /.test(l)) body.push(new Paragraph({ children: runs(l.slice(4), { bold: true, color: GOLD, size: 22 }), heading: HeadingLevel.HEADING_3, spacing: { before: 240, after: 110 } }));
  else if (/^---+$/.test(l)) body.push(new Paragraph({ text: '', spacing: { after: 120 }, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 6 } } }));
  else if (/^> /.test(l)) body.push(new Paragraph({ children: runs(l.slice(2), { italics: true, color: DEEP }), spacing: { before: 100, after: 140, line: 300 }, indent: { left: 340 }, border: { left: { style: BorderStyle.SINGLE, size: 12, color: GOLD, space: 12 } }, shading: { type: ShadingType.CLEAR, fill: BAND, color: 'auto' } }));
  else if (/^\s*[-*] /.test(l)) body.push(new Paragraph({ children: runs(l.replace(/^\s*[-*] /, '')), bullet: { level: 0 }, spacing: { after: 70, line: 290 } }));
  else if (/^\s*\d+\. /.test(l)) body.push(new Paragraph({ children: runs(l.replace(/^\s*\d+\. /, '')), numbering: { reference: 'nums', level: 0 }, spacing: { after: 70, line: 290 } }));
  else if (l.trim() === '') { /* skip */ }
  else {
    let t = l; /* join wrapped source lines into one paragraph */
    while (i + 1 < md.length && md[i + 1].trim() !== '' && !/^([#>|-]|\s*[-*] |\s*\d+\. )/.test(md[i + 1])) { t += ' ' + md[++i].trim(); }
    body.push(P(t, { para: { alignment: AlignmentType.JUSTIFIED } }));
  }
  i++;
}
flushTable();

const doc = new Document({
  creator: 'Al-Madeenah International College',
  title: 'Academic & Editorial Bible v1.0',
  description: 'The academic and editorial constitution of Al-Madeenah International College',
  numbering: { config: [
    { reference: 'nums', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.START, style: { paragraph: { indent: { left: 420, hanging: 260 } } } }] },
  ] },
  styles: { default: {
    document: { run: { font: LATIN, size: 21, color: INK }, paragraph: { spacing: { line: 300 } } },
    heading1: { run: { font: LATIN, bold: true, color: DEEP, size: 34 } },
    heading2: { run: { font: LATIN, bold: true, color: BLUE, size: 26 } },
    heading3: { run: { font: LATIN, bold: true, color: GOLD, size: 22 } },
  } },
  sections: [{
    properties: { page: { margin: { top: 1180, bottom: 1100, left: 1180, right: 1180 } } },
    headers: { default: new Header({ children: [new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 200 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: RULE, space: 8 } },
      children: [new TextRun({ text: 'AL-MADEENAH INTERNATIONAL COLLEGE   ·   ACADEMIC & EDITORIAL BIBLE v1.0', font: LATIN, size: 14, color: GOLD, characterSpacing: 30 })],
    })] }) },
    footers: { default: new Footer({ children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ children: ['— ', PageNumber.CURRENT, ' —'], font: LATIN, size: 16, color: SOFT })],
    })] }) },
    children: [...cover, ...body],
  }],
});

Packer.toBuffer(doc).then((b) => { writeFileSync(OUT, b); console.log('wrote', OUT, b.length, 'bytes'); });
