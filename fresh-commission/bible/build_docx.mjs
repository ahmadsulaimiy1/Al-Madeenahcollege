#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  Header, Footer, PageNumber, PageBreak, LevelFormat, convertInchesToTwip,
} from 'docx';

const NAVY = '16306E';
const NAVY_DARK = '101A3C';
const GOLD = 'B8933D';
const INK = '1C1A14';
const HAIRLINE = 'CABF9E';
const TABLE_HEAD_BG = 'EEE6CD';
const TABLE_ALT_BG = 'FAF7EE';

const raw = readFileSync(new URL('./academic-editorial-bible.md', import.meta.url), 'utf8');
const lines = raw.split('\n');

// ---------- inline markdown -> TextRun[] ----------
function inline(text) {
  const runs = [];
  // Tokenize on **bold**, *italic*, `code` — none of which nest in this document.
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let last = 0; let m;
  const push = (t, opts = {}) => { if (t) runs.push(new TextRun({ text: t, ...opts })); };
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('**')) push(tok.slice(2, -2), { bold: true, color: NAVY });
    else if (tok.startsWith('`')) push(tok.slice(1, -1), { font: 'Consolas', size: 19, shading: { type: ShadingType.CLEAR, fill: 'F2EEDD' } });
    else push(tok.slice(1, -1), { italics: true });
    last = re.lastIndex;
  }
  push(text.slice(last));
  return runs.length ? runs : [new TextRun('')];
}

// ---------- block parser ----------
const blocks = [];
let i = 0;
while (i < lines.length) {
  const line = lines[i];
  if (!line.trim()) { i++; continue; }
  if (/^---\s*$/.test(line)) { blocks.push({ type: 'hr' }); i++; continue; }
  const h = line.match(/^(#{1,4})\s+(.*)$/);
  if (h) { blocks.push({ type: 'h', level: h[1].length, text: h[2] }); i++; continue; }
  if (/^\|/.test(line)) {
    const tbl = [];
    while (i < lines.length && /^\|/.test(lines[i])) { tbl.push(lines[i]); i++; }
    // drop the separator row (---|---)
    const rows = tbl.filter((r) => !/^\|[\s|:-]+\|$/.test(r))
      .map((r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim()));
    blocks.push({ type: 'table', rows });
    continue;
  }
  if (/^-\s+/.test(line)) {
    const items = [];
    while (i < lines.length && /^-\s+/.test(lines[i])) { items.push(lines[i].replace(/^-\s+/, '')); i++; }
    blocks.push({ type: 'ul', items });
    continue;
  }
  if (/^\d+\.\s+/.test(line)) {
    const items = [];
    while (i < lines.length && /^\d+\.\s+/.test(lines[i])) { items.push(lines[i].replace(/^\d+\.\s+/, '')); i++; }
    blocks.push({ type: 'ol', items });
    continue;
  }
  if (/^\*.*independently.*\*$/s.test(line) || /^\*Prepared/.test(line)) {
    // italic standalone note (the front-matter block) — collect until blank
    let buf = line; i++;
    while (i < lines.length && lines[i].trim()) { buf += ' ' + lines[i]; i++; }
    blocks.push({ type: 'note', text: buf.replace(/^\*/, '').replace(/\*$/, '') });
    continue;
  }
  // paragraph: collect until blank line
  let buf = line; i++;
  while (i < lines.length && lines[i].trim() && !/^(#{1,4})\s/.test(lines[i]) && !/^-\s+/.test(lines[i])
    && !/^\d+\.\s+/.test(lines[i]) && !/^\|/.test(lines[i]) && !/^---\s*$/.test(lines[i])) {
    buf += ' ' + lines[i]; i++;
  }
  blocks.push({ type: 'p', text: buf });
}

// ---------- title block (everything before "## Preface") vs body ----------
const prefaceIdx = blocks.findIndex((b) => b.type === 'h' && /^Preface/.test(b.text));
const titleBlocks = blocks.slice(0, prefaceIdx);
const bodyBlocks = blocks.slice(prefaceIdx);

const cellBorder = { style: BorderStyle.SINGLE, size: 2, color: HAIRLINE };
const cellBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

const listNumbering = {
  config: [
    {
      reference: 'bullets',
      levels: [{ level: 0, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 460, hanging: 260 } } } }],
    },
    {
      reference: 'numbers',
      levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 460, hanging: 260 } } } }],
    },
  ],
};

function headingParaFor(level, text) {
  const map = [HeadingLevel.TITLE, HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3, HeadingLevel.HEADING_4];
  const hl = map[level] || HeadingLevel.HEADING_4;
  const isPart = /^PART [IVX]+/.test(text);
  return new Paragraph({
    heading: hl,
    spacing: { before: level <= 1 ? 420 : 260, after: 160 },
    border: level === 1 ? { bottom: { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 6 } } : undefined,
    pageBreakBefore: isPart,
    children: [new TextRun({ text, bold: true, color: level <= 1 ? NAVY_DARK : NAVY, size: level === 1 ? 30 : level === 2 ? 25 : 22 })],
  });
}

function blockToDocxFixed(b) {
  switch (b.type) {
    case 'h': return [headingParaFor(b.level, b.text)];
    case 'p': return [new Paragraph({
      alignment: AlignmentType.JUSTIFIED, spacing: { after: 160, line: 300 },
      children: inline(b.text),
    })];
    case 'note': return [new Paragraph({
      alignment: AlignmentType.JUSTIFIED, spacing: { after: 200, line: 290 },
      children: [new TextRun({ text: b.text, italics: true, color: '3A3529', size: 20 })],
    })];
    case 'ul': return b.items.map((t) => new Paragraph({
      numbering: { reference: 'bullets', level: 0 }, spacing: { after: 90, line: 290 },
      children: inline(t),
    }));
    case 'ol': return b.items.map((t) => new Paragraph({
      numbering: { reference: 'numbers', level: 0 }, spacing: { after: 90, line: 290 },
      children: inline(t),
    }));
    case 'hr': return [new Paragraph({
      spacing: { before: 200, after: 200 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD, space: 4 } },
      children: [],
    })];
    case 'table': return [tableToDocxSafeFixed(b.rows), new Paragraph({ text: '', spacing: { after: 160 } })];
    default: return [];
  }
}

function tableToDocxSafeFixed(rows) {
  const colCount = rows[0].length;
  const pageWidthTwips = convertInchesToTwip(6.5);
  const colWidth = Math.floor(pageWidthTwips / colCount);
  const columnWidths = new Array(colCount).fill(colWidth);
  return new Table({
    width: { size: pageWidthTwips, type: WidthType.DXA },
    columnWidths,
    rows: rows.map((cells, ri) => new TableRow({
      tableHeader: ri === 0,
      children: cells.map((c, ci) => new TableCell({
        width: { size: columnWidths[ci], type: WidthType.DXA },
        borders: cellBorders,
        shading: ri === 0
          ? { type: ShadingType.CLEAR, fill: TABLE_HEAD_BG }
          : (ri % 2 === 0 ? { type: ShadingType.CLEAR, fill: TABLE_ALT_BG } : undefined),
        margins: { top: 80, bottom: 80, left: 100, right: 100 },
        children: [new Paragraph({
          children: ri === 0 ? [new TextRun({ text: c, bold: true, color: NAVY_DARK, size: 19 })] : inline(c),
        })],
      })),
    })),
  });
}

const bodyChildren = bodyBlocks.flatMap(blockToDocxFixed);

// ---------- title page ----------
const titleText = (titleBlocks.find((b) => b.type === 'h' && b.level === 1)?.text) || 'Al-Madeenah International College for Arabic & Islamic Studies';
const arabicTitle = (titleBlocks.find((b) => b.type === 'h' && b.level === 2 && /[؀-ۿ]/.test(b.text))?.text) || '';
const noteBlock = titleBlocks.find((b) => b.type === 'note');

const titlePage = [
  new Paragraph({ spacing: { before: 2400, after: 0 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'INSTITUTIONAL CONSTITUTION · V1.0', color: GOLD, bold: true, size: 18, characterSpacing: 20 })] }),
  new Paragraph({ spacing: { before: 300, after: 300 }, alignment: AlignmentType.CENTER,
    border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: GOLD, space: 1 } },
    children: [new TextRun({ text: '        ' })] }),
  new Paragraph({ spacing: { before: 200, after: 100 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: titleText, bold: true, size: 44, color: NAVY_DARK })] }),
  new Paragraph({ spacing: { before: 200, after: 300 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: arabicTitle, size: 30, rightToLeft: true })] }),
  new Paragraph({ spacing: { before: 100, after: 600 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'The Academic & Editorial Bible', size: 26, color: NAVY })] }),
  new Paragraph({ spacing: { before: 100, after: 100 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: (noteBlock?.text || '').trim(), italics: true, size: 18, color: '5A5544' })] }),
  new Paragraph({ children: [new PageBreak()] }),
];

const doc = new Document({
  numbering: listNumbering,
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 21, color: INK } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 1300, bottom: 1300, left: 1200, right: 1200 },
      },
    },
    headers: {
      default: new Header({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: 'Al-Madeenah International College — Academic & Editorial Bible', size: 15, color: '8A8368' })],
      })] }),
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ children: [PageNumber.CURRENT], size: 16, color: '6B6353' })],
      })] }),
    },
    children: [...titlePage, ...bodyChildren],
  }],
});

const buf = await Packer.toBuffer(doc);
writeFileSync(new URL('./AlMadeenah-College_Academic-Editorial-Bible_v1.0.docx', import.meta.url), buf);
console.log('wrote docx,', bodyBlocks.length, 'body blocks');
