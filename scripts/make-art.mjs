/* =========================================================================
   ILLUMINATION GENERATOR

   The site had no ART. Every band was flat colour with hairlines on it, which
   is exactly why it read as a word-processor template: a template is a layout
   without a hand in it.

   This computes real Islamic geometric construction rather than drawing
   approximate shapes by eye. Everything below comes out of polar arithmetic on
   a compass-and-straightedge construction, the way the originals were set out:

     · SHAMSA   a sixteen-fold sunburst rosette — the medallion that opens an
                illuminated manuscript. Concentric rings, two interleaved star
                polygons, a petal corona, and a dotted outer ring.
     · GIRIH    the eight-fold khatam tessellation — the eight-pointed star and
                the cross that fills between, on a true square lattice, so the
                pattern actually repeats instead of being eleven hand-placed
                quadrilaterals pretending to.
     · UNWAN    the illuminated headpiece that opens a chapter: a double rule,
                a centred rosette, and a tapered interlace.

   Written to src/assets/ as SVG and inlined by the build. No runtime cost.
   ========================================================================= */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets');
mkdirSync(OUT, { recursive: true });

const TAU = Math.PI * 2;
const r2 = (n) => Math.round(n * 100) / 100;
const pt = (cx, cy, r, a) => [r2(cx + r * Math.cos(a)), r2(cy + r * Math.sin(a))];
const poly = (points) => points.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ') + ' Z';

/* A star polygon {n/m}: n points, each point's flank skipping m vertices of
   the circumscribing n-gon. The inner radius is not chosen, it is derived —
   which is the whole difference between geometry and decoration. */
const star = (cx, cy, R, n, m, phase = 0) => {
  const inner = R * Math.cos((Math.PI * m) / n) / Math.cos((Math.PI * (m - 1)) / n);
  const p = [];
  for (let i = 0; i < n; i++) {
    p.push(pt(cx, cy, R, phase + (TAU * i) / n));
    p.push(pt(cx, cy, inner, phase + (TAU * (i + 0.5)) / n));
  }
  return poly(p);
};

/* ---- SHAMSA — the opening medallion ---- */
const shamsa = () => {
  const S = 400, c = S / 2;
  const L = [];
  const ring = (r, w, o) => L.push(`<circle cx="${c}" cy="${c}" r="${r2(r)}" fill="none" stroke="currentColor" stroke-width="${w}" opacity="${o}"/>`);

  ring(196, 1, .30);
  ring(188, 2.4, .55);
  ring(181, 1, .30);

  /* Petal corona: thirty-two teardrops around the rim, each an arc pair. */
  const petals = [];
  for (let i = 0; i < 32; i++) {
    const a = (TAU * i) / 32;
    const [x0, y0] = pt(c, c, 152, a);
    const [x1, y1] = pt(c, c, 180, a - TAU / 96);
    const [x2, y2] = pt(c, c, 180, a + TAU / 96);
    petals.push(`M${x0} ${y0} Q${x1} ${y1} ${r2(c + 180 * Math.cos(a))} ${r2(c + 180 * Math.sin(a))} Q${x2} ${y2} ${x0} ${y0}`);
  }
  L.push(`<path d="${petals.join(' ')}" fill="none" stroke="currentColor" stroke-width="1" opacity=".42"/>`);

  ring(152, 1.6, .5);

  /* Two interleaved sixteen-point stars, offset by half a point: the
     characteristic double-rosette of a manuscript shamsa. */
  L.push(`<path d="${star(c, c, 148, 16, 6)}" fill="none" stroke="currentColor" stroke-width="1.15" opacity=".8"/>`);
  L.push(`<path d="${star(c, c, 148, 16, 6, TAU / 32)}" fill="none" stroke="currentColor" stroke-width="1.15" opacity=".45"/>`);
  L.push(`<path d="${star(c, c, 104, 16, 5)}" fill="none" stroke="currentColor" stroke-width="1" opacity=".55"/>`);

  ring(78, 1.4, .5);
  L.push(`<path d="${star(c, c, 74, 8, 3)}" fill="none" stroke="currentColor" stroke-width="1.3" opacity=".85"/>`);
  L.push(`<path d="${star(c, c, 74, 8, 3, TAU / 16)}" fill="none" stroke="currentColor" stroke-width="1.1" opacity=".5"/>`);
  ring(34, 1.2, .6);

  /* The nuqṭah at the centre — the institution's own mark (IS: the dot from
     which every proportion in al-khaṭṭ al-mansūb is measured). */
  L.push(`<rect x="${c - 9}" y="${c - 9}" width="18" height="18" transform="rotate(45 ${c} ${c})" fill="currentColor" opacity=".9"/>`);

  /* Sixteen radial spokes, hairline, stopping short of the centre. */
  const spokes = [];
  for (let i = 0; i < 16; i++) {
    const a = (TAU * i) / 16;
    const [x0, y0] = pt(c, c, 36, a); const [x1, y1] = pt(c, c, 148, a);
    spokes.push(`M${x0} ${y0} L${x1} ${y1}`);
  }
  L.push(`<path d="${spokes.join(' ')}" stroke="currentColor" stroke-width=".7" opacity=".26"/>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" fill="none" aria-hidden="true" focusable="false">${L.join('')}</svg>`;
};

/* ---- GIRIH — the eight-fold khatam tessellation ----
   A true lattice: the eight-pointed star sits on every lattice point and the
   cross fills the interstice, so the pattern tiles seamlessly at any size
   instead of stopping at the edge of a hand-drawn cluster. */
const girih = () => {
  /* Large pitch, few repeats. Used as a field at very low opacity, a dense
     lattice reads as wallpaper; a large one reads as illumination. */
  const T = 300;                    // lattice pitch
  const cols = 5, rows = 3;
  const W = T * cols, H = T * rows;
  const L = [];

  /* R = T/2 with phase 0 puts a star point exactly on the axis, so adjacent
     octagrams meet tip to tip and the pattern closes. Any other radius leaves
     a gap and the tessellation stops being one — which is what the first
     attempt did, and why it read as scattered marks rather than a lattice. */
  const R = T / 2;
  for (let r = 0; r <= rows; r++) {
    for (let q = 0; q <= cols; q++) {
      L.push(`<path d="${star(q * T, r * T, R, 8, 3)}"/>`);
    }
  }

  /* The interstice left by four touching octagrams is a square standing on its
     corner. Its circumradius is R·(√2 − 1)·√2 — derived, not guessed: the
     octagram's inner vertices lie on a circle of 0.5412R, and the diagonal
     between two of them across the cell is what the square must span. */
  const sq = R * (Math.SQRT2 - 1) * Math.SQRT2;
  for (let r = 0; r < rows; r++) {
    for (let q = 0; q < cols; q++) {
      const cx = q * T + T / 2, cy = r * T + T / 2;
      L.push(`<path d="${poly([[r2(cx), r2(cy - sq)], [r2(cx + sq), r2(cy)], [r2(cx), r2(cy + sq)], [r2(cx - sq), r2(cy)]])}"/>`);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="none" stroke="currentColor" stroke-width=".9" aria-hidden="true" focusable="false"><g vector-effect="non-scaling-stroke">${L.join('')}</g></svg>`;
};


/* ---- MIHRAB — the two-centred pointed arch ----
   Not a decorative curve: a real two-centred arch, the construction used from
   the Ibn Tulun mosque onward. Springing points at the jambs, two centres set
   inboard at S/4, radius 3S/4, and the apex where the two arcs meet. Every
   number below is derived from the span; nothing is eyeballed, which is why it
   reads as architecture rather than as a shape. */
const arch = () => {
  const S = 300;                       // span
  const jamb = 150;                    // height of the vertical jamb
  const d = S / 4;                     // centre inset
  const R = S - d;                     // radius
  const ys = jamb;                     // springing line
  const apexY = r2(ys - Math.sqrt(R * R - (S / 2 - d) * (S / 2 - d)));
  const H = jamb + 40;
  const top = 0;
  const y = (v) => r2(v - apexY + 12);  // shift so the apex sits at y=12

  const outline =
    `M0 ${y(ys + jamb)} L0 ${y(ys)} ` +
    `A${R} ${R} 0 0 1 ${S / 2} ${y(apexY)} ` +
    `A${R} ${R} 0 0 1 ${S} ${y(ys)} ` +
    `L${S} ${y(ys + jamb)}`;
  /* An inner order, offset by one nuqṭah, the way a real arch carries an
     archivolt inside its extrados. */
  const o = 16, Ri = R - o;
  const apexI = r2(ys - Math.sqrt(Ri * Ri - (S / 2 - d) * (S / 2 - d)));
  const inner =
    `M${o} ${y(ys + jamb)} L${o} ${y(ys)} ` +
    `A${Ri} ${Ri} 0 0 1 ${S / 2} ${y(apexI)} ` +
    `A${Ri} ${Ri} 0 0 1 ${S - o} ${y(ys)} ` +
    `L${S - o} ${y(ys + jamb)}`;

  const L = [
    `<path d="${outline}" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".85"/>`,
    `<path d="${inner}" fill="none" stroke="currentColor" stroke-width="1" opacity=".45"/>`,
    /* impost blocks at the springing — where the arch meets the jamb */
    `<path d="M0 ${y(ys)} H${o + 10}" stroke="currentColor" stroke-width="1.4" opacity=".7"/>`,
    `<path d="M${S - o - 10} ${y(ys)} H${S}" stroke="currentColor" stroke-width="1.4" opacity=".7"/>`,
    /* keystone mark at the apex */
    `<rect x="${S / 2 - 5}" y="${y(apexY) + 6}" width="10" height="10" transform="rotate(45 ${S / 2} ${y(apexY) + 11})" fill="currentColor" opacity=".8"/>`,
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${r2(y(ys + jamb))}" fill="none" aria-hidden="true" focusable="false">${L.join('')}</svg>`;
};

/* ---- UNWAN — the illuminated chapter headpiece ---- */
const unwan = () => {
  const W = 520, H = 96, c = W / 2;
  const L = [];
  L.push(`<path d="M0 6 H${W}" stroke="currentColor" stroke-width="2.6" opacity=".85"/>`);
  L.push(`<path d="M0 13 H${W}" stroke="currentColor" stroke-width="1" opacity=".5"/>`);
  L.push(`<path d="${star(c, 52, 30, 8, 3, Math.PI / 8)}" stroke="currentColor" stroke-width="1.2" opacity=".8"/>`);
  L.push(`<path d="${star(c, 52, 30, 8, 3)}" stroke="currentColor" stroke-width=".9" opacity=".45"/>`);
  L.push(`<rect x="${c - 5}" y="47" width="10" height="10" transform="rotate(45 ${c} 52)" fill="currentColor" opacity=".9"/>`);
  for (const dir of [-1, 1]) {
    const x0 = c + dir * 42, x1 = c + dir * (W / 2);
    L.push(`<path d="M${x0} 52 H${x1}" stroke="currentColor" stroke-width="1" opacity=".45"/>`);
    for (let i = 1; i <= 3; i++) {
      const x = c + dir * (52 + i * 34);
      L.push(`<rect x="${r2(x - 3.5)}" y="48.5" width="7" height="7" transform="rotate(45 ${r2(x)} 52)" fill="none" stroke="currentColor" stroke-width=".9" opacity="${0.6 - i * 0.13}"/>`);
    }
  }
  L.push(`<path d="M0 ${H - 13} H${W}" stroke="currentColor" stroke-width="1" opacity=".5"/>`);
  L.push(`<path d="M0 ${H - 6} H${W}" stroke="currentColor" stroke-width="2.6" opacity=".85"/>`);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="none" aria-hidden="true" focusable="false">${L.join('')}</svg>`;
};

writeFileSync(join(OUT, 'shamsa.svg'), shamsa());
writeFileSync(join(OUT, 'girih.svg'), girih());
writeFileSync(join(OUT, 'unwan.svg'), unwan());
writeFileSync(join(OUT, 'arch.svg'), arch());
console.log('illumination written → shamsa, girih, unwan, arch');
