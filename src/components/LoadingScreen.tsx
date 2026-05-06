"use client";

import { useEffect, useRef, useState } from "react";

/*
  Chrome-style DEFACT loader
  Simulates liquid metal reflections via CSS gradients + JS animation
*/

export default function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const [phase, setPhase] = useState(0);
  const [hidden, setHidden] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    /* Chrome liquid-metal simulation on 2D canvas */
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * Math.min(window.devicePixelRatio, 2);
      canvas.height = window.innerHeight * Math.min(window.devicePixelRatio, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const draw = () => {
      t += 0.015;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      /* Liquid chrome gradient background */
      for (let y = 0; y < h; y += 4) {
        const wave = Math.sin(y * 0.02 + t * 2) * 30 + Math.sin(y * 0.05 - t) * 15;
        const grad = ctx.createLinearGradient(w / 2 - 100 + wave, y, w / 2 + 100 + wave, y);
        grad.addColorStop(0, "rgba(120,120,120,0)");
        grad.addColorStop(0.3, `rgba(200,200,200,${0.15 + Math.sin(t + y * 0.01) * 0.1})`);
        grad.addColorStop(0.5, `rgba(255,255,255,${0.25 + Math.sin(t * 1.5 + y * 0.02) * 0.15})`);
        grad.addColorStop(0.7, `rgba(200,200,200,${0.15 + Math.sin(t + y * 0.01) * 0.1})`);
        grad.addColorStop(1, "rgba(120,120,120,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, y, w, 4);
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    /* Phased text animation */
    const phrases = ["INITIALIZING", "LOADING ASSETS", "SCULPTING GEOMETRY", "POLISHING EDGES", "DEFACT"];
    let idx = 0;
    let cancelled = false;
    const pendingTimers: ReturnType<typeof setTimeout>[] = [];

    const advance = () => {
      if (cancelled) return;
      setPhase(idx + 1);
      if (idx < phrases.length - 1) {
        idx++;
        const t = setTimeout(advance, 400 + Math.random() * 300);
        pendingTimers.push(t);
      } else {
        /* Final: hold then fade */
        const t1 = setTimeout(() => {
          if (cancelled) return;
          setHidden(true);
          const t2 = setTimeout(() => {
            if (!cancelled && onDone) onDone();
          }, 800);
          pendingTimers.push(t2);
        }, 1200);
        pendingTimers.push(t1);
      }
    };
    const timer = setTimeout(advance, 500);
    pendingTimers.push(timer);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      pendingTimers.forEach(clearTimeout);
    };
  }, [onDone]);

  if (hidden) return null;

  const phrases = ["INITIALIZING", "LOADING ASSETS", "SCULPTING GEOMETRY", "POLISHING EDGES", "DEFACT"];

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "linear-gradient(135deg, #0007A0 0%, #0018D9 50%, #0007A0 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: phase >= 5 ? 0 : 1,
        pointerEvents: phase >= 5 ? "none" : "auto",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6" style={{ mixBlendMode: "difference" }}>
        <div className="font-clash text-4xl md:text-6xl lg:text-8xl tracking-tight text-white uppercase" style={{ letterSpacing: "-0.02em" }}>
          {phrases[Math.min(phase, 4)]}
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mt-4">
          {phrases.slice(0, -1).map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i < phase ? "#fff" : "rgba(255,255,255,0.2)",
                transform: i < phase ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
