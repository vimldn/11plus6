import type { Metadata } from 'next';
import SchoolsIndexClient from './SchoolsIndexClient';
import { SCHOOLS } from '@/lib/schools';

export const metadata: Metadata = {
  title: `11+ School Profiles | ${SCHOOLS.length} Grammar & Independent Schools | 11 Plus Exam Papers`,
  description:
    `Browse 11+ school profiles for ${SCHOOLS.length} grammar and independent schools across the UK. Exam format, subjects tested, entry process, admissions links and mock exam availability.`,
  alternates: { canonical: '/schools' },
  openGraph: {
    title: '11+ School Profiles | Grammar & Independent Schools | 11 Plus Exam Papers',
    description:
      'Browse 11+ school profiles — exam format, subjects tested and admissions info for grammar and independent schools.',
    url: '/schools',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '11+ School Profiles | 11 Plus Exam Papers',
    description:
      'Exam format, subjects tested and admissions info for grammar and independent schools across the UK.',
  },
};

export default function SchoolsPage() {
  return <SchoolsIndexClient />;
}
