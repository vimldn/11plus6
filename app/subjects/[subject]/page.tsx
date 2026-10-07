import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SubjectPageClient from './SubjectPageClient';
import { SUBJECTS } from '@/lib/siteData';
import { subjectPageSchema } from '@/lib/schemas';
import { SchemaOrg } from '@/components/SchemaOrg';
import Link from 'next/link';
import { publishedLessons } from '@/lib/lessonPublishing';

interface Props { params: { subject: string } }

export async function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const subject = SUBJECTS.find((s) => s.slug === params.subject);
  if (!subject) return {};

  return {
    title: `11+ ${subject.label} Practice Questions | 11 Plus Exam Papers`,
    description: `Practise 11+ ${subject.label} with free online questions, topic guides and mock-style quizzes. Trusted by UK families preparing for grammar and independent school entrance exams.`,
    alternates: { canonical: `/subjects/${subject.slug}` },
    openGraph: {
      title: `11+ ${subject.label} Practice Questions | 11 Plus Exam Papers`,
      description: `Practise 11+ ${subject.label} with free online questions, topic guides and mock-style quizzes. Trusted by UK families preparing for grammar and independent school entrance exams.`,
      url: `/subjects/${subject.slug}`,
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `11+ ${subject.label} Practice Questions | 11 Plus Exam Papers`,
      description: `Practise 11+ ${subject.label} with free online questions, topic guides and mock-style quizzes. Trusted by UK families preparing for grammar and independent school entrance exams.`,
    },
  };
}

export default function SubjectPage({ params }: Props) {
  const subject = SUBJECTS.find((s) => s.slug === params.subject);
  if (!subject) notFound();
  const lessonLinks = publishedLessons(subject.slug);

  return (
    <>
      <SchemaOrg data={subjectPageSchema({ slug: subject.slug, label: subject.label, description: subject.desc })} />
      <SubjectPageClient subject={subject}>
        {lessonLinks.length ? (
          <section className="mx-auto max-w-6xl px-6 py-12" aria-labelledby="topic-lessons">
            <h2 id="topic-lessons" className="text-2xl font-bold text-slate-900">Learn each topic, then practise</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lessonLinks.map((lesson) => <li key={lesson.slug} className="rounded-xl border border-slate-200 bg-white p-5"><Link className="font-semibold text-indigo-700 underline" href={`/subjects/${lesson.subject}/${lesson.slug}`}>{lesson.title}</Link><p className="mt-3 text-sm text-slate-600">{lesson.description}</p></li>)}
            </ul>
          </section>
        ) : null}
      </SubjectPageClient>
    </>
  );
}
