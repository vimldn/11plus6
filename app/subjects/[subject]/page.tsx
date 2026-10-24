import { VisualPracticeLibrary } from '@/components/VisualPracticeLibrary';
import { VerbalPracticeLibrary } from '@/components/VerbalPracticeLibrary';
import { PracticeJourneys } from '@/components/PracticeJourneys';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SubjectPageClient from './SubjectPageClient';
import { SUBJECTS } from '@/lib/siteData';
import { subjectPageSchema } from '@/lib/schemas';
import { SchemaOrg } from '@/components/SchemaOrg';
import Link from 'next/link';
import { publishedLessons } from '@/lib/lessonPublishing';
import { BLOG_POSTS } from '@/lib/blogPosts';

interface Props { params: { subject: string } }

export async function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subject: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const subject = SUBJECTS.find((s) => s.slug === params.subject);
  if (!subject) return {};

  const description = subject.slug === 'english'
    ? 'Practise 11+ retrieval, inference and evidence with original passages, worked examples and explained answers for families preparing for exams taken in 2027.'
    : subject.slug === 'verbal-reasoning' ? 'Practise original 11 Plus letter codes, analogies, classifications and sequences, with worked explanations and focused retries for tests taken in 2027.'
    : subject.slug === 'non-verbal-reasoning' ? 'Practise original 11 Plus rotations and reflections with clear diagrams, worked visual answers, mistake retries and printable questions for tests taken in 2027.'
    : `Practise 11+ ${subject.label} with free online questions, topic guides and mock-style quizzes. Trusted by UK families preparing for grammar and independent school entrance exams.`;
  return {
    title: subject.slug === 'non-verbal-reasoning' ? '11+ Non-Verbal Reasoning: Rotations and Reflections' : subject.slug === 'verbal-reasoning' ? '11+ Verbal Reasoning Practice Questions' : `11+ ${subject.label} Practice Questions | 11 Plus Exam Papers`,
    description,
    alternates: { canonical: `/subjects/${subject.slug}` },
    openGraph: {
      title: subject.slug === 'non-verbal-reasoning' ? '11+ Non-Verbal Reasoning: Rotations and Reflections' : subject.slug === 'verbal-reasoning' ? '11+ Verbal Reasoning Practice Questions' : `11+ ${subject.label} Practice Questions | 11 Plus Exam Papers`,
      description,
      url: `/subjects/${subject.slug}`,
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: subject.slug === 'non-verbal-reasoning' ? '11+ Non-Verbal Reasoning: Rotations and Reflections' : subject.slug === 'verbal-reasoning' ? '11+ Verbal Reasoning Practice Questions' : `11+ ${subject.label} Practice Questions | 11 Plus Exam Papers`,
      description,
    },
  };
}

export default function SubjectPage({ params }: Props) {
  const subject = SUBJECTS.find((s) => s.slug === params.subject);
  if (!subject) notFound();
  const lessonLinks = publishedLessons(subject.slug);
  const skillGuides = BLOG_POSTS.filter(post => post.subject === subject.slug);

  return (
    <>
      <SchemaOrg data={subjectPageSchema({ slug: subject.slug, label: subject.label, description: subject.desc })} />
      <SubjectPageClient subject={subject}>
        {subject.slug === 'non-verbal-reasoning' && <VisualPracticeLibrary />}
        {subject.slug === 'verbal-reasoning' && <VerbalPracticeLibrary />}
        {(subject.slug === 'maths' || subject.slug === 'english') && <PracticeJourneys subject={subject.slug} />}
        {(subject.slug === 'maths' || subject.slug === 'english') && <section className="mx-auto max-w-6xl px-6 pt-10" aria-label="Printable practice"><h2 className="text-2xl font-bold">Print, practise, then review the method</h2><p className="mt-3 leading-7 text-slate-600">Use our original {subject.slug === 'maths' ? '20-question maths foundations' : '16-question English punctuation'} set with space to work and a separate explained answer booklet. These selected skills are not a full school-specific mock.</p><Link href="/papers" className="mt-4 inline-block font-semibold text-emerald-800 underline">Get free printable questions and worked answers →</Link></section>}

        {subject.slug === 'maths' && <section className="mx-auto max-w-6xl px-6 pt-8"><h2 className="text-2xl font-bold">Try the maths practice pilot</h2><p className="mt-3">A balanced 30-question paper drawn from 120 checked questions, with answers and explanations after completion. Original practice for exams taken in 2027, not an official school paper.</p><Link className="mt-3 inline-block font-semibold text-indigo-700 underline" href="/quiz?paper=maths-pilot">Start the 30-question maths pilot</Link></section>}

        {subject.slug === 'maths' && <section className="mx-auto max-w-6xl px-6 pt-8"><h2 className="text-2xl font-bold">Generate a fresh maths practice set</h2><p className="mt-3">16 questions across eight skills: arithmetic, fractions, percentages, equations, multi-step sharing, money, rectangle area and averages, with calculated answers and step-by-step explanations. New number variations on each attempt; questions can recur across attempts.</p><Link className="mt-3 inline-block font-semibold text-indigo-700 underline" href="/quiz?paper=maths-generated&mode=practice">Start fresh practice with answer feedback</Link><br /><Link className="mt-3 inline-block font-semibold text-indigo-700 underline" href="/quiz?paper=maths-generated">Try a 20-minute set</Link></section>}
        {lessonLinks.length ? (
          <section className="mx-auto max-w-6xl px-6 py-12" aria-labelledby="topic-lessons">
            <h2 id="topic-lessons" className="text-2xl font-bold text-slate-900">Learn each topic, then practise</h2>
            {subject.slug === 'english' ? <p className="mt-4 text-slate-700">Start with retrieval, then inference, then using evidence. These original lessons support preparation for exams taken in 2027. For choosing the right assessment and checking the entry year, use our <Link className="text-indigo-700 underline" href="/blog/what-is-the-11-plus-exam">2027 parent guide</Link>.</p> : null}
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lessonLinks.map((lesson) => <li key={lesson.slug} className="rounded-xl border border-slate-200 bg-white p-5"><Link className="font-semibold text-indigo-700 underline" href={`/subjects/${lesson.subject}/${lesson.slug}`}>{lesson.title}</Link><p className="mt-3 text-sm text-slate-600">{lesson.description}</p></li>)}
            </ul>
          </section>
        ) : null}
        {skillGuides.length > 0 && <section className="mx-auto max-w-6xl px-6 py-12" aria-labelledby="skill-guides"><p className="brand-eyebrow">Build the method</p><h2 id="skill-guides" className="text-3xl">{subject.label} guides with worked answers</h2><p className="mt-4 text-slate-700 leading-relaxed">Original explanations and practice questions for families preparing for 11-plus exams taken in 2027. Read the method, try the questions, then reveal each explained answer. New guides cover number foundations, percentage changes and careful punctuation.</p><ul className="mt-7 grid gap-6 sm:grid-cols-2">{skillGuides.map(post=><li key={post.slug} className="border-t border-slate-200 py-6"><Link className="text-xl text-indigo-700 underline underline-offset-4" href={`/blog/${post.slug}`}>{post.title}</Link><p className="mt-4 text-slate-600 leading-relaxed">{post.desc}</p></li>)}</ul></section>}
      </SubjectPageClient>
    </>
  );
}
