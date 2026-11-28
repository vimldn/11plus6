'use client';
import { SchoolPaperEvidence } from '@/components/SchoolPaperEvidence';
import { schoolPaperEvidence } from '@/data/schoolPaperEvidence';

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ChevronRight, ExternalLink } from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SCHOOLS } from '@/lib/schools';

// ─── Static data for known schools ───────────────────────────────────────────
// Sources: official school admissions pages only. No unofficial claims made.

interface SchoolDetail {
  admissionsUrl?: string;
  entryStages?: string;
  placesAvailable?: string;
  examNotes?: string;
  registrationWindow?: string;
  resultsTimeline?: string;
  catchmentArea?: string | boolean;
}

const SCHOOL_DETAILS: Record<string, SchoolDetail> = {
  'qe-boys': {
    admissionsUrl: 'https://www.qebarnet.co.uk/admissions-information/admissions/',
    entryStages: 'One round: English and Maths papers in a single session → results → CAF',
    placesAvailable: '180 for September 2027 entry',
    examNotes: 'Two multiple-choice papers: English and Mathematics. There is no separate verbal or non-verbal reasoning paper and no second testing round.',
    registrationWindow: 'For 2027 entry: registration deadline 8 July 2026 at noon; test 16 or 17 September 2026',
    resultsTimeline: 'For 2027 entry: results provisionally 1 October 2026; National Offer Day 1 March 2027',
    catchmentArea: false,
  },
  'henrietta-barnett': {
    admissionsUrl: 'https://www.hbschool.org.uk/admissions/',
    entryStages: 'Round 1 (GL Assessment — VR, NVR, English) → top 300 → Round 2 (school-set Maths & English)',
    placesAvailable: '120 per year',
    examNotes: 'Round 1 is GL Assessment multiple-choice covering English, Verbal Reasoning and Non-Verbal Reasoning. Round 2 is set by the school and tests Maths and English comprehension/writing. HBS does not release Round 2 past papers.',
    registrationWindow: 'Opens 1 April, closes 11 July (Year 5)',
    resultsTimeline: 'Round 1 results late September; Round 2 early October; Offers 1 March',
    catchmentArea: 'No catchment for Round 1. Post-Round 2, priority given to candidates within 3 miles.',
  },
  'wilsons': {
    admissionsUrl: 'https://www.wilsons.school/admissions-faqs/',
    entryStages: 'Sutton SET → shared second-stage English and Maths → CAF',
    placesAvailable: '180 per year',
    examNotes: 'For 2027 entry, the academic tests cover English and Maths, with no verbal or non-verbal reasoning. Stage 2 is shared with Sutton Grammar and Wallington County Grammar. Optional Music and Sport aptitude assessments are separate on 10 October 2026; aptitude applicants must still pass both academic stages.',
    registrationWindow: 'For 2027 entry: 1 May–31 July 2026; access-arrangement requests by 12 June 2026',
    resultsTimeline: 'SET: 15 September 2026; Stage 2: 3 October 2026; outcomes before October half term; offers 1 March 2027',
    catchmentArea: 'No general catchment restriction. Oversubscription priorities apply, with Sutton residence used in tied-score cases; consult the current admissions criteria.',
  },
  'reading-school': {
    admissionsUrl: 'https://www.reading-school.co.uk/page/?pid=116',
    entryStages: 'FSCE entrance test → eligibility outcome → CAF and oversubscription criteria',
    placesAvailable: '138 day places and 12 boarding places',
    examNotes: 'For 2027 entry, FSCE assesses application across the KS2 curriculum up to Year 5 and written creativity. The range can include English, Maths and other KS2 subjects; it is not a fixed four-subject GL test. Content changes annually. Use the official familiarisation guides; our subject practice is not an authorised FSCE paper or a replica of its exam.',
    registrationWindow: 'For 2027 entry: 27 March–17 May 2026 (midnight)',
    resultsTimeline: '2026 tests: 15 July (SEN), 16 July (in-catchment day and boarding), 25 September (out-of-catchment day). Results mid-October; offers 1 March 2027.',
    catchmentArea: 'Priority categories include feeder schools, Reading priority postcodes and the defined catchment. Check the 2027 admissions policy for the full order and eligibility rules.',
  },
  'tiffin-girls': {
    admissionsUrl: 'https://www.tiffingirls.org/admissions/year-7/',
    entryStages: 'Stage 1 (school-set English & Maths) → top ~450 → Stage 2 (written papers)',
    placesAvailable: '180 per year',
    examNotes: 'Both stages set by the school. Stage 1 is partly multiple-choice. Stage 2 is written and not released publicly. Combined score weighted 60% English, 40% Maths.',
    registrationWindow: 'Opens 3 June, closes 1 September (Year 5)',
    resultsTimeline: 'Stage 1 results 15 October; Stage 2 November; Offers 1 March',
    catchmentArea: 'Yes — 44 defined postal districts. Most places go to children in the catchment area.',
  },
  'tiffin': {
    admissionsUrl: 'https://www.tiffinschool.co.uk/admissions/year-7-admissions/',
  },
  'colchester-rgs': { admissionsUrl: 'https://www.crgs.co.uk/132/admissions-policy' },
  'latymer': { admissionsUrl: 'https://www.latymer.co.uk/2028admissionsyear7' },
  'newstead-wood': { admissionsUrl: 'https://www.newsteadwood.co.uk/admissions/year-7-admissions' },
  'st-olaves': { admissionsUrl: 'https://saintolaves.net/4205/key-dates-1' },
  'sutton-grammar': {
    admissionsUrl: 'https://www.suttongrammar.sutton.sch.uk/admissions/',
    entryStages: 'Sutton SET (Stage 1) → Stage 2 (shared with Wilson\'s and Wallington County)',
    placesAvailable: '120 per year (boys only)',
    examNotes: 'SET tests Maths and English only. Stage 2 is a written exam shared with Wilson\'s and Wallington County Grammar. Each school applies its own weighting and pass mark to the combined scores.',
    registrationWindow: 'SET opens 1 May, closes 1 August (Year 5)',
    resultsTimeline: 'SET late September; Stage 2 early October; Offers 1 March',
    catchmentArea: false,
  },
  'nonsuch': {
    admissionsUrl: 'https://www.nonsuchschool.org/admissions/',
    entryStages: 'Sutton SET (Stage 1) → NWSEE Stage 2 (shared with Wallington Girls)',
    placesAvailable: '120 per year (girls only)',
    examNotes: 'The Nonsuch and Wallington Second Stage Entrance Examination (NWSEE) is shared between Nonsuch and Wallington High School for Girls. Stage 2 consists of English (extended writing) and Maths (written). No comprehension in Stage 2 English.',
    registrationWindow: 'SET opens 1 May, closes 1 August (Year 5)',
    resultsTimeline: 'SET late September; Stage 2 October; Offers 1 March',
    catchmentArea: false,
  },
};

export default function SchoolPageClient({ params }: { params: { id: string } }) {
  const school = SCHOOLS.find((s) => s.id === params.id);
  if (!school) notFound();

  const s = (school.id === 'colchester-rgs' ? { ...school, examFormat: 'CSSE English and Mathematics — check current cycle instructions', subjects: ['english', 'maths'] } : school.id === 'latymer' ? { ...school, examFormat: 'Proposed Quest assessment for 2027 tests — consultation open', subjects: ['maths', 'english'] } : school.id === 'tiffin' ? { ...school, examFormat: 'Tiffin School with Quest — confirm cycle-specific papers', subjects: ['english', 'maths'] } : school.id === 'st-olaves' ? { ...school, examFormat: 'School SET: English, logic and maths; followed by Stage 2' } : school.id === 'newstead-wood' ? { ...school, examFormat: 'School selection test: verbal and non-verbal reasoning', subjects: ['verbal-reasoning', 'non-verbal-reasoning'] } : school) as any;
  const storedDetail = SCHOOL_DETAILS[school.id];
  // Retain the three cycle-specific grammar repairs already verified in the prior release.
  // Other undated legacy admissions prose is held, not promoted to current facts.
  const detail = ['qe-boys','wilsons','reading-school'].includes(school.id) ? {admissionsUrl:storedDetail?.admissionsUrl,examNotes:storedDetail?.examNotes,entryStages:storedDetail?.entryStages} as SchoolDetail : storedDetail ? {admissionsUrl:storedDetail.admissionsUrl} as SchoolDetail : undefined;
  const evidence=schoolPaperEvidence[school.id];
  const isGrammar = school.category === 'grammar';

  const subjectLabels: Record<string, string> = {
    maths: 'Maths',
    english: 'English',
    'verbal-reasoning': 'Verbal Reasoning',
    'non-verbal-reasoning': 'Non-Verbal Reasoning',
  };

  return <><SiteNav/><main id="main-content" className="school-profile">
    <header className="school-profile-hero"><Breadcrumbs items={[{label:'Home',href:'/'},{label:'Schools',href:'/schools'},{label:school.name}]}/><p className="brand-eyebrow">School guide · {isGrammar ? 'Grammar school' : 'Independent school'}</p><h1>{school.name}</h1>{s.location && <p className="school-location"><MapPin size={18}/>{s.location.area || s.location.city}{s.gender && <span> · {s.gender === 'boys' ? 'Boys' : s.gender === 'girls' ? 'Girls' : 'Mixed'}</span>}</p>}<p className="school-intro">Explore the entrance assessment, admissions information and practice options for {school.name}.</p>
    <dl className="school-facts"><div><dt>School type</dt><dd>{isGrammar ? 'Grammar' : 'Independent'}</dd></div><div><dt>Assessment</dt><dd>{evidence ? 'See cycle-specific source check' : detail ? s.examFormat || 'Check school policy' : 'Current format not verified here'}</dd></div><div><dt>Entry points</dt><dd>{s.entryPoints?.join(' · ') || 'Check school policy'}</dd></div></dl></header>
    <section id="school-papers" aria-labelledby="school-papers-title" className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <div className="rounded-2xl border border-emerald-900/15 bg-emerald-50 p-4 sm:p-6">
        <h2 id="school-papers-title" className="text-xl font-bold text-emerald-950">Free 11+ papers and practice for {school.name}</h2>
        {school.id === 'tiffin' ? <>
          <p className="mt-2 text-sm">Start with Tiffin’s official illustrative questions. These are samples, not released past papers.</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
            <li><a className="underline underline-offset-4" href="https://www.tiffinschool.co.uk/wp-content/uploads/2024/05/Illustrative-questions-English.pdf">Tiffin English sample PDF</a></li>
            <li><a className="underline underline-offset-4" href="https://www.tiffinschool.co.uk/wp-content/uploads/2024/05/Illustrative-questions-Maths.pdf">Tiffin maths sample PDF</a></li>
            <li><a className="underline underline-offset-4" href="https://www.tiffinschool.co.uk/wp-content/uploads/2026/04/Example-OMR-Marksheet.pdf">Example maths answer sheet (blank)</a></li>
          </ul>
        </> : school.id === 'qe-boys' ? <>
          <p className="mt-2 text-sm">QE publishes English and maths familiarisation material. The examples help with relevant skills but may not match the school’s exam format.</p>
          <a className="mt-3 inline-block text-sm font-semibold underline underline-offset-4" href="https://www.qebarnet.co.uk/admissions-information/sample-test-papers/">QE’s official sample materials</a>
        </> : <p className="mt-2 text-sm">We haven’t verified a downloadable official paper for this guide. Check the school’s admissions sources for familiarisation materials; the practice below is ours, not a school paper.</p>}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
          <Link className="underline underline-offset-4" href="/papers#free-papers-by-subject">Our free question and worked answer PDFs</Link>
          <Link className="underline underline-offset-4" href="/mock-exams">Start a free online mock</Link>
        </div>
      </div>
    </section>
    <nav className="school-jump-links" aria-label="On this school page"><a href="#assessment">Assessment</a><a href="#admissions">Admissions</a><a href="#dates">Dates</a><a href="#preparation">Preparation</a><a href="#sources">Official sources</a></nav>
    <div className="school-profile-layout"><div className="school-profile-sections">
      <section id="assessment"><p className="brand-eyebrow">01 / Understand the assessment</p><h2>What does the exam involve?</h2><dl className="school-detail-list"><div><dt>Provider / format</dt><dd>{evidence?.format || (detail ? s.examFormat : null) || 'A current cycle-specific format has not been verified here.'}</dd></div>{detail?.entryStages && <div><dt>Entry stages</dt><dd>{detail.entryStages}</dd></div>}{detail?.examNotes && <div><dt>What is tested</dt><dd>{detail.examNotes}</dd></div>}</dl><SchoolPaperEvidence schoolId={school.id}/><h3>{evidence || detail ? "Subjects and preparation areas" : "General preparation areas — not a verified school syllabus"}</h3>{school.id === 'reading-school' ? <p>Broad KS2 application through Year 5 and written creativity. The FSCE guide covers English, Maths and other curriculum subjects; the selection of content changes annually.</p> : s.subjects?.length ? <ul className="school-subject-links">{s.subjects.map((sub:string)=><li key={sub}><Link href={`/subjects/${sub}`}>{subjectLabels[sub] || sub}<ChevronRight size={16}/></Link></li>)}</ul> : <p>Check the school’s official admissions page for the subjects tested.</p>}</section>
      {school.id === 'colchester-rgs' && <section id="csse-cycle">
        <p className="brand-eyebrow">Sources checked · 20 November 2026</p>
        <h2>CSSE preparation for tests taken in 2027.</h2>
        <p>For September 2028 entry, <a className="underline" href="https://csse.org.uk/">CSSE</a> says registration opens in May 2027 and detailed dates will be published by Easter 2027. The exact opening day, deadline and test day remain unconfirmed here. The older 2027-entry guide describes tests taken in 2026. <Link className="underline" href="/exam-dates#csse-2027-tests">Compare the two cycles in our calendar</Link>.</p>
        <h3>English and maths, with official familiarisation</h3>
        <p>The consortium currently describes an English paper of 60 minutes plus 10 minutes for reading, and a 60-minute mathematics paper. Its English paper no longer includes applied reasoning questions. Check the final instructions for your child’s cycle. Use the <a className="underline" href="https://csse.org.uk/examination/">official familiarisation papers and guidance</a> to understand the actual tasks.</p>
        <h3>Turn practice into a useful next step</h3>
        <p>Start with <Link className="underline" href="/subjects/english/comprehension-retrieval">retrieving precise details from a passage</Link>. Write an answer before revealing the model, then identify the sentence that supports it. In maths, try our <Link className="underline" href="/blog/11-plus-multi-step-word-problems">multi-step word problems</Link>: explain why each operation is needed, and check the result against the question.</p>
        <p>Choose <Link className="underline" href="/papers">original practice papers and worked answers</Link> for selected skills, then <Link className="underline" href="/mock-exams">online practice settings</Link> when ready. These short resources are not official CSSE papers, complete syllabus coverage or a replica of the school’s examination.</p>
        <p>Test registration and applying for a school place are separate. Read the <a className="underline" href="https://www.crgs.co.uk/132/admissions-policy">school’s policy for the intended entry year</a> and your home authority’s application guidance. A policy labelled 2027–2028 concerns September 2027 entry; it does not confirm the rules for September 2028.</p>
      </section>}
      {school.id === 'latymer' && <section id="latymer-cycle">
        <p className="brand-eyebrow">Source check · 17 November 2026</p>
        <h2>Latymer tests in 2027: proposed changes for 2028 entry.</h2>
        <p>This is The Latymer School, the grammar school in Edmonton. It has a separate admissions process from Latymer Upper School and Godolphin and Latymer.</p>
        <div className="school-year-note"><h3>Consultation is still open</h3><p>The school’s <a className="underline" href="https://www.latymer.co.uk/2028admissionsyear7">2028-entry consultation</a> runs from 10 November to 22 December 2026. It proposes Quest Assessments, replacing verbal reasoning with English comprehension. The two proposed papers are maths, and English comprehension with writing. These changes concern tests in September 2027 for entry in September 2028; final arrangements are due by 28 February 2027.</p></div>
        <p>The <a className="underline" href="https://www.latymer.co.uk/north-london-grammar-school-admissions/year-7">general admissions page</a> describes the change more definitively. Because the cycle-specific consultation remains open, treat the future format as proposed until the school publishes its decision.</p>
        <h3>What can you put in the diary?</h3>
        <p><a className="underline" href="https://www.questassessments.com/parent-guidance-consortium/the-latymer-school-assessment">Quest’s school-linked guidance and free familiarisation</a> currently indicates registration from March to June 2027 and assessment in September. Exact registration deadlines and test days remain unconfirmed here. Check the final school timetable before making arrangements. The school lists an open afternoon on 29 April 2027; a visit is separate from test registration.</p>
        <h3>The previous intake used a different assessment</h3>
        <p>For September 2027 entry, the school’s <a className="underline" href="https://www.latymer.co.uk/north-london-grammar-school-admissions/year-7/faq">dated FAQ</a> describes GL maths and verbal reasoning plus school-set English. Its successive ranking and marking steps should not be read as invitations to separate exam days. <Link className="underline" href="/exam-dates#latymer-2027-tests">Compare the two cohorts in our exam calendar</Link>.</p>
        <h3>A useful preparation route now</h3>
        <p>Build transferable skills while the arrangements are finalised. Start with <Link className="underline" href="/subjects/english/comprehension-retrieval">finding information in a passage</Link>, then <Link className="underline" href="/subjects/english/comprehension-inference">explaining an inference</Link>. Answer independently before revealing the explanation, and point to the words that support your answer. For writing, draft a short scene and revise one sentence for clarity.</p>
        <p>In maths, use our <Link className="underline" href="/blog/11-plus-multi-step-word-problems">multi-step word-problem guide</Link> to practise choosing an operation and checking the result. Choose a <Link className="underline" href="/papers#maths-printable">maths printable</Link> or <Link className="underline" href="/papers#english-printable">English printable with worked answers</Link>, then revisit the skill behind each mistake.</p>
        <p>When ready, use <Link className="underline" href="/mock-exams?subject=maths#configure-practice">maths practice setup</Link> or <Link className="underline" href="/mock-exams?subject=english#configure-practice">English practice setup</Link>. Our questions are original general practice, not official Quest papers or a replica of Latymer’s proposed test. Check eligibility and any access-arrangement requirements directly with the school.</p>
      </section>}
      {school.id === 'tiffin' && <section id="tiffin-2027-tests">
        <p className="brand-eyebrow">Source check · 11 November 2026</p>
        <h2>Tiffin tests in 2027: plan for 2028 entry.</h2>
        <p>The school links to <a className="underline" href="https://www.questassessments.com/parent-guidance-consortium/tiffin-11-plus">guidance produced by Tiffin School and Quest Assessments</a>. Its 2027 assessment timetable leads to offers on 1 March 2028. That is a different cycle from the school’s current September 2027-entry timetable.</p>
        <div className="school-year-note"><h3>What is still unconfirmed?</h3><p>The provider’s key-dates section leaves registration, the Stage 1 test and Stage 1 results to be confirmed. It gives only a mid-November 2027 window for Stage 2. Another paragraph mentions October results, so we are not treating that as a settled results date. Confirm the final dates and paper instructions with the school when published.</p></div>
        <h3>Keep the 2026 tests separate.</h3>
        <p>For September 2027 entry, the school lists Stage 1 on 2 October 2026 and Stage 2 on 12 November 2026. Its historical registration deadline conflicts between the introduction and timetable. <Link className="underline" href="/exam-dates#tests-in-2027">Compare the dated source notes in our exam calendar</Link>. The Tiffin Girls’ School has a separate process and different dates.</p>
        <h3>A preparation route while dates are pending</h3>
        <p>The provider identifies English and maths as preparation areas. Start with <Link className="underline" href="/subjects/english">English lessons and comprehension practice</Link> and <Link className="underline" href="/subjects/maths">maths lessons with worked examples</Link>. Use one short exercise to find a skill that needs attention, read its explanation, then attempt a fresh question independently.</p>
        <p>Next, choose an <Link className="underline" href="/papers">original practice paper and its worked answers</Link>. Use <Link className="underline" href="/mock-exams">general timed practice</Link> when the underlying skills are secure. Our material is not an official Tiffin paper or a simulation of its 2027 assessment; use the school-linked familiarisation materials for the actual instructions.</p>
      </section>}
      {school.id === 'st-olaves' && <section id="st-olaves-cycle">
        <p className="brand-eyebrow">Official sources checked · 12 November 2026</p>
        <h2>Tests taken in 2027, for autumn 2028 entry.</h2>
        <p>The school has published the following cycle on its <a className="underline" href="https://saintolaves.net/4205/key-dates-1">Year 7 key-dates page</a>. Test registration through the Supplementary Information Form is a separate step from applying for a school place.</p>
        <ul className="list-disc pl-6 space-y-2"><li>Registration opens: 7 June 2027 at 9am.</li><li>Registration closes: 28 June 2027 at midday.</li><li>Stage 1 SET: 17 September 2027.</li><li>Stage 1 outcome: mid-October, before half term; no exact day listed.</li><li>Stage 2 for invited candidates: 12 November 2027.</li><li>National Offer Day: 1 March 2028.</li></ul>
        <p>The offer-holder taster morning remains TBC. These dates must not be confused with the 18 September and 13 November 2026 tests for autumn 2027 entry. <Link className="underline" href="/exam-dates#st-olaves-2028">Return to the calendar’s cohort comparison</Link>.</p>
        <h3>Stage 1 is not reasoning only.</h3>
        <p>The school’s current <a className="underline" href="https://www.saintolaves.net/112/entrance-test-information">entrance-test instructions</a> describe a one-hour multiple-choice SET covering English, logic (verbal and non-verbal reasoning) and mathematics. Check the final instructions for your child’s cycle: this description is not a guarantee that the 2027 papers will be unchanged.</p>
        <h3>Build skills before adding time pressure</h3>
        <p>Use the subject links above to work on reading, number skills and reasoning. Try a short exercise, explain an error in your own words, then attempt another question without looking at the solution. Move to <Link className="underline" href="/papers">original papers and worked answers</Link> for mixed practice, and <Link className="underline" href="/mock-exams">general timed practice</Link> once methods are secure. These resources are not official St Olave’s papers or a replica of its selection test.</p>
      </section>}
      {school.id === 'newstead-wood' && <section id="newstead-cycle">
        <p className="brand-eyebrow">Sources checked · 13 November 2026</p>
        <h2>Planning for a Newstead test in 2027.</h2>
        <p>The <a className="underline" href="https://www.newsteadwood.co.uk/admissions/year-7-admissions">school’s admissions overview</a> places the test in September before entry. For September 2028 entry, that means planning for a test in 2027. Exact 2027 registration and test dates remain unconfirmed here; the school currently says summer-term registration, with the opening date to be confirmed. Do not reuse the September 2027-entry policy as a timetable for 2027 tests.</p>
        <h3>Two reasoning papers</h3>
        <p>The current <a className="underline" href="https://www.newsteadwood.co.uk/admissions/year-7-admissions/about-the-selection-test">selection-test page</a> describes verbal reasoning followed by non-verbal reasoning, with no other subjects tested. Confirm the final instructions for your cycle. This is a separate process from St Olave’s; its dates and papers do not apply here.</p>
        <p>The school says it does not sell past or specimen papers. Follow its own familiarisation links rather than treating a commercial school-labelled paper as official.</p>
        <h3>Plan a visit, then check registration separately</h3>
        <p>The <a className="underline" href="https://www.newsteadwood.co.uk/admissions/open-events">open-events page</a> lists a Year 7 open morning on 26 June 2027, with booking information due from early March. Booking a visit does not register your child for the selection test. <Link className="underline" href="/exam-dates#newstead-2027-tests">See the calendar’s Newstead planning note</Link>.</p>
        <h3>Practise the skill and explain the rule</h3>
        <p>Use the reasoning hubs above to choose one skill. For a word relationship, explain how the pair connects before choosing an answer. For a shape sequence, track one feature at a time: position, number, rotation or shading. After an error, write the rule you missed and try a fresh question.</p>
        <p>Choose the reasoning sets in <Link className="underline" href="/papers">our original papers and worked answers</Link>, then use <Link className="underline" href="/mock-exams">general timed practice</Link> when ready. Neither is an official Newstead paper or a replica of its 2027 test.</p>
      </section>}
      <section id="admissions"><p className="brand-eyebrow">02 / Plan your application</p><h2>Admissions and eligibility.</h2><dl className="school-detail-list">{detail?.placesAvailable && <div><dt>Places listed in this guide</dt><dd>{detail.placesAvailable}</dd></div>}<div><dt>Catchment and priority</dt><dd>{detail?.catchmentArea === false ? 'No catchment area listed in this guide. Check the current policy for eligibility and oversubscription priorities.' : typeof detail?.catchmentArea === 'string' ? detail.catchmentArea : 'Check the school’s current admissions policy.'}</dd></div><div><dt>Selection</dt><dd>{s.selective ? 'Entrance assessment required — consult the current policy.' : 'Check the school’s admissions criteria.'}</dd></div></dl></section>
      <section id="dates"><p className="brand-eyebrow">03 / Keep the years clear</p><h2>Registration, tests and offers.</h2><div className="school-year-note"><h3>Preparing for a test taken in 2027?</h3><p>Test year and school-entry year are different. A September 2027-entry date is not a 2027 exam date. Use the dated source check above where available, and confirm the school’s published policy for your intended entry year.</p></div><dl className="school-detail-list">{detail?.registrationWindow && <div><dt>Registration information currently held</dt><dd>{detail.registrationWindow}</dd></div>}{detail?.resultsTimeline && <div><dt>Tests, results and offers currently held</dt><dd>{detail.resultsTimeline}</dd></div>}</dl>{!detail?.registrationWindow && <p>{school.id === 'latymer' ? 'See the consultation and provisional planning windows above; exact test dates remain unconfirmed.' : school.id === 'st-olaves' ? 'See the dated 2027-test timetable above and check the school for subsequent changes.' : evidence?.cohort || 'Confirmed dates are not recorded in this guide. Check the official admissions page.'}</p>}<Link className="brand-text-link" href="/exam-dates">Explore the exam dates guide <ChevronRight size={16}/></Link></section>
      <section id="preparation"><p className="brand-eyebrow">04 / Build your skills</p><h2>A useful place to start.</h2><p>Use our original practice to build skills and review explanations. Our questions are not official school papers or a guarantee of the school’s exam format.</p><div className="school-practice-actions"><Link href={`/papers?highlight=${school.id}`} className="brand-button">Explore practice papers <ChevronRight size={18}/></Link><Link href="/mock-exams" className="brand-text-link">General mock exams <ChevronRight size={16}/></Link></div></section>
      <section id="sources"><p className="brand-eyebrow">05 / Check the details</p><h2>Official admissions sources.</h2><p>School policies can change. Confirm dates, access arrangements, eligibility and application steps directly with the school before acting.</p>{evidence?.sourceUrl || detail?.admissionsUrl ? <a href={evidence?.sourceUrl || detail?.admissionsUrl} target="_blank" rel="noopener noreferrer" className="brand-text-link">{school.name}: official admissions <ExternalLink size={16}/></a> : <p>This guide does not yet have a verified official admissions link.</p>}{!detail && !evidence && <p className="mt-6">A detailed cycle-specific admissions profile for this school is not yet verified here.</p>}</section>
    </div><aside className="school-profile-sidebar"><p className="brand-eyebrow">Your next step</p><h2>Start with the school.</h2><p>Confirm the right entry year and assessment before choosing your preparation.</p>{(evidence?.sourceUrl || detail?.admissionsUrl) && <a href={evidence?.sourceUrl || detail?.admissionsUrl} target="_blank" rel="noopener noreferrer" className="brand-button">Official admissions <ExternalLink size={16}/></a>}<Link href="#preparation" className="brand-text-link">Find practice options <ChevronRight size={16}/></Link></aside></div>
    <section className="school-related"><p className="brand-eyebrow">Continue exploring</p><h2>Related schools.</h2><div>{SCHOOLS.filter(rs=>rs.id!==school.id && rs.category===school.category).slice(0,4).map(rs=><Link key={rs.id} href={`/schools/${rs.id}`}><span>{rs.name}</span><ChevronRight size={18}/></Link>)}</div><Link href="/schools" className="brand-text-link mt-8">Back to all schools <ChevronRight size={16}/></Link></section>
  </main><SiteFooter/></>;
}
