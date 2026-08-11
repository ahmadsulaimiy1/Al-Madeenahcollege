# Al-Madeenah International College — Design System v1.0
### Companion to the Academic & Editorial Bible v1.0. Governs everything visual until superseded.

This is a working design system, not a second Bible: short, decision-bearing, and built
to be checked against two high-fidelity explorations before it is trusted to scale
across the whole institution. Where the Bible's Part VII states a principle (§32–§39),
this document makes it a specific, buildable decision.

**SHRS status, stated once.** `shroyalschools.ng` was attempted again directly
(`curl` against the live host) before this document was written: `CONNECT tunnel
failed, response 403`. Confirmed blocked a second time, by a different method, not
merely repeated from memory. This system is built from general premium-design
principles and the Bible's own doctrine, not from a site this environment cannot
reach. If the block lifts later, run a real forensic pass and adapt — never copy —
anything worth taking from it.

---

## 1. Typography

**Two scripts, two registers each — four families total, chosen for real character
range rather than novelty:**

| Role | Latin | Arabic |
|---|---|---|
| Display / editorial | **Fraunces** (variable, wide optical-size axis) | **El Messiri** |
| Interface / body | **Manrope** | **Markazi Text** |

**Why Fraunces.** A serif with genuine optical-size range means the same family reads
as a considered, slightly characterful headline at hero size and a calm, readable
text face at body size — without switching families. Its soft, old-style curves read
as warm and editorial rather than corporate-serif or Didone-luxury-cliché. Used at
high optical size (opsz → 144) for hero type, low optical size (opsz → 9) for body-set
pull quotes.

**Why Manrope.** A humanist-geometric sans with real personality in its weight range
without tipping into the extremely generic (Inter-everywhere) or the extremely
trendy. Carries navigation, buttons, labels, captions, and body UI copy.

**Why El Messiri.** A distinctive Arabic display face with genuine weight range and a
warm, slightly condensed character that pairs with Fraunces' own warmth rather than
fighting it — deliberately not a Kufic or a naskh-revival face, both heavily used in
this category already.

**Why Markazi Text.** Designed specifically for Arabic body text at small sizes,
where Naskh-revival display faces become illegible. Carries Arabic UI, navigation,
and body copy.

**Rules.** Arabic type is never rendered smaller than its Latin counterpart at the
same semantic weight — Arabic scripts need more optical size to read at parity, and
setting them at the Latin pixel size is the single most common tell of a
mirrored-not-authored bilingual site. No font-synthesis (no faux-bold, no faux-italic)
under any circumstance. Letter-spacing on Arabic is never touched — Arabic has no
concept of tracking and adding it breaks letter connections.

**Scale (fluid, `clamp()`-based, desktop→mobile):**

| Token | Role | Size |
|---|---|---|
| `--fs-hero` | Hero headline | clamp(2.75rem, 5.4vw, 4.75rem) |
| `--fs-h1` | Section title | clamp(2rem, 3.4vw, 3rem) |
| `--fs-h2` | Sub-section title | clamp(1.5rem, 2.2vw, 2rem) |
| `--fs-lead` | Lead paragraph | clamp(1.15rem, 1.6vw, 1.375rem) |
| `--fs-body` | Body text | 1.0625rem |
| `--fs-label` | Nav / labels / eyebrows | 0.8125rem, tracked +0.08em, uppercase |

---

## 2. Colour

**Royal Blue dominant, gold restrained, cream and ivory as the light foundation** —
exactly the Bible's instruction, made into specific values:

```
--blue-950  #0B1B42   deepest — footer, cover bands
--blue-900  #122352   secondary deep panel
--blue-800  #16306E   ROYAL BLUE — the institutional colour. Hero, header-on-scroll, primary fills
--blue-700  #1E3F8F   interactive states, blue text on light needing AA
--blue-600  #2C52AC   links on light backgrounds

--gold      #B8933D   the institutional gold — lines, marks, small emphasis. NEVER a fill area
--gold-light #D9BC7B  gold on dark blue, where more luminance is needed for AA
--gold-ink  #8C6A22   gold used AS TEXT on light grounds (the only context gold clears AA)

--ivory     #FAF6EC   primary light background — warm, not stark white
--cream     #F3ECDA   secondary panel background
--parchment #ECE2C7   deepest light band — quotes, the credential ledger, emphasis panels
--hairline  #DDD0AC   borders and rules on light grounds

--ink       #191A22   primary text (a near-black with a cool cast, not pure black)
--ink-soft  #4A4C5C   secondary text
--ink-faint #7A7C8C   tertiary / meta text
--on-blue      #F4EFE0  text on Royal Blue
--on-blue-soft #C7D0EA  secondary text on Royal Blue
```

**The one rule that protects the palette from becoming decoration:** gold is a line,
a rule, a small mark, or letter-spaced label text at `--gold-ink` weight on light
grounds — never a filled button, never a large background area, never a gradient
standing in for a fill. The moment gold covers real area it stops reading as a seal
and starts reading as foil. Verified by contrast computation before this system
ships to build, the same way the Bible's own honesty doctrine gets verified rather
than assumed (§6).

**Distribution target.** Royal Blue anchors the page — header, footer, hero, and a
disciplined minority of section bands — but the *majority* of the reading surface is
the warm ivory/cream register with dark text, so the institution reads as light,
legible, and printed rather than as a dark "tech" site with an Islamic label on it.

---

## 3. Grid and spacing

Content max-width **1,240px**; body-copy measure capped at **68ch**. An 8px base
spacing unit, but section rhythm is intentionally generous rather than dense —
luxury is bought with room to breathe, not with density:

| Token | Value | Use |
|---|---|---|
| `--sp-1`…`--sp-4` | 8 / 12 / 16 / 24px | Component-internal spacing |
| `--sp-5`/`--sp-6` | 32 / 48px | Card/element gaps |
| `--sp-7` | 72px | Sub-section gaps |
| `--sp-8` | 104px | Minimum section padding, mobile |
| `--sp-9` | 152px | Section padding, desktop |
| `--sp-10` | 208px | Flagship bands (hero, closing statement) |

---

## 4. Imagery and iconography

**No stock photography, ever — the Bible's honesty doctrine (§5) makes this a
content rule, not merely a taste preference.** Until real, consented photography of
real teachers and real students exists, no photograph ships. In its place: a single,
original, restrained geometric motif — an abstracted arch-and-column line drawing,
built from true geometric construction rather than a downloaded "Islamic pattern"
asset — used sparingly as a low-opacity plate behind a hero or a section opener,
never as decoration covering a meaningful area. This is deliberately not a girih
tessellation or an eight-point star field, both the most reached-for and least
distinctive motifs in this category; a single quiet arch says "library and
scholarship" without saying "template."

**Iconography.** A small, custom, consistent set of 1.5px-stroke line icons —
no icon-font library, no emoji, no filled glyph-badge clichés. Used only where they
carry real information (a modality, a pace, a status), never as decoration.

---

## 5. Components

**Buttons.** Primary = solid Royal Blue fill, `--on-blue` text, lifts 2px on hover.
Secondary = 1px gold-ink outline, transparent fill, gold fills in as a wipe from the
inline-start on hover — gold appears only as a line until the moment of interaction,
never as a resting fill. Tertiary = text link with an underline that grows from 0 to
full width on hover/focus, never present at rest.

**Navigation — revised after Founder review (v1.1).** The first draft of this system
specified a single slim bar. The Founder's review corrected that expectation
explicitly: a distance-learning college with a real academic ladder, a credential
register and a governance structure has enough genuine substance to warrant a
**layered institutional header**, not a link row — provided every layer earns its
place by tracing to an actual page, never padded to *look* comprehensive. Built as
five layers, each doing one job:

1. **Utility strip** (`--blue-950`) — contact channel, reading-size control,
   language toggle, sign-in. Present but quiet; the first thing crossed, not
   dwelt on.
2. **Identity row** (`--ivory`) — wordmark, a one-line honest status tag ("Founding
   phase · Fully distance-learning" — never a fabricated founding date), search,
   the primary placement CTA, and the menu control on narrow viewports.
3. **The navigation grid** (`--cream`) — the structural centrepiece: seven
   destinations (The Institution, Academics, Admissions, The Study, Credentials,
   News, Contact) as icon-labelled cells in a single ordered row, not a dropdown.
   Seven was chosen because that is how many first-level destinations the
   information architecture actually has — the count is a consequence of the IA,
   never a target to hit.
4. **Secondary action strip** (`--parchment`) — the small number of things a
   returning visitor actually wants fast: sign in, the placement assessment,
   verification, the Bible, admissions contact. One is visually primary (gold
   fill); the rest are quiet text.
5. **Notices** (`--ivory`) — a single honest line, following the same doctrine as
   everything else: "no active announcements yet" is what it says until that
   stops being true.

The whole header is sticky; past a scroll threshold, layers 1 and 5 step aside so
only identity + the navigation grid persist — full ceremony at the top of the page,
a working header while reading. **On mobile**, layers 3 and 4 do not disappear —
they relocate into a full-screen drawer as a two-column icon grid plus a
prioritised action list, opened by `display` rather than `transform` so it can
never cause horizontal scroll. This was a real bug in the first build of this
system (a fixed-width identity row forced 344px of horizontal overflow at 390px
viewports) — found by measuring `scrollWidth` at seven breakpoints, not by eye,
and is why every flex/grid chain in this system now carries an explicit
`min-width: 0` rather than relying on the default.

**Hero.** Full-bleed Royal Blue, not a photograph — consistent with the imagery rule
above, and more distinctive than another photo-hero. A large Fraunces headline in
`--on-blue`, a single thin gold rule beneath it, the Arabic line set in El Messiri at
genuine size (never a shrunk afterthought), and the quiet arch motif sitting low and
faint in the background. No slider, no carousel, no auto-rotating claims — one
considered statement, stated once.

**Programme presentation.** Not a four-icon card grid — the most reached-for and
least distinctive convention in this category. Instead, an **editorial index**: each
faculty is a full-width row with a large faint ordinal numeral, the Arabic and
English faculty name, a two-line description, and its assessed modalities as a plain
tag list, separated by hairline rules — the layout of a serious prospectus's table of
contents, not a SaaS feature grid.

**Cards**, where a card genuinely is the right shape (a pace option, an award in the
ladder), carry no drop shadow — a 1px hairline border and a flat `--cream` or
`--ivory` fill instead, because a shadow is a convention borrowed from software
chrome and this is not software chrome.

**Footer — revised alongside the header (v1.1).** Also rebuilt as "the final
architectural floor" rather than a thin strip: a full-bleed `--blue-950` bookend to
the hero, opening with an **"institution at a glance" grid** — sixteen icon-labelled
destinations (governance, each of the three faculties, the professional stream,
placement, admissions, fees, the Study, the award ladder, verification,
safeguarding, privacy, news, the Bible, contact) — followed by **six column
groups** (Institution, Academics, Admissions & Study, Credentials & Policies,
Contact, plus the brand block), then a single honest status line. Every item in
both the glance grid and the columns was derived from this institution's actual
three-experience architecture (§30 of the Bible) — there is deliberately no
"Parent Portal," "Marketplace," "Campus Map," or "Gallery," each of which would
either duplicate the Study, imply a campus this institution does not have, or
exist only to make the footer look fuller than the institution actually is. **On
mobile**, the glance grid narrows (8→4→3 columns) rather than disappearing, and
the column groups become `<details>` accordions — native, keyboard-accessible,
no JavaScript required — so the same hierarchy survives at every width instead of
being replaced by a shorter, different footer.

---

## 6. The Study is not the website, on purpose

The public website carries the institution's full ceremonial register — deep blue,
gold, Fraunces at scale. **The Study, and specifically the Reading Room, does not
borrow that register.** A student inside a lesson is there to concentrate for an
hour, not be impressed for ten seconds; applying the homepage's hero-and-plate
apparatus to a lesson screen would be a failure of understanding the two surfaces
are for different things, not a triumph of consistency. This is a design-system rule
in its own right, established here because the Bible's §28–29 describe the *feel* the
Study should have without yet making it a rule a build could be checked against.

**Reading Room visual language:** predominantly `--ivory`/`--cream`, a single slim
`--blue-800` rail for orientation (where am I, what's next), body content set in
Fraunces at text optical size for genuine reading comfort, almost no gold at all —
a hairline only, if anywhere — and a hard ban on decorative statistics, unread
badges, or a card grid standing in for a lesson plan. Motion is reduced further than
the public site: entrances only, nothing ornamental.

---

## 7. Motion

Entrances only — 8–12px translate plus opacity, 450–650ms, ease-out, once per
element, fully removed under `prefers-reduced-motion`. One signature gesture,
reserved for real ceremony rather than spent on every section: a **thin gold rule
that draws itself left-to-right** when a major section or the hero enters view.
Nothing loops except a genuine `aria-busy` indicator. Hover states: a 1–2px lift on
buttons and cards, an underline sweep on text links, a gold wipe on secondary
buttons — all under 200ms, all instant enough to feel responsive rather than
performative.

---

## 8. One institution across every surface

Per the Bible's instruction to treat brand → website → Study → certificates →
transcript → communications → photography → motion → typography as one relationship,
not nine separate design efforts: the same Royal Blue, the same gold-as-line
discipline, the same Fraunces/El Messiri display pairing appear on a certificate
exactly as they appear in the hero — the certificate is not "designed later" by
whoever is free that week. This is stated here as a binding rule for the
implementation phase (the certificate and transcript templates are built from
this system, not invented separately) rather than demonstrated yet, since a
certificate cannot be built believably before real credentials exist to put on one.

---

## 8a. Elegance, corrected (v1.2)

The first built pass of the header and footer (v1.1, above) got the *density* right
and the *warmth* wrong: flat cream cells, hairline 1px dividers, and rectangular
badges read as an ordered directory, not an institution with real prestige. The
Founder's correction, pointed at the same SHRS reference used for density in v1.1:
the softness and lift are as much the point as the structure.

**What changed, concretely.** Every destination in the navigation grid and the
footer's "at a glance" grid became its own **raised, gold-rimmed card** — generous
corner radius, a soft warm gradient fill (`--ivory` → `--cream` in light contexts,
`--blue-900` → `--blue-950` in dark), and a real shadow that deepens and lifts the
card 3–4px on hover, rather than a flat colour swap. Every icon moved from sitting
bare in a cell to sitting inside its own **circular medallion** — a 44–50px ring in
gold, on a radial-gradient ground — because a badge reads as a seal and a bare icon
reads as a bullet point. The wordmark gained the same treatment: the arch mark now
sits inside its own gold-rimmed roundel everywhere it appears (header, drawer,
footer), which is what turns a logo into something closer to an institutional
crest. Every button became a true pill (`border-radius: 999px`), and the flat
notices/subnav bar became a row of floating pill actions with their own shadow.

**What did not change, and why.** Gold is still never a large filled area — a
44–50px circular ring around an icon is a mark, in the same sense a wax seal or a
coin is a mark, not "gold as a fill" in the sense §2's original rule was written to
forbid (a gold button face, a gold background band). The primary action anywhere
on the page is still Royal Blue, not gold, so the institution's own colour
hierarchy — blue leads, gold marks — survives the richer treatment rather than
being overridden by it. Nothing here reaches for SHRS's literal palette (no
bronze, no black-and-gold dark mode), its crest, or its exact card shapes
(theirs are closer to true circles on a flat card; this system's cards are
rounded rectangles holding a circular badge) — the correction was about **warmth,
lift and a sense of weight**, not about matching their surface.

## 8b. The header is chrome, not a menu (v1.3)

A second Founder correction, sharper than it first sounds: the rich header was
collapsing into the hamburger drawer at 920px, which is well inside ordinary
laptop and tablet window widths — so most real visits were seeing "click to
reveal" when the reference is "always there." The fix was the actual bug, not a
matter of taste: the navigation grid and the action strip are now **persistent
chrome** from full desktop width down to 640px, reflowing (wrapping to a second
row, or letting the action strip scroll horizontally) rather than disappearing.
The drawer now exists for genuine phone widths only — below 640px, where seven
cards plus five pills would be most of the visible page rather than a header.
Re-verified at fifteen widths from 320px to 1920px, including the 700–1180px
band that was silently broken before.

## 8c. A signature motion language (v1.3)

Requested explicitly: more of the *effect* — traveling light, a typewriter-style
reveal, the kind of motion a reference site uses to feel alive rather than
static. Added as a small, named, **finite** family — every new animation here
runs once (on load or on hover) and ends in a stable resting state; nothing new
loops, which keeps it inside the motion doctrine §7 already commits to.

- **The travelling light.** A bright glint crosses the hero's gold rule once,
  timed just after the rule finishes drawing in, and a second, wider version
  crosses the header's top hairline on load. This is the single most
  "SHRS-coded" gesture in the system, deliberately: a line that catches the
  light reads as gilt in a way a static line cannot.
- **The type-on reveal.** The hero eyebrow ("Arabic · Qur'an · Islamic
  Sciences") types on in a CSS `steps()` reveal with a blinking caret that
  settles solid after four blinks — a registrar's line being entered, not a
  terminal effect. Reserved for short, label-like text; a typed-out headline
  would read as a gimmick rather than a flourish.
- **Card shine.** Every card in the navigation grid, the footer's glance grid,
  and the primary button gets a single diagonal gleam that crosses it once per
  hover — the same gesture that makes a badge look like metal catching light,
  applied consistently across every raised surface in the system.
- **Hero parallax.** The arch motif behind the hero drifts at 8% of scroll
  speed, capped, so the hero has a sense of depth without becoming a sticky
  background effect.

All of the above is skipped entirely — not slowed, not simplified, removed —
under `prefers-reduced-motion`, per the standing rule in §7.

## 9. What this document does not decide

Grid breakpoints below 768px, the full icon set, the certificate and transcript
templates themselves, and motion timing on the Study's live-class surface are
implementation-phase work, built once the two explorations below are reviewed and
approved rather than guessed at here. This document is deliberately stopped at the
point where more detail would be theory rather than something checkable against a
real screen.
