import type { Metadata } from 'next';
import MockExamsClient from './MockExamsClient';

// Render search-parameter driven content on the server instead of an empty static fallback.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Free 11+ Mock Exams and Online Practice',
  description: 'Try free original 11 Plus practice online, review answers and explanations, or use printable maths and English sets. Practice scores are not official exam predictions.',
  alternates: { canonical: '/mock-exams' },
  openGraph: {
    title: 'Free 11+ Mock Exams and Online Practice',
    description: 'Try free original 11 Plus practice online, review answers and explanations, or use printable maths and English sets. Practice scores are not official exam predictions.',
    url: '/mock-exams',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free 11+ Mock Exams and Online Practice',
    description: 'Try free original 11 Plus practice online, review answers and explanations, or use printable maths and English sets. Practice scores are not official exam predictions.',
  },
};

export default function MockExamsPage() {
  return <MockExamsClient />;
}
