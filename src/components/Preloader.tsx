"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);

  const phases = [
    "[INITIALIZING SYSTEM]",
    "[LOADING ASSETS...]",
    "[COMPILING SHADERS...]",
    "[ESTABLISHING CONNECTION...]",
    "[READY]",
  ];

  useEffect(() => {
    // Simulate loading with easing
    const duration = 2500; // 2.5s total
    const start = performance.now();

    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.floor(eased * 100));

      // Update phase based on progress
      const phaseIndex = Math.min(Math.floor(p * phases.length), phases.length - 1);
      setPhase(phaseIndex);

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        // Complete
        setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 400);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-void flex flex-col items-center justify-center transition-opacity duration-500 ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top progress bar */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-border-dark">
        <div
          className="h-full bg-slime transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center gap-8">
        {/* Brand */}
        <div className="font-clash text-h2 tracking-tight text-signal">
          DEFACT
        </div>

        {/* Phase text with blinking cursor */}
        <div className="font-dm-mono text-micro tracking-mono text-steel">
          {phases[phase]}
          <span className="inline-block w-[6px] h-[1em] bg-slime ml-1 animate-pulse" />
        </div>

        {/* Progress percentage */}
        <div className="font-dm-mono text-micro tracking-mono text-steel/50">
          [{String(progress).padStart(2, "0")}%]
        </div>
      </div>

      {/* Bottom status line */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8">
        <span className="font-dm-mono text-micro tracking-mono text-steel/30">
          [V.0.9.4-BETA]
        </span>
        <span className="font-dm-mono text-micro tracking-mono text-steel/30">
          [COLOGNE, DE]
        </span>
      </div>
    </div>
  );
}
