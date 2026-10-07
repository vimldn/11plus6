import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { lessonPreviewEnabled } from '@/lib/lessonPublishing';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Editorial lesson preview',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function LessonPreviewLayout({ children }: { children: React.ReactNode }) {
  if (!lessonPreviewEnabled()) notFound();
  return children;
}
