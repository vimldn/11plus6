import Link from 'next/link';
import EnglishWrittenPractice from '@/components/EnglishWrittenPractice';
import { mathsJourneys, englishJourney, topicPracticeHref } from '@/lib/practiceJourneys';
import LessonAnswer from '@/components/LessonAnswer';
import type { Lesson } from '@/data/lessons';
import { allLessons as lessons } from '@/lib/lessonPublishing';
import { publishedLessons } from '@/lib/lessonPublishing';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function LessonContent({ lesson, preview = false }: { lesson: Lesson; preview?: boolean }) {
  const journey = mathsJourneys.find(j => j.lesson === lesson.slug);
  const englishStep = englishJourney.findIndex(j => j.slug === lesson.slug);
  const passage = lesson.sections.filter(s=>s.title.startsWith('Original passage:')).flatMap(s=>s.paragraphs);
  const related = (preview ? lessons : publishedLessons()).filter((item) => lesson.relatedSlugs.includes(item.slug));

  return (
    <div className="editorial-reading min-h-screen bg-slate-50 text-slate-800">
      <SiteNav />
      <main id="main-content" className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: lesson.subject === 'maths' ? 'Maths' : 'English', href: `/subjects/${lesson.subject}` }, { label: lesson.title }]} />
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
          {lesson.subject === 'english' ? <aside className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-relaxed">
            <p>Original reading practice for families preparing for exams taken in 2027. Check your school's test and entry years separately.</p>
            <p className="mt-2">Published {lesson.publishedAt}; editorial/source check {lesson.reviewedAt}.</p>
            <p className="mt-2"><Link className="font-semibold text-indigo-700 underline" href="/blog/what-is-the-11-plus-exam">2027 preparation: parent guide</Link> · <Link className="font-semibold text-indigo-700 underline" href="/subjects/english">English practice hub</Link></p>
          </aside> : null}
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
          <section id="practice" aria-labelledby="practice-heading" className="space-y-5">
            <h2 id="practice-heading" className="text-2xl font-bold text-slate-950">Try it yourself</h2>
            {lesson.subject === 'english' && !preview ? <EnglishWrittenPractice slug={lesson.slug} questions={lesson.questions} passage={passage} /> : <>
            <p>Write down your working before opening each answer. If you make a mistake, check the explanation and try the question again.</p>
            <ol className="space-y-5">
              {lesson.questions.map((question, index) => (
                <li key={question.question} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="font-semibold">{index + 1}. {question.question}</h3>
                  <LessonAnswer track={!preview} slug={lesson.slug} subject={lesson.subject} number={index + 1}>
                    <p className="mt-4 font-semibold">Answer: {question.answer}</p>
                    <p className="mt-2 leading-relaxed">{question.explanation}</p>
                  </LessonAnswer>
                </li>
              ))}
            </ol>
            </>}

          </section>
          {!preview && journey && <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"><h2 className="text-2xl font-bold">Try fresh questions on this method</h2><p className="mt-3 leading-7">Practise 10 original questions with number variations and explained answers. Use mistake review afterwards; these are practice questions, not an exam-readiness prediction.</p><Link href={topicPracticeHref(journey.topic)} className="mt-5 inline-block rounded-xl bg-emerald-900 px-5 py-4 font-bold text-white">Start focused practice →</Link></section>}
          {!preview && englishStep >= 0 && <nav aria-label="English learning path" className="rounded-2xl bg-stone-50 p-6"><h2 className="text-2xl font-bold">Your English learning path</h2><ol className="mt-5 space-y-3">{englishJourney.map((step,index)=><li key={step.slug}><Link href={`/subjects/english/${step.slug}`} aria-current={step.slug===lesson.slug ? 'step' : undefined} className="font-semibold text-emerald-900 underline">{index+1}. {step.title}{step.slug===lesson.slug ? ' (this lesson)' : ''}</Link></li>)}</ol><Link href="/subjects/english" className="mt-5 inline-block text-emerald-900 underline">Back to the English hub →</Link></nav>}
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
