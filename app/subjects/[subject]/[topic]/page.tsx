import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SchemaOrg } from '@/components/SchemaOrg';
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
  return <>
    <SchemaOrg data={{
      '@context': 'https://schema.org', '@type': 'LearningResource',
      name: lesson.title, description: lesson.description,
      url: `https://www.11plusexampapers.com/subjects/${lesson.subject}/${lesson.slug}`,
      inLanguage: 'en-GB', learningResourceType: 'Lesson',
      isAccessibleForFree: true, dateModified: lesson.reviewedAt,
      teaches: lesson.title,
    }} />
    <LessonContent lesson={lesson} />
  </>;
}
