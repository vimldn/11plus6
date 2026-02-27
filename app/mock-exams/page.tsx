import type { Metadata } from 'next';
import MockExamsClient from './MockExamsClient';

export const metadata: Metadata = {
  title: 'Free 11+ Mock Exams Online | Grammar & Independent School Practice | 11 Plus Exam Papers',
  description:
    'Sit free timed 11+ mock exams online for grammar and independent school entrance. Covers GL Assessment, CEM, ISEB and CSSE formats across Maths, English, Verbal and Non-Verbal Reasoning.',
  alternates: { canonical: '/mock-exams' },
  openGraph: {
    title: 'Free 11+ Mock Exams Online | 11 Plus Exam Papers',
    description:
      'Timed 11+ mock exams for grammar and independent school entrance. GL, CEM, ISEB and CSSE formats. No sign-up required.',
    url: '/mock-exams',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free 11+ Mock Exams Online | 11 Plus Exam Papers',
    description:
      'Sit free timed 11+ mock exams for grammar and independent school entrance. No sign-up required.',
  },
};

export default function MockExamsPage() {
  return <MockExamsClient />;
}
