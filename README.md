# كلية المدينة الدولية للغة العربية وعلوم القرآن
# Al-Madinah International College of Arabic and Qur'anic Studies

*A member of Sulaimiy Education Group*

Institutional design and build repository.

### ▶ Live preview — https://almadinah-college.vercel.app

| | |
|---|---|
| **English** | [`/`](https://almadinah-college.vercel.app/) · [about](https://almadinah-college.vercel.app/about/) · [programmes](https://almadinah-college.vercel.app/programmes/) · [admissions](https://almadinah-college.vercel.app/admissions/) · [fees](https://almadinah-college.vercel.app/fees/) · [contact](https://almadinah-college.vercel.app/contact/) · [sign in](https://almadinah-college.vercel.app/signin/) · [portal](https://almadinah-college.vercel.app/portal/) · [verify](https://almadinah-college.vercel.app/verify/) |
| **العربية** | [`/ar/`](https://almadinah-college.vercel.app/ar/) — complete mirror at every path |

20 pages · 749 build checks, run in CI on every deploy · self-hosted fonts, no CDN
dependency · dark and light themes · full RTL.

**Editorial Bible RATIFIED and IN FORCE (v0.4). Building continuously — deploy, review,
improve, repeat.**

**Architecture: 28 named systems → 3 experiences + 1 public utility.** Public Website ·
Campus Portal (one adaptive system, not many portals) · Executive Console · Verification
Register.

**Closed:** D-01 (umbrella group) · D-02 (institutional name) · D-04 (no ijāzah;
four-award ladder) · D-10 (disclosed regional pricing) · D-12 (group architecture).

**Critical and open — all three from the Phase 1 peer review or its knock-ons:**
**A-1** (no credit framework — the institution is un-accreditable as drafted) ·
**C-1** (no data-residency position — unlawful processing in two named markets) ·
**D-03** (award nomenclature — now gates an approved award).

---

## What is here

| Document | What it is |
|---|---|
| [`docs/00-editorial-bible.md`](docs/00-editorial-bible.md) | **The constitution.** 47 articles governing identity, Islamic standards, voice, design system, experience, academic doctrine, pricing, strategy, and governance. Cited as `EB §n`. |
| [`docs/decision-register.md`](docs/decision-register.md) | The decision log — 5 closed, 9 open, each with options, reasoning, and a confidence level. Carries the executive autonomy protocol. Cited as `D-nn`. |
| [`docs/01-naming-and-brand-architecture-study.md`](docs/01-naming-and-brand-architecture-study.md) | **The naming study.** 36 candidates, 11 weighted criteria, four-scenario sensitivity analysis, a propriety veto gate, trademark/SEO/domain strategy, and the parent group architecture. Closes D-02 and D-12. Cited as `NS §n`. |
| [`docs/02-phase-1-peer-review.md`](docs/02-phase-1-peer-review.md) | **Adversarial self-review** of Phase 1 by nine simulated panels. 26 findings — 2 critical, 11 high. Six fixed in place; twenty registered with an owning phase. |
| [`docs/03-institutional-identity-system.md`](docs/03-institutional-identity-system.md) | **The identity system.** 60 articles: benchmark study of why identities endure, symbol philosophy, the nuqṭah/alif system, five logo registers, five seals, six-layer certificate authentication, typography, colour, pattern, motion, every application, production specs, governance, and a register of everything rejected with reasons. Cited as `IS §n`. |
| [`docs/04-phase-4-peer-review.md`](docs/04-phase-4-peer-review.md) | **Adversarial review** of the identity system by ten panels. 28 findings — including three internal contradictions in the system itself. Eleven fixed; seventeen owned. |
| [`docs/05-information-architecture.md`](docs/05-information-architecture.md) | **The information architecture.** The 100-Year Test operationalised; the absorption map showing where all 28 named systems land; the public site; the relationship model that replaces role-based portals; stakeholders, journeys, friction, longevity. Cited as `IA §n`. |
| [`docs/06-future-considerations-register.md`](docs/06-future-considerations-register.md) | **Permanent.** 22 valuable-but-premature ideas, each with the trigger that would revive it — plus items rejected on principle, which have no trigger. Cited as `F-nn`. |
| [`docs/07-phase-5-peer-review.md`](docs/07-phase-5-peer-review.md) | **Adversarial review** of the architecture. 24 findings — including a direct contradiction between two ratified documents. Twelve fixed; twelve owned. |

The Editorial Bible is in force. Every downstream decision is bound by it (`EB §Preamble`).

---

## The ten phases

| Phase | Deliverable | Status |
|---|---|---|
| 1 | **Editorial Bible** | ✅ **Ratified** — v0.4, in force |
| 2 | Institutional Strategy | ~~D-01~~ closed; needs D-05 and the group *facts* (`EB §8.3`) |
| 3 | Academic Framework | ~~D-04~~ closed; blocked on D-03, D-06, and **A-1** (credit framework) |
| 4 | Brand Identity System | ✅ **Complete** — v1.1, peer-reviewed. Two production gates before assets are made |
| 5 | Website Information Architecture | ✅ **Complete** — v1.1, peer-reviewed |
| 6 | UI/UX Design System | ◐ **Implemented in code** — `src/brand.css`. Documentation follows the build |
| 7 | Admissions & Student Experience | Blocked on D-03, D-07, D-09 |
| 8 | Pricing & Financial Model | ~~D-10~~ closed; blocked on D-11. Carry French localisation cost (`EB §38.3`) |
| 9 | Technology Architecture | Blocked on **C-1** (data residency) before any real student data |
| 10 | Implementation Roadmap | — |

Each phase is reviewed against `EB §45`'s five quality gates before the next begins.

---

## Development workflow

```
npm run build     # fetch fonts if absent, generate dist/
npm test          # build + 749 checks
npm run dev       # build + serve dist/ at :8000
```

**Deployment.** Vercel builds from this branch and **runs the full test suite as part of
the build** — a failing check fails the deploy rather than shipping quietly.

**Build milestones.** Each ships stable, with unfinished areas carrying an honest status
rather than a broken control:

| # | Milestone | State |
|---|---|---|
| 1 | Public site · portal structure · bilingual · design system | ✅ Deployed |
| 2 | Placement assessment · application form | Next |
| 3 | Study surface — lesson, recitation, revision, assessment | — |
| 4 | People · relationship model | — |
| 5 | Library | — |
| 6 | Money · Help | — |

---

## Research basis

| Source | Outcome |
|---|---|
| `ahmadsulaimiy1/Al-Madeenahcollege` | Empty repository — greenfield |
| `ahmadsulaimiy1/worldwencollege` (WEC-LC) | **Read in full** — 215 files; the primary precedent. Its honesty discipline, config-driven commercial policy, provider-agnostic payments, and anti-template design motifs are inherited. Its palette, typefaces, English-first architecture, and fixed-duration model are deliberately rejected — see `EB §Preamble`. |
| `ahmadsulaimiy1/shroyalschools` | 17 photographs, no site code |
| `ahmadsulaimiy1/sultan-arabic` | Empty repository |
| `shroyalschools.com` | **Not readable** — network gateway returned 403 |
| `abisulaimiycollege.com.ng` | **Not readable** — same block; no substantive web record found |

The last two gaps are disclosed rather than guessed at, per `EB §46`, and are the reason
D-01 exists.

---

## The five rules that govern everything downstream

1. **No invented institutional facts.** Where something is not yet true, we publish that
   it is not yet true, in the same voice as everything else. (`EB §46`)
2. **Arabic is not a translation.** Arabic and English are authored in parallel; neither
   is derived from the other. (`EB §26`)
3. **Mastery, not the calendar, decides progress.** (`EB §33`)
4. **Institution before website.** Every decision answers: *would this still be correct if
   this institution existed for one hundred years?* (`IA §2`)
5. **Less, but better.** Three experiences. Every page and feature justifies its existence
   or does not exist. (`IA §1`)

---

## What the Founder needs to do next

Five things only you can supply. **None of them blocks Phase 6** — work continues under the
executive autonomy protocol, on recorded assumptions.

| # | Needed | Unblocks |
|---|---|---|
| 1 | **The group facts** — legal structure, registered name, each member's registration standing, real student and staff numbers with an `as of` date, which faculty and premises transfer | Retires most of `EB §46.3`. **The seal cannot be finalised without the registration date** (`IS §19`) |
| 2 | **D-03 legal opinion** — award nomenclature in Nigeria, the UK, the EU **and now US state level**, since "college" under-signals in Britain and over-signals in America | Phase 3 award names; the approved "Arabic Language Diploma" |
| 3 | **D-05 Statement of Academic Method** — must come from you and named scholars, not from me | Phase 2 |
| 4 | **A qualified scholar** for two Phase 4 findings: whether the dotting system may serve as an institutional device, and D-06's riwāyah | The calligraphy commission |
| 5 | **D-07** mixed-gender policy · **D-11** zakāt | Phase 4 photography; Phase 8 |

Two production gates are open and are operational, not decisions: **domain availability**
(unverifiable here — no DNS or whois) and **physical Pantone verification** (`IS §31`,
blocking before any print run).
