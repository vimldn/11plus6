import Link from 'next/link';
import type { Lesson } from '@/data/lessons';
import { lessons } from '@/data/lessons';
import { publishedLessons } from '@/lib/lessonPublishing';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function LessonContent({ lesson, preview = false }: { lesson: Lesson; preview?: boolean }) {
  const related = (preview ? lessons : publishedLessons()).filter((item) => lesson.relatedSlugs.includes(item.slug));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Maths', href: '/subjects/maths' }, { label: lesson.title }]} />
        {preview ? (
          <aside className="my-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">
            <strong>Editorial preview — draft content.</strong> This lesson is awaiting release approval and is not available at its public URL.
            {' '}<Link className="underline" href="/lesson-preview">View this batch</Link>
          </aside>
        ) : null}
        <article className="mt-8 space-y-10">
          <header>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-indigo-700">Learn · practise · check</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{lesson.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">{lesson.description}</p>
          </header>
          <div className="space-y-4 leading-relaxed">{lesson.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          {lesson.sections.map((section) => (
            <section key={section.title} className="space-y-4 leading-relaxed">
              <h2 className="text-2xl font-bold text-slate-950">{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          <section aria-labelledby="worked-examples" className="space-y-5">
            <h2 id="worked-examples" className="text-2xl font-bold text-slate-950">Worked examples</h2>
            {lesson.examples.map((example, index) => (
              <div key={example.question} className="rounded-2xl border border-indigo-100 bg-white p-6">
                <h3 className="text-lg font-semibold">Example {index + 1}: {example.question}</h3>
                <ol className="my-4 list-decimal space-y-2 pl-5">{example.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                <p className="font-semibold text-indigo-800">Answer: {example.answer}</p>
              </div>
            ))}
          </section>
          <section aria-labelledby="common-mistakes" className="rounded-2xl bg-indigo-50 p-6">
            <h2 id="common-mistakes" className="text-2xl font-bold text-slate-950">Common mistakes to avoid</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5">{lesson.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul>
          </section>
          <section aria-labelledby="practice" className="space-y-5">
            <h2 id="practice" className="text-2xl font-bold text-slate-950">Try it yourself</h2>
            <p>Write down your working before opening each answer. If you make a mistake, check the explanation and try the question again.</p>
            <ol className="space-y-5">
              {lesson.questions.map((question, index) => (
                <li key={question.question} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="font-semibold">{index + 1}. {question.question}</h3>
                  <details className="mt-4">
                    <summary className="cursor-pointer rounded text-sm font-semibold text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600">Show answer and explanation for question {index + 1}</summary>
                    <p className="mt-4 font-semibold">Answer: {question.answer}</p>
                    <p className="mt-2 leading-relaxed">{question.explanation}</p>
                  </details>
                </li>
              ))}
            </ol>
          </section>
          {related.length ? (
            <nav aria-label="Related lessons" className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-950">Keep practising</h2>
              <ul className="list-disc space-y-3 pl-5">{related.map((item) => <li key={item.slug}><Link className="font-medium text-indigo-700 underline" href={preview ? `/lesson-preview/${item.slug}` : `/subjects/${item.subject}/${item.slug}`}>{item.title}</Link></li>)}</ul>
            </nav>
          ) : null}
          <section className="border-t border-slate-200 pt-6 text-sm text-slate-600">
            <h2 className="font-semibold text-slate-900">Sources and context</h2>
            <p className="mt-3">The questions and worked examples on this page are original practice material, not official past-paper questions. Exam requirements vary by school and entry year.</p>
            <ul className="mt-3 space-y-2">{lesson.sources.map((source) => <li key={source.url}><a className="text-indigo-700 underline" href={source.url}>{source.label}</a></li>)}</ul>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
