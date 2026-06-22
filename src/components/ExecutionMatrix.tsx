'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILITY ---
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- DATA ---
const PROCESS_PROJECTS = [
    {
        id: "residential",
        title: "Verde Private Estate",
        category: "Residential Architecture",
        img1: { label: "Architectural Sketch", url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2500&auto=format&fit=crop" },
        img2: { label: "3D Massing", url: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop&grayscale=1" },
        img3: { label: "Structural Framing", url: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=2500&auto=format&fit=crop&grayscale=1" },
        img4: { label: "Final Render", url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2500&auto=format&fit=crop" }
    },
    {
        id: "commercial",
        title: "The Apex Hub",
        category: "Commercial Real Estate",
        img1: { label: "Site Context", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop&grayscale=1" },
        img2: { label: "Foundation", url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2500&auto=format&fit=crop" },
        img3: { label: "Structural Framework", url: "https://images.unsplash.com/photo-1590846875883-9b98d9cc1254?q=80&w=2500&auto=format&fit=crop" },
        img4: { label: "Market Ready", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2500&auto=format&fit=crop" }
    },
    {
        id: "masterplan",
        title: "Foundry55 Sector",
        category: "Masterplan Development",
        img1: { label: "Zoning Concept", url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2500&auto=format&fit=crop" },
        img2: { label: "Infrastructure", url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2500&auto=format&fit=crop" },
        img3: { label: "3D Sector Map", url: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2500&auto=format&fit=crop&grayscale=1" },
        img4: { label: "Completed Sector", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2500&auto=format&fit=crop" }
    }
];

// --- COMPONENT ---
export default function ExecutionMatrix() {
    const [activeProcessProject, setActiveProcessProject] = useState(0);
    const [slider1, setSlider1] = useState(25);
    const [slider2, setSlider2] = useState(50);
    const [slider3, setSlider3] = useState(75);
    const sliderContainerRef = useRef<HTMLDivElement>(null);
    const [draggingSlider, setDraggingSlider] = useState<1 | 2 | 3 | null>(null);

    const nextProcessProject = useCallback(() => {
        setActiveProcessProject((prev) => (prev === PROCESS_PROJECTS.length - 1 ? 0 : prev + 1));
        setSlider1(25); setSlider2(50); setSlider3(75);
    }, []);

    const prevProcessProject = useCallback(() => {
        setActiveProcessProject((prev) => (prev === 0 ? PROCESS_PROJECTS.length - 1 : prev - 1));
        setSlider1(25); setSlider2(50); setSlider3(75);
    }, []);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, sliderNum: 1 | 2 | 3) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setDraggingSlider(sliderNum);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!draggingSlider || !sliderContainerRef.current) return;

        const rect = sliderContainerRef.current.getBoundingClientRect();
        let newPercent = ((e.clientX - rect.left) / rect.width) * 100;
        newPercent = Math.max(0, Math.min(100, newPercent));

        if (draggingSlider === 1) {
            setSlider1(newPercent);
            if (newPercent > slider2) setSlider2(newPercent);
            if (newPercent > slider3) setSlider3(newPercent);
        } else if (draggingSlider === 2) {
            setSlider2(newPercent);
            if (newPercent < slider1) setSlider1(newPercent);
            if (newPercent > slider3) setSlider3(newPercent);
        } else if (draggingSlider === 3) {
            setSlider3(newPercent);
            if (newPercent < slider2) setSlider2(newPercent);
            if (newPercent < slider1) setSlider1(newPercent);
        }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        setDraggingSlider(null);
    };

    return (
        <section id="process" className="py-16 md:py-32 px-5 md:px-12 bg-neutral-950 text-white relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-8 md:mb-12">
                    <span className="text-amber-500 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-3 md:mb-4 block font-sans">
                        Execution Matrix
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-tight mb-6">
                        Vision to Reality.
                    </h2>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProcessProject}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="px-5 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] border border-amber-500 bg-amber-500/10 text-amber-400 rounded-none font-sans text-center whitespace-nowrap shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                        >
                            {PROCESS_PROJECTS[activeProcessProject].category}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* FULL WIDTH 16:9 SLIDER CONTAINER */}
                <div
                    ref={sliderContainerRef}
                    className="relative w-full aspect-[16/9] bg-neutral-900 rounded-none overflow-hidden border border-neutral-800 shadow-2xl select-none"
                >
                    {/* STATIC LINE & LABEL 1: CONCEPT (Pinned to Left Edge) */}
                    <div className="absolute top-0 bottom-0 left-0 w-[3px] md:w-[4px] bg-amber-500 z-[55] pointer-events-none">
                        <div className="absolute top-[15%] -translate-y-1/2 left-0 bg-amber-500 w-[18px] md:w-[32px] h-[45px] md:h-[100px] rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center">
                            <span className="[writing-mode:vertical-rl] rotate-180 text-[7px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] font-black text-neutral-950 whitespace-nowrap font-mono select-none">
                                Concept
                            </span>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div key={activeProcessProject} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0 pointer-events-none">
                            {/* Base Image (Rightmost - Phase 4) */}
                            <Image priority src={PROCESS_PROJECTS[activeProcessProject].img4.url} alt={PROCESS_PROJECTS[activeProcessProject].img4.label} fill className="object-cover object-center opacity-90" sizes="100vw" />

                            {/* Image 3 clipped by slider 3 */}
                            <div className="absolute inset-0 z-10" style={{ clipPath: `inset(0 ${100 - slider3}% 0 0)` }}>
                                <Image priority src={PROCESS_PROJECTS[activeProcessProject].img3.url} alt={PROCESS_PROJECTS[activeProcessProject].img3.label} fill className="object-cover object-center opacity-90" sizes="100vw" />
                            </div>

                            {/* Image 2 clipped by slider 2 */}
                            <div className="absolute inset-0 z-20" style={{ clipPath: `inset(0 ${100 - slider2}% 0 0)` }}>
                                <Image priority src={PROCESS_PROJECTS[activeProcessProject].img2.url} alt={PROCESS_PROJECTS[activeProcessProject].img2.label} fill className="object-cover object-center opacity-90" sizes="100vw" />
                            </div>

                            {/* Image 1 clipped by slider 1 */}
                            <div className="absolute inset-0 z-30" style={{ clipPath: `inset(0 ${100 - slider1}% 0 0)` }}>
                                <Image priority src={PROCESS_PROJECTS[activeProcessProject].img1.url} alt={PROCESS_PROJECTS[activeProcessProject].img1.label} fill className="object-cover object-center opacity-90" sizes="100vw" />
                            </div>

                            <div className="absolute inset-x-0 bottom-0 h-24 md:h-48 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-30" />
                            <div className="absolute bottom-4 md:bottom-12 left-0 w-full text-center z-40 px-2 md:px-4">
                                <h3 className="font-serif text-lg sm:text-2xl md:text-5xl text-white drop-shadow-lg leading-tight">
                                    {PROCESS_PROJECTS[activeProcessProject].title}
                                </h3>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* SLIDER 1 HANDLE (Layout) */}
                    <div
                        className="absolute top-0 bottom-0 w-16 -ml-8 md:w-12 md:-ml-6 z-50 touch-none flex justify-center cursor-ew-resize group"
                        style={{ left: `${slider1}%` }}
                        onPointerDown={(e) => handlePointerDown(e, 1)}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                    >
                        {/* STATIC SOLID AMBER LINE */}
                        <div className="w-[3px] md:w-[4px] h-full bg-amber-500 relative">
                            <div className="absolute top-[38%] -translate-y-1/2 left-0 bg-amber-500 w-[18px] md:w-[32px] h-[45px] md:h-[100px] rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none">
                                <span className="[writing-mode:vertical-rl] rotate-180 text-[7px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] font-black text-neutral-950 whitespace-nowrap font-mono select-none">
                                    Layout
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* SLIDER 2 HANDLE (Model) */}
                    <div
                        className="absolute top-0 bottom-0 w-16 -ml-8 md:w-12 md:-ml-6 z-50 touch-none flex justify-center cursor-ew-resize group"
                        style={{ left: `${slider2}%` }}
                        onPointerDown={(e) => handlePointerDown(e, 2)}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                    >
                        {/* STATIC SOLID AMBER LINE */}
                        <div className="w-[3px] md:w-[4px] h-full bg-amber-500 relative">
                            <div className="absolute top-[61%] -translate-y-1/2 left-0 bg-amber-500 w-[18px] md:w-[32px] h-[45px] md:h-[100px] rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none">
                                <span className="[writing-mode:vertical-rl] rotate-180 text-[7px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] font-black text-neutral-950 whitespace-nowrap font-mono select-none">
                                    Model
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* SLIDER 3 HANDLE (Realism) */}
                    <div
                        className="absolute top-0 bottom-0 w-16 -ml-8 md:w-12 md:-ml-6 z-50 touch-none flex justify-center cursor-ew-resize group"
                        style={{ left: `${slider3}%` }}
                        onPointerDown={(e) => handlePointerDown(e, 3)}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                    >
                        {/* STATIC SOLID AMBER LINE */}
                        <div className="w-[3px] md:w-[4px] h-full bg-amber-500 relative">
                            <div className="absolute top-[84%] -translate-y-1/2 left-0 bg-amber-500 w-[18px] md:w-[32px] h-[45px] md:h-[100px] rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none">
                                <span className="[writing-mode:vertical-rl] rotate-180 text-[7px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] font-black text-neutral-950 whitespace-nowrap font-mono select-none">
                                    Realism
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MOBILE LANDSCAPE HINT */}
                <div className="md:hidden portrait:flex landscape:hidden items-center justify-center gap-2.5 mt-5 text-neutral-500 animate-pulse">
                    <Smartphone className="w-4 h-4 -rotate-90 transition-transform duration-1000" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Rotate device for landscape view</span>
                </div>

                {/* --- UPDATED LUXURY BOTTOM NAVIGATION --- */}
                <div className="flex justify-between items-center mt-8 md:mt-12 w-full max-w-4xl mx-auto px-4 sm:px-0">
                    <button
                        onClick={prevProcessProject}
                        className="group flex items-center justify-center gap-2 md:gap-4 px-5 py-3 md:px-8 md:py-4 border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 hover:border-amber-500 text-neutral-400 hover:text-amber-500 transition-all duration-300 font-sans text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] rounded-none"
                        aria-label="Previous Project"
                    >
                        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1.5 transition-transform" />
                        <span className="hidden sm:inline">Previous</span>
                    </button>

                    <div className="flex gap-3 md:gap-4">
                        {PROCESS_PROJECTS.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => { setActiveProcessProject(idx); setSlider1(25); setSlider2(50); setSlider3(75); }}
                                className={cn("h-1.5 md:h-2 rounded-none transition-all duration-300", activeProcessProject === idx ? "w-8 md:w-12 bg-amber-500" : "w-2 md:w-3 bg-neutral-700 hover:bg-neutral-500")}
                                aria-label={`Go to project ${idx + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextProcessProject}
                        className="group flex items-center justify-center gap-2 md:gap-4 px-5 py-3 md:px-8 md:py-4 border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 hover:border-amber-500 text-neutral-400 hover:text-amber-500 transition-all duration-300 font-sans text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] rounded-none"
                        aria-label="Next Project"
                    >
                        <span className="hidden sm:inline">Next</span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}