import { notFound } from 'next/navigation';
import { allLessons as lessons } from '@/lib/lessonPublishing';
import { lessonPreviewEnabled } from '@/lib/lessonPublishing';
import LessonContent from '@/components/LessonContent';

export default function LessonPreview({ params }: { params: { slug: string } }) {
  if (!lessonPreviewEnabled()) notFound();
  const lesson = lessons.find((item) => item.slug === params.slug && item.status === 'draft');
  if (!lesson) notFound();
  return <LessonContent lesson={lesson} preview />;
}
