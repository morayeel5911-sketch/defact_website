"use client";

import InterfaceGrid from "@/components/InterfaceGrid";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const steps = [
  { num: "01", title: "PARAMETRIC DESIGN", desc: "Algorithm-driven form generation using computational geometry and topology optimization." },
  { num: "02", title: "SIMULATION", desc: "Finite element analysis ensures structural integrity before physical production." },
  { num: "03", title: "MATERIALIZATION", desc: "Multi-material additive manufacturing with micron-level precision." },
  { num: "04", title: "FINISHING", desc: "Hand-finished surfaces: patination, polishing, and surface treatment." },
];

export default function ProtocolSection() {

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Skip animations if user prefers reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }


    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-reveal]"), {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="duo" data-theme="dark" className="relative min-h-screen py-grid-1 bg-void scanlines">
      <InterfaceGrid theme="dark" />
      <div className="gc-g">
        <div className="flex items-baseline gap-4 mb-8 " data-reveal>
          <span className="font-dm-mono text-micro tracking-mono text-steel/50">[03/06]</span>
          <h2 className="font-clash text-h2 tracking-tight text-signal">03 — PROTOCOL</h2>
        </div>
        <p className="font-clash text-h3 tracking-tight text-molten mb-16 " data-reveal>
          SIGNAL {'>'} NOISE
        </p>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="group border-t border-border-dark py-12 reveal-left flex flex-col md:flex-row md:items-start gap-6 md:gap-16"
              style={{ transitionDelay: `${i * 100}ms` }}
              data-cursor-hover
            >
              <span className="font-dm-mono text-micro tracking-mono text-steel/50 w-16 flex-shrink-0">
                [{step.num}]
              </span>
              <div className="flex-1">
                <h3 className="font-clash text-h3 tracking-tight text-signal mb-2 group-hover:text-slime transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="font-inter text-body text-steel max-w-xl">{step.desc}</p>
              </div>
              <div className="font-dm-mono text-micro tracking-mono text-steel/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                [EXPAND →]
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
