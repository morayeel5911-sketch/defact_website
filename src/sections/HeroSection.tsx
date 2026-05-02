"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Navigation from "@/components/Navigation";

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
  loading: () => (
    <div
      className="fixed top-0 left-0 w-full h-[90vh] z-0 flex items-center justify-center"
      style={{ background: "#F0F0F0" }}
    >
      <div
        className="text-xs uppercase tracking-widest"
        style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
      >
        INITIALIZING
      </div>
    </div>
  )
});

const ProductModel = dynamic(() => import('@/components/ProductModel'), { ssr: false });

export default function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative">
      {/* Video Background */}
      <video
        className="video-bg"
        src="/assets/video-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="video-overlay bg-black/30" />

      {/* 3D Canvas - First 90vh, fixed position */}
      <div
        className="fixed top-0 left-0 w-full h-[90vh] z-[5]"
        style={{ background: "transparent" }}
      >
        <Scene>
          <ProductModel scale={1} variant="chrome" />
        </Scene>
      </div>

      {/* DEFACT Title - Below fold at 100vh-140vh */}
      <div
        className="relative z-10 flex flex-col justify-end min-h-[140vh] pt-[90vh]"
        style={{ background: "transparent" }}
      >
        <div className="px-[8vw] md:px-[15vw] pb-8">
          <h1
            className="tracking-tight"
            style={{
              fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(3rem, 16vw, 12rem)",
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)"
            }}
          >
            DEFACT
          </h1>
          <p
            className="mt-4 text-xs md:text-sm"
            style={{
              fontFamily: "var(--font-mono), 'DM Mono', monospace",
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "0.08em",
              textShadow: "0 1px 10px rgba(0,0,0,0.3)"
            }}
          >
            ARCHIVE — COLOGNE — EST. 2024
          </p>
        </div>
      </div>

      {/* Thin 1px rule spanning full width */}
      <div className="relative z-10" style={{ background: "transparent", borderTop: "1px solid rgba(255,255,255,0.2)" }} />
    </section>
  );
}
