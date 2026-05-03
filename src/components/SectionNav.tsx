"use client";

import { useEffect, useRef, useState } from "react";

interface SectionNavProps {
  sections?: string[];
}

export default function SectionNav({ sections = [] }: SectionNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

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
