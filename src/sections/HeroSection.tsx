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
      className="relative h-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(57, 255, 20, 0.12) 0px, transparent 50%),
          radial-gradient(at ${80 + mousePos.x * 10}% ${mousePos.y * 5}%, rgba(232, 17, 35, 0.08) 0px, transparent 40%),
          radial-gradient(at ${20 - mousePos.x * 10}% ${50 + mousePos.y * 20}%, rgba(208, 208, 208, 0.06) 0px, transparent 40%),
          #050505
        `,
      }}
    >
      {/* R3F Scene */}
      <div className="absolute inset-0 z-10 opacity-60">
        {scene}
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16">
        <div className="max-w-[90vw] mx-auto w-full">
          <div className="reveal-up mb-8">
            <span className="font-dm-mono text-micro tracking-mono text-steel uppercase">
              [ARCHIVE — COLOGNE — EST. 2024]
            </span>
          </div>

          <h1 className="reveal-up font-clash text-hero tracking-tight text-signal leading-[0.9] mb-8">
            <span className="glitch-intense" data-text="DEFACT">DEFACT</span>
          </h1>

          <p className="reveal-up font-clash text-h2 tracking-tight text-chrome max-w-2xl mb-12">
            Objects forged in the liminal space between computation and matter.
          </p>

          <div className="reveal-up flex items-center gap-6">
            <span className="font-dm-mono text-micro tracking-mono text-blood uppercase status-badge">
              [BETA v0.9]
            </span>
            <div className="h-px w-24 bg-chrome/30" />
            <span className="font-dm-mono text-micro tracking-mono text-steel uppercase">
              [SCROLL TO EXPLORE]
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-border-dark" />
    </section>
  );
}
