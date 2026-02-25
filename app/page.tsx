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
    q: 'Is 11 Plus Exam Papers suitable for GL and CEM-style 11+ exams?',
    a: 'Yes. You can choose your target exam style during onboarding, and practice questions will match the format and difficulty.',
  },
  {
    q: 'What year groups is this for?',
    a: 'Designed for Year 3 to Year 6 (roughly ages 7–11), including focused Year 5 and Year 6 11+ preparation.',
  },
  {
    q: 'Does it work on iPads and tablets?',
    a: 'Yes — 11 Plus Exam Papers works smoothly on iPad, Android tablets, laptops and phones.',
  },
  {
    q: 'How much does it cost?',
    a: 'Access is free for now. In future, we may add optional gated resources, but the core library will remain focused on high-quality 11+ preparation.',
  },
];

export default function Home() {
  return (
    <>
      <SchemaOrg data={[...homepageSchemas, faqSchema(FAQ_ITEMS)]} />
      <DeepLinkForwarder />
      <LandingPage />
    </>
  );
}
