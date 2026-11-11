import type { Metadata } from 'next';
import ExamDatesClient from './ExamDatesClient';

export const metadata: Metadata = {
  title: '11+ Exam Dates | Registration, Test Year & School Entry',
  description:
    'Check 11+ registration and test dates by school-entry year, with separate Tiffin timetables and guidance on unconfirmed dates for exams taken in 2027.',
  alternates: { canonical: '/exam-dates' },
  openGraph: {
    title: '11+ Exam Dates: Test Year & School Entry',
    description:
      'Key 11+ exam dates, registration deadlines and results days for grammar school consortia across the UK.',
    url: '/exam-dates',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '11+ Exam Dates: Test Year & School Entry',
    description:
      '11+ exam dates, registration deadlines and results days for UK grammar school consortia.',
  },
};

export default function ExamDatesPage() {
  return <ExamDatesClient />;
}
