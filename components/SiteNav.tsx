 'use client';
import React, {useState} from 'react';
import Link from 'next/link';
import {AnimatePresence, motion} from 'framer-motion';
import {ArrowRight, BookOpen, BrainCircuit, Calculator, Calendar, GraduationCap, Lock, Mail, Menu, Phone, Shapes, User, X} from 'lucide-react';
import {SUBJECTS as BASE_SUBJECTS, UK_CITIES} from '@/lib/siteData';
export const SUBJECTS = BASE_SUBJECTS.map((s,i)=>({...s,icon:[Calculator,BookOpen,BrainCircuit,Shapes][i]}));
export {UK_CITIES};
interface SiteNavProps {ctaLabel?:string;ctaHref?:string;onCtaClick?:()=>void;}
const links=[['Practice','/subjects'],['Mock exams','/mock-exams'],['Papers','/papers'],['School guides','/schools'],['Blog','/blog']];
export const SiteNav:React.FC<SiteNavProps>=({ctaLabel='My practice',ctaHref='/mock-exams',onCtaClick})=>{
 const [open,setOpen]=useState(false);
 return <header className="brand-header"><a href="#main-content" className="brand-skip">Skip to content</a><nav className="brand-nav" aria-label="Main navigation"><Link href="/" className="brand-wordmark" aria-label="11 Plus Exam Papers home"><span>11+</span><b>EXAM PAPERS</b></Link><div className="brand-desktop">{links.map(([label,url])=><Link key={url} href={url}>{label}</Link>)}</div><div className="brand-nav-end">{onCtaClick?<button onClick={onCtaClick} className="brand-nav-cta">{ctaLabel}</button>:<Link className="brand-nav-cta" href={ctaHref}>{ctaLabel}</Link>}<button className="brand-menu" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="brand-mobile-nav" onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button></div></nav>{open&&<nav id="brand-mobile-nav" className="brand-mobile" aria-label="Mobile navigation">{[...links,['Exam dates','/exam-dates'],['Tutors','/tutors'],['Compare schools','/compare']].map(([label,url])=><Link key={url} onClick={()=>setOpen(false)} href={url}>{label}<ArrowRight size={16}/></Link>)}</nav>}</header>;
};

// ─── LeadGenModal ─────────────────────────────────────────────────────────────

export const LeadGenModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  const [formData, setFormData] = useState({ email: '', phone: '', childName: '', childYear: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.childName) onSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden pointer-events-auto max-h-[90vh] overflow-y-auto"
            >
              <div className="relative p-6 sm:p-8">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <GraduationCap size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1">Request tutor support</h3>
                  <p className="text-slate-500 text-sm">
                    Send a short enquiry and we'll connect you with experienced 11+ tutors in your area.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Your email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="email" name="email" required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-800"
                        placeholder="name@example.com"
                        value={formData.email} onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Your phone number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="tel" name="phone" required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-800"
                        placeholder="07xxx xxxxxx"
                        value={formData.phone} onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Child's name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="text" name="childName" required
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-800"
                          placeholder="Noah"
                          value={formData.childName} onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Year group</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                          name="childYear" required
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-800 appearance-none"
                          value={formData.childYear} onChange={handleChange}
                        >
                          <option value="" disabled>Select year</option>
                          <option>Year 3</option>
                          <option>Year 4</option>
                          <option>Year 5</option>
                          <option>Year 6</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    Send enquiry <ArrowRight size={20} />
                  </button>

                  <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1">
                    <Lock size={12} /> Your details are kept private.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
