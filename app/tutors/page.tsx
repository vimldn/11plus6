// app/tutors/page.tsx
'use client';

import React, { useState } from 'react';
import {
  MapPin, CheckCircle, Mail, Phone, User,
  BookOpen, Shield, Users, Loader2, GraduationCap,
  ChevronDown, ChevronUp, Clock, Star,
} from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { UK_CITIES } from '@/lib/siteData';

const FAQS = [
  {
    q: 'When should my child start working with an 11 plus tutor?',
    a: 'Most families start 12 to 18 months before the exam — typically the start of Year 4 or early Year 5. Starting earlier allows steady, low-pressure practice rather than a last-minute rush. That said, six months of focused work with the right tutor can still make a real difference.',
  },
  {
    q: 'What subjects does 11 plus tuition cover?',
    a: 'The 11 plus typically covers Maths, English (comprehension, grammar, vocabulary), Verbal Reasoning, and Non-Verbal Reasoning. The exact subjects depend on the exam board used by the schools you are targeting. GL Assessment and CEM are the two most common formats in England. A tutor will confirm which subjects apply and weight sessions accordingly.',
  },
  {
    q: 'How often should my child have tuition sessions?',
    a: 'Once a week is the most common approach, with sessions lasting 60 to 90 minutes. For children who need to close a larger gap, twice weekly can accelerate progress. Consistency matters more than intensity — regular sessions with independent practice between them outperform cramming.',
  },
  {
    q: 'What is the difference between GL Assessment and CEM exams?',
    a: 'GL Assessment papers have a traditional subject-by-subject structure and are used by many grammar schools across England and Wales. CEM papers (produced by Durham University) mix subjects within a single paper, include heavier time pressure, and emphasise verbal and numerical reasoning. The admissions page for your target school will specify which format they use.',
  },
  {
    q: 'Can online tuition be as effective as in-person sessions?',
    a: 'Yes — for 11 plus preparation, online tuition works very well. The work is paper-based, so screen sharing and working through questions together is entirely practical. Online also gives access to a wider pool of specialist tutors beyond your immediate area.',
  },
  {
    q: 'What should I look for when choosing an 11 plus tutor?',
    a: 'Prioritise tutors with direct experience of the schools and exam format you are targeting. A good tutor will run an initial diagnostic, build a structured plan, assign regular practice, and keep you updated on progress. Be cautious of anyone promising guaranteed pass rates.',
  },
  {
    q: 'How does submitting the enquiry form work?',
    a: 'When you submit the form, your details go to our team. We review your enquiry and connect you with a suitable tutor or advise on next steps. We do not pass your details to third parties without consent, and there is no obligation to proceed.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-bold text-slate-900 pr-4 text-sm leading-relaxed">{q}</span>
        {open
          ? <ChevronUp size={17} className="text-slate-400 shrink-0" />
          : <ChevronDown size={17} className="text-slate-400 shrink-0" />
        }
      </button>
      {open && (
        <div className="px-6 pb-5 pt-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
          {a}
        </div>
      )}
    </div>
  );
}

export default function TutorsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', childYear: '', location: '', notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.name) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          childName: form.name,
          phone: form.phone,
          childYear: form.childYear,
          targetSchool: form.location || 'Not specified',
          source: 'tutor-enquiry-main',
          notes: form.notes,
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch (err) {
      console.error('[TutorsPage]', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SiteNav />
      <main>

        {/* Hero + Form */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 font-bold text-sm mb-5 border border-indigo-100">
                <GraduationCap size={15} /> 11 Plus Tutor Support Across the UK
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5">
                Find the right 11 plus tutor for your child
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
                We help families across the UK find specialist 11 plus tutors who understand the
                exam format, local grammar schools, and preparation timeline that apply in their
                area. Whether you are just starting out or need focused support ahead of an
                upcoming exam, submit an enquiry and we will match you with the right person.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Shield,   title: 'Exam-specific',     desc: 'GL Assessment, CEM, and school-set papers — tutors matched to the format that matters.' },
                  { icon: BookOpen, title: 'All core subjects',  desc: 'Maths, English, Verbal Reasoning, and Non-Verbal Reasoning covered in full.' },
                  { icon: Clock,    title: 'Structured plans',   desc: 'Diagnostic, revision schedule, and regular timed mocks built in from the start.' },
                ].map((f) => (
                  <div key={f.title} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-3 text-indigo-600">
                      <f.icon size={18} />
                    </div>
                    <div className="font-bold text-slate-900 text-sm mb-1">{f.title}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lead form */}
            <aside className="lg:col-span-1">
              <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm sticky top-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                    <Users size={20} />
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-lg">Tutor enquiry</div>
                    <div className="text-xs text-slate-500">Free — no obligation</div>
                  </div>
                </div>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <label className="block">
                      <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Your name</div>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
                          placeholder="Parent / guardian" required />
                      </div>
                    </label>
                    <label className="block">
                      <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Email</div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
                          placeholder="you@example.com" required />
                      </div>
                    </label>
                    <label className="block">
                      <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Phone (optional)</div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
                          placeholder="07..." />
                      </div>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="block">
                        <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Child's year</div>
                        <input value={form.childYear} onChange={(e) => setForm({ ...form, childYear: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
                          placeholder="Year 4 / 5" />
                      </label>
                      <label className="block">
                        <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Location</div>
                        <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
                          placeholder="e.g. Manchester" />
                      </label>
                    </div>
                    <label className="block">
                      <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Notes (optional)</div>
                      <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none text-sm min-h-[80px]"
                        placeholder="Target schools, weak areas, time until exam..." />
                    </label>
                    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
                    <button type="submit" disabled={loading}
                      className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-lg shadow-indigo-200 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 text-sm">
                      {loading ? <><Loader2 size={15} className="animate-spin" /> Sending...</> : 'Send enquiry'}
                    </button>
                    <p className="text-xs text-slate-400 text-center leading-relaxed">
                      Free enquiry. We do not lock resources behind sign-up.
                    </p>
                  </form>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-900">
                    <div className="font-black mb-1">Enquiry received.</div>
                    <p className="text-sm text-emerald-800">We will be in touch using the details you provided.</p>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-slate-50 border-y border-slate-100 py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-3">How we help families prepare</h2>
              <p className="text-slate-600 leading-relaxed">
                We connect parents with specialist 11 plus tutors who have direct experience of the
                schools and exam format relevant to your area. We also provide free practice
                resources — papers, mock exams, and subject guides — so your child can build
                confidence between sessions.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {[
                { step: '01', title: 'Submit an enquiry',      desc: "Tell us your location, child's year group, and the schools you are targeting." },
                { step: '02', title: 'We match you up',        desc: 'We identify tutors with relevant experience in your exam board and target schools.' },
                { step: '03', title: 'Diagnostic assessment',  desc: 'Your tutor runs an initial session to identify strengths and gaps across all subjects.' },
                { step: '04', title: 'Structured preparation', desc: 'A plan covering all relevant subjects with timed mock practice built in throughout.' },
              ].map((s) => (
                <div key={s.step} className="bg-white rounded-2xl p-6 border border-slate-100">
                  <div className="text-3xl font-black text-indigo-100 mb-3">{s.step}</div>
                  <div className="font-bold text-slate-900 mb-2 text-sm">{s.title}</div>
                  <div className="text-xs text-slate-500 leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Star,        title: 'Specialist tutors only',   desc: 'We only work with tutors who have demonstrable 11 plus experience.' },
                { icon: CheckCircle, title: 'No lock-in',               desc: 'No contracts. You can change or stop tuition at any point.' },
                { icon: BookOpen,    title: 'Free resources alongside', desc: 'Every family gets access to our full library of practice papers and mock exams.' },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <f.icon size={17} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm mb-1">{f.title}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="max-w-2xl mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-3">Areas we cover</h2>
            <p className="text-slate-600 leading-relaxed">
              We work with families in major towns and cities throughout England, Wales, and
              Scotland. If your area is not listed, submit an enquiry — we cover many more
              locations beyond those shown here.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {UK_CITIES.map((city) => (
              <div key={city.slug}
                className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 text-sm font-semibold">
                <MapPin size={12} className="text-indigo-300 shrink-0" />
                {city.label}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Not listed?{' '}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-indigo-600 font-semibold hover:underline">
              Submit an enquiry above
            </button>{' '}
            and we will confirm availability.
          </p>
        </section>

        {/* What to look for + About */}
        <section className="bg-slate-50 border-y border-slate-100 py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4">What to look for in an 11 plus tutor</h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  The 11 plus is highly specific — format, timing, and school requirements vary
                  considerably. Not every tutor is right for this exam. Here is what matters most.
                </p>
                <ul className="space-y-3">
                  {[
                    'Direct experience with the specific schools and test format you are targeting',
                    'A structured approach: diagnostic first, then a plan, then timed mock practice',
                    'Clear communication with parents on progress and areas to work on',
                    'Regular, manageable homework rather than last-minute cramming',
                    'Honest expectations — no reputable tutor guarantees a pass',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle size={12} />
                      </div>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-4">About 11 Plus Exam Papers</h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  11plusexampapers.com is a free resource used by thousands of families preparing
                  for the 11 plus each year. We provide practice papers, timed mock exams, subject
                  guides, and school profiles covering grammar and selective schools across the UK.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our tutor matching service sits alongside those free resources. There is no
                  charge to submit an enquiry. Tuition fees are agreed directly between you and
                  your tutor.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We are not a tutor agency. We connect families with trusted, experienced tutors
                  and support the preparation process with our own materials at no cost.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 mb-2 text-center">Frequently asked questions</h2>
            <p className="text-slate-500 text-center mb-10 text-sm">
              Common questions from parents about 11 plus tuition and how we work.
            </p>
            <div className="space-y-3">
              {FAQS.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-indigo-600 py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-black text-white mb-3">Ready to get started?</h2>
            <p className="text-indigo-200 leading-relaxed mb-8">
              Submit a free enquiry and we will connect you with an experienced 11 plus tutor in your area.
            </p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-black rounded-2xl shadow-xl hover:bg-indigo-50 transition-colors">
              <Users size={18} />
              Submit a tutor enquiry
            </button>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
