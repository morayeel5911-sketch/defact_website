"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import heroBg from "../../public/images/v2/hero_v3.webp";
import InterfaceGrid from "@/components/InterfaceGrid";
import { publicAsset } from "@/lib/publicAsset";

export default function HeroSection() {
  const [glitchEnabled, setGlitchEnabled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Parallax on hero image
  useEffect(() => {
    if (!imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-theme="dark"
      className="relative min-h-[100dvh] overflow-hidden"
    >
      <InterfaceGrid theme="dark" />

      {/* FLUX-generated dark metallic background — with parallax */}
      <div ref={imageRef} className="absolute inset-0 z-0 will-change-transform">
        <Image
          src={heroBg}
          alt="DEFACT Hero Background"
          fill
          className="object-cover opacity-40"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/40 to-void/80" />
      </div>

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top bar — Local time + Shop + Glitch Toggle */}
      <div className="absolute top-0 left-0 right-0 z-30 flex justify-between items-center gsnap-1 md:gsnap-2 py-4">
        <div className="font-dm-mono text-micro tracking-mono text-steel/60">
          <LocalTime />
        </div>
          <div className="flex items-center gap-4">
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
            href="https://defact.world"
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm-mono text-micro tracking-mono text-signal hover:text-blood transition-colors uppercase"
            data-cursor-hover
          >
            SHOP/
          </a>
        </div>
      </div>

      {/* Main asymmetric layout */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between gsnap-1 md:gsnap-2 pt-24 pb-12">
        {/* Top-left: Brand Index + Floating products */}
        <div className="flex items-start justify-between w-full">
          <div className="space-y-1">
            <span className="font-dm-mono text-micro tracking-mono text-steel/50 block">
              01.01
            </span>
            <span className="font-dm-mono text-micro tracking-mono text-steel/50 block">
              ARTIST / DESIGN DUO
            </span>
          </div>

          {/* Floating product images — asymmetric scattered (Sutera-style) */}
          <div className="hidden md:flex gap-4 relative">
            <HeroFloatingImage
              src={publicAsset("/images/artifacts/starmirror_1.webp")}
              alt="Starmirror Shuriken"
              width={140}
              height={160}
              className="opacity-70 hover:opacity-100 transition-opacity duration-500"
              style={{ marginTop: 0 }}
              annotation="01.01"
              annotationLabel="REFLECTIVE RITUAL INTERFACE"
            />
            <HeroFloatingImage
              src={publicAsset("/images/artifacts/phylactery_1.webp")}
              alt="Phylactery Shuriken"
              width={120}
              height={140}
              className="opacity-60 hover:opacity-100 transition-opacity duration-500"
              style={{ marginTop: 40 }}
              annotation="01.02"
              annotationLabel="SIGNAL CONTAINER"
            />
          </div>
        </div>

        {/* Center: Massive DEFACT Logo */}
        <div className="flex-1 flex items-center relative">
          <div>
            <div className="font-dm-mono text-micro tracking-mono text-cyan/70 uppercase mb-4">
              [ROYAL BLUE DIGITAL DECAY / COLOGNE]
            </div>
            <h1
              data-hero-title
              className={`font-clash text-[clamp(4rem,18vw,16rem)] tracking-tight text-signal leading-[0.85] ${glitchEnabled ? "glitch-intense" : ""}`}
              data-text="DEFACT"
            >
              DEFACT
            </h1>
            <p className="font-clash text-[clamp(1.4rem,4vw,4.4rem)] tracking-tight leading-[0.95] text-signal/80 max-w-5xl mt-4">
              RITUAL OBJECTS FOR THE POST-DIGITAL BODY.
            </p>
          </div>
        </div>

        {/* Bottom: Description + Specs Grid + Categories */}
        <div className="space-y-8">
          <p className="font-inter text-body text-steel max-w-md leading-relaxed">
            DEFACT IS LYAHUASCA + MIKI.NGLO: A COLOGNE-BASED ARTIST/DESIGN DUO MAKING 3D-PRINTED RELICS, WEARABLE INTERFERENCE, AND BLUE-SIGNAL OBJECTS.
          </p>

          {/* Specs Grid (micro-typography) */}
          <div className="hidden md:grid grid-cols-4 gap-4 border-t border-border-dark/50 pt-4 max-w-lg">
            <div>
              <span className="font-dm-mono text-micro tracking-mono text-steel/40 block uppercase">Practice</span>
              <span className="font-dm-mono text-micro tracking-mono text-steel/70 block mt-1">Objects + Images</span>
            </div>
            <div>
              <span className="font-dm-mono text-micro tracking-mono text-steel/40 block uppercase">Method</span>
              <span className="font-dm-mono text-micro tracking-mono text-steel/70 block mt-1">3D Print + Finish</span>
            </div>
            <div>
              <span className="font-dm-mono text-micro tracking-mono text-steel/40 block uppercase">Field</span>
              <span className="font-dm-mono text-micro tracking-mono text-steel/70 block mt-1">Ritual Design</span>
            </div>
            <div>
              <span className="font-dm-mono text-micro tracking-mono text-steel/40 block uppercase">Status</span>
              <span className="font-dm-mono text-micro tracking-mono text-steel/70 block mt-1">ACTIVE STUDY</span>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-3">
            {["RITUAL OBJECTS", "3D PRINTED RELICS", "IMAGE SYSTEMS"].map((cat) => (
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
