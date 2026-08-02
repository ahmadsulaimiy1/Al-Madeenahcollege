# Institutional Information Architecture

**Phase 5 · Version 1.1 · 2 August 2026** — incorporates 12 fixes from `docs/07-phase-5-peer-review.md`
Al-Madinah International College of Arabic and Qur'anic Studies

Governed by `docs/00-editorial-bible.md` (in force). Cited as `IA §n`.
Reviewed at `docs/07-phase-5-peer-review.md`. Deferred ideas at `docs/06-future-considerations-register.md`.

---

# PART I — THE GOVERNING CONSTRAINTS

## §1. Two principles, and what they cost

**Institution before website.** Every element must survive the question: *if this
institution existed for one hundred years, would this still be the correct decision?*

**Less, but better.** A maximum of three primary experiences. Every page, feature, and
workflow justifies its existence or does not exist.

These two principles mostly agree, and where they disagree, the disagreement is
informative. A hundred-year institution accumulates: more programmes, more policies, more
alumni, more publications. Restraint is not achieved by refusing to grow — it is achieved
by **designing containers that absorb growth without multiplying**. That is the actual
architectural problem this document solves, and every decision below is an answer to it.

## §2. The 100-Year Test — operationalised

Six questions. Anything entering the architecture answers all six.

| | Question | Fails when |
|---|---|---|
| **Q1** | Will this still be **true**? | It states a fact that decays (`EB §46`) |
| **Q2** | Will this still be **maintained** in year 30? | It needs continuous attention from a role that may not exist |
| **Q3** | Will its **URL still resolve**? | It carries a date, a CMS id, a campaign name, or a vendor's domain |
| **Q4** | Does it depend on a **vendor that may not exist**? | Its content is trapped in a third-party platform |
| **Q5** | Would a **future Rector be embarrassed** by it? | It is fashionable, promotional, or self-congratulatory |
| **Q6** | Does it **accrue value or decay**? | It is a campaign, not a record |

**Q6 is the sharpest.** A published curriculum, a policy, an annual report, and a
verification register all *accrue* value — they are worth more in year 40 than in year 1.
A news post, a campaign page, and a testimonial carousel *decay*. **The architecture is
weighted toward things that accrue**, and that single bias explains most of what follows.

## §3. The three experiences, plus one utility

| | Experience | For | Auth |
|---|---|---|---|
| **1** | **Public Website** | Anyone. Deciding, verifying, reading. | None |
| **2** | **Campus Portal** | Everyone with a relationship to the institution — students, parents, teachers, alumni, sponsors. **One system, one navigation, adaptive by relationship.** | Yes |
| **3** | **Executive Console** | Running the institution — admissions, finance, registry, quality, safeguarding. | Yes, elevated |
| **+** | **Verification Register** | A public utility, not an experience. See §4. | None, ever |

## §4. Why the Verification Register is the one permitted exception

It is not a portal and not a section. It is a **public utility with a hundred-year
availability obligation that the rest of the estate does not carry.**

`IS §24` established that the register *is* the credential — the certificate is a receipt
for it. That creates an obligation unlike anything else we operate: **a graduate may
present a certificate in 2087, and the register must answer.** It must therefore survive
every website redesign, every CMS migration, every change of hosting, and every change of
leadership between now and then.

Coupling it to the marketing site guarantees it will eventually be broken by a redesign
that had nothing to do with it. So:

- **`verify.almadinah.college`** — separate host, separate deployment, separate uptime
  obligation.
- **Minimal by design.** One input, one output. No navigation, no marketing, no analytics
  beyond aggregate counts, no login, ever.
- **Its own change control.** Board-level, not Design Authority (`IS §57`).
- **Deliberately boring.** The most durable thing we will build should be the least
  interesting.

- **`noindex`.** A verification register is looked up, never browsed. It must not be
  crawlable, and its records must not be searchable from outside.

This costs us a second TLS certificate and a second deployment target. That is the entire
cost, and it buys the one guarantee we cannot afford to lose.

### 4.1 Permanence and the right to erasure — resolved

`IS §24` makes the register permanent. UK/EU GDPR Art. 17 and Nigeria's NDPA 2023 grant a
right to erasure. **Both are correct and they cannot both be absolute.** A register a
graduate can delete themselves from is not a credential register; an indefinite public
listing of a named person with no erasure path is not lawful in two of our named markets.

**The resolution separates the record from its publication.**

| | |
|---|---|
| **Lawful basis** | **Legitimate interest / public task** — credential integrity, fraud prevention, and the interest of third parties relying on it. **Not consent**: a credential a person can retract on request is not evidence of anything |
| **The record is permanent** | Erasing it would defraud every future party relying on it — and would let someone with a *revoked* credential erase the revocation |
| **The publication is not** | A holder may request **suppression of public lookup**. The record persists; the endpoint returns *"This credential exists but its holder has requested private verification. Contact the Registry."* Verification stays possible, through a named human, with the holder involved |
| **Revoked credentials are never suppressible** | Suppression is a privacy right, not an escape route |
| **Minimisation** | The endpoint shows the minimum needed to verify, never the maximum permitted (`IS §24.3`) |
| **Documented** | A published Legitimate Interests Assessment and retention justification, confirmed by counsel **before the first credential is issued** |

### 4.2 The write boundary — the Console proposes, the register records

The Console (§13) and the register are two systems, and the boundary between them is the
integrity guarantee of the entire certification model:

- Writes are **append-only**, two-person authorised, and cryptographically signed at issue.
- **Nothing is ever edited after the fact.** A correction is a **new entry superseding the
  prior one**, with both visible.
- The Console holds **no delete capability** against the register — by construction, not by
  permission.

---

# PART II — THE ABSORPTION MAP

## §5. Every named system, and where it actually lives

The brief named 28 systems. **None becomes a separate destination.** Each is absorbed,
merged, or does not exist — with the reason recorded.

| # | Named system | Disposition | Reasoning |
|---|---|---|---|
| 1 | Public website | **Experience 1** | — |
| 2 | Admissions portal | **→ Public Website** `/admissions` | Applying happens *before* you have an account. A portal you must register for in order to apply is friction disguised as a system. |
| 3 | Student portal | **→ Campus Portal** | — |
| 4 | Parent portal | **→ Campus Portal** | A parent is not a different system. A parent is a **person with a linked-student relationship** (§10). |
| 5 | Faculty portal | **→ Campus Portal** | A teacher is a person with **teaching assignments**. |
| 6 | Staff portal | **→ Campus Portal** *or* **Console**, by function | Staff who *teach* use the Portal. Staff who *run the institution* use the Console. The split is by activity, never by job title. |
| 7 | Alumni portal | **→ Campus Portal** | An alumnus is a student whose enrolment ended. Study goes read-only; Progress is permanent. **A separate alumni portal is the least-logged-into system in higher education** — because it asks people to adopt a new habit at exactly the moment they stop having one. |
| 8 | Partner portal | **→ Campus Portal** (sponsor lens) | A sponsoring organisation sees the cohort it funds, in the same portal, under the same navigation. |
| 9 | Scholarship portal | **→ Public Website** `/fees` + **Campus Portal** | Applying is public; the award lives with the student's money. `EB §39` requires scholarship students be **indistinguishable** — a separate portal would mark them. Architecturally enforced. |
| 10 | Research and publications | **→ Public Website** `/publications` | One section for everything the institution publishes. Research joins it when research exists (`EB §46`). |
| 11 | Digital library | **→ Campus Portal** → Library; **public catalogue** | Licensed content needs auth; a catalogue nobody can search is not a library, so the catalogue is public and indexable. |
| 12 | Arabic placement system | **→ Public Website** `/admissions/placement` | Free and **ungated** (`EB §32.2`). Gating our best trust instrument behind an account would be self-defeating. |
| 13 | Qur'an memorisation tracker | **→ Campus Portal** → Study | This is the core study surface, not an adjacent tool. |
| 14 | Learning management system | **→ Campus Portal.** *There is no LMS.* | **The single largest simplification available.** The Portal *is* where you study. Splitting "portal" from "LMS" is an artefact of institutions buying the two from different vendors — a procurement history, not a user need. |
| 15 | Knowledge base | **→ Help** (merged with 16) | |
| 16 | Help centre | **→ Help**, one system, surfaced contextually | One corpus. Public articles on the website; the same articles in-context inside the Portal. Two front doors, never two bodies of content. |
| 17 | AI learning environment | **→ a capability, not a place** | The AI tutor is a panel beside the work, bound by `EB §5.7`. An "AI environment" as a destination asks the student to go somewhere to be helped — precisely backwards. |
| 18 | Quality assurance system | **→ Console** (process) + **`/publications`** (outputs) | QA is a process with a reporting surface, not a portal. Publishing its outputs is a trust instrument (`EB §31`). |
| 19 | Governance and policy centre | **→ Public Website** `/about/governance` | Among the most durable sections we will ever have. Passes Q6 outright. |
| 20 | Careers and recruitment | **→ Public Website** `/careers` | One page. Hiring is continuous over a century; a recruitment *platform* is not. |
| 21 | News and media centre | **✕ Not built** | `EB §12.3` forbids reactive content; a newsroom with nothing in it is worse than none. Dated institutional notices live in `/publications`. **→ Future Considerations F-01.** |
| 22 | Events platform | **→ `/calendar`**, one page | The academic calendar is genuinely required (accreditation expects it; `EB §5.6` requires Ramaḍān and ʿĪd closures). A *platform* is not. |
| 23 | Donations and waqf | **→ Public Website** `/support` | Waqf is the hundred-year instrument (`EB §40.4`) — the section most aligned with Q6. Scoped honestly: **no zakāt** until D-11 (`EB §40.3`). |
| 24 | International partnerships | **→ `/about`** until partnerships exist | `EB §46`: no partners page with no partners. |
| 25 | Accreditation and compliance | **→ `/about/governance`** | Where `EB §46.3`'s Institutional Status callouts sit most prominently — including that we are not yet accredited. |
| 26 | Credential verification | **The public utility (§4)** | The one exception, and it earns it. |
| 27 | Community engagement | **✕ Not a system** | It is an activity. It surfaces through `/support` and `/about`. A "community platform" with no community is an empty room with the lights on. |
| 28 | Continuing professional education | **→ `/programmes`** | A *programme*, not a system. |

**Result: 28 named systems → 3 experiences + 1 utility.**

## §6. The thesis behind the collapse

> **Portals proliferate because institutions model *roles* as *systems*.
> Model people as **people with relationships**, and one portal serves all of them.**

A parent, an alumnus, a sponsor, and a teacher are not four systems. They are four
**relationships** a person may hold — sometimes several at once. A teacher whose daughter
studies here holds two. Under the role-as-system model she needs two logins and two habits.
Under the relationship model she signs in once and sees both.

This is not merely simpler. **It is more correct**, because it matches how people actually
relate to an institution over a lifetime: a student becomes an alumnus becomes a parent
becomes a donor, without ever ceasing to be the previous thing.

**The honest cost**, stated because §1 requires it: one adaptive system **concentrates
authorisation risk**. Four separate portals fail separately; one portal with a bug in its
relationship model fails everywhere at once. §12 addresses this directly, and the Phase 5
review returns to it as its most serious finding.

---

# PART III — EXPERIENCE 1: THE PUBLIC WEBSITE

## §7. Structure

Sixteen routes. Each justified; each passes all six 100-Year questions.

```
/                        Home — orientation and evidence, not persuasion
/about                   Who we are · operating model · Institutional Status · partnerships
/about/governance        Board · policies · accreditation status · QA reports · annual report
/programmes              The four Schools · pathways · durations · what mastery means
/programmes/<school>     One page per School (4)
/admissions              Who it is for · requirements · the journey · time commitment
/admissions/placement    The free, ungated placement assessment
/admissions/apply        The application
/fees                    Tuition · regional bands · instalments · scholarships · financial aid
/fees/methodology        How every price was decided — the published methodology
/faculty                 Teachers, credentials, chains
/publications            Curricula · assessment criteria · policies · reports · research
/calendar                Academic calendar · closures · open days
/support                 Waqf · endowment · sponsorship · what we do and do not accept
/careers                 Teaching and staff vacancies
/help                    Public help corpus · FAQ
/contact                 Named humans · stated response times
/legal/*                 Privacy · terms · accessibility statement · safeguarding
```

Plus `/ar/…` — a **complete mirror at the same paths** (`EB §26.2`), authored in parallel,
never translated (`EB §26.1`).

## §8. Why each exists, and what was merged away

| Route | Q6: accrues or decays | Justification |
|---|---|---|
| `/` | Accrues | Orientation. **Its job is trust, not conversion** (`EB §13.1c`). |
| `/about` + `/about/governance` | **Accrues strongly** | Board, policies, accreditation status, annual reports. This section is worth more every year. `EB §31`'s instruments 5 and 7 live here. |
| `/programmes` + 4 School pages | Accrues | The academic offer. Absorbs new programmes without new sections — a container, per §1. |
| `/admissions` (+ placement, apply) | Accrues | The decision journey. |
| `/fees` + `/fees/methodology` | **Accrues strongly** | The methodology page turns our most legally sensitive area into our loudest trust signal (`EB §38.2.5`). |
| `/faculty` | Accrues | `EB §31`'s single strongest instrument. **Publication is contractual and consented**, agreed at appointment with the scope stated in writing and the profile reviewable before publication — a scholarly chain is personal data, and arguably more revealing than a CV. On departure the profile is removed, but **awards they assessed remain attributed**: attribution is a record, not a profile, and a transcript naming a departed assessor must stay valid. |
| `/publications` | **Accrues most of all** | The institutional record. In year 50 this is the most valuable thing on the estate. |
| `/calendar` | Neutral | Required by accreditation; carries Ramaḍān/ʿĪd (`EB §5.6`). One page. **Hijri-anchored for observances, Gregorian-anchored for terms, computed — never hard-coded.** The Hijri year is ~11 days shorter, so Ramaḍān migrates through the entire Gregorian year about every 33 years. A calendar with "the Ramaḍān break" fixed in a term is correct for a few years and progressively wrong thereafter. Term boundaries flex around the computed Ramaḍān and Ḥajj windows |
| `/support` | Accrues | Waqf is a century instrument. |
| `/careers` | Neutral | One page, continuously relevant. |
| `/help`, `/contact` | Neutral | `/help` is the self-serve front door; `/contact` is the named-human commitment (`EB §31`). Deliberately **not merged** — they answer different questions. |
| `/legal/*` | Accrues | Obligation. |

**Merged or removed, with the reason:**

| | Decision |
|---|---|
| **Scholarships → `/fees`** | A family asks one question: *"what will this cost, and can I get help?"* Two pages split one question. **One money family.** And **one application** — financial aid is a section of the admissions form, never a second process. Two forms would mean the students least able to pay do the most work |
| **Testimonials** | Not built. We have no students (`EB §46`). |
| **Blog / News** | Not built (§5.21). Decays by construction. |
| **Live chat** | Not built. A chat widget nobody staffs is worse than none. `/contact` is answered by a named person. |
| **"Why choose us"** | Not built. `EB §10.2` forbids the comparative claims such a page exists to make. |
| **Separate Partnerships page** | Folded into `/about` until partners exist. |
| **Separate Accreditation page** | Folded into `/about/governance` — where the honest status belongs. |

## §9. URL architecture — the most durable decision in Phase 5

Q3 asks whether a URL will resolve in a hundred years. It will only if it is designed to.

| Rule | Reason |
|---|---|
| **One domain.** Only `verify.` is a subdomain, and only for §4's reason | Subdomain sprawl is how institutions fragment. `alumni.`, `library.`, `news.` each become an orphan with its own stack and its own decay |
| **No dates, ids, or campaign names in paths** | `/publications/assessment-framework`, never `/2027/03/post-482` |
| **Slugs are permanent.** Renaming requires a redirect that is **never removed** | A policy cited in 2031 must resolve in 2131 |
| **`/ar/` prefix, not `ar.` subdomain** | One estate, one deployment, one search index (`EB §26.2`) |
| **No file extensions, no trailing-slash ambiguity, lower-case, hyphenated** | Every ambiguity is a future 404 |
| **Every published document has a citable, versioned URL** | `/publications/<slug>` current; `/publications/<slug>/v3` historical. **Superseded versions are never deleted** — an institution that silently rewrites its own policies cannot be audited. Superseding requires the document's **owning authority** (`EB §44.1`), recorded on the version itself |
| **Redirect map is an institutional asset**, versioned in the repository | It is the memory of every URL we ever had |
| **Two tiers: hot (last 5 years) in edge config, historical behind one catch-all handler** | Both permanent; only the execution path differs. Without this, the never-remove rule eventually becomes a lookup evaluated on every request — the rule's own success turned into a performance problem |

**Deliberately rejected:** vanity campaign domains; QR-shortener domains; a separate mobile
site; year-based publication paths; any URL containing a vendor's hostname.

---

# PART IV — EXPERIENCE 2: THE CAMPUS PORTAL

## §10. The relationship model

The portal has **one** navigation. What appears in it is determined by the **relationships**
a person holds — never by a role label.

| Relationship | Grants |
|---|---|
| `enrolled_student` | Study, Progress, Money, People (my teacher), Library |
| `former_student` | Progress (permanent), Library (reduced), People. **Study read-only** |
| `guardian_of(student)` | Progress and Money **for that student**, People. Never Study |
| `teaches(cohort)` | Study (authoring, assessing), Progress (for taught students), People |
| `sponsors(cohort)` | **Aggregate** progress and financial position for that cohort. Never individual records without consent |
| `assessor(school)` | Assessment queue, gate decisions |

A person may hold several simultaneously. **The portal composes them; it does not switch
between them.** There is no "switch to parent view" — a parent who is also a teacher sees
her students and her daughter in the same place, distinguished by context, not by mode.

**Consent is a relationship property, not a setting.** `guardian_of` an adult student
exists only while that student consents, is revocable instantly, and its revocation is
enforced in the data layer (`EB §28`). This is the highest-risk rule in the portal.

**The minor-to-adult transition is designed, not assumed.** For a minor, `guardian_of` is
automatic. **At the student's 18th birthday it does not continue — it suspends.** Both
parties are notified thirty days before; on the day, access stops and resumes only if the
now-adult student affirmatively grants it. **Silence means no access.** This is diarised in
the data layer, never left to an administrator to remember, because the day it is forgotten
is the day the access becomes unlawful.

**Sponsor aggregates suppress below a cohort of 10.** In a cohort of three, "aggregate"
progress *is* individual progress — and small sponsored cohorts are the normal case, not
the edge case. Below the threshold a sponsor sees enrolment counts and financial position
only. Individual progress requires the student's explicit, revocable consent, and
**sponsorship is never conditional on granting it** — a consent you must give to be funded
is not a consent.

## §11. Surfaces

Seven. Not one more.

| Surface | Answers | Present for |
|---|---|---|
| **Today** | *"What should I do now?"* | Everyone |
| **Study** | Lessons, recitation, Qur'an, revision queue, the AI panel | Students, teachers |
| **Progress** | Mastery record, notional hours, gate results, certificates | Everyone with a student relationship |
| **People** | My teacher · my students · my children · my cohort | Everyone |
| **Library** | Texts, recordings, references | Everyone |
| **Money** | Fees, band, instalments, receipts, scholarship | Students, guardians, sponsors |
| **Help** | The same corpus as `/help`, in context | Everyone |

**Both the Portal and the Console are bilingual from day one**, full RTL, Arabic authored
in parallel (`EB §26.1`, `EB §26.6`). The Console is included deliberately: a registrar
working in Arabic is not a lesser case than a student.

**Leave of Absence** is surfaced in Today (to enter or return) and in Progress (as a
recorded, unpenalised state) — `EB §33.3` places no time limit on reaching a gate, which
guarantees students will pause. **The assessor's queue lives in Progress**, which is the
assessment record for every relationship rather than a separate assessor destination.

**Today is the only landing surface**, and it is deliberately the only place with a
"what's next." Everything else is a place you go on purpose. This is the mechanism by which
the portal stays quiet: **one surface is allowed to be proactive; six are not.**

**Study is where a hundred years of accumulated features would otherwise land.** Its
container discipline: a lesson, a recitation, a revision item, and an assessment are *four
object types*, and new pedagogy must express itself as one of those four or it does not
ship. That constraint is what prevents Study becoming a dashboard.

## §12. Authorisation — the cost of §6, paid explicitly

One portal concentrates risk. Four controls, all architectural:

1. **Deny by default.** No relationship, no access. There is no "logged-in" permission
   level — every read is authorised against a specific relationship to a specific person.
2. **Relationship-based, never role-based, access control.** Checks ask *"does A hold a
   current relationship to B that permits this?"*, never *"is A a parent?"*
3. **Every cross-person read is audited** — actor, subject, field, timestamp, reason.
   A guardian reading a student's record generates a record.
4. **Consent revocation is immediate and total**, enforced in the query layer so no
   endpoint can forget it.

The Phase 5 review treats this as its most serious finding, and it should.

---

# PART V — EXPERIENCE 3: THE EXECUTIVE CONSOLE

## §13. Scope

**Running the institution**, never studying in it. A teacher does not use the Console; a
registrar does.

| Surface | Function |
|---|---|
| **Admissions** | Application queue, placement results, decisions. `EB §30`: every application answered, no silent rejections |
| **Registry** | Enrolment, progression, mastery records, certification, transcripts, the credential register |
| **Finance** | Reconciliation across gateways and currencies, instalments, scholarship ledger, band audit |
| **Quality** | Assessor moderation, observation records, outcome analysis, external examiner reports |
| **Safeguarding** | Restricted. Concerns, actions, recording access — the tightest permissions in the estate (`EB §28`) |
| **People** | Staff and faculty records, credentials, verification status |
| **Configuration** | `platform_config` — prices, bands, policy values. **Business policy lives in data, never in code** |
| **Audit** | Every administrative action, actor, timestamp, reason (`EB §30`) |

**Deliberately not built:** a BI/analytics suite (Quality's published outcomes are the
reporting surface); a CRM; a marketing automation console; an "executive dashboard" of
vanity metrics. `EB §30`: *a dashboard that flatters is worse than no dashboard.*

---

# PART VI — STAKEHOLDERS, JOURNEYS, FRICTION

## §14. Stakeholder map

| Stakeholder | Primary surface | Their one question |
|---|---|---|
| Prospective student | Public | *"Is this real, and can I afford it?"* |
| Enrolled student | Portal · Study | *"What do I do now, and am I progressing?"* |
| Parent / guardian | Public → Portal | *"Who teaches my child, are they safe, is it working?"* |
| Alumnus | Portal · Progress | *"Can I still prove what I did?"* |
| Teacher | Portal · Study | *"Who needs me today?"* |
| Assessor | Portal · Progress | *"What is in my queue?"* |
| Admissions officer | Console | *"What is waiting for a decision?"* |
| Registrar | Console · Registry | *"Is this record defensible?"* |
| Finance | Console · Finance | *"Does this reconcile?"* |
| Board / Rector | Console + `/publications` | *"Is the institution sound?"* |
| **Accreditation reviewer** | **Public, unauthenticated** | *"Can I evaluate this without asking permission?"* |
| **Employer / foreign registrar** | **Verification utility** | *"Is this certificate real?"* |
| Sponsor / partner | Portal (sponsor lens) | *"What did our funding achieve?"* |
| Donor | `/support` | *"Where does the money go?"* — no account, ever |
| Journalist / researcher | `/publications` | *"What do they actually publish?"* |
| Regulator | `/about/governance` | *"What do they claim, and is it true?"* |

**Two stakeholders reshaped the architecture.** The **accreditation reviewer** must be able
to evaluate us *without an account* — which is why curricula, assessment criteria, policies,
and QA outputs are all public rather than portal-gated. The **foreign registrar** needs
verification in under thirty seconds, from a link, on a phone, with no login — which is §4.

## §15. The journey — discovery to alumnus

| Stage | Surface | Decision point | Trust moment | Friction risk |
|---|---|---|---|---|
| **1 · Discover** | `/`, `/programmes` | *"Is this a real institution?"* | Named faculty with published chains; Institutional Status callouts stating what we are **not** | Looking like every other online academy |
| **2 · Evaluate** | `/fees`, `/fees/methodology` | *"Can I afford it?"* | Price visible with **no form**; the methodology explains every band | **Price shock** in Band A; band mismatch for diaspora students |
| **3 · Place** | `/admissions/placement` | *"Where do I start? Will I be embarrassed?"* | Free, ungated, framed as **calibration, not a test**. **Untimed, resumable, unlimited retakes**, progress saved continuously; no score ever shown as a grade | Assessment anxiety; abandonment mid-way |
| **4 · Apply** | `/admissions/apply` | *"What am I committing to?"* | Itemised fees; plain refund terms; **no surprises at checkout** | Payment failure; document upload on mobile data |
| **5 · Enrol** | Checkout → Portal | *"Did that work?"* | Confirmation in minutes; receipt; named contact. **A signed, expiring status link is emailed at submission (90 days, re-sendable indefinitely)** — no account, no password, so an applicant can check at any hour without contacting anyone | Gateway failure; band verification dispute |
| **6 · Onboard (14 days)** | Portal · Today | *"Am I in the right place?"* | **Teacher contact within 48h; first lesson within 7 days** (`EB §27.5`) | **The retention cliff.** Teacher no-show is the single worst failure here |
| **7 · Study** | Portal · Study | *"Am I keeping up?"* | Visible mastery; scheduled revision; proactive outreach on the **first** drift signal | Time zones across bands; Ramaḍān shift; connectivity |
| **8 · Pause** | Portal · Today | *"Can I stop without losing everything?"* | **Leave of Absence** — no penalty, progress retained, price locked (`EB §38.2.8`) | Not offering it, so students vanish instead |
| **9 · Gate** | Portal · Progress | *"Did I pass? Can I appeal?"* | Free unlimited retakes; named assessor; independent appeal | Fear of failure; assessor availability |
| **10 · Certify** | Registry → verify | *"Does this mean anything outside?"* | Verifiable certificate; transcript with a key block a foreign registrar can read | Limitation statement misread as "unaccredited" |
| **11 · Alumnus** | Portal · Progress | *"Can I still prove this in twenty years?"* | **Permanent register; the portal never closes** | Losing account access; email address long dead |

**Stage 11 is where the 100-Year Test bites hardest.** An alumnus in 2060 will not have the
email address they registered with in 2027. Account recovery for people whose every
contact detail is stale is a real, designed requirement — not an edge case — and it is
registered for Phase 7.

## §16. Friction register

| Friction | Where | Mitigation |
|---|---|---|
| Price shock | Stage 2 | Band shown immediately with the methodology one click away |
| Band mismatch (diaspora, VPN, roaming) | Stage 2/5 | Band is a **suggestion**, always changeable pre-account; verified at payment, never by IP (`EB §38.2`) |
| **Relocation mid-programme** | Stage 7 | The **current enrolment holds its price to completion** (`EB §38.2.8`); the *next* enrolment is assessed at the new band. A student who moves is never re-billed for what they already bought |
| Placement anxiety | Stage 3 | Framed as calibration; no score shown as a grade; retakeable |
| Payment failure | Stage 5 | Multi-gateway routing; local rails first; a human named on the failure screen |
| Document upload on mobile data | Stage 4 | Client-side compression; resumable; **defer non-essential documents to after enrolment** |
| Teacher no-show | Stage 6 | Console alert at the first missed session, not the third |
| Time zones across Bands A–E | Stage 7 | All times in the student's local zone; live components scheduled against prayer windows (`EB §5.6`) |
| Ramaḍān timetable shift | Stage 7 | An institutional operating mode planned annually, not an exception |
| Connectivity | Stage 7 | Offline-first; audio before video; data-saver toggle (`EB §24`) |
| Consent confusion (adult student / parent) | All | Explicit, revocable, visible to both parties (§10) |
| Limitation statement misread | Stage 10 | Transcript key block carries the positive evidence (`IS §42`) |
| **Lost account, dead email** | Stage 11 | **Phase 7 requirement, not an edge case** |

## §17. Search and findability

By year 30 `/publications` will hold hundreds of documents, and navigation alone will not
reach them.

- **Site search is a first-class surface**, not a header afterthought. Bilingual, with
  Arabic normalisation (tashkīl-insensitive, alif/hamza-tolerant, tāʾ marbūṭah-tolerant) —
  without this, Arabic search returns nothing and appears broken.
- **Publications carry structured metadata** — type, date, version, status, owning
  authority — and are filterable by it.
- **Superseded documents remain findable** and are clearly marked as superseded, with a
  link to the current version. Withdrawing a document from search is a form of rewriting
  history.
- **Search must degrade to a static index** if the search dependency ever fails (Q4).

---

# PART VII — LONGEVITY

## §18. Content lifecycle

Every published item carries an **owning authority**, a **review interval**, and a **last
reviewed** date (`EB §11.7`, `EB §45.3`).

| Type | Review | On expiry |
|---|---|---|
| Policy, regulation | Annual | Escalates to the owning authority; **never silently expires** |
| Curriculum, assessment criteria | Annual (`EB §45.2`) | Revised on record |
| Fees, bands | Annual | Republished with the methodology's review date |
| Institutional Status callouts | **Quarterly** | Retired when the fact becomes real, or restated |
| Faculty profiles | On change | Removed on departure; **awards they assessed remain attributed** |
| Publications | Never expire | Versioned; superseded, never deleted |

**Nothing on the estate is undated.** A page with no review date is a defect (`EB §11.7`).

## §19. Designing for the maintainer in year 30

| Risk | Decision |
|---|---|
| Content trapped in a vendor | Content is **files in the repository**, rendered — never rows in a proprietary CMS (Q4) |
| Institutional memory loss | Every decision carries its **reasoning**, not just its outcome (`EB §47`) |
| Fashion drift | `IS §57` — refine, never rebrand |
| Feature accretion | §11's container discipline: four object types in Study, seven surfaces, no more |
| Dependency rot | Minimum viable dependency count; no framework in the public site's critical path (`EB §24`) |
| Link rot | §9's permanent redirect map |
| **Knowledge in one person's head** | Every surface has a **named owning authority** in `EB §44.1`, not an individual |

---

## Confidence register

| Decision | Confidence | What would change it |
|---|---|---|
| Three experiences + one utility | **High** | — |
| Relationship model replaces role portals (§6, §10) | **High** | — the correctness argument is independent of the simplicity one |
| Verification as a separate host (§4) | **High** | — |
| No LMS as a separate system (§5.14) | **High** | — |
| No News/Blog at launch | **High** | Real institutional news to report → F-01 |
| 16 public routes | **Medium** | User testing at Phase 7 may show `/fees` is carrying too much after absorbing scholarships |
| Seven portal surfaces | **Medium** | Real teacher workflows may require an eighth; the container discipline should be tested before it is relaxed |
| Publications as files, not CMS | **Medium** | Non-technical staff authoring at volume may need an editing layer over the files — the *storage* decision stands regardless |
| Arabic search normalisation | **Medium** | Needs a native speaker's evaluation of real queries |

---

*Information Architecture v1.0 — 2 August 2026.*
