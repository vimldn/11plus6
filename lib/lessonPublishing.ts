import { lessons } from '@/data/lessons';
import { englishLessons } from '@/data/englishLessons';

export const allLessons = [...lessons, ...englishLessons];

// Publication is an explicit editorial decision, never triggered by a date.
export function publishedLessons(subject?: string) {
  return allLessons.filter((lesson) => lesson.status === 'published' && (!subject || lesson.subject === subject));
}

export function publishedLesson(subject: string, slug: string) {
  return publishedLessons(subject).find((lesson) => lesson.slug === slug);
}

export function lessonPreviewEnabled() {
  if (process.env.VERCEL_ENV === 'production') return false;
  return process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development';
}
