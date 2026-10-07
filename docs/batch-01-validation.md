# Batch 01 validation — 7 October 2026

Story: reviewers open a draft maths lesson on a preview deployment, read examples and reveal answers; production visitors cannot access drafts. Existing paper/mock selectors have server-rendered content.

## Passed

- `npm run build`: production compilation, TypeScript validation, generation of 217 static pages and build traces completed.
- `npx tsc --noEmit`: passed after final helper edits.
- `node scripts/check-release-gates.cjs`: production and preview controls, draft exclusion, simulated publication, subject lookup and targeted catalogue assertions passed.
- `git diff --check`: passed.
- Built-server HTTP checks in production mode: `/lesson-preview`, `/lesson-preview/fractions-of-amounts` and `/subjects/maths/fractions-of-amounts` return 404.
- Built-server HTTP checks in preview mode: preview index and fractions lesson return 200 with noindex; ordinary draft URL remains 404.
- Sitemap excludes the draft lesson and preview routes.
- `/papers` and `/mock-exams` return 200 and an H1 in server HTML in both environments (previous empty fallback replaced with dynamic server rendering).
- Content author recalculated 9 examples and 18 practice answers; no qualified educator approval claimed.

## Limitations and release gates

- Visual/mobile/keyboard browser testing NOT completed: the available Playwright runtime lacked a browser binary and its browser download failed. Native `<details>` is used for answer reveals, but interaction has not been browser-tested here.
- Qualified educator review remains outstanding.
- Accuracy corrections are scoped in accuracy-review.md; remaining school records are not certified.
- Local build preceded a small explicit-production fail-closed helper addition and removal of duplicate question numbering. Both passed subsequent TypeScript/unit checks; remote preview should build the final revision again.
- No production deployment or merge performed. All new lessons remain draft. Preview routes are environment-restricted, not authenticated; use Vercel deployment protection if private access is needed.
