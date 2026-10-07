import type { Metadata } from 'next';
import PapersClient from './PapersClient';

// Render search-parameter driven content on the server instead of an empty static fallback.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '11+ School-Themed Practice Papers',
  description:
    "Explore original school-themed 11+ practice activities. Check your school's current exam requirements; these are practice resources, not official past papers.",
  alternates: { canonical: '/papers' },
  openGraph: {
    title: '11+ Practice Papers by School | 11 Plus Exam Papers',
    description:
      'Explore school-themed practice activities for grammar and independent school preparation. Not official past papers.',
    url: '/papers',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '11+ School-Themed Practice Papers | 11 Plus Exam Papers',
    description:
      'School-themed 11+ mock exams for 50+ grammar and independent schools. Free access.',
  },
};

export default function PapersPage() {
  return <PapersClient />;
}
