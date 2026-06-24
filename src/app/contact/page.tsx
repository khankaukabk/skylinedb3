'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

// --- CONFIG ---
const SUPPORT_NUMBER_FORMATTED = "(205) 235-1664";
const SUPPORT_EMAIL = "info@skylinedb3.com";
const ADDRESS = "3622 Central Ave, Memphis, TN";

// --- CUSTOM SOCIAL ICONS ---
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

const SOCIAL_LINKS = [
  { label: "Instagram", icon: <InstagramIcon className="w-5 h-5" />, href: "#" },
  { label: "LinkedIn", icon: <LinkedinIcon className="w-5 h-5" />, href: "#" },
  { label: "Twitter / X", icon: <TwitterIcon className="w-5 h-5" />, href: "#" }
];

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      project_scope: formData.get('project_scope'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <main
      className="flex flex-col lg:flex-row bg-[#F9F9F7] font-sans selection:bg-amber-100 selection:text-amber-900"
      style={{ minHeight: "100vh", paddingTop: "var(--nav-h, 80px)" }}
    >
      {/* LEFT SIDE: CONTACT INFO (DARK) */}
      <div className="w-full lg:w-5/12 bg-neutral-950 text-white px-6 py-16 md:px-12 md:py-20 lg:p-24 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 border-r border-t border-white/5 opacity-50 translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="animate-fade-up">
            <span className="text-amber-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block font-sans">
              Direct Dispatch
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight mb-10 md:mb-12">
              Initiate an <br />Evaluation.
            </h1>
          </div>

          <div className="space-y-8 md:space-y-10">
            {/* Phone */}
            <div className="group">
              <span className="block text-[8px] uppercase tracking-[0.25em] text-neutral-500 font-bold mb-2">Client Advisory</span>
              <a href="tel:2052351664" className="flex items-center gap-4 text-neutral-300 hover:text-amber-500 transition-colors">
                <Phone className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                <span className="font-mono text-sm md:text-base tracking-widest">{SUPPORT_NUMBER_FORMATTED}</span>
              </a>
            </div>

            {/* Email */}
            <div className="group">
              <span className="block text-[8px] uppercase tracking-[0.25em] text-neutral-500 font-bold mb-2">Digital Inquiry</span>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-4 text-neutral-300 hover:text-amber-500 transition-colors">
                <Mail className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                <span className="font-mono text-sm md:text-base tracking-widest">{SUPPORT_EMAIL}</span>
              </a>
            </div>

            {/* Location */}
            <div className="group">
              <span className="block text-[8px] uppercase tracking-[0.25em] text-neutral-500 font-bold mb-2">Studio Location</span>
              <div className="flex items-start gap-4 text-neutral-300">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="font-mono text-sm md:text-base tracking-widest leading-relaxed">
                  {ADDRESS}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-16 md:mt-20 pt-8 md:pt-10 border-t border-white/10">
          <span className="block text-[8px] uppercase tracking-[0.25em] text-neutral-500 font-bold mb-6">Social Architecture</span>
          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                aria-label={social.label}
                className="text-neutral-400 hover:text-amber-500 hover:-translate-y-1 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE: INQUIRY FORM (LIGHT) */}
      <div className="w-full lg:w-7/12 bg-[#F9F9F7] px-6 py-16 md:px-12 md:py-20 lg:p-24 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-full max-w-xl">

          <div className="mb-10 md:mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">Project Commission</h2>
            <p className="text-neutral-500 text-sm md:text-base font-light font-sans leading-relaxed">
              Please provide your project details below. Our spatial engineers will review your parameters and contact you to schedule an initial consultation.
            </p>
          </div>

          {status === 'success' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-50 border border-green-200 p-8 rounded-sm text-center">
              <h3 className="text-green-800 font-serif text-2xl mb-2">Transmission Successful</h3>
              <p className="text-green-700 text-sm font-sans">Your blueprint has been received. Our advisory desk will be in contact shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input type="text" id="name" name="name" required disabled={status === 'loading'} className="w-full bg-transparent border-b border-neutral-300 py-3 text-sm md:text-base text-neutral-900 focus:outline-none focus:border-amber-600 transition-colors peer placeholder-transparent disabled:opacity-50" placeholder="Full Name" />
                  <label htmlFor="name" className="absolute left-0 top-3 text-neutral-400 text-xs md:text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-amber-600 peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest">Full Name</label>
                </div>

                <div className="relative group">
                  <input type="email" id="email" name="email" required disabled={status === 'loading'} className="w-full bg-transparent border-b border-neutral-300 py-3 text-sm md:text-base text-neutral-900 focus:outline-none focus:border-amber-600 transition-colors peer placeholder-transparent disabled:opacity-50" placeholder="Email Address" />
                  <label htmlFor="email" className="absolute left-0 top-3 text-neutral-400 text-xs md:text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-amber-600 peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest">Email Address</label>
                </div>
              </div>

              <div className="relative group pt-2">
                <select id="type" name="project_scope" required disabled={status === 'loading'} className="w-full bg-transparent border-b border-neutral-300 py-3 text-sm md:text-base text-neutral-900 focus:outline-none focus:border-amber-600 transition-colors appearance-none cursor-pointer disabled:opacity-50" defaultValue="">
                  <option value="" disabled hidden>Select Project Scope</option>
                  <option value="residential">Residential Architecture</option>
                  <option value="commercial">Commercial Real Estate</option>
                  <option value="masterplan">Masterplan & Urban Design</option>
                  <option value="other">Other / Consultation</option>
                </select>
                <div className="absolute right-0 top-4 pointer-events-none text-neutral-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <div className="relative group pt-4">
                <textarea id="message" name="message" required rows={4} disabled={status === 'loading'} className="w-full bg-transparent border-b border-neutral-300 py-3 text-sm md:text-base text-neutral-900 focus:outline-none focus:border-amber-600 transition-colors peer placeholder-transparent resize-none disabled:opacity-50" placeholder="Project Details"></textarea>
                <label htmlFor="message" className="absolute left-0 top-3 text-neutral-400 text-xs md:text-sm font-light transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-amber-600 peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-valid:-top-4 peer-valid:text-[10px] peer-valid:uppercase peer-valid:tracking-widest">Project Details & Objectives</label>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm font-sans">An error occurred while transmitting your request. Please try again or email us directly.</p>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full md:w-auto inline-flex items-center justify-center border border-neutral-300 bg-white text-neutral-900 px-10 py-4 font-bold text-[10px] uppercase tracking-[0.25em] hover:border-amber-600 hover:text-amber-600 transition-all font-sans rounded-sm group shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-4 h-4 mr-3 animate-spin" /> Transmitting...</>
                  ) : (
                    <>Submit Blueprint <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
              </div>
            </form>
          )}

        </motion.div>
      </div>
    </main>
  );
}