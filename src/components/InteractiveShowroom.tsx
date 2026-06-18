"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Box, Maximize, Shield, Zap, Check, Users } from 'lucide-react';

// --- UTILITY ---
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- ARCHITECTURAL SHOWROOM DATA ---
const SHOWROOM_MODELS = [
    {
        id: "modern-villa",
        tabLabel: "Modern Villa",
        title: "The Vertex Villa",
        description: "A high-efficiency luxury residential concept designed for optimal natural light and environmental integration.",
        embedUrl: "https://sketchfab.com/models/YOUR_MODEL_ID_1/embed?autostart=0&ui_controls=1&ui_infos=0&ui_watermark=0",
        specs: [
            { icon: <Maximize size={16} />, label: "Total Area", value: "4,500 Sq Ft" },
            { icon: <Box size={16} />, label: "Footprint", value: "120' x 85'" },
            { icon: <Shield size={16} />, label: "Configuration", value: "4 Bed / 5.5 Bath" },
            { icon: <Zap size={16} />, label: "Energy Rating", value: "LEED Platinum" },
        ],
        materials: [
            "Architectural-Grade Exposed Concrete",
            "Thermally Broken Aluminum Glazing",
            "Sustainable Teak Wood Cladding"
        ],
        targetMarket: "High-net-worth private clients and luxury vacation developers."
    },
    {
        id: "community-center",
        tabLabel: "Community Center",
        title: "Lumina Civic Hub",
        description: "A multi-use public facility engineered to accommodate high foot traffic while maintaining acoustic and spatial tranquility.",
        embedUrl: "https://sketchfab.com/models/YOUR_MODEL_ID_2/embed?autostart=0&ui_controls=1&ui_infos=0&ui_watermark=0",
        specs: [
            { icon: <Maximize size={16} />, label: "Total Area", value: "18,200 Sq Ft" },
            { icon: <Users size={16} />, label: "Capacity", value: "500+ Users" },
            { icon: <Box size={16} />, label: "Core Features", value: "Atrium, Flex-Spaces" },
            { icon: <Shield size={16} />, label: "Structural", value: "Long-span steel truss" },
        ],
        materials: [
            "Acoustic Timber Baffling",
            "High-Durability Terrazzo Flooring",
            "Polycarbonate Translucent Panels"
        ],
        targetMarket: "Municipalities, private endowments, and community developers."
    },
    {
        id: "townhome",
        tabLabel: "Townhome Concept",
        title: "Foundry Row",
        description: "A scalable, high-density residential unit designed for premium urban infill projects to maximize ROI per square foot.",
        embedUrl: "https://sketchfab.com/models/YOUR_MODEL_ID_3/embed?autostart=0&ui_controls=1&ui_infos=0&ui_watermark=0",
        specs: [
            { icon: <Maximize size={16} />, label: "Unit Area", value: "2,100 Sq Ft" },
            { icon: <Users size={16} />, label: "Density", value: "12 Units / Acre" },
            { icon: <Box size={16} />, label: "Levels", value: "3-Story Vertical" },
            { icon: <Shield size={16} />, label: "Parking", value: "Integrated 2-Car" },
        ],
        materials: [
            "Reclaimed Brick Veneer",
            "Matte Black Steel Accents",
            "Engineered Hardwood Intersect"
        ],
        targetMarket: "Urban residential developers and real estate investment trusts."
    }
];

// --- COMPONENT ---
export default function InteractiveShowroom() {
    const [activeModelIndex, setActiveModelIndex] = useState(0);

    return (
        <section id="showroom" className="py-16 md:py-32 px-5 md:px-12 bg-white relative border-b border-neutral-200">
            <div className="max-w-[1400px] mx-auto">

                {/* Section Title */}
                <div className="flex flex-col items-center text-center mb-8 md:mb-12">
                    <span className="text-amber-600 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-3 md:mb-4 block font-sans">
                        Interactive Showroom
                    </span>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-neutral-900 tracking-tight">
                        Explore Our Models.
                    </h2>
                </div>

                {/* Model Tabs Navigation (Using your awesome animated underline) */}
                <div className="flex justify-start md:justify-center items-center gap-4 md:gap-8 border-b border-neutral-200 mb-10 md:mb-16 overflow-x-auto no-scrollbar snap-x w-full px-4 relative hide-scrollbar">
                    {SHOWROOM_MODELS.map((model, idx) => (
                        <button
                            key={model.id}
                            onClick={(e) => {
                                setActiveModelIndex(idx);
                                e.currentTarget.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                            }}
                            className={cn(
                                "px-2 md:px-6 py-4 text-[10px] md:text-sm font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all duration-300 relative font-sans whitespace-nowrap snap-center",
                                activeModelIndex === idx ? "text-amber-600" : "text-neutral-400 hover:text-neutral-600"
                            )}
                        >
                            {model.tabLabel}
                            {activeModelIndex === idx && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-amber-600"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Showroom Display Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

                    {/* Left: 3D Embed Viewer */}
                    <div className="lg:col-span-7 relative group bg-neutral-100 rounded-sm overflow-hidden border border-neutral-200 shadow-xl">
                        <div className="relative w-full aspect-square md:aspect-[4/3] bg-neutral-950">
                            <iframe
                                key={SHOWROOM_MODELS[activeModelIndex].id}
                                title={SHOWROOM_MODELS[activeModelIndex].title}
                                className="absolute top-0 left-0 w-full h-full"
                                src={SHOWROOM_MODELS[activeModelIndex].embedUrl}
                                allow="autoplay; fullscreen; xr-spatial-tracking"
                                allowFullScreen
                            />
                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 md:px-4 py-1.5 md:py-2 rounded-sm text-[8px] md:text-[9px] uppercase tracking-widest font-bold pointer-events-none group-hover:opacity-0 transition-opacity duration-500 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-500 animate-pulse" />
                                Interact to Rotate
                            </div>
                        </div>
                    </div>

                    {/* Right: Model Info & Specs */}
                    <div className="lg:col-span-5 flex flex-col justify-center py-2 md:py-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={SHOWROOM_MODELS[activeModelIndex].id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="space-y-6 md:space-y-8"
                            >
                                {/* Title & Description */}
                                <div>
                                    <h3 className="font-serif text-2xl md:text-4xl text-neutral-900 mb-3 md:mb-4">
                                        {SHOWROOM_MODELS[activeModelIndex].title}
                                    </h3>
                                    <p className="text-neutral-500 font-light leading-relaxed text-xs md:text-base">
                                        {SHOWROOM_MODELS[activeModelIndex].description}
                                    </p>
                                </div>

                                {/* Specifications Grid (Your original layout) */}
                                <div className="space-y-3 md:space-y-4 pt-4 md:pt-6 border-t border-neutral-200">
                                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 mb-2">
                                        Specifications
                                    </h4>
                                    {SHOWROOM_MODELS[activeModelIndex].specs.map((spec, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 md:p-4 bg-[#F9F9F7] border border-neutral-200 rounded-sm hover:border-amber-900/30 transition-colors group">
                                            <div className="flex items-center gap-2 md:gap-3 text-neutral-500">
                                                <span className="text-amber-800/70 group-hover:text-amber-800 transition-colors scale-90 md:scale-100">
                                                    {spec.icon}
                                                </span>
                                                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold">
                                                    {spec.label}
                                                </span>
                                            </div>
                                            <span className="font-serif text-xs md:text-sm text-neutral-900 font-medium">
                                                {spec.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Materials List */}
                                <div className="pt-2">
                                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 mb-4 border-b border-neutral-200 pb-2">
                                        Key Materials
                                    </h4>
                                    <ul className="space-y-3">
                                        {SHOWROOM_MODELS[activeModelIndex].materials.map((mat, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-neutral-700 font-sans">
                                                <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                                                <span>{mat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Target Market */}
                                <div className="pt-2">
                                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 mb-2 border-b border-neutral-200 pb-2">
                                        Target Market
                                    </h4>
                                    <p className="text-sm text-neutral-700 font-sans font-medium">
                                        {SHOWROOM_MODELS[activeModelIndex].targetMarket}
                                    </p>
                                </div>

                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>

            {/* Custom CSS to hide scrollbar on the tabs while keeping it scrollable on mobile */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </section>
    );
}