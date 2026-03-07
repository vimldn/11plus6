'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  School, Building2, BookOpen, Clock, Target,
  CheckCircle, ClipboardList,
  BarChart3, Shield, Mail, User2, Play,
} from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { SchoolMockStart } from '@/components/SchoolMockStart';

type SchoolType = 'grammar' | 'independent' | 'state';

interface TestConfig {
  schoolType: SchoolType | null;
  duration: number;
  questionCount: number;
  subjects: string[];
  difficulty: 'standard' | 'challenging' | 'exam-ready';
}

// ─── Static data ─────────────────────────────────────────────────────────────

const SCHOOL_TYPES = [
  {
    id: 'grammar' as SchoolType,
    title: 'Grammar School',
    subtitle: 'GL Assessment & CEM Style',
    icon: School,
    gradient: 'from-indigo-500 to-violet-600',
    selBg: 'bg-indigo-50',
    selBorder: 'border-indigo-400',
  },
  {
    id: 'independent' as SchoolType,
    title: 'Independent School',
    subtitle: 'Common Entrance & ISEB',
    icon: Building2,
    gradient: 'from-emerald-500 to-teal-600',
    selBg: 'bg-emerald-50',
    selBorder: 'border-emerald-400',
  },
  {
    id: 'state' as SchoolType,
    title: 'State School',
    subtitle: 'KS2 SATs & Core Curriculum',
    icon: BookOpen,
    gradient: 'from-amber-500 to-orange-600',
    selBg: 'bg-amber-50',
    selBorder: 'border-amber-400',
  },
];

const SUBJECTS_BY_TYPE: Record<SchoolType, { id: string; label: string }[]> = {
  grammar: [
    { id: 'maths',     label: 'Maths' },
    { id: 'english',   label: 'English' },
    { id: 'verbal',    label: 'Verbal Reasoning' },
    { id: 'nonverbal', label: 'Non-Verbal Reasoning' },
  ],
  independent: [
    { id: 'maths',     label: 'Maths' },
    { id: 'english',   label: 'English' },
    { id: 'verbal',    label: 'Verbal Reasoning' },
    { id: 'nonverbal', label: 'Non-Verbal Reasoning' },
  ],
  state: [
    { id: 'maths',   label: 'Maths' },
    { id: 'english', label: 'English' },
  ],
};

const DURATIONS = [
  { mins: 25, label: '25 mins' },
  { mins: 45, label: '45 mins' },
  { mins: 60, label: '60 mins' },
  { mins: 90, label: '90 mins' },
];

const QUESTION_COUNTS = [
  { n: 20, label: '20' },
  { n: 25, label: '25' },
  { n: 30, label: '30' },
];

const DIFFICULTIES = [
  { id: 'standard'    as const, label: 'Standard' },
  { id: 'challenging' as const, label: 'Challenging' },
  { id: 'exam-ready'  as const, label: 'Exam Ready' },
];

const STATS = [
  { icon: ClipboardList, value: 'Exam-style',  label: 'Structured papers' },
  { icon: Shield,        value: 'GL & CEM',    label: 'Style coverage' },
  { icon: Clock,         value: '25-90',        label: 'Timed sessions' },
  { icon: CheckCircle,   value: 'Free',        label: 'Access (for now)' },
];

const FEATURES = [
  { icon: ClipboardList, title: 'Exam-style structure',   desc: 'Clear sections, realistic pacing, and a paper-like flow using our current QuizArea engine.', bg: 'bg-violet-50',  color: 'text-violet-600' },
  { icon: Clock,         title: 'Timed conditions',       desc: 'Optional timers help children practise under proper exam conditions and build confidence.',   bg: 'bg-emerald-50', color: 'text-emerald-600' },
  { icon: BarChart3,     title: 'Instant results',        desc: 'See scores and topic-level feedback to guide what to practise next.',                         bg: 'bg-blue-50',    color: 'text-blue-600'    },
  { icon: Target,        title: 'Syllabus coverage',      desc: 'Maths, English, Verbal Reasoning and Non-Verbal Reasoning in familiar 11+ formats.',         bg: 'bg-amber-50',   color: 'text-amber-600'   },
  { icon: CheckCircle,   title: 'Clear explanations',     desc: 'Review answers with straightforward explanations so children learn from mistakes.',           bg: 'bg-indigo-50',  color: 'text-indigo-600'  },
  { icon: Shield,        title: 'Built for 11+ prep',     desc: 'Created for families preparing for grammar and independent school entrance exams.',           bg: 'bg-slate-100',  color: 'text-slate-600'   },
];

// ─── Page ────────────────────────────────────────────────────────────────────

function MockExamsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = (searchParams.get('mode') || 'general').toLowerCase();
  const isSchoolMode = mode === 'school';

  const [config, setConfig] = useState<TestConfig>({
    schoolType: null, duration: 45, questionCount: 25, subjects: [], difficulty: 'standard',
  });

  const [leadName, setLeadName]     = useState('');
  const [leadEmail, setLeadEmail]   = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const isEmailValid = leadEmail.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail.trim());

  const availableSubjs = config.schoolType ? SUBJECTS_BY_TYPE[config.schoolType] : [];

  const toggleSubject = (id: string) =>
    setConfig(prev => ({
      ...prev,
      subjects: prev.subjects.includes(id) ? prev.subjects.filter(s => s !== id) : [...prev.subjects, id],
    }));

  const canStart = !!config.schoolType && config.subjects.length > 0 && isEmailValid;

  const handleStartTest = () => {
    setEmailTouched(true);
    if (!canStart) return;

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: leadEmail.trim(),
        childName: leadName.trim(),
        source: 'mock-exam-general',
        targetSchool: config.schoolType || '',
      }),
    }).catch(() => undefined);

    const params = new URLSearchParams();
    params.set('quizType', 'multiple-choice');
    params.set('mode', 'exam');
    if (config.schoolType) params.set('schoolType', config.schoolType);

    const subjectId = config.subjects.includes('maths') ? 'maths' : (config.subjects[0] || 'maths');
    params.set('subject', subjectId);
    params.set('count', String(Math.max(10, Math.min(30, config.questionCount))));
    params.set('duration', String(Math.max(15, Math.min(120, config.duration))));
    params.set('difficulty', config.difficulty);

    router.push(`/quiz?${params.toString()}`);
  };

  return (
    <>
      <SiteNav ctaLabel="Find a tutor" ctaHref="/tutors" />

      <main className="bg-white">

        {/* ── Hero + Form ────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50 pt-6 pb-10 px-4">
          <div className="pointer-events-none absolute -top-24 -right-24 w-[500px] h-[500px] bg-violet-200 opacity-20 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-200 opacity-15 rounded-full blur-3xl" />

          <div className="relative max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest mb-3">
                <ClipboardList size={12} /> Interactive Mock Exams
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 tracking-tight leading-tight">
                Sit a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">realistic 11+ mock exam</span>
              </h1>
              <p className="text-sm text-slate-500 max-w-xl mx-auto">
                Choose your exam style, enter your email and start practising.
              </p>
            </motion.div>

            {/* Mode tabs */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              className="flex items-center justify-center gap-3 mb-5">
              <button
                type="button"
                onClick={() => router.push('/mock-exams')}
                className={`inline-flex items-center justify-center px-6 py-3 rounded-2xl font-black transition-all border ${
                  !isSchoolMode
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                General 11+ mock
              </button>
              <button
                type="button"
                onClick={() => router.push('/mock-exams?mode=school')}
                className={`inline-flex items-center justify-center px-6 py-3 rounded-2xl font-black transition-all border ${
                  isSchoolMode
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                School-specific mock
              </button>
            </motion.div>

            {/* ── Form area ── */}
            {isSchoolMode ? (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-8 overflow-hidden">
                <SchoolMockStart compact />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">

                {/* ── Left column: Exam config ── */}
                <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 mb-4">
                    <School className="text-indigo-600" size={18} /> Configure your mock exam
                  </div>

                  {/* School type */}
                  <label className="block text-sm font-bold text-slate-600 mb-2">School type <span className="text-rose-500">*</span></label>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {SCHOOL_TYPES.map((type) => {
                      const isSelected = config.schoolType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setConfig(prev => ({ ...prev, schoolType: type.id, subjects: [] }))}
                          className={`relative flex flex-col items-center text-center p-3 rounded-2xl border-2 transition-all ${
                            isSelected
                              ? `${type.selBg} ${type.selBorder} shadow-sm`
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center text-white mb-2 shadow-sm`}>
                            <type.icon size={18} />
                          </div>
                          <div className="text-xs font-black text-slate-900 leading-tight">{type.title}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{type.subtitle}</div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                              <CheckCircle size={10} className="text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Subjects */}
                  {config.schoolType && (
                    <>
                      <label className="block text-sm font-bold text-slate-600 mb-2">
                        Subject <span className="text-rose-500">*</span>
                        {config.subjects.length === 0 && <span className="text-rose-500 font-normal text-xs ml-1">-- please select</span>}
                      </label>
                      <div className="grid grid-cols-2 gap-2 mb-5">
                        {availableSubjs.map((subj) => {
                          const selected = config.subjects.includes(subj.id);
                          return (
                            <button
                              key={subj.id}
                              type="button"
                              onClick={() => toggleSubject(subj.id)}
                              className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl border-2 transition-all text-left ${
                                selected ? 'bg-indigo-50 border-indigo-400 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                                selected ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'
                              }`}>
                                {selected && <CheckCircle size={9} className="text-white" />}
                              </div>
                              <span className={`text-sm font-bold ${selected ? 'text-indigo-700' : 'text-slate-700'}`}>{subj.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* Duration, Questions, Difficulty */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><Clock size={11} /> Duration</p>
                      <div className="flex flex-wrap gap-1.5">
                        {DURATIONS.map((d) => {
                          const sel = config.duration === d.mins;
                          return (
                            <button key={d.mins} type="button" onClick={() => setConfig(prev => ({ ...prev, duration: d.mins }))}
                              className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${sel ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'}`}>
                              {d.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><ClipboardList size={11} /> Questions</p>
                      <div className="flex flex-wrap gap-1.5">
                        {QUESTION_COUNTS.map((q) => {
                          const sel = config.questionCount === q.n;
                          return (
                            <button key={q.n} type="button" onClick={() => setConfig(prev => ({ ...prev, questionCount: q.n }))}
                              className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${sel ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'}`}>
                              {q.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1"><Target size={11} /> Difficulty</p>
                      <div className="flex flex-wrap gap-1.5">
                        {DIFFICULTIES.map((d) => {
                          const sel = config.difficulty === d.id;
                          return (
                            <button key={d.id} type="button" onClick={() => setConfig(prev => ({ ...prev, difficulty: d.id }))}
                              className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${sel ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'}`}>
                              {d.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Right column: Student details + start ── */}
                <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6">
                  <div className="flex items-center gap-2 font-extrabold text-slate-900 mb-4">
                    <User2 className="text-indigo-600" size={18} /> Your details
                  </div>

                  <label className="block text-sm font-bold text-slate-600 mb-1">Child&apos;s first name</label>
                  <div className="relative mb-4">
                    <User2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Optional"
                      className="w-full rounded-2xl border border-slate-200 px-10 py-3 font-semibold"
                    />
                  </div>

                  <label className="block text-sm font-bold text-slate-600 mb-1">Parent email <span className="text-rose-500">*</span></label>
                  <div className="relative mb-1">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      onBlur={() => setEmailTouched(true)}
                      placeholder="you@example.com"
                      className={`w-full rounded-2xl border px-10 py-3 font-semibold ${
                        emailTouched && !isEmailValid ? 'border-rose-400 ring-1 ring-rose-200' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {emailTouched && !isEmailValid && (
                    <p className="text-xs text-rose-600 font-semibold mb-4 ml-1">Please enter a valid email address.</p>
                  )}
                  {(!emailTouched || isEmailValid) && <div className="mb-4" />}

                  <button
                    type="button"
                    onClick={handleStartTest}
                    disabled={!canStart}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 font-black text-white transition ${
                      canStart ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-300 cursor-not-allowed'
                    }`}
                  >
                    <Play size={18} /> Start mock exam
                  </button>

                  {!config.schoolType && (
                    <p className="text-xs text-slate-400 mt-3 text-center">Select a school type and subject to get started.</p>
                  )}
                  {config.schoolType && config.subjects.length === 0 && (
                    <p className="text-xs text-slate-400 mt-3 text-center">Pick at least one subject to continue.</p>
                  )}
                  {config.schoolType && config.subjects.length > 0 && !isEmailValid && (
                    <p className="text-xs text-slate-400 mt-3 text-center">Enter your email to start the exam.</p>
                  )}

                  <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-100 p-4 text-sm text-slate-600 leading-relaxed">
                    This launches a timed, interactive exam in your browser. When time is up the test auto-submits and you get instant results sent to your email.
                  </div>
                </div>

              </div>
            )}

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8"
            >
              {STATS.map((item, i) => (
                <div key={i} className="text-center p-4 rounded-2xl bg-white/70 border border-slate-100 shadow-sm">
                  <item.icon size={20} className="text-indigo-500 mx-auto mb-2" />
                  <div className="text-xl font-black text-slate-900">{item.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{item.label}</div>
                </div>
              ))}
            </motion.div>

          </div>{/* end max-w container */}
        </section>

        {/* ── Why our mock tests work ───────────────────────────────────────── */}
        <section className="bg-slate-50 border-t border-slate-100 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Why our mock tests work</h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Built around the real question formats used in 11+ entrance exams across the UK.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center mb-5`}>
                    <f.icon size={24} className={f.color} />
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}

export default function MockExamsClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <MockExamsPageInner />
    </Suspense>
  );
}
