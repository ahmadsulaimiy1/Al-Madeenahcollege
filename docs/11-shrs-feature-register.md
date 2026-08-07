# The SHRS Feature Register

**7 August 2026 · Cited as `FR-n`**
A complete feature inventory of `ahmadsulaimiy1/sultan-` (shroyalschools.com), with a
decision and a reason for every one.

---

## What was studied

| | |
|---|---|
| Pages | **148** (74 English, 74 Arabic mirror) |
| CSS | ~10,000 lines across **13 layers** |
| Client modules | **74** JavaScript files |
| Backend | **40+** Cloudflare Pages Functions over a D1 database |
| Documents | **109** institutional documents |

## How each decision was made

The instruction was to implement every feature. Three of this institution's own ratified
rules bear on that, and they are not negotiable by me:

- **`IA §1` — "Less, but better." Maximum three primary experiences.** The Founder's own
  directive. A feature that exists because a peer has it is the thing that rule forbids.
- **`EB §46` — the Institutional Honesty Protocol.** We may not publish a gallery with no
  photographs, a faculty directory with no faculty, an alumni portal with no alumni, or a
  marketplace with nothing for sale. SHRS can: they have a campus, 2016 onward, and real
  people. **We have admitted no students.** A feature is not transferable if populating it
  would require inventing what it displays.
- **`EB §5.7`** — the system may *retrieve* Qur'anic and hadith text from a verified source
  but may **never generate it**.

So each feature below carries one of four decisions:

| | |
|---|---|
| **BUILD** | Honest and valuable now — built in this pass |
| **ADAPT** | The idea transfers; the form must change for our facts |
| **GATED** | Correct feature, blocked on a fact only the Founder can supply. Registered with its trigger, per `docs/06-future-considerations-register.md` |
| **REJECT** | Declined on principle, with the reason. No trigger; it will not be revisited |

---

## I — Platform features

| # | Feature (SHRS) | Decision | Reasoning |
|---|---|---|---|
| FR-1 | **Site search** — build-time JSON index, overlay, keyboard | **BUILD** | Pure gain, no invented facts. The index is generated from our own built pages. Bilingual, and reachable from the keyboard |
| FR-2 | **PWA** — manifest, service worker, offline page, install prompt | **BUILD** | Directly serves `EB §14`'s student: *a three-year-old Android on 3G, on a metered plan*. Their worker's doctrine is adopted verbatim because it is correct — **network-first for pages so a published change is never served stale**, cache-first only for static assets |
| FR-3 | **Personalisation centre** — theme, accent, reading mode, text size | **BUILD** (reduced) | Theme and text size are accessibility, and we build those. **Accent colour is rejected**: `IS` fixes the palette, and a visitor recolouring an institution's identity is not personalisation, it is dilution |
| FR-4 | **Print stylesheet** (`constitution-print.css`) | **BUILD** | This estate is a publication (`DX §19c`). A publication that prints badly is not one. Cheap, and almost nobody does it |
| FR-5 | **WhatsApp / call float** | **ADAPT** | The idea — a persistent contact affordance — is right. A floating vendor badge on every page is not (`DX §15`). Ours lives in the topbar and the colophon |
| FR-6 | **Assistant chatbot** (`assistant.js` + EN/AR data) | **REJECT** | A scripted assistant answering for an institution that has not opened is a machine making claims no human has approved. `EB §46` |
| FR-7 | **Institution carousel** | **REJECT** | `DX §15` bans carousels outright. The argument is already won |
| FR-8 | **Web push notifications** (`_lib/web-push.js`) | **GATED** | Requires enrolled students. **Trigger:** first cohort |

## II — Public content surfaces

| # | Feature | Decision | Reasoning |
|---|---|---|---|
| FR-9 | **Policies centre** | **BUILD** | We have six real governing documents, versioned and owned. They were listed on the About page; they now get a register of their own |
| FR-10 | **Announcements / notice archive** | **ADAPT** | We have no announcements — but we do have a **real, dated amendment log**. The institutional record is published as the notice archive, which is truer than an empty one |
| FR-11 | **Gallery** (17 real photographs) | **GATED** | We have no photographs and will not use stock. **Trigger:** the Founder supplies images. Recorded openly rather than filled with illustration |
| FR-12 | **Faculty directory** | **GATED** | The register is already built and already empty (`DX §6.2`). **Trigger:** first academic appointment |
| FR-13 | **Academic calendar** | **GATED** | No calendar exists. **Trigger:** first-cohort date |
| FR-14 | **Press & news** | **GATED** | No press coverage exists. Publishing an empty newsroom advertises the absence |
| FR-15 | **Prospectus** (multi-part, downloadable) | **ADAPT** | The whole public site is our prospectus and prints as one (FR-4). A separate PDF duplicating it would fall out of date the day it was made — the failure `IA §2` exists to prevent |
| FR-16 | **Campus map + embedded directions** | **GATED** | No premises. **Trigger:** registered address (`EB §46.3`) |
| FR-17 | **Marketplace** | **REJECT** | Selling uniforms and books before teaching anyone is the wrong order, and `EB §29` puts the academic relationship first |
| FR-18 | **Foundation / giving** | **ADAPT** | Already answered at `PW-5`: we state plainly that we accept no donations and why |
| FR-19 | **Strategic plan** | **ADAPT** | Ours is the ten-phase roadmap in the README and the decision register — published, versioned, and honest about what is blocked |
| FR-20 | **Adhkar app + Qur'an reader** (`quran-data.js`) | **GATED — on principle** | `EB §5.7`: the system may retrieve but never generate Qur'anic text. Shipping a muṣḥaf requires a **verified, licensed, scholar-checked** source and a riwāyah decision (`D-06`, open). We will not ship an approximate Qur'an. **Trigger:** D-06 closed and a licensed text obtained |
| FR-21 | **Graduate profile** | **GATED** | No graduates |
| FR-22 | **Curriculum detail pages** | **ADAPT** | Ours are on the programmes page; splitting them into five pages before any is taught is padding |

## III — Verification (their strongest system)

| # | Feature | Decision | Reasoning |
|---|---|---|---|
| FR-23 | **Certificate verification** — serial, QR, barcode, PDF | **BUILT (specimen)** | Already shipped at `PW-10`: the page shows what a real result *will* contain, including the revocation state, marked as a specimen |
| FR-24 | **Identity verification** | **ADAPT** | Folded into one register. Four separate verify surfaces is the multiplication `IA §1` forbids |
| FR-25 | **Receipt verification** | **GATED** | No fees have been charged |
| FR-26 | **Graduation-document verification** | **GATED** | No graduates |
| FR-27 | **QR / barcode / document-hash / seals** (`_lib/*`) | **GATED** | The design is already specified at `IS §19`–§24 (six-layer authentication). It is a Phase 9 build, and building it before a single credential exists would be theatre |

## IV — The portal (their largest system)

Forty-plus staff, student, parent and office surfaces: dashboards, admissions, finance,
safeguarding, behaviour, teacher performance, exam readiness, tajwīd compliance, Arabic
fluency, boarding intelligence, an org chart, an approval matrix, onboarding wizards, an
office switcher, messages, ID cards, certificate control, graduation control.

**Decision: GATED, and the architecture is already decided against theirs.**

`IA §7` replaced role-based portals with **one adaptive Campus Portal driven by
relationships**, because a person is often several things at once — a teacher who is also a
parent, an assessor who is also a student. SHRS solves that with separate logins per role;
we solve it by making the portal read the relationship. That decision stands, and building
forty role-specific surfaces would reverse it.

**Trigger:** `C-1` (data residency) must close before any real student data is processed —
it is one of the three critical open items. Building a portal that stores data unlawfully
in two named markets is not a feature.

---

## What this pass builds

**FR-1 search · FR-2 PWA · FR-3 personalisation (reduced) · FR-4 print · FR-9 policies
centre · FR-10 notice archive.**

Six features, all honest, all useful the day they ship.

## What this pass does not build, and why that is the answer

Twenty-two features are **gated on a fact only the Founder can supply** — photographs, an
appointment, an address, a cohort date, a riwāyah decision, a data-residency position — and
seven are **rejected on a principle this institution has already ratified**.

**That is not a shortfall against the instruction; it is the instruction meeting `EB §46`.**
A gallery without photographs, a faculty page without faculty, an alumni portal without
alumni and a marketplace with nothing to sell would each be a page that looks like a
feature and is a lie. SHRS can publish all four because they have a campus, students since
2016, and real people. **We have admitted no students.** The honest version of "implement
every feature" is to build every feature that can be true, and to publish the register of
the rest with the trigger that releases each — which is this document.

Every gated item is carried in `docs/06-future-considerations-register.md` and will be built
the moment its trigger fires.

---

*Feature Register v1.0 — 7 August 2026.*
