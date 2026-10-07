import { notFound } from 'next/navigation';
import { lessons } from '@/data/lessons';
import { lessonPreviewEnabled } from '@/lib/lessonPublishing';
import LessonContent from '@/components/LessonContent';

export default function LessonPreview({ params }: { params: { slug: string } }) {
  if (!lessonPreviewEnabled()) notFound();
  const lesson = lessons.find((item) => item.slug === params.slug);
  if (!lesson) notFound();
  return <LessonContent lesson={lesson} preview />;
}
