# Phase 4 — Adversarial Peer Review

**Version 1.0 · 2 August 2026**
Review of `docs/03-institutional-identity-system.md` v1.0, conducted as though examined by
ten external panels.

**28 findings. 0 critical, 12 high, 13 medium, 3 low.**
**Eleven fixed in this commit. Seventeen registered with an owning phase.**

Three findings are **internal contradictions in my own document** — the identity system
said two incompatible things. Those are the most valuable findings here, because nobody
outside would have caught them until production.

---

## Summary

| Panel | Findings | Worst | Verdict |
|---|---|---|---|
| Institutional historians | 4 | 🟠 High | Concept sound and verifiable. Attribution over-confident in three places. |
| Islamic scholars | 4 | 🟠 High | No propriety breach found. Two matters require a real scholar, not a simulated one. |
| Arabic typographers | 4 | 🟠 High | **One direct self-contradiction.** One genuine gap in vocalised UI text. |
| Branding experts | 3 | 🟡 Medium | Strong. Sub-brand and co-branding lockups missing. |
| Accessibility specialists | 3 | 🟠 High | Good. One non-visual identity gap; one standards question. |
| Print production | 3 | 🟠 High | **One technical spec is simply wrong.** One serious supply risk. |
| Cybersecurity | 4 | 🟠 High | Authentication model excellent. Key management underspecified. |
| Admissions professionals | 2 | 🟠 High | Certificate honesty may be read as weakness by foreign registrars. |
| Accreditation reviewers | 2 | 🟡 Medium | Register permanence unstated. |
| Prospective students (4 regions) | 4 | 🟠 High | **"College" means opposite things in our two largest diaspora markets.** |

---

## 🟠 High

### T-4 · Arabic typographers — the system contradicts itself on ruqʿah *(FIXED)*

**Finding.** `IS §27` lists **Aref Ruqaa** as the "Arabic ceremonial" face. `IS §28.2`
states **"ruqʿah never institutionally."** The same document assigns ruqʿah the most
formal role in the system and then bans it.

**Who is right: §28.2.** Ruqʿah is historically an *administrative and rapid-handwriting*
script — the script of clerks, notes, and speed. It is not a ceremonial script. Using it
for seals and graduation documents inverts its actual register. It is a common modern
misuse, driven by Aref Ruqaa being one of the few high-quality free display Arabic faces —
availability masquerading as suitability.

**Fix applied.** Aref Ruqaa removed from the system entirely. Ceremonial typesetting is
**Amiri**; ceremonial *lettering* on the seal is commissioned **thuluth** (§20), which is
the tradition's genuine ceremonial script. One fewer typeface, and the one removed was the
only one that could not be historically justified.

### P-3 · Print production — the guilloche specification is wrong *(FIXED)*

**Finding.** `IS §35.2` specifies the security guilloche at "dense — 1 n spacing." At the
print scale of `1 n = 2 mm`, that is a 2 mm lattice. **Real security guilloche uses line
weights around 0.08–0.15 mm.** A 2 mm pattern is a decorative border that any office
printer reproduces perfectly. As specified, the feature provides no security at all.

**Fix applied.** The security derivative is separated from the ornamental pattern and given
its own parameterisation: line weight 0.10 mm, spacing 0.25–0.40 mm, generated from the
same rhombic geometry but at a scale two orders of magnitude finer. The ornamental
densities (sparse/medium/dense) remain for their own purposes.

### H-2 · Institutional historians — attribution stated too confidently *(FIXED)*

**Finding.** `IS §8.1` attributes al-khaṭṭ al-mansūb to Ibn Muqla as settled fact. The
scholarship is more careful: **Ibn Muqla *or his brothers*** are considered the
originators, and the system was refined substantially by Ibn al-Bawwāb. A historian would
mark this down, and `EB §46` requires us not to overstate.

**Fix applied.** Attribution hedged to match the sources, with the refinement lineage named.
The symbolic argument does not depend on sole authorship, so nothing is lost by stating it
accurately.

### H-3 · Institutional historians — thuluth proportion, naskh wordmark *(FIXED)*

**Finding.** The mark uses the **7-dot alif** — the *thuluth* proportion. The wordmark is
drawn in **naskh**, whose alif proportion differs. The document presents both as one
"proportional system" without acknowledging that it has mixed two scripts' metrics.

**Fix applied.** Stated as an explicit design decision with its reason — the 7-dot alif is
adopted as the *institution's* module because thuluth is the ceremonial standard from which
the seal derives, and the naskh wordmark is optically fitted to that module rather than
metrically derived from it. Declared, not disguised.

### S-1 · Islamic scholars — the mark must be verified by a calligrapher for unintended reading

**Finding.** An isolated vertical stroke with a dot placed below and to one side risks being
read as a *letter* rather than as a *measuring diagram* — particularly by a reader
encountering it without context. The document asserts (`IS §10`) that the mark "is
deliberately not a word," but that assertion has not been tested with anyone qualified to
judge it.

**Remedy.** The commissioned calligrapher (`IS §58`) is briefed to confirm explicitly, in
writing, that the mark cannot be read as any letter, ligature, or abbreviation in any of
the six scripts. **If it can, the dot's position changes.** This is a gate on the
commission, not a note. **Owner:** Phase 4 execution. **Registered.**

### S-2 · Islamic scholars — using the dotting system as a brand device requires a scholar's view

**Finding.** `IS §8.2` builds the institutional symbol on *iʿjām* — the dotting system
introduced specifically to protect Qur'anic recitation. Using an instrument created to
guard the Qur'an as a commercial identity device is defensible (the dot is orthographic
apparatus, not sacred text) but **it is not mine to declare defensible.**

**Remedy.** Referred to a named qualified scholar before the mark is finalised, alongside
D-05. My assessment is that it is sound — the dot is a tool, not a text, and honouring the
tool honours its purpose — but `EB §5.7` and `EB §46` both require that this comes from a
scholar, not from me. **Owner:** Phase 2/4, with D-05. **Registered.**

### T-1 · Arabic typographers — bilingual wordmark optical matching is underspecified

**Finding.** `IS §12` sets the Arabic wordmark to "the same 7 n alif height as the mark."
Alif height is **not** an optical size match to a Latin small-cap line. Arabic and Latin
optical matching depends on the relationship between the Arabic baseline-to-loop height and
the Latin cap height — a genuinely subtle judgement that a single shared measurement does
not resolve. As written, the lockup will look wrong and no one will be able to say why.

**Remedy.** The calligrapher and a type designer determine the optical match on proof, at
three sizes (R3, R4, R5), and the resulting ratio is recorded as a fixed constant in the
asset library. Not derivable from first principles; must be seen. **Owner:** Phase 4
execution. **Registered.**

### T-2 · Arabic typographers — vocalised Arabic inside the UI has no specified face *(FIXED)*

**Finding.** `EB §11.2` mandates fully vocalised (*mushakkal*) Arabic in all teaching
material at Levels 1–4. `IS §27` assigns **Kitab** to vocalised teaching text and **IBM
Plex Sans Arabic** to all UI. **In the LMS these are the same surface.** A vocalised
sentence inside a UI component has no specified face, and Plex Sans Arabic — a
sans-inflected design — handles heavy tashkīl poorly at UI sizes.

**Fix applied.** Explicit rule added: any element containing tashkīl switches to the
teaching face regardless of whether it sits in chrome or content, at the vocalised
size/leading minimums (`EB §15.3.2`). A `.text-mushakkal` class carries this and is the only
correct way to render vocalised Arabic anywhere in the system.

### X-1 · Accessibility — the mark has no non-visual identity *(FIXED)*

**Finding.** At R1 the mark is a 4-pixel rhombus. To a screen-reader user, and to a
low-vision user, it is indistinguishable from a bullet, a decorative glyph, or nothing at
all. The `IS §6` kernel is entirely visual; **a blind student has no access to any part of
the identity.**

**Fix applied.** Non-visual identity anchors specified: every SVG carries a `<title>`; the
mark's accessible name is the institution's name in the page's language, never "logo"; a
single consistent alt-text convention across all surfaces; and the institution's name is
always present as real text adjacent to the mark, never replaced by it.

### P-2 · Print production — the certificate stock may not be sourceable in the home market

**Finding.** `IS §41` specifies 250 gsm, ≥25% cotton, **unbrightened** stock, plus a
**UV-reactive ink** element. Unbrightened cotton rag is a specialist stock, and UV printing
requires a press with that capability. Neither may be readily available in Nigeria at
reasonable cost or lead time — and certificates are issued continuously, not once.

**Remedy.** Phase 10 sources and tests locally before the specification is frozen, with a
documented fallback: if unbrightened cotton is not sourceable, the UV feature carries more
weight and the stock requirement relaxes to ≥25% cotton at any whiteness. **The
register (§24 L6) remains the primary control regardless** — which is precisely why the
authentication model was built that way. **Owner:** Phase 10. **Registered.**

### C-1 · Cybersecurity — the DNS-published key can be spoofed *(FIXED)*

**Finding.** `IS §23` publishes the institutional public key in a DNS TXT record. **Without
DNSSEC, a TXT record is trivially spoofable** by an attacker with network position — and
the key is the root of trust for every credential we ever issue.

**Fix applied.** DNSSEC is mandatory on the primary domain, stated as a hard requirement,
with the HTTPS-published key list as the authoritative source and DNS as a convenience
mirror only.

### C-2 · Cybersecurity — key rotation breaks historical credentials *(FIXED)*

**Finding.** `IS §23` requires "a published rotation policy" but does not say what happens
to credentials signed with a retired key. If a rotated key is simply replaced, **every
credential issued before the rotation becomes unverifiable** — silently, and years later.

**Fix applied.** A signed, append-only **key history** is published: every key with its
validity window, each new key signing the previous one's retirement. Verification checks the
signature against the key valid *at the credential's issue date*, not the current key.
Retired keys are never deleted. Revoked-for-compromise keys are marked distinctly from
retired-on-schedule keys, and credentials under a compromised key are re-issued rather than
trusted.

### A-1 · Admissions professionals — our honesty may be read as an admission of weakness

**Finding.** `IS §41` mandates on every certificate: *"This is an institutional award… It
is not an ijāzah and confers no chain of transmission."* Correct under `EB §36.2`, and
right. **But a foreign admissions officer skim-reading it may translate it as
"unaccredited, do not credit."** The honesty is real; the risk that it is misread as
disclaimer-of-worthlessness is also real.

**Remedy.** The transcript key block (`IS §42`) must do far more work than currently
specified: state the assessment method, the notional learning hours, the mastery standard,
the assessor qualification, and explicit comparability language framed for a registrar.
**The limitation statement stays exactly as written** — we do not soften it. We make the
positive evidence stronger alongside it. **Owner:** Phase 3, with finding A-1 from the
Phase 1 review. **Registered.**

### PS-2 · Prospective students, Arab world — the affiliation risk is sharper in Arabic

**Finding.** `EB §8.5` mandates a public non-affiliation statement. But an Arabic-speaking
prospective student reading **كلية المدينة الدولية** carries a far stronger default
expectation of Madinah/Saudi connection than an English reader does — the name reads as a
place-claim in Arabic in a way it does not in English.

**Remedy.** The `EB §8.5` disclosure is not merely translated but given **greater
prominence on Arabic-language surfaces than on English ones** — on the Arabic About page it
appears above the fold, not in a later section. This is the only place in the system where
Arabic and English surfaces deliberately differ in emphasis, and the reason is recorded.
**Owner:** Phase 5. **Registered.**

### PS-3 / PS-4 · Prospective students, UK & North America — "College" means opposite things

**Finding.** In the **UK**, a "college" is typically further education for 16–18 year olds
or a constituent part of a university — our name **under-signals** to a British audience.
In the **United States**, "college" means a degree-granting undergraduate institution — the
same name **over-signals**, and in several states the term is regulated for institutions
serving residents.

**One word, opposite errors, in our two largest diaspora markets** (`EB §43` phases 2 and
3). This was not visible from the naming study, which assessed the word globally rather
than per-market.

**Remedy.** Not a rename — the name is decided and the study's reasoning holds. Three
mitigations: (a) the descriptor "…of Arabic and Qur'anic Studies" already does most of the
work and must never be dropped in these markets; (b) market-specific About copy states
plainly what we are and are not; (c) **D-03 must now cover US state-level regulation of the
term, not only Nigeria and the UK.** D-03 scope widened. **Owner:** D-03 / Phase 7.
**Registered.**

---

## 🟡 Medium

| ID | Panel | Finding | Disposition |
|---|---|---|---|
| **H-1** | Historians | The `IS §19` seal diagram shows "١٤٤٨ / 2026" while the surrounding text says the year is left as `[YEAR]` pending D-01 — **the document contradicts itself, and on the one element that is a claim about time** | ✅ **Fixed** — diagram now shows `[AH] / [CE]` |
| **H-4** | Historians | The 70° nib angle is asserted as "the classical naskh nib angle." Nib angle varies by script, region, and calligrapher; there is no single classical value | ✅ **Fixed** — restated as a system decision informed by practice, not a historical fact |
| **S-3** | Scholars | No rule forbidding Qur'anic text inside a seal. `EB §5.1` covers Qur'anic text generally but the seal is a distinct, permanent, physically-struck object | ✅ **Fixed** — explicit prohibition added at `IS §18` |
| **S-4** | Scholars | If ijāzah is ever issued (`EB §36.3`), the ceremonial seal must not itself imply a chain | ✅ **Fixed** — rule added at `IS §20` |
| **T-3** | Typographers | **Kitab**'s licence and availability are asserted as OFL but unverified | ✅ **Fixed** — marked unverified; Amiri with full tashkīl specified as the verified fallback |
| **B-1** | Branding | No lockup specified for the four Schools (`EB §8.3`) | Registered — Phase 4 execution |
| **B-2** | Branding | No co-branding lockup with Sulaimiy Education Group, despite `NS §13.1` requiring the endorsement line on several surfaces | Registered — Phase 4 execution |
| **X-3** | Accessibility | ID cards carry a QR but no large-print number or tactile marker for students who cannot use it | Registered — Phase 7 |
| **C-3** | Cybersecurity | The verification token's entropy is unspecified; rate limiting alone does not stop distributed enumeration | ✅ **Fixed** — ≥128-bit random, not derived from the certificate number |
| **C-4** | Cybersecurity | No stated position on whether the verification endpoint logs verifier IPs — a third-party privacy question | Registered — Phase 9, with peer-review C-1 |
| **R-2** | Accreditation | Register retention is unstated. A credential register must be **permanent**; a certificate outlives the institution's systems | ✅ **Fixed** — permanence and succession commitment added at `IS §24` |
| **PS-1** | Students, Africa | If certificates are costly to produce, Band D/E students may face a certificate fee — which would breach `EB §37.3` and `EB §37.6` | ✅ **Fixed** — certificate production is included in tuition at every band and every tier. Never a separate fee |
| **A-2** | Admissions | No pathway for certified true copies, notarisation, or apostille — routinely required by foreign universities and employers | Registered — Phase 7 |

## 🟢 Low

| ID | Panel | Finding | Disposition |
|---|---|---|---|
| **B-3** | Branding | No merchandise or apparel policy; embroidery minimums exist but no governing rule on what may carry the mark | Registered — Phase 4 execution |
| **R-1** | Accreditation | Award titles are not yet mapped to a framework level — depends on Phase 1 finding A-1 | Registered — Phase 3 |
| **X-2** | Accessibility | Arabic Braille standards vary by country; the Nigerian standard must be confirmed rather than assumed | Registered — Phase 10 |

---

## What this review could not do

Per `EB §46`, stated plainly:

- **No calligrapher reviewed the mark.** S-1 and T-1 both require one and neither is
  resolved. The mark is a specification, not a finished drawing.
- **No qualified scholar reviewed S-2.** The simulated Shariah panel is an adversarial
  reading and is **not** a Shariah board. It must never be represented as one.
- **No print engineer reviewed the die, stock, or guilloche specifications.** P-3 was
  caught by arithmetic, not by expertise; there may be more like it.
- **No physical colour verification.** `IS §31`'s Pantone column remains unverified and
  blocking.
- **No real prospective students were consulted.** The four regional panels are reasoned
  from market knowledge, not research. PS-3/PS-4 in particular deserve testing.

---

## Phase 4 status

**Complete, with eleven fixes applied and seventeen findings owned.**

**Two gates before any asset is produced:**

1. 🔴 **The calligraphy commission cannot begin** until S-1's letter-reading confirmation
   is written into the brief (`IS §58`).
2. 🔴 **No print run** until `IS §31`'s Pantone values are physically verified and P-2's
   stock is sourced.

Neither blocks Phase 5, which is documentation and information architecture.

**Phase 5 may begin.**

---

*Phase 4 Peer Review v1.0 — 2 August 2026.*
