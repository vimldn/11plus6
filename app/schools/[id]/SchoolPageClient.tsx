'use client';

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
    entryStages: 'Stage 1 (school-set English & Maths) → top ~450 → Stage 2 (written papers)',
    placesAvailable: '180 per year',
    examNotes: 'Stage 1 Maths includes a mix of multiple-choice and grid-answer questions. Stage 2 papers are written and not released publicly. Up to 10% of places reserved for Music/Sport aptitude.',
    registrationWindow: 'Opens 4 June, closes 3 September (Year 5)',
    resultsTimeline: 'Stage 1 results 15 October; Stage 2 November; Offers 1 March',
    catchmentArea: 'Yes — Inner Priority Area (<10km) and Outer Priority Area (10–14km from school).',
  },
  'st-olaves': {
    admissionsUrl: 'https://www.saintolaves.net/admissions',
    entryStages: "SET Stage 1 (VR, NVR, Maths, English) → top 450 → Stage 2 (Maths & English written)",
    placesAvailable: '124 per year',
    examNotes: "Stage 1 (SET) is a 1-hour multiple-choice paper with approx. 60 questions across four sections. Top 450 sit Stage 2 which consists of two 1-hour written papers set by the school. No past papers released for Stage 2.",
    registrationWindow: 'Closes 9 July (Year 5)',
    resultsTimeline: 'Stage 1 results mid-October; Stage 2 14 November; Offers 1 March',
    catchmentArea: false,
  },
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

  const s = school as any;
  const detail = SCHOOL_DETAILS[school.id];
  const isGrammar = school.category === 'grammar';

  const subjectLabels: Record<string, string> = {
    maths: 'Maths',
    english: 'English',
    'verbal-reasoning': 'Verbal Reasoning',
    'non-verbal-reasoning': 'Non-Verbal Reasoning',
  };

  return <><SiteNav/><main id="main-content" className="school-profile">
    <header className="school-profile-hero"><Breadcrumbs items={[{label:'Home',href:'/'},{label:'Schools',href:'/schools'},{label:school.name}]}/><p className="brand-eyebrow">School guide · {isGrammar ? 'Grammar school' : 'Independent school'}</p><h1>{school.name}</h1>{s.location && <p className="school-location"><MapPin size={18}/>{s.location.area || s.location.city}{s.gender && <span> · {s.gender === 'boys' ? 'Boys' : s.gender === 'girls' ? 'Girls' : 'Mixed'}</span>}</p>}<p className="school-intro">Explore the entrance assessment, admissions information and practice options for {school.name}.</p>
    <dl className="school-facts"><div><dt>School type</dt><dd>{isGrammar ? 'Grammar' : 'Independent'}</dd></div><div><dt>Assessment</dt><dd>{s.examFormat || 'Check school policy'}</dd></div><div><dt>Entry points</dt><dd>{s.entryPoints?.join(' · ') || 'Check school policy'}</dd></div></dl></header>
    <nav className="school-jump-links" aria-label="On this school page"><a href="#assessment">Assessment</a><a href="#admissions">Admissions</a><a href="#dates">Dates</a><a href="#preparation">Preparation</a><a href="#sources">Official sources</a></nav>
    <div className="school-profile-layout"><div className="school-profile-sections">
      <section id="assessment"><p className="brand-eyebrow">01 / Understand the assessment</p><h2>What does the exam involve?</h2><dl className="school-detail-list"><div><dt>Provider / format</dt><dd>{s.examFormat || 'See the official admissions information.'}</dd></div>{detail?.entryStages && <div><dt>Entry stages</dt><dd>{detail.entryStages}</dd></div>}{detail?.examNotes && <div><dt>What is tested</dt><dd>{detail.examNotes}</dd></div>}</dl><h3>Subjects and preparation areas</h3>{school.id === 'reading-school' ? <p>Broad KS2 application through Year 5 and written creativity. The FSCE guide covers English, Maths and other curriculum subjects; the selection of content changes annually.</p> : s.subjects?.length ? <ul className="school-subject-links">{s.subjects.map((sub:string)=><li key={sub}><Link href={`/subjects/${sub}`}>{subjectLabels[sub] || sub}<ChevronRight size={16}/></Link></li>)}</ul> : <p>Check the school’s official admissions page for the subjects tested.</p>}</section>
      <section id="admissions"><p className="brand-eyebrow">02 / Plan your application</p><h2>Admissions and eligibility.</h2><dl className="school-detail-list">{detail?.placesAvailable && <div><dt>Places listed in this guide</dt><dd>{detail.placesAvailable}</dd></div>}<div><dt>Catchment and priority</dt><dd>{detail?.catchmentArea === false ? 'No catchment area listed in this guide. Check the current policy for eligibility and oversubscription priorities.' : typeof detail?.catchmentArea === 'string' ? detail.catchmentArea : 'Check the school’s current admissions policy.'}</dd></div><div><dt>Selection</dt><dd>{s.selective ? 'Entrance assessment required — consult the current policy.' : 'Check the school’s admissions criteria.'}</dd></div></dl></section>
      <section id="dates"><p className="brand-eyebrow">03 / Keep the years clear</p><h2>Registration, tests and offers.</h2><div className="school-year-note"><h3>Preparing for a test taken in 2027?</h3><p>Test year and school-entry year are different. A September 2027-entry date is not a 2027 exam date. Treat undated timelines below as indicative, and check the school’s published policy for your intended entry year.</p></div><dl className="school-detail-list">{detail?.registrationWindow && <div><dt>Registration information currently held</dt><dd>{detail.registrationWindow}</dd></div>}{detail?.resultsTimeline && <div><dt>Tests, results and offers currently held</dt><dd>{detail.resultsTimeline}</dd></div>}</dl>{!detail?.registrationWindow && <p>Confirmed dates are not recorded in this guide. Check the official admissions page.</p>}<Link className="brand-text-link" href="/exam-dates">Explore the exam dates guide <ChevronRight size={16}/></Link></section>
      <section id="preparation"><p className="brand-eyebrow">04 / Build your skills</p><h2>A useful place to start.</h2><p>Use our original practice to build skills and review explanations. Our questions are not official school papers or a guarantee of the school’s exam format.</p><div className="school-practice-actions"><Link href={`/papers?highlight=${school.id}`} className="brand-button">Explore practice papers <ChevronRight size={18}/></Link><Link href="/mock-exams" className="brand-text-link">General mock exams <ChevronRight size={16}/></Link></div></section>
      <section id="sources"><p className="brand-eyebrow">05 / Check the details</p><h2>Official admissions sources.</h2><p>School policies can change. Confirm dates, access arrangements, eligibility and application steps directly with the school before acting.</p>{detail?.admissionsUrl ? <a href={detail.admissionsUrl} target="_blank" rel="noopener noreferrer" className="brand-text-link">{school.name}: official admissions <ExternalLink size={16}/></a> : <p>This guide does not yet have a verified official admissions link.</p>}{!detail && <p className="mt-6">A detailed admissions profile for this school is not yet available here.</p>}</section>
    </div><aside className="school-profile-sidebar"><p className="brand-eyebrow">Your next step</p><h2>Start with the school.</h2><p>Confirm the right entry year and assessment before choosing your preparation.</p>{detail?.admissionsUrl && <a href={detail.admissionsUrl} target="_blank" rel="noopener noreferrer" className="brand-button">Official admissions <ExternalLink size={16}/></a>}<Link href="#preparation" className="brand-text-link">Find practice options <ChevronRight size={16}/></Link></aside></div>
    <section className="school-related"><p className="brand-eyebrow">Continue exploring</p><h2>Related schools.</h2><div>{SCHOOLS.filter(rs=>rs.id!==school.id && rs.category===school.category).slice(0,4).map(rs=><Link key={rs.id} href={`/schools/${rs.id}`}><span>{rs.name}</span><ChevronRight size={18}/></Link>)}</div><Link href="/schools" className="brand-text-link mt-8">Back to all schools <ChevronRight size={16}/></Link></section>
  </main><SiteFooter/></>;
}
