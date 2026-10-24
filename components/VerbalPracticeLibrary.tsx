import Link from 'next/link';

const skills = [
  { id:'codes', title:'Letter codes', method:'Check the same letter shift against every letter in the example. Keep the direction and letter order; use the alphabet when the rule wraps.', example:'Using a forward shift of two, what does HEN become?', answer:'JGP: H → J, E → G, N → P.' },
  { id:'analogies', title:'Word analogies', method:'Describe the link between the first two words as a sentence. Apply the same relationship, in the same direction, to the second pair.', example:'Finger is to hand as toe is to what?', answer:'Foot. A finger is part of a hand; a toe is part of a foot.' },
  { id:'classifications', title:'Word classifications', method:'These foundation questions state the group. Check every option against that category rather than inventing a spelling or length rule.', example:'Which is not a colour name: red, green, spoon, blue?', answer:'Spoon. The other three words name colours; spoon names cutlery.' },
  { id:'sequences', title:'Letter and number sequences', method:'These starters use a constant step. Check every neighbouring pair, then apply the same step once more. They do not cover every possible sequence rule.', example:'Continue the constant-step sequence: 7, 10, 13, 16, ?', answer:'19. Each gap is +3, so 16 + 3 = 19.' },
];
export function VerbalPracticeLibrary() {
  return <section id="verbal-practice" aria-label="Verbal reasoning learning journeys" className="mx-auto max-w-6xl px-6 py-12">
    <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">Explain the rule · check it · try again</p>
    <h2 className="mt-3 text-3xl font-bold">Verbal reasoning: four focused practice routes</h2>
    <p className="mt-4 max-w-3xl leading-7 text-slate-600">Original starter practice for tests taken in 2027: letter codes, analogies, classifications and constant-step sequences. Each focused set has 10 questions; a mixed set has 12, three from each skill. These four-option activities are not official papers or a complete verbal-reasoning syllabus.</p>
    <div className="mt-6 flex flex-wrap gap-4"><Link href="/quiz?paper=verbal-reviewed&mode=practice" className="rounded-xl bg-emerald-900 px-5 py-4 font-bold text-white">Start mixed verbal reasoning →</Link><Link href="/quiz?paper=verbal-reviewed&mode=exam" className="rounded-xl border border-emerald-900 px-5 py-4 font-bold text-emerald-900">Try a 15-minute mixed set →</Link></div>
    <ul className="mt-8 grid gap-6 sm:grid-cols-2">{skills.map(skill=><li key={skill.id} className="rounded-2xl border border-slate-200 bg-white p-6">
      <h3 className="text-xl font-bold">{skill.title}</h3><p className="mt-4 leading-7 text-slate-600">{skill.method}</p>
      <details className="mt-5 rounded-xl bg-stone-50 p-4"><summary className="cursor-pointer font-semibold text-emerald-900">Worked starter: {skill.example}</summary><p className="mt-4 leading-7">{skill.answer}</p></details>
      <div className="mt-6 flex flex-wrap gap-4"><Link className="rounded-xl bg-emerald-900 px-4 py-3 font-bold text-white" href={`/quiz?paper=verbal-reviewed&topic=${skill.id}&mode=practice`}>Practise {skill.title.toLowerCase()} →</Link><Link className="self-center font-semibold text-emerald-900 underline" href={`/quiz?paper=verbal-reviewed&topic=${skill.id}&mode=exam`}>Timed practice →</Link></div>
    </li>)}</ul>
    <p className="mt-6 max-w-3xl leading-7 text-slate-600">Practice mode explains each answer as you go. Afterwards, review missed questions or try other questions on the supported skills you missed. The small analogy and classification pools can repeat across attempts; a fresh follow-up excludes the questions in the attempt you just finished. Timed sessions use our 15-minute setting.</p>
    <div className="mt-5 flex flex-wrap gap-5 font-semibold text-emerald-900"><Link className="underline" href="/subjects/verbal-reasoning">Verbal reasoning subject hub →</Link><Link className="underline" href="/papers">Printable papers and other practice →</Link><a className="underline" href="https://11plus.gl-assessment.co.uk/pages/free-materials">Official GL familiarisation →</a></div>
  </section>;
}
