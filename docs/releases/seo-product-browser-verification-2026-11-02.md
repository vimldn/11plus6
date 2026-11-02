# Product browser verification — 2 November 2026

**Result: all seven scoped flows passed.** Tested the running Next development server at `http://127.0.0.1:3026`, using Chromium at 1440 × 1000 and 390 × 844. This is local-development evidence, not evidence of production publication or search improvement.

**Story:** a parent finds original practice on the papers/subject hubs, opens an explained sample or PDF, or chooses a school context and starts general practice without entering personal details.

Google Analytics hosts were blocked and **Essential only** was selected. There were no analytics requests, lead requests or runtime page errors. The independent agent checked full quiz completion/resume/review and the general subject picker; those checks were not repeated here.

## Passed flows

| Flow | Evidence |
| --- | --- |
| Desktop catalogue | All four question previews and their nested worked answers opened. Text answers matched the selected samples; the NVR stem, four options and worked diagram rendered. |
| PDF access | All eight visible PDF targets returned HTTP 200, `application/pdf` and valid `%PDF-` bytes. Files ranged from 47,772 to 137,701 bytes. An actual catalogue click downloaded `maths-practice.pdf`. |
| School directory | Searching “Haberdashers” returned the Boys' and Girls' schools. A nonsense search displayed the empty state and no cards. Independent filter showed 33 cards. `?highlight=habs-boys` scrolled its school card into the viewport; all four practice links were general routes without `schoolId`. |
| Mobile catalogue | All four samples/answers opened at 390 px; document width stayed 390 px. Download links and NVR diagrams remained within the viewport. Screenshots were visually inspected. |
| Four subject hubs | All four print links reached the matching paper anchor. Representative real topic/guide clicks displayed the correct page heading. All 24 unique indexable topic/guide links returned HTTP 200 and a content heading. All four hubs stayed within 390 px. |
| School-context launch | Schools API returned 50 choices. Independent → Habs Boys updated the profile/source context. No personal-data inputs were present. Selecting Maths and 10 questions launched untimed practice; `/api/exams/generate` returned HTTP 200 with 10 questions and the first question rendered. No `/api/leads` request occurred. |
| School API failure | A browser-only simulated HTTP 503 showed the specific load error, links to general practice and school guides, and a disabled launch button. No server data or application code was changed for this simulation. |

## Observations and limits

- No functional product bug remained in these scoped flows. The first verification attempt had ambiguous nested-disclosure and route-announcer selectors; these were corrected. The final school-search check waits for hydration before typing after a full navigation, so it measures application behaviour rather than stale SSR cards.
- The dev browser reported an extra-server-attribute warning (`style` on the school-search input) during the catalogue pass. The isolated hydrated search/filter/highlight run produced no console errors and all interactions passed. No runtime exception occurred.
- Following the two repaired reasoning guides encountered `ERR_CERT_AUTHORITY_INVALID` for legacy external images on `files.autoblogging.ai`. This is an observed browser-environment asset failure, not proof of a production certificate problem. Affected URLs are retained in `verification-first-attempt.json`, including `what-is-11-plus-verbal-reasoning(fm56)_4.jpeg` and `what-is-11-plus-nonverbal-reasoning(wwhv)_4.jpeg`. The content and primary subject-hub artwork rendered. Production asset verification remains with the release owner.
- The simulated 503 creates an expected browser console resource error. An aborted maths PDF document request accompanies its successful browser download. These are recorded rather than treated as application failures.
- Previously completed PDF layout checks covered all 22 pages of the new VR/NVR question and answer booklets. This pass verified their web delivery and links, not their question accuracy afresh.

## Evidence

- `verification.json`: final seven-flow results, API/request evidence, destination and PDF inventory, screenshot paths.
- `verification-first-attempt.json`: original observations and corrected harness-selector failures, retained for transparency.
- `check.cjs` and `check-school-search.cjs`: verification scripts; no repository application files changed during this browser task.
- Screenshots: desktop/mobile catalogue, visual sample, maths sample, four subject hubs, school selector, first school-context question, API recovery state and highlighted school.

The development server is no longer needed by this verification task. Production build and release checks belong to the root release.
