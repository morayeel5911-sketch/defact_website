"use client";

import { useEffect, useState } from "react";

/*
  Premium scroll-progress with chromatic aberration glow
  - Top progress bar with RGB split (chromatic aberration)
  - Section markers derived from sections prop, falling back to hardcoded 5
*/

interface ScrollProgressProps {
  sections?: string[];
}

export default function ScrollProgress({ sections = [] }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(Math.max(ratio, 0), 1));

      /* Determine active section from sections array */
      if (sections.length > 1) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const sectionHeight = total / (sections.length - 1);
        const currentSection = Math.min(
          Math.floor(scrollTop / sectionHeight),
          sections.length - 1
        );
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); /* initial */
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  /* Chromatic shadow — RGB channel offset */
  const chromaticShadow = `-
    ${2 + progress * 4}px 0 10px rgba(255,50,0,0.4),
    ${2 + progress * 4}px 0 10px rgba(0,150,255,0.3),
    0 0 20px rgba(255,100,0,0.2)
  `;

  /* Section markers */
  const markerPositions = sections.length > 1
    ? sections.map((_, i) => i / (sections.length - 1))
    : [0, 0.25, 0.5, 0.75, 1];

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 z-[9998] h-[2px] w-full bg-transparent">
        <div
          className="h-full origin-left transition-transform duration-100 ease-out"
          style={{
            transform: `scaleX(${progress})`,
            background: "linear-gradient(90deg, #FF0000, #FF3300, #FF8800, #FF0000)",
            boxShadow: chromaticShadow,
          }}
        />
      </div>

      {/* Right-side section markers */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[9997] flex flex-col gap-3">
        {markerPositions.map((markerRatio, i) => {
          const isActive = i === activeSection;
          return (
            <div
              key={i}
              className="flex items-center gap-2 transition-all duration-300 cursor-pointer"
              onClick={() => {
                const total = document.documentElement.scrollHeight - window.innerHeight;
                const target = markerRatio * total;
                window.scrollTo({ top: target, behavior: "smooth" });
              }}
            >
              <div
                className="transition-all duration-300"
                style={{
                  width: isActive ? 10 : 4,
                  height: isActive ? 10 : 4,
                  borderRadius: "50%",
                  backgroundColor: isActive ? "#FF0000" : "rgba(255,255,255,0.15)",
                  boxShadow: isActive ? "0 0 8px rgba(255,0,0,0.6), 0 0 16px rgba(255,0,0,0.2)" : "none",
                  transform: isActive ? "scale(1)" : "scale(0.8)",
                }}
              />
              {/* Label on hover/active */}
              {sections[i] && isActive && (
                <span className="text-[9px] tracking-[0.2em] text-white font-dm-mono uppercase whitespace-nowrap opacity-80">
                  {sections[i]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
