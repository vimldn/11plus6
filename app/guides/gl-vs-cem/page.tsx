import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { BookOpen, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'GL vs CEM: 11 Plus Exam Providers for 2027',
  description: 'Preparing for an 11 Plus exam in 2027? Compare GL, Cambridge Select Insight, FSCE and other formats, with official school sources and clear exam-year guidance.',
  alternates: { canonical: '/guides/gl-vs-cem' },
};

const sources = [
  ['GL Assessment: free familiarisation materials', 'https://11plus.gl-assessment.co.uk/pages/free-materials'],
  ['Cambridge: Select Insight entrance assessments', 'https://www.cem.org/entrance-assessments'],
  ["Queen Elizabeth’s School: entrance test FAQs", 'https://www.qebarnet.co.uk/admissions-information/secondary-transfer-entrance-test-faqs/'],
  ['Reading School: Year 7 admissions and FSCE information', 'https://www.reading-school.co.uk/admissions/year-7-entry'],
  ['Trafford Consortium: new provider announcement via AGSB', 'https://www.agsb.co.uk/page/?pid=386&title=New+Entrance+Exam+Provider'],
  ['Herschel Grammar School: Slough 2028 entry / 2027 exam', 'https://www.herschel.slough.sch.uk/year-7-admissions-2028/'],
  ["Wilson’s School: SET and second-stage FAQs", 'https://www.wilsons.school/admissions-faqs/'],
];

export default function GlVsCemPage() {
  return <>
    <SiteNav />
    <main className="bg-white min-h-screen">
      <section className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 pt-20 pb-14 px-4 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <p className="inline-flex items-center gap-2 text-indigo-700 font-bold mb-5"><BookOpen size={18} /> 11 Plus preparation guide</p>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5">GL vs CEM: which 11 Plus format matters for 2027?</h1>
          <p className="text-lg text-slate-600 leading-relaxed">Start with your target school and the year your child will sit the exam. A GL-versus-CEM label on a practice book does not establish the test your child will take. FSCE, Quest and school or consortium tests also matter.</p>
          <p className="text-sm text-slate-500 mt-5">Sources checked: 7 October 2026. Focus: exams taken in 2027.</p>
        </div>
      </section>
      <article className="max-w-4xl mx-auto px-4 py-12 space-y-12 text-slate-700 leading-relaxed">
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h2 className="text-2xl font-black text-slate-900 mb-3">Exam year and entry year are different</h2>
          <p>A page labelled “2027 entry” can describe an exam taken in 2026. For many families preparing for a grammar-school test in 2027, the relevant admissions policy is for September 2028 entry. Check both dates rather than assuming the year in a headline is the exam year. Independent-school timetables may differ.</p>
          <p className="mt-3">Where only the previous cycle is published, use it as background, not a confirmed specification for 2027. Do not carry forward an old test date or provider without checking.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Provider comparison: what should you check?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <caption className="text-left text-slate-600 mb-3">A starting point for choosing preparation materials, not a universal exam specification.</caption>
              <thead><tr className="bg-indigo-50 text-left"><th scope="col" className="p-4">Provider or format</th><th scope="col" className="p-4">Useful distinction</th><th scope="col" className="p-4">Your next step</th></tr></thead>
              <tbody>{[
                ['GL Assessment', 'Offers English, maths, verbal reasoning and non-verbal reasoning materials; schools select the assessed areas.', 'Read the local specification and the relevant official familiarisation materials.'],
                ['Cambridge Select Insight / CEM references', 'The current Cambridge entrance-assessment page describes digital tests of verbal, numerical and non-verbal ability.', 'Confirm the exact product with the school; older CEM-style books are not proof of the current format.'],
                ['FSCE', 'School-specific admissions information is essential. Trafford has announced FSCE for its September 2027 test.', 'Use the target school’s current guide, including its stated curriculum scope.'],
                ['Quest Assessments', 'Slough has announced Quest for its September 2027 examination.', 'Read the consortium’s 2028-entry information rather than its 2027-entry page.'],
                ['School or consortium tests', 'The SET and other locally specified assessments have their own arrangements.', 'Check each stage separately, including written responses where required.'],
              ].map(([name, distinction, next]) => <tr key={name} className="border-b border-slate-200"><th scope="row" className="text-left p-4 font-bold">{name}</th><td className="p-4">{distinction}</td><td className="p-4">{next}</td></tr>)}</tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-4">GL Assessment: prepare for the subjects your school uses</h2>
          <p>GL publishes free familiarisation materials covering English, maths and reasoning. Its guidance says local timings and question counts can differ from those materials. A sample booklet helps a child understand the task and answer layout; it is not a promise of the exact examination.</p>
          <p className="mt-3">Do not assume every school tests all four areas. For example, <a className="text-indigo-700 underline" href={sources[2][1]}>Queen Elizabeth’s School’s published FAQs</a> specify two multiple-choice papers: English and mathematics, in one session. The previous version of this guide incorrectly said QE tested all four subjects.</p>
          <p className="mt-3">Use <a className="text-indigo-700 underline" href={sources[0][1]}>GL’s own familiarisation page</a> alongside the school’s instructions. Select the relevant subjects, work on understanding first, and add timed practice once your child can explain their methods. Check the next admissions cycle before treating the current format as confirmed for a future test.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-4">What does CEM mean now?</h2>
          <p>Older comparisons and book covers can describe historical CEM-style paper tests. They should not be used as a current school-provider directory. The <a className="text-indigo-700 underline" href={sources[1][1]}>official Cambridge entrance-assessment page</a> now presents Cambridge Select Insight: a computer-based assessment covering verbal, numerical and non-verbal ability.</p>
          <p className="mt-3">Cambridge says it supplies candidate familiarisation materials and does not endorse commercial practice resources or tuition. A publisher’s “CEM-style” label therefore does not mean Cambridge has approved the book.</p>
          <p className="mt-3">If a school names a Cambridge assessment, ask for its precise name and candidate guidance. Do not substitute a paper mock for familiarisation with an actual digital interface. Equally, do not assume that a school previously associated with CEM still uses the same test.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Confirmed changes relevant to exams in 2027</h2>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Trafford: FSCE for September 2027 tests</h3>
          <p>The <a className="text-indigo-700 underline" href={sources[4][1]}>Trafford Consortium announcement</a> distinguishes three cohorts: GL for the September 2026 test and 2027 entry; FSCE for the September 2027 test and 2028 entry; and FSCE testing in the latter part of Year 5’s summer term for 2029 entry onwards. The announced September 2027 curriculum scope is KS2 English and mathematics through the end of Year 5.</p>
          <p className="mt-3">This applies to the named consortium: Altrincham Grammar School for Boys, Altrincham Grammar School for Girls, Sale Grammar School, Stretford Grammar School and Urmston Grammar School. Do not generalise it to every school in Trafford.</p>
          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">Slough: Quest for September 2027 tests</h3>
          <p><a className="text-indigo-700 underline" href={sources[5][1]}>Herschel’s 2028-entry page</a> confirms Quest Assessments for the Slough Consortium examination in September 2027. It describes two papers combining verbal and non-verbal reasoning, English and mathematics. Follow the consortium’s published guidance for this cohort rather than buying resources solely because an older page names GL.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Reading and Sutton: avoid misleading shortcuts</h2>
          <p><a className="text-indigo-700 underline" href={sources[3][1]}>Reading School’s published Year 7 page</a> identifies FSCE for 2027 entry, whose tests take place in 2026. It warns that content changes each year and its familiarisation guide is not a definitive list of test questions. Reading should not appear in a generic GL school list. For a test taken in 2027, check the new entry-cycle materials when published.</p>
          <p className="mt-3">For Sutton, <a className="text-indigo-700 underline" href={sources[6][1]}>Wilson’s current FAQs</a> describe the SET as multiple-choice English and maths, without separate verbal or non-verbal reasoning tests. The previous version of this guide wrongly called it open-answer. The second stage is a separate assessment: check the target school’s requirements rather than treating all rounds as identical. These published format details concern 2027 entry and need reconfirming for the next cycle.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Choose resources in five steps</h2>
          <ol className="list-decimal pl-6 space-y-3">
            <li><strong>Write down each target school, exam year and entry year.</strong> Keep separate rows if your child is taking more than one test.</li>
            <li><strong>Open the official admissions policy.</strong> Record the provider, subjects, stages and any published format guidance. Mark missing information as unconfirmed.</li>
            <li><strong>Start with official familiarisation.</strong> Notice how answers are entered, how instructions work and whether a written response is required.</li>
            <li><strong>Match practice to the skill.</strong> A fractions lesson builds maths understanding; it does not become an official school paper because the same topic is tested.</li>
            <li><strong>Review gaps before buying more papers.</strong> Use mistakes to decide whether your child needs explanation, untimed practice or help managing a known format.</li>
          </ol>
          <p className="mt-4">Our <Link className="text-indigo-700 underline" href="/subjects/maths">maths lessons</Link> and <Link className="text-indigo-700 underline" href="/subjects/english">English resources</Link> support subject preparation. Our original practice is not an official provider paper or a guarantee of the content, timing or difficulty of a particular school’s exam.</p>
        </section>
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Common questions</h2>
          <h3 className="text-lg font-bold text-slate-900">Is GL easier than CEM?</h3>
          <p className="mt-2">There is no useful universal difficulty ranking. The exact assessment, skills tested and your child’s strengths matter more than a provider label. Compare the school’s requirements rather than promises that one format is easy to coach.</p>
          <h3 className="text-lg font-bold text-slate-900 mt-5">Can we still use an old CEM workbook?</h3>
          <p className="mt-2">Individual vocabulary or maths exercises may still practise useful skills. Check their relevance and answers, and do not use the cover to infer your child’s current test format or spend time on subjects the school does not assess.</p>
          <h3 className="text-lg font-bold text-slate-900 mt-5">Does a practice-paper score predict admission?</h3>
          <p className="mt-2">No. A practice score is feedback on that exercise. It is not the school’s standardised result, qualifying threshold or offer decision.</p>
        </section>
        <section className="border-t border-slate-200 pt-8">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Official sources</h2>
          <ul className="list-disc pl-6 space-y-2">{sources.map(([name, url]) => <li key={url}><a className="text-indigo-700 underline" href={url}>{name}</a></li>)}</ul>
          <p className="text-sm text-slate-500 mt-4">The linked school or consortium is the authority for its own admissions arrangements. Recheck its current documents before registration and before selecting format-specific preparation.</p>
        </section>
        <Link href="/papers" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold bg-indigo-600 text-white">Browse practice papers <ChevronRight size={18} /></Link>
      </article>
    </main>
    <SiteFooter />
  </>;
}
