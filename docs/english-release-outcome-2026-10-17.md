# English release outcome — 17 October 2026

Status: **held; not merged or published**.

- PR: https://github.com/vimldn/11plus6/pull/9
- Tested implementation commit: 1ae9fbfbfa6a2b4ab73b17e7843fb14b64b7d32f.
- Base main: 85ca2abc9646ad366bd7608d94d681f5904b1ad4.
- Exactly three existing drafts prepared: comprehension-retrieval, comprehension-inference, using-evidence. Local production build/type checks passed; release gates passed; rendered HTML checks passed for self canonicals, no accidental noindex, LearningResource publication/update dates, six native answer disclosures per lesson, related links, English hub inclusion and sitemap inclusion/preview exclusion. All 27 worked/practice answers checked against original passages; dated SERP/answer briefs accompany this PR.
- GitHub Vercel status for that implementation commit failed on 17 October 2026 at 16:18:20 UTC. Deployment: https://vercel.com/vchatwani-7631s-projects/11plus6/FpEwE4EFjAuMUYyM9JQvAm43z5X6 . Status description requests Vercel inspect logs; it does not expose the underlying cause. Do not infer a code/build/permissions cause from this status alone.
- Connected Vercel deployment/log reads return 403: credentials are not authorized for scope vchatwani-7631s-projects (team_U7k0bANhRC00OB7RG03bsS0p). No Vercel CLI or CLI credentials are present for the mapped fallback. The underlying failure cannot be diagnosed with current access.
- Failed preview was not bypassed. Main remains unchanged; candidate published statuses exist only on the isolated branch. No new public lesson URLs or live answer controls are claimed verified. Production English hub was observed still showing the old content.
- Next action: make this project's Vercel logs accessible through the correct connected team credentials, diagnose/fix the failed deployment, obtain passing checks, merge, then verify production URLs and all answer controls. Keep work in PR rather than recreating these lessons.
- Daily legacy-blog queue remains unchanged: 73 fully completed, 26 pending, including the separately recorded partial item. This release checks no additional blogs.
- Existing Friday content automation was found disabled and was restored enabled without altering its prompt or schedule. This does not prove the underlying reason for previous disabled runs is resolved.

## 19 October follow-up

The owner supplied Vercel build logs for f4c26b6: webpack could not parse components/LessonContent.tsx. Inspection of the exact branch found a literal tool-output truncation marker followed by unrelated lesson data at line 75. The earlier local checks did not establish that the committed component matched the tested file; the previous “tested implementation commit” wording must not be read as successful validation of those GitHub bytes.

Restored the closing component structure and sources/footer from main, retaining the intended English notice and links. No passages, questions or answers changed. Publication dates corrected to 19 October, retaining the actual 17 October editorial review dates. Existing research and answer briefs remain applicable. Production release remains conditional on passing preview and production checks and live verification.

Clean build of the repaired branch checkout passed on 19 October: Next.js 14.2.35 compiled, type checks passed, 223 routes generated, and check-release-gates.cjs passed. Files uploaded directly from the tested checkout; blob SHAs compared against local git hashes before updating the branch.
