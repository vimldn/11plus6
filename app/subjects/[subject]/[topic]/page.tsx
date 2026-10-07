import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LessonContent from '@/components/LessonContent';
import { publishedLesson, publishedLessons } from '@/lib/lessonPublishing';

interface Props { params: { subject: string; topic: string } }

export function generateStaticParams() {
  return publishedLessons().map((lesson) => ({ subject: lesson.subject, topic: lesson.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const lesson = publishedLesson(params.subject, params.topic);
  if (!lesson) notFound();
  return {
    title: lesson.title,
    description: lesson.description,
    alternates: { canonical: `/subjects/${lesson.subject}/${lesson.slug}` },
    openGraph: { title: lesson.title, description: lesson.description, type: 'article', url: `/subjects/${lesson.subject}/${lesson.slug}` },
  };
}

export default function LessonPage({ params }: Props) {
  const lesson = publishedLesson(params.subject, params.topic);
  if (!lesson) notFound();
  return <LessonContent lesson={lesson} />;
}
