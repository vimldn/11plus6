# 24 November 2026 — focused maths setup, before implementation

Current main6dbe85e (PR76); no open PRs. Read programme, audit closeout/queue,2November baseline and recent releases.99legacy repairs closed. English retrieval/inference/evidence and FDP conversions, multi-step problems and algebra already published. Live sitemap fetched24November:285URLs, retained in url-inventory-2026-11-24.txt. app/sitemap.ts excludes quiz attempts and uses existing canonical content routes. No new hub or article is needed.

## Selection and intent

Live GSC Web/all devices, exact URL-prefix, final-only through21November. Global /mock-exams28day impressions254→110, clicks1→0; maths hub28→53impressions,1→0clicks, position54.21→59.51. /papers separately372→803impressions but position46.69→59.88. Latest14days show better resource impressions/positions, not established recovery. UK daily averages and full periods are in gsc-2026-11-24.json. Country daily sums reconcile; country+page rows are not validated, so these landing-page figures are global. Figures are unchanged from yesterday's final coverage, not fresh deterioration since PR76.

Two existing pages selected: https://www.11plusexampapers.com/mock-exams (configure an original session) and https://www.11plusexampapers.com/subjects/maths (choose a method and focused practice). Existing implementation supports eight10-question maths sets in the quiz but the main setup only selects a16-question mixed set. Make this existing capability directly configurable, with matching scope/count/timer and method link. This is a usability hypothesis informed by weak search visibility, not a proven explanation of ranking losses.

## Live search research,24November, before writing

Queries: “11 plus maths free online practice questions timed mock test UK”; “11 plus maths practice topic questions worked answers free”. UK-intent results inspected through live search; no precise GoogleUK ranking or search-volume claim.

- https://myfreeschool.co.uk/online-tests/maths — read full directory: separates mixed mocks from topic tests, topic categories and concise descriptions. Directory depth rather than an essay; roughly several hundred words of useful navigation.
- https://www.eagleteach.com/practice-tests/11-plus-maths — read page:20-question/20-minute launch summary, instructions, topic coverage, worked feedback and FAQs. Medium explanatory page with interactive start, approximately hundreds of words plus site navigation. Its admissions/provider and readiness claims are not adopted.
- https://prismlearning.co.uk/11-plus/practice — read full topic catalogue: worked examples, short practice, mixed mini-paper and subject lists. Compact directory with several hundred words; no need to match its claimed topic frequency or percentages.

Intent: choose a question type, know the length/timer, answer independently and review the method. Entities/relationships: maths topic→original set→question count→untimed feedback or timed review→worked method→retry. Related questions: one topic or mixed; how many questions; when answers appear; whether official; what follows a mistake. Original value: the same supported topic can be chosen from the maths hub or main setup, while preserving exact engine settings. Add only the copy needed to explain those choices; no arbitrary word target or cloned article.

Trust source read: https://11plus.gl-assessment.co.uk/pages/free-materials (24November), which explicitly says local question counts and timings can differ. Link to official resources without copying materials. Product truth comes from app/quiz/page.tsx, data/freshMaths.ts and lib/practiceJourneys.ts: supported topics use10questions/15minutes, mixed16/20; untimed practice gives feedback. No new maths question or official exam specification is introduced.

## Hub/spoke and technical plan

Parent canonical maths hub https://www.11plusexampapers.com/subjects/maths. Nearest coverage: existing eight focused PracticeJourneys cards and MathsResourceChooser, not a new blog. Preserve method links to order-of-operations, fractions/percentages lessons, algebra, word problems, area/perimeter and averages. Hub→/mock-exams?subject=maths&topic=SUPPORTED#configure-practice; setup→specific method where available and back to hub. /papers remains the printable parent and is unchanged after yesterday's release. No new indexable URL: all setup parameters canonicalise to /mock-exams; quiz remains noindex and outside sitemap.

Verify all eight topic selections and unsupported parameters, topic count/timing against actual generated sets, other subjects unchanged, reciprocal links/fragments, production build and live start/feedback. Existing artwork retained; no new cover needed. Existing pilot/PDF offers retained. Avoid claiming pedagogical review or measured conversions.

News screening: seven-day search for11plus admissions/test announcements returned older Kent16October and Trafford14July developments, plus2026-test/2027-entry dates and unrelated results. No material new verified2027-test story qualifies; zero news drafts. Existing educational coverage and useful product work take priority; zero new blog briefs/drafts/publications today.
