"use client";

import { useThrottledMouse } from "@/hooks/useThrottledMouse";
import { type ReactNode } from "react";

interface HeroSectionProps {
  scene?: ReactNode;
}

export default function HeroSection({ scene }: HeroSectionProps) {
  const mousePos = useThrottledMouse(10);

  return (
    <section
      data-theme="dark"
      className="relative min-h-[100dvh] overflow-hidden"
      style={{
        background: `
          radial-gradient(at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(57, 255, 20, 0.12) 0px, transparent 50%),
          radial-gradient(at ${80 + mousePos.x * 10}% ${mousePos.y * 5}%, rgba(232, 17, 35, 0.08) 0px, transparent 40%),
          radial-gradient(at ${20 - mousePos.x * 10}% ${50 + mousePos.y * 20}%, rgba(208, 208, 208, 0.06) 0px, transparent 40%),
          #050505
        `,
      }}
    >
      {/* R3F Scene - positioned right */}
      <div className="absolute top-[15%] right-[5%] w-[50vw] h-[60vh] z-10 opacity-70 pointer-events-none">
        {scene}
      </div>

      {/* Asymmetric scattered layout */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between px-6 md:px-12 py-20 md:py-24">
        {/* Top-left: Main headline */}
        <div className="max-w-[60vw]">
          <div className="reveal-up mb-4">
            <span className="font-dm-mono text-micro tracking-mono text-steel/60 uppercase">
              [ARCHIVE — COLOGNE — EST. 2024]
            </span>
          </div
          >
          <h1 className="reveal-up font-clash text-hero tracking-tight text-signal leading-[0.85]">
            <span className="glitch-intense" data-text="DEFACT">DEFACT</span>
          </h1>
        </div>

        {/* Floating annotation: Etymology box */}
        <div className="absolute top-[20%] right-[8%] md:right-[12%] reveal-scale">
          <div className="vault-card p-4 md:p-6 max-w-[200px] md:max-w-[240px]">
            <span className="font-dm-mono text-micro tracking-mono text-steel block mb-2">
              [ETYMOLOGY]
            </span>
            <div className="font-dm-mono text-micro tracking-mono text-signal/80 space-y-1">
              <p>DE (FROM) + FACT (ACT)</p>
              <p className="text-steel">→ FROM THE ACT</p>
              <p className="text-steel">→ OBJECTS OF DISTINCTION</p>
            </div>
          </div>
        </div>

        {/* Bottom-left: Status indicators */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2 reveal-left">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-slime animate-pulse" />
              <span className="font-dm-mono text-micro tracking-mono text-slime">
                [SYSTEM: ONLINE]
              </span>
            </div>
            <div className="font-dm-mono text-micro tracking-mono text-steel/60 space-y-1">
              <p>[LAT: 50.9375° N]</p>
              <p>[LON: 6.9603° E]</p>
              <p>[STATUS: ACTIVE]</p>
            </div>
          </div>

          {/* Bottom-right: Scroll hint */}
          <div className="reveal-up">
            <span className="font-dm-mono text-micro tracking-mono text-steel/50 uppercase">
              [SCROLL TO EXPLORE]
            </span>
            <div className="mt-2 w-px h-12 bg-steel/30 mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Thin annotation lines (decorative) */}
      <svg
        className="absolute inset-0 z-10 pointer-events-none opacity-20"
        width="100%"
        height="100%"
      >
        <line
          x1="15%"
          y1="30%"
          x2="45%"
          y2="35%"
          stroke="#39FF14"
          strokeWidth="1"
        />
        <line
          x1="70%"
          y1="25%"
          x2="85%"
          y2="20%"
          stroke="#E81123"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border-dark" />
    </section>
  );
}
