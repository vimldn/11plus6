# Maths marking and pilot release — 20 October 2026

Base production commit: e99c010269c878904891ee6e5e041ff21913710d. No open PRs at start. Scope: existing maths bank, explicit marking rules, balanced pilot through existing /quiz, link from existing maths hub. No new SEO article, school claim, blog audit or additional automation.

## Deliverables

- Shared scorer accepts exact equivalent integer/decimal/fraction/mixed-number values only for explicitly reviewed FITB question IDs in data/mathsMarking.ts. Fraction requests retain fraction syntax; decimal requests do not accept a fraction. No fuzzy matching or execution of expressions.
- Strict comma grouping, sign handling, rational arithmetic, nonzero denominators; finite length bounds. Optional units only where the explicit rubric allows their omission. Wrong dimension/currency rejected. This stage does not convert between units or grade algebraic expressions, lists, language synonyms or method marks.
- 120 existing MC questions checked for the stem, key, alternatives and explanation. Independently calculated results are retained in scripts/check-maths-pilot.cjs; question fingerprints in maths-pilot-reviewed-2026-10-20.json require re-review if any selected question changes. This is assistant editorial checking plus executable arithmetic checks, not qualified educator approval or empirical difficulty calibration.
- 30-question pilot: 8 number, 8 fractions/decimals/percentages, 3 ratio/proportion, 3 algebra, 3 geometry, 3 measures/money, 2 data. Fisher–Yates sampling without replacement. 45 minutes is an author-chosen practice duration, not a school requirement. 100 test seeds checked for count, uniqueness and exact topic balance. The pool reuses existing questions rather than publishing 120 near-duplicate pages.
- Link from /subjects/maths to /quiz?paper=maths-pilot. Practice variant: /quiz?paper=maths-pilot&mode=practice. Pilot uses checked local questions regardless of conflicting subject/count/school query parameters.

## New exclusions

Seven source families held: math038 (283.2 whole items without rounding),164 (wrong best-value key),189 (pack wording does not require LCM),226 (19−2=17 absent from options),232 (unspecified isosceles apex/base),236 (positive and negative roots),242 (impossible sorted data and contradictory answer). Six additional MC-only IDs held for equivalent correct options:172,177,217,224,240,247. Their otherwise valid derived forms are not excluded solely for the MC alternatives. Previously held items stay held. No source records deleted.

The scalar equivalence scanner checked all 250 MC records and found seven affected items including the already-held018. This is not a full semantic audit of all250. Remaining original cross-subject sample explanations and live paid AI output still need separate review.

## Checks and limits

Run scripts/check-maths-pilot.cjs, scripts/check-paper-quality.cjs, scripts/check-release-gates.cjs, production build/type checks and diff whitespace checks. Record GitHub/Vercel and public interaction outcome in the PR before claiming publication.

Still pending: print/download flow, attempt save/resume, review-before-submit, complete bank audit, open-ended language rubrics, general unit conversion, diagrams for NVR, empirically calibrated difficulty and school-specific specifications verified for exams taken in 2027. None is implied by this pilot.

## Live verification follow-up

PR12 merged as c0f935907e103d5b5a33de8454f7001c5da808c7, Vercel production deployment 3YUW6TZ1HpEj19hHh1vFWrsLydSi succeeded. Hub link opened the 30-question, 45-minute pilot. Timed selected option remained neutral. Live FITB accepted 1211.0 for 1,211 and 2490/2 for 1,245; total score and answer review correctly showed 2/2. However the independent ResultsScreen topic counter still used string equality and showed 0/2. Follow-up replaces it with the same rubric-aware scorer and adds a regression fixture. Do not claim the topic display fixed until that follow-up deploys and is checked.

Separately observed legacy maths hub claims still require editorial review (large question-count claim, generic exam-format FAQs and testimonial provenance); this pilot does not validate that older surrounding copy.
