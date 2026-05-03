"use client";

import { useEffect, useState } from "react";

interface ScrollProgressProps {
  sectionNames?: string[];
}

export default function ScrollProgress({ sectionNames = [] }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = sectionNames.length || 6;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(p, 1));

      // Calculate current section
      const sections = document.querySelectorAll("[data-theme]");
      if (sections.length > 0) {
        let active = 0;
        sections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            active = index;
          }
        });
        setCurrentSection(active);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionNum = String(currentSection + 1).padStart(2, "0");
  const totalNum = String(totalSections).padStart(2, "0");

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      {/* Progress bar line */}
      <div className="w-full h-[2px] bg-border-dark">
        <div
          className="h-full bg-blood origin-left"
          style={{
            transform: `scaleX(${progress})`,
            willChange: "transform",
          }}
        />
      </div>

      {/* Section indicator */}
      <div className="absolute top-3 right-4 md:right-8">
        <span className="font-dm-mono text-micro tracking-mono text-steel">
          [{sectionNum}/{totalNum}]
        </span
        >
        {sectionNames[currentSection] && (
          <span className="font-dm-mono text-micro tracking-mono text-steel/50 ml-2">
            {sectionNames[currentSection].toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}
