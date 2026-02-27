import type { Metadata } from 'next';
import PapersClient from './PapersClient';

export const metadata: Metadata = {
  title: '11+ School-Themed Practice Papers | Grammar & Independent School Mock Exams | 11 Plus Exam Papers',
  description:
    'School-themed 11+ practice papers for 50+ grammar and independent schools. Sit a mock exam matched to your target school's format, subjects and exam style. Free access, no sign-up required.',
  alternates: { canonical: '/papers' },
  openGraph: {
    title: '11+ Practice Papers by School | 11 Plus Exam Papers',
    description:
      'School-themed 11+ mock exams for 50+ grammar and independent schools. Matched to real exam formats.',
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
