'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, ArrowRight, Layers,
    Maximize, Target, MapPin, Building2, Home, Box, X, Menu
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// --- UTILITIES ---
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

// --- CONFIG & ASSETS ---
const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/skylinedb3-e8295.firebasestorage.app/o/Logo%2FSBD.png?alt=media&token=f5776d7f-6da0-447b-a4ee-36d13c24dc73";
const SUPPORT_NUMBER_DIGITS = "2052351664";
const SUPPORT_NUMBER_FORMATTED = "(205) 235-1664";
const SMS_BODY_MSG = "Hello Skyline Team, I am interested in commissioning an architectural evaluation.";
const SMS_LINK = `sms:+1${SUPPORT_NUMBER_DIGITS}?body=${encodeURIComponent(SMS_BODY_MSG)}`;

// --- DATA ARRAYS ---
const HERO_SLIDES = [
    { id: 1, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2500&auto=format&fit=crop", title: "Foundry55: Industrial Living", description: "Master-planned residential sector. Integrated architectural engineering guaranteeing structural vision and ROI integrity from foundation to occupancy." },
    { id: 2, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop", title: "The Apex Commercial Hub", description: "A structural monolith designed for immediate market readiness, minimizing operational friction for premium corporate tenants." },
    { id: 3, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2500&auto=format&fit=crop", title: "Lumina Cultural Center", description: "Civic architecture engineered to anchor community development while maintaining strict fiscal parameters and maximum spatial yield." }
];

const SHOWROOM_MODELS = [
    { id: "villa", tabLabel: "Modern Villa", title: "Vanguard Private Residence", embedUrl: "https://sketchfab.com/models/4a10fb417eb74e92be96180aee1b9338/embed?autostart=0&ui_theme=dark&dnt=1", description: "A cantilevered structural marvel optimized for severe coastal topography. Designed to maximize panoramic light capture while minimizing foundation footprint.", specs: [{ icon: <Maximize className="w-4 h-4" />, label: "Gross Floor Area", value: "8,500 Sq Ft" }, { icon: <Layers className="w-4 h-4" />, label: "Core Material", value: "Board-Formed Concrete" }, { icon: <Target className="w-4 h-4" />, label: "Target Market", value: "Ultra-HNW Residential" }] },
    { id: "community", tabLabel: "Community Center", title: "Echo Civic Hub", embedUrl: "https://sketchfab.com/models/23118fa1b43949f5a5078dbb4c6e00b8/embed?autostart=0&ui_theme=dark&dnt=1", description: "Scalable municipal framework utilizing modular timber cross-laminates. Accelerates public sector delivery timelines by 40%.", specs: [{ icon: <Maximize className="w-4 h-4" />, label: "Gross Floor Area", value: "24,000 Sq Ft" }, { icon: <Layers className="w-4 h-4" />, label: "Core Material", value: "Cross-Laminated Timber (CLT)" }, { icon: <Target className="w-4 h-4" />, label: "Target Market", value: "Municipal / Public Sector" }] },
    { id: "townhome", tabLabel: "Townhome Concept", title: "Meridian Multi-Family", embedUrl: "https://sketchfab.com/models/7dd66c4217114bd5ab9ee7e28afed36d/embed?autostart=0&ui_theme=dark&dnt=1", description: "High-density horizontal living. The structural grid eliminates internal load-bearing walls, allowing developers fluid spatial re-allocation.", specs: [{ icon: <Maximize className="w-4 h-4" />, label: "Density", value: "12 Units / Acre" }, { icon: <Layers className="w-4 h-4" />, label: "Core Material", value: "Steel Frame & Glass" }, { icon: <Target className="w-4 h-4" />, label: "Target Market", value: "Premium Build-to-Rent" }] }
];

const PROCESS_PROJECTS = [
    { id: "residential", title: "Verde Private Estate", category: "Residential Architecture", stages: [{ name: "Consultation", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2500&auto=format&fit=crop" }, { name: "Sketch", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2500&auto=format&fit=crop" }, { name: "2D Plan", image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34d?q=80&w=2500&auto=format&fit=crop" }, { name: "3D Model", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop&grayscale=1" }, { name: "Final Render", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2500&auto=format&fit=crop" }] },
    { id: "commercial", title: "The Apex Hub", category: "Commercial Real Estate", stages: [{ name: "Sketch", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2500&auto=format&fit=crop" }, { name: "3D Model", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop&grayscale=1" }, { name: "Final Render", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop" }, { name: "Construction Doc", image: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34d?q=80&w=2500&auto=format&fit=crop" }] },
    { id: "masterplan", title: "Foundry55 Sector", category: "Masterplan Development", stages: [{ name: "Concept", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2500&auto=format&fit=crop" }, { name: "3D Model", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2500&auto=format&fit=crop&grayscale=1" }, { name: "Render", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2500&auto=format&fit=crop" }, { name: "Marketing Content", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2500&auto=format&fit=crop" }] }
];

const SERVICES = [
    { title: "Land Planning", icon: <MapPin className="w-6 h-6 stroke-[1.2]" />, description: "Strategic terrain evaluation and zoning optimization designed to guarantee maximum parcel yield and regulatory compliance." },
    { title: "Masterplanning", icon: <Building2 className="w-6 h-6 stroke-[1.2]" />, description: "Comprehensive urban and sector frameworks seamlessly integrating infrastructure, commerce, and public transit corridors." },
    { title: "Community Development", icon: <Home className="w-6 h-6 stroke-[1.2]" />, description: "Scalable residential living solutions balancing high-density fiscal requirements with premium spatial quality." },
    { title: "3D Visualization", icon: <Box className="w-6 h-6 stroke-[1.2]" />, description: "Photorealistic spatial rendering and real-time structural interaction, allowing exact verification prior to execution." }
];

const TEAM = [
    { name: "Ashif Jahan", title: "Chief Executive Officer", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1200&auto=format&fit=crop", bio: "Guiding the firm's strategic vision and ensuring global structural investments meet exact developmental thresholds." },
    { name: "Jeff Blackledge", title: "Senior Architect", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop", bio: "Mastering the intersection of structural physics and aesthetic form to deliver uncompromising, landmark environments." },
    { name: "Core Support Team", title: "Spatial Engineering & Delivery", image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1200&auto=format&fit=crop", bio: "A multi-disciplinary unit executing complex architectural masterplans with absolute precision and zero variance." }
];

// --- SUB-COMPONENTS ---
const MessageBubbleIcon = ({ className }: { className?: string }) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
    </svg>
);

function FloatingInquiriesButton() {
    return (
        <div className="fixed bottom-6 right-4 md:bottom-8 md:right-6 z-[60] group">
            <div className="absolute bottom-3 right-16 bg-[#F9F9F7] text-amber-900 text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded-sm border border-amber-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl font-sans hidden md:block">
                Private Client Desk
            </div>
            <a
                href={SMS_LINK}
                className={cn(
                    "relative flex items-center justify-center h-14 w-14 md:w-auto md:px-5 rounded-full md:gap-3.5 transition-all duration-500 ease-out",
                    "bg-[#F9F9F7] backdrop-blur-md border border-neutral-200",
                    "shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
                    "hover:scale-105 hover:border-amber-600/50 hover:shadow-[0_0_30px_rgba(217,119,6,0.2)]",
                    "active:scale-95"
                )}
                aria-label="Private Client Advisory via SMS"
            >
                <span className="absolute top-0 right-0 md:right-2 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-600 border-2 border-[#F9F9F7]"></span>
                </span>
                <MessageBubbleIcon className="w-6 h-6 text-neutral-900 group-hover:text-amber-800 transition-colors duration-300 shrink-0" />
                <div className="hidden md:flex flex-col text-left border-l border-neutral-200 pl-3.5 py-0.5">
                    <span className="text-[8px] uppercase tracking-[0.25em] text-neutral-400 font-bold font-sans leading-tight">Client Advisory (SMS)</span>
                    <span className="text-xs font-mono tracking-wider text-neutral-900 group-hover:text-amber-900 transition-colors font-medium">{SUPPORT_NUMBER_FORMATTED}</span>
                </div>
            </a>
        </div>
    );
}

// --- MAIN PAGE COMPONENT ---
export default function SkylineClientPage() {
    // State Hooks
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [activeModelIndex, setActiveModelIndex] = useState(0);
    const [activeProcessProject, setActiveProcessProject] = useState(0);
    const [activeStage, setActiveStage] = useState(0);

    // UI States
    const [showUpdateBanner, setShowUpdateBanner] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Section 1: Auto-play logic
    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(() => setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1)), 7000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, currentSlide]);

    const nextSlide = useCallback(() => {
        setIsAutoPlaying(false);
        setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, []);

    const prevSlide = useCallback(() => {
        setIsAutoPlaying(false);
        setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, []);

    const goToSlide = (index: number) => {
        setIsAutoPlaying(false);
        setCurrentSlide(index);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    // Reset process stages on project switch
    useEffect(() => {
        setActiveStage(0);
    }, [activeProcessProject]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [isMobileMenuOpen]);

    return (
        <div className="bg-[#F9F9F7] text-neutral-900 min-h-screen overflow-x-hidden font-sans m-0 p-0 selection:bg-amber-100 selection:text-amber-900 relative">

            <FloatingInquiriesButton />

            {/* FLOATING SYSTEM UPDATE BANNER */}
            <AnimatePresence>
                {showUpdateBanner && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed top-24 md:top-auto md:bottom-6 left-1/2 -translate-x-1/2 z-[55] w-max max-w-[90vw]"
                    >
                        <div className="bg-neutral-950/90 backdrop-blur-md border border-amber-900/30 text-white px-4 md:px-5 py-2.5 md:py-3 rounded-sm shadow-2xl flex items-center gap-4 md:gap-6">
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-2 w-2 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                </span>
                                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold font-sans">
                                    Live Website Updates in Progress
                                </span>
                            </div>
                            <button onClick={() => setShowUpdateBanner(false)} className="text-neutral-500 hover:text-white transition-colors shrink-0" aria-label="Dismiss banner">
                                <X className="w-4 h-4" strokeWidth={2} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* GLOBAL NAVIGATION */}
            <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent pt-4 md:pt-6 pb-12 px-5 md:px-12 flex justify-between items-center pointer-events-none">
                <div className="flex items-center gap-4 pointer-events-auto">
                    <div className="relative w-28 h-8 md:w-48 md:h-14">
                        {/* Logo with filters removed so original colors display */}
                        <Image src={LOGO_URL} alt="Skyline Architects" fill className="object-contain object-left opacity-95" priority sizes="(max-width: 768px) 120px, 200px" />
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] font-medium text-white/90 pointer-events-auto">
                    <a href="#showroom" className="hover:text-amber-400 transition-colors">Showroom</a>
                    <a href="#process" className="hover:text-amber-400 transition-colors">Process</a>
                    <a href="#services" className="hover:text-amber-400 transition-colors">Services</a>
                    <a href="#team" className="hover:text-amber-400 transition-colors">Team</a>
                    <a href="#contact" className="text-amber-400 hover:text-white transition-colors font-bold">Connect</a>
                </nav>

                <button className="md:hidden pointer-events-auto text-white p-2" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open Menu">
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            {/* MOBILE FULLSCREEN MENU OVERLAY */}
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
                            <a href="#showroom" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500 transition-colors">Interactive Showroom</a>
                            <a href="#process" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500 transition-colors">Execution Matrix</a>
                            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500 transition-colors">Disciplines</a>
                            <a href="#team" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500 transition-colors">Leadership</a>
                            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-amber-500 font-bold mt-4">Connect with Firm</a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SECTION 1: HERO SHOWCASE SLIDER */}
            <section id="projects" className="relative w-full h-[100svh] overflow-hidden bg-black">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 z-0"
                    >
                        <div className="absolute inset-0 bg-black/30 md:bg-black/20 z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:from-black/90 md:via-black/20 z-10" />
                        <Image src={HERO_SLIDES[currentSlide].image} alt={HERO_SLIDES[currentSlide].title} fill priority className="object-cover object-center" sizes="100vw" />
                    </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 w-full z-20 pb-16 md:pb-20 px-5 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
                    <div className="max-w-2xl text-left overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div key={currentSlide} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>
                                <span className="text-amber-500 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-3 md:mb-4 block font-sans">
                                    0{currentSlide + 1} // Featured Work
                                </span>
                                <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-3 md:mb-4 tracking-tight pr-4 md:pr-0">
                                    {HERO_SLIDES[currentSlide].title}
                                </h1>
                                <p className="text-neutral-300 font-light text-xs md:text-base leading-relaxed max-w-xl border-l border-white/20 pl-4 font-sans">
                                    {HERO_SLIDES[currentSlide].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-end gap-6 shrink-0 w-full md:w-auto">
                        <div className="flex items-center gap-2 md:gap-3">
                            {HERO_SLIDES.map((_, idx) => (
                                <button key={idx} onClick={() => goToSlide(idx)} className="group py-2 md:px-1" aria-label={`Go to slide ${idx + 1}`}>
                                    <div className={cn("h-[2px] transition-all duration-500 rounded-full", currentSlide === idx ? "w-6 md:w-8 bg-amber-500" : "w-3 md:w-4 bg-white/30 group-hover:bg-white/60 group-hover:w-5 md:group-hover:w-6")} />
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={prevSlide} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 ml-[-2px]" strokeWidth={1.5} />
                            </button>
                            <button onClick={nextSlide} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 mr-[-2px]" strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: INTERACTIVE SHOWROOM */}
            <section id="showroom" className="py-16 md:py-40 px-5 md:px-12 bg-white relative border-b border-neutral-200">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 mb-8 md:mb-16">
                        <div>
                            <span className="text-amber-800 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-3 md:mb-4 block font-sans">
                                Interactive Showroom
                            </span>
                            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-neutral-900 tracking-tight">
                                Structural Prototyping.
                            </h2>
                        </div>

                        <div className="flex items-center gap-1 md:gap-4 border-b border-neutral-200 pb-[-1px] overflow-x-auto no-scrollbar snap-x">
                            {SHOWROOM_MODELS.map((model, idx) => (
                                <button
                                    key={model.id}
                                    onClick={() => setActiveModelIndex(idx)}
                                    className={cn(
                                        "px-3 md:px-4 py-3 text-[9px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all duration-300 relative font-sans whitespace-nowrap snap-start",
                                        activeModelIndex === idx ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"
                                    )}
                                >
                                    {model.tabLabel}
                                    {activeModelIndex === idx && (
                                        <motion.div layoutId="activeTabIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-800" initial={false} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                        <div className="lg:col-span-8 relative group bg-neutral-100 rounded-sm overflow-hidden border border-neutral-200 shadow-xl">
                            <div className="relative w-full aspect-square md:aspect-video bg-neutral-950">
                                <iframe key={SHOWROOM_MODELS[activeModelIndex].id} title={SHOWROOM_MODELS[activeModelIndex].title} className="absolute top-0 left-0 w-full h-full" src={SHOWROOM_MODELS[activeModelIndex].embedUrl} allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen />
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 md:px-4 py-1.5 md:py-2 rounded-sm text-[8px] md:text-[9px] uppercase tracking-widest font-bold pointer-events-none group-hover:opacity-0 transition-opacity duration-500 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-500 animate-pulse" />
                                    Interact to Rotate
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 flex flex-col justify-center py-2 md:py-6">
                            <AnimatePresence mode="wait">
                                <motion.div key={SHOWROOM_MODELS[activeModelIndex].id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5, ease: "easeOut" }} className="space-y-6 md:space-y-8">
                                    <div>
                                        <h3 className="font-serif text-2xl md:text-4xl text-neutral-900 mb-3 md:mb-4">{SHOWROOM_MODELS[activeModelIndex].title}</h3>
                                        <p className="text-neutral-500 font-light leading-relaxed text-xs md:text-base">{SHOWROOM_MODELS[activeModelIndex].description}</p>
                                    </div>
                                    <div className="space-y-3 md:space-y-4 pt-4 md:pt-6 border-t border-neutral-200">
                                        {SHOWROOM_MODELS[activeModelIndex].specs.map((spec, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 md:p-4 bg-[#F9F9F7] border border-neutral-200 rounded-sm hover:border-amber-900/30 transition-colors group">
                                                <div className="flex items-center gap-2 md:gap-3 text-neutral-500">
                                                    <span className="text-amber-800/70 group-hover:text-amber-800 transition-colors scale-90 md:scale-100">{spec.icon}</span>
                                                    <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold">{spec.label}</span>
                                                </div>
                                                <span className="font-serif text-xs md:text-sm text-neutral-900 font-medium">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: VISION TO REALITY */}
            <section id="process" className="py-16 md:py-40 px-5 md:px-12 bg-neutral-950 text-white relative">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-8 md:mb-12">
                        <div>
                            <span className="text-amber-500 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-3 md:mb-4 block font-sans">
                                Execution Matrix
                            </span>
                            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-tight">
                                Vision to Reality.
                            </h2>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {PROCESS_PROJECTS.map((project, idx) => (
                                <button
                                    key={project.id}
                                    onClick={() => setActiveProcessProject(idx)}
                                    className={cn(
                                        "px-3 md:px-4 py-2 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] border transition-all duration-300 rounded-sm font-sans flex-grow md:flex-grow-0",
                                        activeProcessProject === idx ? "border-amber-500 bg-amber-500/10 text-amber-400" : "border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300"
                                    )}
                                >
                                    {project.category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[21/9] bg-neutral-900 rounded-sm overflow-hidden border border-neutral-800 shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div key={`${activeProcessProject}-${activeStage}`} initial={{ opacity: 0, filter: "blur(10px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="absolute inset-0">
                                <Image src={PROCESS_PROJECTS[activeProcessProject].stages[activeStage].image} alt={PROCESS_PROJECTS[activeProcessProject].stages[activeStage].name} fill className="object-cover object-center opacity-80" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 md:to-black/10" />
                            </motion.div>
                        </AnimatePresence>

                        <div className="absolute top-6 left-5 md:top-10 md:left-10 z-20">
                            <h3 className="font-serif text-xl md:text-4xl text-white drop-shadow-lg">{PROCESS_PROJECTS[activeProcessProject].title}</h3>
                            <p className="text-amber-500 text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold mt-1.5 md:mt-2">Stage: {PROCESS_PROJECTS[activeProcessProject].stages[activeStage].name}</p>
                        </div>

                        <div className="absolute bottom-6 md:bottom-8 left-0 w-full px-4 md:px-16 z-30">
                            <div className="relative w-full h-12 flex items-center">
                                <div className="absolute left-0 w-full h-[1px] bg-neutral-700" />
                                <motion.div
                                    className="absolute top-0 bottom-0 w-[2px] bg-amber-500 z-10 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                                    animate={{ left: `${(activeStage / (PROCESS_PROJECTS[activeProcessProject].stages.length - 1)) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                />
                                <div className="absolute w-full flex justify-between items-center z-20">
                                    {PROCESS_PROJECTS[activeProcessProject].stages.map((stage, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveStage(idx)}
                                            className="group relative flex flex-col items-center justify-center w-10 h-10 md:w-8 md:h-8 focus:outline-none"
                                            aria-label={`View stage: ${stage.name}`}
                                        >
                                            <div className={cn("w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300", activeStage >= idx ? "bg-amber-500 scale-125" : "bg-neutral-600 group-hover:bg-neutral-400 group-hover:scale-110")} />
                                            <span className={cn(
                                                "absolute whitespace-nowrap text-[7px] md:text-[9px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold transition-all duration-300",
                                                idx % 2 === 0 ? "top-8" : "bottom-8 md:top-8",
                                                activeStage === idx ? "text-amber-400 opacity-100" : "text-neutral-500 opacity-0 md:group-hover:opacity-100"
                                            )}>
                                                {stage.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: SERVICES OVERVIEW */}
            <section id="services" className="py-16 md:py-40 px-5 md:px-12 bg-[#F4F4F2] border-t border-neutral-200">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-left md:text-center mb-10 md:mb-24">
                        <span className="text-amber-800 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-3 md:mb-4 block font-sans">
                            Core Competencies
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-neutral-900 tracking-tight">
                            Architectural Disciplines.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {SERVICES.map((service, idx) => (
                            <div key={idx} className="group bg-white border border-neutral-200 p-6 md:p-8 hover:border-amber-900/30 transition-all duration-500 flex flex-col h-full rounded-sm">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F9F9F7] border border-neutral-200 rounded-sm flex items-center justify-center text-amber-800 mb-6 md:mb-8 group-hover:scale-110 group-hover:bg-amber-50 transition-all duration-500">
                                    {service.icon}
                                </div>
                                <h3 className="font-serif text-lg md:text-2xl text-neutral-900 mb-3 md:mb-4 group-hover:text-amber-900 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-neutral-500 text-xs md:text-sm font-light leading-relaxed font-sans flex-grow">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 5: THE TEAM */}
            <section id="team" className="py-16 md:py-40 px-5 md:px-12 bg-white border-t border-neutral-200 relative">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 mb-10 md:mb-24">
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
                                <div className="relative w-full aspect-square md:aspect-[3/4] mb-4 md:mb-6 overflow-hidden bg-neutral-100 rounded-sm">
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

            {/* RESTORED LUXURY FOOTER */}
            <footer id="contact" className="py-20 md:py-40 px-5 md:px-6 bg-white border-t border-neutral-200 relative z-10 text-center">
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
                        <a href="mailto:skylinedb3.team@gmail.com" className="w-full block border border-neutral-200 text-neutral-800 py-4 md:py-5 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] hover:border-neutral-900 transition-colors font-sans rounded-sm md:rounded-none">
                            Direct Dispatch
                        </a>
                    </div>

                    <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-neutral-100 text-neutral-400 space-y-5 font-sans">
                        <div className="flex items-center justify-center gap-1.5 md:gap-2 text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em]">
                            <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 text-neutral-600 shrink-0" />
                            <span>3622 Central Ave, Memphis, TN</span>
                        </div>

                        <div className="space-y-1.5 md:space-y-2 pt-1 md:pt-2">
                            <span className="font-serif text-xs md:text-sm tracking-[0.3em] md:tracking-[0.4em] text-neutral-900 block uppercase">
                                Skyline Architects
                            </span>
                            <div className="flex items-center justify-center gap-2 md:gap-3 text-[8px] md:text-[9px] tracking-[0.2em] md:tracking-[0.3em] uppercase text-neutral-400">
                                <span className="h-[1px] w-4 md:w-6 bg-neutral-200"></span>
                                <span>A <strong className="text-amber-900 font-normal">GrowShare Capital</strong> Company</span>
                                <span className="h-[1px] w-4 md:w-6 bg-neutral-200"></span>
                            </div>
                        </div>

                        <span className="block text-[7px] md:text-[8px] tracking-widest text-neutral-300 uppercase">
                            © {new Date().getFullYear()} Skyline Design + Build. All Planes Reserved.
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}