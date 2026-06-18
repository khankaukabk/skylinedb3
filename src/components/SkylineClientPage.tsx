'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, ArrowRight, MapPin, Building2, Home, Box, X, Menu
} from 'lucide-react';
import Image from 'next/image';

// --- UTILITIES ---
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

// --- CONFIG & ASSETS ---
const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/skylinedb3-e8295.firebasestorage.app/o/Logo%2FSBD.png?alt=media&token=f5776d7f-6da0-447b-a4ee-36d13c24dc73";
const SUPPORT_NUMBER_DIGITS = "2052351664";
const SUPPORT_NUMBER_FORMATTED = "(205) 235-1664";
const SMS_BODY_MSG = "Hello SkylineDB3 Team, I am interested in commissioning an architectural evaluation.";
const SMS_LINK = `sms:+1${SUPPORT_NUMBER_DIGITS}?body=${encodeURIComponent(SMS_BODY_MSG)}`;

// --- DATA ARRAYS ---
const HERO_SLIDES = [
    { id: 1, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2500&auto=format&fit=crop", title: "Foundry55: Industrial Living", description: "Master-planned residential sector. Integrated architectural engineering guaranteeing structural vision and ROI integrity from foundation to occupancy." },
    { id: 2, image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop", title: "The Apex Commercial Hub", description: "A structural monolith designed for immediate market readiness, minimizing operational friction for premium corporate tenants." },
    { id: 3, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2500&auto=format&fit=crop", title: "Lumina Cultural Center", description: "Civic architecture engineered to anchor community development while maintaining strict fiscal parameters and maximum spatial yield." }
];

const PROCESS_PROJECTS = [
    {
        id: "residential",
        title: "Verde Private Estate",
        category: "Residential Architecture",
        img1: { label: "Architectural Sketch", url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2500&auto=format&fit=crop" },
        img2: { label: "3D Massing Model", url: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop&grayscale=1" },
        img3: { label: "Final Render", url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2500&auto=format&fit=crop" }
    },
    {
        id: "commercial",
        title: "The Apex Hub",
        category: "Commercial Real Estate",
        img1: { label: "Site Context", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop&grayscale=1" },
        img2: { label: "Structural Framework", url: "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34d?q=80&w=2500&auto=format&fit=crop" },
        img3: { label: "Market Ready Render", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop" }
    },
    {
        id: "masterplan",
        title: "Foundry55 Sector",
        category: "Masterplan Development",
        img1: { label: "Zoning Concept", url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2500&auto=format&fit=crop" },
        img2: { label: "3D Sector Map", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2500&auto=format&fit=crop&grayscale=1" },
        img3: { label: "Completed Sector", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2500&auto=format&fit=crop" }
    }
];

const SHOWROOM_ITEMS = [
    { id: 'ext', title: "Exterior Facade", description: "Thermally broken structural glazing with automated environmental shading.", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2500&auto=format&fit=crop" },
    { id: 'int', title: "Lobby Atrium", description: "Triple-height structural volumes engineered to optimize pedestrian flow and acoustic damping.", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2500&auto=format&fit=crop" },
    { id: 'ame', title: "Sky Terrace", description: "Cantilevered observation zones maximizing structural load efficiency and tenant ROI.", url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2500&auto=format&fit=crop" }
];

const SERVICES = [
    { title: "Land Planning", icon: <MapPin className="w-6 h-6 stroke-[1.2]" />, description: "Strategic terrain evaluation and zoning optimization designed to guarantee maximum parcel yield and regulatory compliance." },
    { title: "Masterplanning", icon: <Building2 className="w-6 h-6 stroke-[1.2]" />, description: "Comprehensive urban and sector frameworks seamlessly integrating infrastructure, commerce, and public transit corridors." },
    { title: "Community Development", icon: <Home className="w-6 h-6 stroke-[1.2]" />, description: "Scalable residential living solutions balancing high-density fiscal requirements with premium spatial quality." },
    { title: "3D Visualization", icon: <Box className="w-6 h-6 stroke-[1.2]" />, description: "Photorealistic spatial rendering and real-time structural interaction, allowing exact verification prior to execution." }
];

const NAV_LINKS = [
    { label: "Home", href: "#hero" },
    { label: "Process", href: "#process" },
    { label: "Services", href: "#services" },
    { label: "Team", href: "#team" },
    { label: "Connect", href: "#contact" }
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
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // TRIPLE SLIDER STATE
    const [activeProcessProject, setActiveProcessProject] = useState(0);
    const [slider1, setSlider1] = useState(33);
    const [slider2, setSlider2] = useState(66);
    const sliderContainerRef = useRef<HTMLDivElement>(null);
    const [draggingSlider, setDraggingSlider] = useState<1 | 2 | null>(null);

    // SHOWROOM STATE
    const [activeShowroom, setActiveShowroom] = useState(0);

    const [showUpdateBanner, setShowUpdateBanner] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const nextProcessProject = useCallback(() => {
        setActiveProcessProject((prev) => (prev === PROCESS_PROJECTS.length - 1 ? 0 : prev + 1));
        setSlider1(33); setSlider2(66);
    }, []);

    const prevProcessProject = useCallback(() => {
        setActiveProcessProject((prev) => (prev === 0 ? PROCESS_PROJECTS.length - 1 : prev - 1));
        setSlider1(33); setSlider2(66);
    }, []);

    // CUSTOM SLIDER LOGIC
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, sliderNum: 1 | 2) => {
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
            // If dragging slider 1 past slider 2, push slider 2 along with it
            if (newPercent > slider2) {
                setSlider2(newPercent);
            }
        } else if (draggingSlider === 2) {
            setSlider2(newPercent);
            // If dragging slider 2 past slider 1, push slider 1 along with it
            if (newPercent < slider1) {
                setSlider1(newPercent);
            }
        }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        setDraggingSlider(null);
    };

    useEffect(() => {
        if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [isMobileMenuOpen]);

    return (
        <div className="bg-[#F9F9F7] text-neutral-900 min-h-screen overflow-x-hidden font-sans m-0 p-0 selection:bg-amber-100 selection:text-amber-900 relative">

            <FloatingInquiriesButton />

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

            {/* HEADER NAVIGATION */}
            <header className="fixed top-0 left-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/10 py-4 px-5 md:px-12 flex justify-between items-center transition-all duration-300">
                <div className="flex items-center gap-4 pointer-events-auto">
                    <a href="#hero">
                        <div className="relative w-28 h-8 md:w-48 md:h-12 hover:opacity-80 transition-opacity">
                            <Image src={LOGO_URL} alt="SkylineDB3" fill className="object-contain object-left opacity-95" priority sizes="(max-width: 768px) 120px, 200px" />
                        </div>
                    </a>
                </div>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[10px] uppercase tracking-[0.3em] font-medium text-white/90 pointer-events-auto">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={cn(
                                "transition-colors",
                                link.label === "Home" ? "text-amber-400 font-bold hover:text-white" : "hover:text-amber-400"
                            )}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <button className="md:hidden pointer-events-auto text-white p-2" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open Menu">
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            {/* MOBILE NAV OVERLAY */}
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
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "transition-colors",
                                        link.label === "Home" ? "text-amber-500 font-bold" : "hover:text-amber-500"
                                    )}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <section id="hero" className="relative w-full h-[100svh] overflow-hidden bg-black pt-20">
                <AnimatePresence mode="popLayout">
                    <motion.div key={currentSlide} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} className="absolute inset-0 z-0">
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

            <section id="process" className="py-16 md:py-32 px-5 md:px-12 bg-neutral-950 text-white relative">
                <div className="max-w-[1400px] mx-auto">

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
                                className="px-5 py-3 md:py-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] border border-amber-500 bg-amber-500/10 text-amber-400 rounded-sm font-sans text-center whitespace-nowrap shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                            >
                                {PROCESS_PROJECTS[activeProcessProject].category}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* TRIPLE IMAGE SLIDER CONTAINER */}
                    <div
                        ref={sliderContainerRef}
                        className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[21/9] bg-neutral-900 rounded-sm overflow-hidden border border-neutral-800 shadow-2xl select-none"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div key={activeProcessProject} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0 pointer-events-none">

                                {/* LAYER 3 (BASE): FINAL RENDER */}
                                <Image priority src={PROCESS_PROJECTS[activeProcessProject].img3.url} alt={PROCESS_PROJECTS[activeProcessProject].img3.label} fill className="object-cover object-center opacity-90" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px" />

                                {/* LAYER 2 (MIDDLE): 3D MODEL */}
                                <div className="absolute inset-0 z-10" style={{ clipPath: `inset(0 ${100 - slider2}% 0 0)` }}>
                                    <Image priority src={PROCESS_PROJECTS[activeProcessProject].img2.url} alt={PROCESS_PROJECTS[activeProcessProject].img2.label} fill className="object-cover object-center opacity-90" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px" />
                                </div>

                                {/* LAYER 1 (TOP): SKETCH */}
                                <div className="absolute inset-0 z-20" style={{ clipPath: `inset(0 ${100 - slider1}% 0 0)` }}>
                                    <Image priority src={PROCESS_PROJECTS[activeProcessProject].img1.url} alt={PROCESS_PROJECTS[activeProcessProject].img1.label} fill className="object-cover object-center opacity-90" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px" />
                                </div>

                                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 to-transparent z-10" />

                                {/* SINGLE PROJECT TITLE (Centered) */}
                                <div className="absolute bottom-6 md:bottom-10 left-0 w-full text-center z-30 px-4">
                                    <h3 className="font-serif text-2xl md:text-4xl text-white drop-shadow-lg">
                                        {PROCESS_PROJECTS[activeProcessProject].title}
                                    </h3>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* HANDLE 1 (Phase 1 ➔ Phase 2) */}
                        <div
                            className="absolute top-0 bottom-0 w-8 -ml-4 z-40 touch-none flex justify-center cursor-ew-resize group"
                            style={{ left: `${slider1}%` }}
                            onPointerDown={(e) => handlePointerDown(e, 1)}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                        >
                            {/* The vertical line */}
                            <div className="w-[2px] h-full bg-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] relative">
                                {/* The circular grabber */}
                                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-xl border-2 border-black/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                    <div className="flex items-center -space-x-1.5 md:-space-x-2 text-neutral-900">
                                        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* HANDLE 2 (Phase 2 ➔ Phase 3) */}
                        <div
                            className="absolute top-0 bottom-0 w-8 -ml-4 z-40 touch-none flex justify-center cursor-ew-resize group"
                            style={{ left: `${slider2}%` }}
                            onPointerDown={(e) => handlePointerDown(e, 2)}
                            onPointerMove={handlePointerMove}
                            onPointerUp={handlePointerUp}
                            onPointerCancel={handlePointerUp}
                        >
                            {/* The vertical line */}
                            <div className="w-[2px] h-full bg-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] relative">
                                {/* The circular grabber */}
                                <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-amber-500 rounded-full shadow-xl border-2 border-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                    <div className="flex items-center -space-x-1.5 md:-space-x-2 text-white">
                                        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM CONTROLS (Dots + Prev/Next Buttons) */}
                    <div className="flex justify-between items-center mt-6 md:mt-8 w-full max-w-md mx-auto px-4 sm:px-0">
                        <button
                            onClick={prevProcessProject}
                            className="py-2 px-2 text-neutral-500 hover:text-amber-500 transition-colors text-[10px] md:text-[11px] font-bold uppercase tracking-widest"
                            aria-label="Previous Category"
                        >
                            PREV
                        </button>

                        <div className="flex gap-3">
                            {PROCESS_PROJECTS.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setActiveProcessProject(idx); setSlider1(33); setSlider2(66); }}
                                    className={cn("h-1.5 rounded-full transition-all duration-300", activeProcessProject === idx ? "w-8 bg-amber-500" : "w-2 bg-neutral-700 hover:bg-neutral-500")}
                                    aria-label={`Go to project ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextProcessProject}
                            className="py-2 px-2 text-neutral-500 hover:text-amber-500 transition-colors text-[10px] md:text-[11px] font-bold uppercase tracking-widest"
                            aria-label="Next Category"
                        >
                            NEXT
                        </button>
                    </div>

                </div>
            </section>

            <section id="showroom" className="py-16 md:py-32 px-5 md:px-12 bg-neutral-900 text-white relative border-t border-neutral-800">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-6">
                        <div>
                            <span className="text-amber-500 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-3 md:mb-4 block font-sans">
                                Interactive Showroom
                            </span>
                            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white tracking-tight">
                                Structural Typologies.
                            </h2>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 h-auto lg:h-[600px]">
                        {/* Selected Large Image */}
                        <div className="relative w-full lg:w-2/3 h-[400px] lg:h-full bg-black rounded-sm overflow-hidden group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeShowroom}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={SHOWROOM_ITEMS[activeShowroom].url}
                                        alt={SHOWROOM_ITEMS[activeShowroom].title}
                                        fill
                                        className="object-cover object-center opacity-90"
                                        sizes="(max-width: 1024px) 100vw, 66vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                                    <div className="absolute bottom-8 left-8 right-8 z-10">
                                        <h3 className="font-serif text-3xl md:text-4xl text-white mb-2">
                                            {SHOWROOM_ITEMS[activeShowroom].title}
                                        </h3>
                                        <p className="text-neutral-300 font-sans text-sm max-w-lg">
                                            {SHOWROOM_ITEMS[activeShowroom].description}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Thumbnail Selector list */}
                        <div className="w-full lg:w-1/3 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                            {SHOWROOM_ITEMS.map((item, idx) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveShowroom(idx)}
                                    className={cn(
                                        "relative w-full text-left p-4 md:p-6 transition-all duration-300 rounded-sm border",
                                        activeShowroom === idx
                                            ? "bg-neutral-800 border-amber-500/50 shadow-lg"
                                            : "bg-neutral-950 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900"
                                    )}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className={cn("font-serif text-xl transition-colors", activeShowroom === idx ? "text-amber-500" : "text-white")}>
                                            {item.title}
                                        </h4>
                                        {activeShowroom === idx && (
                                            <ArrowRight className="w-5 h-5 text-amber-500" />
                                        )}
                                    </div>
                                    <p className="text-neutral-400 text-xs font-sans line-clamp-2">
                                        {item.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="services" className="py-16 md:py-40 px-5 md:px-12 bg-[#F4F4F2] border-t border-neutral-200">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-left md:text-center mb-10 md:mb-24">
                        <span className="text-amber-800 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-3 md:mb-4 block font-sans">
                            Services Overview
                        </span>
                        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-neutral-900 tracking-tight">
                            Architectural Services.
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

            <section id="team" className="py-16 md:py-40 px-5 md:px-12 bg-white border-t border-neutral-200 relative">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <div className="relative w-full aspect-[4/3] md:aspect-square bg-neutral-100 overflow-hidden rounded-sm">
                            <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2500&auto=format&fit=crop" alt="SkylineDB3 Studio Architecture" fill className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                        </div>

                        <div className="text-left">
                            <span className="text-amber-800 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] mb-3 md:mb-4 block font-sans">
                                The Team
                            </span>
                            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-neutral-900 tracking-tight mb-6 md:mb-8">
                                Uncompromising <br />Spatial Engineering.
                            </h2>
                            <p className="text-neutral-500 font-light text-sm md:text-lg leading-relaxed font-sans mb-8 md:mb-12">
                                SkylineDB3 is a highly calibrated collective of spatial engineers, masterplanners, and structural visionaries operating on a global scale. We master the intersection of structural physics and aesthetic form to deliver landmark environments that meet strict developmental and fiscal thresholds.
                            </p>
                            <a href="#contact" className="inline-flex items-center justify-center border border-neutral-200 text-neutral-800 px-8 py-4 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] hover:border-amber-900 hover:text-amber-900 transition-colors font-sans rounded-sm group">
                                Connect With Us <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <footer id="contact" className="py-20 md:py-40 px-5 md:px-6 bg-[#F4F4F2] border-t border-neutral-200 relative z-10 text-center">
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
                        <a href="mailto:skylinedb3.team@gmail.com" className="w-full block border border-neutral-200 bg-white text-neutral-800 py-4 md:py-5 font-bold text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.25em] hover:border-neutral-900 transition-colors font-sans rounded-sm md:rounded-none">
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