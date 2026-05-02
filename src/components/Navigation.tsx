"use client";

import { useState, useEffect } from "react";
import Logo from "./Logo";

const navLinks = [
  { num: "01", label: "WORKS", href: "#works" },
  { num: "02", label: "MANIFESTO", href: "#manifesto" },
  { num: "03", label: "PROTOCOL", href: "#duo" },
  { num: "04", label: "ACQUISITION", href: "#acquisition" },
  { num: "05", label: "PROCESS", href: "#process" },
  { num: "06", label: "TRANSMIT", href: "#transmit" },
];

interface NavigationProps {
  theme?: string;
}

export default function Navigation({ theme = "dark" }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLight = theme === "light" || theme === "chrome";
  const textColor = isLight ? "text-void" : "text-signal";
  const bgColor = scrolled ? (isLight ? "bg-signal/90" : "bg-void/90") : "bg-transparent";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${bgColor}`}
      >
        <div className="max-w-[90vw] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <Logo 
              width={60} 
              height={43} 
              className={`transition-all duration-300 group-hover:scale-105 ${textColor}`} 
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.num}
                href={link.href}
                className={`group flex items-center gap-2 transition-all duration-300 hover:translate-x-1 ${
                  isLight ? "text-void/60 hover:text-blood" : "text-signal/60 hover:text-blood"
                }`}
              >
                <span className="font-dm-mono text-micro tracking-mono">
                  [{link.num}]
                </span>
                <span className="font-dm-mono text-micro tracking-mono uppercase group-hover:text-blood transition-colors">
                  {link.label}
                </span>
              </a>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slime animate-pulse" />
            <span className="font-dm-mono text-micro tracking-mono text-steel uppercase">
              [ONLINE]
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${textColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-px w-full transition-all duration-300 ${
                  isLight ? "bg-void" : "bg-signal"
                } ${mobileMenuOpen ? "rotate-45 translate-y-[9px]" : ""}`}
              />
              <span
                className={`block h-px w-full transition-all duration-300 ${
                  isLight ? "bg-void" : "bg-signal"
                } ${mobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-full transition-all duration-300 ${
                  isLight ? "bg-void" : "bg-signal"
                } ${mobileMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-start justify-center px-8 transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ background: "#050505" }}
      >
        <button
          className="absolute top-6 right-6 text-signal"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <span className="font-clash text-3xl">×</span>
        </button>

        <div className="flex flex-col gap-6">
          {navLinks.map((link, index) => (
            <a
              key={link.num}
              href={link.href}
              className="group flex items-baseline gap-4 text-signal hover:text-blood transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="font-dm-mono text-micro tracking-mono text-steel">
                [{link.num}]
              </span>
              <span
                className="font-clash text-4xl md:text-6xl tracking-tight uppercase"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {link.label}
              </span>
            </a>
          ))}
        </div>

        {/* Footer in mobile menu */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slime animate-pulse" />
            <span className="font-dm-mono text-micro tracking-mono text-steel">
              SYSTEM ONLINE — COLOGNE, DE
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
