# The Design Excellence Bible

**Version 1.7 · 7 August 2026 · Cited as `DX §n`**
Al-Madinah International College of Arabic and Qur'anic Studies

The flagship standard for prestige, elegance and sophistication. Subordinate to
`docs/00-editorial-bible.md` on institutional matters; **governing on every question of
design excellence.** Where the Editorial Bible says *what is true*, this says *what is
excellent*.

---

## Preface — How this was calibrated

Written after the Founder judged the first build's visual design weak, and after a close
study of the **Sultan Hanafi Royal Schools** project (`ahmadsulaimiy1/sultan-`) — 148
pages, ~10,000 lines of CSS across thirteen layers, an 80-component prestige vocabulary,
and **109 institutional documents**.

The study is at `docs/08-wec-lc-engineering-study.md` for the WEC-LC systems. This
document takes the *design and content* excellence, and none of the colour, language or
content — as instructed.

**Three findings from that study reframed everything, and each became a Part below:**

1. **Excellence is a vocabulary problem, not an effort problem.** SHRS has ~80 named
   components; the first Al-Madinah build had ~15. A site with a small vocabulary can only
   compose in a few ways, so every section starts to look like every other section. That
   is what "weak design" actually is, mechanically.
2. **Prestige lives in the register of the content, not the decoration around it.** Their
   own bible: *"a real reviewed-and-approved policy is a stronger prestige signal than any
   amount of hero copy."* Policy codes, version tables, signed authority, precise numbers.
3. **Excellence is verified against readers, not against taste.** Their nine-persona
   walkthrough — parent, student, donor, regulator, partner, GCC parent, British educator,
   inspector, foreign registrar — each with *gets / doesn't get / verdict*. That is the
   most rigorous content-QA method I have seen in this domain, and it is adopted whole at
   §10.

---

# PART I — THE DOCTRINE OF SPACE

## §1. Space is the primary material

**White space is not what remains after the content. It is the most expensive material on
the page, and it is placed first.**

The cheapest possible instruction to a designer is "fill the space." Every mediocre
institutional site follows it. Restraint costs nothing to produce and cannot be
counterfeited by a competitor with a bigger budget — which is precisely why it reads as
expensive.

## §2. The space scale, and where each value is used

| Token | Value | Used for |
|---|---|---|
| `--s1`–`--s4` | 4–16px | Inside a component: label to value, icon to text |
| `--s5`–`--s6` | 24–32px | Between elements in one thought |
| `--s7` | 48px | Between thoughts |
| `--s8` | 72px | Between components |
| `--s9` | 112px | **Section padding, mobile — the floor, and it is a floor** |
| `--s10` | 168px | **Section padding, desktop** |
| `--s11` | 216px | Hero, and the single flagship section on a page (`.section--flagship`) |
| `--s12` | 264px | Reserved — a full-bleed ceremonial band |

**Binding minimums.**

1. **No section is padded below 112px vertically.** Ever. If content feels cramped at
   160px, the content is too long, not the padding too large.
2. **A heading is never closer than 32px to the text beneath it**, and never closer than
   72px to the element above.
3. **A page carries at most one "dense" region.** If two adjacent sections are both tables
   or both lists, one becomes prose or an infographic.
4. **Reading measure is capped at 66ch, leads at 60ch, captions at 56ch.** A line longer
   than that is unreadable regardless of how much space surrounds it.
5. **Between a section's last element and its bottom edge there is always full section
   padding.** Content that runs to the edge of its band is the single most common tell of
   an amateur build.

## §3. The half-empty rule

> **Every flagship section should be able to lose 30% of its content and improve.**

Applied concretely: write the section, then remove the third-best point. What survives is
stronger, and the space it leaves is what the reader's eye rests in. Recorded, because the
instinct under deadline is always the reverse.

## §4. Asymmetry over symmetry

Two equal boxes side by side is the default of every template on earth. It reads as a
grid, not as a composition.

**Preferred proportions**, all available as grid classes:

| Class | Ratio | Use |
|---|---|---|
| `.grid--split` | 6 : 5 | Argument beside evidence |
| `.grid--aside` | 4 : 7 | Short statement beside long detail |
| `.grid--lead` | 7 : 4 | Wide lead statement beside a narrow marginal note |
| `.grid--2` | 1 : 1 | **Only** for genuinely parallel items — never for a statement and its illustration |

The wide column carries the argument. The narrow column carries the proof, the aside, or
the number. **Never the reverse** — a wide illustration beside a narrow argument inverts
the reading order.

---

# PART II — THE ANTI-CHEAP TOOLKIT

## §5. What "cheap" means, mechanically

A design reads as cheap when its components are **generic conventions** — devices any
template ships with, carrying no information about *this* institution:

| The convention | Why it reads cheap | Our replacement |
|---|---|---|
| A grid of 3–6 icon-and-heading cards | Every SaaS landing page since 2014. The icons are decorative and carry no data | **Ledger rows** (§6.1) or the **quad** (§6.9) |
| A team page of circular avatars | Says nothing but "we have staff" | **Credential ledger** (§6.2) |
| A photo-tile gallery | A grid of images is not a composition | **Dot-leader index** (§6.3) |
| Two equal boxed columns | The template default | **Asymmetric lead** (§4) |
| A big number with a label under it | Fine — but only if the number is real and dated | **Figure rail** (§6.4) |
| A "why choose us" list with ticks | The claim format of a discount retailer | **Pledge block** (§6.7) |
| A generic "eyebrow" label | Decorative | **Folio marker** (§6.5) |
| A rounded card with a drop shadow and nothing else | The absence of a decision | **Gilded card** with role-correct radius and layered elevation |

## §6. The Component Canon

Every component below carries: what it is, **what generic convention it replaces**, and
when it may be used. **A section built from components in this canon cannot look
generic**, because none of these ship with a template.

### 6.1 Ledger row — `.ledger`
Three or four aligned columns with a hairline rule beneath each, and a gold rule beneath
the header. The register of a formal directory or transcript.
**Replaces:** the card grid. **Use for:** anything enumerable — schools, awards, policies,
faculty, fees, tenures.

### 6.2 Credential ledger — `.creds`
A ledger row whose columns are *name · credential · role*, with the credential in the
label face. **Replaces:** the avatar grid. **Use for:** faculty, board, assessors.
**Never populated with unnamed people** (`EB §46`).

### 6.3 Dot-leader index — `.dotlist`
`01 · Recitation assessed by ear ··········` — a numbered index with a leader rule. The
device of a table of contents or a museum floor plan.
**Replaces:** the photo-tile grid and the bulleted feature list.

### 6.4 Figure rail — `.figrow`
Four figures across a hairline-bounded band, each with a label in inscriptional caps.
**Every figure must be real and dated** (`EB §46`, `EB §22.2`).

### 6.5 Folio marker — `.folio`
`Chapter II · The Standard` — a museum-catalogue device opening every major section, in the
label face with a rule and the institution's rhombus.
**Replaces:** the generic eyebrow. **Rule:** every flagship section opens with one, and
they run in sequence down the page so the page reads as a bound document.

### 6.6 Monogram rail — `.monorail`
A value or principle set rendered as lettered columns divided by vertical hairlines — each
letter in the display face at large size, its word beneath in caps.
**Replaces:** six icon boxes.

### 6.7 Pledge block — `.pledge`
A numbered commitment with a gold rule above it and generous space around, set larger than
body copy. A promise the institution can be held to.
**Replaces:** the "why choose us" tick list. **Rule:** a pledge must be falsifiable — a
reader must be able to tell whether we broke it.

### 6.8 Journey path — `.path`
A horizontal sequence of stages with a connecting hairline, a rhombus node per stage, and
a label and duration beneath. **Replaces:** a numbered list of steps. **Use for:** the
admissions journey, the tenure route, the ḥifẓ progression.

### 6.9 Quad — `.quad`
Four panels in a 2×2 with a shared hairline cross between them, so the four read as one
divided field rather than four separate cards. **Replaces:** a four-card row.

### 6.10 Letter — `.letter`
A signed statement from named leadership, set in the display face at reading size, with a
signature block: name, role, credential. **Replaces:** an "about us" paragraph in the
institutional "we". Authority comes from a signed name — but **only once a real named
person exists** (`EB §46.3`).

### 6.11 Institutional frame — `.illum`
Corner brackets in gold hairline, drawn at the corners of a ceremonial element. Echoes
letterhead and the border of an illuminated page without literal skeuomorphism.
**Use sparingly** — at most one per viewport.

### 6.12 Watermark seal — `.watermark`
The institutional mark at very large scale and very low opacity, bled off one edge of a
deep band. **Never on Qur'anic text** (`EB §5.1.4`). At most once per page.

### 6.13 Comparison bars — `.info`
Two bars, same axis, one showing the common measure and one ours. **Use for:** retained vs
reached, published vs concealed pricing. **Rule:** the caption must state whether the
figures are observed or illustrative.

### 6.14 Document card — `.doc`
A published document rendered as an object: code, title, version, owner, approval date,
review date. **Replaces:** a link list. This is `§9`'s prestige register made visible.

---

# PART III — TYPOGRAPHIC EXCELLENCE

## §7. Three roles, and why the third is the one that matters

| Role | Face | What it does |
|---|---|---|
| **Display** | Cormorant Garamond | Headlines, figures, pull quotes. High-contrast old-style — the register of a printed book, not a website |
| **Label** | **Cinzel** — inscriptional capitals | Eyebrows, folio markers, buttons, table headers, figure labels, footer headings |
| **Body** | IBM Plex Sans | Everything read at length |
| **Arabic display** | Amiri | Arabic headings, ceremonial |
| **Arabic body** | IBM Plex Sans Arabic | Arabic UI and prose |

**The label face is the single highest-leverage typographic decision in this system.**
Roman inscriptional capitals carry two thousand years of association with permanence —
they are what is cut into stone above the door of an institution. Almost no competitor in
this category uses a third role at all; they set labels in the body face, small and
tracked, which reads as software.

**Binding:** every eyebrow, folio marker, button, table header, figure label and footer
heading is set in the label face, uppercase, tracked 0.14–0.32em. **Arabic never receives
this treatment** — Arabic has no case, and the Arabic equivalents fall back to the Arabic
UI face at a size that reads as a label (`EB §15.3.5`).

## §8. Scale, contrast and rhythm

1. **Display type is large or it is pointless.** The flagship display size is
   `clamp(2.9rem, 6.4vw, 5rem)`. A 32px "hero" heading is a paragraph in a hat.
2. **Contrast between levels must be dramatic.** Display to body is roughly 5:1. A scale
   where h2 is only slightly larger than body reads as undesigned.
3. **Weight goes down as size goes up.** Display at 400 or lighter; body at 400; labels at
   500. Heavy display weights read as tabloid.
4. **One italic, used once.** A single gilt italic phrase per hero, in the accent colour —
   the typographic equivalent of a gold initial.
5. **Numerals: lining and tabular** in tables and figures; never let them default.

---

# PART IV — SURFACE, EDGE, ELEVATION

## §9. The three rules that separate expensive from utilitarian

**a) Radius by role.** Crisp edges for editorial furniture — rules, table cells, section
frames — where a sharp line reads as *engraving*. Softened for anything a hand would pick
up — cards 16px, buttons 10px. Unrelieved 90° corners across the board read as
utilitarian; uniform large radii read as consumer software. The distinction *between* them
is the design.

**b) Elevation is layered.** Three stacked shadows at different blurs — a wide ambient
wash, a directional key, a tight contact shadow — plus `--bevel`, an inset top highlight
that reads as a lit edge. **One flat shadow always looks like a sticker.**

**c) Surfaces are lit, not flat.** A card is a 168° gradient from white through milk to a
faint warm tint — the way a real surface catches a light source from above-left. Not a
gradient as decoration; a gradient as *lighting*.

## §10. Colour proportion — the 75 / 18 / 7 rule

| Share | Role |
|---|---|
| **≈75%** | Light grounds — white, milk, ivory, cream, parchment, alternating for rhythm |
| **≈18%** | Lapis blue — punctuation. **One or two bands per page, never more** |
| **≈7%** | Gold — hairlines, labels, rules, marks. **Never a plane, never a gradient fill** |

Enforced in the build: `tests/run.mjs` fails if dark bands are not a minority of a page's
sections. The first build inverted this ratio, and that single error accounted for most of
what "weak" meant.

---

# PART V — MOTION AS CEREMONY

## §11. Ceremonial, not decorative

`EB §22` governs. Excellence adds one distinction: **motion in a prestige institution is
ceremonial — it marks an arrival, it does not entertain.**

| Permitted | Forbidden |
|---|---|
| A stroke that draws — the alif written, the girih assembling | Anything that loops |
| A staggered reveal as the reader arrives | Parallax, scroll-jacking |
| A gold fill sliding across a control on hover | Bouncing, confetti, typewriter |
| A bar growing to its value, once | A counter over a number we cannot evidence |

**Timing is the tell.** Cheap motion is fast and bouncy (200ms, ease-out-back). Ceremonial
motion is slow and decelerating: **900ms entrance, `cubic-bezier(.16,.8,.24,1)`**, one
curve everywhere.

---

# PART VI — CONTENT EXCELLENCE

## §12. The register of prestige

The strongest prestige signal available to us is **not visual**. It is the register in
which the institution writes about itself.

1. **Publish real documents, in full institutional form.** Every policy carries a code
   (`AC-01`), a version, an owner, an approval date and a review date, and is structured
   *Purpose · Scope · Provision · Review · Sign-off*. A reviewed-and-approved policy is a
   stronger prestige signal than any amount of hero copy.
2. **Sign things.** First person from named leadership with stated credentials, not
   faceless "we". *When a real named person exists* (`EB §46.3`).
3. **Numbers, never adjectives.** "Eight levels, 1,200 contact hours, assessed by
   recitation" beats "world-class" — which `EB §10.2` bans and the build enforces.
4. **Say what is not true, in the same register.** An Institutional Status callout set in
   the same type, the same space, the same care as everything else.
5. **Cite.** Qur'an by sūrah and āyah, hadith by collection and grading, statistics by
   source and date.

## §13. The Nine-Persona Walkthrough

Adopted whole from the SHRS method. **Before any major surface ships, it is walked by nine
readers**, each recorded as *gets · doesn't get · verdict*:

| # | Persona | The one thing they check first |
|---|---|---|
| 1 | Prospective parent, Nigeria | **What does it cost?** |
| 2 | Prospective student, adult | Can I fit this around my life? |
| 3 | Prospective student, GCC | Is the Arabic real, and who teaches it? |
| 4 | Donor / waqf contributor | Where does the money go, and how do I give? |
| 5 | Regulator | **Registration number and registering authority** |
| 6 | Accreditation reviewer | Curriculum, assessment criteria, QA outputs — **without an account** |
| 7 | Foreign university registrar | Can I evaluate this transcript in under a minute? |
| 8 | Employer verifying a certificate | Verification in under 30 seconds, no login |
| 9 | Scholar assessing our seriousness | Named faculty, chains, methodology, what we refuse to claim |

**The method's value is that it finds absences, not flaws.** Every one of those personas
can be failed by a beautiful page that simply does not answer their question. Findings are
recorded in the phase review, not fixed silently.

---

# PART VII — THE EXCELLENCE GATES

## §14. Six gates, before anything ships

| Gate | Test |
|---|---|
| **G1 · Vocabulary** | Is every section built from the `§6` canon? A section using a generic card grid fails. |
| **G2 · Space** | Does every section clear `§2`'s minimums? Does the page pass the half-empty rule (`§3`)? |
| **G3 · Proportion** | Light ≈75%, blue ≈18%, gold ≈7% (`§10`). Enforced in the build. |
| **G4 · Removal** | Cover the mark, the seal and the name. Do seven of ten readers still identify it? (`IS §6.2`) |
| **G5 · Persona** | Walk all nine (`§13`). Record *gets / doesn't get / verdict*. |
| **G6 · Truth** | Every fact real and dated; every limitation published in the same register (`EB §46`). |

## §15. Register of rejected conventions

Recorded so each argument is won once. **These have no trigger and will not be revisited.**

Icon-and-heading card grids · circular avatar team pages · photo-tile galleries ·
"why choose us" tick lists · testimonial carousels · logo clouds · countdown timers ·
hero video loops · chat bubbles · emoji in institutional copy · stock photography ·
AI-generated faces · gradient hero fills · glassmorphism · neon accents · large uniform
radii · single flat drop shadows · bouncing easing · parallax · scroll-jacking ·
typewriter effects · animated counters over unevidenced numbers · "learn more" as a
button label · sliders and carousels of any kind · mega-menus deeper than one level ·
sticky elements other than the header · pop-ups of every description.

---

## Confidence register

| Decision | Confidence | Basis |
|---|---|---|
| Space doctrine (§1–§3) | **High** | The correction the Founder identified; enforced in the build |
| The component canon (§6) | **High** | Derived from a working 80-component system; each entry names what it replaces |
| Label face as the highest-leverage choice (§7) | **High** | Almost no competitor uses a third type role |
| 75/18/7 proportion (§10) | **High** | Machine-enforced |
| Nine-persona method (§13) | **High** | Proven in the SHRS project; finds absences that visual review cannot |
| Journey path, quad, monogram rail specifics | **High** | Now built and shipped — see §16 |

---

# PART VIII — BUILD STATE

## §16. The canon as shipped

Added at v1.1, after the canon was built. A specification nobody implemented is a
wish; this table is the difference, and it is the honest half of the document.

| § | Component | Class | Built | Where it is used |
|---|---|---|---|---|
| 6.1 | Ledger row | `.ledger` | ✅ | Values, awards, pricing bands, tiers, sequence, portal |
| 6.2 | Credential ledger | `.creds` | ✅ | About — the **empty** faculty register, with its own empty state |
| 6.3 | Dot-leader index | `.dotlist` | ✅ | About — operating model |
| 6.4 | Figure rail | `.figrow` | ✅ | Home |
| 6.5 | Folio marker | `.folio` | ✅ | **Every section of every page** — 44 markers, numbered in sequence |
| 6.6 | Monogram rail | `.monorail` | ✅ | Programmes — ع ق ش م |
| 6.7 | Pledge block | `.pledge` | ✅ | Fees — the six money commitments, each with its falsifiability clause |
| 6.8 | Journey path | `.path` | ✅ | Admissions — the five steps |
| 6.9 | Quad | `.quad` | ✅ | Programmes — the four schools as one divided field |
| 6.10 | Letter | `.letter` | **Held** | Built and unused. Requires a real named person to sign (`EB §46.3`) |
| 6.11 | Institutional frame | `.illum` | ✅ | Ceremonial elements |
| 6.12 | Watermark seal | `.watermark` | ✅ | Home and About — once per page, on the single blue band |
| 6.13 | Comparison bars | `.info` | ✅ | Home, portal |
| 6.14 | Document card | `.doc` | ✅ | About — the six governing documents, versioned and status-stated |

**`.letter` is deliberately built and deliberately empty.** Populating it would mean
authoring a signed statement in a real person's name, which `EB §46.3` forbids and which no
amount of design value justifies. It ships the day the Founder or a named academic head
supplies their own words.

## §17. What the build enforces

`tests/run.mjs` now carries the two mechanically checkable gates of `§14`:

| Gate | Enforced as |
|---|---|
| **G1 · Vocabulary** | Every one of the fourteen canon components must exist in the system; every content page must compose from at least two of them; **the composition must be identical in English and Arabic** (`EB §26` — parallel authoring means the same composition, not merely the same words) |
| **G2 · Space** | `--s9` ≥ 112px, `--s10` ≥ 160px, `--s11` > `--s10`, and **every** `.section` padding rule at `--s9` or above — including on mobile, where the first build undercut its own floor at 72px |
| **G3 · Proportion** | Dark bands must be a minority of a page's sections (carried from v1.0) |
| **§2.4 · Measure** | Body ≤ 66ch, leads ≤ 62ch, captions ≤ 56ch, asserted against the CSS |
| **§6.5 · Sequence** | Folio numerals must be recognised and must run in strict sequence down each page — an inserted section that is not renumbered fails the build. It had already happened once |
| **§15 · Rejected conventions** | Carousels, sliders, marquees, testimonials, countdowns, emoji and "learn more" as a button label are all failed in markup |
| **`EB §14`** | No inline colour anywhere in the markup — a hex in a page is a colour nobody can audit for contrast. Two had already crept into the footer |

Three of those checks failed on the first run, which is the only evidence that any of them
are worth having: the mobile section floor, the two footer hex values, and — found by
screenshot rather than by test — the mobile journey axis, which collapsed to zero height
because an absolutely positioned rule was given a bottom inset and no height.

---

# PART IX — WHAT v1.0 AND v1.1 GOT WRONG

Added at v1.2. Two of this document's own claims were false when measured. Both are
corrected here rather than quietly edited above, because a design bible that cannot record
its own errors is decoration.

## §18. The Mobile Covenant — where design excellence is actually decided

`EB §48` is the constitutional article. This is its design half.

**v1.0 and v1.1 contained no rule about mobile whatsoever.** Fifteen sections on space,
typography, surface, elevation, motion and content — and not one on the screen most of our
students will use. The result was measurable: **every page scrolled 330px sideways at
375px wide**, the Arabic pages had 261 elements outside the viewport, and fifteen
interactive targets per page sat under 40px.

**What the reference project does that this one did not.** `ahmadsulaimiy1/sultan-` was
re-read specifically for this, and the gap is not subtle:

| | SHRS | This build, before |
|---|---|---|
| Media queries in the main stylesheet | **114** | 12 |
| Breakpoints in use | 600 · 720 · 760 · 800 · 820 · 860 · 900 · 960 · 1440 · 1600 | 900 · 1000 |
| `overflow-x` on html/body | `clip`, with the rationale in a comment | absent |
| Mobile navigation | full-screen drawer, `display:none/flex`, `body.nav-lock` | `transform:translateX(100%)` — **still laid out** |
| Touch targets | stated: 44px close, 52px rows | 19–34px |

**The rule this yields:** *breakpoints belong to components, not to the site.* A stylesheet
with two global breakpoints has not tuned anything; it has merely stacked everything twice.
A hundred media queries is not bloat, it is the evidence that a hundred decisions were
actually made.

**Four mechanisms, each of which caused a real failure here:**

1. **A translated-off panel is still laid out.** `transform` moves paint, not layout. The
   drawer contributed its full 330px to the document at every width. Hide by `display`.
2. **`overflow-x:clip`, never `hidden`.** Both suppress the scrollbar; `hidden` also
   establishes a scroll container, and `position:sticky` resolves against the nearest one —
   so `hidden` silently kills the sticky header. This is written in a comment in the
   reference project, and I had to break it myself to learn it.
3. **`-9999px` is horizontal overflow.** The skip-link idiom is inline-axis displacement.
   In RTL it shifts the scroll origin and clips the start of every Arabic line. Park
   off the *block* axis instead.
4. **`filter`, `transform` and `backdrop-filter` make an element the containing block for
   its `position:fixed` descendants.** The header's backdrop blur meant the drawer's
   `inset:0` resolved to the header, and the menu rendered as a 200px sliver — while
   passing a test that only asked whether it was displayed.

## §19. Colour proportion — the correction to §10

`§10` set 75 / 18 / 7 — light / blue / gold — and the build enforced it by counting dark
*sections*. Measured against **rendered pixels**, the site was already compliant: blue
never exceeded 18% on any page.

**And the Founder was still right that everything was blue.** Both facts are true, and the
reconciliation is the lesson:

| Measured | v1.1 | Why it read as blue |
|---|---|---|
| White / near-white | **78%** | the "warm light register" grounds sat at 96–97% lightness — a cream that reads as white is not a cream |
| Blue | 8–18% | within budget |
| **Gold** | **0.0–0.1%** | it existed only as 1px hairlines |

**A ratio rule counts area. The eye counts colours.** With the light grounds rendering as
white and gold rendering as nothing, blue was the only chromatic thing on the page —
so the page read as blue at 12% just as surely as it would have at 60%.

**Three corrections, all computed rather than eyeballed:**

1. **The grounds are deepened** — milk `#FBF8F1`, ivory `#F6F0E1`, cream `#EFE5CE`,
   parchment `#E9DDC2`. Every one still clears AAA for body ink; the warmth was free.
   White dropped from 78% of pixels to 15–27%.
2. **Gold gets a ground.** `--gilt #F2E4BE` is a genuinely gold band, one per page. Gold
   as a hairline cannot register at page scale; gold as a surface can.
3. **Gold splits in two.** `--dhahab` for rules and marks (≥3.0 on all six grounds, never
   text) and `--dhahab-ink #755A1A` for labels (≥4.8 on all six). Gold that is legible as
   small text must be dark; gold that looks gold must be an area. One token could not be
   both, and pretending otherwise is what produced illegible labels *and* invisible gold.
4. **The four schools each take their own colour** — teal, green, carnelian, bronze — the
   pattern the reference project uses to give every office its own accent. Four schools in
   one blue is four blue boxes.

## §19a. The theme is not a rendering detail — it is the whole page

`§19` corrected the palette and was still measuring only one of the ways a reader can
arrive. Every screenshot in this document, and every screenshot shown to the Founder, was
taken at `prefers-color-scheme: light`. The Founder's phone was in dark mode.

**Measured in dark mode, the same URL rendered 99.2% blue** — because the auto-dark block
mapped all six warm grounds onto navy. Two people described the same page in opposite terms
across three rounds of review, and both descriptions were accurate.

**Three rules follow, and the third is the general one.**

1. **The light register is the presentation.** `prefers-color-scheme` no longer switches
   anything. Dark is an accommodation a reader *chooses*; it is never substituted for them.
   This is what the reference project does — an explicit `data-pc-theme`, never the media
   query — and its bible notes that the dramatic bands intentionally do not re-theme.
2. **A dark theme is a translation, not an inversion.** Six warm papers become six warm
   dark papers: every one keeps more red than blue, adjacent surfaces stay distinguishable
   so the band rhythm survives, and the four school accents lighten rather than collapsing
   into a single gold. Mapping a warm palette onto a cool one does not darken a design; it
   replaces it.
3. **Chrome is not exempt from the colour budget.** The topbar and the footer were the two
   largest blue areas on the estate. Neither is "content", so neither was counted — and
   together they framed every page in blue no matter what lay between them. The footer is
   now the colophon of the document, printed on the document's own paper, and blue appears
   **exactly once per page**, which is the only thing that makes it read as punctuation.

| Measured, home page | before | after |
|---|---|---|
| Blue, system dark | **99.2%** | 12.9% |
| Blue, system light | 25.3% | 12.9% |
| Blue, programmes page | 10.5% | **0.1%** |
| Warm register | 43% | 70.8% |

**The gate:** `tests/responsive.mjs` now measures rendered pixels in all four arrival modes
and fails if blue exceeds 35% or the warm register falls below 45%.

## §19b. Chrome is a component too — the register menu and the colophon

The canon at `§6` covered the *page* and left the *chrome* — the header and the footer — as
undesigned furniture. That is where the last of the blue was hiding, and it is also where
the reference project is at its strongest. Both were rebuilt after a close read of
`ahmadsulaimiy1/sultan-`.

### 6.15 Register menu — `.mega`

Their navigation panel does three things a dropdown list cannot, and all three are adopted:

| Move | Why it works |
|---|---|
| **It introduces the section** — a heading and a sentence in their own column | The reader knows what they are entering before they choose inside it |
| **Every item carries a one-line description** | The choice is informed rather than a guess at a noun. "Faculty register" alone means nothing; "generated from the appointment record" means everything |
| **One destination is featured**, with a label, an arrow and a reason | The panel has a recommendation, which is what an institution with a view has |

**Improved rather than copied.** Theirs is a dark panel on a dark header. Ours is **a lit
sheet of paper** — the three-layer elevation, the inset bevel, a gold hairline along the
top edge — because the light register governs chrome too. Each programme item takes its
own school's accent on hover, so the menu carries the same four-colour system as the page.
The panel opens on `:hover` **and `:focus-within`, in CSS alone**, so it works before the
script has loaded and for a keyboard.

### 6.16 Colophon — `.colophon`, `.atlas`, `.seal`

Their footer is in three movements, and the shape is right: it **arrives** (a ceremonial
statement framed by corner brackets, before any links), it shows the institution **at a
glance** (an icon grid of every public surface, so nothing needs hunting), and it **signs
off** (a seal bar with the mark and the founding facts).

**Improved rather than copied.**

1. **Printed on the document's own paper.** A colophon belongs to the book. Theirs is a
   dark slab; ours is the gilt ground, which is also what removed the last large blue area
   from the estate.
2. **The brackets frame the statement, not the screen.** Pinned to the viewport corners on
   a 1440px display they read as decoration stuck in a window; anchored to the measure —
   `max(var(--s6), calc(50% - 470px))` — they read as a letterhead frame.
3. **The atlas opens with the Qur'anic petition** `وَقُل رَّبِّ زِدْنِى عِلْمًا` rather than a
   marketing line.
4. **Nothing loops.** Their gold underlines and header shimmer run on infinite animations.
   `EB §22` forbids anything that moves while a reader is reading, and the build fails on
   `animation … infinite`. So the gold rule under each footer heading **grows on
   engagement** instead of travelling forever — it responds rather than performs, which is
   the more confident gesture anyway.

### What the rebuild cost, and what caught it

Three defects, none visible by reading the CSS:

- `backdrop-filter` on the header made it the containing block for `position:fixed`
  children, so the drawer rendered as a sliver.
- Inside the drawer, **`:focus-within` fires on tap**, and the desktop rule it triggers
  re-applied `translateX(-50%)` — sliding the whole panel half a screen off the left edge.
  The mobile reset was one class less specific and lost.
- The drawer panel's tint stopped 24px short of the right edge, because a negative inline
  margin was not matched by a width increase.

The second is the instructive one: **a collapsed accordion is invisible to an overflow
sweep.** The gate now opens every panel in the drawer and re-measures. `§20` again — the
only valid test of a layout is to render it and look.

## §19c. Why a correct layout still read as a template

The estate was, by every measure this document had: correct on mobile, warm, well spaced,
composed from a named vocabulary, AAA on contrast. The Founder's verdict was **"a Microsoft
template."** That verdict was right, and none of the existing rules could have caught it,
because they all measured *tidiness*.

**A template is a layout with no hand in it.** What separates it from a publication is not
correctness — it is the presence of craft a word processor cannot produce. Four things were
missing, and none of them is decoration:

| Missing | Why the page failed without it |
|---|---|
| **Paper** | Flat colour fills are the loudest "this was typed, not printed" signal available. Every ground was a flat hex |
| **Plates** | There was no *art* anywhere — only rules and boxes. An institution with no photography can still have illumination; it cannot have nothing |
| **A cover** | The hero was a headline stacked on a paragraph. A publication opens with a composed title page |
| **A type layer** | No drop capital, no pull quote, no sidenote, no running head, no scale drama, and figures left at the browser default. That apparatus *is* what a book looks like |

### 6.17 Illumination — generated, not drawn

`scripts/make-art.mjs` computes three plates from real geometric construction rather than
approximating shapes by eye:

- **Shamsa** — a sixteen-fold sunburst rosette: two interleaved `{16/6}` star polygons, a
  thirty-two petal corona, concentric rings, and the nuqṭah at the centre. The inner radius
  of every star is **derived** — `R·cos(mπ/n)/cos((m−1)π/n)` — which is the whole difference
  between geometry and decoration.
- **Girih** — the eight-fold khatam tessellation. `R = T/2` at phase 0 puts a star point
  exactly on the lattice axis so adjacent octagrams meet tip to tip and the pattern *closes*.
  The first attempt used an arbitrary radius; it left gaps and read as scattered marks
  rather than a lattice, which is exactly how "geometric-ish" decoration fails.
- **Unwan** — the illuminated chapter headpiece: double rule, centred rosette, tapered
  interlace.

They are inlined at build time through an `{{ART:name}}` token, so a plate costs no request
and inherits `currentColor` from the band it sits in. **A plate is always bled off an edge
and set behind type. A boxed ornament is clip-art; a bled one is a printed page.**

### 6.18 The publication apparatus

| Device | Class | The job it does |
|---|---|---|
| Paper | `body::before` | Fractal noise at 3.2%, multiply-blended. One filter; it is what makes a ground read as stock rather than fill |
| Cover | `.cover` | A title page: decree rule, tracked overline, the Arabic set as the title at ceremonial scale **from the same margin as the English**, display type to 6.2rem, composed against a bled shamsa |
| Decree rule | `.decree` | A thick rule and a thin one with air between. Every rule on the site was 1px — the typographic equivalent of setting a whole document in one weight |
| Drop capital | `.opener` | Three lines deep, display face, gold. Marks a passage as meant to be *read* |
| Pull quote | `.pull` | Three times body size with the opening mark **hung into the margin**, so the measure stays optically flush. Hanging punctuation is the detail no template does and every fine book does |
| Sidenote | `.sidenote` | A marginal note, the way an annotated edition carries its apparatus |
| Running head | `.runhead` | Institution one side, section the other, hairline beneath — the line at the top of every page of a bound book |
| Chapter numeral | `.chapter__n` | The section number at up to 11rem, in **outline**, bled to the outer margin, sitting behind the heading. Scale contrast is the cheapest drama in typography and the page had none |
| Figures | — | **Oldstyle in prose, lining tabular in tables.** Oldstyle figures sit on the baseline with ascenders and descenders, so they read as words inside a sentence instead of shouting. The default does neither job |

**The bilingual title-page rule, learned by breaking it.** `direction: rtl` is required for
correct Arabic shaping and word order — and it also flings the line to the right margin,
where it detached from the English column it was titling. `text-align` must then be set back
explicitly. **A bilingual title page sets both scripts from the same margin.**

## §20. The rule that governs all of Part IX

> **A stylesheet cannot be checked by reading it.**

1,029 checks passed while the site was unusable on a phone. Every one of them was a check
on *text* — does this string appear, does this token exist, does this regex match. Layout
is an emergent property of a whole document in a real engine at a real width. The only
valid test is to render it and measure.

`tests/responsive.mjs` opens a real browser at 320, 360, 375, 390, 414 and 768 px, on nine
pages in two languages, and asserts what `EB §48.2` requires. **320 checks. It found the
drawer sliver that a display-only assertion had passed.**

The same principle produced `§19`: the colour claim was settled by counting rendered
pixels, not by re-reading the palette.

---

*Design Excellence Bible v1.2 — 6 August 2026. Governing on all questions of design
excellence. v1.0 specified the canon; v1.1 recorded it as built; v1.2 records what v1.0
and v1.1 got wrong.*

---

# PART X — THE TYPE SYSTEM (v3)

## §21. The stack was the problem

`§19c` gave the page paper, plates, a cover and an apparatus, and the Founder's verdict was
still that the typography was **dry**. That was correct, and the cause was not the settings.
It was the faces.

**Cormorant Garamond + Cinzel + IBM Plex Sans is the most-used "luxury" combination on the
web.** It is what a template ships with. It cannot be set out of looking like one, because
the recognition is instant and happens before anything else on the page is read. The
reference project uses the same trio; adopting it would have been copying a weakness.

Two further faults, both structural:

1. **Running text was in a technical sans.** IBM Plex Sans is a deliberately neutral
   grotesque — excellent in a terminal, and chosen for having no voice. Body copy in a sans
   is the single clearest signal that a page is an *app* and not a *publication*. It also
   carried the nav, the forms and every label, so roughly a quarter of every page was set
   in a face selected for neutrality. **That is what "dry" is.**
2. **No optical size anywhere.** A display cut at 96pt has finer hairlines and a tighter fit
   than the same design at 10pt. Serving one static weight for both is why headlines looked
   inflated and body copy looked thin — and no static family can fix it.

## §22. Four faces, no neutral sans

| Role | Face | Why this one |
|---|---|---|
| **Display** | **Bodoni Moda** — variable, `opsz 6–96` | A Didone: extreme thick/thin, the letterform of a jewellery house and a fashion plate. **Display sizes only** — a Didone at reading size is cruel to the reader |
| **Reading & interface** | **Newsreader** — variable, `opsz 6–72`, true italic, drawn small caps | Running text in a serif is the largest publication signal there is. It takes the interface too: one voice across chrome and prose is what a publication sounds like |
| **Arabic display, labels, navigation** | **Reem Kufi** — variable | **Kufi where the register is architectural.** It is built on the same square-and-circle construction the girih plates are drawn from, so the Arabic chrome and the illumination share one geometry rather than merely sharing a page |
| **Arabic reading** | **Amiri** | **Naskh where it is read.** A revival of the Bulaq press types — the correct scholarly register, and the only one appropriate to a College of Qur'anic studies |

**The Arabic rule, stated once: Kufi is architecture, Naskh is reading.** Titles, labels,
navigation and interface take Reem Kufi. Anything a reader reads at length takes Amiri.

## §23. The settings, which matter as much as the faces

Swapping typefaces changes nothing on its own.

- **Optical size matched to the size actually rendered.** `opsz 96` on the cover, 72 on `h1`
  and pull quotes, 60 on `h2`, 32 on `h3`, 16 in body, 10 in captions.
- **Negative tracking that increases with size.** −0.022em on the cover down to +0.002em in
  body. A display face set at text tracking looks inflated; this pairing is the whole
  difference between "big text" and a headline.
- **Real small caps** (`font-variant-caps: all-small-caps`) for every label, using the
  font's *drawn* small-cap forms. A display capitals face pasted onto a 10px label is
  costume; drawn small caps are refined.
- **Ligatures, contextual alternates and kerning on** — off by default in some engines, and
  a page without them has visibly wrong `fi`, `ffi` and `Th`.
- **Oldstyle figures in prose, lining tabular in tables** (carried from `§19c`).
- **19px/1.66 in a serif**, replacing 17px/1.72 in a sans — a book measure rather than a
  web-app measure.

## §24. What it costs, and what was done about it

Variable faces with two italics came to **~420KB of Latin**, four times the static stack.
`EB §14` commits this College to *"a three-year-old Android phone, on 3G, on a metered
plan"*, and 420KB of type on that connection is a decision made against our own students.

Two reductions, in order:

1. **Axis slicing.** Variable *deltas*, not outlines, are the bulk of a variable font. A
   face carrying `wght 200–800` when the design uses `300–600` is paying for four weights it
   never sets. Each axis was cut to its used range; the two italics, which are set at one
   weight each, were instanced to a single weight with `opsz` intact. **370KB → 248KB.**
2. **Subsetting to the glyphs the site sets** — read out of the *built* HTML, not guessed —
   plus the full transliteration apparatus (ā ḥ ī ṣ ṭ ū ẓ ʿ ʾ), because a missing macron in
   the middle of *itqān* is the defect nobody catches until print. **248KB → 204KB.**

Dropping IBM Plex entirely removed a further 77KB. **The final stack is 204KB of Latin
across four files** — roughly 94KB more than the old static stack, spent deliberately on
the one thing no static family provides.

**The build now measures the font budget in bytes, not files.** A file count was the wrong
metric the moment the system went variable: one file covering `wght 300–600` and
`opsz 6–72` is four files of design space, and counting it as one rewards the wrong thing.
What the student on 3G pays is bytes. The budget is 240KB, and the old faces are asserted
*absent* rather than merely unused, so a stray rule cannot resurrect them.

---

*Design Excellence Bible v1.6 — 7 August 2026.*

---

# PART XI — THE FOOTER

## §25. A footer is a seal, not a strip

The pale parchment footer was the honest consequence of `§19a` — chrome counts against the
colour budget, so the two largest blue areas were made light. It removed the blue and it
read as **dry**, which was correct.

**The error was treating the foot of the page as more page.** It is not. It is where an
institution puts its emblem and signs, and a seal pressed in the same colour as the paper
is not a seal.

### What the Gulf official register does

Studied from Saudi and Emirati institutional estates — `my.gov.sa`, `u.ae`, the cultural
and royal-commission sites. Four moves, all adopted:

1. **The foot of the page is a deep slab.** Never a pale strip. The document ends and the
   seal begins, and the transition is visible.
2. **The emblem is set at scale, in gold, alone** — not shrunk into a corner beside a
   copyright line. Ours is now 240px, lit, inside its own shamsa: a mark presented the way
   a seal is presented, framed rather than floated.
3. **Both scripts carry the name at weight.** In that register the Arabic is never the
   smaller line. Ours is the larger.
4. **The institution warrants something.** Their footers carry conformance and transparency
   statements — accessibility standard, last updated, certification. It is the most
   institutional device in the whole vocabulary.

### The warrants — the move that only works if it is true

`§6.19 .warrants` — four statements of what this estate guarantees. **Every one is verified
in the build**, which is the difference between a warranty and a boast (`EB §46`):

| Warrant | Enforced by |
|---|---|
| WCAG 2.2 AA and AAA | Contrast computed from the shipped stylesheet across all six light grounds; a failing colour fails the deploy |
| Bilingual in full | Every English path asserted to have an Arabic counterpart; the build fails if one is missing |
| The honesty protocol | The superlative guard and the institutional-status blocks |
| Six governing documents | Versioned, owned, and listed in the register |

A conformance badge nobody checks is a sticker. Ours is a check that runs 1,949 times.

### The ground, chosen by measurement

**`#0B0E16`** — a blue-black ink that reads as near-black. Selected against three criteria,
not by eye:

- **It does not spend the blue budget.** `§19a` caps blue at 35% of rendered pixels, and
  the classifier reads a colour as blue when `b > r+14 && b > g+8`. At `#0B0E16` the blue
  channel is 22 against a threshold of 25 — dark enough to fall on the ink side. Measured
  after the change: blue **14.9%** on the home page and **1.5%** on programmes, with the
  seal itself 20–28% and the warm register above it at 50–56%.
- **It carries gold at 11.6:1 and reversed body at 18.2:1** — AAA on both, with room.
- **It is our own ink**, not a new colour. The palette did not grow.

### The five movements

| | | |
|---|---|---|
| I | **The arrival** — `.fseal` | Corner brackets anchored to the measure, a girih field at 6%, the emblem at scale, `وَقُل رَّبِّ زِدْنِى عِلْمًا`, the institutional line, a rosette rule, then both lockups |
| II | **The directory** — `.fgrid` | Four columns, iconised small-caps headings, a gold rule that grows on engagement |
| III | **The atlas** — `.atlas` | Fourteen icon medallions: every public surface visible at once, no hunting |
| IV | **The warrants** — `.warrants` | What the estate guarantees, each with a gold cap rule |
| V | **The attestation bar** — `.fbar` | Bilingual copyright, build date, and the accreditation status as a bordered badge rather than fine print |

**A lit gold edge marks the join.** A dark slab that simply begins reads as a colour change;
a slab with a gold edge reads as something *pressed onto* the page.

---

*Design Excellence Bible v1.7 — 7 August 2026.*
