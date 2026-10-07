# Release record — 7 October 2026

## Authorised scope

Vim approved the proposed next steps: check and release the first three maths lessons, add relevant internal links, correct Reading/Berkshire and Wilson's information, and prepare three English drafts. This is a manual small-batch release, not an automatic schedule.

## Content

- Release fractions of amounts, ratio sharing and percentages of amounts after independent automated recalculation of all 27 answers. See maths-release-review.md.
- Clarify the sharing-ratio heading; no mathematical answers needed correction.
- The site must not claim qualified teacher approval: none has been obtained. Human pedagogical review remains recommended; the owner has authorised release after the documented automated checks.
- English retrieval, inference and evidence lessons remain draft. Public routes and sitemap must hide them.
- Link the public maths lessons from the Maths hub and three relevant existing articles: maths topics, mental maths, common maths mistakes.

## Measurement

Existing Google Analytics page views can measure lesson visits. The native answer disclosure now emits lesson_answer_reveal through the existing gtag integration, with lesson slug, subject and question number only. Preview disclosures do not send this event. No child's name, submitted work or personal details are collected by this component. An answer reveal is an engagement signal, not a completed test or proof of learning.

No Search Console/GA performance improvement can be measured at release time. Review indexing, search impressions, repeat visits and reveal events once observations accrue and account data is available. No recurring automation has been configured.

## Checks

Release-gate script updated to assert precisely three published maths lessons and three draft English lessons, correct subject resolution and production-denied previews. Build, HTTP and browser results are recorded at completion in this PR's description.

## Known limits

The Vercel preview requires authentication in the cloud browser. Production lesson interaction can be inspected after release without changing protection. No protection settings are modified. Broader legacy articles and unrelated school claims remain outside this targeted correction batch.
