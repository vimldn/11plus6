# Trust and technical repairs — 7 October 2026

## Homepage
- Removed three named parent testimonials because no provenance or permission evidence was supplied. This does not establish that they were false; they should only return after verification.
- Removed generated avatar social proof and five-star rating imagery.
- Removed unverified complete-curriculum, exact exam-format/difficulty, progress-tracking and question-count claims.
- Retained accurate original-practice descriptions, free-access messaging, resource links and separate tutor enquiry positioning.
- Identified the resources as original practice rather than official or endorsed papers; preparation messaging focuses on exams taken in 2027.
- Defined FAQ content once in the server page and passed it to the visible component, so JSON-LD and visible answers remain identical.
- This is a correction of product claims, not a new researched admissions or instructional article.

## Crawling and dates
- Unknown sitemap modification dates are omitted rather than replaced with every deployment date.
- Lesson reviewedAt dates are preserved; blog updatedAt is preferred over the original publication date.
- Invalid blog dates produce no modification date.
- Quiz pages carry noindex, follow metadata and are crawlable so search engines can discover that instruction.
- The /test diagnostic UI returns notFound outside local development (including production builds and previews). It also has noindex metadata.
- API routes remain disallowed in robots.txt. Robots rules are not access control.

## Verification
- Initial TypeScript check passed after homepage/layout/robots edits.
- Parent release validation should build the assembled branch and HTTP-check /test returns 404, /quiz exposes noindex, homepage FAQ/schema agree, and sitemap unknown dates are absent.
- React review: serialisable FAQ props only, no added fetching/effects/dependencies, removed unused icon import, server boundary used for diagnostic access decision.
