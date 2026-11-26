 'use client';
import React, {useState} from 'react';
import Link from 'next/link';
import {ArrowRight, BookOpen, BrainCircuit, Calculator, Menu, Shapes, X} from 'lucide-react';
import {SUBJECTS as BASE_SUBJECTS} from '@/lib/siteData';
export const SUBJECTS = BASE_SUBJECTS.map((s,i)=>({...s,icon:[Calculator,BookOpen,BrainCircuit,Shapes][i]}));
interface SiteNavProps {ctaLabel?:string;ctaHref?:string;onCtaClick?:()=>void;}
const links=[['Practice','/subjects'],['Mock exams','/mock-exams'],['Papers','/papers'],['School guides','/schools'],['Blog','/blog']];
export const SiteNav:React.FC<SiteNavProps>=({ctaLabel='My practice',ctaHref='/mock-exams',onCtaClick})=>{
 const [open,setOpen]=useState(false);
 return <header className="brand-header"><a href="#main-content" className="brand-skip">Skip to content</a><nav className="brand-nav" aria-label="Main navigation"><Link href="/" className="brand-wordmark" aria-label="11+ Exam Papers home"><span>11+</span><b>EXAM PAPERS</b></Link><div className="brand-desktop">{links.map(([label,url])=><Link key={url} href={url}>{label}</Link>)}</div><div className="brand-nav-end">{onCtaClick?<button onClick={onCtaClick} className="brand-nav-cta">{ctaLabel}</button>:<Link className="brand-nav-cta" href={ctaHref}>{ctaLabel}</Link>}<button className="brand-menu" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} aria-controls="brand-mobile-nav" onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button></div></nav>{open&&<nav id="brand-mobile-nav" className="brand-mobile" aria-label="Mobile navigation">{[...links,['Exam dates','/exam-dates'],['Compare schools','/compare']].map(([label,url])=><Link key={url} onClick={()=>setOpen(false)} href={url}>{label}<ArrowRight size={16}/></Link>)}</nav>}</header>;
};
