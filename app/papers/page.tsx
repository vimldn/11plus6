import type { Metadata } from 'next';
import PapersClient from './PapersClient';

// Render search-parameter driven content on the server instead of an empty static fallback.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Free 11+ Practice Papers and Worked Answers',
  description: 'Free 11+ practice PDFs for maths, English, verbal and non-verbal reasoning, with separate worked answers, question previews and official familiarisation links.',
  alternates: { canonical: '/papers' },
  openGraph: {
    title: 'Free 11+ Practice Papers and Worked Answers',
    description: 'Free 11+ practice PDFs for maths, English, verbal and non-verbal reasoning, with separate worked answers, question previews and official familiarisation links.',
    url: '/papers',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free 11+ Practice Papers and Worked Answers',
    description: 'Free 11+ practice PDFs for maths, English, verbal and non-verbal reasoning, with separate worked answers, question previews and official familiarisation links.',
  },
};

export default function PapersPage() {
  return <PapersClient />;
}
