'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import {
  Calendar, Clock, AlertCircle, CheckCircle, ChevronRight,
  ExternalLink, Info, ChevronDown, Search, X, MapPin,
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
  accent: string; // single Tailwind colour name e.g. 'indigo'
  entryYear: '2026' | '2027';
  dates: DateEntry[];
  officialUrl: string;
  note?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function accentClasses(accent: string) {
  const map: Record<string, { border: string; tag: string; dot: string }> = {
    indigo: { border: 'border-indigo-300', tag: 'bg-indigo-100 text-indigo-700', dot: 'bg-indigo-500' },
    rose:   { border: 'border-rose-300',   tag: 'bg-rose-100 text-rose-700',     dot: 'bg-rose-500'   },
    violet: { border: 'border-violet-300', tag: 'bg-violet-100 text-violet-700', dot: 'bg-violet-500' },
    emerald:{ border: 'border-emerald-300',tag: 'bg-emerald-100 text-emerald-700',dot: 'bg-emerald-500'},
    amber:  { border: 'border-amber-300',  tag: 'bg-amber-100 text-amber-700',   dot: 'bg-amber-500'  },
    sky:    { border: 'border-sky-300',    tag: 'bg-sky-100 text-sky-700',       dot: 'bg-sky-500'    },
    cyan:   { border: 'border-cyan-300',   tag: 'bg-cyan-100 text-cyan-700',     dot: 'bg-cyan-500'   },
    fuchsia:{ border: 'border-fuchsia-300',tag: 'bg-fuchsia-100 text-fuchsia-700',dot:'bg-fuchsia-500' },
    pink:   { border: 'border-pink-300',   tag: 'bg-pink-100 text-pink-700',     dot: 'bg-pink-500'   },
    orange: { border: 'border-orange-300', tag: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
    lime:   { border: 'border-lime-300',   tag: 'bg-lime-100 text-lime-700',     dot: 'bg-lime-500'   },
    teal:   { border: 'border-teal-300',   tag: 'bg-teal-100 text-teal-700',     dot: 'bg-teal-500'   },
    green:  { border: 'border-green-300',  tag: 'bg-green-100 text-green-700',   dot: 'bg-green-500'  },
    blue:   { border: 'border-blue-300',   tag: 'bg-blue-100 text-blue-700',     dot: 'bg-blue-500'   },
    yellow: { border: 'border-yellow-300', tag: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
    slate:  { border: 'border-slate-300',  tag: 'bg-slate-100 text-slate-600',   dot: 'bg-slate-400'  },
    purple: { border: 'border-purple-300', tag: 'bg-purple-100 text-purple-700', dot: 'bg-purple-500' },
  };
  return map[accent] ?? map['slate'];
}

// ─── 2026 Entry (archived) ────────────────────────────────────────────────────

const GROUPS_2026_ENTRY: SchoolGroup[] = [
  {
    id: 'qe-barnet-2026',
    name: "Queen Elizabeth's School (QE Barnet)",
    schools: ["Queen Elizabeth's School (Barnet)"],
    examFormat: 'GL Assessment (2-stage)',
    region: 'London', accent: 'indigo', entryYear: '2026',
    dates: [
      { date: '1 May 2025',            event: 'Registration opens',                certainty: 'confirmed' },
      { date: '11 July 2025',          event: 'Registration closes (noon)',         certainty: 'confirmed' },
      { date: '17–18 Sep 2025',        event: 'Stage 1 entrance exams',            certainty: 'confirmed' },
      { date: 'Early Oct 2025',        event: 'Stage 1 results issued',            certainty: 'confirmed' },
      { date: '31 Oct 2025',           event: 'CAF deadline',                      certainty: 'confirmed' },
      { date: '2 Mar 2026',            event: 'National Offers Day',               certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.qebarnet.co.uk/admissions-information/admissions/',
  },
  {
    id: 'henrietta-barnett-2026',
    name: "The Henrietta Barnett School",
    schools: ['The Henrietta Barnett School'],
    examFormat: 'GL Assessment (2-stage)',
    region: 'London', accent: 'rose', entryYear: '2026',
    dates: [
      { date: '1 Apr 2025',      event: 'Registration opens',                          certainty: 'confirmed' },
      { date: '11 Jul 2025',     event: 'Registration closes (5pm)',                    certainty: 'confirmed' },
      { date: 'Early Sep 2025',  event: 'Round 1 exam (GL Assessment)',                 certainty: 'confirmed' },
      { date: 'Late Sep 2025',   event: 'Round 1 results; top 300 to Round 2',          certainty: 'confirmed' },
      { date: '6 Oct 2025',      event: 'Round 2 exam (Maths & English)',               certainty: 'confirmed' },
      { date: '31 Oct 2025',     event: 'CAF deadline',                                 certainty: 'confirmed' },
      { date: '2 Mar 2026',      event: 'National Offers Day',                          certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.hbschool.org.uk/admissions/',
    note: 'Round 2 past papers are not released publicly.',
  },
  {
    id: 'sutton-set-2026',
    name: "Sutton Grammar Schools (SET)",
    schools: ["Wilson's School", "Sutton Grammar School", "Wallington County Grammar School", "Nonsuch High School for Girls", "Wallington High School for Girls"],
    examFormat: "Sutton Selective Eligibility Test (SET) + Stage 2",
    region: 'London', accent: 'violet', entryYear: '2026',
    dates: [
      { date: '1 May 2025',        event: 'SET registration opens',                certainty: 'confirmed' },
      { date: '1 Aug 2025',        event: 'SET registration closes (midnight)',     certainty: 'confirmed' },
      { date: '15 Sep 2025',       event: 'Selective Eligibility Test (SET)',       certainty: 'confirmed' },
      { date: '3 Oct 2025',        event: "Stage 2 exams",                          certainty: 'confirmed' },
      { date: '31 Oct 2025',       event: 'CAF deadline',                           certainty: 'confirmed' },
      { date: '2 Mar 2026',        event: 'National Offers Day',                    certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.suttongrammar.sutton.sch.uk/admissions/selective-eligibility-test-examination/',
    note: 'One SET registration covers all five Sutton grammar schools.',
  },
  {
    id: 'tiffin-2026',
    name: 'Tiffin School & Tiffin Girls',
    schools: ["Tiffin School", "Tiffin Girls' School"],
    examFormat: "School own papers (2-stage)",
    region: 'London', accent: 'emerald', entryYear: '2026',
    dates: [
      { date: '3–4 Jun 2025',    event: 'Stage 1 registration opens',             certainty: 'confirmed' },
      { date: '1–3 Sep 2025',    event: 'Stage 1 registration closes',            certainty: 'confirmed' },
      { date: '2–3 Oct 2025',    event: 'Stage 1 exams',                          certainty: 'confirmed' },
      { date: '15 Oct 2025',     event: 'Stage 1 results; shortlist to Stage 2',  certainty: 'confirmed' },
      { date: 'Nov 2025',        event: 'Stage 2 exams',                          certainty: 'confirmed' },
      { date: '31 Oct 2025',     event: 'CAF deadline',                           certainty: 'confirmed' },
      { date: '2 Mar 2026',      event: 'National Offers Day',                    certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.tiffinschool.co.uk/admissions/year-7-admissions/',
  },
  {
    id: 'st-olaves-2026',
    name: "St Olave's & Newstead Wood",
    schools: ["St Olave's Grammar School", "Newstead Wood School"],
    examFormat: "SET + Stage 2 / GL Assessment (2-stage)",
    region: 'London', accent: 'amber', entryYear: '2026',
    dates: [
      { date: '9 Jul 2025',       event: "St Olave's registration closes",        certainty: 'confirmed' },
      { date: '19 Sep 2025',      event: "St Olave's Stage 1 exam",               certainty: 'confirmed' },
      { date: '14 Nov 2025',      event: "St Olave's Stage 2 exam",               certainty: 'confirmed' },
      { date: '31 Oct 2025',      event: 'CAF deadline',                          certainty: 'confirmed' },
      { date: '2 Mar 2026',       event: 'National Offers Day',                   certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.saintolaves.net/admissions',
  },
];

// ─── 2027 Entry (current cycle) ───────────────────────────────────────────────

const GROUPS_2027_ENTRY: SchoolGroup[] = [
  {
    id: 'qe-barnet-2027',
    name: "Queen Elizabeth's School (QE Barnet)",
    schools: ["Queen Elizabeth's School (Barnet)"],
    examFormat: 'GL Assessment (2-stage)',
    region: 'London', accent: 'indigo', entryYear: '2027',
    dates: [
      { date: 'May 2026',     event: 'Registration expected to open',   certainty: 'pattern' },
      { date: 'Jul 2026',     event: 'Registration expected to close',  certainty: 'pattern' },
      { date: 'Sep 2026',     event: 'Stage 1 entrance exams',          certainty: 'pattern' },
      { date: '30 Oct 2026',  event: 'CAF deadline',                    certainty: 'confirmed' },
      { date: '1 Mar 2027',   event: 'National Offers Day',             certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.qebarnet.co.uk/admissions-information/admissions/',
  },
  {
    id: 'henrietta-barnett-2027',
    name: "The Henrietta Barnett School",
    schools: ['The Henrietta Barnett School'],
    examFormat: 'GL Assessment (2-stage)',
    region: 'London', accent: 'rose', entryYear: '2027',
    dates: [
      { date: '1 Jul 2026',      event: 'Registration deadline (5pm)',                     certainty: 'confirmed' },
      { date: '30 Jun 2026',     event: 'Open Day (Year 5 — book from 3 Jun 2026)',        certainty: 'confirmed' },
      { date: '2–4 Sep 2026',    event: 'Round 1 entrance exam',                           certainty: 'confirmed' },
      { date: '28 Sep 2026',     event: 'Round 1 results; top 300 to Round 2',             certainty: 'confirmed' },
      { date: '5 Oct 2026',      event: 'Round 2 exam',                                    certainty: 'confirmed' },
      { date: '30 Oct 2026',     event: 'CAF deadline',                                    certainty: 'confirmed' },
      { date: '1 Mar 2027',      event: 'National Offers Day',                             certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.hbschool.org.uk/admissions/',
  },
  {
    id: 'sutton-set-2027',
    name: "Sutton Grammar Schools (SET)",
    schools: ["Wilson's School", "Sutton Grammar School", "Wallington County Grammar School", "Nonsuch High School for Girls", "Wallington High School for Girls"],
    examFormat: "Sutton SET + Stage 2",
    region: 'London', accent: 'violet', entryYear: '2027',
    dates: [
      { date: 'May 2026',     event: 'SET registration expected to open',    certainty: 'pattern' },
      { date: 'Aug 2026',     event: 'SET registration expected to close',   certainty: 'pattern' },
      { date: '15 Sep 2026',  event: 'Selective Eligibility Test (SET)',      certainty: 'confirmed' },
      { date: 'Oct 2026',     event: 'Stage 2 exams',                        certainty: 'pattern' },
      { date: '30 Oct 2026',  event: 'CAF deadline',                         certainty: 'confirmed' },
      { date: '1 Mar 2027',   event: 'National Offers Day',                  certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.suttongrammar.sutton.sch.uk/admissions/',
    note: 'One SET registration covers all five Sutton grammar schools.',
  },
  {
    id: 'tiffin-2027',
    name: 'Tiffin School & Tiffin Girls',
    schools: ["Tiffin School", "Tiffin Girls' School"],
    examFormat: "School own papers (2-stage)",
    region: 'London', accent: 'emerald', entryYear: '2027',
    dates: [
      { date: 'Jun 2026',     event: 'Stage 1 registration expected to open',   certainty: 'pattern' },
      { date: 'Sep 2026',     event: 'Stage 1 registration expected to close',  certainty: 'pattern' },
      { date: 'Oct 2026',     event: 'Stage 1 exams',                           certainty: 'pattern' },
      { date: 'Nov 2026',     event: 'Stage 2 exams',                           certainty: 'pattern' },
      { date: '30 Oct 2026',  event: 'CAF deadline',                            certainty: 'confirmed' },
      { date: '1 Mar 2027',   event: 'National Offers Day',                     certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.tiffinschool.co.uk/admissions/',
    note: "Stage 2 papers are not released publicly. Both schools are in Kingston upon Thames.",
  },
  {
    id: 'st-olaves-2027',
    name: "St Olave's & Newstead Wood",
    schools: ["St Olave's Grammar School", "Newstead Wood School"],
    examFormat: "SET + Stage 2 / GL Assessment (2-stage)",
    region: 'London', accent: 'amber', entryYear: '2027',
    dates: [
      { date: '1 May 2026',     event: 'Newstead Wood registration opens',         certainty: 'confirmed' },
      { date: 'Jun 2026',       event: "St Olave's registration opens",            certainty: 'provisional' },
      { date: '30 Jun 2026',    event: "Registration closes (both schools)",        certainty: 'provisional' },
      { date: '18 Sep 2026',    event: "St Olave's Stage 1 exam",                  certainty: 'provisional' },
      { date: '25–26 Sep 2026', event: 'Newstead Wood entrance exam',              certainty: 'provisional' },
      { date: '13 Nov 2026',    event: "St Olave's Stage 2 exam",                  certainty: 'provisional' },
      { date: '30 Oct 2026',    event: 'CAF deadline',                             certainty: 'confirmed' },
      { date: '1 Mar 2027',     event: 'National Offers Day',                      certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.saintolaves.net/admissions',
  },
  {
    id: 'latymer-2027',
    name: 'The Latymer School (Edmonton)',
    schools: ['The Latymer School'],
    examFormat: 'GL Assessment (2-stage)',
    region: 'London', accent: 'sky', entryYear: '2027',
    dates: [
      { date: 'May 2026',      event: 'Registration expected to open',         certainty: 'pattern' },
      { date: 'Jul 2026',      event: 'Registration expected to close',        certainty: 'pattern' },
      { date: 'Sep 2026',      event: 'Stage 1 exam',                          certainty: 'pattern' },
      { date: 'Oct–Nov 2026',  event: 'Stage 2 exam (shortlisted candidates)', certainty: 'pattern' },
      { date: '30 Oct 2026',   event: 'CAF deadline',                          certainty: 'confirmed' },
      { date: '1 Mar 2027',    event: 'National Offers Day',                   certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.latymer.co.uk/admissions',
  },
  {
    id: 'redbridge-2027',
    name: 'Redbridge Grammar Schools',
    schools: ['Ilford County High School for Boys', 'Woodford County High School for Girls'],
    examFormat: "GL Assessment",
    region: 'London', accent: 'cyan', entryYear: '2027',
    dates: [
      { date: '30 Apr 2026',   event: 'Open Evenings for both schools',    certainty: 'confirmed' },
      { date: '1 May 2026',    event: 'Registration opens',                certainty: 'confirmed' },
      { date: '15 Jun 2026',   event: 'Registration closes (5pm)',         certainty: 'confirmed' },
      { date: '18 Sep 2026',   event: '11+ test day',                      certainty: 'confirmed' },
      { date: 'Mid-Oct 2026',  event: 'Results emailed to parents',        certainty: 'confirmed' },
      { date: '30 Oct 2026',   event: 'CAF deadline',                      certainty: 'confirmed' },
      { date: '1 Mar 2027',    event: 'National Offers Day',               certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.redbridge.gov.uk/schools/redbridge-11-plus/',
  },
  {
    id: 'trafford-2027',
    name: 'Trafford Grammar Schools',
    schools: ['Altrincham Grammar School for Boys', 'Altrincham Grammar School for Girls', 'Sale Grammar School', 'Stretford Grammar School', 'Urmston Grammar School', 'Loreto Grammar School'],
    examFormat: 'CEM-style (Trafford consortium)',
    region: 'Manchester', accent: 'fuchsia', entryYear: '2027',
    dates: [
      { date: 'Apr–May 2026',  event: 'Registration expected to open',   certainty: 'pattern' },
      { date: 'Jun 2026',      event: 'Registration expected to close',  certainty: 'pattern' },
      { date: 'Sep 2026',      event: 'Trafford 11+ test day',           certainty: 'pattern' },
      { date: 'Oct 2026',      event: 'Results issued to parents',       certainty: 'pattern' },
      { date: '31 Oct 2026',   event: 'CAF deadline (Trafford LA)',      certainty: 'confirmed' },
      { date: '1 Mar 2027',    event: 'National Offers Day',             certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.trafford.gov.uk/residents/schools-and-learning/secondary/11plus.aspx',
    note: 'One registration covers all Trafford consortium schools. CEM-style papers are designed to be less coachable.',
  },
  {
    id: 'withington-mgsc-2027',
    name: 'Withington Girls & Manchester Grammar',
    schools: ["Withington Girls' School", 'Manchester Grammar School'],
    examFormat: 'School-set papers (independent)',
    region: 'Manchester', accent: 'pink', entryYear: '2027',
    dates: [
      { date: 'Autumn 2026',     event: 'Registration and assessments open',           certainty: 'pattern' },
      { date: 'Oct–Nov 2026',    event: 'Entrance exams (Maths, English, Reasoning)',  certainty: 'pattern' },
      { date: 'Nov–Dec 2026',    event: 'Interviews (shortlisted candidates)',          certainty: 'pattern' },
      { date: 'Jan 2027',        event: 'Offers sent',                                  certainty: 'pattern' },
    ],
    officialUrl: 'https://www.wgs.org/admissions',
    note: "MGS and WGS are independent schools — check each school's admissions page for exact dates.",
  },
  {
    id: 'king-edward-birmingham-2027',
    name: 'King Edward VI Schools (Birmingham)',
    schools: ['King Edward VI High School for Girls', 'King Edward VI Handsworth', 'King Edward VI Aston', 'King Edward VI Camp Hill (Boys & Girls)', 'King Edward VI Five Ways'],
    examFormat: 'King Edward VI Foundation Test (KE Test)',
    region: 'Birmingham', accent: 'orange', entryYear: '2027',
    dates: [
      { date: 'Sep 2026',     event: 'Registration expected to open',               certainty: 'pattern' },
      { date: 'Oct 2026',     event: 'Registration closes',                         certainty: 'pattern' },
      { date: 'Nov 2026',     event: 'KE Test (all Foundation schools share one day)', certainty: 'pattern' },
      { date: 'Dec 2026',     event: 'Results and school-specific assessments',     certainty: 'pattern' },
      { date: '31 Oct 2026',  event: 'CAF deadline (Birmingham LA)',                certainty: 'confirmed' },
      { date: '1 Mar 2027',   event: 'National Offers Day',                         certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.kehs.org.uk/senior-school/admissions/',
    note: 'All KE Foundation grammar schools share the same initial KE Test. KEHS is an independent school within the Foundation.',
  },
  {
    id: 'reading-berkshire-2027',
    name: 'Reading & Berkshire Grammar Schools',
    schools: ['Reading School', 'Kendrick School', 'Upton Court Grammar School', 'Herschel Grammar School', 'Langley Grammar School', "St Bernard's Catholic Grammar School"],
    examFormat: 'GL Assessment (Berkshire shared process)',
    region: 'Reading', accent: 'lime', entryYear: '2027',
    dates: [
      { date: 'May 2026',     event: 'Registration expected to open',    certainty: 'pattern' },
      { date: 'Jun 2026',     event: 'Registration deadline',            certainty: 'pattern' },
      { date: 'Sep 2026',     event: '11+ test day (GL Assessment)',     certainty: 'pattern' },
      { date: 'Oct 2026',     event: 'Results; Stage 2 invitations',    certainty: 'pattern' },
      { date: '31 Oct 2026',  event: 'CAF deadline',                    certainty: 'confirmed' },
      { date: '1 Mar 2027',   event: 'National Offers Day',             certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.reading-school.co.uk/admissions',
    note: 'Reading School and Kendrick are among the most selective grammar schools in England.',
  },
  {
    id: 'colchester-2027',
    name: 'Colchester Royal Grammar School',
    schools: ['Colchester Royal Grammar School'],
    examFormat: 'CSSE (Essex shared process)',
    region: 'Essex', accent: 'teal', entryYear: '2027',
    dates: [
      { date: 'May 2026',     event: 'Registration opens (Essex shared)',  certainty: 'pattern' },
      { date: 'Jun 2026',     event: 'Registration closes',               certainty: 'pattern' },
      { date: 'Sep 2026',     event: 'Essex 11+ test day',                certainty: 'pattern' },
      { date: 'Oct 2026',     event: 'Results issued',                    certainty: 'pattern' },
      { date: '31 Oct 2026',  event: 'CAF deadline',                      certainty: 'confirmed' },
      { date: '1 Mar 2027',   event: 'National Offers Day',               certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.crgs.co.uk/admissions',
  },
  {
    id: 'gloucestershire-2027',
    name: "Pate's & Gloucestershire Grammar Schools",
    schools: ["Pate's Grammar School", 'Plus 6 other Gloucestershire grammar schools'],
    examFormat: "GL Assessment (single test)",
    region: 'Cheltenham', accent: 'green', entryYear: '2027',
    dates: [
      { date: '18 May 2026',    event: 'Registration opens',                    certainty: 'confirmed' },
      { date: '26 Jun 2026',    event: 'Registration closes',                   certainty: 'confirmed' },
      { date: '7 Sep 2026',     event: 'Test centre info sent to parents',      certainty: 'confirmed' },
      { date: '12 Sep 2026',    event: 'Gloucestershire Grammar Entrance Test', certainty: 'confirmed' },
      { date: 'Mid-Oct 2026',   event: 'Results sent to parents',               certainty: 'confirmed' },
      { date: '31 Oct 2026',    event: 'CAF deadline',                           certainty: 'confirmed' },
      { date: '1 Mar 2027',     event: 'National Offers Day',                   certainty: 'confirmed' },
    ],
    officialUrl: 'https://www.gloucestershire.gov.uk/schooladmissions/grammar-schools/',
    note: "One registration covers all seven Gloucestershire grammar schools.",
  },
  {
    id: 'oxford-independent-2027',
    name: 'Oxford Independent Schools',
    schools: ['Magdalen College School (Oxford)', 'Oxford High School (GDST)'],
    examFormat: 'School-set papers + interview',
    region: 'Oxford', accent: 'blue', entryYear: '2027',
    dates: [
      { date: 'Sep–Oct 2026',   event: 'Registration and assessments open',          certainty: 'pattern' },
      { date: 'Oct–Nov 2026',   event: 'Entrance exams (Maths, English, Reasoning)', certainty: 'pattern' },
      { date: 'Nov–Dec 2026',   event: 'Interviews (shortlisted candidates)',         certainty: 'pattern' },
      { date: 'Jan 2027',       event: 'Offers sent',                                 certainty: 'pattern' },
    ],
    officialUrl: 'https://www.mcsoxford.org/admissions',
    note: "Check each school's admissions page for exact dates.",
  },
  {
    id: 'guildford-high-2027',
    name: 'Guildford High School',
    schools: ['Guildford High School'],
    examFormat: 'School-set papers (independent)',
    region: 'Guildford', accent: 'yellow', entryYear: '2027',
    dates: [
      { date: 'Sep–Oct 2026',  event: 'Registration opens',                    certainty: 'pattern' },
      { date: 'Oct 2026',      event: 'Entrance assessments (Maths & English)', certainty: 'pattern' },
      { date: 'Nov 2026',      event: 'Interviews for shortlisted candidates',  certainty: 'pattern' },
      { date: 'Dec 2026',      event: 'Offers sent',                            certainty: 'pattern' },
    ],
    officialUrl: 'https://www.guildfordhigh.surrey.sch.uk/admissions',
  },
  {
    id: 'london-top-independents-2027',
    name: 'Top London Independent Schools',
    schools: ["St Paul's Girls' School", "St Paul's School", "North London Collegiate School", "King's College School (Wimbledon)", "City of London School", "City of London School for Girls", "Westminster School", "Haberdashers' Boys' School", "Haberdashers' Girls' School", "Highgate School", "Latymer Upper School", "James Allen's Girls' School", "Dulwich College", "Alleyn's School", "South Hampstead High School", "Notting Hill and Ealing High School", "Wimbledon High School", "Whitgift School", "Emanuel School", "Surbiton High School", "Lady Eleanor Holles School", "Godolphin and Latymer School"],
    examFormat: 'School-set papers + interview (some via ISEB Pre-Test)',
    region: 'London', accent: 'slate', entryYear: '2027',
    dates: [
      { date: 'Sep–Oct 2026',    event: 'Registration opens for most schools',         certainty: 'pattern' },
      { date: 'Oct 2026',        event: 'ISEB Pre-Test (for schools that use it)',     certainty: 'pattern' },
      { date: 'Oct–Nov 2026',    event: 'Entrance exams (Maths, English, Reasoning)',  certainty: 'pattern' },
      { date: 'Nov–Dec 2026',    event: 'Interviews (shortlisted candidates)',          certainty: 'pattern' },
      { date: 'Jan 2027',        event: 'Offers sent to successful candidates',         certainty: 'pattern' },
      { date: 'Feb–Mar 2027',    event: 'Bursary / scholarship assessments',           certainty: 'pattern' },
    ],
    officialUrl: 'https://www.spgs.org/admissions',
    note: "Each school has its own registration timeline. Some use ISEB Pre-Test; others set their own papers. Always check the individual school's admissions page. Popular schools fill quickly — register early.",
  },
  {
    id: 'boarding-national-2027',
    name: 'Leading Boarding Schools',
    schools: ['Eton College', 'Harrow School', 'Wycombe Abbey', 'Tonbridge School', 'Sevenoaks School', 'Brighton College'],
    examFormat: 'Pre-test + Common Entrance / school-set papers',
    region: 'National', accent: 'indigo', entryYear: '2027',
    dates: [
      { date: 'Year 6 (age 10–11)', event: 'Register for Year 9 entry (2 years ahead)',     certainty: 'pattern' },
      { date: 'Autumn 2026',        event: 'Pre-test assessments (ISEB or school-set)',      certainty: 'pattern' },
      { date: 'Nov–Dec 2026',       event: 'Interviews (shortlisted candidates)',             certainty: 'pattern' },
      { date: 'Jan 2027',           event: 'Conditional offers (pending Common Entrance)',   certainty: 'pattern' },
    ],
    officialUrl: 'https://www.etoncollege.com/admissions',
    note: 'Most leading boarding schools admit at 13+ (Year 9) via Common Entrance, with registration 2 years in advance. Eton and Harrow are highly oversubscribed — register by age 10. Brighton College and Sevenoaks also offer 11+ entry.',
  },
  {
    id: 'hch-2027',
    name: 'Hampton Court House',
    schools: ['Hampton Court House (Year 7/8)'],
    examFormat: 'School-set assessment + interview',
    region: 'London', accent: 'purple', entryYear: '2027',
    dates: [
      { date: 'Autumn 2026',      event: 'Registration and assessments open', certainty: 'pattern' },
      { date: 'Oct–Nov 2026',     event: 'Entrance assessments',              certainty: 'pattern' },
      { date: 'Dec 2026–Jan 2027',event: 'Offers',                            certainty: 'pattern' },
    ],
    officialUrl: 'https://www.hamptoncourthouse.co.uk/admissions',
  },
];

// ─── Regions ──────────────────────────────────────────────────────────────────

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
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-indigo-200">
              <Calendar size={12} /> Key Dates
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              11+ Exam Dates 2026–2027
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-6">
              Registration deadlines, test dates and results timelines for grammar and independent school entrance exams across England.
              Updated February 2026 — <strong className="text-slate-700">2027 entry</strong> shown first.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { color: 'bg-emerald-500', label: 'Officially confirmed by school or authority' },
                { color: 'bg-amber-400',   label: 'Provisional / partially confirmed' },
                { color: 'bg-slate-300',   label: 'Expected based on annual pattern — verify with school' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${l.color}`} />
                  <span className="text-xs text-slate-500">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Disclaimer ── */}
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-2">
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Always verify dates with the school directly.</strong> Registration deadlines are strict — late applications are not accepted. Check the official admissions page before acting on any date listed here.
            </p>
          </div>
        </div>

        {/* ── 2027 Entry ── */}
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-black text-slate-900">September 2027 Entry</h2>
            <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-black rounded-full uppercase tracking-wide">Current cycle</span>
          </div>
          <p className="text-slate-500 text-sm mb-6">
            For children currently in Year 4. Click any card to expand full dates.
          </p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex flex-wrap gap-1.5">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    activeRegion === r ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered2027.map((group) => (
                <SchoolCard key={group.id} group={group} />
              ))}
            </div>
          )}
        </section>

        {/* ── 2026 Entry (archived) ── */}
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <button
            onClick={() => setShow2026(!show2026)}
            className="flex items-center gap-3 w-full text-left group mb-2"
          >
            <h2 className="text-lg font-black text-slate-400 group-hover:text-slate-600 transition-colors">September 2026 Entry</h2>
            <span className="px-3 py-1 bg-slate-100 text-slate-400 text-xs font-black rounded-full uppercase tracking-wide">Archive — offers 2 Mar 2026</span>
            <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 ml-auto ${show2026 ? 'rotate-180' : ''}`} />
          </button>
          <p className="text-slate-400 text-sm mb-5">Exams for this cycle took place in September–November 2025. Shown for reference only.</p>

          {show2026 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 opacity-75">
              {GROUPS_2026_ENTRY.map((group) => (
                <SchoolCard key={group.id} group={group} />
              ))}
            </div>
          )}
        </section>

        {/* ── CTA ── */}
        <section className="bg-indigo-50 border-t border-indigo-100 py-14 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-black text-slate-900 mb-3">Start preparing now</h2>
            <p className="text-slate-500 mb-6">
              Grammar school registrations open May–June 2026. Independent school registrations open from September 2026. Build your foundation now.
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

// ─── SchoolCard ───────────────────────────────────────────────────────────────
// Always-open: all dates visible immediately in the grid, no click needed.

function SchoolCard({ group }: { group: SchoolGroup }) {
  const { border, tag } = accentClasses(group.accent);

  return (
    <div className={`rounded-2xl border-2 ${border} bg-white flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
      {/* Header */}
      <div className="p-4 flex flex-col gap-2.5">
        <div>
          <h3 className="font-black text-slate-900 text-sm leading-snug">{group.name}</h3>
          <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${tag}`}>
              <MapPin size={9} /> {group.region}
            </span>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[11px] font-medium rounded-full">
              {group.examFormat}
            </span>
          </div>
        </div>

        {/* School name pills — max 3 shown */}
        <div className="flex flex-wrap gap-1">
          {group.schools.slice(0, 3).map((s) => (
            <span key={s} className="px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-600 text-[11px] font-medium rounded-full">{s}</span>
          ))}
          {group.schools.length > 3 && (
            <span className="px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-400 text-[11px] font-medium rounded-full">+{group.schools.length - 3} more</span>
          )}
        </div>
      </div>

      {/* Dates — always visible */}
      <div className="border-t border-slate-100 flex-1">
        <div className="divide-y divide-slate-50">
          {group.dates.map((d, i) => (
            <div key={i} className="flex items-start gap-2 px-4 py-2">
              <div className="w-24 shrink-0 pt-0.5">
                <span className="text-[11px] font-bold text-slate-700 leading-tight block">{d.date}</span>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <span className="text-[11px] text-slate-600 leading-snug">{d.event}</span>
              </div>
              <div className="shrink-0">
                <CertaintyDot certainty={d.certainty} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2 flex-wrap">
        {group.note && (
          <p className="text-[11px] text-slate-400 italic leading-snug flex-1 min-w-0 pr-2">{group.note}</p>
        )}
        <a
          href={group.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 shrink-0 ml-auto"
        >
          Official site <ExternalLink size={10} />
        </a>
      </div>
    </div>
  );
}

// Compact coloured dot used inside the always-open date rows
function CertaintyDot({ certainty }: { certainty: Certainty }) {
  if (certainty === 'confirmed') return <span title="Confirmed" className="mt-1 block w-2 h-2 rounded-full bg-emerald-500" />;
  if (certainty === 'provisional') return <span title="Provisional" className="mt-1 block w-2 h-2 rounded-full bg-amber-400" />;
  return <span title="Based on annual pattern" className="mt-1 block w-2 h-2 rounded-full bg-slate-300" />;
}

// ─── CertaintyBadge ───────────────────────────────────────────────────────────

function CertaintyBadge({ certainty }: { certainty: Certainty }) {
  if (certainty === 'confirmed') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded-full shrink-0">
        <CheckCircle size={8} /> Confirmed
      </span>
    );
  }
  if (certainty === 'provisional') {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded-full shrink-0">
        <Info size={8} /> Provisional
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-full shrink-0">
      <Clock size={8} /> Pattern
    </span>
  );
}
