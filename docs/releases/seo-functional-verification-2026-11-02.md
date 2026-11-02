# SEO recovery: independent functional verification

Date: 2 November 2026. Target: the shared working copy served at `http://127.0.0.1:3026`. This records local verification; it is not a production deployment check.

## Browser checks completed

Playwright/Chromium completed the following paths. All non-local browser requests were intercepted and blocked. The run recorded no page exceptions and no attempted external requests.

| Path | Actual result |
|---|---|
| Privacy choice | Selected **Essential only**. The stored choice was `denied`, the GA disable flag was true, and no Google tag script was present or requested. |
| Fractions practice | Opened `/quiz?paper=maths-generated&mode=practice&topic=fractions`. Solved all ten questions directly from the visible fractions and amounts, without reading stored answer keys. Every answer received correct feedback and the result was **10/10**. |
| Question transitions | After each Next action, waited for the next question counter and the replacement stem before reading or answering. This avoids mistaking an outgoing animated question for the next question. |
| Resume | Reloaded after three answers. The prompt reported **3 of 10 answered**; resuming restored question 4, its same stem and the three previous answers. |
| Completion and review | Completion cleared the active draft. Results loaded, all ten review navigator entries were correct, the final worked explanation was visible, and the zero-mistakes filter displayed its empty state. |
| Saved attempt | Saved the completed attempt, reloaded and reopened its **10/10** result from browser history. |
| Mock picker: verbal reasoning | Opened `/quiz?paper=verbal-reviewed&mode=practice`; the actual counter was **Question 1 / 12**. |
| Mock picker: non-verbal reasoning | Opened `/quiz?paper=visual-reviewed&mode=practice`; the actual counter was **Question 1 / 8**. |
| English API | Posted a general English multiple-choice request for 20 questions. Received **200**, 20 questions, four options per question, an included answer and an explanation. Metadata identified the reviewed general bank and did not claim a verified school simulation. This checks response structure, not a fresh subject-specialist audit of the entire bank. |
| Invalid API body | A literal JSON `null` request returned **400** with `Expected a JSON object`, confirming the subsequently added body guard was active locally. |
| Tutor enquiry UI | Intercepted `/api/leads` in the browser. A mocked **502** displayed an error; a mocked **200** displayed success. The payload carried the parent name and notes without mislabelling the parent as a child. No request reached the live lead endpoint or Apps Script. |

The ten independently calculated answers in this run were: 7/9 of 81 = 63; 2/5 of 65 = 26; 7/10 of 90 = 63; 6/8 of 160 = 120; 5/8 of 120 = 75; 4/5 of 100 = 80; 9/10 of 190 = 171; 1/5 of 100 = 20; 6/8 of 128 = 96; and 6/7 of 77 = 66.

## Lead-handler isolation check

Loaded the TypeScript lead handler with a mocked `NextResponse` and mocked outbound `fetch`. Invalid email, null input and malformed JSON each returned 400. Mock delivery success returned 200; mock HTTP failure and a thrown network error each returned 502. The captured error logs contained no submitted email. These checks exercised handler branches without delivering or collecting any real enquiry.

## Independent review findings and disposition

- The consent click handler initially classified paper-based verbal/non-verbal practice links as maths. The integrating task corrected the mapping to inspect the `paper` parameter; the correction was seen in source. No opted-in GA collection was run.
- Making `schoolId` optional initially left a null-body dereference in the generation API. The integrating task added an object guard; its 400 response was observed in the browser/API run above.
- Completion tracking used the outer route mode, which could classify an untimed follow-up launched from a timed session as an exam. Reported for correction to `result.mode`.
- The new API-first general-practice request lacked a timeout before its local fallback. Reported for an eight-second timeout. The final two corrections are owned by the integrating task and were not represented as browser-tested here.

Temporary detailed evidence: `/tmp/11plus-independent-browser-review.json` and `/tmp/11plus-lead-route-mock-review.json`. These files are audit evidence, not runtime dependencies. Combined build, final source checks and production verification remain release-task responsibilities.
