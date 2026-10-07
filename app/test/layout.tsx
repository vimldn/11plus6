import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Development question checker',
  robots: { index: false, follow: false },
};

export default function TestLayout({ children }: { children: React.ReactNode }) {
  // The diagnostic interface is available only on a local development server.
  if (process.env.NODE_ENV !== 'development' || process.env.VERCEL_ENV === 'production') notFound();
  return children;
}
