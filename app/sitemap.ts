import { MetadataRoute } from 'next';
import { SUBJECTS, UK_CITIES } from '@/lib/siteData';
import catalog from '@/data/schools.catalog.json';
import { BLOG_POSTS } from '@/lib/blogPosts';

const BASE = 'https://www.11plusexampapers.com';

function url(
  path: string,
  priority: number = 0.7,
  changeFreq: MetadataRoute.Sitemap[0]['changeFrequency'] = 'monthly',
  lastMod?: string,
): MetadataRoute.Sitemap[0] {
  return {
    url: `${BASE}${path}`,
    lastModified: lastMod ?? new Date().toISOString().split('T')[0],
    changeFrequency: changeFreq,
    priority,
  };
}

/**
 * Converts a human-readable date string (e.g. "January 15, 2025") to YYYY-MM-DD.
 * Falls back to today's date if parsing fails.
 */
function parsePostDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
    return d.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static pages ───────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    url('/',               1.0, 'weekly'),
    url('/mock-exams',     0.9, 'weekly'),
    url('/papers',         0.9, 'weekly'),
    url('/schools',        0.9, 'monthly'),
    url('/subjects',       0.8, 'monthly'),
    url('/tutors',         0.8, 'monthly'),
    url('/exam-dates',     0.8, 'monthly'),
    url('/blog',           0.8, 'weekly'),
    url('/compare',        0.7, 'monthly'),
    url('/guides/gl-vs-cem', 0.7, 'monthly'),
    url('/privacy',        0.3, 'yearly'),
    url('/terms',          0.3, 'yearly'),
  ];

  // ── School profile pages ───────────────────────────────────────────────────
  const schoolPages: MetadataRoute.Sitemap = (catalog as { id: string }[]).map((s) =>
    url(`/schools/${s.id}`, 0.8, 'monthly'),
  );

  // ── Subject pages ──────────────────────────────────────────────────────────
  const subjectPages: MetadataRoute.Sitemap = SUBJECTS.map((s) =>
    url(`/subjects/${s.slug}`, 0.8, 'monthly'),
  );

  // ── Subject × city pages ───────────────────────────────────────────────────
  const subjectCityPages: MetadataRoute.Sitemap = SUBJECTS.flatMap((s) =>
    UK_CITIES.map((c) =>
      url(`/subjects/${s.slug}/${c.slug}`, 0.6, 'monthly'),
    ),
  );

  // ── Tutor city pages ───────────────────────────────────────────────────────
  const tutorPages: MetadataRoute.Sitemap = UK_CITIES.map((c) =>
    url(`/tutors/${c.slug}`, 0.7, 'monthly'),
  );

  // ── Location pages intentionally excluded ──────────────────────────────────
  // /locations/[city] are 301 redirects to /tutors/[city].
  // Including redirect pages in the sitemap wastes crawl budget — excluded.

  // ── Blog posts ─────────────────────────────────────────────────────────────
  // lastModified uses the actual post date so Googlebot doesn't re-crawl every
  // post on every deploy.
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((p) =>
    url(`/blog/${p.slug}`, 0.7, 'monthly', parsePostDate(p.date)),
  );

  return [
    ...staticPages,
    ...schoolPages,
    ...subjectPages,
    ...subjectCityPages,
    ...tutorPages,
    ...blogPages,
  ];
}
