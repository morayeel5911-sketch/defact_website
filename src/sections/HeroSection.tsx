"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import heroBg from "../../public/images/flux/hero_00001_.png";

// Dynamic import for R3F — must be client-only
const HeroShader = dynamic(() => import("@/components/HeroShader"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050505]" />,
});

export default function HeroSection() {
  const [glitchEnabled, setGlitchEnabled] = useState(false);

  return (
    <section
      id="hero"
      data-theme="dark"
      className="relative min-h-[100dvh] overflow-hidden"
    >
      {/* FLUX-generated dark metallic background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="DEFACT Hero Background"
          fill
          className="object-cover opacity-40"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/40 to-[#050505]/80" />
      </div>

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top bar — Local time + Shop + Glitch Toggle */}
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center px-6 md:px-12 py-4">
        <div className="font-dm-mono text-micro tracking-mono text-steel/60">
          <LocalTime />
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setGlitchEnabled(!glitchEnabled)}
            className={`font-dm-mono text-micro tracking-mono uppercase transition-colors ${
              glitchEnabled ? "text-blood" : "text-steel/40 hover:text-steel"
            }`}
            data-cursor-hover
          >
            [GLITCH: {glitchEnabled ? "ON" : "OFF"}]
          </button>
          <a
            href="#shop"
            className="font-dm-mono text-micro tracking-mono text-signal hover:text-blood transition-colors uppercase"
            data-cursor-hover
          >
            SHOP/
          </a>
        </div>
      </div>

      {/* Main asymmetric layout */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between px-6 md:px-12 pt-24 pb-12">
        {/* Top-left: Brand Index + Floating products */}
        <div className="flex items-start justify-between w-full">
          <div className="space-y-1">
            <span className="font-dm-mono text-micro tracking-mono text-steel/50 block">
              01.01
            </span>
            <span className="font-dm-mono text-micro tracking-mono text-steel/50 block">
              COLLECTIVE
            </span>
          </div>

          {/* Floating product images — asymmetric scattered (Sutera-style) */}
          <div className="hidden md:flex gap-4 relative">
            <HeroFloatingImage
              src="/images/artifacts/starmirror_1.webp"
              alt="Starmirror Shuriken"
              width={140}
              height={160}
              className="opacity-70 hover:opacity-100 transition-opacity duration-500"
              style={{ marginTop: 0 }}
              annotation="01.01"
              annotationLabel="VIERZACKIGER WURFSTERN"
            />
            <HeroFloatingImage
              src="/images/artifacts/phylactery_1.webp"
              alt="Phylactery Shuriken"
              width={120}
              height={140}
              className="opacity-60 hover:opacity-100 transition-opacity duration-500"
              style={{ marginTop: 40 }}
              annotation="01.02"
              annotationLabel="DREIZACKIGER DISTANCE-STAR"
            />
          </div>
        </div>

        {/* Center: Massive DEFACT Logo */}
        <div className="flex-1 flex items-center relative">
          <h1
            data-hero-title
            className={`font-clash text-[clamp(4rem,18vw,16rem)] tracking-tight text-signal leading-[0.85] ${glitchEnabled ? "glitch-intense" : ""}`}
            data-text="DEFACT"
          >
            DEFACT
          </h1>
        </div>

        {/* Bottom: Description + Specs Grid + Categories */}
        <div className="space-y-8">
          <p className="font-inter text-body text-steel max-w-md leading-relaxed">
            A COLOGNE - BASED DESIGN DUO EXPLORING THE INTERSECTION OF CRAFTSMANSHIP AND DIGITAL AESTHETICS.
          </p>

          {/* Specs Grid (micro-typography) */}
          <div className="hidden md:grid grid-cols-4 gap-6 border-t border-border-dark/50 pt-4 max-w-lg">
            <div>
              <span className="font-dm-mono text-micro tracking-mono text-steel/40 block uppercase">Material</span>
              <span className="font-dm-mono text-micro tracking-mono text-steel/70 block mt-1">PLA + Glanzfarbe</span>
            </div>
            <div>
              <span className="font-dm-mono text-micro tracking-mono text-steel/40 block uppercase">Typ</span>
              <span className="font-dm-mono text-micro tracking-mono text-steel/70 block mt-1">VIERZACKIGER WURFSTERN</span>
            </div>
            <div>
              <span className="font-dm-mono text-micro tracking-mono text-steel/40 block uppercase">Gewicht</span>
              <span className="font-dm-mono text-micro tracking-mono text-steel/70 block mt-1">120g</span>
            </div>
            <div>
              <span className="font-dm-mono text-micro tracking-mono text-steel/40 block uppercase">Status</span>
              <span className="font-dm-mono text-micro tracking-mono text-steel/70 block mt-1">UNENDLICHE AUFLAGE</span>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-3">
            {["3D PRINTING", "ART DIRECTION", "PRODUCT DESIGN"].map((cat) => (
              <span
                key={cat}
                className="font-dm-mono text-micro tracking-mono text-steel/60 border border-border-dark px-3 py-1"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Status + Scroll hint */}
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-slime animate-pulse" />
                <span className="font-dm-mono text-micro tracking-mono text-slime">
                  [SYSTEM: ONLINE]
                </span>
              </div>
              <div className="font-dm-mono text-micro tracking-mono text-steel/40 space-y-1">
                <p>LAT: 50.9375° N</p>
                <p>LON: 6.9603° E</p>
              </div>
            </div>

            <div className="text-right">
              <span className="font-dm-mono text-micro tracking-mono text-steel/40 uppercase block">
                [SCROLL TO EXPLORE]
              </span>
              <div className="mt-2 w-px h-12 bg-steel/20 mx-auto animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Annotation lines (SVG — Sutera style) */}
      <svg
        className="absolute inset-0 z-10 pointer-events-none"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Line 1: from top-left to center area */}
        <line
          x1="8"
          y1="8"
          x2="25"
          y2="28"
          stroke="rgba(57, 255, 20, 0.15)"
          strokeWidth="0.08"
        />
        <circle cx="8" cy="8" r="0.4" fill="rgba(57, 255, 20, 0.2)" />
        {/* Line 2: from top-right down to annotation */}
        <line
          x1="78"
          y1="6"
          x2="94"
          y2="22"
          stroke="rgba(232, 17, 35, 0.12)"
          strokeWidth="0.08"
          strokeDasharray="1 0.8"
        />
        <circle cx="78" cy="6" r="0.4" fill="rgba(232, 17, 35, 0.15)" />
        {/* Line 3: from bottom-left up to center */}
        <line
          x1="3"
          y1="92"
          x2="22"
          y2="75"
          stroke="rgba(208, 208, 208, 0.12)"
          strokeWidth="0.08"
        />
        <circle cx="3" cy="92" r="0.4" fill="rgba(208, 208, 208, 0.15)" />
        {/* Line 4: diagonal across */}
        <line
          x1="60"
          y1="85"
          x2="95"
          y2="55"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="0.06"
          strokeDasharray="0.5 1"
        />
      </svg>

      {/* Floating annotation labels */}
      <div className="hidden md:block absolute top-[6%] left-[3%] z-20 pointer-events-none">
        <span className="font-dm-mono text-micro tracking-mono text-[rgba(57,255,20,0.35)] uppercase block">
          INDEX: 01.01
        </span>
        <span className="font-dm-mono text-micro tracking-mono text-[rgba(57,255,20,0.25)] block mt-1">
          [STARMIRROR]
        </span>
      </div>

      <div className="hidden md:block absolute top-[4%] right-[8%] z-20 pointer-events-none text-right">
        <span className="font-dm-mono text-micro tracking-mono text-[rgba(232,17,35,0.30)] uppercase block">
          INDEX: 01.02
        </span>
        <span className="font-dm-mono text-micro tracking-mono text-[rgba(232,17,35,0.20)] block mt-1">
          [PHYLACTERY]
        </span>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border-dark" />
    </section>
  );
}

function HeroFloatingImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  annotation,
  annotationLabel,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  annotation?: string;
  annotationLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`relative group ${className}`}
      style={{ width, height, ...style }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        unoptimized
      />

      {/* Annotation dot + label on hover */}
      <div className="absolute -bottom-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {annotation && (
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-steel/40" />
            <span className="font-dm-mono text-[9px] tracking-mono text-steel/50 whitespace-nowrap">
              {annotation} {annotationLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>LOCAL/ {time}</span>;
}
