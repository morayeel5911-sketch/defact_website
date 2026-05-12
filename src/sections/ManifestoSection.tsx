import { useRef, useEffect } from "react";
import gsap from "gsap";
import InterfaceGrid from "@/components/InterfaceGrid";

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Skip animations if user prefers reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }


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
      data-theme="dark"
      className="relative min-h-screen py-grid-1 bg-void text-signal"
    >
      <InterfaceGrid theme="dark" />
      <div className="gc-g">
        <div className="flex items-baseline gap-4 mb-8" data-reveal>
          <span className="font-dm-mono text-micro tracking-mono text-steel/50">[02/06]</span>
          <h2 className="font-clash text-h2 tracking-tight text-signal">02 — MANIFESTO</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8" data-reveal>
            <p className="font-clash text-h1 tracking-tight leading-[0.95]">
              OBJECTS THAT<br />
              FEEL LIKE <span className="text-cyan">EVIDENCE</span>
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col justify-end">
            <div className="space-y-6" data-reveal>
              <p className="font-inter text-body text-signal/75 leading-relaxed">
                We make objects for rooms where the digital has already leaked into the body. Not props. Not merch. Field evidence for private rituals.
              </p>
              <p className="font-inter text-body text-signal/75 leading-relaxed">
                A DEFACT piece starts as image, mesh, error, reference, memory. It becomes plastic, chrome, gloss, weight, surface, and signal.
              </p>
              <div className="pt-6 border-t border-border-dark">
                <span className="font-dm-mono text-micro tracking-mono text-cyan/60">
                  [NO MASS CULTURE / NO CLEAN FUTURE / OBJECTS WITH RESIDUE]
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
