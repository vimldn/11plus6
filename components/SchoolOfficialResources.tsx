const spgs = 'https://spgs.org/wp-content/uploads/2026/06/';
const pates = 'https://www.patesgs.org/Admissions/Year-7-September-2028-Entry/';
export const patesCycle = {
  sourceUrl: 'https://www.patesgs.org/Admissions/Year-7-September-2028-Entry-30042026151914/',
  format: 'For September 2028 entry, FSCE provides Adventure (English and Maths, multiple choice), Beacon (English and Maths, short written answers) and Compass (multiple-choice questions using wider school subjects).',
  cohort: 'Registration opens at noon on 8 February 2027 and closes at noon on 19 March 2027. The entrance test is on 3 July 2027 for Year 7 entry in September 2028.',
};
export function SchoolOfficialResources({schoolId}:{schoolId:string}) {
  if (!['spgs-girls','pates-grammar'].includes(schoolId)) return null;
  const linkClass = 'block py-3 font-semibold text-emerald-900 underline underline-offset-4';
  return <div className="mt-6 rounded-xl border border-stone-300 bg-stone-50 p-5">
    <p className="brand-eyebrow">Official files checked · 27 November 2026</p>
    <h3>Free materials from the school</h3>
    {schoolId === 'spgs-girls' ? <>
      <p>For invited candidates, the written assessment on 5 December 2026 is for September 2027 entry. The files labelled 2027 below are samples for that entry cycle, not papers from an exam taken in 2027. Future formats may change.</p>
      <h4>English: open both files</h4>
      <a className={linkClass} href={spgs+'11-English-Sample-Paper-2027-3.pdf'}>English sample questions (PDF)</a>
      <a className={linkClass} href={spgs+'11-English-Sample-Reading-Passage-2027.pdf'}>English reading passage — use with the questions (PDF)</a>
      <h4>Mathematics: two alternative samples</h4>
      <p>Candidates sit one Mathematics paper on the day. These are two examples to explore, not two required exam papers.</p>
      <a className={linkClass} href={spgs+'11-Mathematics-Sample-Paper-1-2027-1.pdf'}>Mathematics sample 1 (PDF)</a>
      <a className={linkClass} href={spgs+'11-Mathematics-Sample-Paper-2-2027-1.pdf'}>Mathematics sample 2 (PDF)</a>
      <h4>General Comprehension: open both files</h4>
      <a className={linkClass} href={spgs+'11-General-Comprension-Sample-Paper-2027-1.pdf'}>General Comprehension sample questions (PDF)</a>
      <a className={linkClass} href={spgs+'11-General-Comprension-Sample-resource-booklet-2027-1.pdf'}>General Comprehension resource booklet — use with the questions (PDF)</a>
      <p>Keep each companion booklet beside its questions. These six links do not include a separate official answer sheet.</p>
    </> : <>
      <p>{patesCycle.cohort} These are different stages: registering for the test is not the same as applying for a school place. Follow the school’s admissions instructions for both.</p>
      <a className={linkClass} href={pates+'FSCE_Familiarisation_Guide_-_Information_for_Children__Gloucestershire_.pdf'}>FSCE children’s familiarisation booklet — Gloucestershire (PDF)</a>
      <a className={linkClass} href={pates+'FSCE_Familiarisation_Guide_-_Information_for_Parents__Gloucestershire_.pdf'}>FSCE parent familiarisation guide — Gloucestershire (PDF)</a>
      <p>Start with the children’s booklet to explore the tasks, then use the separate parent guide to understand the instructions. These are familiarisation guides, not past examination papers or our own mocks.</p>
    </>}
    <p>The links open files on the school’s website without an email gate here. Our original practice is separate; it is not endorsed by the school or a replica of its assessment.</p>
  </div>;
}
