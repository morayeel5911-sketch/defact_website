"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { num: "01", label: "WORKS" },
  { num: "02", label: "ACQUISITION" },
  { num: "03", label: "PROCESS" },
  { num: "04", label: "TRANSMIT" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--void)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-bold text-xl tracking-widest"
            style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}
          >
            DEFACT
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.num}
                href={`#${link.label.toLowerCase()}`}
                className="group flex items-center gap-2 transition-colors duration-300"
                style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", fontSize: "0.75rem", color: "#9A9A9A" }}
              >
                <span className="group-hover:text-[#A0A0A0] transition-colors">
                  [{link.num}]
                </span>
                <span className="uppercase tracking-wider hover:text-[#A0A0A0] transition-colors">{link.label}</span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            style={{ color: "#0D0D0D" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="text-xl"
              style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace" }}
            >
              {mobileMenuOpen ? "×" : "+"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-opacity duration-500 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ background: "var(--void)" }}
      >
        <button
          className="absolute top-6 right-6 text-3xl"
          style={{ color: "#0D0D0D" }}
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>

        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.num}
              href={`#${link.label.toLowerCase()}`}
              className="transition-colors"
              style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#0D0D0D" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span style={{ color: "#A0A0A0" }}>[{link.num}]</span>{" "}
              <span className="text-2xl uppercase tracking-wider">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}