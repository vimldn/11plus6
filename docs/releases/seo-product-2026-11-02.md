# Product repair implementation — 2 November 2026

Status: published in PR46 and verified on production. The integrated build, desktop/mobile flows, eight PDF links and selected live practice passed. See the main SEO recovery release record and product browser verification.

Research before writing: `docs/research/seo-product-2026-11-02.md`. Existing canonical pages and the approved forest/ivory illustrated design are retained.

## Delivered

- All four subject hubs have direct practice/print actions and useful topic links near the start of the page. Ten maths and ten English shortcuts open existing matching lessons/guides. VR and NVR link to their introductory guides, checked practice and the new printable booklets. Unsupported universal timing, preparation-duration and unused question-count claims were removed from the subject UI data.
- `/papers` opens with four original subject sets, exact question counts and scope, separate question/answer downloads and one preview per set. Official familiarisation and past-paper links are clearly separate. The repeated complete lesson libraries were replaced with links to their canonical hubs, preserving the old `#topic-practice`, `#verbal-practice` and `#visual-practice` anchors. School names link to profiles and their official sources; shared practice buttons no longer pass a school ID or imply one fixed school-paper specification.
- `/mock-exams` provides real direct-start sets and a single-subject session picker. The old multi-select UI silently prioritised Maths; the new selection sends exactly the chosen subject/route. Reviewed maths, VR and NVR routes display their actual counts/timers; the English bank supports explicit question and timer choices. Untimed practice is available without personal data.
- School-context practice retains the selected school's context and assessment source panel, but uses explicit general-skill language, accessible controls, proper loading/error handling and no compulsory name/email collection. School type and session settings are not represented as a verified exam simulation.
- Added four static downloadable PDFs: a 12-question verbal starter and an eight-question diagram NVR starter, each with a separate worked-answer booklet. The questions come unchanged from checked original pools; the manifest records exact IDs and option order. The existing maths/English files are preserved.
- The existing visual PDF renderer accepts optional fonts for the static build. The new NVR PDFs embed fonts to prevent substitution problems; browser PDF calls retain the original two-argument API and do not download the static build's font files. Diagram geometry and answer keys are unchanged.

## Validation completed

- `npx tsc --noEmit`: passed after the product components and helper modules were changed; final integrated check remains with root.
- `node scripts/check-verbal-practice.cjs`: passed. Existing independent checks cover all 234 owned VR questions, code/sequence calculations, semantic keys and supported retry/exclusion behavior.
- `node scripts/check-visual-practice.cjs`: passed. Independent transformation checks, unique options, rendered diagrams, retry and saved-state guards.
- `node scripts/check-visual-patterns.cjs`: passed. Every sequence transition and every matrix row/column checked independently.
- Public destination review: the 24 indexable topic/guide destinations in `lib/subjectHubContent.ts` resolved against the existing published blog/lesson inventory; no draft lesson targets. The eight quiz destinations use existing reviewed VR/NVR topics.
- `node scripts/build-reasoning-printables.cjs`: passed. Exact selected question IDs recorded in `docs/paper-audit/reasoning-printables-2026-11-02.json`; no duplicate IDs within either set.
- All 22 final PDF pages rendered and visually inspected: verbal questions 3 pages, verbal worked answers 3, NVR questions 8, NVR worked answers 8. An orphan heading and unembedded-font substitution were corrected before the final inspection. No clipped questions, overlapping diagrams or missing answer text observed.
- React best-practices review applied: single source of selected subject, state changes in event handlers, aborted school fetch on unmount, no compulsory data writes, labelled controls, explicit button types and selected states, native answer disclosures, separate catalogue imports to avoid bringing diagram code into the mock picker unnecessarily.

## Integrated browser checklist — completed

1. At desktop and mobile widths, open `/papers`, expand a text sample and the NVR sample, then open each of the eight question/answer PDF links. Confirm the school search and `?highlight=habs-boys` destination still work.
2. On `/mock-exams`, switch the subject from Maths to English, then VR and NVR; confirm one selection and the displayed count/timer agree with the started route. Start without an email/name. Check timed and untimed behavior and the answer review.
3. On `/mock-exams?mode=school`, switch category/school, select a subject and start without personal details. The school guidance should remain distinct from practice settings. Confirm `/api/schools` errors have a usable fallback.
4. On each subject hub, follow one topic/guide link and its print link. Check no mobile overflow in the masthead, topic links, visual answer options or source guidance.

No ranking improvement, educator approval or complete-syllabus coverage is claimed by this implementation.

Completed results: `docs/releases/seo-product-browser-verification-2026-11-02.md` and `.json`. Production evidence: `docs/releases/seo-production-verification-2026-11-02.json`.
