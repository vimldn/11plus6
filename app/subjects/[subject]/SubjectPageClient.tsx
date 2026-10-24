'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  Star,
  ChevronRight,
  BookOpen,
  Trophy,
  Target,
  CheckCircle,
  GraduationCap,
} from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const SUBJECT_CONTENT: Record<
  string,
  {
    topics: string[];
    heroStat: string;
    heroStatLabel: string;
    faqs: { q: string; a: string }[];
    gradient: string;
    color: string;
    lightBg: string;
    dot: string;
    shadowColor: string;
  }
> = {
  maths: {
    topics: [
      'Number & Place Value',
      'Addition & Subtraction',
      'Multiplication & Division',
      'Fractions, Decimals & Percentages',
      'Ratio & Proportion',
      'Algebra & Sequences',
      'Geometry & Shapes',
      'Measurement',
      'Data Handling & Statistics',
      'Problem Solving',
    ],
    heroStat: '1,200+',
    heroStatLabel: 'Maths practice questions',
    gradient: 'from-blue-600 to-cyan-500',
    color: 'text-blue-600',
    lightBg: 'bg-blue-50',
    dot: 'bg-blue-500',
    shadowColor: 'shadow-blue-200/50',
    faqs: [
      {
        q: 'What maths topics appear in 11+ exams?',
        a: 'The 11+ maths syllabus covers number, fractions, decimals, algebra, geometry, measurement and data. GL Assessment and CEM exams both test these areas, often in multi-step word problems.',
      },
      {
        q: 'What level is 11+ maths?',
        a: 'Questions typically go beyond the standard Year 6 curriculum. High-scoring children are comfortable with Year 7 concepts including basic algebra, advanced fractions and speed-distance-time calculations.',
      },
      {
        q: 'How many maths questions are in the 11+ exam?',
        a: 'GL Assessment maths papers usually have 50 questions in 50 minutes. CEM exams combine maths with reasoning and vary by region, typically 45–60 questions.',
      },
      {
        q: 'How do I help my child with 11+ maths?',
        a: 'Short, consistent practice sessions work best. Focus on weaker topics, use timed practice to build speed, and review mistakes carefully.',
      },
    ],
  },
  english: {
    topics: [
      'Reading Comprehension',
      'Synonyms & Antonyms',
      'Grammar & Punctuation',
      'Spelling',
      'Vocabulary in Context',
      'Cloze Passages',
      'Shuffled Sentences',
      'Creative Writing',
      'Persuasive Writing',
      'Inference & Deduction',
    ],
    heroStat: '3',
    heroStatLabel: 'Original comprehension lessons',
    gradient: 'from-emerald-600 to-teal-500',
    color: 'text-emerald-600',
    lightBg: 'bg-emerald-50',
    dot: 'bg-emerald-500',
    shadowColor: 'shadow-emerald-200/50',
    faqs: [
      {
        q: 'What English skills does the 11+ test?',
        a: 'English assessments can include comprehension, vocabulary, grammar, punctuation, spelling or writing. The combination and answer format depend on the school or provider; check the relevant admissions cycle.',
      },
      {
        q: "How do I improve my child's vocabulary for the 11+?",
        a: 'Read a range of texts, discuss unfamiliar words in context and practise using them in new sentences. Choose material your child can engage with and review meanings rather than memorising definitions alone.',
      },
      {
        q: 'Is creative writing in the 11+ exam?',
        a: 'Independent schools often include a writing task. Grammar school exams vary by area and provider.',
      },
      {
        q: 'How long should 11+ English preparation take?',
        a: 'Many families start 12–18 months before the exam. A consistent routine over time is more effective than occasional intensive periods.',
      },
    ],
  },
  'verbal-reasoning': {
    topics: [
      'Letter Codes',
      'Number Codes',
      'Word Analogies',
      'Odd One Out',
      'Word Relationships',
      'Alphabetical Order',
      'Hidden Words',
      'Compound Words',
      'Logical Deduction',
      'Sequences',
    ],
    heroStat: '800+',
    heroStatLabel: 'Verbal Reasoning questions',
    gradient: 'from-violet-600 to-purple-500',
    color: 'text-violet-600',
    lightBg: 'bg-violet-50',
    dot: 'bg-violet-500',
    shadowColor: 'shadow-violet-200/50',
    faqs: [
      {
        q: 'What is verbal reasoning in the 11+ exam?',
        a: 'Verbal reasoning tests the ability to understand and reason using words and language. Question types include codes, analogies, odd-one-out, sequences and deduction.',
      },
      {
        q: 'Is verbal reasoning hard to learn?',
        a: 'Children can improve significantly with practice because question types follow predictable patterns. Speed improves with repetition.',
      },
      {
        q: 'Do all 11+ exams include verbal reasoning?',
        a: 'Some regions and exam providers include it explicitly; others blend it into English and comprehension. Always check your target schools.',
      },
      {
        q: 'How long does it take to prepare for verbal reasoning?',
        a: 'Many children benefit from 6–12 months of regular practice, moving from learning formats to timed work.',
      },
    ],
  },
  'non-verbal-reasoning': {
    topics: [
      'Matrices',
      'Series & Sequences',
      'Analogies',
      'Similarities & Differences',
      'Reflections & Rotations',
      'Nets & 3D Shapes',
      'Codes',
      'Odd Shape Out',
      'Spatial Reasoning',
      'Pattern Completion',
    ],
    heroStat: '750+',
    heroStatLabel: 'Non-Verbal Reasoning questions',
    gradient: 'from-amber-500 to-orange-500',
    color: 'text-amber-600',
    lightBg: 'bg-amber-50',
    dot: 'bg-amber-500',
    shadowColor: 'shadow-amber-200/50',
    faqs: [
      {
        q: 'What is non-verbal reasoning?',
        a: 'Non-verbal reasoning uses shapes and patterns rather than words or numbers. It tests abstract thinking and spatial awareness.',
      },
      {
        q: 'Can you improve at non-verbal reasoning?',
        a: 'Start untimed with one skill, read the worked explanation and revisit mistakes. This starter release covers rotations and reflections; it does not cover every question type or predict exam scores.',
      },
      {
        q: 'Which schools test non-verbal reasoning?',
        a: 'Some grammar school exams include NVR, and some independent schools use it as part of their assessment. Check your target schools and exam provider.',
      },
      {
        q: 'My child struggles with shapes and patterns — what should I do?',
        a: 'Start with one question type at a time. Use simple visual/spatial activities first, then move to printed questions and timed practice.',
      },
    ],
  },
};

interface SubjectData {
  slug: string;
  label: string;
  desc: string;
  color: string;
  bg: string;
  dot: string;
  icon?: React.ElementType;
}

export default function SubjectPageClient({
  subject,
  children,
}: {
  subject: SubjectData;
  children?: React.ReactNode;
}) {

  const content =
    SUBJECT_CONTENT[subject.slug] || SUBJECT_CONTENT['maths'];
  const verbalRoutes: Record<string,string> = {
    'Letter Codes': 'codes', 'Word Analogies': 'analogies',
    'Word Classifications': 'classifications', 'Letter and Number Sequences': 'sequences',
  };
  const visualRoutes: Record<string,string> = {'Rotations':'rotations','Reflections':'reflections'};
  const isVisual = subject.slug === 'non-verbal-reasoning';
  const isVerbal = subject.slug === 'verbal-reasoning';
  const practiceHref = isVisual ? '/quiz?paper=visual-reviewed&mode=practice' : isVerbal ? '/quiz?paper=verbal-reviewed&mode=practice' : `/quiz?subject=${subject.slug}&mode=practice&count=10`;
  const visibleTopics = isVisual ? Object.keys(visualRoutes) : isVerbal ? Object.keys(verbalRoutes) : content.topics;
  return <div className="min-h-screen bg-slate-50"><SiteNav ctaLabel="Start practice" ctaHref={isVerbal || isVisual ? practiceHref : '/mock-exams'}/>
 <main id="main-content"><div className="max-w-6xl mx-auto px-6 py-5"><Breadcrumbs items={[{label:'Home',href:'/'},{label:'Subjects',href:'/subjects'},{label:subject.label}]}/></div>
 <section className="editorial-masthead"><div className="editorial-masthead-inner"><div><p className="brand-eyebrow">11+ {subject.label} practice</p><h1>11+ {subject.label} practice.<br/>One step at a time.</h1><p>{isVisual ? 'Original rotation and reflection practice, with clear diagrams and worked visual answers.' : subject.desc}</p><Link className="brand-button" href={practiceHref}>Practise {subject.label} <ArrowRight size={18}/></Link></div><Image src="/brand/book-journey.webp" width={768} height={512} sizes="(max-width: 800px) 90vw, 35vw" alt="An illustrated journey up a staircase of books"/></div></section>
 {children}
 <section className="editorial-topics"><p className="brand-eyebrow">Choose a starting point</p><h2>{subject.label} {isVisual ? 'starter skills' : 'topics covered'}</h2><div className="editorial-topic-links">{visibleTopics.map(topic=><Link key={topic} href={isVisual ? `/quiz?paper=visual-reviewed&topic=${visualRoutes[topic]}&mode=practice` : isVerbal ? `/quiz?paper=verbal-reviewed&topic=${verbalRoutes[topic]}&mode=practice` : "/mock-exams"}>{topic}<ArrowRight size={17}/></Link>)}</div></section>
 <section className="chapter-faq"><div><p className="brand-eyebrow">A few useful answers</p><h2>About {subject.label} practice.</h2></div><div>{content.faqs.map(faq=><details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div></section>
 </main><SiteFooter/></div>;
}
