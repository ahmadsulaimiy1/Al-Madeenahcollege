# كلية المدينة الدولية
# Al-Madinah International College — Editorial Bible

**Version 0.7 — RATIFIED 2 August 2026**
**Status: IN FORCE.** Ratified by the Founder, 2 August 2026. Amendments follow §47.

*v0.3 incorporates three Founder rulings (D-01, D-04, D-10), two decisions taken under
executive autonomy (D-02 the institutional name, D-12 the group architecture — see
`docs/01-naming-and-brand-architecture-study.md`), and six remediations from the Phase 1
peer review (`docs/02-phase-1-peer-review.md`). See §47's amendment log.*

*Two findings from that review are **critical and unremediated**: **A-1** (notional learning
hours — partially fixed here at §33.2a, full remedy is Phase 3) and **C-1** (no data
residency position — Phase 9, and unlawful to process real student data before it is
resolved).*

---

## Preamble — What This Document Is

This is the constitution of the institution. It governs every subsequent decision:
every page, every price, every glyph, every lesson, every email, every certificate.

Three rules govern the document itself:

1. **It outranks preference.** Once ratified, a design, copy, or product decision that
   contradicts this Bible is wrong by definition, regardless of who prefers it —
   including the Founder, including me. The remedy is to *amend the Bible* (§48), not
   to make a quiet exception. Exceptions are how institutions lose their character.

2. **It never asserts a fact the institution does not yet possess.** Where a fact is
   unknown or undecided, this document says so plainly and in the same voice as
   everything else. See §47, the Institutional Honesty Protocol — the single most
   important article in this Bible.

3. **It is versioned, cited, and amendable.** Articles are cited as `EB §14.2`.
   Amendments are recorded, dated, and reasoned in §48.

### How this was researched

| Source | What was obtained |
|---|---|
| `ahmadsulaimiy1/Al-Madeenahcollege` | Empty repository, no commits — this is a greenfield build |
| `ahmadsulaimiy1/worldwencollege` (WEC-LC) | **Read in full.** 215 files: bilingual EN/AR static site, Cloudflare Pages Functions backend, D1 schema, 4 payment-gateway adapters, FX service, LMS content model, 17 strategy documents including an existing Editorial Bible |
| `ahmadsulaimiy1/shroyalschools` | 17 photographs, no site code — nothing architecturally instructive |
| `ahmadsulaimiy1/sultan-arabic` | Empty repository |
| `shroyalschools.com` | **Could not be read.** This environment's network gateway returned 403 on CONNECT |
| `abisulaimiycollege.com.ng` | **Could not be read.** Same gateway block; web search returned no substantive record of the institution |

The last two are a real gap, disclosed rather than papered over. Article §47 forbids me
from characterising a website I could not open. Two consequences follow, and the Founder
should register both: (a) any claim in later phases about what those sites do well or
badly must come from the Founder or from a session with network access to them; (b) if
Al-Madinah is intended to *succeed*, *absorb*, or *sit alongside* Abī Sulaimiy College,
that relationship is an unanswered strategic question — see `docs/decision-register.md`
D-01.

### What this Bible inherits from WEC-LC, and what it deliberately rejects

**Inherits:**
- The *no-invented-facts* discipline and the "Institutional Status" callout pattern.
- Config-driven commercial policy (prices, FX rates, discount rules live in data, never
  in code) — proven, tested, and directly reusable.
- Provider-agnostic payment architecture (one interface, swappable gateways).
- The bilingual build discipline (one design system, structural RTL mirroring, not a
  translation plugin).
- Anti-template design motifs: ledger tables over card grids, numbered module markers
  over generic eyebrows, dot-leader indexes over icon boxes, hairline stat rows over
  marketing badges.

**Rejects, deliberately:**
- **WEC-LC's palette and typefaces.** Royal Blue / Gold / Oxblood with Playfair Display
  belongs to a different institution. Reusing it would make Al-Madinah look like a
  sibling brand of an English-language college, which it is not.
- **English-first architecture with Arabic as a mirror.** WEC-LC built English, then
  mirrored it to `/ar/`. That is correct for an English college. It is *indefensible*
  for an Arabic and Qur'an college. See §27: **Arabic is not a translation.**
- **CEFR as the sole progression spine.** Appropriate for English; insufficient for
  Qur'an memorisation, which cannot be measured in months. See §34.
- **Six fixed levels × fixed months.** The Founder's own brief calls for "unique and
  fast-tracked duration." Fixed-duration programmes contradict that. See §34.

---

# PART I — FOUNDATION

## §1. Vision

> **To be the institution the world turns to when it wants Arabic and the Qur'an taught
> properly — and the proof that it can come from Africa.**

Extended form, for institutional use:

Al-Madinah International College exists to become the most respected premium institution
for Arabic language, Qur'anic memorisation and the Islamic sciences originating from the
African continent — recognised internationally for the depth of its scholarship, the
integrity of its certification, and the beauty and clarity of its teaching — while
remaining reachable by any sincere student, in any economic circumstance, anywhere in
the world.

**Note on how this is written.** The vision is stated as *a destination we are travelling
toward*, never as an accomplished fact. Nothing on any surface of this institution will
ever say "the leading Arabic college in Africa" until an independent, citable authority
says it first. See §10.3 and §47.

## §2. Mission

Six commitments. These are load-bearing — every programme, feature, and price must trace
to at least one.

1. **Teach Arabic as a living language and as the key to revelation** — not as grammar
   drills, and not as tourist phrasebook conversation, but as genuine access to the
   Qur'an, the Sunnah, and the classical intellectual tradition.
2. **Guard the Qur'an's transmission** — memorisation taught with *itqān* (mastery) and
   correct *tajwīd*, under teachers with a traceable chain, toward certification that
   means something.
3. **Let mastery, not the calendar, decide progress** — multiple completion routes,
   honestly signposted, so a student who can move faster is not held back and a student
   who needs longer is not shamed or dropped.
4. **Price by capacity, not by postcode prestige** — a published, dignified, honest
   regional pricing model that makes a serious Islamic education affordable in Kano and
   sustainable in Kuwait. (§38–§41.)
5. **Build the institution African Muslims are sent *to*, not sent *from*** — reversing
   the assumption that serious Islamic study must be pursued abroad.
6. **Operate with the *adab* we teach** — in our marketing, our pricing, our data
   handling, our refunds, our complaints process, and our conduct toward the students
   who do not enrol.

## §3. Core Values

Eight values. Each carries an operational test, because a value with no test is
decoration.

| # | Value | Arabic | The operational test |
|---|---|---|---|
| 1 | **Trustworthiness** | الأمانة | Would this claim survive a student asking "prove it"? If not, it does not ship. |
| 2 | **Mastery** | الإتقان | Would a qualified examiner outside this institution certify this student at this level? |
| 3 | **Sincerity** | الإخلاص | Would we still do this if no one were watching, and no one could be billed for it? |
| 4 | **Courtesy** | الأدب | Would we say this sentence to the student's face, in their parent's presence? |
| 5 | **Excellence** | الإحسان | Is this the best version we know how to make, or the fastest one we could ship? |
| 6 | **Justice** | العدل | Does this treat the student in Zaria by the same standard as the student in Doha? |
| 7 | **Accessibility** | التيسير | Does this work on a 3-year-old Android phone, on 3G, on a metered data plan? |
| 8 | **Continuity** | الاستمرار | Will this still be true, maintained, and answerable in ten years? |

**On value #1.** Trustworthiness is listed first and is not negotiable against any other
value. Where trustworthiness conflicts with growth, conversion, or revenue,
trustworthiness wins and the growth target is revised. This is the article that decides
§39.

## §4. Educational Philosophy

### 4.1 The five convictions

**a) Arabic is not a subject. It is the instrument.**
We do not teach Arabic *and* Islamic studies as parallel tracks that occasionally wave at
each other. Arabic is taught as the tool that opens the tradition, and the tradition is
the material on which Arabic is practised. From the earliest level, students read real
sentences from real sources — graded, supported, but real.

**b) Memorisation without understanding is incomplete; understanding without
memorisation is unanchored.**
Ḥifẓ and comprehension are taught as one discipline. A student memorising a sūrah learns
its vocabulary, its structure, and its meaning at a level appropriate to their stage.
This is a deliberate rejection of the parrot-ḥifẓ model — and equally of the "meaning
only, never memorise" model.

**c) *Itqān* is a gate, not a grade.**
A student does not advance because a term ended. They advance because they demonstrated
mastery. This is the single most consequential academic decision in this Bible, and it
drives the entire product architecture. See §34.

**d) The teacher is irreplaceable; the technology is not.**
Every piece of technology in this institution exists to do one of three things: put the
student in front of a qualified teacher more often, make the teacher's judgement more
informed, or remove work from the teacher that a machine does better. Technology that
replaces the teacher-student relationship is out of scope, permanently. This is a
governance constraint on §9 of the Technology Architecture, not a sentiment.

**e) Recitation is heard, not read.**
Tajwīd, makhārij, and ḥifẓ quality cannot be assessed through a written quiz. Any
progression gate touching recitation requires *audio*, reviewed by a qualified human, or
by a machine whose output a qualified human has signed off. See §35.4.

### 4.2 The pedagogical spine

| Stage | Arabic | What happens |
|---|---|---|
| Presentation | العرض | New material introduced by a teacher, in context, never as a decontextualised list |
| Imitation | المحاكاة | Student reproduces under correction — recitation, pronunciation, sentence patterns |
| Application | التطبيق | Student uses it on unfamiliar material |
| Consolidation | المراجعة | Spaced revision, scheduled by the system, non-negotiable |
| Demonstration | الإتقان | Mastery evidenced to a human assessor. This is the gate. |

Consolidation is the stage most institutions skip and the one most responsible for
ḥifẓ loss. It is architecturally mandatory here: the revision scheduler is not an
optional feature, it is a core academic obligation (see the Technology Architecture
phase).

## §5. Islamic Identity Standards

This article is binding on every surface: website, LMS, app, certificate, email, social
media, print, and advertising. Violations are treated as defects of the highest severity,
not as matters of taste.

### 5.1 Handling of Qur'anic text — absolute rules

1. Qur'anic text is set **only** in a recognised muṣḥaf typeface (§15.4). Never in a UI
   sans-serif. Never in a decorative display face. Never in a logo lockup.
2. Never stretched, skewed, warped to a path, rotated, outlined, embossed, given a
   drop-shadow, or animated.
3. Never cropped mid-āyah for layout convenience. Never faded out at the edges.
4. Never used as background texture, watermark, section divider, or loading state.
5. Never overlaid on a photograph of a person, and never on any image where the text
   would fall across a face or a body.
6. Always accompanied by its citation (Sūrah name and āyah number) in the same visual
   unit.
7. Recitation audio is never auto-played, never used as a UI sound effect, never
   truncated mid-āyah, never played over another audio track, and never used as
   background music under marketing copy.
8. Every Qur'anic quotation ships only after review by a qualified reviewer against the
   Ḥafṣ ʿan ʿĀṣim text of the muṣḥaf al-Madīnah (or whichever riwāyah D-06 settles on).
   No Qur'anic text on any surface is machine-transcribed and shipped unreviewed.
9. **Never used as an advertisement.** An āyah does not sell a course. Qur'anic text
   appears in teaching contexts, not in conversion contexts.

### 5.2 Names, titles, and honorifics

- **Allāh** — never abbreviated, never in lowercase, never inside a decorative
  monogram, never split across a line break.
- **The Prophet ﷺ** — always followed by ﷺ or "ﷺ" rendered as the dedicated glyph
  (U+FDFA) or the full phrase. Never "PBUH" in institutional copy. Never omitted.
- **Companions** — رضي الله عنه/عنها/عنهم, or "may Allah be pleased with him/her/them"
  in English copy.
- **Scholars, living and deceased** — رحمه الله for the deceased, حفظه الله for the
  living, applied consistently or not at all. House style: applied, in Arabic copy and in
  English copy alike.
- **Never depicted.** No image, illustration, silhouette, avatar, or AI-generated
  likeness of the Prophet ﷺ, his family, or the Companions, under any circumstance, for
  any reason, in any medium.

### 5.3 Aniconism and figuration

- **No anthropomorphic illustration.** Our illustration system is geometric, calligraphic,
  vegetal, cartographic, and architectural (§21). Not because figuration is universally
  prohibited in every madhhab, but because a global Islamic institution should not force
  a student to negotiate a fiqh position with its homepage.
- Photography of real people is a separate matter and is permitted under §20's conditions.
  The prohibition is on *invented figures* — mascots, character illustrations, cartoon
  students, AI-generated faces.
- **No AI-generated human faces, anywhere, ever.** A fabricated face on an institution
  built on trustworthiness is a category error.

### 5.4 Modesty and gender

- All photography and video meets a modesty standard the institution publishes and holds
  itself to. Where the standard is uncertain, the more conservative reading is used.
- Women's programmes are taught, marketed, and photographed with the dignity of a
  serious academic offering — not as a lesser, softer, pastel-coloured sub-brand. There
  is no "pink version" of this institution.
- Mixed-gender imagery follows the policy set in D-07. Until D-07 is decided, no mixed
  adult classroom photography ships.

### 5.5 Audio and music

House position: **no instrumental music** in any institutional media — no site audio, no
video soundtracks, no advertisement scoring, no notification jingles, no LMS sound
effects. Permitted audio: human recitation, unaccompanied vocal nashīd, ambient
environmental sound, and silence. Silence is a legitimate and premium choice.

Rationale: a substantial proportion of our target students and their parents hold
instrumental music to be impermissible. Using it costs us those families and gains us
nothing. Not using it costs us nothing at all.

### 5.6 Time, calendar, and observance

- The **Hijri date is displayed alongside the Gregorian date** on every institutional
  surface where a date appears, with the Hijri date first in Arabic contexts.
- **Prayer times are a first-class product feature**, localised to the student's city,
  and class scheduling respects them: no live class may be scheduled across a student's
  local Maghrib window, and the scheduler must warn on any collision with Fajr, Dhuhr,
  ʿAṣr, or ʿIshāʾ.
- **Ramaḍān is an institutional operating mode**, not an inconvenience. Timetables shift,
  a dedicated Ramaḍān programme runs, and the platform's visual mode adjusts. Planned,
  scheduled, and staffed in advance every year.
- **ʿĪd al-Fiṭr, ʿĪd al-Aḍḥā, and the Ḥajj window** are institutional closures with
  advance notice and no penalty to student progress.
- **Friday** is treated as the week's hinge in scheduling logic, not as an ordinary
  weekday.

### 5.7 Scholarly authority and methodology

- **The platform does not issue fatwā.** Not in the AI tutor, not in the FAQ, not in
  support responses, not in blog content. Questions of ruling are referred to a named,
  qualified human scholar or to the student's own local authority. This is a hard
  constraint on the AI tutor's system design, not a disclaimer in a footer.
- The AI tutor's permitted scope is: language, grammar, vocabulary, tajwīd rules,
  memorisation technique, study planning, and administrative help. Its forbidden scope
  is: fatwā, ʿaqīdah adjudication, tafsīr beyond citation of published works, and any
  ruling on a student's personal circumstance.
- **The AI may retrieve Qur'anic text. It may never generate it.** Any response containing
  Qur'anic text is rendered from the verified corpus (§15.4) through a template, or it is
  suppressed entirely — never produced token-by-token by a language model. Language models
  hallucinate; a tutor that misquotes the Qur'an to a student would be the single most
  serious failure this platform could produce. This is a hard architectural constraint on
  the retrieval layer, enforced in code, not a prompt instruction. The same rule binds
  hadith text.
- **Methodological positioning is an unresolved executive decision (D-05).** In the West
  African context specifically, an Islamic institution's perceived alignment materially
  determines who enrols. The recommendation is a published, dignified statement of
  academic method — what we teach, from which texts, in which madhhab for fiqh
  instruction, and an explicit commitment to teach recognised differences with respect
  rather than to adjudicate them. That statement must come from the Founder and named
  scholars, not from me.

## §6. What We Will Never Do

The negative constitution. Any one of these is a firing-line breach.

1. **Never invent an institutional fact** — a student number, a graduate, a
   testimonial, an accreditation, a partnership, a scholar's endorsement, a campus
   photograph, a sanad, or a founding date. (§47.)
2. **Never promise a ḥifẓ timeline we cannot defend.** No "memorise the Qur'an in one
   year." Ranges, honestly bounded, with the conditions stated.
3. **Never market with fear or guilt.** Not "your child will lose their dīn," not "you
   will be asked about this on the Day of Judgement," not countdown-timer scarcity, not
   "only 3 seats left" when there are not.
4. **Never hide a price.** Every fee, every currency, every instalment cost, every
   regional band, published and reachable in two clicks. (§39.)
5. **Never use the Qur'an as an advertisement.** (§5.1.9.)
6. **Never depict the Prophet ﷺ or the Companions.** (§5.2.)
7. **Never sell, rent, or broker student data.** Not to advertisers, not to partners,
   not to "analytics partners," not in aggregate as a product.
8. **Never issue a certificate that cannot be independently verified.** (§37.)
9. **Never take a payment we cannot service.** If we cannot staff the cohort, enrolment
   closes. Waiting lists are honest; overselling is not.
10. **Never use dark patterns.** No hidden unsubscribe, no roach-motel cancellation, no
    pre-ticked upsells, no drip-fed fees at checkout, no artificial urgency, no
    confirm-shaming ("No thanks, I don't want my child to succeed").
11. **Never let a student pay for something we have not built.** Pre-orders are
    labelled as pre-orders, with the delivery date and the refund right stated.
12. **Never make the African student the discount tier of a Western institution.** We
    are an African institution with global students, not the reverse. (§42.)

---

# PART II — BRAND

## §7. Brand Philosophy

### 7.1 The single idea

> **Madinah is a standard, not a decoration.**

The institution takes its name from the city that received the Qur'an's completion, that
housed the first Islamic school, and to which students have travelled for fourteen
centuries. That name imposes an obligation. Everything we make must be worth the
association — or the name is a liability, not an asset.

Operationally this means: when a decision is close, choose the option a serious,
established institution would choose. Not the option a startup would choose.

### 7.2 The three brand pillars

| Pillar | What it means | How it shows up |
|---|---|---|
| **Depth** | Scholarship, not content. Chains of transmission, not course counts. | Named teachers with real credentials. Published curricula. Citations. Assessments a stranger could audit. |
| **Clarity** | Nothing hidden — not the price, not the workload, not the requirements. | Published pricing. Honest durations. "Institutional Status" callouts. Plain refunds. |
| **Calm** | The opposite of the ed-tech attention economy. | Restraint in colour, motion, and copy. No urgency theatre. Generous whitespace. Silence as a design material. |

### 7.3 Brand character

Al-Madinah International College is:

- **Measured**, not loud. It states facts and lets them work.
- **Warm**, not cold. It is an institution of *adab*, not a bureaucracy.
- **Serious**, not solemn. Confidence, not gravity for its own sake.
- **Rooted**, not derivative. Visibly African, visibly Islamic, internationally legible.
- **Generous**, not transactional. It gives real value before it asks for anything.

It is **not**: aspirational-luxury (no gold-foil-and-marble affectation), not
startup-cheerful, not orientalist-exotic, not defensive, not apologetic.

### 7.4 The visual anti-brief

The following are the visual clichés of Islamic education online. Each is banned by name.

| Banned | Why | Instead |
|---|---|---|
| Emerald green + bright gold gradient | The default of ~90% of online Qur'an academies. Instantly signals "commodity." | §14's basalt/limestone/brass system |
| Silhouetted minaret against orange sunset | Stock-photo Orientalism | Real architecture, real light, or geometry |
| Crescent-and-star as a logo device | A national flag motif, not a religious one | §18's calligraphic mark |
| Rotating Kaʿbah / Masjid an-Nabawī hero image | Borrowing sanctity we have not earned | Our own spaces, or abstraction |
| Arabesque wallpaper at 100% opacity behind text | Illegible and generic | Ornament as structural rule, at low presence (§21) |
| Lantern (fānūs), camel, magic-carpet, genie iconography | Exotic-other clichés | §19's system |
| Stock photo: smiling child in white ṭhawb pointing at a laptop | Everyone has it. It is the same child. | Real students, or no photograph (§20.5) |
| Gold-foil texture, marble texture, "luxury" gradient mesh | Signals aspiration, not establishment | Paper, stone, ink, hairline rules |
| Card grid of 6 identical icon-and-heading tiles | The universal template tell | Ledger tables, dot-leader indexes, stat rows |
| Neon/glassmorphic/dark-mode-SaaS aesthetics | Wrong century, wrong institution | §13 |

## §8. Brand Architecture & Naming

### 8.1 The name — decided (D-02, closed)

| | |
|---|---|
| **Legal & credential name** | **Al-Madinah International College of Arabic and Qur'anic Studies** |
| **Arabic** | **كلية المدينة الدولية للغة العربية وعلوم القرآن** |
| **Short form** | Al-Madinah College · كلية المدينة |
| **Digital identity** | `almadinah.college` |
| **Initialism** | **None.** Not AMIC, not AMICAQS — no initialism in the first five years. |

Decided under executive autonomy against a 36-candidate weighted matrix, a four-scenario
sensitivity analysis, and a propriety veto gate — see
`docs/01-naming-and-brand-architecture-study.md`. The name as originally briefed ranked
**30th of 36**; the adopted construction ranks **4th**. Three candidates outscored it and
all three were eliminated by the veto gate (§8.4).

**The qualifier is load-bearing, not decorative.** "…of Arabic and Qur'anic Studies"
creates a registrable composite where the bare geographic term is not, produces a long-tail
search string we can realistically own, distinguishes us from MEDIU in the context that
matters legally, and states our discipline on every credential we issue.

**The risk that drove this decision (now managed, not eliminated):**

There is an established institution in Malaysia operating as **Al-Madinah International
University (MEDIU) / جامعة المدينة العالمية**. The similarity between "Al-Madinah
International University" and "Al-Madinah International College" is close enough to
create three distinct exposures:

1. **Search and discovery contamination** — for years, our SEO will compete against an
   older, larger, better-linked institution for our own name.
2. **Trademark exposure** — in any jurisdiction where MEDIU holds or claims marks in
   education services, our name may be challengeable. This is a question for a
   trademark attorney in each target market, not for me; I am flagging exposure, not
   giving a legal opinion.
3. **Accreditation and recognition confusion** — a prospective student or employer
   verifying our certificate may reach theirs.

**How each is now managed:**

| Exposure | Management |
|---|---|
| Search contamination | Concede the head term entirely. Win the long tail and own the published-curriculum corpus, which no competitor publishes. Permanent, indexed MEDIU disambiguation page. (`NS §10`) |
| Trademark | File the **composite**, never the bare geographic term. Nigeria → UK → EU → GCC → US → Malaysia. Target coexistence, not confrontation. Counsel required before filing. (`NS §9`) |
| Verification confusion | Public certificate-verification register (§36.1) plus the disambiguation page. |


### 8.2 Transliteration — one spelling, forever

The repository is currently named `Al-Madeenahcollege`; the brief uses "Al-Madinah". Both
cannot survive. Inconsistent transliteration is the fastest way for an institution to
look amateur.

**House standard (recommended):**

| Context | Form |
|---|---|
| Wordmark, logo, domain, legal name | **Al-Madinah** (no macron, no diacritic) |
| Body copy, English | Al-Madinah |
| Scholarly / academic publication | al-Madīnah |
| Arabic, always | المدينة |
| **Never used** | Madeenah, Medina, Madina, Al-Madeena, Almadinah |

Adopt a simplified **IJMES** transliteration standard throughout (Appendix B). One
system, applied everywhere, including student-facing copy.

### 8.3 Group and sub-brand architecture

**Ruled (D-01, Option D): an umbrella group.** SH Royal Schools and Abī Sulaimiy College
form an educational group; Al-Madinah International College is its **tertiary and
international arm**.

**Group name (D-12, closed — confidence Medium):** **Sulaimiy Education Group** /
مجموعة السليمي التعليمية. Eponymous names are the most protectable class of mark, which
matters here specifically: §8.1 established that "Al-Madinah" is weakly protectable, so the
**group name must carry the portfolio's trademark strength**. Provisional pending one fact
only — whether a group entity is already registered under another name, in which case that
name prevails. Full reasoning and the endorsement model at `NS §12–§13`.

```
SULAIMIY EDUCATION GROUP             مجموعة السليمي التعليمية
├── SH Royal Schools                    — primary / secondary
├── Abī Sulaimiy College                — [role to be confirmed]
└── Al-Madinah International College    — tertiary, international, online-first
    ├── School of Arabic Language          (كلية اللغة العربية)
    ├── School of Qur'an                   (كلية القرآن)
    ├── School of Islamic Sciences         (كلية العلوم الشرعية)
    ├── Institute of Teacher Certification  (معهد إعداد المعلمين)
    └── Al-Madinah Executive & Corporate    (a defined, restrained commercial arm)
```

**What the umbrella earns us.** A verifiable operating history, existing faculty, an
existing student body, and an existing regulatory footprint. This is the fastest available
route to retiring most of §46.3's status register — an institution with real history beats
a beautiful empty one.

**What the umbrella obliges.** Under §46, **none of that may be claimed until it is
evidenced.** Before any public surface says "part of a group established in [year],
educating [n] students," we must hold: the group's legal structure and registration, each
member's registration status, real student and staff numbers with an `as of` date, and
written authority to speak on the group's behalf. Until then, the group relationship is
stated as a bare fact ("Al-Madinah International College is the tertiary arm of [group]")
with no figures attached.

**Brand model within Al-Madinah: a branded house.** All programmes carry the institutional
identity. No independently-branded sub-schools in the first three years — a young
institution cannot afford to spread its trust across multiple marks.

**Group-level identity is a separate question (D-12).** An umbrella needs a name, a mark,
a governance boundary, and a rule for how much of the parent appears on the child's
surfaces. My recommendation is a **light-touch endorsement model**: Al-Madinah carries its
own identity, with a small, consistent group endorsement line in the footer and on formal
documents — not a co-equal dual lockup. A young international brand should not spend half
its recognition carrying a domestic parent.

Naming rules: Schools are named for their discipline, never for a sponsor or donor
without a Board resolution. Programmes are named plainly and descriptively — no invented
programme brand names, no acronym soup. A student must be able to say what a programme is
from its name alone.

### 8.4 The naming veto gate — binding on every future name

A weighted matrix lets a name trade a propriety failure against a strong commercial score.
Some failures are not tradeable. Every future name — programme, school, campus, sub-brand,
product — passes this gate **before** any scoring. A veto is absolute.

| | A name is vetoed if it… |
|---|---|
| **V1** | Claims something the institution cannot currently back (§46) |
| **V2** | Constitutes self-praise (*tazkiyah*), or applies a Qur'anic honorific to ourselves (§10.2 Rule 2) |
| **V3** | Signals a sectarian or methodological position we have committed to teach rather than adjudicate (§5.7) |
| **V4** | Collides with a live registered or claimed mark in education services |
| **V5** | Carries an adverse media or geopolitical adjacency |

This gate is not hypothetical. It eliminated the two highest-scoring candidates in the
naming study: *Dār al-Qurrāʾ* ("House of the Reciters" — V1, since we issue no ijāzah) and
*Al-Rāsikhūn* (V2, a Qur'anic honorific for the highest class of scholars, applied by a
brand-new institution to itself).

### 8.5 The Madinah name — what it does and does not claim

§31 forbids borrowed authority as a trust signal. That rule and this name must be reconciled
explicitly, not left for a critic to raise.

**Permitted.** The name is an *orientation* — it names the standard we hold ourselves to
(§7.1), in the same way institutions worldwide take the names of places they aspire to.
This is universally read as aspiration, and it is how MEDIU (Malaysia) and hundreds of
others use it.

**Forbidden, absolutely.** Any implication of institutional connection to Madinah, Saudi
Arabia — no claimed affiliation with the Islamic University of Madinah or any Saudi body;
no Ḥaramayn imagery suggesting sponsorship (§31); no copy implying our teachers, licences,
or certification originate there.

**Required.** A permanent, plainly-worded statement on the About page: *"Al-Madinah
International College of Arabic and Qur'anic Studies takes its name from the city that
received the completion of the Qur'an and housed the first school in Islam. We have no
institutional affiliation with any body in Madinah, Saudi Arabia, and we are unrelated to
Al-Madinah International University (Malaysia)."*

Saying this first, unprompted, is worth more than being asked and answering well.

## §9. Positioning

### 9.1 Positioning statement

> For serious students of Arabic and the Qur'an worldwide — and for the parents who
> choose on their behalf — Al-Madinah International College is the institution that
> teaches with the depth of a traditional seat of learning and the clarity, flexibility
> and reach of a modern one. Unlike online academies that sell hours of tutoring, we
> certify mastery; unlike traditional institutes, we let each student reach it at their
> own pace, from anywhere, at a price set to their country's reality.

### 9.2 The competitive frame

Four categories exist. We are positioned deliberately against all four.

| Category | Typical examples | Their strength | Their weakness | Our answer |
|---|---|---|---|---|
| Volume online Qur'an academies | Marketplace-style tutoring platforms, ~$30–60/mo | Cheap, flexible, plentiful | No curriculum, no certification, unverifiable teachers, high churn | Curriculum + verifiable certification + named faculty |
| Premium Western Islamic institutes | Established US/UK seminary-style programmes | Brand, scholars, community | Expensive, cohort-locked, Western-centric, poor Global-South access | Same depth, mastery-paced, regionally priced |
| Traditional overseas universities | Madinah, Azhar, and equivalents | Unmatched authority, sanad | Selective, relocation-dependent, years-long, inaccessible to most | Rigour without relocation; explicitly a complement, never a claimed equivalent |
| Local African madāris | Thousands, informal to formal | Rooted, affordable, communal | Rarely certified, rarely internationally legible, under-resourced | International legibility for African scholarship; partnership, not displacement |

**Rule.** We never position against local African madāris as competitors. They are the
ecosystem we come from. Any marketing that disparages them violates §3.4 and §42.

### 9.3 What we are not

We are not a university (we do not award degrees unless and until a regulator says we
may — D-03). We are not a seminary producing muftīs. We are not a substitute for
studying in Madinah or Azhar, and we will never imply otherwise. We are not a
tutoring marketplace. We are a **college**: a defined body of programmes, taught by
appointed faculty, to a published standard, with certification that can be checked.

## §10. Tone of Voice

### 10.1 The voice in one line

**The voice of a respected teacher speaking to an adult they take seriously.**

Not a brochure. Not a salesperson. Not a mosque announcement. Not a peer. A teacher —
warm, precise, unhurried, and entirely without the need to impress.

### 10.2 The four rules

**Rule 1 — Specificity beats superlative.**

| Never | Always |
|---|---|
| "World-class Arabic instruction" | "Eight levels. 1,200 contact hours. Assessed by recitation, not by quiz." |
| "Expert teachers" | "Teachers hold an ijāzah in the riwāyah they teach. Every chain is published." |
| "Affordable for everyone" | "Band E students pay ₦X. The full pricing table is here." |
| "Learn fast!" | "Fast-track students complete Level 3 in a median of 14 weeks. The range is 11–22." |

A number a reader can check is worth more than any adjective.

**Rule 2 — Never claim a comparative we cannot cite.**
"Africa's leading," "the best," "the most trusted" are forbidden until an independent,
nameable source says it. Ambition is stated as ambition: "We intend to become…" is
honest. "We are…" is not, yet.

**Rule 3 — Say the hard thing plainly.**
Where a fact is unflattering, uncertain, or absent, state it in the same register as
everything else — no apology, no evasion, no smaller font. "We are not yet accredited by
any external body. Here is what that means for you, and here is what we are doing about
it." Confidence in stating a limitation is itself a trust signal.

**Rule 4 — *Adab* is a writing rule, not just a value.**
No sarcasm. No mockery of other institutions, methods, or madhāhib. No exclamation marks
in institutional copy (they are permitted in a single-line congratulation to a student,
and nowhere else). No shouting caps. No emoji in institutional copy; permitted sparingly
in one-to-one student support.

### 10.3 Register by surface

| Surface | Register |
|---|---|
| Homepage, About, Academics | Formal-warm. Full sentences. First person plural. |
| Programme and curriculum pages | Precise, structural, near-documentary. Tables and numbers carry the weight. |
| Admissions and pricing | Plain, generous, unhurried. Anticipate the anxious question and answer it before it is asked. |
| LMS and portal UI | Brief, calm, encouraging. Second person. Never gamified-cutesy. |
| Assessment feedback | Specific and kind. Name the error, name the fix, name what went well. Never "Wrong." |
| Support and email | Human, signed by a named person, response time stated. |
| Certificates and transcripts | Ceremonial, spare, Arabic-primary. |
| Social media | The same institution, shorter. Never a different, jokier brand. |

### 10.4 Vocabulary

**House terms (use):** student (not "user," not "customer," not "learner" in
institutional copy), teacher / *ustādh* / *ustādhah* (not "instructor," not "coach," and
never "tutor" for appointed faculty), programme (not "product"), tuition (not "price
point"), enrolment (not "signup"), *itqān*, *ijāzah*, *sanad*, *tajwīd*, *ḥifẓ*,
*murājaʿah*.

**Banned terms:** "unlock your potential," "game-changer," "revolutionise," "10x," "hack,"
"secret," "guru," "ninja," "crush it," "level up" (outside literal level progression),
"content" (when we mean *teaching*), "monetise," "funnel" (in any student-facing copy).

**Arabic terms in English copy:** italicised on first use with a short gloss, plain
thereafter. A running glossary is linked from every page. We do not over-translate — a
student of Arabic should meet Arabic.

## §11. Editorial Standards

1. **English:** British spelling and conventions (*programme, enrolment, organisation,
   -ise*). Serial comma: not used, except where required for clarity.
2. **Arabic:** Modern Standard Arabic, formal register. Fully vocalised (*mushakkal*) in
   all teaching material at Levels 1–4 and in all Qur'anic text; unvocalised in
   institutional prose except where ambiguity demands it.
3. **Numerals:** Western Arabic numerals (0-9) in English copy. Eastern Arabic numerals
   (٠-٩) in Arabic copy, except in tabular financial data, where consistency across
   languages wins. Currency always with an explicit code (₦ NGN, $ USD, £ GBP).
4. **Dates:** `12 Rabīʿ al-Awwal 1447 / 5 September 2025` — Hijri first in Arabic
   contexts, Gregorian first in English contexts, both always present.
5. **Headings:** sentence case in body copy; title case reserved for programme and page
   titles. No ALL CAPS headings anywhere except the small-caps eyebrow component.
6. **Citation:** every claim about a source cites it. Qur'an as `al-Baqarah 2:255`.
   Hadith with collection, book, and number, plus a grading where relevant and a named
   authority for that grading.
7. **Numbers and statistics:** every institutional statistic on a public surface carries
   an `as of` date. A statistic with no date does not ship.
8. **Two-person rule:** no Arabic copy, and no Qur'anic or hadith citation, is published
   without review by a second qualified person. Logged.
9. **Machine translation is never published.** It may be a drafting aid. The published
   text is written or fully rewritten by a native speaker.

## §12. Content Guidelines

### 12.1 The content contract

Every piece of public content must pass all four:

1. **True** — verifiable, sourced, and dated.
2. **Useful** — a student who never enrols still gained something.
3. **Ours** — it could only have come from this institution.
4. **Permanent** — worth having on the site in five years.

Content that is merely topical, merely SEO-shaped, or merely promotional fails and is
not published.

### 12.2 What we publish

- **Teaching content** — genuinely instructive articles and short lessons on Arabic
  grammar, tajwīd rules, memorisation method, and study discipline. Free, ungated, and
  good enough that a competitor would want to copy it.
- **Institutional record** — curricula, assessment criteria, faculty credentials, pricing
  methodology, policies, and annual reports. Radical transparency as a trust instrument.
- **Student outcomes** — only real, only consented, only verifiable, never before they
  exist. (§32.)
- **Scholarly notes** — where our faculty have something to say, in their own name.

### 12.3 What we do not publish

- Fabricated testimonials, invented statistics, stock "campus life" imagery presented as
  ours, AI-generated faces, or AI-written scholarly content passed off as human.
- Political commentary, sectarian polemic, or content adjudicating disputes between
  Muslim communities. We teach; we do not litigate.
- Fatwā. (§5.7.)
- Reactive news-cycle content.
- Any content whose primary purpose is ranking rather than teaching.

### 12.4 AI-assisted content policy

AI may be used for: drafting, outlining, summarising, translation *drafts* (never final),
code, and data analysis.

AI may **never** be the final author of: Qur'anic or hadith text or citation, any
statement of Islamic ruling, faculty biographies, student testimonials, or any factual
claim about the institution. Every AI-assisted public text is reviewed and owned by a
named human. Where content is materially AI-generated, it is labelled.

---

# PART III — DESIGN SYSTEM

## §13. Design Philosophy

### 13.1 The governing idea

> **The design of a place of learning should get out of the way of the learning — and
> should be beautiful enough that the student feels the subject is worth their life.**

Three consequences:

**a) Restraint is the premium signal.** Prestige in institutional design comes from
confidence: generous space, few typefaces, few colours, precise alignment, hairline
rules, and the discipline not to decorate. Ornament, when used, is structural (§21).

**b) Type does the work.** This is a text institution — Arabic text, Qur'anic text,
scholarly text. The typographic system carries the identity. Colour and image support it.

**c) Every surface answers one question well.** No page tries to do everything. The
homepage's job is orientation and trust, not conversion.

### 13.2 The design tests

Before any screen ships, it must pass all six:

1. **The template test** — could this be any of a hundred other institutions with the
   logo swapped? If yes, it fails.
2. **The Arabic test** — does this hold up in Arabic, at RTL, at the same quality? Not
   "does it not break." Does it look *equally considered*.
3. **The 3G test** — does the first meaningful paint happen in under 3 seconds on a
   simulated 3G connection on a mid-range Android device?
4. **The dignity test** — would we be content for this to be seen by a scholar we
   respect, and by a parent deciding where to send their child?
5. **The honesty test** — does every number, badge, photograph and claim on this screen
   correspond to something real? (§47.)
6. **The quiet test** — remove every element that is not doing work. Is the screen better?
   If yes, it was not finished.

## §14. Colour System

### 14.1 The palette and its derivation

**Blue and gold**, on the Founder's direction — with the blue anchored in something real
rather than chosen as a corporate default.

**Lapis lazuli (لازورد, *lāzaward*)** is the pigment ground from Afghan lapis and used for
a thousand years in Qur'anic illumination and in the tilework of Isfahan and Samarkand. It
is not a decorative association: it is the colour in which the Qur'an was physically made
beautiful as an object. **Gold (ذهب)** is its historical partner in that same craft —
*tadhhīb*, illumination. **Turquoise (فيروزي)** is the third colour of that tradition, and
it is the "touch of other colour" this palette permits.

**Primary — the ground**

| Token | Hex | Name | Role |
|---|---|---|---|
| `--lazaward-deep` | `#0D1A45` | Deep lapis | Deepest ground. Footer, certificate ground, transitions. |
| `--lazaward` | `#1A3280` | Lapis | **Primary institutional colour.** Header, hero, dark sections, primary buttons. |
| `--lazaward-mid` | `#2E58B0` | Mid lapis | Hover states, links on dark. |
| `--lazaward-soft` | `#6C93D6` | Soft lapis | Tertiary accent, chart series, disabled-on-dark. |

**Light — the paper**

| Token | Hex | Name | Role |
|---|---|---|---|
| `--jiss` | `#F3F1EA` | Jiṣṣ (limestone) | Primary light ground. Kept warm, deliberately, to sit under the blue rather than beside it. |
| `--waraq` | `#FBF9F5` | Waraq (paper) | Card and panel surfaces. |
| `--waraq-warm` | `#F7F3E9` | Warm paper | Alternate light band, quote grounds. |

**Gold — used sparingly**

| Token | Hex | Name | Role |
|---|---|---|---|
| `--dhahab` | `#A8822A` | Dhahab (illumination gold) | Primary accent. Rules, borders, seals, small marks. **Never a large fill. Never a gradient.** |
| `--dhahab-light` | `#E0C784` | Light gold | Headings and eyebrows on dark grounds only. |

**The touch of other colour**

| Token | Hex | Name | Role |
|---|---|---|---|
| `--firuzi` | `#176B78` | Fīrūzī (turquoise) | Secondary accent. Links on light, informational states, second chart series. |
| `--firuzi-light` | `#6CC5D2` | Light turquoise | The same, on dark grounds. |
| `--aqiq` | `#9A3324` | ʿAqīq (carnelian) | Emphasis and signal. Eyebrows on light, critical states. **Never a background fill.** |

**Ink and structure**

| Token | Hex | Role |
|---|---|---|
| `--hibr` | `#131A26` | Body text. A **blue-black**, not a neutral black — it belongs to the same family as the ground. |
| `--hibr-soft` | `#4A5464` | Secondary text, captions, metadata. |
| `--hibr-faint` | `#79828F` | Tertiary text, placeholders. |
| `--khatt` | `rgba(168,130,42,.32)` | Hairline rules on light. |
| `--khatt-dark` | `rgba(224,199,132,.22)` | Hairline rules on dark. |

**Semantic states** — desaturated to sit inside the palette rather than shout out of it.

| Token | Hex | Role |
|---|---|---|
| `--ok` | `#256D4E` | Mastery achieved, payment succeeded |
| `--wip` | `#856618` | In progress, awaiting review |
| `--attn` | `#9A3324` | Action required, failed, overdue |
| `--info` | `#176B78` | Neutral information |

### 14.1a The WEC-LC proximity, stated plainly

`EB §Preamble` rejects reusing the WEC-LC palette. **Blue and gold moves us closer to it**,
and pretending otherwise would be dishonest. WEC-LC is navy `#14264A` + brass `#C7A24A`.

Distinctness is therefore engineered rather than incidental:

| | WEC-LC | Al-Madinah |
|---|---|---|
| **Blue hue** | 220 — a grey-leaning navy | **226 — ultramarine**, and markedly more chromatic (S 66 vs 57, L 30 vs 18) |
| **Gold** | Brass, used as a **gradient** on meters and nav accents | Illumination gold, **hairline and mark only, gradient forbidden** (§14.2.5) |
| **Third colour** | Oxblood red | **Turquoise**, with carnelian reserved for signal alone |
| **Ink** | Neutral-dark `#16202E` | **Blue-black** `#131A26`, in the ground's own family |
| **Structure** | Cards, shadows, 6–10px radii | Hairlines, ledgers, ≤4px radii (`EB §7.4`, `IS §17`) |

The gold hue cannot meaningfully move — institutional gold occupies a narrow band and
every serious institution using it lands near 42°. **Distinctness therefore comes from the
blue's hue and chroma, from the third colour, and above all from usage discipline.**

### 14.2 Usage discipline — binding rules

1. **Alternation.** Dark (`--lazaward`/`--lazaward-deep`) and light (`--jiss`/`--waraq`) sections
   alternate down every page. Never two dark or two light sections consecutively.
2. **Gold is a line, not a plane.** `--dhahab` appears as rules, borders, small marks,
   seals, and type. It never fills an area larger than a button. There is **no gold
   gradient** anywhere in this system.
3. **Carnelian is punctuation.** `--aqiq` marks emphasis on light grounds and critical
   states. It never fills a background, never fills a hero, never appears twice in one
   viewport.
4. **60/30/10.** Roughly 60% ground (dark or light), 30% ink and structure, 10% accent.
   A screen where accent exceeds 10% is over-designed.
5. **No gradients on identity, type, or controls — ever.** The mark, the wordmark, the
   seal, headings, body text, buttons, rules and the gold accent are flat colour, always.
   **Permitted, and only here: atmospheric *ground* treatment.** A dark section may carry a
   soft radial illumination and vignette in the ground layer beneath its content — the
   manuscript equivalent of light falling across a page. It must remain below the content,
   never tint the type, and never touch the mark. Implemented as `.ground` in `brand.css`.
   *Amended v0.6 on the Founder's direction toward a more illuminated register; the
   identity-element prohibition is unchanged and absolute.*
6. **Dark mode** is a genuine second theme with its own token values, not an inverted
   filter. `--lazaward-deep` becomes the ground; `--jiss` never appears as a large fill in dark
   mode. Full token table in Phase 6.

### 14.3 Contrast requirements — machine-verified, not asserted

| Pair | Ratio | Status |
|---|---|---|
| `--hibr` on `--jiss` | **15.44** | Body text ✓ AAA |
| `--hibr-soft` on `--jiss` | **6.77** | Secondary text ✓ AA |
| `--waraq` on `--lazaward` | **11.02** | Reversed body ✓ AAA |
| `--waraq` on `--lazaward-deep` | **15.97** | Reversed body ✓ AAA |
| `--dhahab-light` on `--lazaward` | **6.99** | Headings on dark ✓ AA |
| `--aqiq` on `--jiss` | **6.47** | Emphasis ✓ AA |
| `--firuzi` on `--jiss` | **5.45** | Turquoise as text ✓ AA |
| `--firuzi-light` on `--lazaward` | **6.00** | Turquoise on dark ✓ AA |
| `--dhahab` on `--jiss` | **3.15** | **Large text (≥24px) and non-text ONLY.** Never body copy |

**These are computed, not claimed.** `tests/run.mjs` parses the token values out of the
shipped CSS and computes WCAG contrast on every build; a colour changed to something
illegible fails the build. The suite additionally asserts that **gold stays *below* AA for
body text**, so that a future contrast failure cannot be "fixed" by lightening the ground
instead of correcting the usage.

This article's previous version stated target ratios that no mechanism enforced. The first
run of the computed check found a state colour at **4.47** against a 4.5 requirement — a
miss no document review would ever have caught.

## §15. Arabic Typography Standards

**This is the most important article in Part III.** For an Arabic and Qur'an college,
Arabic typography is not localisation. It is the primary craft of the institution.

### 15.1 The governing principle

> **Arabic is set first, and set best. If a design decision serves Latin type at Arabic's
> expense, the decision is wrong.**

### 15.2 The Arabic type roles

| Role | Recommended face | Why | Where |
|---|---|---|---|
| **Muṣḥaf (Qur'anic text)** | KFGQPC Uthmanic Script HAFS, or Amiri Quran | The only acceptable rendering of Qur'anic text. Non-negotiable. | Qur'an display, ḥifẓ interface, certificates carrying āyāt |
| **Editorial Naskh** | Amiri | The finest open Naskh revival available; correct for scholarly and ceremonial text | Headings, pull-quotes, vision/mission, printed matter |
| **Interface / body Arabic** | IBM Plex Sans Arabic | Genuine multi-script family with a Latin sibling designed alongside it — solves bilingual harmony at the source rather than by approximation | All UI, LMS, forms, body copy, dashboards |
| **Ceremonial display** | **Amiri** (typesetting) + commissioned **thuluth** (seal lettering) | Thuluth is the tradition's genuine ceremonial script. **Ruqʿah is not used institutionally in any face** — it is historically an administrative and rapid-handwriting script, and Aref Ruqaa was removed from this system in v0.4 for that reason (`IS §28.6`) | Certificates, seals, ceremonial documents |
| **Teaching Naskh (vocalised)** | **Amiri** with full tashkīl (verified OFL). *Kitab* only if its licence is confirmed — ⚠ currently unverified | Carries heavy vocalisation without collision. **Any element containing tashkīl uses this face wherever it sits — chrome or content** (`IS §28.7`) | Levels 1–4 teaching material, all *mushakkal* text |

**Licensing note:** every face above must have its licence verified for web embedding and
commercial use before Phase 6. KFGQPC fonts in particular carry specific terms. Recorded
as **D-08**; no font ships unlicensed.

### 15.3 Binding Arabic typesetting rules

1. **Line height.** Arabic requires more leading than Latin. Minimum `1.9` for body
   Arabic; `2.1` for vocalised (*mushakkal*) text. Never inherit a Latin line-height.
2. **Minimum size.** Arabic body text never below **17px**; vocalised text never below
   **19px**. Tashkīl below these sizes is illegible and disrespectful to the text.
3. **Never faux-bold.** Arabic must never be synthetically emboldened or italicised by
   the browser. Only real weights from the family. `font-synthesis: none` is set
   globally.
4. **Never letter-spaced.** `letter-spacing` on Arabic breaks the joins. It is set to
   `0` — and to `normal`, explicitly, on every Arabic element, overriding any inherited
   tracking.
5. **Never all-caps.** Arabic has no case. Any component applying `text-transform:
   uppercase` must exclude `[lang="ar"]`.
6. **Never justified without proper kashīda.** Browser-justified Arabic produces
   grotesque word gaps. Arabic body text is left-ragged (i.e. ragged on the left in RTL)
   unless a real kashīda-aware justification engine is in use.
7. **Numerals.** Eastern Arabic numerals (٠-٩) in Arabic prose; Western in tables,
   prices, and data. Set explicitly, never left to a font default.
8. **Latin and numeric runs inside Arabic text** are wrapped in `<span dir="ltr">` —
   the Unicode bidi algorithm does not reliably preserve reading order for embedded
   runs. (Inherited directly from the WEC-LC build, where this was learned the hard way.)
9. **Punctuation.** Arabic comma `،`, semicolon `؛`, question mark `؟`. Never the Latin
   forms in Arabic copy.
10. **Never render Arabic as an image** except for a licensed calligraphic artwork, which
    always carries a text alternative.

### 15.4 Qur'anic text — additional requirements

- Set only in the muṣḥaf face (§15.2), at a minimum of **22px**, line-height **2.2**.
- Never mixed inline with UI-face text. Qur'anic text always occupies its own block.
- The `verse-end` mark (۝) with the āyah number is always present.
- Text sourced only from a verified digital muṣḥaf (e.g. the Tanzil or KFGQPC verified
  text), never typed by hand, never copied from an unverified web source.
- **Riwāyah must be declared** — the institution states which riwāyah it teaches and
  displays (Ḥafṣ ʿan ʿĀṣim assumed; confirm as **D-06**), and never mixes riwāyāt on one
  surface without labelling.
- Copy-protection is never applied to Qur'anic text. It is not our property to withhold.

## §16. English / Latin Typography Standards

### 16.1 The Latin type roles

| Role | Face | Weights | Why |
|---|---|---|---|
| **Display / editorial** | **Source Serif 4** | 400, 600, 700, + italics | An institutional old-style with genuine authority, a large optical range, and no fashion-magazine affectation. Deliberately **not** Playfair Display — that is WEC-LC's face (§Preamble). |
| **Interface / body** | **IBM Plex Sans** | 400, 500, 600, 700 | The Latin sibling of IBM Plex Sans Arabic. Choosing the pair from one superfamily means Arabic and English share proportion, weight, and rhythm by design rather than by luck. This is the single most important typographic decision in the system. |
| **Data / code / reference** | **IBM Plex Mono** | 400, 500 | Same family. Transcript codes, verification IDs, technical reference. |

**No fourth face.** No script face, no rounded "friendly" sans, no display face for
marketing, ever. If a design needs a fourth typeface, the design is wrong.

### 16.2 Binding Latin rules

1. Body copy minimum **17px**, line-height **1.65**, measure **62–74 characters**.
2. Headings set in Source Serif 4, line-height 1.15–1.25, tightened tracking (`-0.01em`)
   at display sizes only.
3. `text-transform: uppercase` permitted **only** on the eyebrow/module-marker component,
   at ≤0.78rem with ≥0.18em tracking, and never on Arabic (§15.3.5).
4. True small caps where available; never faux small caps.
5. Hanging punctuation and proper quotes (" " ' '), never straight quotes.
6. En dashes for ranges, em dashes for parenthetical breaks, non-breaking spaces before
   units and after short prepositions in headings.
7. Widows and orphans controlled in headings via `text-wrap: balance`.

### 16.3 The shared type scale

One modular scale (1.25 major third), used by both scripts. Arabic sizes are the Latin
size **× 1.08** (an optical correction — Arabic's x-height equivalent runs smaller at the
same nominal point size).

| Step | Latin | Arabic | Use |
|---|---|---|---|
| `display` | 60px / 1.08 | 65px / 1.4 | Hero statements only. One per page. |
| `h1` | 44px / 1.15 | 48px / 1.5 | Page title |
| `h2` | 34px / 1.2 | 37px / 1.6 | Section |
| `h3` | 26px / 1.3 | 28px / 1.7 | Sub-section |
| `h4` | 21px / 1.35 | 23px / 1.8 | Component heading |
| `body-lg` | 19px / 1.7 | 21px / 2.0 | Lead paragraphs |
| `body` | 17px / 1.65 | 18px / 1.9 | Default |
| `body-sm` | 15px / 1.6 | 16px / 1.9 | Captions, metadata |
| `eyebrow` | 12.5px / 1.4 | 14px / 1.6 | Module markers (Latin caps only) |

Fluid clamping between mobile and desktop is specified in Phase 6. Mobile minimums:
`display` never below 34px, `body` never below 17px.

## §17. Layout & Spatial System

- **Baseline unit: 8px.** Every margin, padding, and gap is a multiple. Exceptions are
  hairlines (1px) and optical corrections, both of which must be justified in a code
  comment.
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- **Grid:** 12 columns, 24px gutters, max content width **1180px**, reading measure
  constrained to **720px** regardless of container width.
- **Section rhythm:** 96px vertical padding (desktop) / 64px (mobile), with 128px at
  major transitions.
- **Radii:** `2px` (inputs, small controls), `4px` (cards, panels), `999px` (pills only).
  **No large radii.** Rounded corners above 8px read as consumer software, not as an
  institution.
- **Elevation: layered, not flat.** *Amended v0.7.* Every elevation is **three stacked
  shadows at different blurs** — a wide ambient wash, a directional key, and a tight contact
  shadow — plus `--bevel`, an inset top highlight that reads as a lit edge. **One flat shadow
  always looks like a sticker**; three stacked is what reads as physical. Three tiers:
  `--sh-soft`, `--sh`, `--sh-lift`. No coloured glows. The build asserts every `box-shadow`
  comes from the token scale rather than an ad-hoc value.
- **Borders:** the institution's structural language is the **hairline rule** (1px,
  `--khatt`), not the drop shadow. Cards are defined by rules and ground changes before
  they are defined by elevation.

## §18. Logo & Identity Usage

**Status: the mark does not exist yet.** This article specifies what it must be and how
it will be governed. Design begins in Phase 4, after D-02 (§8.1) is ruled on.

### 18.1 What the mark must be

- **Arabic-primary.** A calligraphic treatment of المدينة, or of a two-word Arabic
  lockup, is the mark. The Latin wordmark is the companion, not the origin.
- **Legible at 24px.** Whatever the ceremonial version contains, the working mark must
  survive a favicon, an app icon, and an embroidered polo.
- **Single-colour capable.** Must work in one ink, on paper, at 100% and at 40% size,
  and reversed out of `--lazaward`.
- **Not a crescent-and-star.** (§7.4.)
- **Not a mosque silhouette.** Not a dome. Not an open book. Not a graduation cap.
- **Not AI-generated.** Commissioned from a named calligrapher or type designer, with
  full assignment of rights, documented.

### 18.2 Three registers

| Register | Contains | Use |
|---|---|---|
| **Seal** (الختم) | Full crest with Arabic name, founding year, motto ring | Certificates, ijāzah, formal correspondence, embossing. Never on the website above 200px. |
| **Lockup** | Arabic calligraphic mark + Arabic name + Latin name | Site header, letterhead, presentations |
| **Mark** | The calligraphic glyph alone | Favicon, app icon, avatar, watermark, embroidery |

### 18.3 Binding usage rules

1. **Clear space** = the height of the Arabic mark's tallest ascender, on all four sides.
   Nothing enters it.
2. **Minimum sizes:** Lockup 120px wide (screen) / 30mm (print). Mark 24px / 8mm.
3. **Never:** recoloured outside the palette; stretched; rotated; outlined; drop-shadowed;
   given a gradient; animated as a loading spinner; placed on a busy photograph without a
   scrim; combined with another logo without a Board-approved co-branding lockup;
   redrawn, re-typeset, or "refreshed" by anyone outside the design authority (§45).
4. **Never on the Qur'anic text.** The mark and Qur'anic text never occupy the same
   visual unit.
5. **Every use** is drawn from the master asset library. No one recreates the mark.

## §19. Iconography

- **One family, drawn to order.** Not a downloaded set. Icons are stroke-based, 1.5px at
  24px, square 24×24 grid, rounded terminals off, geometric construction.
- **Directionally aware.** Every icon with a direction (arrows, chevrons, progress,
  indentation, alignment) has an RTL variant. Arrows are mirrored in RTL; clocks,
  numerals, and media-transport controls are **not**.
- **Never used decoratively.** An icon in this system labels an action or a state. It
  does not sit above a heading as ornament. (That is the card-grid tell — §7.4.)
- **Never religious symbols as UI.** No crescent as a bullet, no mosque as a "campus"
  icon, no Kaʿbah as a "qiblah" icon. The qiblah indicator is a compass needle.
- **Always paired with text** at first use in any navigation or action context. Icon-only
  controls carry an `aria-label` and a tooltip.
- Custom domain icons — *juzʾ*, *ḥizb*, *sanad*, *ijāzah*, *murājaʿah*, *makhraj*,
  *tajwīd rule* — are drawn specifically for this institution. These are our vocabulary
  and no generic set contains them.

## §20. Photography Direction

### 20.1 Present status — read this first

**No institutional photography exists.** Until real photography is commissioned, the
site ships with **no photographs of people at all**. Texture and hierarchy come from
type, colour, rule, and ornament (§21). This is a deliberate design position, not a gap
to be filled with stock imagery. A site with no photographs reads as restrained; a site
with stock photographs reads as fake, and is (§47).

### 20.2 When real photography exists — the direction

- **Available light.** No studio flash, no ring lights, no HDR. Warm daylight, window
  light, golden hour, lamplight in the evening.
- **Grade toward the palette.** Slightly warm, slightly desaturated, deep shadows that
  stay green-black rather than blue-black. Never crushed to pure black.
- **Unstaged.** Students genuinely reading, writing, reciting, listening. Hands, texts,
  pens, muṣḥafs, screens. Teachers mid-explanation, not mid-smile-at-camera.
- **Close and specific.** A hand on a page and a face in concentration say more than a
  wide classroom shot.
- **Real places.** Our rooms, our students, our city. Photographed as they are — not
  dressed to look Western, and not dressed to look "authentically traditional."
- **Composition:** ample negative space; subject off-centre; a consistent focal-length
  language (35mm and 85mm equivalents; no ultra-wide distortion).

### 20.3 Absolutely forbidden

Stock photography of any kind on institutional pages; AI-generated imagery of people;
staged handshake/pointing-at-screen/thumbs-up shots; any image implying facilities,
enrolment, or partnerships we do not have; imagery of the Ḥaramayn used to imply
affiliation; poverty imagery of African students positioned to solicit sympathy or
donation.

### 20.4 Consent and dignity

- Written consent from every identifiable person, from a parent or guardian for anyone
  under 18, specifying the media and the duration, and revocable.
- No student photograph is used in advertising without a separate, specific advertising
  consent.
- Consent records are retained and auditable. A revocation is honoured within 7 days
  across all surfaces including print runs in progress.

### 20.5 The interim rule

Until §20.4-compliant photography exists, every page uses the **no-photograph** design
system. Where a page structurally needs an image, it uses ornament (§21), typography, or
an honest "Institutional Status" callout (§47) — never a placeholder that reads as real.

## §21. Illustration & Ornament

### 21.1 The ornament system

Four permitted families. All non-figurative (§5.3).

| Family | What it is | Where |
|---|---|---|
| **Geometric (girih)** | Strict compass-and-straightedge constructions — 6-, 8-, 10-, 12-fold. Drawn to real geometric rule, not traced from a stock vector. | Section transitions, certificate borders, hero grounds at ≤6% opacity |
| **Vegetal (islīmī)** | Restrained arabesque as a **line**, not a fill | Rule terminals, seal surrounds, certificate corners |
| **Calligraphic** | Commissioned calligraphy of institutional phrases (motto, sūrah titles, level names) | Certificates, level markers, ceremonial pages |
| **Cartographic** | Line-drawn maps — student distribution, campus location, the Madinah reference | About, global pages, annual report |

### 21.2 Binding ornament rules

1. **Ornament is structural or it is absent.** It marks a transition, terminates a rule,
   frames a seal, or defines a certificate border. It never fills space because space
   felt empty.
2. **Maximum presence: 6% opacity** for any large-area ornament behind text. Above that
   it competes with reading.
3. **Never behind Qur'anic text.** (§5.1.4.)
4. **Geometrically correct.** A girih pattern that does not tile correctly, or whose
   construction is decorative rather than geometric, is a defect. This institution
   teaches precision; its ornament must be precise.
5. **No arabesque wallpaper.** (§7.4.)
6. **Illustration for teaching** — diagrams of makhārij (points of articulation), iʿrāb
   trees, verb-form tables, tajwīd rule diagrams — is a separate, functional system:
   clear, labelled, high-contrast, RTL-aware, and accessible. It follows §26, not §21.

## §22. Motion — the editorial register

*Amended v0.6.* The previous article permitted only state-change motion. The Founder has
directed a richer, more ceremonial experience, and this article now describes a fuller
system — **without loosening the two rules that actually protect users**: nothing moves that
the user did not cause or scroll to, and everything is removed under
`prefers-reduced-motion`.

### 22.1 What motion is for here

Motion in this institution does one of three things and nothing else:

| | Purpose | Example |
|---|---|---|
| **Draw** | Show that something is *made* — a stroke that is written | The alif drawn on first paint; the girih assembling behind the hero |
| **Reveal** | Bring content into presence as the reader arrives at it | Staggered section entrance, 22px rise, once per element |
| **Respond** | Confirm the user's own action | Gold fill sliding across a button; nav underline; row hover |

**A fourth category — decorate — does not exist.** If an animation is not drawing, revealing,
or responding, it is removed.

### 22.2 The system

| Parameter | Value |
|---|---|
| Easing | `cubic-bezier(.16,.84,.44,1)` — one curve, everywhere |
| Durations | 180 ms micro · 340 ms standard · 600 ms entrance · ≤2.6 s for a single stroke-draw |
| Properties animated | `transform` and `opacity` only, plus `stroke-dashoffset` for draws |
| Frequency | **Once per element per page view.** Nothing loops, nothing repeats on scroll-back |
| Counters | Permitted **only over a real, sourced number**, and the final value is the truth. A counter must never animate toward a figure the institution cannot evidence (§46) |

### 22.3 Still forbidden

Scroll-jacking · parallax · auto-advancing carousels · typewriter effects · confetti ·
bouncing · looping background video · **any motion on Qur'anic text** (§5.1.2) · animated
logos used as loading spinners · motion that conveys information available no other way ·
any animation that repeats while the reader is trying to read.

### 22.4 `prefers-reduced-motion` — total, not partial

Every animation above is **removed**, not shortened, and content renders in its final state.
This is verified in the build: `tests/run.mjs` asserts that each animation-bearing class has
a corresponding reduced-motion override, so a new effect cannot ship without its opt-out.

---

# PART IV — EXPERIENCE

## §23. User Experience Principles

1. **Answer before you ask.** Price, duration, requirements, and time commitment are
   visible before any form. No email gate on basic information, ever.
2. **One primary action per screen.** Everything else is secondary or tertiary, visually
   and structurally.
3. **The student always knows three things:** where they are, what is next, and how far
   they have come.
4. **No dead ends.** Every state — empty, error, expired, locked, rejected — offers a
   next step and a named human to reach.
5. **Progress is never lost.** Autosave everywhere. A dropped connection mid-lesson,
   mid-recitation, or mid-assessment costs nothing.
6. **Offline is a first-class state**, not an error. (§24.)
7. **Interruption-tolerant.** This student prays five times a day, may be fasting, may be
   on a shared device, may be a mother with a child on her lap. Every flow must survive a
   20-minute interruption without penalty.
8. **Explain the machine.** Whenever an algorithm decides something for a student —
   revision schedule, placement, AI feedback, a fast-track eligibility — the student can
   see why, and a human can override it.
9. **Every automated judgement is appealable to a named person.**

## §24. Mobile-first, Low-bandwidth & Offline Principles

Our primary student is on an Android phone in Lagos, Kano, Accra, or Dakar, on a metered
data plan, on an intermittent connection. **That student is the design target — not the
secondary case.**

**Binding budgets:**

| Metric | Budget |
|---|---|
| Initial HTML + CSS + critical JS | ≤ 120 KB compressed |
| Total page weight, marketing pages | ≤ 400 KB |
| Largest Contentful Paint, 3G, mid-range Android | ≤ 3.0 s |
| Interaction to Next Paint | ≤ 200 ms |
| Cumulative Layout Shift | ≤ 0.05 |
| Fonts | ≤ 4 files, subset, `font-display: swap`, preloaded |

**Requirements:**

- Every screen designed at **360px width first**, then 768, then 1180. Not the reverse.
- **Touch targets ≥ 44×44px**, with ≥8px separation.
- **Data-saver mode** — a student-toggleable setting that disables video autoload, serves
  audio at a lower bitrate, and defers non-critical images. Its state is remembered.
- **Download for offline** on every lesson, every audio file, every reading — with the
  file size stated before download. Offline progress syncs when connection returns.
- **Audio before video.** For recitation, audio is the primary medium; video is an
  enhancement. Audio-only mode is a first-class option, not a degraded fallback.
- **Works without JavaScript** for all marketing and admissions content. The LMS may
  require JS; the pages that decide whether someone enrols may not.
- **SMS and WhatsApp fallbacks** for critical notifications (payment confirmation,
  class reminder, assessment result) — email is not a reliable primary channel in our
  main market.

## §25. Accessibility Standards

**Target: WCAG 2.2 Level AA across every surface, with AAA for body-text contrast.** This
is a floor, not an aspiration.

1. **Contrast** — §14.3, verified by automated check in CI, blocking on failure.
2. **Keyboard** — every interactive element reachable and operable by keyboard, in a
   logical order, with a visible focus indicator (2px `--dhahab` outline with 2px offset,
   never `outline: none`).
3. **Semantics** — real HTML landmarks, one `<h1>` per page, correct heading order, real
   `<button>` and `<a>` elements, real form labels, `<table>` for tabular data.
4. **`lang` and `dir`** — set correctly on the document and on every mixed-language
   element. This is an accessibility requirement, not a nicety: a screen reader switches
   voice on it.
5. **Media** — captions on all video; transcripts for all audio; **transcripts and
   translations for all recitation**; audio descriptions where visual content carries
   meaning.
6. **Motion** — §22's `prefers-reduced-motion` compliance.
7. **Zoom** — usable at 200% zoom and at 320px effective width with no horizontal
   scrolling and no loss of content.
8. **Forms** — errors identified in text (not colour alone), associated with their field,
   announced to assistive technology, and never destructive of entered data.
9. **Time limits** — any timed assessment can be extended on request as a documented
   accommodation.
10. **Testing** — automated (axe) in CI, plus **manual testing with a screen reader in
    both English and Arabic** before each release. Arabic screen-reader testing is
    mandatory and is the step most institutions skip.
11. A published **Accessibility Statement** with a named contact and a commitment to
    respond within 5 working days.

## §26. Bilingual & RTL Standards

### 26.1 The governing rule

> **Arabic is not a translation of English. Both are original.**

WEC-LC built English then mirrored it. For this institution that is inverted in
principle: institutional content is authored in **Arabic and English in parallel**, by
people fluent in each, with neither derived from the other. Where a source language must
be nominated for a given document, it is nominated explicitly and recorded.

### 26.2 Requirements

1. **Full structural mirroring** — one design system with `[dir="rtl"]` rules, not a
   separate stylesheet and not a translation plugin. Logical CSS properties
   (`margin-inline-start`, `padding-inline-end`, `border-inline-start`) throughout;
   physical properties (`left`, `right`) are a defect.
2. **URL parity** — `/ar/...` mirrors the English path structure exactly. Every page has
   a counterpart or an explicit, recorded reason why not.
3. **`hreflang`** on every page pair, plus `x-default`.
4. **Language switching preserves position** — switching language from a programme page
   lands on that programme page, never on the homepage.
5. **Language is a student preference, not an IP guess.** Detected once as a
   *suggestion*, always overridable, remembered thereafter. (Same principle as §39.)
6. **The dashboard/LMS layer is bilingual from day one.** WEC-LC's dashboard is
   English-only — a gap its own documentation flags. We do not repeat it: an Arabic
   college whose Arabic students cannot use its portal in Arabic is a contradiction.
7. **RTL-aware components** — carousels, sliders, progress bars, steppers, breadcrumbs,
   charts, and range inputs all reverse. Charts read right-to-left in Arabic.
8. **Mixed-direction text** — §15.3.8.
9. **Third language deferred.** French (for Francophone West Africa — Senegal, Mali,
   Niger, Côte d'Ivoire) and Hausa are strategically significant and explicitly deferred
   to Phase 2 of expansion (§44), not designed away. The i18n architecture must support
   n languages from the outset even while shipping two.

## §27. The Student Journey

Seven stages. Each names the student's real question and our obligation.

| # | Stage | The student's question | Our obligation |
|---|---|---|---|
| 1 | **Discovery** | "Is this real, or another online academy?" | Named faculty. Published curriculum. Verifiable certification. Real institutional detail. Honest status on what does not exist yet. |
| 2 | **Evaluation** | "Can I afford it, and can I fit it into my life?" | Price visible without a form. Time commitment stated in hours per week. Every pathway and duration published. |
| 3 | **Placement** | "Where do I start? Will I be embarrassed?" | Free self-assessment, plus a real human placement conversation. Framed as calibration, never as a test to pass. |
| 4 | **Enrolment** | "What exactly am I paying for, and what if it goes wrong?" | Itemised fees, no surprises at checkout, plain refund terms, instalments without penalty framing, confirmation within minutes. |
| 5 | **Onboarding (first 14 days)** | "Am I in the right place? Can I actually do this?" | Teacher contact within 48 hours. First lesson within 7 days. A named person who knows their name. **This window decides retention.** |
| 6 | **Study** | "Am I progressing? Am I falling behind?" | Visible mastery progress. Scheduled revision. Rapid, specific feedback. Proactive outreach on the *first* signal of drift, not the third. |
| 7 | **Certification & alumni** | "Does this mean anything outside here?" | Verifiable certificate, a transcript that survives scrutiny, an alumni record, and a path to the next thing. |

**Design commitments per stage** — no email gate before stage 4; no payment before a
free trial lesson (D-09); no automated dropout — a student who goes quiet gets a human
message before any system action.

## §28. The Parent Journey

In our primary market, the parent — usually the father as payer, often the mother as
decision-influencer, and increasingly both — is a distinct user with distinct needs. They
are frequently **not** the student, may have limited English, and are choosing on trust.

| Stage | Parent's question | Our obligation |
|---|---|---|
| Trust | "Who is teaching my child, and what do they believe?" | Named teachers, credentials, published methodology (§5.7). A safeguarding policy, published. |
| Safety | "Is my child safe in a one-to-one online class?" | A published child-protection policy: recorded sessions, no private off-platform contact, vetted teachers, a reporting channel, parental access to session recordings. **Non-negotiable and must exist before the first child enrols.** |
| Cost | "What will this cost me in total, and can I pay monthly?" | A total-cost figure, not a monthly teaser. Instalments without penalty. Regional pricing explained plainly. |
| Progress | "Is it working?" | A parent portal with genuine progress — juzʾ memorised, itqān grades, attendance, teacher comments. Monthly summary by WhatsApp/SMS as well as email. |
| Voice | "Who do I speak to if I'm unhappy?" | A named contact, a stated response time, a real complaints procedure with escalation. |

**Rules:** the parent portal shows real assessment, never a vanity dashboard. Parents of
adult students get access **only with the adult student's consent** — this is a privacy
boundary, and it must be enforced in code, not by policy alone.

## §29. The Teacher Journey

An institution is its faculty. If teaching here is unpleasant, nothing else in this Bible
matters.

| Stage | Obligation |
|---|---|
| **Recruitment** | Published standards: qualification, ijāzah where relevant, teaching experience, assessed demonstration lesson. Published pay bands. |
| **Verification** | Credentials and chains verified and recorded before appointment. Background checks for anyone teaching minors, in every jurisdiction where we operate. |
| **Onboarding** | Paid induction covering our pedagogy (§4), our adab standards, the platform, and safeguarding. |
| **Teaching** | A tool that saves time: automatic attendance, pre-built lesson material, one-tap assessment entry, revision scheduling handled by the system. **A teacher should spend under 10 minutes on admin per class hour.** |
| **Development** | Funded continuing study, peer observation, and a route to senior faculty and curriculum authorship. |
| **Pay** | Paid on time, in their own currency, without them having to ask. Non-negotiable — a late teacher payment is an institutional failure of §3.1. |
| **Voice** | Faculty representation in curriculum decisions. A teacher who says a pathway is too fast must be heard, and their objection recorded. |

**Faculty pay and regional pricing.** Regional pricing (§39) reduces revenue per student
in low-band markets. **Teacher pay is never reduced to compensate.** Where pay varies by
market it does so on a published band structure, benchmarked to a living wage in that
market, never as a residual of what a discounted student paid.

**This commitment requires an explicit cross-subsidy, and saying so is mandatory.** Band E
sits at index 0.08 (§38.3); at 8% of Band A revenue a Band E cohort cannot fund a
living-wage teacher on its own. The Phase 8 financial model must therefore quantify the
cross-subsidy and state the Band A/B enrolment ratio required to sustain Bands D and E —
and that ratio is **published as part of the pricing methodology** (§38.2.5). An
unquantified version of this commitment is one that gets broken quietly under pressure,
which is worse than never making it. Published, it becomes a trust asset: it shows exactly
who is paying for whom, and that we are not pretending the money comes from nowhere.

## §30. The Administrative Journey

| Role | Needs | Standard |
|---|---|---|
| **Admissions** | Applications in one queue, with placement data attached; decision in ≤5 working days | Every application answered. No silent rejections, ever. |
| **Finance** | Reconciliation across gateways and currencies; instalment tracking; scholarship ledger | Inherits WEC-LC's proven reconciliation model — it already surfaces orphaned webhooks, stale payments, and missing receipts. |
| **Academic registry** | Enrolment, progression, mastery records, certification, transcripts | Every record auditable. Every grade attributable to a named assessor. |
| **Student support** | One view of a student: enrolment, payment, progress, attendance, contact history | No student ever repeats their story to a second staff member. |
| **Leadership** | Enrolment, retention, mastery rates, revenue by band, teacher load | Real numbers only. A dashboard that flatters is worse than no dashboard. |

**Universal admin rules:** every administrative action is logged with actor, timestamp,
and reason. Anything affecting a student's money or record is reversible, with the
reversal also logged. No staff member sees more student data than their role requires.

## §31. Trust Building Strategy

Our category has a trust deficit — it is full of unverifiable claims. Trust is therefore
the primary product, and it is built by *evidence*, not by assertion.

**The eight instruments, in order of power:**

1. **Named, credentialled faculty with published chains.** The single strongest signal
   available to us and the one competitors will not copy, because most cannot.
2. **Verifiable certification.** A public verification page: enter a certificate number,
   see the holder, programme, level, date, and assessor. (§37.)
3. **Published curricula and assessment criteria.** Anyone can read exactly what is
   taught and how mastery is judged, before paying.
4. **Published pricing methodology.** Not just prices — *why* the prices are what they
   are. (§39.) Turning our most legally sensitive area into our loudest trust signal.
5. **Institutional Status callouts.** Publishing what we have *not* yet achieved.
   Counter-intuitive and extremely powerful: an institution that admits it is not yet
   accredited is more believable about everything else. (§47.)
6. **Real outcomes, when they exist.** Named students, with consent, with verifiable
   results. Zero until they exist.
7. **Public policies.** Safeguarding, refunds, complaints, privacy, academic integrity —
   published, dated, versioned.
8. **An annual report.** From year one, even when the numbers are small. Institutions
   publish; academies do not.

**Anti-trust signals we will never use:** fake counters, "as seen in" logos without a
real citation, purchased reviews, borrowed authority (Ḥaramayn imagery), scholar
photographs without written endorsement, or implied affiliation with any institution we
are not formally affiliated with.

## §32. Conversion Strategy

### 32.1 The governing constraint

> **We convert by removing doubt, never by manufacturing pressure.**

Any conversion tactic that would be dishonest, undignified, or coercive is out of scope,
even if it works. Especially if it works.

### 32.2 What we do

| Instrument | Why it works here |
|---|---|
| **Free, ungated placement assessment** | Answers the #1 blocking anxiety ("where would I even start?") and gives us a qualified lead honestly |
| **One free trial lesson with a real teacher** | Our teachers are the product. Meeting one converts better than any copy. |
| **Published price, no form** | Removes the single largest source of drop-off in this category |
| **Genuinely useful free teaching content** | Demonstrates competence rather than claiming it (§12.2) |
| **A total-cost calculator** | Programme + region + pathway + instalments → one honest number |
| **Named human contact** | A real person, a real name, a stated response time |
| **Instalments framed as normal** | Not as a concession to the poor. Standard, unremarkable, dignified. |
| **A clear, generous refund window** | Reduces perceived risk more than any discount |

### 32.3 What we never do

Countdown timers; false scarcity; "X people are viewing this"; exit-intent popups;
pre-ticked upsells; drip-fed fees revealed at checkout; confirm-shaming; guilt or fear
appeals (§6.3); "limited scholarships" when they are not limited; auto-renewal without a
clear, reachable cancellation.

**Standing commitment for when the pages exist:** hardship, bereavement, financial-aid, and
withdrawal pages are **never** added to any retargeting, remarketing, or advertising
audience, and never trigger a follow-up sales contact. A student reading them is at their
most vulnerable and least should be sold to. This binds Phase 5 when the information
architecture is drawn, and Phase 9 when analytics are configured.

### 32.4 The metrics we optimise

We do **not** optimise conversion rate as a primary metric. We optimise:

1. **Enrolment-to-first-lesson completion** (did they actually start?)
2. **14-day retention** (was the promise true?)
3. **Level-completion rate** (is the teaching working?)
4. **Mastery-gate pass rate on first attempt** (are we placing correctly?)
5. **Refund rate** (a rising refund rate is a truth signal about our marketing)

A conversion improvement that worsens metric 2 or 5 is a failure and is reverted.

---

# PART V — ACADEMIC CONSTITUTION

*Principles only. The full academic framework is Phase 3.*

## §33. Progression & Mastery Doctrine

### 33.1 The core decision

**Progression is by demonstrated mastery, not by elapsed time.** A term does not promote
a student; an assessor does.

This is what makes the Founder's "unique and fast-tracked duration" requirement
*coherent* rather than merely a marketing claim: multiple durations are not different
products, they are the natural output of one mastery standard applied to students of
different capacity, availability, and starting point.

### 33.2 The four route archetypes

One curriculum. One mastery standard. Four routes through it.

| Route | Weekly commitment | Who it is for | Duration language |
|---|---|---|---|
| **Intensive** (المكثّف) | 20–30 hrs | Gap-year, full-time, summer | "Median X weeks, range Y–Z" |
| **Standard** (النظامي) | 8–12 hrs | Most students | Median and range |
| **Measured** (المتدرّج) | 4–6 hrs | Working professionals, parents | Median and range |
| **Open** (المفتوح) | Self-paced | Self-directed, irregular availability | No duration claimed; mastery gates only |

### 33.2a Notional learning hours — the second record

**Mastery decides progression. Notional learning hours describe what the award
represents.** Every unit and level carries **both**, and they are orthogonal.

A fast-track student may complete a 120-hour level in six weeks; a measured-route student
may take six months. Both are recorded as **120 notional learning hours**. Mastery alone
governs *whether* a student advances (§33.3 is unchanged); notional hours govern how the
award is *recognised* elsewhere.

**Why this is non-negotiable.** Every recognised quality framework — Nigeria's NUC/NBTE,
Ofqual's RQF, the EQF, ECTS — expresses awards in volume of learning. Without it we cannot
apply for accreditation, map to any national framework, support credit transfer, grant
recognition of prior learning, or let a graduate's award be evaluated by a foreign
university or employer. §27 promises the student certification that "means something
outside here"; without notional hours that promise is structurally unkeepable.

This is not a retreat from mastery-based progression. It is the recognition that refusing
to state a quantity every regulator requires costs our graduates, not our principles.

**Binding rule on duration claims:** we publish a **median and a range**, drawn from real
student data, with the sample size and date. Until we have real data, we publish a
**planned** duration explicitly labelled as planned, with the assumptions stated. We
never publish a single duration figure as though it were a promise.

### 33.3 The mastery gate

To advance, a student must demonstrate mastery to a qualified human assessor. Not
complete the lessons. Not pass a quiz. Demonstrate.

- Gates are **published in advance** — every student knows exactly what they must show.
- A failed gate is **not a failure**; it produces a specific diagnostic and a targeted
  remediation plan. Retakes are unlimited and free. (Charging for retakes creates an
  incentive to fail students. We will not build that incentive.)
- **No time limit on reaching a gate.** A student who takes three years to reach the
  Level 3 gate has still reached it.
- Every gate result is attributable to a **named assessor**.

### 33.4 Fast-tracking — and its honest limits

Fast-tracking is available for Arabic, for Islamic studies, and for the *understanding*
components of Qur'an study. It is available for ḥifẓ only within limits (§34.3).

Eligibility for a fast-track is determined by demonstrated pace, not by paying more.
**Fast-tracking is never sold as an upgrade.** A student on a Community-tier price who
demonstrates the pace gets the fast-track; a Premium-tier student who does not, does not.
This rule protects §3.6 (justice) against the commercial pressure that will inevitably be
applied to it.

## §34. Qur'an Standards

1. **Ḥifẓ is measured in *itqān*, not in pages.** The unit of record is (portion ×
   itqān grade × date last verified), never "pages memorised."
2. **Retention is part of the standard.** A juzʾ is only "held" if it survives
   unannounced re-testing after a defined interval. Our published ḥifẓ figures reflect
   *retained* memorisation. Most academies count *reached* memorisation. The difference
   is the whole point.
3. **Recitation is assessed by ear, by a qualified human.** Machine assistance may
   pre-screen and flag; it never certifies. (§4.1e.)
4. **Scheduled *murājaʿah* is compulsory**, system-scheduled, and counts toward
   progression. A student who stops revising does not advance regardless of new
   memorisation.
5. **No ḥifẓ timeline is ever promised.** (§6.2.) We publish observed ranges with sample
   sizes and the conditions that produced them.
6. **The riwāyah is declared** (§15.4) and never mixed unlabelled.
7. **Ijāzah is not issued. (Ruled — D-04.)** Al-Madinah does not grant ijāzah, and says
   so plainly on every surface where certification is discussed. We issue the awards in
   §36.2 instead — each of which attests to something we can actually evidence.
   Ijāzah programmes are introduced **only** when mashāyikh holding an authentic,
   verifiable chain in the relevant riwāyah join the institution, and only under §36.3's
   conditions. Until then, students seeking ijāzah are referred onward, honestly. This
   remains the institution's highest integrity risk, and the ruling is the conservative
   one precisely because of it.

## §35. Arabic Standards

1. **The spine is one integrated Arabic framework, mapped to CEFR** for external
   legibility. Rationale: our students need a benchmark employers and universities
   recognise. Our own level names sit on top of that shared reference — the same
   reasoning WEC-LC applied to English, and correct for the same reason.
2. **Assessed across five modalities:** reading, listening, speaking, writing, and
   *comprehension of classical text*. The fifth is the differentiator and is where most
   conversational-Arabic programmes have nothing to offer.
3. **Classical text from Level 1**, graded and supported. A student who finishes our
   Level 4 can read an unvocalised classical paragraph with a dictionary. That is a
   testable claim and we will publish the test.
4. **Grammar taught functionally**, in service of reading, never as an end in itself.
   *Naḥw* and *ṣarf* are taught as tools with the text in front of the student.
5. **Speaking is assessed**, not just taught. Every level gate includes a live spoken
   component with a human.

## §36. Assessment & Certification Integrity

### 36.1 Principles

1. **Every certificate is independently verifiable** at a public URL, by number, showing
   holder, programme, level, date, assessor, and status (valid / revoked).
2. **Certificates state exactly what was assessed** and what they do and do not signify.
   A certificate that overstates is a lie with a seal on it.
3. **Academic integrity is enforced** — identity verification at assessment, plagiarism
   detection for written work, live components that cannot be outsourced.
4. **Assessors are named, trained, moderated, and sampled.** A proportion of every
   assessor's decisions is second-marked. Divergence is investigated.
5. **Grade inflation is an institutional risk**, monitored explicitly. If pass rates rise
   without a corresponding change in intake or teaching, that is a defect, not a success.
6. **Revocation is possible and public.** A certificate obtained fraudulently is revoked
   and its verification page says so.
7. **Every award carries the same standard regardless of price tier.** (§37.6.)

### 36.2 The award ladder (ruled — D-04)

Four awards. Each attests to something we can evidence, and nothing more.

| Award | Attests to | Assessed by |
|---|---|---|
| **Qur'an Memorisation Certificate** | A stated portion memorised **and retained** to a stated *itqān* grade, verified by unannounced re-testing (§34.2) | Live recitation to a qualified human assessor |
| **Tajwīd Proficiency Certificate** | Command of the rules of tajwīd in the declared riwāyah, demonstrated in recitation — not written theory alone | Live recitation plus applied rule identification |
| **Arabic Language Diploma** ⚠ | Completion and mastery of a named Arabic level, across all five modalities including comprehension of classical text (§35.2) | Level mastery gate, including a live spoken component |
| **Certificate of Completion** | Attendance and completion of a defined programme of study, with no mastery claim | Attendance and submission record |

**Every award states on its face what it is not.** The Qur'an Memorisation Certificate
carries, in both languages: *"This is an institutional award attesting to memorisation
assessed against Al-Madinah's published standard. It is not an ijāzah and confers no
chain of transmission."* That sentence protects the student, the institution, and the
tradition simultaneously.

⚠ **"Diploma" is a regulated term and is not yet cleared.** In several target markets —
Nigeria, the UK, and parts of the EU and US — award nomenclature is regulated, and
"diploma" carries specific expectations. This is exactly the scope of **D-03**, which is
still open. The name is recorded here as the Founder's intent; it does **not** ship until
counsel confirms it is lawful in each market where we market it. If it is not clearable,
the fallback is **"Certificate of Mastery in Arabic — Level n"**, which says the same
thing and is unregulated. No award name is printed, coded, or marketed before D-03 closes.

### 36.3 Ijāzah — the conditions for ever issuing one

Al-Madinah does not currently grant ijāzah (§34.7). It may only begin to when **all** of
the following are true, and each is published:

1. A named muqriʾ holds an ijāzah in the riwāyah being taught, with a chain we have
   verified and can publish in full.
2. The ijāzah follows a complete recitation to that muqriʾ, not a portion.
3. Each grant is recorded in a public, verifiable register (§36.1.1).
4. The Academic Board has approved the muqriʾ, the chain, and the process on record.

Until all four hold, the public position is stated plainly and without apology:
*"Al-Madinah does not grant ijāzah. Students seeking one are referred to [named
institutions or mashāyikh]."* Referring a student to a better-qualified institution is a
trust signal, not a lost sale.

---

# PART VI — COMMERCIAL CONSTITUTION

## §37. Pricing Philosophy

1. **Price is a statement of values.** Ours says: this education is serious enough to
   cost something, and important enough that cost must not decide who receives it.
2. **Every price is published.** No "contact us for pricing" on any standard programme.
3. **The published price is the price.** No fees appear at checkout that were not visible
   before it.
4. **Total cost is always shown**, alongside any monthly figure. Never a monthly teaser
   alone.
5. **Instalments are standard and carry no penalty.** Where an administrative cost
   applies it is stated in currency, once, up front.
6. **We never discount the certificate.** Cheaper tiers may receive less contact time or
   fewer services. **They never receive a lower academic standard or a lesser
   certificate.** A Community-tier graduate and a Premium-tier graduate met the same
   mastery gate and hold the same certificate. This is §3.6 made structural.

## §38. Regional Access Pricing

### 38.1 The ruling (D-10 — closed)

The original brief asked for pricing differentiated by IP address, applied automatically
"without even announcing to students." **The Founder has ruled for the disclosed model.**

**Settled policy:**

- Regional pricing is determined by the student's **billing country or declared country
  of residence**, with verification proportionate to the size of the differential.
- **IP is a hint for the initial display only.** It never determines what a student is
  charged, and it is never the sole basis of a band assignment.
- The band structure and its methodology are **published**.
- Multiple currencies are supported, with the student able to pay in their own where a
  gateway allows.
- Scholarships and financial aid sit alongside the bands (§40), not inside them.
- Every jurisdiction's consumer-protection and pricing-transparency requirements are met.

The economic objective the brief set out is preserved in full. Only the concealment is
removed. The reasoning is retained below as the institutional record — and, more usefully,
because it is the argument the public methodology page will need to make.

**Why the reasoning is kept:** the four points below are not a settled internal argument
any more. They are the reason a student in Manchester will accept, without resentment,
that a student in Kano pays less. That argument has to be made publicly, in our own voice,
and this is where it is written down.

**1. It is a legal exposure in our most valuable markets.**
Undisclosed, personalised or location-based pricing engages consumer-protection law in
several of our target jurisdictions — including EU/UK rules on misleading omissions and
on transparency where a price is personalised, the EU's geo-blocking framework as it
touches customers in the single market, US FTC unfair-and-deceptive-practices doctrine,
and Nigeria's FCCPA 2018 provisions on misleading pricing. I am flagging exposure, not
giving legal advice: the precise application in each market is a question for qualified
counsel, and Phase 8 must budget for that opinion. But "we hid it" is not a defensible
posture in any of them.

**2. It cannot be kept secret.** Students discuss prices. VPNs are ubiquitous. Screenshots
travel on WhatsApp within hours. The mechanism will be discovered — the only variable is
whether it is discovered as *our published policy* or as *our concealed practice*. One is
a headline about generosity. The other is a headline about deception, aimed at an
institution whose entire product is trust.

**3. It contradicts §3.1 and §6.4**, and it is *ghish* — commercial concealment — in an
institution that teaches against it. An Islamic college that quietly charges different
prices and hopes no one notices has a problem no marketing budget solves.

**4. IP alone does not work.** It misidentifies diaspora students, students on corporate
VPNs, travellers, and anyone on a mobile carrier that routes through another country.
It hands the cheap price to whoever installs a free VPN, and the expensive price to a
Nigerian student on a proxied connection.

### 38.2 Regional Access Pricing — the mechanism

**Same economics as the brief asked for. Opposite posture.** Published, and made a reason
to trust us.

1. **Five published bands**, assigned by country using a **published, citable
   methodology** (World Bank income classification and PPP conversion factors, reviewed
   annually, with the review date shown). No arbitrary, unexplainable differences.
2. **A public pricing page shows every band and every country's assignment.** Anyone can
   look up any country. Nothing is hidden.
3. **The student's band is *suggested*, never imposed.** IP provides the initial guess
   only. It is **always displayed** ("You're seeing Nigeria pricing — change country")
   and **always changeable in one click**, before any account exists.
4. **The band is set by declared country of residence at enrolment**, and **verified at
   payment** against billing address and the issuing country of the card or mobile-money
   account. Verification is proportionate: a Band A→B step needs little; a Band A→E step
   needs a billing-country match. This is both more accurate and more defensible than IP,
   and it is what closes the VPN-arbitrage gap that the IP-only model leaves wide open.
5. **The methodology page explains why**, in our own voice: *"A programme that costs one
   week's median income in London should not cost six months' median income in Kano. We
   publish what every country pays and how we decided. We would rather you knew."*
6. **Integrity controls, published:** one region per account; region set at enrolment and
   changed only with evidence; deliberate misrepresentation may be corrected to the
   accurate band with notice — never retroactive punishment, never silent charging, never
   a suspended account without a human review and a right of reply.
7. **Currency is a separate axis from band.** A student's band sets *what* they pay; their
   currency sets *how*. A Band A student in Riyadh sees SAR; a Band A student in London
   sees GBP; a Band D student in Lagos sees NGN. Currency selection is always overridable,
   and USD is always available as a fallback.
8. **No price changes after enrolment for the duration of an enrolled programme.** A
   student who enrolls at a band and price holds that price to completion of what they
   paid for, regardless of subsequent band revisions or FX movement. This is what makes
   the annual methodology review safe to publish.

This is the model Spotify, Netflix, JetBrains, and the major Ed-Tech platforms use, and
it survives scrutiny precisely because it is disclosed. Adobe and others have been
publicly damaged specifically for the *undisclosed* version.

### 38.3 Illustrative band structure

Numbers are **illustrative placeholders for discussion only** — real figures are Phase 8,
built on real cost and real market research. The *ratios* are the proposal.

| Band | Representative markets | Index |
|---|---|---|
| **A** | US, Canada, UK, Western Europe, Australia, Qatar, UAE, Kuwait, Saudi Arabia, Singapore | 1.00 |
| **B** | Eastern Europe, Malaysia, Turkey, South Africa, Gulf lower band, Chile | 0.55 |
| **C** | Morocco, Egypt, Indonesia, Philippines, Jordan, India | 0.28 |
| **D** | Nigeria, Ghana, Kenya, Senegal, Pakistan, Bangladesh | 0.15 |
| **E** | **Niger, Chad, Mali, Burkina Faso**, and other lowest-income and crisis markets, published individually | 0.08 |

Worked illustration at the brief's own reference point — a programme listed at **$150** in
Band A:

| Band | Market | Indicative | In local currency |
|---|---|---|---|
| A | United States | $150 | $150 USD |
| A | Saudi Arabia | $150 | SAR equivalent |
| A | United Kingdom | $150 | £ equivalent |
| C | Egypt | $42 | EGP equivalent |
| D | Nigeria | $22 | ₦ equivalent |
| E | Niger, Chad | $12 | XOF / XAF equivalent |

The brief's original example ($150 → $15) sits between Bands D and E. **The economics the
Founder asked for are preserved in full.** Only the concealment is removed.

**A strategic consequence worth registering now:** Band E as ruled explicitly names Niger
and Chad, and Band D names Senegal — all Francophone. If we are pricing for those markets,
we are marketing to them, and marketing to them in English does not work. **French
localisation therefore moves up from expansion Phase 5 (§43) to a Phase 2 or 3
consideration.** This is a real cost implication of the pricing ruling and should be
carried into the Phase 8 financial model rather than discovered later.

### 38.4 Record of the decision

The Founder ruled for the disclosed model (D-10, closed). The arguments that were put for
the undisclosed variant, and my assessment of each, are preserved in
`docs/decision-register.md` § D-10 so that a future reader can reconstruct the reasoning
rather than merely inherit the conclusion. Per §47, the reasoning matters more than the
change.

## §39. Tier Architecture

Five tiers, orthogonal to the five regional bands. **Tier determines service level. Band
determines price level. Neither ever determines academic standard.** (§37.6.)

| Tier | What it buys |
|---|---|
| **Premium** (النخبة) | One-to-one teaching, a dedicated academic mentor, priority scheduling, unlimited assessment slots, full ijāzah track where eligible |
| **Professional** (المهني) | Small cohorts (≤8), weekly one-to-one, flexible executive scheduling, career-oriented Arabic |
| **Standard** (النظامي) | Cohort classes (≤15), scheduled one-to-one, full curriculum, full certification. **The default.** |
| **Community** (المجتمعي) | Larger cohorts (≤30), group assessment slots, full curriculum, full certification. Lower cost through scale, not through lower standards. |
| **Scholarship** (المنحة) | Full or partial award. **Identical to Standard in every respect.** No visible marker anywhere, ever — not in the portal, not in the classroom, not on the certificate. |

**Binding rule on the Scholarship tier:** a scholarship student is indistinguishable from
a fee-paying student on every surface, to every teacher, and in every record a peer can
see. Dignity is the point. Anything else violates §3.4 and §5.

**Payment models supported:** one-time full programme; per-level; monthly subscription;
instalments (no penalty); family plans; corporate/institutional invoicing; sponsorship
(third party pays, with the student's consent). All in local currency where a gateway
supports it.

## §40. Scholarship, Zakāt & Waqf

1. **A published, budgeted scholarship allocation** — a stated percentage of net revenue,
   reported annually. Not "scholarships available" in the abstract.
2. **Published eligibility and a published, dated decision process.** Applicants are told
   the criteria before applying and get a reasoned decision.
3. **Zakāt funds, if accepted, are ring-fenced** — held separately, disbursed only to
   eligible recipients under a published fiqh position from a named scholar, accounted
   for separately, and never mixed with operating revenue. If we cannot administer zakāt
   to that standard, **we do not accept it.** Recorded as **D-11**.
4. **Waqf/endowment** is the correct long-term instrument for a permanent institution and
   should be designed properly in Phase 8, not bolted on.
5. **Every fund is audited and publicly reported.** An Islamic institution handling
   sadaqah and zakāt without independent audit is a scandal waiting to happen.

---

# PART VII — GLOBAL STRATEGY

## §41. African Leadership Strategy

### 41.1 The strategic position

> **We are not an African institution serving Africans. We are an African institution
> serving the world.**

The distinction is everything. The first is a charity framing that caps our ceiling and
guarantees we are perceived as the discount option. The second makes African origin a
mark of authority, as it historically was — Timbuktu, Sankoré, Zaria, Kano, Ilorin, and
the West African manuscript tradition.

### 41.2 How it shows up

- **Named African scholarship.** Our faculty, our intellectual lineage, and our
  references are visibly West African as well as Ḥaramayn-connected. We cite the African
  tradition by name.
- **African aesthetic authority without exoticism.** The visual system is drawn from
  Madinah's own materials (§14) with West African manuscript and architectural traditions
  as a legitimate reference — Kano and Timbuktu manuscript illumination, Sudano-Sahelian
  geometry. Never as "ethnic decoration."
- **Nigeria-first infrastructure.** Naira pricing, Paystack/Flutterwave/Opay, WhatsApp as
  a primary channel, low-bandwidth engineering (§24), offline-first. Built for the
  primary market, not retrofitted to it.
- **Partnership, not extraction.** Local madāris are partners — teacher pipelines, feeder
  relationships, certification pathways for their existing students. Never framed as
  competitors we are displacing. (§9.2.)
- **We publish in Africa.** Curriculum, research, and teaching material published openly,
  contributing to the ecosystem rather than enclosing it.

### 41.3 The reversal we are aiming at

The measure of success in year five is not enrolment. It is a student in Manchester,
Toronto, or Jeddah choosing a Nigerian institution **because it is better**, and saying so
in those words.

## §42. Global Positioning

**Line:** *Rooted in Madinah's standard. Built in Africa. Taught to the world.*

Three claims, each of which must be earned before it is asserted, in this order:

1. **Authoritative** — earned through named faculty, published chains, and verifiable
   certification. (Years 1–2.)
2. **Beautiful** — earned through design discipline that stands beside any global
   university's. (Year 1; the fastest to earn and the fastest to lose.)
3. **Flexible** — earned through mastery-based progression that genuinely works at four
   different paces. (Years 1–3; the hardest to build.)

**Never claimed:** "the world's leading," "the best in Africa," "the most trusted." Until
cited. (§10.2, Rule 2.)

## §43. International Expansion Strategy

Sequenced by where trust already exists, not by market size.

| Phase | Markets | Why | Requires |
|---|---|---|---|
| **1** | Nigeria + Anglophone West Africa (Ghana, Sierra Leone, Gambia) | Home market. Trust exists. Language and payment infrastructure ready. | Naira/Cedi pricing, local gateways, WhatsApp, offline-first |
| **2** | UK + Western European diaspora | Highest-value Band A, culturally connected, actively seeking exactly this | Regulatory review (D-03), UK safeguarding compliance, GDPR, GBP/EUR |
| **3** | North American diaspora | Large, affluent, underserved for serious Arabic | US state-level education regulations reviewed, USD/CAD |
| **4** | Gulf (Saudi, UAE, Qatar, Kuwait) | Band A; Arabic-native market for Qur'an and Islamic sciences rather than Arabic language | Arabic-primary marketing, local partnership, GCC payment rails |
| **5** | Francophone West Africa (Senegal, Mali, Niger, Côte d'Ivoire) | Large, underserved, adjacent | **French localisation** (§26.9), CFA franc, regional partnership |
| **6** | South and Southeast Asia (Pakistan, Bangladesh, Indonesia, Malaysia) | Enormous demand, price-sensitive, Band C/D | Local partnership, careful positioning against MEDIU (§8.1) |

**Standing constraints:** no market is entered before its data-protection and
education-regulation position is reviewed by counsel; no market is entered without a
payment rail its students actually use; no market is entered without at least one teacher
who speaks its dominant language natively.

---

# PART VIII — GOVERNANCE

## §44. Brand Governance

### 44.1 Authority

| Role | Owns | Can approve |
|---|---|---|
| **Founder / CEO** | Vision, Mission, Values (§1–§3); all D-numbered decisions | Amendments to Parts I, VI, VII |
| **Academic Board** | Curriculum, assessment, mastery standards, Islamic identity (§5) | Amendments to Parts I §5 and V |
| **Design Authority** | Design system (Part III), all identity assets | Amendments to Part III |
| **Editorial Authority** | Voice, editorial standards, published content (§10–§12) | Amendments to Part II |
| **Everyone else** | Compliance | Nothing. Escalate. |

**No asset, page, price, certificate, or campaign is published without the relevant
authority's sign-off**, recorded.

### 44.2 The brand asset library

One source of truth: logos, typefaces, colour tokens, icons, ornament, templates,
photography, certificate masters — versioned, licensed, and access-controlled. Nothing is
recreated. Nothing is used from a personal file. Nothing is sourced from a search engine.

### 44.3 Third parties

Every external designer, developer, agency, translator, calligrapher, and photographer
receives this Bible, works to it, and assigns all rights in writing before work begins.
Non-compliant work is not paid for. This clause goes in the contract.

## §45. Quality Assurance Framework

### 45.1 The five gates

Nothing reaches a student without passing all five, recorded.

| Gate | Checks | Owner |
|---|---|---|
| **1. Truth** | Every fact verifiable and dated; no invented claim; §47 compliance | Editorial |
| **2. Islamic integrity** | §5 in full — Qur'anic handling, honorifics, aniconism, modesty, audio | Academic Board |
| **3. Language** | Arabic reviewed by a second native speaker; English house style; §11 two-person rule | Editorial |
| **4. Design** | §13.2's six tests; tokens only, no ad-hoc values; RTL parity | Design Authority |
| **5. Technical** | §25 accessibility (automated + manual, both languages); §24 performance budgets; security; privacy | Engineering |

### 45.2 Academic quality assurance

- Every curriculum reviewed annually by the Academic Board and revised on record.
- Assessor moderation: a sampled proportion of every assessor's decisions second-marked.
- Teacher observation: every teacher observed at least termly, with written feedback.
- Student feedback collected every level, published in aggregate, acted on visibly.
- Cohort outcome analysis: completion, mastery-first-attempt, retention, published
  annually.

### 45.3 Continuous obligations

- Quarterly full accessibility audit, both languages.
- Quarterly link, fact, and statistic audit — every published number rechecked against
  its `as of` date; stale numbers are removed, not left to rot.
- Annual security review and penetration test once real student data exists.
- Annual review of this Bible in full.

## §46. The Institutional Honesty Protocol

**The most important article in this document.**

### 46.1 The rule

> **No fact about this institution is published unless it is true today.**

Not "will be true." Not "is true in spirit." Not "is true of the sector." True, today,
about us, and checkable.

This binds: student numbers, graduate numbers, testimonials, faculty names and
credentials, accreditations, partnerships, endorsements, campus facilities, founding
dates, sanad and ijāzah chains, pass rates, durations, awards, media coverage, and
photographs.

### 46.2 The mechanism — Institutional Status callouts

Where a fact does not exist yet, we publish that, in the same visual language as
everything else — a consistent, dignified, dashed-rule component. Not a smaller font. Not
a footnote. Not an omission.

Example, verbatim in tone:

> **Institutional Status — Accreditation**
> Al-Madinah International College is not currently accredited by any external
> quality-assurance body. We have begun the process with [named body] and expect a
> decision by [date]. Until then, our certificates are institutional awards, verifiable
> through our own register, and we recommend you confirm they meet your specific
> requirements before enrolling. *Last reviewed: [date].*

**Why this is a commercial asset, not a confession.** In a category saturated with
unverifiable claims, the institution that publishes its gaps is the one whose other
claims become believable. WEC-LC arrived at this independently. It is inherited here and
strengthened, because for an Islamic institution it is not merely good practice — it is
*amāna*.

### 46.3 The current status register

As of this draft, **every one of the following is unknown or unconfirmed** and must
appear as an Institutional Status callout on any surface that touches it, until resolved:

- Legal entity, registration jurisdiction, and registration number
- **The group's** legal structure, name, registration, and each member institution's
  standing — the D-01 ruling settles the *structure*, not the *facts* (§8.3)
- **Any group figure** — founding year, student numbers, staff numbers, years of operation
- Physical address and premises
- Founding date and first cohort start date
- Named academic leadership and faculty roster
- Faculty credentials, ijāzāt, and chains
- Accreditation or external quality-assurance affiliation
- Regulatory permission to use the term "College" in each target market (D-03)
- Any partnership, affiliation, or endorsement
- Any student, graduate, outcome, or testimonial
- Real tuition figures in any currency
- Academic calendar

**Nothing in the above list may appear on any public surface as an asserted fact until it
is real.** This is not a temporary state of caution. It is the permanent operating rule,
applied to whatever is currently unresolved.

### 46.4 The correction protocol

When we get something wrong: correct it within 24 hours of discovery; state the
correction publicly where the error was public; date it; do not quietly delete. An
institution that corrects visibly is trusted more than one that appears never to err.

## §48. The Mobile Covenant

**Added at v0.8, after the Founder found that every page of the shipped site scrolled
sideways on a phone while 1,029 automated checks reported success.**

This article exists because its absence was not an oversight of execution but of
constitution. This Bible ran to forty-seven articles, governed colour to four decimal
places of contrast ratio, and **contained not one sentence about the screen most of our
students will ever use.** What is not written here does not get built, and what is not
measured here does not get caught.

### §48.1 The primary device is a phone in West Africa

Not a laptop. **`EB §14` already commits this College to "a three-year-old Android phone,
on 3G, on a metered plan" — that student's viewport is 360 CSS pixels wide.** Every design
decision is made for that screen first and adapted upward, and any decision that reads
well at 1440px and fails at 360px is simply wrong, not a trade-off.

**The narrowest supported viewport is 320px.** Below that we do not claim support; at or
above it, everything works.

### §48.2 Five binding rules

1. **A page never scrolls horizontally.** `document.scrollWidth` never exceeds
   `clientWidth` at any supported width, in either language. This is absolute. A page that
   scrolls sideways is broken regardless of how it looks.
2. **Nothing is positioned off the inline axis to hide it.** Not skip links, not drawers,
   not off-canvas panels. An element parked at `-9999px` is still laid out, still
   contributes width, and in RTL still shifts the scroll origin so that Arabic lines are
   clipped at their start. Hide by `display`, or move it off the *block* axis.
3. **Every interactive target is at least 44×44px.** Links, buttons, inputs, the theme
   toggle, the language switch, footer links, table links. Inline links inside running
   prose are the only exception, because they inherit the line box.
4. **No unbreakable string may exceed its container.** Email addresses, certificate
   numbers and URLs carry `overflow-wrap:anywhere`. A 28-character token in a table cell
   is enough to break a page at 320px.
5. **Breakpoints belong to components, not to the site.** A single global "mobile"
   breakpoint means nothing is actually tuned. Each component breaks where *it* breaks.

### §48.3 The rule that would have caught this

> **A stylesheet cannot be checked by reading it.**

Every check that passed while the site was broken was a check on *text*: does this string
appear, does this token exist, does this regex match. Not one opened a viewport. Layout is
an emergent property of the whole document in a real engine at a real width, and the only
valid test of it is to render it and measure.

**Binding:** every release runs `tests/responsive.mjs` — a real browser, at 320, 360, 375,
390, 414 and 768 px, on every page in both languages, asserting §48.2 rules 1, 2 and 3 and
the behaviour of the navigation drawer. A visual claim that is not measured in a renderer
is not a claim this institution makes.

### §48.4 What this article costs

It is slower. The gate takes minutes rather than milliseconds and needs a browser binary.
That is the correct price. The alternative — the one we paid — is a site that reports 1,029
passing checks to its own Founder while being unusable on the device its students hold.

---

## §47. Amendment & Versioning

- **Version scheme:** `MAJOR.MINOR`. MAJOR for changes to Parts I, VI, or VII. MINOR for
  everything else.
- **Every amendment records:** date, article, what changed, who approved, and **why**.
  The reasoning matters more than the change — a future reader must be able to
  reconstruct the argument.
- **Full annual review**, minuted, whether or not anything changes.
- **This document is public** once ratified. An institution that publishes its own
  constitution is holding itself to it in front of the people it serves.

### Amendment log

| Version | Date | Change | Approved by |
|---|---|---|---|
| 0.9 | 6 August 2026 | **The dark theme is no longer imposed, and the light register is what everyone sees.** The Founder reported that the estate was overwhelmingly blue with no cream, ivory or parchment anywhere — while every screenshot I produced showed a warm light page, and said so. **Both accounts were correct.** Playwright defaults to `prefers-color-scheme: light`; the Founder's phone was in dark mode; and §14's auto-dark block mapped all six warm grounds onto navy — `--white:#152549`, `--ivory:#0B1533`, `--parchment:#101D3E`. **Measured, the dark rendering was 99.2% blue.** We had been looking at two different websites for three rounds of review. Three changes. (a) **`prefers-color-scheme` no longer switches the theme.** The light register *is* this College's presentation; dark is an accommodation a reader chooses with the toggle, never a substitution made on their behalf. This also guarantees that what is reviewed is what is served. (b) **The dark theme is rebuilt warm** — six warm dark papers, every one with more red than blue, adjacent surfaces still distinguishable so the band rhythm survives, and the school accents lightened rather than collapsed into one gold. The deep blue bands deliberately do not re-theme; they are the punctuation and are already dark. (c) **The topbar and the footer become light.** They were the two largest blue areas on the estate and together they framed every page in blue regardless of what lay between; the footer is now the colophon of the document, printed on the document's own paper. Blue on the home page fell from 99.2% (dark) / 25.3% (light) to **12.9%**, and on the programmes page to **0.1%**. **A colour gate now measures rendered pixels in all four modes a reader can arrive in** — system-light, system-dark, chose-light, chose-dark — and fails the build if blue exceeds 35% or the warm register falls below 45%. Separately, the hero no longer depends on JavaScript to become visible: `.rv` starts at `opacity:0` and was revealed by an observer from a deferred script, so on the three-year-old Android on 3G that §14 commits us to, the headline, lead and both buttons were blank until the script ran. Above the fold the entrance is now a CSS animation that plays on paint. | Founder (critique and direction); Claude (measurement and execution) |
| 0.8 | 6 August 2026 | **The Mobile Covenant (new §48), and the light register corrected.** Adopted after the Founder reported that the design was failing on mobile and that the estate still read as entirely blue. **Both complaints were verified by measurement before anything was changed, and both were true.** (a) *Mobile.* Every page scrolled 330px sideways at phone width in English and worse in Arabic — 261 overflowing elements on the Arabic home page — and fifteen interactive targets per page sat below 40px. The cause was a navigation drawer parked off-canvas with `transform:translateX(100%)`, which is still laid out, compounded by the absence of `overflow-x:clip` and by a skip link parked at `-9999px` on the inline axis. **None of this was caught because all 1,029 checks were checks on text; not one opened a viewport.** New §48 makes the phone the primary device, sets five binding rules, and requires a real-browser responsive gate on every release. (b) *Colour.* Rendered-pixel measurement showed blue never exceeded 18% of any page — but gold was **0.0–0.1%** and 78% of pixels classified as white, because the "light register" grounds sat at 96–97% lightness and gold existed only as 1px hairlines. Blue was therefore the only colour present, which is precisely what "everything is blue" means. §14 amended: the six grounds are deepened to be genuinely warm, a **gilt ground** is added so gold appears as an area rather than a line, gold is split into a decorative weight and a **text-legal weight** so labels reach AA, and the four schools each receive their own accent colour so they do not read as four blue boxes. Every value was chosen by computing contrast against all six grounds, and all of it is enforced in the build. (c) The reference project (`ahmadsulaimiy1/sultan-`) was re-read for its responsive discipline specifically — 114 media queries in one stylesheet against my twelve, `overflow-x:clip` with its rationale recorded in a comment, and a supporting palette documented as existing so that sections "alternate instead of repeating brown on brown". | Founder (critique and direction); Claude (verification and execution) |
| 0.1 | 2 August 2026 | Initial draft prepared for Founder review | — (pending) |
| 0.7 | 6 August 2026 | **Design system v2 — the light register.** Adopted after the Founder judged the first build's visual design weak, and after studying the SH Royal Schools prestige layer, whose reasoning is quoted in `WEC §1`. **Three corrections, two of which reverse rules I wrote.** (a) §14.2.1: the estate is now predominantly light — four light surfaces alternate for rhythm, deep blue is punctuation at roughly 75/18/7, and the previous strict dark/light alternation is withdrawn as the single largest defect in the first build. (b) §17 radii: the flat 4px cap is withdrawn in favour of **radius by role** — crisp for editorial furniture where a sharp line reads as engraving, softened for anything a hand would pick up, because unrelieved 90° corners read as utilitarian rather than expensive. (c) §17 elevation: flat single shadows replaced by **three stacked blurs plus an inset lit edge**, since one flat shadow reads as a sticker. **Typography extended to a three-role system** — Cormorant Garamond display, Cinzel inscriptional caps for labels and buttons, IBM Plex Sans body; the caps face carries a disproportionate share of the register and was the clearest gap. Spacing scale extended to 200px. **All three are enforced in the build**, not merely written down: light-dominance, token-only elevation, and contrast across every one of the five light grounds. **Separately, on the Founder's instruction, the Abī Sulaimiy figures introduced in v0.6 are removed** — this College publishes its own record only, and the homepage now carries structural facts about its own design rather than a predecessor's history. | Founder (critique and direction); Claude (execution) |
| 0.6 | 6 August 2026 | **Illumination register adopted on the Founder's direction** — a more ceremonial, luxurious experience. §14.2.5 now permits atmospheric *ground* treatment (soft radial illumination and vignette beneath content) while keeping the prohibition on gradients over identity, type and controls absolute and unchanged. §22 rewritten from "state change only" into a three-purpose system — **draw, reveal, respond** — with an explicit fourth category, *decorate*, that does not exist. The two rules that protect users are unchanged: nothing moves that the user did not cause or scroll to, and everything is removed under `prefers-reduced-motion`, which is now verified in the build rather than promised. Counters are permitted only over real, sourced numbers. **Institutional facts unlocked:** the Founder supplied the Abī Sulaimiy College content extraction, which resolves much of D-01 — the group has taught 1,550 students across 22 countries since 22 February 2020 from Lagos. Those figures are now published *attributed to the group*, never to this College, which has admitted no students. Three claims from the predecessor site are **deliberately not carried over**: an unevidenced university affiliation, "certificates recognised by relevant institutions" while D-03 is open, and a policy of omitting online delivery from certificates — the last of which an accreditation reviewer would read as concealment. | Founder (direction); Claude (execution) |
| 0.5 | 2 August 2026 | **Palette changed to blue and gold on the Founder's direction.** §14 rewritten: lapis lazuli (لازورد) as the primary ground, illumination gold as the accent, turquoise (فيروزي) as the permitted third colour, carnelian retained for signal only. The blue is anchored in the pigment of Qur'anic illumination rather than chosen as a corporate default. **New §14.1a states the WEC-LC proximity plainly** rather than pretending it away — blue and gold moves us toward a palette the Preamble rejected, so distinctness is now engineered: hue 226 ultramarine against their 220 grey-navy, markedly higher chroma, turquoise instead of oxblood as the third colour, blue-black ink, and gold restricted to hairline and mark with gradients forbidden where they use one. The gold hue cannot meaningfully move; that is stated rather than disguised. **§14.3 replaced with computed ratios** — the previous version asserted targets that nothing enforced. Contrast is now calculated from the shipped CSS on every build, and the first run found a state colour at 4.47 against a 4.5 requirement, which no document review would have caught. | Founder (direction); Claude (execution) |
| 0.4 | 2 August 2026 | **Ratified and in force.** Amended by Phase 4's adversarial peer review, which found a historical error in this Bible's own type system: **Aref Ruqaa was specified as the ceremonial Arabic face, but ruqʿah is historically an administrative and rapid-handwriting script, not a ceremonial one.** It was specified because it was one of the few high-quality free display Arabic faces — availability masquerading as suitability. Removed entirely from §15.2 and Appendix A; ceremonial typesetting is now Amiri and ceremonial lettering is commissioned thuluth. Separately, *Kitab*'s licence could not be verified, so Amiri with full tashkīl becomes the specified teaching face and no unverified face ships. A rule is added that **any element containing tashkīl uses the teaching face wherever it sits**, closing a gap where vocalised Arabic inside LMS chrome had no specified face at all. | Founder (ratification); Claude (amendments, executive autonomy) |
| 0.3 | 2 August 2026 | **D-02 decided under executive autonomy** — institutional name set to *Al-Madinah International College of Arabic and Qur'anic Studies* after a 36-candidate weighted matrix, four-scenario sensitivity analysis, and a propriety veto gate (`NS`). The name as briefed ranked 30th of 36; the adopted construction ranks 4th. Three candidates outscored it; all three were vetoed on propriety or trademark grounds. §8.1 rewritten. **D-12 decided** — *Sulaimiy Education Group* (confidence Medium), light-touch endorsement; §8.3 updated. **New §8.4** codifies the propriety veto gate as a permanent rule binding every future name — it caught two failures the matrix scored as winners. **New §8.5** reconciles the Madinah name with §31's ban on borrowed authority and mandates a public non-affiliation statement. **Phase 1 peer review remediations:** §5.7 — the AI may retrieve but never generate Qur'anic or hadith text, enforced in code (finding S-3); §33.2a — notional learning hours recorded alongside mastery gates, without which the institution is un-accreditable (finding A-1); §29 — the teacher-pay commitment's cross-subsidy made explicit, quantified in Phase 8, and published (finding F-1, an otherwise unfunded promise); §32.3 — dangling reference corrected into a forward commitment (finding Z-2). | Claude (executive autonomy); Bible as a whole still pending |
| 0.2 | 2 August 2026 | **D-01 ruled (umbrella group).** §8.3 rewritten from a standalone branded house to a group architecture with Al-Madinah as tertiary arm; §46.3 extended to hold group facts to the same evidential standard, since the ruling settles structure but supplies no facts. **D-04 ruled (no ijāzah).** §34.7 rewritten from an open question to settled policy; §36 restructured into principles, a four-award ladder, and the conditions under which ijāzah could ever be issued. **D-10 ruled (disclosed regional pricing).** §38 rewritten from a recommendation-against-the-brief into settled policy: band set by declared residence and verified at payment, IP demoted to a display hint, currency separated from band as an independent axis, price locked for the duration of an enrolled programme. Reasoning retained — it is now the public methodology argument. **New:** D-12 (group identity and naming) raised as a consequence of D-01; French localisation flagged for earlier phasing as a consequence of Bands D–E naming Francophone markets. **Unresolved:** "Arabic Language Diploma" recorded as Founder intent but gated on D-03, as "diploma" is a regulated term. | Founder (D-01, D-04, D-10); Bible as a whole still pending |

---

# APPENDIX A — Design Tokens (draft)

```css
:root {
  /* ---- Ground: lapis lazuli (lazaward) ---- */
  --lazaward-deep: #0D1A45;
  --lazaward:      #1A3280;
  --lazaward-mid:  #2E58B0;
  --lazaward-soft: #6C93D6;

  /* ---- Paper ---- */
  --jiss:          #F3F1EA;
  --waraq:         #FBF9F5;
  --waraq-warm:    #F7F3E9;

  /* ---- Gold (dhahab) — a line, never a plane ---- */
  --dhahab:        #A8822A;
  --dhahab-light:  #E0C784;

  /* ---- The touch of other colour ---- */
  --firuzi:        #176B78;
  --firuzi-light:  #6CC5D2;
  --aqiq:          #9A3324;

  /* ---- Ink: blue-black ---- */
  --hibr:          #131A26;
  --hibr-soft:     #4A5464;
  --hibr-faint:    #79828F;
  --khatt:         rgba(168,130,42,.32);
  --khatt-dark:    rgba(224,199,132,.22);

  /* ---- State ---- */
  --ok:            #256D4E;
  --wip:           #856618;
  --attn:          #9A3324;
  --info:          #176B78;

  /* ---- Type ---- */
  --font-display:    'Source Serif 4', Georgia, serif;
  --font-body:       'IBM Plex Sans', system-ui, sans-serif;
  --font-mono:       'IBM Plex Mono', ui-monospace, monospace;
  --font-ar-body:    'IBM Plex Sans Arabic', 'Noto Naskh Arabic', sans-serif;
  --font-ar-display: 'Amiri', 'Noto Naskh Arabic', serif;
  --font-ar-teach:   'Amiri', serif;               /* vocalised teaching text */
  --font-mushaf:     'KFGQPC Uthmanic Script HAFS', 'Amiri Quran', serif;
  --font-ceremonial: 'Amiri', serif;               /* ≥24px only; no ruqʿah */

  /* ---- Space (8px base) ---- */
  --sp-1: 4px;  --sp-2: 8px;   --sp-3: 12px;  --sp-4: 16px;
  --sp-5: 24px; --sp-6: 32px;  --sp-7: 48px;  --sp-8: 64px;
  --sp-9: 96px; --sp-10: 128px; --sp-11: 160px;

  /* ---- Radius ---- */
  --r-sm: 2px; --r-md: 4px; --r-pill: 999px;

  /* ---- Elevation ---- */
  --shadow-rest:  0 2px 10px -4px rgba(16,28,24,.16);
  --shadow-hover: 0 14px 32px -14px rgba(16,28,24,.26);
  --shadow-float: 0 20px 60px -20px rgba(16,28,24,.34);

  /* ---- Motion ---- */
  --ease:      cubic-bezier(.16,.84,.44,1);
  --dur-micro: 180ms;
  --dur-std:   340ms;
  --dur-enter: 600ms;

  /* ---- Layout ---- */
  --wrap:    1180px;
  --measure: 720px;
}

/* Binding global rules from §15.3 */
* { font-synthesis: none; }
[lang="ar"], [dir="rtl"] { letter-spacing: normal !important; }
[lang="ar"] [style*="text-transform"], [lang="ar"] .u-caps { text-transform: none; }
```

*Contrast ratios in §14.3 are computed targets and must be re-verified with an automated
checker in Phase 6 before any of these values are considered final.*

---

# APPENDIX B — Transliteration Standard

Simplified IJMES. Applied everywhere, including student-facing copy.

| Arabic | Latin | | Arabic | Latin |
|---|---|---|---|---|
| ء | ʾ | | ض | ḍ |
| ث | th | | ط | ṭ |
| ج | j | | ظ | ẓ |
| ح | ḥ | | ع | ʿ |
| خ | kh | | غ | gh |
| ذ | dh | | ق | q |
| ش | sh | | ة | -ah / -at (construct) |
| ص | ṣ | | ال | al- (assimilated: ash-shams) |

Long vowels: ā, ī, ū. Diphthongs: ay, aw.

**House exceptions** — these keep their conventional English spellings and take no
diacritics: Qur'an, Islam, Muslim, Madinah, Makkah, Ramadan, Hajj, Sunnah, Hadith,
Sharia, Imam, Shaykh, Allah.

Diacritics are used in academic and curriculum material; simplified forms are acceptable
in marketing headlines where diacritics would be visually disruptive — but never
inconsistently within one document.

---

# APPENDIX C — Open Executive Decisions

Full detail, options, and recommendations in **`docs/decision-register.md`**. Summary:

| ID | Decision | Status | Blocks |
|---|---|---|---|
| D-01 | Relationship to Abī Sulaimiy College and SH Royal Schools | ✅ **Closed — Option D, umbrella group** | — (group *facts* still needed, §8.3) |
| D-02 | Name collision with Al-Madinah International University (MEDIU) | ✅ **Closed — name decided (§8.1)** | — Phase 4 unblocked |
| D-03 | Legal use of "College" and award nomenclature per jurisdiction | 🔴 Open | Phases 3, 7 — now also gates "Diploma" (§36.2) |
| D-04 | Do we issue ijāzah? | ✅ **Closed — no ijāzah; four-award ladder** | — |
| D-05 | Published statement of academic method / madhhab positioning | 🟡 Open | Phase 2 |
| D-06 | Riwāyah taught and displayed (Ḥafṣ assumed) | 🟡 Open | Phase 3 |
| D-07 | Mixed-gender imagery and class policy | 🟡 Open | Phase 4 |
| D-08 | Typeface licensing, esp. KFGQPC | 🟢 Open | Phase 6 |
| D-09 | Free trial lesson — offered, and at what cost | 🟡 Open | Phase 7 |
| D-10 | Regional pricing: disclosed or undisclosed (§38) | ✅ **Closed — disclosed** | — |
| D-11 | Do we accept zakāt? | 🟢 Open | Phase 8 |
| D-12 | Group identity, naming, and endorsement model | ✅ **Closed — Sulaimiy Education Group (§8.3)** | — |
| **A-1** | **Notional learning hours / credit framework** (peer review) | 🔴 **Critical** — partially fixed §33.2a | Phase 3 |
| **C-1** | **Data residency and lawful cross-border transfer** (peer review) | 🔴 **Critical** | Phase 9 — before any real student data |

---

*End of Editorial Bible v0.1 — DRAFT FOR APPROVAL.*
*Prepared 2 August 2026. Not in force until ratified.*
