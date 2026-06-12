"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Skyline Architects home">
          <span className={styles.logoMark}>✦</span>
          <span className={styles.logoText}>Skyline</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link href="/contact" className={`btn btn-primary ${styles.cta}`} id="navbar-cta">
          Inquire
        </Link>

        {/* Mobile burger */}
        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          id="mobile-menu-toggle"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`} aria-hidden={!menuOpen}>
        <nav className={styles.mobileNav}>
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileActive : ""}`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <span className="t-label gold" style={{ fontSize: "0.6rem" }}>0{i + 1}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className={`btn btn-primary ${styles.mobileCta}`} id="mobile-navbar-cta">
          Start a Project
        </Link>
      </div>
    </header>
  );
}
