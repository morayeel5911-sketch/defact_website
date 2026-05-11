"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SectionNavProps {
  sections?: string[];
}

const formatIndex = (i: number) => `[${String(i + 1).padStart(2, "0")}]`;

export default function SectionNav({ sections = [] }: SectionNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    const sectionElements = document.querySelectorAll("[data-theme]");
    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sectionElements).indexOf(entry.target);
            if (index >= 0) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-64px 0px -30% 0px" }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Animate counter when activeIndex changes
  useEffect(() => {
    if (!counterRef.current) return;
    const from = prevIndexRef.current;
    const to = activeIndex;
    const counter = { val: from };

    gsap.to(counter, {
      val: to,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: () => {
        const idx = Math.round(counter.val);
        if (counterRef.current) {
          counterRef.current.textContent = formatIndex(idx);
        }
      },
    });

    prevIndexRef.current = to;
  }, [activeIndex]);

  const scrollToSection = (index: number) => {
    const sectionElements = document.querySelectorAll("[data-theme]");
    if (sectionElements[index]) {
      sectionElements[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  const totalSections = sections.length || 6;

  return (
    <div
      ref={navRef}
      className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-3"
    >
      {/* Animated Index Counter */}
      <div className="mb-4 font-clash text-h3 tracking-tight text-signal">
        <span ref={counterRef} className="tabular-nums">{formatIndex(activeIndex)}</span>
      </div>

      {Array.from({ length: totalSections }).map((_, i) => (
        <button
          key={i}
          onClick={() => scrollToSection(i)}
          className="group relative flex items-center justify-center w-3 h-3"
          aria-label={`Go to section ${i + 1}`}
        >
          <div
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-3 h-3 bg-slime"
                : "w-2 h-2 border border-steel/50 hover:border-slime"
            }`}
          />
          {/* Tooltip */}
          <span className="absolute right-6 font-dm-mono text-micro tracking-mono text-steel opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {sections[i] ? sections[i].toUpperCase() : `[${String(i + 1).padStart(2, "0")}]`}
          </span>
        </button>
      ))}
    </div>
  );
}
