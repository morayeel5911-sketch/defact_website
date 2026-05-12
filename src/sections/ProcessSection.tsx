"use client";

import InterfaceGrid from "@/components/InterfaceGrid";

import { useRef, useEffect } from "react";
import gsap from "gsap";


export default function ProcessSection() {

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
    <section ref={sectionRef} id="process" data-theme="chrome" className="relative min-h-screen py-grid-1 bg-chrome text-void">
      <InterfaceGrid theme="chrome" />
      <div className="gc-g">
        <div className="flex items-baseline gap-4 mb-8 " data-reveal>
          <span className="font-dm-mono text-micro tracking-mono text-void/40">[05/06]</span>
          <h2 className="font-clash text-h2 tracking-tight">05 — PROCESS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-5 " data-reveal>
            <p className="font-clash text-h2 tracking-tight leading-[0.95] mb-8">
              FROM ERROR<br />TO OBJECT
            </p>
            <div className="space-y-4 font-dm-mono text-micro tracking-mono text-void/50 mono-run">
              <p>
                INPUT: BODY / CLUB / RELIC / TOOL<br />
                MESH_STATE: UNSTABLE BUT HELD<br />
                MATERIAL: PLA / GLOSS / CERAMIC / CHROME<br />
                SURFACE: HAND FINISHED<br />
                OUTPUT: LIMITED ARTIFACT<br />
                SITE: COLOGNE BLUE FIELD
              </p>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            {[
              { step: "01", title: "COLLAGE", desc: "References are treated as material, not mood board filler." },
              { step: "02", title: "MODEL", desc: "Forms are pushed until ornament, tool, and artifact start to overlap." },
              { step: "03", title: "PRINT", desc: "Layer lines stay visible as proof of translation." },
              { step: "04", title: "FINISH", desc: "Gloss, chrome, ceramic, and hand marks bring the object back into the room." },
            ].map((item, i) => (
              <div
                key={item.step}
                className="vault-card-light p-6 flex items-center gap-6 reveal-left"
                style={{ transitionDelay: `${i * 100}ms` }}
                data-cursor-hover
              >
                <span className="font-dm-mono text-micro tracking-mono text-void/30 w-12">
                  [{item.step}]
                </span>
                <div className="flex-1">
                  <h4 className="font-clash text-h3 tracking-tight text-void">{item.title}</h4>
                  <p className="font-inter text-body text-void/60">{item.desc}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-void/20 group-hover:bg-slime transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
