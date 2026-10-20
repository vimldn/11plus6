# Paper quality audit — 20 October 2026

Base: 7bb018fe2c216b8904938afa62b86b2e66cf317d. Scope: generator code, local bank sampling, scoring/review code and availability of paper downloads. No open PR existed at start. This is the first implementation stage of the owner's approved paper programme, not a claim that the bank or 2027 school specifications are verified.

## Evidence and limits

`samples-2026-10-20.json` preserves 12 deterministic **local-bank** papers: four subjects × multiple-choice, true-false and fill-in-the-blank; 25 questions each, 300 instances. All 300 stems and answer keys were screened for correctness, missing context and ambiguity. This was an initial editorial screen, not educator approval; explanations have not all been independently checked. No live paid AI outputs were sampled, and no claim is made about AI error frequency. `scripts/audit-paper-samples.cjs` reproduces sampling on its checked-out revision; use the recorded base commit to reproduce the original sample. Current code excludes quarantined families, so a later run differs. Do not overwrite the dated baseline.

The structural bank scan found eng-ord-003 has repeated options. Repeated words can be legitimate in sentence ordering, so this is an interface/key identity risk to investigate, not proof the answer is wrong.

## Findings and first patch

| Priority | Finding and evidence | Action / status |
|---|---|---|
| P0 | Timed MC/TF renders green/red answer states immediately; text input also shows correctness icons. | Hide correctness styling/icons until review in exam mode; retain neutral selected state. Practice feedback retained. Client still receives keys: this is practice, not secure assessment. |
| P0 | Free text accepts any string containing a key longer than 3 chars: `not kind` matches `kind`. Review instead uses exact equality and contradicts quiz scoring. | Shared conservative matcher used by quiz and review; reject substrings, normalise text case/space and ordering separator space. Existing saved results have no format metadata; no retroactive regrading claimed. |
| P0 | vr-mc-154 keys ANT in PLANET (not contiguous); vr-tf-105 keys Friday for day18 with Monday day1 (Thursday); vr-tf-129 calls pens cheapest without comparing pens and books. | Exclude source families and their derived MC/TF/FITB forms. See questionQuarantine.ts for all reasons. Sources preserved for rewrite. |
| P0 | eng-fitb-068 asks only which word is spelled correctly, but supplies no candidates; eng-fitb-059 requires one unspecified semicolon sentence. VR FITB can key “All of these” without choices. | Specific known source families quarantined; wider converted free-text bank needs authored prompts and answer rubrics before certification. Not fixed by a more permissive string matcher. |
| P1 | AI output only requires a nonempty array. Missing explanations, absent MC keys, duplicate IDs, duplicate options, duplicate stems and incorrect count can reach children. | Reject structurally malformed output; retain existing fallback path. Never pad an AI paper with unlabelled bank questions. Structural validation is NOT factual verification. |
| P1 | short-answer accepted by API/types but has no input control. | Render/reset the text input for short-answer too. Local bank still has no dedicated short-answer collection. |
| P1 | School API fallback drops difficulty. | Pass requested difficulty through. Difficulty itself remains a positional bank slice, not calibrated difficulty. |
| P1 | Most English FITB items allow multiple correct phrasings but store one exact key. Maths rejects 4670 for 4,670 and 4.25 for 4 1/4. | Pending: typed rubrics, numeric/unit parser and authored acceptable alternatives. Do not use broad substring/fuzzy scoring. |
| P1 | NVR is mostly verbal descriptions, missing necessary diagrams; nvr-086 omits starting colour; nvr-026 does not determine one quadrilateral. | Quarantine confirmed families. Actual SVG diagrams and diagram checks needed before claiming visual-test simulation. |
| P1 | School generation supplies a school name and optional short summary, not a verified paper specification. Habs JSON contains only schoolId/summary. | Pending official-source specification registry with test/entry year, sources, review date, format, navigation, section weights and limitations. |
| P1 | Topic requests with zero matches silently use the full bank. Random-sort sampling is biased; difficulty slices depend on array order. | Pending sampler redesign with explicit metadata, reliable shuffle and honest availability. |
| P1 | Question service drops API warning/source metadata and silently falls back. | Pending visible provenance and truthful unavailable/fallback states. |
| P1 | No active downloadable paper/PDF implementation found in paper selector; SchoolMockStart claims PDFs are used server-side, but generate route sends only text summaries. | Pending: remove unsupported claims following page brief, build print layouts and separate answers. This run did not produce or test PDFs. |
| P1 | Quiz attempt state is in React memory; no attempt-level persistence in QuizArea. | Pending save/resume, unanswered review, revisable answers and timing reload tests. |

## Question exclusions

Confirmed defective/ambiguous families are listed with reasons in data/questionQuarantine.ts. Quarantine is reversible and does not delete source records. Derived versions inherit the faulty premise/key and are excluded as a family. This is a targeted hold, not certification of remaining items. Arithmetic samples otherwise screened correctly; maths080 needs an explicit positive-root restriction. Some maths items omit units in their answer key and need authored rubric work.

## Next implementation milestones

1. Complete independent answer/explanation checks of the sample, then all candidate bank items. Record individual checks and draft/reviewed status. Sample live AI outputs separately with source/model metadata. Stop serving any newly discovered faulty family.
2. General maths pilot: 30-question authored blueprint, 120 approved questions distributed across number, fractions/decimals/percentages, ratio, algebra, geometry, measurement and data. These are design targets, not completed inventory.
3. Add numeric/unit and explicit acceptable-answer rubrics; one scoring engine across quiz, review and exports. Test wrong-sign, wrong-unit, fractional equivalence and unsupported prose cases.
4. Reliable practice/timed journeys, save/resume, revisable answers, unanswered summary and printed paper/separate key. Mobile/desktop/keyboard and timer checks.
5. Topic feedback → existing lesson → fresh checked questions. No fabricated percentiles/pass probabilities.
6. Three school/consortium routes only after official sample and admissions verification for exams taken in 2027; distinguish entry year and unconfirmed details. SERP briefs before new guide/lesson copy. Do not claim school fidelity from prompt labels.

No new SEO pages in this patch. Existing blog queue untouched. No educator sign-off or complete exam audit claimed.
