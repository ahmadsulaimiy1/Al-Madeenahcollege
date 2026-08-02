# WEC-LC Engineering Study

**Version 1.0 · 2 August 2026 · Cited as `WEC §n`**

A technical read of `ahmadsulaimiy1/worldwencollege` @ `4642ddc` — **systems only**: colour
architecture, build structure, LMS data model, portal pattern, backend engineering.
Content, curriculum and copy are deliberately out of scope.

Read: `css/brand.css` (594), `css/dashboard.css` (314), `scripts/build.js` (115),
`js/site.js` (420), `js/portal-guard.js` (81), `sql/schema.sql` (505), 50 files under
`functions/`, and the architecture documents for the dashboard, LMS and auth layers.

**Purpose.** Record what we inherit, what we reject and why, and — most valuable — the
backend patterns that should be reached for at Phase 9 rather than re-derived. WEC-LC's
authors solved several problems correctly. Solving them again from scratch would be waste.

---

## §1. Colour architecture — the pattern, not the palette

### 1.1 What they did

Two CSS layers. `brand.css` declares the institutional tokens; `dashboard.css` **extends**
them rather than declaring its own:

```css
/* dashboard.css */
--status-good:      #3F6B52;
--status-good-soft: #E4EDE4;      /* tint, for pill backgrounds */
--status-progress:  var(--gold);  /* ← derived, not independent */
--surface:          var(--paper); /* ← derived */
--app-sidebar-w:    248px;
```

**`--status-progress: var(--gold)` is the whole idea.** The authenticated UI has no palette
of its own. It borrows the institution's. That single line is why their portal reads as the
same institution as their marketing site rather than as a different product bolted on — the
most common failure in institutional web estates.

Their own document states the goal plainly: *"so a Faculty gradebook or an Executive
dashboard chart reads as the same institution on sight, not a different product."*

### 1.2 What we inherit

**The derivation discipline, adopted.** Our `src/brand.css` already does this — one
`:root`, semantic tokens (`--bg`, `--fg`, `--rule`, `--accent`) remapped wholesale for dark
mode, and the portal shell drawing from the same tokens as the public site. We went further
in one respect: WEC has no dark theme at all, so their tokens are single-valued.

**Their status-tint pattern is worth taking when we build data-dense screens.** A pill
needs a background tint that is unmistakably derived from its foreground colour. We
currently use outline-only pills (`IS §33.2` — never colour alone, so ours carry a rotated
square marker plus a label). When the Console arrives with dense tables, tinted fills will
be needed and `--state-*-soft` companions should be added by the same derivation rule.

### 1.3 What we reject, and why

| WEC | Our position |
|---|---|
| Royal Blue `#14264A` / Gold `#C7A24A` / Oxblood `#A32638` | **Position revised.** The Founder has directed a blue-and-gold palette, which moves us toward this rather than away. `EB §14.1a` now states the proximity plainly and engineers distinctness instead: hue 226 ultramarine vs their 220 grey-navy at markedly higher chroma, turquoise rather than oxblood as the third colour, blue-black ink, and gold restricted to hairline and mark. **The structural rejections below stand unchanged and now carry more of the differentiation.** |
| `--gold-gradient` on progress meters and the active-nav accent bar | `IS §17.1` — the mark and the system are monochrome-first. **The only permitted gradient is a ≤4% luminance shift to prevent banding on large dark fills** |
| `border-radius: 6–10px` on panels, tiles, nav items | `IS §17` caps radii at 4px. Above ~8px reads as consumer software, not as an institution |
| `box-shadow` on every panel, tile and card, with hover lift | `EB §7.4` — our structural language is the hairline rule. Cards are defined by rules and ground changes before elevation |
| Google Fonts CDN, per-language family list | We self-host with `unicode-range`, which achieves their optimisation (English pages never download Arabic families) with no vendor dependency (`IA §19` Q4) |

**On the last row, credit where due:** their `fontsUrlFor(lang)` deliberately omits Amiri
and Cairo from English pages, with a comment explaining that weight 500 was dropped after
grepping the codebase to confirm nothing used it. That is careful engineering. Our
`unicode-range` approach reaches the same outcome structurally rather than by manual
curation, which is why it survives someone adding an Arabic string to an English page.

---

## §2. Build structure — near-identical, and one place they were right and I was wrong

### 2.1 Convergence

Their `scripts/build.js` and our `scripts/build.mjs` are the same architecture, arrived at
independently: `partials/` + `pages/` + `manifest.json` → assembled documents, zero
dependencies, Node built-ins only. Both treat content as **files in the repository**, which
is `IA §19`'s Q4 requirement.

Both hit the same subtle bug and solved it differently: a `$` in page copy corrupts
`String.replace` output via `$&` substitution. They use `split().join()`; we pass a
function replacer. Both correct.

### 2.2 One improvement worth taking

Their `partialFor(name, lang)` falls back automatically:

```js
function partialFor(name, lang) {
  const arPath = path.join(PARTIALS, `${name}.ar.html`);
  if (lang === 'ar' && fs.existsSync(arPath)) return read(arPath);
  return read(path.join(PARTIALS, `${name}.html`));
}
```

Ours enumerates every partial explicitly as `header`/`headerAr` pairs. Theirs scales
without editing the build when a new partial is added, and degrades to the English partial
if an Arabic one does not exist yet. **Adopted** — see the commit accompanying this study.

### 2.3 The finding about my own work

**Their hreflang logic was correct. Mine regressed from it and shipped broken.**

```js
/* WEC scripts/build.js — correct */
const hreflangEn = lang === 'en' ? canonical : altUrl;
const hreflangAr = lang === 'ar' ? canonical : altUrl;
```

I built the same feature by hardcoding `hreflang="en"` to the page's own canonical, which
is right on English pages and inverts the pair on every Arabic page. It reached production
and was caught by fetching the live site, not by 669 passing tests.

The precedent I had already read contained the correct implementation. I did not consult it
at the point of building the equivalent. **The operational lesson is narrow and worth
recording: when re-implementing something the precedent already solved, read their solution
before writing, not after debugging.** Their build script also emits `og:locale` and
`og:site_name` per language, which ours still does not.

---

## §3. The portal pattern — take the shell, reject the premise

### 3.1 What they built

`js/portal-guard.js` — an 81-line shared auth shell:

```js
window.WEC_LC_guardPortal({
  signOutRedirect: '/',
  onAuthenticated: function (clerk, done) { /* only this is portal-specific */ }
});
```

Gate, redirect, sign-out wiring and the loading state come free. A new portal's script is
*only* its data loading. They proved it generalises by building a second instance — the
Finance dashboard — against the same shell.

**Two details in that file are genuinely excellent and should be copied verbatim in spirit:**

1. **`shell.inert = true` while the gate is up.** A full-page visual overlay does not stop
   `Tab` moving focus into the content behind it. `inert` removes the shell from both the
   tab order and the accessibility tree. Most implementations of this pattern get it wrong;
   theirs has a comment explaining exactly why.
2. **`return false` when no auth key is configured.** With no key the page stays exactly the
   static preview it shipped as. There is no fake login form, and the real portal
   *activates* the moment a key exists rather than being a separate build. This is the same
   honesty discipline as `EB §46`, expressed in code.

### 3.2 Where we deliberately diverge

Their pattern exists to make it cheap to build **N portals** — Student, Faculty,
Administration, Executive, Corporate, Alumni. Their own document lists all six.

`IA §6` rejects that premise: portals proliferate because institutions model *roles* as
*systems*. We model people as people holding **relationships**, and one portal composes
them.

So: **take the shell, reject the multiplication.** Concretely —

| Take | Reject |
|---|---|
| The guard/gate/sign-out abstraction | Six instances of it |
| `inert` on the shell during auth | — |
| Ships-static-until-a-key-exists | — |
| Role-gating as opt-in per surface | Role as the thing that *selects* the portal |
| Pure data-loading as the only per-surface code | — |

Their model would give a teacher whose daughter studies here two logins and two habits.
Ours gives her one.

---

## §4. The LMS data model — the strongest thing in the repository

### 4.1 Entity shape

```
Course (1 per level) → Unit (ordered) → LearningItem (polymorphic)
                                          kind ∈ reading | video | quiz
                                                | assignment | live_session
```

`learning_items.body` is kind-dependent (reading → the text; video → a URL; assignment →
instructions), with quizzes and live sessions carrying their real data in their own tables
joined by `learning_item_id`.

**This is very close to what `IA §11` independently specified for Study** — four object
types (lesson, recitation, revision item, assessment) and no more. Theirs is five. The
convergence is not coincidence: a small closed set of content types is what keeps a study
surface from becoming a dashboard.

### 4.2 Three decisions worth adopting outright

**a) `unit_progress` is a materialised table, not a computed view.**

> *"avoids recomputing 'is this unit done' from quiz/assignment rows on every dashboard
> load."*

One row per `(user, unit)` with a `UNIQUE` constraint, written by the same code path that
records an attempt. Correct: the dashboard is the hottest read path in any LMS, and
recomputing completion from attempt history on every load is the classic way these systems
get slow at exactly the moment they get popular.

**For us this matters more, not less.** Our progression is mastery-gated with retention
re-testing (`EB §34.2`) — "is this portion still held?" is a *more* expensive computation
than "is this unit done", and it is on the same hot path.

**b) LMS access is derived from enrolment, never from a separate list.**

> *"a student's LMS access is a direct, real consequence of what they've actually paid for
> and completed — never a second, separately-maintained access list that could drift out of
> sync with billing."*

`assertLevelAccess()` checks for an `active` or `completed` enrolment row on every read
*and* write path. **This is the same principle as our relationship-based access control
(`IA §12.2`)**, reached from the billing side rather than the privacy side. Two independent
routes to one rule is a good sign the rule is right.

**c) The buy-vs-build line is drawn correctly.**

| Bought | Built |
|---|---|
| Live classes — `live_sessions.join_url` to Zoom/Meet/Teams, not custom WebRTC | The progression model tying completion to unlocking |
| Video hosting — Cloudflare Stream, not a transcoding pipeline | The assessment data model |
| Auth — Clerk behind a provider interface | Competency tracking specific to the programme structure |

Their reasoning transfers directly: *"a bespoke video-conferencing system is a different,
extremely deep engineering problem than an LMS."* **Our equivalent line:** the *itqān*
model, the retention-scheduled revision engine, and the mastery-gate record are our IP.
Video, live class delivery, and authentication are not, and we should buy all three.

### 4.3 What does not transfer

`programme_levels` carries `duration_months` and a fixed `units` count per level, and
`courses.level_id` is `UNIQUE` — one course per level, six levels, fixed. That is the right
model for a CEFR-laddered English programme and the wrong one for us: `EB §33` progresses
by demonstrated mastery with no fixed duration, and `EB §34.1` records ḥifẓ as
`(portion × itqān grade × date last verified)` rather than as units completed.

We need their *structure* (course → unit → item, materialised progress, enrolment-derived
access) with a different *progression spine*.

---

## §5. Backend patterns to reach for at Phase 9

These are solved problems. The list exists so they are not re-derived.

| Pattern | File | Why it matters |
|---|---|---|
| **Typed errors carrying `httpStatus`** | `_lib/db.js` | `ConfigError` 500, `NotFoundError` 404, `ValidationError` 422 with a `fields` map. One `errorResponse(err)` handles every endpoint |
| **500s never leak internals** | `_lib/db.js` | `errorResponse` logs the real error and returns a generic message on 500 only |
| **`readJsonBody()`** | `_lib/db.js` | A malformed body is a client mistake → 422, not a `SyntaxError` bubbling to a 500 |
| **Prefixed ids** — `usr_`, `pay_`, `enr_`, `itm_` | `_lib/db.js` `newId()` | Self-describing in logs and support tickets without a lookup. Cheap, and permanent once adopted |
| **`timingSafeEqual()`, hand-rolled** | `_lib/db.js` | Workers have no `crypto.timingSafeEqual`. Plain `===` on a signature leaks timing proportional to matching prefix length. XOR-accumulate, never short-circuit |
| **Atomic counters** | `counters` table | `UPDATE counters SET value = value + 1 RETURNING value` for receipt numbers. `SELECT count(*)` is a real race under concurrent webhooks |
| **Webhook idempotency with `handled_at`** | `payments/webhook-handler.js` | Keyed on `(provider, event_id)`; `handled_at` set **only after** processing completes, so a *partial* failure re-attempts rather than being swallowed by the idempotency check |
| **Provider interfaces everywhere** | `payments/`, `auth/`, `currency/`, `notifications/` | Four gateways, one interface, and **not a single `if (gateway === 'stripe')` in the codebase.** Delete an adapter and only a map entry changes |
| **Business policy in data** | `platform_config` | Prices, discount-stacking rules, instalment defaults are JSON values read at runtime. Changing a price is a config update, never a deploy |
| **Pure logic split from the HTTP wrapper** | `_lib/reports/`, `_lib/student/dashboard.js` | Query logic testable against fixtures with no auth token. The API route is `requireUser()` → call → return |
| **Never fabricate a rate** | `_lib/currency.js` | A currency with `fx_rate_to_usd IS NULL` is refused at checkout. `EB §46` expressed as a database constraint |

**The last one is the most transferable idea in the repository:** an honesty rule enforced
by the data model rather than by discipline. Our equivalent — a certificate with no register
entry is void (`IS §24`) — is the same move.

---

## §6. Consolidated position

| | Inherit | Reject |
|---|---|---|
| **Colour** | Token derivation: authenticated UI borrows institutional tokens, never declares its own | The palette itself; gradients; large radii; shadow-as-structure |
| **Build** | partials + manifest + zero-dependency generator; automatic `.ar` partial fallback; per-language `og:` tags | Google Fonts CDN |
| **Portals** | The guard shell; `inert` during auth; ships-static-without-a-key; opt-in role gating | N portals. One adaptive portal instead (`IA §6`) |
| **LMS** | Course → Unit → Item; materialised progress; access derived from enrolment; the buy-vs-build line | Fixed durations; one-course-per-level; CEFR ladder as the progression spine |
| **Backend** | Every pattern in §5 | Nothing |

**Overall assessment.** The backend is the strongest part of that repository and its
patterns are directly reusable. The design system is competent and correctly *structured*,
but its surface language — cards, shadows, gradients, rounded corners — is 2020s SaaS, and
`IS §2`'s benchmark study is explicit that contemporaneity is the failure mode. We take
their architecture and their discipline, and none of their surface.

---

*WEC-LC Engineering Study v1.0 — 2 August 2026.*
