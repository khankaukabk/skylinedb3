'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

// --- CONFIG & ASSETS ---
const SUPPORT_NUMBER_DIGITS = "2052351664";
const SMS_BODY_MSG = "Hello SkylineDB3 Team, I am interested in commissioning an architectural evaluation.";
const SMS_LINK = `sms:+1${SUPPORT_NUMBER_DIGITS}?body=${encodeURIComponent(SMS_BODY_MSG)}`;

const TEAM = [
  { name: "Ashif Jahan", title: "Chief Executive Officer", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop", bio: "Guiding the firm's strategic vision and ensuring global structural investments meet exact developmental thresholds." },
  { name: "Jeff Blackledge", title: "Senior Architect", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop", bio: "Mastering the intersection of structural physics and aesthetic form to deliver uncompromising, landmark environments." },
  { name: "Core Support Team", title: "Spatial Engineering & Delivery", image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1200&auto=format&fit=crop", bio: "A multi-disciplinary unit executing complex architectural masterplans with absolute precision and zero variance." }
];

const MessageBubbleIcon = ({ className }: { className?: string }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
);

export default function AboutPage() {
  return (
    // Padding top respects your global navbar height
    <div className="bg-[#F9F9F7] text-neutral-900 min-h-screen font-sans selection:bg-amber-100 selection:text-amber-900" style={{ paddingTop: "var(--nav-h, 80px)" }}>

      {/* PAGE HERO */}
      <section className="py-20 md:py-32 px-5 md:px-12 bg-white border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-amber-800 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.4em] mb-4 md:mb-6 block font-sans">
            Firm Profile
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl text-neutral-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Engineers of <br /><span className="italic font-light text-amber-900">Spatial Reality.</span>
          </h1>
        </div>
      </section>

      {/* THE TEAM */}
      <section className="py-20 md:py-40 px-5 md:px-12 bg-[#F9F9F7] border-t border-neutral-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 mb-12 md:mb-24">
            <div className="max-w-2xl text-left">
              <span className="text-amber-800 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-3 md:mb-4 block font-sans">
                Leadership
              </span>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-neutral-900 tracking-tight">
                The Design Principals.
              </h2>
            </div>
            <p className="text-neutral-500 font-light text-xs md:text-base leading-relaxed border-l border-neutral-200 pl-4 md:pl-6 font-sans max-w-md">
              A highly calibrated collective of spatial engineers, masterplanners, and structural visionaries operating on a global scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {TEAM.map((member, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="relative w-full aspect-square md:aspect-[3/4] mb-4 md:mb-6 overflow-hidden bg-neutral-100 rounded-sm shadow-lg border border-neutral-200">
                  <Image src={member.image} alt={member.name} fill className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="border-l-2 border-amber-800/20 group-hover:border-amber-800 transition-colors pl-3 md:pl-4">
                  <h3 className="font-serif text-xl md:text-3xl text-neutral-900 mb-1">{member.name}</h3>
                  <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-amber-800 mb-3 md:mb-4 font-sans">{member.title}</p>
                  <p className="text-neutral-500 text-xs md:text-sm font-light leading-relaxed font-sans">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 md:py-40 px-5 md:px-6 bg-white border-t border-neutral-200 relative z-10 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-[1px] h-12 md:h-16 bg-amber-900/30 mx-auto mb-8 md:mb-12" />
          <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl mb-6 md:mb-8 text-neutral-900 tracking-tight font-normal">Architect Certainty.</h2>
          <p className="text-neutral-500 mb-8 md:mb-12 font-light leading-relaxed text-xs sm:text-sm md:text-lg max-w-lg mx-auto font-sans">
            Initiate an absolute architectural evaluation. Connect with our private client desk to commission your space.
          </p>

          <div className="flex flex-col gap-3 md:gap-4 max-w-sm mx-auto w-full">
            <a href={SMS_LINK} className="group relative overflow-hidden bg-neutral-950 text-white py-4 md:py-5 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] transition-all duration-500 block rounded-sm md:rounded-none">
              <span className="relative z-10 flex items-center justify-center gap-2.5"><MessageBubbleIcon className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" /> Private Client Advisory</span>
              <div className="absolute inset-0 bg-amber-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </a>
            <a href="mailto:skylinedb3.team@gmail.com" className="w-full block border border-neutral-200 bg-[#F9F9F7] text-neutral-800 py-4 md:py-5 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] hover:border-neutral-900 transition-colors font-sans rounded-sm md:rounded-none">
              Direct Dispatch
            </a>
          </div>

          <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-neutral-200 text-neutral-400 space-y-5 font-sans">
            <div className="flex items-center justify-center gap-1.5 md:gap-2 text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em]">
              <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-neutral-600 shrink-0" />
              <span>3622 Central Ave, Memphis, TN</span>
            </div>

            <div className="space-y-1.5 md:space-y-2 pt-1 md:pt-2">
              <span className="font-serif text-xs md:text-sm tracking-[0.3em] md:tracking-[0.4em] text-neutral-900 block uppercase">
                SkylineDB3
              </span>
              <div className="flex items-center justify-center gap-2 md:gap-3 text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.3em] uppercase text-neutral-400">
                <span className="h-[1px] w-4 md:w-6 bg-neutral-300"></span>
                <span>A <strong className="text-amber-900 font-normal">GrowShare Capital</strong> Company</span>
                <span className="h-[1px] w-4 md:w-6 bg-neutral-300"></span>
              </div>
            </div>

            <span className="block text-[7px] md:text-[8px] tracking-widest text-neutral-400 uppercase">
              © {new Date().getFullYear()} SkylineDB3. All Planes Reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}