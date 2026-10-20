# Maths completion release — 20 October 2026

## Scope
Complete the remaining102 of250 legacy MC answer reviews. Twelve further MC/TF/FITB families clarified:075,120,122,173,174,176,178,213,219,223,227,249. Ninety MC records retained unchanged. Cumulative MC outcome:210 checked unchanged,40 repaired;0 pending. Existing duplicates are records, not claimed unique learning tasks.

Checked204 related TF/FITB keys plus240 related forms from the original120-question pilot. Fixed FITB129 missing candidate set and FITB134 missing exclusion of1. With the84 related forms covered by previous28-family repair releases, all750 MC/TF/FITB answer keys have now been checked. This is mathematical answer review, not school-specific syllabus certification or educator endorsement.

Reviewed all50 ordering tasks. Corrected keys002,004,009,027,029,033,040,041,043,044; allow valid tied orders and independent listing steps. Clarified assumptions, units, direction and explanations where necessary. All1152 possible option permutations are independently evaluated, including invalid orders; omitted/extra-item responses rejected.

## Evidence and checks
Pre-writing brief: maths-completion-brief-2026-10-20.md. Per-question fingerprints: maths-completion-reviewed-2026-10-20.json. Run check-maths-completion.cjs plus existing wording, legacy-answer, pilot, workflow, paper-quality, topic-stat and fresh-maths checks. Production build and GitHub/Vercel release must pass before merge. Final deployment/live evidence belongs in the PR record so evidence-only changes do not trigger another build.

## Remaining product limitations
Free-entry algebra, coordinate/list and verbal answers still use conservative text matching; this release does not implement a general symbolic-equivalence engine. Advanced topics remain in the legacy bank and are not represented as universal11-plus requirements. Uploaded-paper provenance and school-specific2027 format validation remain separate work. English/VR/NVR and blog work are outside this release.

## Live-test follow-up
PR18 production verification exposed a missing rubric argument in QuizArea.handleOrderSubmit: the shared scorer passed exhaustive tests, but immediate practice feedback rejected an alternative tied order. Follow-up passes currentQ.marking just as text/MC handlers, review, topic statistics and mistake practice already do. Repeat the live Decimals ordering test with115%,1.2,1.25,5/4 before declaring completion.
