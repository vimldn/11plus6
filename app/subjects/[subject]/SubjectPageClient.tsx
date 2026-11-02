'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SUBJECT_HUB_CONTENT } from '@/lib/subjectHubContent';

interface SubjectData {
  slug: string;
  label: string;
  desc: string;
  color: string;
  bg: string;
  dot: string;
  icon?: React.ElementType;
}

export default function SubjectPageClient({ subject, children }: {
  subject: SubjectData;
  children?: React.ReactNode;
}) {
  const content = SUBJECT_HUB_CONTENT[subject.slug] || SUBJECT_HUB_CONTENT.maths;
  const isReasoning = subject.slug === 'verbal-reasoning' || subject.slug === 'non-verbal-reasoning';

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteNav ctaLabel="Start practice" ctaHref={content.practiceHref} />
      <main id="main-content">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Subjects', href: '/subjects' }, { label: subject.label }]} />
        </div>
        <section className="editorial-masthead">
          <div className="editorial-masthead-inner">
            <div>
              <p className="brand-eyebrow">11+ {subject.label} practice</p>
              <h1>11+ {subject.label} practice.<br />One step at a time.</h1>
              <p>{content.introduction}</p>
              <div className="flex flex-wrap items-center gap-5">
                <Link className="brand-button" href={content.practiceHref}>{content.practiceLabel} <ArrowRight size={18} aria-hidden="true" /></Link>
                <Link className="font-semibold text-emerald-900 underline underline-offset-4" href={content.printableHref}>Print questions &amp; answers</Link>
              </div>
              <p className="!mt-5 !text-sm">Free original practice. No sign-up required.</p>
            </div>
            <Image src="/brand/book-journey.webp" width={768} height={512} sizes="(max-width: 800px) 90vw, 35vw" alt="An illustrated journey up a staircase of books" />
          </div>
        </section>
        <section className="editorial-topics" aria-labelledby="choose-subject-topic">
          <p className="brand-eyebrow">Choose a starting point</p>
          <h2 id="choose-subject-topic">{subject.label} {isReasoning ? 'starter skills' : 'topics and methods'}</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">{content.topicIntroduction}</p>
          <div className="editorial-topic-links">
            {content.topics.map(topic => <Link key={topic.href} href={topic.href}>{topic.label}<ArrowRight size={17} aria-hidden="true" /></Link>)}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-emerald-900">
            <Link href={content.guideHref} className="underline underline-offset-4">{content.guideLabel} →</Link>
            {isReasoning && <Link href={subject.slug === 'verbal-reasoning' ? '#verbal-practice' : '#visual-practice'} className="underline underline-offset-4">See the worked examples ↓</Link>}
            <Link href="/schools" className="underline underline-offset-4">Check your school’s assessment →</Link>
          </div>
        </section>
        {children}
        <section className="chapter-faq">
          <div><p className="brand-eyebrow">A few useful answers</p><h2>About {subject.label} practice.</h2></div>
          <div>{content.faqs.map(faq => <details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div>
        </section>
        <section className="mx-auto max-w-6xl px-6 pb-12 text-sm leading-7 text-slate-600" aria-label="Official format guidance">
          <p>For an official format check, use your school’s current admissions guidance and the provider’s own materials. <a href="https://11plus.gl-assessment.co.uk/pages/free-materials" className="font-semibold text-emerald-900 underline underline-offset-4">GL Assessment’s free familiarisation page</a> explains why local question counts and timings can differ. Our resources build selected skills for tests taken in 2027; the school-entry year may be different.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
