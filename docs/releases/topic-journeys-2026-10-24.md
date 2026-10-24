# Topic practice and learning journeys - 24 October 2026

Owner authorised immediate implementation of the practice-library and learning-journey priority. Base main d923e5cb977e825fd092b37fbbdc5afec9d7b40f; no open PR at selection. Pre-implementation research: ../research/topic-journeys-2026-10-24.md. Current live sitemap refreshed and retained in url-inventory-journeys-2026-10-24.txt: 204 unique published canonical URLs.

## Scope
- /papers and /subjects/maths expose eight focused maths drills: order of operations, fractions of amounts, percentages of amounts, simple equations, multi-step sharing, money/change, rectangle area and mean averages.
- Each drill selects10 distinct original parameterised questions on that skill, in untimed feedback mode or a clearly labelled15-minute practice session. These reuse the existing independently checked4,114 variants; they are not4,114 newly authored questions. Mixed16-question sessions remain available. Unknown topic requests produce an explicit unavailable notice instead of a different set.
- Existing fractions/percentages lessons and order-of-operations/algebra/multi-step blogs link to the corresponding drill; drill headings link back to exact teaching where available and the parent directory. Money/area/mean drills use their worked explanations; no dedicated full lesson is claimed for those skills.
- /papers and /subjects/english show a three-step reading journey. All three published comprehension lessons retain their original passages,18 questions, answers and publication dates.
- English practice adds labelled writing space, model comparison, “understand”/“revisit” self-review, current-session summary, flagged-only view and retry that clears flagged drafts/closes answers. A repeat copy of the original passage is available beside the answer activity. No exact-string grading, numerical English mark or claim of mastery.
- Written answers and self-review choices use in-memory React state only. They are not saved across navigation or sent to a server/analytics. Existing answer-reveal analytics receives only slug, subject and question number.

No new indexable pages, culls or redirects; quiz sessions remain noindex and absent from sitemap. No paid API, account provider or new credentials. No claim that this completes cross-device accounts, full subject syllabuses, reasoning visual banks or admissions verification. Today's daily article output is not counted again. Legacy audit queue unchanged.

## Verification before release
- Production build passed including TypeScript and all236 generated pages/routes.
- check-topic-journeys.cjs:800 sampled single-topic sets,10 distinct question IDs each; correct narrow topic; mixed16 preserved; invalid-topic guard; all exact guide targets published; three published English passages/18 original keys present.
- check-fresh-maths.cjs:4,114 variants independently recalculated, explanations checked;100 balanced mixed samples.
- check-practice-workflow.cjs: mistake selection, fresh follow-up exclusions, bounded saved attempts and API source notices; no paid API calls.
- Existing pilot, skill-blog, publication/draft gates and daily HTML checks passed.
- Rendered English pages each contain6 labelled textareas,6 initially closed model controls plus a closed original-passage disclosure, retry controls and ordered path. Both relevant maths lessons have reciprocal drills; both subject hubs expose the journey; sitemap remains204 published URLs with no quiz sessions.
- React/accessibility review: native labelled textareas and details; button type, aria-pressed self-review/filter state, status summary, disabled empty retry; no persisted child writing; pure shared selection helper; quiz key changes with query parameters and resets results/follow-up on topic navigation.

## Deployment outcome
Candidate prepared on isolated branch improve/topic-practice-journeys-2026-10-24. The final PR body for that branch records head/merge SHAs, Vercel outcomes and live browser/HTTP checks. This candidate ledger alone does not assert production publication; read the final PR before counting deployment. No repeated deployment approval is required under owner authorisation.
