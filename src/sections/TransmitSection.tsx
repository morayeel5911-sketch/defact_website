"use client";

import InterfaceGrid from "@/components/InterfaceGrid";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


export default function TransmitSection() {

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

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
    <section ref={sectionRef} id="transmit" data-theme="dark" className="relative min-h-screen py-grid-1 bg-void flex items-center">
      <InterfaceGrid theme="dark" />
      <div className="gc-g w-full">
        <div className="flex items-baseline gap-4 mb-8 " data-reveal>
          <span className="font-dm-mono text-micro tracking-mono text-steel/50">[06/06]</span>
          <h2 className="font-clash text-h2 tracking-tight text-signal">06 — TRANSMIT</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className=" " data-reveal>
            <p className="font-clash text-h1 tracking-tight leading-[0.9] text-signal mb-8">
              ESTABLISH<br />
              <span className="glitch-intense" data-text="CONNECTION">CONNECTION</span>
            </p>
            <p className="font-inter text-body text-steel max-w-md mb-8">
              For acquisition inquiries, collaboration proposals, or studio visits in Cologne.
            </p>
          </div>

          <div className="space-y-6 reveal-scale">
            <div className="vault-card p-6" data-cursor-hover>
              <span className="font-dm-mono text-micro tracking-mono text-steel block mb-2">[EMAIL]</span>
              <a
                href="mailto:hello@defact.studio"
                className="font-clash text-h3 tracking-tight text-signal hover:text-slime transition-colors"
              >
                hello@defact.studio
              </a>
            </div>
            <div className="vault-card p-6" data-cursor-hover>
              <span className="font-dm-mono text-micro tracking-mono text-steel block mb-2">[INSTAGRAM]</span>
              <a
                href="https://instagram.com/defact.studio"
                className="font-clash text-h3 tracking-tight text-signal hover:text-slime transition-colors"
              >
                @defact.studio
              </a>
            </div>
            <div className="vault-card p-6" data-cursor-hover>
              <span className="font-dm-mono text-micro tracking-mono text-steel block mb-2">[LOCATION]</span>
              <span className="font-clash text-h3 tracking-tight text-signal">
                50.9375° N, 6.9603° E
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
