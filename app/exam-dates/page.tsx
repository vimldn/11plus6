'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import {
  Calendar, Clock, AlertCircle, CheckCircle, ChevronRight,
  ExternalLink, Info, ChevronDown, Search, X,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Certainty = 'confirmed' | 'provisional' | 'pattern';

interface DateEntry {
  date: string;
  event: string;
  certainty: Certainty;
}

interface SchoolGroup {
  id: string;
  name: string;
  schools: string[];
  examFormat: string;
  region: string;
  color: string;
  entryYear: '2026' | '2027';
  dates: DateEntry[];
  officialUrl: string;
  note?: string;
}

// ─── 2026 Entry (archived) ────────────────────────────────────────────────────

const GROUPS_2026_ENTRY: SchoolGroup[] = [
  {
    id: 'qe-barnet-2026',
    name: "Queen Elizabeth's School (QE Barnet) — 2026 Entry",
    schools: ["Queen Elizabeth's School (Barnet)"],
    examFormat: 'GL Assessment (2-stage)',
    region: 'London',
    color: 'border-indigo-200 bg-indigo-50',
    entryYear: '2026',
    dates: [
      { date: '1 May 2025', event: 'Registration opens', certainty: 'confirmed' },
      { date: '11 July 2025', event: 'Registration closes (noon)', certainty: 'confirmed' },
      { date: '17–18 September 2025', event: 'Stage 1 entrance exams', certainty: 'confirmed' },
      { date: 'Early October 2025', event: 'Stage 1 results issued', certainty: 'confirmed' },
      { date: '31 October 2025', event: 'Common Application Form (CAF) deadline', certainty: 'confirmed' },
      { date: '2 March 2026', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.qebarnet.co.uk/admissions-information/admissions/',
  },
  {
    id: 'henrietta-barnett-2026',
    name: "The Henrietta Barnett School — 2026 Entry",
    schools: ['The Henrietta Barnett School'],
    examFormat: 'GL Assessment (2-stage)',
    region: 'London',
    color: 'border-rose-200 bg-rose-50',
    entryYear: '2026',
    dates: [
      { date: '1 April 2025', event: 'Registration opens', certainty: 'confirmed' },
      { date: '11 July 2025', event: 'Registration closes (5pm)', certainty: 'confirmed' },
      { date: 'Early September 2025', event: 'Round 1 entrance exam (GL Assessment)', certainty: 'confirmed' },
      { date: 'Late September 2025', event: 'Round 1 results; top 300 invited to Round 2', certainty: 'confirmed' },
      { date: '6 October 2025', event: 'Round 2 exam (Maths & English, school-set)', certainty: 'confirmed' },
      { date: '31 October 2025', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '2 March 2026', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.hbschool.org.uk/admissions/',
    note: 'Round 2 past papers are not released. GL familiarisation packs are linked from the HBS admissions page.',
  },
  {
    id: 'sutton-set-2026',
    name: "Sutton Grammar Schools (SET) — 2026 Entry",
    schools: ["Wilson's School", "Sutton Grammar School", "Wallington County Grammar School", "Nonsuch High School for Girls", "Wallington High School for Girls"],
    examFormat: "Sutton Selective Eligibility Test (SET) + Stage 2",
    region: 'London',
    color: 'border-violet-200 bg-violet-50',
    entryYear: '2026',
    dates: [
      { date: '1 May 2025', event: 'SET registration opens', certainty: 'confirmed' },
      { date: '1 August 2025 (midnight)', event: 'SET registration closes', certainty: 'confirmed' },
      { date: '15 September 2025', event: 'Selective Eligibility Test (SET)', certainty: 'confirmed' },
      { date: '3 October 2025', event: "Stage 2 exam (Wilson's, Sutton Grammar, Wallington County Grammar)", certainty: 'confirmed' },
      { date: '31 October 2025', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '2 March 2026', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.suttongrammar.sutton.sch.uk/admissions/selective-eligibility-test-examination/',
    note: 'One SET registration covers all five Sutton grammar schools.',
  },
  {
    id: 'tiffin-2026',
    name: 'Tiffin School & Tiffin Girls — 2026 Entry',
    schools: ["Tiffin School", "Tiffin Girls' School"],
    examFormat: "School own papers (2-stage)",
    region: 'London',
    color: 'border-emerald-200 bg-emerald-50',
    entryYear: '2026',
    dates: [
      { date: '3–4 June 2025', event: 'Stage 1 registration opens', certainty: 'confirmed' },
      { date: '1–3 September 2025', event: 'Stage 1 registration closes', certainty: 'confirmed' },
      { date: '2–3 October 2025', event: 'Stage 1 exams', certainty: 'confirmed' },
      { date: '15 October 2025', event: 'Stage 1 results; shortlist invited to Stage 2', certainty: 'confirmed' },
      { date: 'November 2025', event: 'Stage 2 exams', certainty: 'confirmed' },
      { date: '31 October 2025', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '2 March 2026', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.tiffinschool.co.uk/admissions/year-7-admissions/',
  },
  {
    id: 'st-olaves-2026',
    name: "St Olave's & Newstead Wood — 2026 Entry",
    schools: ["St Olave's Grammar School", "Newstead Wood School"],
    examFormat: "SET + Stage 2 / GL Assessment (2-stage)",
    region: 'London',
    color: 'border-amber-200 bg-amber-50',
    entryYear: '2026',
    dates: [
      { date: '9 July 2025', event: "St Olave's registration closes", certainty: 'confirmed' },
      { date: '19 September 2025', event: "St Olave's Stage 1 exam", certainty: 'confirmed' },
      { date: '14 November 2025', event: "St Olave's Stage 2 exam", certainty: 'confirmed' },
      { date: '31 October 2025', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '2 March 2026', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.saintolaves.net/admissions',
  },
];

// ─── 2027 Entry (current cycle) ───────────────────────────────────────────────

const GROUPS_2027_ENTRY: SchoolGroup[] = [
  // ── London Grammar Schools ──
  {
    id: 'qe-barnet-2027',
    name: "Queen Elizabeth's School (QE Barnet) — 2027 Entry",
    schools: ["Queen Elizabeth's School (Barnet)"],
    examFormat: 'GL Assessment (2-stage)',
    region: 'London',
    color: 'border-indigo-200 bg-indigo-50',
    entryYear: '2027',
    dates: [
      { date: 'May 2026', event: 'Registration expected to open', certainty: 'pattern' },
      { date: 'July 2026', event: 'Registration expected to close', certainty: 'pattern' },
      { date: 'September 2026', event: 'Stage 1 entrance exams', certainty: 'pattern' },
      { date: '30 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.qebarnet.co.uk/admissions-information/admissions/',
  },
  {
    id: 'henrietta-barnett-2027',
    name: "The Henrietta Barnett School — 2027 Entry",
    schools: ['The Henrietta Barnett School'],
    examFormat: 'GL Assessment (2-stage)',
    region: 'London',
    color: 'border-rose-200 bg-rose-50',
    entryYear: '2027',
    dates: [
      { date: '1 July 2026', event: 'Registration deadline (5pm)', certainty: 'confirmed' },
      { date: '2–4 September 2026', event: 'Round 1 entrance exam', certainty: 'confirmed' },
      { date: '28 September 2026', event: 'Round 1 results; top 300 invited to Round 2', certainty: 'confirmed' },
      { date: '5 October 2026', event: 'Round 2 exam', certainty: 'confirmed' },
      { date: '30 June 2026', event: 'Open Day (Year 5 — book from 3 June 2026)', certainty: 'confirmed' },
      { date: '30 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.hbschool.org.uk/admissions/',
  },
  {
    id: 'sutton-set-2027',
    name: "Sutton Grammar Schools (SET) — 2027 Entry",
    schools: ["Wilson's School", "Sutton Grammar School", "Wallington County Grammar School", "Nonsuch High School for Girls", "Wallington High School for Girls"],
    examFormat: "Sutton Selective Eligibility Test (SET) + Stage 2",
    region: 'London',
    color: 'border-violet-200 bg-violet-50',
    entryYear: '2027',
    dates: [
      { date: 'May 2026', event: 'SET registration expected to open', certainty: 'pattern' },
      { date: 'August 2026', event: 'SET registration expected to close', certainty: 'pattern' },
      { date: '15 September 2026', event: 'Selective Eligibility Test (SET)', certainty: 'confirmed' },
      { date: 'October 2026', event: 'Stage 2 exams', certainty: 'pattern' },
      { date: '30 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.suttongrammar.sutton.sch.uk/admissions/',
    note: 'One SET registration covers all five Sutton grammar schools. Each school has its own Stage 2 pass mark.',
  },
  {
    id: 'tiffin-2027',
    name: 'Tiffin School & Tiffin Girls — 2027 Entry',
    schools: ["Tiffin School", "Tiffin Girls' School"],
    examFormat: "School own papers (2-stage)",
    region: 'London',
    color: 'border-emerald-200 bg-emerald-50',
    entryYear: '2027',
    dates: [
      { date: 'June 2026', event: 'Stage 1 registration expected to open', certainty: 'pattern' },
      { date: 'September 2026', event: 'Stage 1 registration expected to close', certainty: 'pattern' },
      { date: 'October 2026', event: 'Stage 1 exams', certainty: 'pattern' },
      { date: 'November 2026', event: 'Stage 2 exams', certainty: 'pattern' },
      { date: '30 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.tiffinschool.co.uk/admissions/',
    note: "Both schools are in Kingston upon Thames. Stage 2 papers are not released publicly.",
  },
  {
    id: 'st-olaves-2027',
    name: "St Olave's & Newstead Wood — 2027 Entry",
    schools: ["St Olave's Grammar School", "Newstead Wood School"],
    examFormat: "SET + Stage 2 / GL Assessment (2-stage)",
    region: 'London',
    color: 'border-amber-200 bg-amber-50',
    entryYear: '2027',
    dates: [
      { date: '1 May 2026', event: 'Newstead Wood registration opens', certainty: 'confirmed' },
      { date: 'June 2026', event: "St Olave's registration opens", certainty: 'provisional' },
      { date: '30 June 2026', event: "Registration closes for both schools", certainty: 'provisional' },
      { date: '18 September 2026', event: "St Olave's Stage 1 exam", certainty: 'provisional' },
      { date: '25–26 September 2026', event: 'Newstead Wood entrance exam', certainty: 'provisional' },
      { date: '13 November 2026', event: "St Olave's Stage 2 exam", certainty: 'provisional' },
      { date: '30 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.saintolaves.net/admissions',
  },
  {
    id: 'latymer-2027',
    name: 'The Latymer School (Edmonton) — 2027 Entry',
    schools: ['The Latymer School'],
    examFormat: 'GL Assessment (2-stage)',
    region: 'London',
    color: 'border-sky-200 bg-sky-50',
    entryYear: '2027',
    dates: [
      { date: 'May 2026', event: 'Registration expected to open', certainty: 'pattern' },
      { date: 'July 2026', event: 'Registration expected to close', certainty: 'pattern' },
      { date: 'September 2026', event: 'Stage 1 exam', certainty: 'pattern' },
      { date: 'October–November 2026', event: 'Stage 2 exam (shortlisted candidates)', certainty: 'pattern' },
      { date: '30 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.latymer.co.uk/admissions',
  },
  {
    id: 'redbridge-2027',
    name: 'Redbridge Grammar Schools — 2027 Entry',
    schools: ['Ilford County High School for Boys', 'Woodford County High School for Girls'],
    examFormat: "GL Assessment",
    region: 'London',
    color: 'border-cyan-200 bg-cyan-50',
    entryYear: '2027',
    dates: [
      { date: '30 April 2026', event: 'Open Evenings for both schools', certainty: 'confirmed' },
      { date: '1 May 2026', event: 'Registration opens', certainty: 'confirmed' },
      { date: '15 June 2026 (5pm)', event: 'Registration closes', certainty: 'confirmed' },
      { date: '18 September 2026', event: '11+ test day', certainty: 'confirmed' },
      { date: 'Mid-October 2026', event: 'Results emailed to parents', certainty: 'confirmed' },
      { date: '30 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.redbridge.gov.uk/schools/redbridge-11-plus/',
  },

  // ── Manchester / Trafford ──
  {
    id: 'trafford-2027',
    name: 'Trafford Grammar Schools — 2027 Entry',
    schools: ['Altrincham Grammar School for Boys', 'Altrincham Grammar School for Girls', 'Sale Grammar School', 'Stretford Grammar School', 'Urmston Grammar School', 'Loreto Grammar School'],
    examFormat: 'CEM-style (Trafford consortium)',
    region: 'Manchester',
    color: 'border-fuchsia-200 bg-fuchsia-50',
    entryYear: '2027',
    dates: [
      { date: 'April–May 2026', event: 'Registration expected to open', certainty: 'pattern' },
      { date: 'June 2026', event: 'Registration expected to close', certainty: 'pattern' },
      { date: 'September 2026', event: 'Trafford consortium 11+ test day', certainty: 'pattern' },
      { date: 'October 2026', event: 'Results issued to parents', certainty: 'pattern' },
      { date: '31 October 2026', event: 'CAF deadline (Trafford LA)', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.trafford.gov.uk/residents/schools-and-learning/secondary/11plus.aspx',
    note: 'Trafford grammar schools use CEM-style papers specifically designed to be less coachable. One registration covers all Trafford consortium schools.',
  },
  {
    id: 'withington-mgsc-2027',
    name: 'Withington Girls & Manchester Grammar School — 2027 Entry',
    schools: ['Withington Girls\' School', 'Manchester Grammar School'],
    examFormat: 'School-set papers (independent)',
    region: 'Manchester',
    color: 'border-pink-200 bg-pink-50',
    entryYear: '2027',
    dates: [
      { date: 'Autumn 2026', event: 'Registration and assessments for Year 7 entry', certainty: 'pattern' },
      { date: 'October–November 2026', event: 'Entrance exams (Maths, English, Reasoning)', certainty: 'pattern' },
      { date: 'November–December 2026', event: 'Interviews (shortlisted candidates)', certainty: 'pattern' },
      { date: 'January 2027', event: 'Offers sent to successful candidates', certainty: 'pattern' },
    ],
    officialUrl: 'https://www.wgs.org/admissions',
    note: 'MGS and WGS are independent schools with their own entrance processes. Check each school\'s admissions page for exact registration dates.',
  },

  // ── Birmingham ──
  {
    id: 'king-edward-birmingham-2027',
    name: 'King Edward VI Schools (Birmingham) — 2027 Entry',
    schools: ['King Edward VI High School for Girls', 'King Edward VI Handsworth School for Girls', 'King Edward VI Aston School', 'King Edward VI Camp Hill (Boys & Girls)', 'King Edward VI Five Ways'],
    examFormat: 'King Edward VI Foundation test (KE Test)',
    region: 'Birmingham',
    color: 'border-orange-200 bg-orange-50',
    entryYear: '2027',
    dates: [
      { date: 'September 2026', event: 'Registration expected to open', certainty: 'pattern' },
      { date: 'October 2026', event: 'Registration closes', certainty: 'pattern' },
      { date: 'November 2026', event: 'KE Test (all KE Foundation schools share one test day)', certainty: 'pattern' },
      { date: 'December 2026', event: 'Results and school-specific assessments', certainty: 'pattern' },
      { date: '31 October 2026', event: 'CAF deadline (Birmingham LA)', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.kehs.org.uk/senior-school/admissions/',
    note: 'All King Edward VI Foundation grammar schools share the same initial KE Test. Each school then makes its own offer decisions. KEHS (High School for Girls) is an independent school within the Foundation.',
  },

  // ── Reading / Berkshire ──
  {
    id: 'reading-berkshire-2027',
    name: 'Reading & Berkshire Grammar Schools — 2027 Entry',
    schools: ['Reading School', 'Kendrick School', 'Upton Court Grammar School', 'Herschel Grammar School', 'Langley Grammar School', 'St Bernard\'s Catholic Grammar School'],
    examFormat: 'GL Assessment (Berkshire shared process)',
    region: 'Reading',
    color: 'border-lime-200 bg-lime-50',
    entryYear: '2027',
    dates: [
      { date: 'May 2026', event: 'Registration expected to open', certainty: 'pattern' },
      { date: 'June 2026', event: 'Registration deadline', certainty: 'pattern' },
      { date: 'September 2026', event: '11+ test day (GL Assessment)', certainty: 'pattern' },
      { date: 'October 2026', event: 'Results issued; Stage 2 invitations sent', certainty: 'pattern' },
      { date: '31 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.reading-school.co.uk/admissions',
    note: 'Reading School and Kendrick are among the most selective grammar schools in England with very high qualifying score thresholds.',
  },

  // ── Colchester / Essex ──
  {
    id: 'colchester-2027',
    name: 'Colchester Royal Grammar School — 2027 Entry',
    schools: ['Colchester Royal Grammar School'],
    examFormat: 'GL Assessment',
    region: 'Essex',
    color: 'border-teal-200 bg-teal-50',
    entryYear: '2027',
    dates: [
      { date: 'May 2026', event: 'Registration opens (Essex shared process)', certainty: 'pattern' },
      { date: 'June 2026', event: 'Registration closes', certainty: 'pattern' },
      { date: 'September 2026', event: 'Essex 11+ test day', certainty: 'pattern' },
      { date: 'October 2026', event: 'Results issued', certainty: 'pattern' },
      { date: '31 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.crgs.co.uk/admissions',
    note: 'CRGS is part of the Essex selective school process. One application covers all Essex grammar schools.',
  },

  // ── Cheltenham / Gloucestershire ──
  {
    id: 'gloucestershire-2027',
    name: 'Gloucestershire Grammar Schools — 2027 Entry',
    schools: ["Pate's Grammar School", 'Plus 6 other Gloucestershire grammar schools'],
    examFormat: "GL Assessment (single test)",
    region: 'Cheltenham',
    color: 'border-green-200 bg-green-50',
    entryYear: '2027',
    dates: [
      { date: '18 May 2026', event: 'Registration opens', certainty: 'confirmed' },
      { date: '26 June 2026', event: 'Registration closes', certainty: 'confirmed' },
      { date: '7 September 2026', event: 'Test centre arrangements sent to parents', certainty: 'confirmed' },
      { date: '12 September 2026', event: 'Gloucestershire Grammar Schools Entrance Test', certainty: 'confirmed' },
      { date: 'Mid-October 2026', event: 'Results sent to parents', certainty: 'confirmed' },
      { date: '31 October 2026', event: 'CAF deadline', certainty: 'confirmed' },
      { date: '1 March 2027', event: 'National Secondary School Offers Day', certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.gloucestershire.gov.uk/schooladmissions/grammar-schools/',
    note: "Pate's Grammar is the most selective of the Gloucestershire schools. One registration covers all seven Gloucestershire grammar schools.",
  },

  // ── Oxford ──
  {
    id: 'oxford-independent-2027',
    name: 'Oxford Independent Schools — 2027 Entry',
    schools: ['Magdalen College School (Oxford)', 'Oxford High School (GDST)'],
    examFormat: 'School-set papers + interview',
    region: 'Oxford',
    color: 'border-blue-200 bg-blue-50',
    entryYear: '2027',
    dates: [
      { date: 'September–October 2026', event: 'Registration and assessments', certainty: 'pattern' },
      { date: 'October–November 2026', event: 'Entrance exams (Maths, English, Reasoning)', certainty: 'pattern' },
      { date: 'November–December 2026', event: 'Interviews (shortlisted candidates)', certainty: 'pattern' },
      { date: 'January 2027', event: 'Offers sent to successful candidates', certainty: 'pattern' },
    ],
    officialUrl: 'https://www.mcsoxford.org/admissions',
    note: 'MCS Oxford and Oxford High School (GDST) are independent schools with their own entrance processes. Check each school\'s admissions page for exact dates.',
  },

  // ── Guildford / Surrey ──
  {
    id: 'guildford-high-2027',
    name: 'Guildford High School — 2027 Entry',
    schools: ['Guildford High School'],
    examFormat: 'School-set papers (independent)',
    region: 'Guildford',
    color: 'border-yellow-200 bg-yellow-50',
    entryYear: '2027',
    dates: [
      { date: 'September–October 2026', event: 'Registration opens', certainty: 'pattern' },
      { date: 'October 2026', event: 'Entrance assessments (Maths & English)', certainty: 'pattern' },
      { date: 'November 2026', event: 'Interviews for shortlisted candidates', certainty: 'pattern' },
      { date: 'December 2026', event: 'Offers sent', certainty: 'pattern' },
    ],
    officialUrl: 'https://www.guildfordhigh.surrey.sch.uk/admissions',
    note: 'Guildford High is an independent day school. The entrance assessment covers Maths and English; strong performance in both is required.',
  },

  // ── Top London Independents ──
  {
    id: 'london-top-independents-2027',
    name: 'Top London Independent Schools — 2027 Entry',
    schools: ["St Paul's Girls' School", "St Paul's School", "North London Collegiate School", "King's College School (Wimbledon)", "City of London School", "City of London School for Girls", "Westminster School", "Haberdashers' Boys' School", "Haberdashers' Girls' School", "Highgate School", "Latymer Upper School", "James Allen's Girls' School", "Dulwich College", "Alleyn's School", "South Hampstead High School", "Notting Hill and Ealing High School", "Wimbledon High School", "Whitgift School", "Emanuel School", "Surbiton High School", "Lady Eleanor Holles School", "Godolphin and Latymer School"],
    examFormat: 'School-set papers + interview (some via ISEB Pre-Test)',
    region: 'London',
    color: 'border-slate-200 bg-slate-50',
    entryYear: '2027',
    dates: [
      { date: 'September–October 2026', event: 'Registration opens for most schools', certainty: 'pattern' },
      { date: 'October 2026', event: 'ISEB Pre-Test (for schools using it)', certainty: 'pattern' },
      { date: 'October–November 2026', event: 'Entrance exams (Maths, English, Reasoning)', certainty: 'pattern' },
      { date: 'November–December 2026', event: 'Interviews (shortlisted candidates)', certainty: 'pattern' },
      { date: 'January 2027', event: 'Offers sent to successful candidates', certainty: 'pattern' },
      { date: 'February–March 2027', event: 'Bursary and scholarship assessment (where applicable)', certainty: 'pattern' },
    ],
    officialUrl: 'https://www.spgs.org/admissions',
    note: 'Each school has its own registration timeline and entrance format. Some use the ISEB Pre-Test; others set their own papers. Always check the individual school\'s admissions page. Deadlines for popular schools fill quickly — register early.',
  },

  // ── Boarding / National ──
  {
    id: 'boarding-national-2027',
    name: 'Leading Boarding Schools — 2027 Entry',
    schools: ['Eton College', 'Harrow School', 'Wycombe Abbey', 'Tonbridge School', 'Sevenoaks School', 'Brighton College'],
    examFormat: 'Pre-test + Common Entrance / school-set papers',
    region: 'National',
    color: 'border-indigo-100 bg-indigo-50',
    entryYear: '2027',
    dates: [
      { date: 'Year 6 (age 10–11)', event: 'Registration and pre-assessment for entry two years ahead (Year 9 entry)', certainty: 'pattern' },
      { date: 'Autumn 2026', event: 'Pre-test assessments (ISEB or school-set)', certainty: 'pattern' },
      { date: 'November–December 2026', event: 'Interviews (shortlisted candidates)', certainty: 'pattern' },
      { date: 'January 2027', event: 'Conditional offers (pending Common Entrance)', certainty: 'pattern' },
    ],
    officialUrl: 'https://www.etoncollege.com/admissions',
    note: 'Most leading boarding schools admit at 13+ (Year 9) via Common Entrance, with registration 2 years in advance. Eton, Harrow and Wycombe Abbey are highly oversubscribed — register by age 10 at the latest. Brighton College and Sevenoaks also offer 11+ entry.',
  },

  // ── Hampton Court House ──
  {
    id: 'hch-2027',
    name: 'Hampton Court House — 2027 Entry (Year 7/8)',
    schools: ['Hampton Court House (Year 7/8)'],
    examFormat: 'School-set assessment + interview',
    region: 'London',
    color: 'border-purple-200 bg-purple-50',
    entryYear: '2027',
    dates: [
      { date: 'Autumn 2026', event: 'Registration and assessments', certainty: 'pattern' },
      { date: 'October–November 2026', event: 'Entrance assessments', certainty: 'pattern' },
      { date: 'December 2026–January 2027', event: 'Offers', certainty: 'pattern' },
    ],
    officialUrl: 'https://www.hamptoncourthouse.co.uk/admissions',
  },
];

// ─── Regions for filter ────────────────────────────────────────────────────────

const REGIONS = ['All', 'London', 'Manchester', 'Birmingham', 'Reading', 'Essex', 'Cheltenham', 'Oxford', 'Guildford', 'National'];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ExamDatesPage() {
  const [show2026, setShow2026] = useState(false);
  const [activeRegion, setActiveRegion] = useState('All');
  const [search, setSearch] = useState('');

  const filtered2027 = GROUPS_2027_ENTRY.filter((g) => {
    const matchRegion = activeRegion === 'All' || g.region === activeRegion;
    const q = search.toLowerCase();
    const matchSearch = !q || g.name.toLowerCase().includes(q) || g.schools.some((s) => s.toLowerCase().includes(q));
    return matchRegion && matchSearch;
  });

  return (
    <>
      <SiteNav />

      <main className="bg-white min-h-screen">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 pt-20 pb-14 px-4 border-b border-slate-100">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-indigo-200">
              <Calendar size={12} /> Key Dates
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              11+ Exam Dates 2026–2027
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-6">
              Registration deadlines, test dates and results timelines for grammar and independent school 11+ entrance exams across England.
              Updated February 2026 — showing <strong className="text-slate-700">2027 entry dates</strong> with 2026 archived below.
            </p>
            {/* Legend */}
            <div className="flex flex-wrap gap-3">
              {[
                { certainty: 'confirmed' as const, label: 'Officially confirmed by school or authority' },
                { certainty: 'provisional' as const, label: 'Highly likely based on prior years' },
                { certainty: 'pattern' as const, label: 'Expected based on annual pattern — verify with school' },
              ].map((l) => (
                <div key={l.certainty} className="flex items-center gap-2">
                  <CertaintyBadge certainty={l.certainty} />
                  <span className="text-xs text-slate-500">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-2">
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Always verify dates with the school directly.</strong> Dates can change without notice.
              Registration deadlines are strict — late applications are not accepted.
              Always check the official admissions page before acting on any date listed here.
            </p>
          </div>
        </div>

        {/* ── 2027 Entry ── */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-black text-slate-900">September 2027 Entry</h2>
            <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-black rounded-full uppercase tracking-wide">Current cycle</span>
          </div>
          <p className="text-slate-500 text-sm mb-6">
            For children currently in Year 4 (born September 2015 – August 2016). Most grammar school registrations open May–June 2026. Independent school registrations typically open September–October 2026.
          </p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Region filter */}
            <div className="flex flex-wrap gap-1.5">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    activeRegion === r
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative sm:ml-auto">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search school…"
                className="pl-8 pr-8 py-1.5 rounded-full border border-slate-200 text-sm font-medium outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 w-full sm:w-48"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {filtered2027.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-medium">No schools match your filter.</div>
          ) : (
            <div className="space-y-5">
              {filtered2027.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          )}
        </section>

        {/* ── 2026 Entry (archived) ── */}
        <section className="max-w-5xl mx-auto px-4 pb-16">
          <button
            onClick={() => setShow2026(!show2026)}
            className="flex items-center gap-3 w-full text-left group"
          >
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-black text-slate-400 group-hover:text-slate-600 transition-colors">September 2026 Entry</h2>
              <span className="px-3 py-1 bg-slate-100 text-slate-400 text-xs font-black rounded-full uppercase tracking-wide">Archive — offers 2 Mar 2026</span>
            </div>
            <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ml-auto ${show2026 ? 'rotate-180' : ''}`} />
          </button>
          <p className="text-slate-400 text-sm mt-1 mb-4">
            Exams for this cycle took place in September–November 2025. Shown for reference only.
          </p>
          {show2026 && (
            <div className="space-y-5 mt-4 opacity-75">
              {GROUPS_2026_ENTRY.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          )}
        </section>

        {/* ── CTA ── */}
        <section className="bg-indigo-50 border-t border-indigo-100 py-14 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-black text-slate-900 mb-3">Start preparing now</h2>
            <p className="text-slate-500 mb-6">
              Registration for most 2027 entry grammar schools opens May–June 2026. Independent school registration opens from September 2026. Use the next few months to build a strong foundation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/mock-exams" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
                Try a free mock exam <ChevronRight size={18} />
              </Link>
              <Link href="/schools" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black bg-white text-slate-700 border border-slate-200 hover:border-slate-300 transition-colors">
                Browse school profiles
              </Link>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CertaintyBadge({ certainty }: { certainty: Certainty }) {
  if (certainty === 'confirmed') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded-full">
        <CheckCircle size={8} /> Confirmed
      </span>
    );
  }
  if (certainty === 'provisional') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded-full">
        <Info size={8} /> Provisional
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-full">
      <Clock size={8} /> Pattern
    </span>
  );
}

function GroupCard({ group }: { group: SchoolGroup }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`rounded-2xl border-2 ${group.color} overflow-hidden`}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 border-b border-slate-200 bg-white text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-slate-900 text-base leading-snug">{group.name}</h3>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[11px] font-bold rounded-full">{group.region}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">{group.examFormat}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={group.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              Official site <ExternalLink size={11} />
            </a>
            <ChevronDown size={16} className={`text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </div>
        </div>
        {/* Schools tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {group.schools.map((s) => (
            <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-medium rounded-full">{s}</span>
          ))}
        </div>
      </button>

      {/* Dates table */}
      {expanded && (
        <>
          <div className="divide-y divide-slate-100 bg-white">
            {group.dates.map((d, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3">
                <div className="w-36 shrink-0">
                  <span className="text-sm font-bold text-slate-800">{d.date}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-slate-600">{d.event}</span>
                </div>
                <div className="shrink-0">
                  <CertaintyBadge certainty={d.certainty} />
                </div>
              </div>
            ))}
          </div>
          {group.note && (
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
              <p className="text-xs text-slate-500 leading-relaxed italic">{group.note}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
