import type { Metadata } from 'next';
import PapersClient from './PapersClient';

// Render search-parameter driven content on the server instead of an empty static fallback.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Free 11+ Practice Papers and Worked Answers',
  description: 'Download free original maths and English practice PDFs with separate worked answers, try online practice and find official 11 Plus familiarisation sources.',
  alternates: { canonical: '/papers' },
  openGraph: {
    title: 'Free 11+ Practice Papers and Worked Answers',
    description: 'Download free original maths and English practice PDFs with separate worked answers, try online practice and find official 11 Plus familiarisation sources.',
    url: '/papers',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free 11+ Practice Papers and Worked Answers',
    description: 'Download free original maths and English practice PDFs with separate worked answers, try online practice and find official 11 Plus familiarisation sources.',
  },
};

export default function PapersPage() {
  return <PapersClient />;
}
