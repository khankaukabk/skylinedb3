'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Menu, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// --- CONFIG & ASSETS ---
const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/skylinedb3-e8295.firebasestorage.app/o/Logo%2FSBD.png?alt=media&token=f5776d7f-6da0-447b-a4ee-36d13c24dc73";
const SUPPORT_NUMBER_DIGITS = "2052351664";
const SMS_BODY_MSG = "Hello SkylineDB3 Team, I am interested in commissioning an architectural evaluation and would like to request a portfolio dossier.";
const SMS_LINK = `sms:+1${SUPPORT_NUMBER_DIGITS}?body=${encodeURIComponent(SMS_BODY_MSG)}`;

const MessageBubbleIcon = ({ className }: { className?: string }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
);

export default function ProjectsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMobileMenuOpen]);

  return (
    <div className="bg-[#F9F9F7] text-neutral-900 min-h-screen font-sans selection:bg-amber-100 selection:text-amber-900 flex flex-col">

      {/* SOLID NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 bg-neutral-950 border-b border-white/10 py-4 px-5 md:px-12 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link href="/">
            <div className="relative w-28 h-8 md:w-48 md:h-12 hover:opacity-80 transition-opacity">
              <Image src={LOGO_URL} alt="SkylineDB3" fill className="object-contain object-left opacity-95" priority sizes="(max-width: 768px) 120px, 200px" />
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] font-medium text-white/90 pointer-events-auto">
          <Link href="/projects" className="text-amber-400 transition-colors font-bold">Projects</Link>
          <Link href="/#services" className="hover:text-amber-400 transition-colors">Services</Link>
          <Link href="/about" className="hover:text-amber-400 transition-colors">About</Link>
          <Link href="/#contact" className="hover:text-amber-400 transition-colors">Connect</Link>
        </nav>

        <button className="md:hidden pointer-events-auto text-white p-2" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open Menu">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col justify-center px-8"
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white p-2" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-8 h-8" strokeWidth={1.5} />
            </button>
            <nav className="flex flex-col gap-8 text-2xl font-serif text-white/80 tracking-wide">
              <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="text-amber-500 transition-colors">Projects</Link>
              <Link href="/#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500 transition-colors">Services</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500 transition-colors">About</Link>
              <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500 transition-colors mt-4 font-bold">Connect</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow flex flex-col justify-center pt-32 pb-20 px-5 md:px-12 relative overflow-hidden">
        {/* Subtle Background Pattern/Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-3xl mx-auto w-full relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
              <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-amber-600"></span>
              </span>
              <span className="text-amber-800 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.4em] font-sans">
                Database Syncing
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-neutral-900 tracking-tight leading-[1.1] mb-8">
              Curating the <br /><span className="italic font-light text-neutral-500">Digital Exhibition.</span>
            </h1>

            <div className="w-16 h-[1px] bg-amber-900/30 mx-auto mb-8" />

            <p className="text-neutral-500 font-light text-sm md:text-base leading-relaxed font-sans max-w-xl mx-auto mb-10 md:mb-12">
              Our portfolio database is currently undergoing live structural updates to showcase our latest architectural commissions, spatial engineering projects, and masterplan developments.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={SMS_LINK} className="w-full sm:w-auto inline-flex items-center justify-center bg-neutral-950 text-white px-8 py-4 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] hover:bg-amber-900 transition-colors font-sans rounded-sm group">
                Request Private Dossier <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-12 md:py-20 px-5 md:px-6 bg-white border-t border-neutral-200 relative z-10 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-1.5 md:space-y-2">
            <span className="font-serif text-xs md:text-sm tracking-[0.3em] md:tracking-[0.4em] text-neutral-900 block uppercase">
              SkylineDB3
            </span>
            <div className="flex items-center justify-center gap-2 md:gap-3 text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.3em] uppercase text-neutral-400">
              <span className="h-[1px] w-4 md:w-6 bg-neutral-300"></span>
              <span>A <strong className="text-amber-900 font-normal">GrowShare Capital</strong> Company</span>
              <span className="h-[1px] w-4 md:w-6 bg-neutral-300"></span>
            </div>
          </div>

          <span className="block text-[7px] md:text-[8px] tracking-widest text-neutral-400 uppercase mt-8">
            © {new Date().getFullYear()} SkylineDB3. All Planes Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}