'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, Box, Layout, Zap, Shield } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILITY ---
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- DATA ---
const SHOWROOM_MODELS = [
    {
        id: "vertex-villa",
        title: "The Vertex Villa",
        description: "A high-efficiency luxury residential concept designed for optimal natural light and environmental integration.",
        embedUrl: "https://sketchfab.com/models/4a10fa408b044d039750fb4662d001eb/embed?autostart=1&ui_theme=dark",
        specs: [
            { label: "Total Area", value: "4,500 Sq Ft", icon: <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
            { label: "Footprint", value: "120' x 85'", icon: <Box className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
            { label: "Configuration", value: "4 Bed / 5.5 Bath", icon: <Layout className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
            { label: "Energy Rating", value: "LEED Platinum", icon: <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> }
        ]
    },
    {
        id: "apex-commercial",
        title: "Apex Commercial",
        description: "A mid-rise commercial hub engineered for premium corporate tenants with open-span floorplates.",
        embedUrl: "https://sketchfab.com/models/80cbf376f9ef4abdaec5dcc32b6b5d6e/embed?autostart=0&ui_theme=dark",
        specs: [
            { label: "Total Area", value: "12,000 Sq Ft", icon: <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
            { label: "Floors", value: "6 Levels", icon: <Layout className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
            { label: "Zoning", value: "Mixed-Use Commercial", icon: <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
            { label: "Energy Rating", value: "LEED Gold", icon: <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> }
        ]
    }
];

export default function InteractiveShowroom() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeModel = SHOWROOM_MODELS[activeIndex];

    return (
        <section id="showroom" className="py-16 md:py-36 px-5 md:px-12 bg-[#F9F9F7] text-neutral-900 relative border-t border-neutral-200">
            <div className="max-w-[1400px] mx-auto">

                {/* HUGE EDITORIAL HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-8">
                    <div className="max-w-4xl">
                        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-neutral-900 tracking-tighter leading-[0.95] md:leading-[0.9] uppercase">
                            Interactive <br />
                            <span className="text-neutral-400">Showroom.</span>
                        </h2>
                    </div>

                    {/* Model Selector Tabs - App-Style segmented controls on mobile */}
                    <div className="flex w-full sm:w-max bg-neutral-200/50 p-1 rounded-sm shrink-0">
                        {SHOWROOM_MODELS.map((model, idx) => (
                            <button
                                key={model.id}
                                onClick={() => setActiveIndex(idx)}
                                className={cn(
                                    "flex-1 sm:flex-none px-3 sm:px-5 py-3 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-all duration-300 rounded-sm font-sans whitespace-nowrap",
                                    activeIndex === idx
                                        ? "bg-white text-amber-900 shadow-md"
                                        : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200"
                                )}
                            >
                                {model.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Grid - items-center ensures perfect vertical balancing */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">

                    {/* LEFT: 3D Viewer (Spans 7 cols) */}
                    <div className="lg:col-span-7 w-full">
                        <div className="relative w-full aspect-square md:aspect-[4/3] bg-neutral-900 rounded-none overflow-hidden shadow-2xl border border-neutral-200/50">
                            {/* Loading Placeholder */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 z-0">
                                <span className="relative flex h-3 w-3 mb-4">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                                </span>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-center px-4">Initialising 3D Module...</span>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.iframe
                                    key={activeModel.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    title={activeModel.title}
                                    className="absolute inset-0 w-full h-full z-10 border-0"
                                    src={activeModel.embedUrl}
                                    allow="autoplay; fullscreen; vr"
                                />
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* RIGHT: Specifications Data (Spans 5 cols) */}
                    <div className="lg:col-span-5 flex flex-col pt-4 lg:pt-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeModel.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col"
                            >
                                <div className="mb-8">
                                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 mb-4 sm:mb-5 leading-tight tracking-tight">
                                        {activeModel.title}
                                    </h3>
                                    <p className="text-neutral-500 text-sm md:text-lg font-sans leading-relaxed border-l-2 border-amber-500 pl-4 sm:pl-6">
                                        {activeModel.description}
                                    </p>
                                </div>

                                {/* Specifications Table */}
                                <div>
                                    <span className="text-[9px] md:text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-5 block font-sans">
                                        Core Specifications
                                    </span>
                                    <div className="flex flex-col space-y-2 sm:space-y-3">
                                        {activeModel.specs.map((spec, i) => (
                                            <div key={i} className="flex items-center justify-between border border-neutral-200 bg-white px-4 py-3 sm:px-6 sm:py-5 hover:border-amber-900/40 transition-all duration-300 shadow-sm hover:shadow-md">
                                                <div className="flex items-center gap-3 sm:gap-4 text-amber-800 shrink-0 pr-4">
                                                    <div className="p-1.5 sm:p-2 bg-amber-50 rounded-sm">
                                                        {spec.icon}
                                                    </div>
                                                    <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] text-neutral-600 font-sans">
                                                        {spec.label}
                                                    </span>
                                                </div>
                                                <span className="text-[11px] sm:text-xs md:text-base font-medium text-neutral-900 font-serif text-right break-words">
                                                    {spec.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}