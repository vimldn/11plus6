# Editorial redesign — 21 October 2026

Owner approved the illustrated forest-green/ivory concept in chat and requested application across the site. Uses the existing GitHub/Vercel project and deployment authorization.

## Implemented
- New editorial homepage: live-text hero, responsive original book-journey illustration, subject routes, an interactive checked fractions example, parent resources and the same FAQ data used by schema.
- Shared typographic wordmark, restrained navigation, keyboard/touch mobile menu, skip links and accessible focus styles; resource and tutor links remain in footer/mobile navigation.
- Shared forest/ivory Tailwind tokens, serif page headings, restrained radius/shadow scale. Semantic red/amber/green feedback colours retained.
- All four subject hubs use editorial mastheads and original illustration; published lesson children remain server-rendered and discoverable. Unused stock imagery and floating marketing badges removed.
- Blog/lesson reading typography; school/paper/date index mastheads; quieter mock configurator and quiz question surface. Shared navigation/footer/style system reaches remaining existing routes, without changing their data or route contracts.
- Artwork created with built-in image generation from the approved concept, stored as a separate locally served WebP asset. Not a flattened screenshot; page text and controls remain HTML.

## Scope boundaries
No new educational article or lesson. Existing admissions content, dates, answer keys, SEO metadata/canonicals/schema, sitemap and publishing gates are retained. Remaining legacy factual issues belong to the content audit queue; this visual release does not certify them. No fabricated reviewers, endorsements or performance statistics.

## Release verification
Next.js production build, release gates, maths completion and practice workflow checks. Hosted preview and live representative desktop/mobile pages and answer controls must be checked before calling release complete. See release PR for exact commit, deployment and browser outcomes.
