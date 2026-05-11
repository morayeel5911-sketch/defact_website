import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InterfaceGrid from "@/components/InterfaceGrid";

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Stagger reveal text elements
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-reveal]"), {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      data-theme="light"
      className="relative min-h-screen py-grid-1 bg-signal text-void"
    >
      <InterfaceGrid theme="light" />
      <div className="gc-g">
        <div className="flex items-baseline gap-4 mb-8" data-reveal>
          <span className="font-dm-mono text-micro tracking-mono text-void/40">[02/06]</span>
          <h2 className="font-clash text-h2 tracking-tight">02 — MANIFESTO</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8" data-reveal>
            <p className="font-clash text-h1 tracking-tight leading-[0.95]">
              THE CODE<br />
              <span className="text-blood">IS</span> LAW
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col justify-end">
            <div className="space-y-6" data-reveal>
              <p className="font-inter text-body text-void/70 leading-relaxed">
                We reject mass production. Every DEFACT artifact is born from an algorithm, refined by human intent, and materialized through precision engineering.
              </p>
              <p className="font-inter text-body text-void/70 leading-relaxed">
                Our objects exist at the intersection of digital parametricism and analog warmth — each one a unique geological event frozen in metal and polymer.
              </p>
              <div className="pt-6 border-t border-void/10">
                <span className="font-dm-mono text-micro tracking-mono text-void/50">
                  [MINTED ON ETHEREUM — VERIFIABLE ON CHAIN]
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
