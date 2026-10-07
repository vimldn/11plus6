import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allLessons as lessons } from '@/lib/lessonPublishing';
import { lessonPreviewEnabled } from '@/lib/lessonPublishing';

export default function LessonPreviewIndex() {
  if (!lessonPreviewEnabled()) notFound();
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-800">
      <p className="font-semibold text-indigo-700">Editorial review</p>
      <h1 className="mt-3 text-3xl font-bold">Draft lesson review</h1>
      <p className="mt-5 leading-relaxed">These drafts are available only in development or a Vercel preview deployment. They are excluded from the public subject pages and sitemap. Publication requires a reviewed code change; no date automatically releases a lesson.</p>
      <ul className="mt-8 space-y-4">{lessons.filter((lesson) => lesson.status === 'draft').map((lesson) => <li key={lesson.slug} className="rounded-xl border border-slate-200 p-5"><Link className="font-semibold text-indigo-700 underline" href={`/lesson-preview/${lesson.slug}`}>{lesson.title}</Link><p className="mt-2 text-sm">{lesson.description}</p></li>)}</ul>
    </main>
  );
}
