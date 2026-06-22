'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const SERVICES_DATA = [
    {
        num: "01",
        title: "Land Planning & Masterplanning",
        items: [
            {
                name: "Site Analysis & Feasibility Studies",
                desc: "Evaluating site conditions, environmental factors, zoning regulations, and overall development potential."
            },
            {
                name: "Masterplanning",
                desc: "Developing comprehensive, macro-level spatial layouts and infrastructure flows for residential, commercial, and mixed-use developments."
            }
        ]
    },
    {
        num: "02",
        title: "Architectural Design & Technical Documentation",
        items: [
            {
                name: "Schematic Design & Concept Development",
                desc: "Creating the initial architectural concepts, spatial layouts, and exterior forms based on client requirements."
            },
            {
                name: "Design Development",
                desc: "Refining the initial concepts, selecting structural materials, and detailing the specific architectural elements."
            },
            {
                name: "Construction Documents (CDs)",
                desc: "Producing the comprehensive, finalized 2D technical drawings, plans, and specifications required for permitting and physical construction."
            },
            {
                name: "Construction Administration / Support",
                desc: "Providing ongoing technical support, reviewing submittals, and answering RFIs (Requests for Information) to ensure the physical build aligns with the architectural intent."
            }
        ]
    },
    {
        num: "03",
        title: "Cost Estimation & Budget Strategy",
        items: [
            {
                name: "Pre-Construction Cost Estimation",
                desc: "Forecasting material, labor, and execution costs during the early design phases to prevent future budget overruns."
            },
            {
                name: "Value Engineering",
                desc: "Analyzing design choices, structural systems, and material selections to optimize performance and aesthetics while strictly meeting financial constraints."
            }
        ]
    },
    {
        num: "04",
        title: "Architectural Visualization & Marketing Assets",
        items: [
            {
                name: "3D Architectural Rendering",
                desc: "Creating high-fidelity, photorealistic exterior and interior visualizations of the proposed design."
            },
            {
                name: "Interactive 3D Walkthroughs",
                desc: "Developing immersive digital models that allow developers and investors to experience the space prior to construction."
            },
            {
                name: "Marketing Asset Creation",
                desc: "Supplying high-end visual content specifically tailored for developer presentations, investor pitches, and pre-sales marketing campaigns."
            }
        ]
    }
];

export default function Services() {
    // Mobile Accordion State (Defaults to '0' so the first drawer is open on load!)
    const [openAccordion, setOpenAccordion] = useState<number | null>(0);

    const toggleAccordion = (idx: number) => {
        setOpenAccordion(openAccordion === idx ? null : idx);
    };

    return (
        <section id="services" className="py-20 md:py-36 px-5 md:px-12 bg-neutral-950 text-white relative border-t border-neutral-900">
            <div className="max-w-[1400px] mx-auto">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-28 border-b border-neutral-800 pb-8 md:pb-12 gap-6">
                    <div>
                        <span className="text-amber-500 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-3 md:mb-4 block font-sans">
                            Scope of Practice
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                            Disciplined Engineering.<br />Masterful Execution.
                        </h2>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-sm font-sans max-w-md leading-relaxed">
                        From the macro-geometry of a regional masterplan down to the micro-seam of a physical finish, our technical scope scales the entire lifecycle of the build.
                    </p>
                </div>

                {/* ========================================================= */}
                {/* ENGINE 1: DESKTOP WIDE LEDGER (Hidden on Mobile)          */}
                {/* ========================================================= */}
                <div className="hidden lg:block divide-y divide-neutral-800/80 border-b border-neutral-800/80">
                    {SERVICES_DATA.map((category, catIdx) => (
                        <motion.div
                            key={category.num}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                            className="py-20 grid grid-cols-12 gap-12 group transition-colors duration-500 hover:bg-neutral-900/20 -mx-12 px-12"
                        >
                            {/* Left Col: Giant Number & Main Title (5 cols) */}
                            <div className="col-span-5 flex flex-col justify-between pr-4">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-sm font-bold text-amber-500 tracking-[0.2em]">
                                        //{category.num}
                                    </span>
                                    <div className="h-[1px] w-8 bg-neutral-700 group-hover:w-16 group-hover:bg-amber-500 transition-all duration-500" />
                                </div>
                                <h3 className="font-serif text-4xl text-white group-hover:text-amber-400 transition-colors duration-300 leading-tight">
                                    {category.title}
                                </h3>
                            </div>

                            {/* Right Col: The Sub-deliverables Grid (7 cols) */}
                            <div className="col-span-7 grid grid-cols-2 gap-8">
                                {category.items.map((item, itemIdx) => {
                                    const isLastOddItem = (category.items.length % 2 !== 0) && (itemIdx === category.items.length - 1);
                                    return (
                                        <div
                                            key={item.name}
                                            className={cn(
                                                "flex flex-col border-l border-neutral-800/80 pl-5 transition-colors duration-300 hover:border-amber-500/70",
                                                isLastOddItem ? "col-span-2" : ""
                                            )}
                                        >
                                            <span className="text-white font-sans text-sm font-bold tracking-wide mb-2 flex items-center gap-2.5">
                                                <span className="w-1 h-1 bg-amber-500 shrink-0 block" />
                                                {item.name}
                                            </span>
                                            <p className="text-neutral-400 text-[13px] leading-relaxed font-sans pr-2">
                                                {item.desc}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>


                {/* ========================================================= */}
                {/* ENGINE 2: MOBILE SWISS ACCORDION (Hidden on Desktop)      */}
                {/* ========================================================= */}
                <div className="block lg:hidden divide-y divide-neutral-800/80 border-b border-neutral-800/80">
                    {SERVICES_DATA.map((category, idx) => {
                        const isOpen = openAccordion === idx;

                        return (
                            <div key={category.num} className="py-2">
                                {/* Drawer Header Button */}
                                <button
                                    onClick={() => toggleAccordion(idx)}
                                    className="w-full py-5 flex items-center justify-between text-left group select-none"
                                    aria-expanded={isOpen}
                                >
                                    <div className="flex items-center gap-3 pr-4">
                                        <span className="font-mono text-xs font-bold text-amber-500 tracking-[0.15em] shrink-0">
                                            //{category.num}
                                        </span>
                                        <span className={cn(
                                            "font-serif text-lg sm:text-xl transition-colors duration-300 leading-snug",
                                            isOpen ? "text-amber-400" : "text-white group-hover:text-neutral-300"
                                        )}>
                                            {category.title}
                                        </span>
                                    </div>

                                    {/* Swiss Monospace Toggle Icon */}
                                    <span className={cn(
                                        "font-mono text-xs tracking-tighter shrink-0 transition-colors duration-300",
                                        isOpen ? "text-amber-500 font-bold" : "text-neutral-600"
                                    )}>
                                        {isOpen ? "[ — ]" : "[ + ]"}
                                    </span>
                                </button>

                                {/* Expanding Drawer Content */}
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-8 pt-2 pl-4 border-l border-neutral-800 ml-3 space-y-6">
                                                {category.items.map((item) => (
                                                    <div key={item.name} className="space-y-1.5 pr-2">
                                                        <span className="text-white font-sans text-xs font-bold tracking-wide flex items-center gap-2">
                                                            <span className="w-1 h-1 bg-amber-500 shrink-0 block" />
                                                            {item.name}
                                                        </span>
                                                        <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Footer wire */}
                <div className="mt-10 md:mt-12 flex justify-between items-center text-[9px] md:text-[10px] font-mono text-neutral-500 uppercase tracking-[0.2em]">
                    <span>[ End of Scope ]</span>
                    <span>SYS.REV // 2026</span>
                </div>

            </div>
        </section>
    );
}