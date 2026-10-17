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

  const description = subject.slug === 'english'
    ? 'Practise 11+ retrieval, inference and evidence with original passages, worked examples and explained answers for families preparing for exams taken in 2027.'
    : `Practise 11+ ${subject.label} with free online questions, topic guides and mock-style quizzes. Trusted by UK families preparing for grammar and independent school entrance exams.`;
  return {
    title: `11+ ${subject.label} Practice Questions | 11 Plus Exam Papers`,
    description,
    alternates: { canonical: `/subjects/${subject.slug}` },
    openGraph: {
      title: `11+ ${subject.label} Practice Questions | 11 Plus Exam Papers`,
      description,
      url: `/subjects/${subject.slug}`,
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `11+ ${subject.label} Practice Questions | 11 Plus Exam Papers`,
      description,
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
            {subject.slug === 'english' ? <p className="mt-4 text-slate-700">Start with retrieval, then inference, then using evidence. These original lessons support preparation for exams taken in 2027. For choosing the right assessment and checking the entry year, use our <Link className="text-indigo-700 underline" href="/blog/what-is-the-11-plus-exam">2027 parent guide</Link>.</p> : null}
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lessonLinks.map((lesson) => <li key={lesson.slug} className="rounded-xl border border-slate-200 bg-white p-5"><Link className="font-semibold text-indigo-700 underline" href={`/subjects/${lesson.subject}/${lesson.slug}`}>{lesson.title}</Link><p className="mt-3 text-sm text-slate-600">{lesson.description}</p></li>)}
            </ul>
          </section>
        ) : null}
      </SubjectPageClient>
    </>
  );
}
