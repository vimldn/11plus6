# Blog artwork standard

Owner instruction, 30 October 2026: every automated article needs attractive artwork specific to its topic. The homepage illustration must not double as a generic blog cover. Apply this to educational and news publishing.

## Art direction

Use original, polished editorial illustrations with forest green, ivory, mustard and restrained terracotta, tactile gouache/pencil detail and a clear central subject. Vary the scene and composition so the archive does not look like a repeated template. Match the existing site's editorial character without reproducing its book staircase. The collection in `public/blog-artwork/` is the current reference.

Choose a concrete scene that helps the reader recognise the topic: maps and measuring tools for scale, a garden border for perimeter, portions for fractions, a station for timetables, or a relevant language metaphor. Do not simply put the title on a generic book picture. Avoid embedded headlines, logos, fabricated grades, claims, statistics or dates.

These covers are editorial illustrations, not worked question diagrams. Draw precise mathematical diagrams in code and validate them separately. News illustrations must not masquerade as photographs of a real school, actual family or event. Use accurate alt text beginning with “Editorial illustration” where needed, and never invent school architecture, badges or provider affiliation. Properly licensed photographs are acceptable when provenance and what they depict can be verified.

## Required implementation

1. Generate or source the topic-specific image before releasing the article. Use the built-in image generator for original raster artwork. Keep a dated provenance record with prompt or licence/source, intended topic and final asset paths.
2. Save local WebP covers under `public/blog-artwork/` using the article slug: 1200 × 800 full image plus a 600 × 400 `-600.webp` variant. Check the result visually before using it. Optimise both; aim below 300 KB and 100 KB respectively without visible quality loss.
3. Set `imageUrl` and accurate `imageAlt` in the article or `lib/blogArtwork.ts`. The same cover must appear on its archive card, article hero, relevant related cards, Open Graph/Twitter previews and Article/NewsArticle image metadata. `blogImageSrcSet` supplies responsive local variants.
4. Run `node scripts/check-blog-artwork.cjs` after the production build. Check desktop/mobile crops, image loading, alt text, social metadata and no horizontal overflow. An art change must preserve article copy, answers, URLs, canonical paths, publication dates and useful links.
5. Never publish with `/brand/book-journey.webp`, a missing cover, or an unreviewed generic placeholder. Hold the affected article and report the actual blocker instead. The owner does not need previews in chat; implement and verify directly.

The 30 October replacement collection is recorded in `docs/artwork/blog-artwork-2026-10-30.json`; the corresponding release PR records the production result. This visual release is not a new content batch or a factual re-review of the articles.
