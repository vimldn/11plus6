# Practice workflow release — 20 October 2026

Authorised scope: answer quality, source honesty, broader generation, targeted follow-up, printing and saved progress. No new editorial articles or school-date claims.

## Implemented
- Seven held maths families repaired across MC, true/false and numeric free-text: 038, 164, 189, 226, 232, 236, 242 (21 format entries). Original source files retained for traceability; central bank applies reviewed replacements. Other holds remain.
- 4,114 finite original generated maths variations across eight skills. Sixteen-question mixed sets, two per skill; arithmetic, fractions, percentages, equations, multi-step sharing, money/change, rectangle area and mean. Generated geometry requests explicit units; algebra restricts inputs to positive, uniquely solvable equations. Not a complete exam or verified school specification.
- Missed-question repeat practice plus fresh variants for supported missed topics, excluding IDs from the previous set. Unanswered questions count as missed. Other missed topics are not silently replaced with unrelated work.
- General-bank topic miss returns no questions, not unrelated questions. Fisher–Yates sampling and authored difficulty tags replace random-sort/array-position difficulty. Tags are not calibrated exam predictions.
- Generation-source notices persist in results: written-summary AI with unverified semantics versus general-bank fallback. API explicitly reports no uploaded-paper ingestion or verified 2027 specification.
- Printable question-only preview during a quiz; separate worked-answer sheet after completion. Browser print/save-PDF control. No print-time answer leak during timed practice.
- User-triggered save of up to 20 completed attempts in the current browser, with date, score, mode, questions, answers and topic results. Reopen saved results. No account, cross-device sync or ranking/prediction claims. Storage errors and malformed history handled.

## Verification before release

All 4,114 displayed stems independently recalculated; explanation equations checked; 100 balanced samples. Seven repaired families checked across 21 formats. Follow-up excludes source attempt IDs, exact topic miss handling, saved-history capacity/deduplication/corrupt-data checks. Existing 120-question pilot fingerprints, scoring, topic statistics and publishing gates retained. Production build and live outcomes recorded on associated PR after completion.

## Pending, not represented as completed

Full semantic review of remaining English/VR/NVR and unaudited maths; complete original upload reconstruction and school-source ingestion; open-response rubrics; actual 2027 school specification verification. See source-reconciliation-2026-10-20.md for files actually located/read. No automatic publishing of recovered copyrighted source papers. No paid AI requests used during tests.
