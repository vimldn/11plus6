import Link from 'next/link';
import LessonAnswer from '@/components/LessonAnswer';
import type { Lesson } from '@/data/lessons';
import { allLessons as lessons } from '@/lib/lessonPublishing';
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
          <section aria-labelledby="practice" className="space-y-5">
            <h2 id="practice" className="text-2xl font-bold text-slate-950">Try it yourself</h2>
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
          </section>
          {related.length ? (
            <nav aria-label="Related lessons" className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-950">Keep practising</h2>
              <ul className="list-disc space-y-3 pl-5">{related.map((item) => <li key={item.slug}><Link className="font-medium text-indigo-700 underline" href={preview ? `/lesson-preview/${item.slug}` : `/subjects/${item.subject}/${item.slug}`}>{item.title}</Link></li>)}</ul>
        …3415 tokens truncated…etting others enter first.' },
      { question: 'Why might the boy mention getting lost on his first day?', steps: ['He makes space and mentions his own difficulty when he was new.', 'This gives Nia a reason to feel less alone in being unfamiliar with the rehearsal.'], answer: 'He is probably trying to reassure her and make her feel welcome.' },
      { question: 'What suggests that Nia wants to participate again?', steps: ['In paragraph 4 she volunteers to come early the following week.', 'This is stronger evidence of future participation than simply owning a flute.'], answer: 'She raises her hand to come early next week, suggesting that she wants to take part again.' },
    ],
    mistakes: ['Retelling an action without explaining what it suggests.', 'Treating a possible explanation as a proven fact.', 'Ignoring a later detail that changes the interpretation.', 'Assuming that every physical gesture always means the same emotion.', 'Choosing an option just because it repeats words from the passage.'],
    questions: [
      { question: 'Why is “Nia is reluctant to enter immediately” better supported than “Nia cannot read the notice”?', answer: 'She pauses and lets others enter first; nothing says she is unable to read.', explanation: 'Repeated reading alongside delaying entry supports hesitation. Difficulty reading would be an invented explanation.' },
      { question: 'What does the boy moving his bag suggest about his attitude towards Nia?', answer: 'He is welcoming and willing to include her.', explanation: 'He creates a place for her to sit, and his friendly comment supports this interpretation.' },
      { question: 'What might Nia’s hot cheeks and lowered flute suggest after she misses her entry?', answer: 'She feels embarrassed or self-conscious about the mistake.', explanation: 'The reaction happens immediately after the missed entry. Simply saying that the room is hot ignores that context.' },
      { question: 'Why does the boy probably tap the line with his pencil?', answer: 'He wants to help Nia find her place in the music.', explanation: 'He taps the correct line after her missed entry, and she plays at the next signal. This sequence supports help rather than criticism.' },
      { question: 'Which is best supported by paragraph 4: A) Nia feels more involved; B) Nia dislikes rehearsals; C) Nia has won a prize? Explain.', answer: 'A) Nia feels more involved.', explanation: 'She keeps time with the group and volunteers to come early. No prize is mentioned, and her willingness to return works against B.' },
      { question: 'How does Nia’s confidence appear to change? Use a detail from the beginning and one from the end.', answer: 'She becomes more comfortable: initially she delays entering, but by the end she volunteers to arrive early next week.', explanation: 'The answer compares two moments rather than describing only her initial nerves. “Appears” keeps the claim proportionate to the evidence.' },
    ],
    relatedSlugs: ['comprehension-retrieval', 'using-evidence'], sources: [curriculum],
  },
  {
    slug: 'using-evidence',
    title: '11+ Comprehension: Using Evidence and Short Quotations',
    description: 'Choose relevant evidence, quote accurately and explain your point with three worked examples and six original comprehension questions.',
    subject: 'english', status: 'published', publishedAt: '2026-10-17', reviewedAt: '2026-10-17',
    introduction: [
      'A supported answer shows how the passage led you to your conclusion. This lesson concentrates on selecting evidence and explaining it after you have formed an idea. Practise retrieval and inference first if finding facts or drawing conclusions still feels difficult.',
      'Read the original passage and compare the example answers. The models demonstrate useful features rather than official marks. They are not a school mark scheme, and a particular exam may require a different response format.',
    ],
    sections: [
      { title: 'Point, evidence and explanation', paragraphs: [
        'For an extended response, a helpful structure is point, evidence, explanation, sometimes called PEE. Make a point that answers the question, choose a relevant detail, then explain its connection to your point. This is a planning aid, not a rule that every answer needs three sentences.',
        'If asked to copy one word, copy one word. If asked for your own words, paraphrase rather than quote. If asked to explain a writer’s word choice, quoting the relevant word can make the explanation precise. Always follow the actual question.',
      ] },
      { title: 'Original passage: The bridge model', paragraphs: [
        'Paragraph 1. On the classroom table stood Ravi’s bridge, made from thin strips of card. One end sagged. Ravi pushed his chair back. “It will never hold anything,” he muttered. Across the table, Ellie put down her own finished model.',
        'Paragraph 2. “Let’s look underneath,” she said. She crouched beside the table and pointed to the unsupported middle. Ravi fetched two spare strips. Together they folded the strips into triangles and fixed them below the bridge. Ellie waited while Ravi pressed the joins firmly into place.',
        'Paragraph 3. Ravi set a toy car on the bridge. It held. He added another. The card trembled, but the bridge stayed upright. His shoulders loosened. “Try the lorry,” he said, reaching for the largest vehicle in the box.',
        'Paragraph 4. When their teacher arrived, Ravi moved aside so she could see the supports. “Ellie helped me work out what was wrong,” he said. Ellie smiled and returned to her own table.',
      ] },
      { title: 'Choose evidence that supports this particular point', paragraphs: [
        'To show Ravi’s early discouragement, his prediction that the bridge will never hold anything is relevant. To show Ellie’s helpfulness, her suggestion and examination of the bridge are stronger choices. A detail can be true without supporting the point you are making.',
        'Keep quotations short enough to discuss clearly, but long enough to preserve the meaning. There is no universal three-word limit. Do not remove words in a way that reverses the original meaning, and do not put changed wording inside quotation marks.',
      ] },
      { title: 'Explain rather than repeat', paragraphs: [
        '“His shoulders loosened means his shoulders loosened” adds nothing. Explain that this physical change suggests his tension is easing after the bridge succeeds. Connect the action to its context, rather than assuming relaxed shoulders always mean the same thing.',
        'A response can include precise paraphrased evidence when the question permits it. “He credits Ellie when the teacher arrives” identifies a relevant event without copying the speech. If the question specifically requests a quotation, include one accurately.',
      ] },
      { title: 'Improve a thin answer', paragraphs: [
        'For “How does Ravi show appreciation?”, the answer “He is nice” is too vague. “He thanks Ellie” is closer, but the passage does not contain those exact words. A more precise response explains that he acknowledges her help to the teacher, giving Ellie credit for solving the problem.',
        'Before checking the practice answers, underline your point, identify your evidence and ask whether your explanation links the two. Alternative wording can work. These examples do not assign marks or claim that every examiner uses an identical formula.',
      ] },
    ],
    examples: [
      { question: 'How does Ravi’s speech show that he is discouraged at the start?', steps: ['Point: Ravi expects the bridge to fail.', 'Evidence: he says “It will never hold anything”.', 'Explanation: “never” makes the prediction absolute, showing he has little hope at that moment.'], answer: 'Ravi expects failure. His words “never hold anything” suggest that he has lost hope in the bridge at this point.' },
      { question: 'Give evidence that Ellie actively helps rather than simply watches.', steps: ['Select an action that contributes to finding the problem.', 'She looks beneath the model and identifies the unsupported middle.', 'Explain how that action helps them decide where support is needed.'], answer: 'Ellie points to the unsupported middle, helping Ravi identify where the bridge needs strengthening.' },
      { question: 'Explain what “His shoulders loosened” suggests in paragraph 3.', steps: ['Quote only the phrase being discussed.', 'Connect it to the bridge holding the cars immediately beforehand.', 'Interpret the physical change without inventing a new event.'], answer: '“His shoulders loosened” suggests relief: the bridge has held the cars, so his tension begins to ease.' },
    ],
    mistakes: ['Adding a quotation without explaining how it supports the answer.', 'Choosing evidence that is true but irrelevant to the question.', 'Changing the text inside quotation marks.', 'Using the same detail twice as if it were two separate pieces of evidence.', 'Applying PEE to a question that asks only for a word or short fact.'],
    questions: [
      { question: 'Copy one word from Ravi’s first speech that makes his prediction sound absolute.', answer: 'never', explanation: '“Never” rules out any future success in his prediction. The instruction asks for one word, so no paragraph is needed.' },
      { question: 'Which quotation better supports the point that Ellie investigates the problem: “put down her own finished model” or “pointed to the unsupported middle”? Explain.', answer: '“pointed to the unsupported middle”.', explanation: 'This identifies the weak part of Ravi’s bridge. Putting down her model shows that she stops her work, but not that she finds the problem.' },
      { question: 'Explain how Ravi’s request “Try the lorry” suggests growing confidence.', answer: 'He is willing to test the bridge with the largest vehicle, suggesting that he now expects it to cope with a greater challenge.', explanation: 'The passage identifies the lorry as the largest vehicle. The answer links this choice to increased confidence without claiming the lorry test succeeds.' },
      { question: 'Use your own words to explain how Ravi gives Ellie credit.', answer: 'He tells the teacher that she helped him discover the problem.', explanation: 'This paraphrases his final speech accurately. It avoids claiming that Ellie did all the building or that he explicitly says thank you.' },
      { question: 'Improve this answer to “How does Ellie show patience?”: “Ellie is patient because she is patient.” Use a detail from paragraph 2.', answer: 'Ellie waits while Ravi secures the joins, allowing him time to finish the task himself.', explanation: 'The waiting is evidence; allowing him time explains why it suggests patience. The original answer merely repeats the point.' },
      { question: 'A pupil writes: “The bridge carries the lorry successfully.” Is this supported? Explain what the passage actually establishes.', answer: 'No. The bridge holds two toy cars, and Ravi suggests testing the lorry, but the result of that test is not given.', explanation: 'A request to try something is not evidence that it happened successfully. This response distinguishes the stated result from an unsupported extension.' },
    ],
    relatedSlugs: ['comprehension-retrieval', 'comprehension-inference'], sources: [curriculum],
  },
];
