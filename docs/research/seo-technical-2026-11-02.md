# SEO technical repair evidence — 2 November 2026

## Scope and observed causes

The owner authorised fixing the full SEO checklist. This release repairs public content and technical behaviour; no claim is made that an algorithmic penalty, an outage, a backlink deficit or any single defect caused the observed traffic movement. Retain the dated GSC baseline and compare matched complete periods after release.

Observed before implementation: `/privacy` duplicated `/terms`; both lacked a canonical. The root title template repeated a brand suffix already embedded in child metadata on 30 public pages. `/blog` rendered 159 full image cards (832,527 uncompressed HTML bytes); `/papers` repeated teaching libraries and large school-card sections (392,377 bytes). The quiz route's largest initial application bundle was 883,211 bytes and imported the full legacy question bank eagerly. Byte size is not a field Core Web Vitals result.

## Technical research before changes

Primary documentation reviewed:

- Next.js lazy loading: https://nextjs.org/docs/app/guides/lazy-loading — defer optional code and heavy modules; preserve readable server-rendered content.
- Google tag configuration: https://developers.google.com/tag-platform/gtagjs/configure — configure the tag once and handle intentional manual events.
- Google page views: https://developers.google.com/analytics/devguides/collection/ga4/views — avoid duplicate automatic/manual page views.
- Google privacy controls: https://developers.google.com/tag-platform/security/guides/privacy — disable Google signals and advertising personalisation in this site's configuration.
- ICO storage/access guidance: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-pecr-rules/
- ICO consent practice: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/how-do-we-manage-consent-in-practice/
- ICO children's privacy: https://ico.org.uk/for-the-public/the-children-s-code-and-children-s-online-privacy/
- Google privacy policy: https://policies.google.com/privacy
- Vercel privacy notice: https://vercel.com/legal/privacy-notice

Privacy copy was based on code inspection of actual forms, the Google Apps Script forwarding endpoint, browser storage, written practice and the existing Google Analytics tag. No legal entity, postal address, processor contract, historic retention configuration or educator credential was invented.

## Implementation decisions

- Keep the global title template; remove duplicate child suffixes. Add accurate privacy and terms canonicals.
- Keep 13 illustrated recent/featured article cards and a compact server-rendered directory for every other article. No pagination or JavaScript-only discovery dependency; all article URLs remain linked.
- Fetch general practice through the existing reviewed-bank API. The full bank is dynamically loaded only if that request fails. Load the maths pilot only for the pilot and defer results/review screens. Keep the interactive quiz noindex; public guides, lessons and hubs remain indexable.
- Optional analytics does not load until explicit consent. Equal choices, six-month preference lifetime, permanent footer controls, consent withdrawal and a local-practice clearing control. Custom events allow only specific non-personal fields; no answers, scores, names, emails or form text. Send query-free page URLs. Server request logs remain a hosting-provider matter.
- Enquiries no longer log personal payloads or claim success after an HTTP/transport failure. Preserve parent-name and notes fields explicitly, validate email and limit forwarded text. The existing Google Apps Script service is outside this repository: only mocked delivery is exercised in automated verification; no test lead is sent to a third party.
- The local tutor modal now submits to the enquiry endpoint before showing success. Free practice no longer requires a child's name or a parent's email.

## Measurement and access limits

Windsor exposes Search Analytics and Sitemaps for the correct site. Its `indexed` sitemap field is explicitly deprecated and is not used as proof of indexing. The separately available URL Inspection connector returned no connected sites; its account initialization reported an ended trial/unavailable access. No index inspection result is claimed. HTTP 200, a canonical and sitemap membership establish technical availability only.

Use the release ledger for actual build, browser, mobile lab and deployment outcomes. Core Web Vitals field outcomes require sufficient real-user data after release; a Lighthouse run is a lab sample, not proof of those outcomes. Adding consent changes Analytics coverage, so do not compare its post-release raw event totals directly with the old ungated tag; GSC remains the stable search-performance series.
