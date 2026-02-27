import type { Metadata } from 'next';
import ExamDatesClient from './ExamDatesClient';

export const metadata: Metadata = {
  title: '11+ Exam Dates 2026 & 2027 | Registration Deadlines & Test Dates | 11 Plus Exam Papers',
  description:
    'Key 11+ exam dates for 2026 and 2027 entry. Registration deadlines, test dates and results days for grammar school consortia including GL Assessment, CEM, CSSE and Sutton SET.',
  alternates: { canonical: '/exam-dates' },
  openGraph: {
    title: '11+ Exam Dates 2026 & 2027 | 11 Plus Exam Papers',
    description:
      'Key 11+ exam dates, registration deadlines and results days for grammar school consortia across the UK.',
    url: '/exam-dates',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '11+ Exam Dates 2026 & 2027 | 11 Plus Exam Papers',
    description:
      '11+ exam dates, registration deadlines and results days for UK grammar school consortia.',
  },
};

export default function ExamDatesPage() {
  return <ExamDatesClient />;
}
