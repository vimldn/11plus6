# Topic-specific blog artwork — 30 October 2026

Owner request: replace generic automated-blog covers that repeat the website header illustration, and ensure future articles have appropriate attractive images. No previews requested in chat.

Base main: `93ff0ada511d42369e1ff0ef24a725e785e7399b`. No open PRs at selection. Isolated branch: `design/topic-blog-artwork-2026-10-30`.

## Scope

- 51 posts previously displaying `/brand/book-journey.webp`: 40 educational guides, five news reports and six previously updated parent guides. All now resolve to distinct topic artwork via `lib/blogArtwork.ts`.
- 51 original illustrations generated with the built-in image tool, visually reviewed. This is a visual update, not new editorial publication or factual re-review. No official school photograph, provider endorsement or precise worked diagram is claimed. News alt text identifies editorial illustration.
- 102 optimized local WebP assets: one 1200 × 800 cover and one 600 × 400 card version per post. All full images below 300 KB; thumbnails below 100 KB. Descriptive alt text, responsive srcsets and lazy-loaded archive/related cards. More generous framing for the new covers.
- Matching article hero, archive card, Open Graph, Twitter and Article/NewsArticle image metadata. The homepage illustration stays intact. No article copy, questions, answers, slug, publication date or canonical change; no redirects/culls, new blog/news output or legacy audit completion claimed.
- Dated source/prompt, topic, asset paths, sizes and SHA256 records: `docs/artwork/blog-artwork-2026-10-30.json`. Publishing standard: `docs/blog-artwork.md` and `docs/content-programme.md`. Existing daily task prompt updated with the same requirement; schedule and other research/release gates preserved.

## Checks and limitations

- Production build: 268 generated routes, exit 0. React review: existing server rendering retained, no new client dependency or hooks, stable article keys, descriptive alt text, reserved image dimensions and responsive/lazy image loading.
- `check-blog-artwork.cjs`: 51 distinct image hashes, all 102 nonempty valid WebP assets within budgets, accurate alt presence, responsive references, archive/hero/OG/Twitter/schema and self-canonical checks passed. An initial parallel encoding attempt produced empty files and an oversized cover; sequential in-memory encoding corrected these before upload. No failed asset was released.
- All original illustrations inspected; optimized assets decoded. Existing release gates, latest content/answer checks and generated HTML checks passed. Fresh live pre-release sitemap compared with generated sitemap: identical set of 236 canonical URLs.
- `check-blog-artwork-live.py` is the post-deployment gate: fetch all 51 public articles and 102 image variants, compare image bytes with local SHA256, check archive, social/schema/canonicals and sitemap inclusion.
- Local mobile-browser installation was unavailable (browser download returned an invalid archive). Do not claim a physical-mobile or mobile-emulation test; responsive dimensions/srcset and generated markup are checked. Public browser visual verification and exact production result are recorded in the linked PR outcome.

## Release outcome

All uploaded blob SHAs and the complete tree must match the checked local files. Merge only after passing GitHub/Vercel checks at the expected head; verify production READY, matching merge commit and www alias, then run the public asset gate and browser visual checks. The final PR/head/tree/merge/deployment/public result is retained in the [artwork release PR](https://github.com/vimldn/11plus6/pulls?q=is%3Apr+head%3Adesign%2Ftopic-blog-artwork-2026-10-30). No deployment, indexing or ranking claim is based solely on this pre-merge record.
