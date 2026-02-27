import type { Metadata } from 'next';
import CompareClient from './CompareClient';

export const metadata: Metadata = {
  title: 'Compare 11+ Schools Side-by-Side | Exam Format, Subjects & Entry | 11 Plus Exam Papers',
  description:
    'Compare up to 3 grammar and independent schools side-by-side. See exam format, subjects tested, gender, entry points and mock exam availability for each school.',
  alternates: { canonical: '/compare' },
  openGraph: {
    title: 'Compare 11+ Schools Side-by-Side | 11 Plus Exam Papers',
    description:
      'Compare grammar and independent schools side-by-side — exam format, subjects, entry points and mock availability.',
    url: '/compare',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Compare 11+ Schools Side-by-Side | 11 Plus Exam Papers',
    description:
      'Compare grammar and independent schools side-by-side — exam format, subjects and mock availability.',
  },
};

export default function ComparePage() {
  return <CompareClient />;
}
