"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILITIES ---
function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

// --- CONFIG & ASSETS ---
const LOGO_URL =
  "https://firebasestorage.googleapis.com/v0/b/skylinedb3-e8295.firebasestorage.app/o/Logo%2FSBD.png?alt=media&token=f5776d7f-6da0-447b-a4ee-36d13c24dc73";

// Standard navigation links (Connect is handled separately as a button)
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Showroom", href: "/#showroom" },
  { label: "Process", href: "/#process" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when mobile menu is open (prevents scrolling the page behind the menu)
  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isMobileMenuOpen]);

  // Close mobile menu automatically if the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Helper to determine if a link is active based on current route
  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href.split("#")[0]) && href.split("#")[0] !== "/") return true;
    return false;
  };

  return (
    <>
      {/* --- DESKTOP & TOP HEADER (STATIC) --- */}
      <header className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center bg-neutral-950 border-b border-white/10 px-5 py-4 md:px-12 md:py-5">

        {/* LOGO (Scales perfectly from Mobile to Desktop) */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link href="/">
            <div className="relative w-28 h-8 md:w-40 md:h-10 lg:w-48 lg:h-12 hover:opacity-80 transition-opacity">
              <Image
                src={LOGO_URL}
                alt="SkylineDB3 Design + Build"
                fill
                className="object-contain object-left opacity-95"
                priority
                sizes="(max-width: 768px) 120px, 200px"
              />
            </div>
          </Link>
        </div>

        {/* DESKTOP NAV LINKS (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-[10px] uppercase tracking-[0.3em] font-medium pointer-events-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "transition-colors duration-300 py-2",
                isActive(link.href)
                  ? "text-amber-500 font-bold"
                  : "text-white/80 hover:text-amber-400"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* DESKTOP "CONNECT" CTA BUTTON */}
          <Link
            href="/contact"
            className={cn(
              "ml-4 border px-6 py-2.5 transition-all duration-300 rounded-sm",
              isActive("/contact")
                ? "bg-amber-500 border-amber-500 text-neutral-950 font-bold"
                : "border-white/20 text-white hover:border-amber-500 hover:text-amber-500"
            )}
          >
            Connect
          </Link>
        </nav>

        {/* MOBILE MENU BURGER BUTTON (Hidden on Desktop) */}
        <button
          className="md:hidden pointer-events-auto text-white p-2 hover:text-amber-400 transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* --- MOBILE NAV OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[110] bg-neutral-950 flex flex-col justify-center px-8 sm:px-12"
          >
            {/* CLOSE BUTTON */}
            <button
              className="absolute top-5 right-5 text-white/50 hover:text-white p-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" strokeWidth={1.5} />
            </button>

            {/* MOBILE LINKS WITH STAGGERED ANIMATION */}
            <nav className="flex flex-col gap-6 text-3xl sm:text-4xl font-serif tracking-wide">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block w-full py-2 transition-colors",
                      isActive(link.href)
                        ? "text-amber-500 font-bold"
                        : "text-white/80 hover:text-amber-400"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* MOBILE "CONNECT" CTA BUTTON */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 + 0.1, duration: 0.4 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center w-full bg-amber-500 text-neutral-950 font-sans font-bold text-[11px] uppercase tracking-[0.3em] py-5 rounded-sm shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                >
                  Start a Project
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}