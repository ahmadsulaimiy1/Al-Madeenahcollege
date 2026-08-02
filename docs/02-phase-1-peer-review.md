# Phase 1 — Internal Peer Review

**Version 1.0 — 2 August 2026**
Adversarial review of `00-editorial-bible.md` v0.2 and `01-naming-and-brand-architecture-study.md` v1.0,
conducted as though examined by nine external panels. Cited as `PR §n` / finding IDs.

**This review was run against my own work, looking for reasons it would fail.** 26 findings.
**2 critical, 11 high, 11 medium, 2 low.** Six are fixed in this commit; twenty are
registered with an owning phase. A review that found nothing would mean the review was
theatre.

---

## Summary

| Panel | Findings | Worst | Verdict |
|---|---|---|---|
| Accreditation panel | 3 | 🔴 Critical | **Would not pass.** The mastery model as written is un-accreditable. |
| Shariah advisory board | 4 | 🟠 High | Sound in principle; one unresolved conflict between safeguarding and modesty. |
| University senate | 4 | 🟠 High | Governance named but not constituted. |
| External auditors | 3 | 🟠 High | One materially unfunded commitment. |
| Cybersecurity | 4 | 🔴 Critical | No data-residency position; unlawful to operate as drafted. |
| Accessibility | 3 | 🟠 High | Strong standard; one platform-level gap unaddressed and one notable omission. |
| Branding consultants | 3 | 🟡 Medium | Strong. Process gaps, not judgement gaps. |
| Instructional designers | 3 | 🟠 High | Philosophy without a design method. |
| UX reviewers | 3 | 🟠 High | One missing state that the academic model guarantees will occur. |

---

## 🔴 Critical

### A-1 · Accreditation panel — the mastery model is un-accreditable as written

**Finding.** `EB §33` progresses students by demonstrated mastery and explicitly refuses to
attach fixed durations. No credit value, notional learning hours, or volume-of-learning
measure appears anywhere in the Bible.

**Why it fails.** Every recognised quality framework — Nigeria's NUC/NBTE, Ofqual's RQF,
the EQF, ECTS — expresses awards in *volume of learning*. Without it we cannot: apply for
accreditation, map to any national framework, support credit transfer, grant recognition
of prior learning, or let a graduate's award be evaluated by a foreign university or
employer. `EB §27` promises the student certification that "means something outside here."
As drafted, it structurally cannot.

**This is the single most consequential defect in Phase 1.** It is also invisible until
the first accreditation application, by which time the entire curriculum is built against
the wrong spine.

**Remedy — dual record, not a retreat from mastery.** Every unit and level carries **both**:

- a **mastery gate**, which alone controls progression (unchanged — `EB §33.3` stands); and
- a **notional learning hours** value, recorded for recognition, mapping, and transfer.

These are orthogonal. A fast-track student completes 120 notional hours in six weeks; a
measured-route student takes six months. Both are recorded as 120 hours. Mastery decides
*whether* they advance; notional hours describe *what the award represents*. Nothing about
the academic doctrine changes — we simply stop refusing to state the quantity that every
regulator on earth requires.

**Owner:** Phase 3. **Blocking:** yes — curriculum cannot be authored before this.

### C-1 · Cybersecurity — no data-residency position

**Finding.** `EB §6.7` forbids selling student data and `EB §30` requires role-scoped
access, but nothing states **where student data lives** or under what lawful basis it
crosses borders.

**Why it fails.** We intend to serve Nigerian students (Nigeria Data Protection Act 2023,
which restricts cross-border transfer), UK and EU students (UK GDPR / GDPR, Chapter V
transfer rules), and Gulf and US students, from one deployment. Operating without a stated
transfer basis, a designated data protection officer, and a records-of-processing
register is not a documentation gap — **it is unlawful processing in at least two of our
named markets** (`EB §43` phases 1 and 2).

**Remedy.** Phase 9 must decide and publish: primary data residency; the lawful transfer
mechanism for each market; a DPO or equivalent named function; a processing register; a
retention schedule; and a Data Protection Impact Assessment covering minors and recorded
sessions. Counsel required in Nigeria and the UK/EU.

**Owner:** Phase 9, with a Phase 2 decision on residency. **Blocking:** yes — before any
real student data exists.

---

## 🟠 High

### S-1 · Shariah board — safeguarding and modesty are in direct conflict *(partially fixed)*

`EB §28` mandates recorded sessions and parental access to recordings as a child-protection
control. `EB §5.4` sets modesty standards for imagery. **Neither addresses recorded video
of women and girls in class** — where the safeguarding control and the modesty standard
pull in opposite directions.

This cannot be left to be discovered by a teacher at 9pm on a Tuesday. **Remedy:** a stated
rule — audio-only recording as the default for women's and girls' classes, with video
recording only on explicit opt-in; recordings encrypted, access-logged, retention-limited,
and never downloadable. To be ratified by the Academic Board and a named scholar, not by
me. **Owner:** Phase 2, jointly with C-3.

### S-2 · Shariah board — no position on ribā in the payment stack

`EB §37.5` commits to instalments "without penalty," but nothing states that instalment
plans are non-interest-bearing, or addresses card-network and gateway structures, or
late-payment charges. An Islamic institution must be able to answer this in one sentence
and cannot currently. **Remedy:** publish a financing position — instalments as deferred
payment at no increase over the cash price, no late-payment interest, and a documented
review of gateway terms. **Owner:** Phase 8.

### S-3 · Shariah board — the AI tutor may generate Qur'anic text

`EB §5.7` restricts the AI tutor's *scope* (no fatwā) but does not forbid it from
*producing Qur'anic text*. Language models hallucinate. A tutor that misquotes the Qur'an
to a student is the most serious failure this platform could produce, and the current rules
do not prevent it. **Remedy:** hard architectural constraint — the AI may only ever
*retrieve* Qur'anic text from the verified corpus (`EB §15.4`), never generate it; any
response containing Qur'anic text is template-rendered from the verified source or
suppressed. **Owner:** Phase 9. **This should be treated as near-critical.**

### U-1 · University senate — the Academic Board is named but not constituted

`EB §44.1` assigns the Academic Board authority over curriculum, assessment, mastery
standards, and Islamic identity. Nowhere is its composition, size, quorum, term length,
appointment process, conflict-of-interest rule, or independence from the Founder defined.
A board that exists only as a line in a table cannot discharge the authority given to it,
and an accreditation panel will read it as decorative. **Remedy:** a governance statute in
Phase 2. **Owner:** Phase 2.

### U-2 · University senate — no independent academic appeals body

`EB §23.9` makes automated judgements "appealable to a named person" and `EB §33.3`
attributes gate results to a named assessor. There is no body independent of the original
assessor to hear an appeal. **Remedy:** a two-stage appeal — internal review by a different
assessor, then an Academic Appeals Panel with at least one member external to the teaching
of that programme. **Owner:** Phase 2.

### F-1 · External auditors — the teacher-pay commitment is unfunded

`EB §29` commits that teacher pay is **never** reduced to compensate for regional pricing,
benchmarked to a living wage in each market. `EB §38.3` sets Band E at index **0.08**. At
8% of Band A revenue, a Band E cohort cannot fund a living-wage teacher without
cross-subsidy — and no cross-subsidy is stated anywhere.

**This is a commitment the financial model cannot currently honour.** Either the
cross-subsidy is made explicit and quantified, or the commitment is unfunded and will be
broken under pressure — most likely quietly, which is worse. **Remedy:** Phase 8 must
model the cross-subsidy explicitly, state the Band A/B enrolment ratio required to sustain
Bands D/E, and publish it as part of the pricing methodology (`EB §38.2.5`) — where it
becomes a trust asset rather than a hidden dependency. **Owner:** Phase 8. **Blocking:**
yes.

### F-2 · External auditors — no fiscal year, reserves policy, or going-concern basis

`EB §40.5` requires audit and public reporting but the institution has no defined financial
year, no reserves or contingency policy, and no going-concern statement. An institution
holding tuition in advance (and potentially sadaqah) without a reserves policy cannot
demonstrate it can teach out its enrolled students if it fails. **Remedy:** Phase 8 —
fiscal year, minimum reserves expressed in months of operating cost, and a **teach-out
commitment** stating what happens to enrolled students if the institution ceases to
operate. The teach-out commitment is a strong trust signal (`EB §31`) and almost no
competitor offers one. **Owner:** Phase 8.

### C-2 · Cybersecurity — recordings of minors have no retention or access policy

`EB §28` mandates recorded sessions including children's classes. That is the highest
sensitivity data this institution will ever hold. No retention schedule, access-control
policy, encryption-at-rest commitment, or deletion right is specified. **Remedy:** Phase 9
— encrypted at rest, access logged and role-scoped, default retention of 90 days unless a
safeguarding matter is open, parental deletion right, and never downloadable. **Owner:**
Phase 9, with S-1.

### X-1 · Accessibility — Arabic screen-reader support is weak, with no stated fallback

`EB §25.10` mandates manual screen-reader testing in both languages — correct, and more
than most institutions do. But Arabic support across NVDA, JAWS, and VoiceOver is genuinely
inconsistent, particularly for vocalised (*mushakkal*) text, which is exactly the text our
Levels 1–4 use (`EB §11.2`). Mandating a test does not help when the platform itself
fails. **Remedy:** Phase 6 — define a fallback contract: every vocalised passage carries an
unvocalised accessible text alternative plus an audio recitation, so a blind Arabic student
is never dependent on the screen reader's tashkīl handling. **Owner:** Phase 6.

### I-1 · Instructional design — no constructive alignment

The Bible states a pedagogy (`EB §4.2`) and a progression doctrine (`EB §33`) but never
maps **learning outcomes → learning activities → assessment criteria**. Without that
mapping, mastery gates are assessor judgement rather than criterion-referenced assessment
— unreliable between assessors and indefensible on appeal (U-2) or to an accreditation
panel (A-1). **Remedy:** Phase 3 — every level carries explicit outcomes, each mapped to
activities and to gate criteria, with published rubrics. **Owner:** Phase 3. **Blocking:**
yes, with A-1.

### I-2 · Instructional design — the revision scheduler has no specified method

`EB §4.2` calls consolidation "architecturally mandatory" and `EB §34.4` makes *murājaʿah*
compulsory and system-scheduled — but no scheduling method, interval model, or evidence
base is specified. The single most important academic feature in the platform is currently
one adjective. **Remedy:** Phase 3 specifies the algorithm (spaced repetition adapted for
ḥifẓ, where the retention unit is a portion re-recited to an itqān grade, not a flashcard);
Phase 9 implements it. **Owner:** Phase 3.

### Z-1 · UX — no leave-of-absence or re-engagement state

`EB §33.3` places **no time limit** on reaching a gate. That guarantees students will pause
for months and return — it is a designed consequence of the academic model. Yet `EB §27`'s
seven-stage journey has no paused state, no re-engagement path, and no re-placement flow
for a student returning after a long absence. `EB §23.4` forbids dead ends; this is one.
**Remedy:** Phase 7 — an explicit *Leave of Absence* state (student-initiated, no penalty,
retains progress and price lock per `EB §38.2.8`), plus a return flow with optional
re-placement. **Owner:** Phase 7.

---

## 🟡 Medium

| ID | Panel | Finding | Owner |
|---|---|---|---|
| **A-2** | Accreditation | No programme specification template; no programme-level learning outcomes | Phase 3 |
| **A-3** | Accreditation | No external examiner function. `EB §45.2` provides internal moderation only; accreditation panels expect externality | Phase 3 |
| **S-4** | Shariah | No stated riwāyah policy for *audio* library, only for text (`EB §15.4`) | Phase 3, with D-06 |
| **U-3** | Senate | No academic freedom statement for faculty | Phase 2 |
| **U-4** | Senate | No student voice in governance beyond feedback collection (`EB §45.2`) | Phase 2 |
| **F-3** | Auditors | The `EB §38.2.8` price lock creates multi-year deferred revenue and FX exposure with no hedging or provisioning policy | Phase 8 |
| **C-3** | Cyber | No stated position on whether student utterances (Arabic speech assessment, AI tutor) leave our infrastructure to a third-party model provider — a disclosure requirement under `EB §6.7` | Phase 9 |
| **X-2** | Accessibility | No cognitive accessibility provision (dyslexia, ADHD) — material for a memorisation-heavy institution | Phase 6 |
| **X-3** | Accessibility | **No provision for blind students learning Qur'an** — historically one of the most significant constituencies in ḥifẓ. A serious omission for a Qur'an college, and a genuine differentiation opportunity | Phase 3 + 6 |
| **B-2** | Branding | `EB §18.1` requires a commissioned calligraphic mark but defines no selection, brief, or rights-assignment process | Phase 4 |
| **I-3** | Instructional | No moderation policy for AI-generated assessment feedback. `EB §12.4` covers published content, not feedback to students | Phase 3 |
| **Z-3** | UX | `EB §24` promises offline study with sync-on-reconnect; no conflict-resolution rule is specified | Phase 9 |

---

## 🟢 Low

| ID | Panel | Finding | Owner |
|---|---|---|---|
| **B-3** | Branding | No sonic identity decision beyond `EB §5.5`'s no-music rule — what a notification actually sounds like is undefined | Phase 6 |
| **Z-2** | UX | `EB §32.3` forbids retargeting visitors to a "bereavement or hardship page" that does not exist in any information architecture — a dangling reference *(fixed in this commit: reframed as a forward commitment)* | — |

---

## Fixed in this commit

| ID | Fix |
|---|---|
| **S-1a** | The borrowed-authority tension the Shariah panel raised on the Madinah name is resolved and codified — `EB §8.5`, with a required public disclosure of non-affiliation |
| **B-1** | The `NS §7` propriety veto gate is codified as a permanent naming rule — `EB §8.4` |
| **Z-2** | Dangling reference corrected — `EB §32.3` |
| **A-1a** | Notional learning hours added to `EB §33` alongside mastery gates, so Phase 3 is authored against the right spine from day one |
| **S-3a** | AI may retrieve but never generate Qur'anic text — added to `EB §5.7` |
| **F-1a** | Cross-subsidy made an explicit, publishable obligation — `EB §38.2` and `EB §29` |

---

## What this review did not examine

Honesty about the review's own limits, per `EB §46`:

- **No legal review.** No qualified lawyer examined any regulatory claim here. Findings
  C-1, S-2, and the D-03 nomenclature question all need real counsel.
- **No Arabic-language review.** No native Arabic speaker has reviewed the Arabic in either
  document. `EB §11.8`'s two-person rule is not yet satisfied.
- **No scholarly review.** No qualified Islamic scholar has reviewed §5, §34, or §35. The
  Shariah panel above is a simulated adversarial reading, **not a substitute for a real
  Shariah board**, and must not be represented as one.
- **No user research.** Every claim about student and parent behaviour is reasoned from
  category knowledge, not observed. Phase 7 should test it.

---

*Peer Review v1.0 — 2 August 2026. Re-run at the close of every phase.*
