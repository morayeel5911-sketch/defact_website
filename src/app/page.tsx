"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Navigation from "@/components/Navigation";

// Dynamic imports for R3F
const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div className="fixed top-0 left-0 w-full h-screen z-0 flex items-center justify-center bg-void">
      <div className="font-dm-mono text-micro tracking-mono text-steel uppercase">
        [INITIALIZING]
      </div>
    </div>
  )
});

const ProductModel = dynamic(() => import('@/components/ProductModel'), { ssr: false });

// Section Data
const sections = [
  { id: "works", title: "01 — OBJECTS", subtitle: "FORGED IN DIGITAL FIRE", theme: "dark" },
  { id: "manifesto", title: "02 — MANIFESTO", subtitle: "THE CODE IS LAW", theme: "light" },
  { id: "duo", title: "03 — PROTOCOL", subtitle: "SIGNAL > NOISE", theme: "dark" },
  { id: "acquisition", title: "04 — ACQUISITION", subtitle: "CLAIM YOUR ARTIFACT", theme: "signal" },
  { id: "process", title: "05 — PROCESS", subtitle: "FROM BIT TO MATTER", theme: "chrome" },
  { id: "transmit", title: "06 — TRANSMIT", subtitle: "ESTABLISH CONNECTION", theme: "dark" },
];

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute("data-theme") || "dark";
            setCurrentTheme(theme);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-64px 0px 0px 0px" }
    );

    document.querySelectorAll("[data-theme]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative w-full bg-void text-signal">
      <Navigation theme={currentTheme} />

      {/* ═══════════════════════════════════════════════
          HERO — Full Viewport Cinematic
          ═══════════════════════════════════════════════ */}
      <section ref={heroRef} data-theme="dark" className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/video-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-void/60" />

        {/* R3F Scene */}
        <div className="absolute inset-0 z-10">
          <Scene>
            <ProductModel scale={1} variant="chrome" />
          </Scene>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-24 px-8 md:px-16">
          <h1
            className="font-clash text-hero tracking-tight text-signal leading-none"
            data-text="DEFACT"
          >
            <span className="glitch" data-text="DEFACT">DEFACT</span>
          </h1>

          <div className="mt-6 flex items-center gap-8">
            <span className="font-dm-mono text-micro tracking-mono text-steel uppercase">
              [ARCHIVE — COLOGNE — EST. 2024]
            </span>
            <div className="h-px w-24 bg-chrome/30" />
            <span className="font-dm-mono text-micro tracking-mono text-blood uppercase status-badge">
              [BETA v0.9]
            </span>
          </div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border-dark" />
      </section>

      {/* ═══════════════════════════════════════════════
          SECTIONS — Digital Decay Rhythm
          ═══════════════════════════════════════════════ */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          data-theme={section.theme}
          className={`relative min-h-screen py-32 px-8 md:px-16 ${
            section.theme === "light" ? "bg-signal text-void" :
            section.theme === "chrome" ? "bg-chrome text-void" :
            "bg-void text-signal"
          }`}
        >
          {/* Section Header */}
          <div className="max-w-[90vw] mx-auto">
            <div className="flex items-baseline gap-4 mb-16">
              <span className="font-dm-mono text-micro tracking-mono text-steel/50">
                [{String(index + 1).padStart(2, '0')}/06]
              </span>
              <h2 className="font-clash text-h2 tracking-tight">
                {section.title}
              </h2>
            </div>

            <p className="font-clash text-h3 tracking-tight text-molten mb-24">
              {section.subtitle}
            </p>

            {/* Placeholder Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="vault-card p-8 aspect-square flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-dm-mono text-micro tracking-mono text-steel">
                      [0{index + 1}.0{item}]
                    </span>
                    <span className={`status-badge ${item === 1 ? 'status-badge-active' : ''}`}>
                      {item === 1 ? '[ACTIVE]' : '[SOLD OUT]'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-clash text-h3 tracking-tight mb-2">
                      Artifact {String.fromCharCode(65 + item - 1)}
                    </h3>
                    <p className="font-inter text-body text-steel">
                      Sculptural object generated through computational processes and materialized via additive manufacturing.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Divider */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-border-dark" />
        </section>
      ))}

      {/* ═══════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════ */}
      <footer className="bg-void text-signal py-24 px-8 md:px-16 border-t border-border-dark">
        <div className="max-w-[90vw] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="md:col-span-2">
              <h3 className="font-clash text-h2 tracking-tight mb-8 glitch" data-text="DEFACT">
                DEFACT
              </h3>
              <p className="font-inter text-body text-steel max-w-md">
                Objects of distinction. Forged in digital fire, cast in physical reality.
                Each artifact exists in the liminal space between computation and matter.
              </p>
            </div>

            <div>
              <h4 className="font-dm-mono text-micro tracking-mono text-steel uppercase mb-6">
                [NAVIGATION]
              </h4>
              <ul className="space-y-3">
                {['Works', 'Manifesto', 'Protocol', 'Acquisition', 'Process', 'Transmit'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="font-inter text-body text-signal hover:text-blood transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-dm-mono text-micro tracking-mono text-steel uppercase mb-6">
                [STATUS]
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slime animate-pulse" />
                  <span className="font-dm-mono text-micro tracking-mono text-slime">
                    SYSTEM ONLINE
                  </span>
                </div>
                <p className="font-dm-mono text-micro tracking-mono text-steel">
                  LAT: 50.9375° N<br />
                  LON: 6.9603° E
                </p>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-border-dark flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-dm-mono text-micro tracking-mono text-steel">
              © 2024 DEFACT. ALL RIGHTS RESERVED.
            </span>
            <span className="font-dm-mono text-micro tracking-mono text-steel">
              [NO COOKIES. NO TRACKING. PURE SIGNAL.]
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
