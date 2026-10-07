import type { Metadata } from 'next';
import { LandingPage } from '../components/LandingPage';
import { DeepLinkForwarder } from '../components/DeepLinkForwarder';
import { SchemaOrg } from '@/components/SchemaOrg';
import { homepageSchemas, faqSchema } from '@/lib/schemas';

/**
 * Homepage — server component.
 *
 * Deep-link forwarding (/?start=mock&...) is handled by <DeepLinkForwarder>,
 * a tiny client component, so this page can stay server-rendered and indexable.
 */

export const metadata: Metadata = {
  title: 'Free 11+ Mock Exams & Practice Papers | 11 Plus Exam Papers',
  description:
    'Free 11+ mock exams, practice questions and tutor support for grammar and independent school entrance. Covers Maths, English, Verbal and Non-Verbal Reasoning. No sign-up required.',
  alternates: { canonical: '/' },
  openGraph: {
    siteName: '11 Plus Exam Papers',
    title: 'Free 11+ Mock Exams & Practice Papers | 11 Plus Exam Papers',
    description:
      'Free 11+ mock exams and practice papers for UK families preparing for grammar and independent school entrance. No sign-up required.',
    url: '/',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: '11 Plus Exam Papers' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free 11+ Mock Exams & Practice Papers | 11 Plus Exam Papers',
    description:
      'Free 11+ mock exams and practice papers for UK families. No sign-up required.',
    images: ['/og-default.png'],
  },
};

const FAQ_ITEMS = [
  {
    q: 'Are these official 11+ past papers?',
    a: 'No. These are original practice resources, not official past papers or resources endorsed by an exam provider. Check your target school’s current admissions guidance for its subjects, format and sample materials.',
  },
  {
    q: 'Can we use these resources to prepare for exams in 2027?',
    a: 'Yes. Use the subject practice and worked examples as part of your preparation. Check school-specific requirements for exams taken in 2027, and distinguish the test date from the year your child would start school.',
  },
  {
    q: 'Can we practise online?',
    a: 'Yes. Practice sessions run in your web browser, without downloading a paper. The subject lessons also include examples and questions with explained answers.',
  },
  {
    q: 'How much does it cost?',
    a: 'The practice resources are currently free to access, with no sign-up required. Tutor enquiries are separate from the free practice resources.',
  },
];

export default function Home() {
  return (
    <>
      <SchemaOrg data={[...homepageSchemas, faqSchema(FAQ_ITEMS)]} />
      <DeepLinkForwarder />
      <LandingPage faqs={FAQ_ITEMS} />
    </>
  );
}
