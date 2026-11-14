import Link from 'next/link';

/** English-only hub guidance; all resources already published. */
export function EnglishResourceChooser() {
  return <section id="choose-english-practice" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-12" aria-labelledby="english-resource-title">
    <p className="brand-eyebrow">Choose the task, then the format</p>
    <h2 id="english-resource-title" className="mt-3 text-3xl font-bold">Which English practice do you need?</h2>
    <p className="mt-4 max-w-3xl leading-7 text-slate-600">A punctuation booklet, a written reading answer and an online quiz practise different things. Choose the skill you want to improve before choosing a timer. These original resources support exams taken in 2027; they are not official past papers or a complete school assessment.</p>
    <div className="mt-7 grid gap-7 md:grid-cols-3">
      <article className="border-t border-stone-200 pt-5">
        <h3 className="text-xl font-bold">Explain an answer about a passage</h3>
        <p className="mt-3 leading-7 text-slate-600">Use a reading lesson when an answer needs to be written in your own words. Each lesson has an original passage and six questions. Write before revealing the model; compare the meaning and evidence, not just the wording. This is self-review, not automatic marking.</p>
        <p className="mt-3 leading-7 text-slate-600">Start with retrieval if finding the relevant detail is difficult. Move to inference when the answer is implied; use the evidence lesson if the explanation lacks support.</p>
        <Link href="#topic-practice" className="mt-4 inline-block font-semibold text-emerald-900 underline underline-offset-4">Choose a written reading lesson ↓</Link>
      </article>
      <article className="border-t border-stone-200 pt-5">
        <h3 className="text-xl font-bold">Edit punctuation on paper</h3>
        <p className="mt-3 leading-7 text-slate-600">Our printable contains 16 questions on apostrophes and direct speech, with a separate explained-answer booklet. It is a focused punctuation resource, not a full comprehension paper. Keep the answers aside until the first attempt is finished.</p>
        <p className="mt-3 leading-7 text-slate-600">If speech marks are correct but the sentence still looks wrong, check whether the words after the speech report speaking or describe a separate action. Then try an exchange with more than one speaker.</p>
        <Link href="/blog/11-plus-direct-speech-punctuation" className="mt-4 block font-semibold text-emerald-900 underline underline-offset-4">Work through the dialogue examples →</Link>
        <Link href="/papers#english-printable" className="mt-3 block font-semibold text-emerald-900 underline underline-offset-4">Get English questions and answer PDFs →</Link>
      </article>
      <article className="border-t border-stone-200 pt-5">
        <h3 className="text-xl font-bold">Practise answering on screen</h3>
        <p className="mt-3 leading-7 text-slate-600">Use the online settings to choose English, a question count and untimed practice or a timed session. Check the displayed summary before starting. In practice mode, review feedback as you go; in a timed session, review after finishing.</p>
        <p className="mt-3 leading-7 text-slate-600">An online selection does not replace written-answer or creative-writing practice. For a rehearsal, check the school's current instructions for the required subjects and response format; our timer is a practice setting.</p>
        <Link href="/mock-exams#configure-practice" className="mt-4 inline-block font-semibold text-emerald-900 underline underline-offset-4">Choose English in the practice settings →</Link>
      </article>
    </div>
    <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-6">
      <h3 className="text-xl font-bold">Turn one correction into the next task</h3>
      <p className="mt-3 leading-7 text-slate-600">Note the reason for a mistake: missing evidence, an unfamiliar word or a punctuation decision. Revisit that one method, then try a different example without looking at the model. If the same question appears again, treat a correct answer as a useful rehearsal rather than proof of exam readiness.</p>
      <p className="mt-3 leading-7 text-slate-600">For example, after correcting a speech comma, change the spoken statement into a question and explain why its ending changes. For a reading answer, find a second detail that supports the same conclusion. Use the guides below for focused follow-up.</p>
    </div>
  </section>;
}
