import type { Metadata } from 'next';
import MockExamsClient from './MockExamsClient';

// Render search-parameter driven content on the server instead of an empty static fallback.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Free 11+ Mock Exams and Online Practice',
  description: 'Choose free 11+ online practice in maths, English, verbal or non-verbal reasoning. Try timed or untimed questions, then review worked answers. No sign-up.',
  alternates: { canonical: '/mock-exams' },
  openGraph: {
    title: 'Free 11+ Mock Exams and Online Practice',
    description: 'Choose free 11+ online practice in maths, English, verbal or non-verbal reasoning. Try timed or untimed questions, then review worked answers. No sign-up.',
    url: '/mock-exams',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free 11+ Mock Exams and Online Practice',
    description: 'Choose free 11+ online practice in maths, English, verbal or non-verbal reasoning. Try timed or untimed questions, then review worked answers. No sign-up.',
  },
};

export default function MockExamsPage() {
  return <MockExamsClient />;
}
