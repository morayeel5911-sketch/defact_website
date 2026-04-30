"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Navigation from "@/components/Navigation";

// Dynamic import for R3F components - must be ssr:false in App Router
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

export default function Home() {
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
    <main className="relative w-full">
      {/* Fixed Navigation */}
      <Navigation />

      {/* Hero Section: 3D Canvas (90vh fixed) + Title Below (100vh-140vh) */}
      <section className="relative">
        {/* Video Background - behind everything */}
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

      {/* Works Section */}
      <section
        id="works"
        className="relative py-40 px-8 md:px-[15vw] overflow-hidden"
        style={{ background: "rgba(13,13,13,0.75)" }}
      >
        {/* Video Background */}
        <video
          className="video-bg"
          src="/assets/video-product-1.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: 0.15 }}
        />
        <div className="video-overlay bg-black/60" />

        <div className="video-content max-w-7xl mx-auto">
          {/* Product List - Horizontal rows */}
          <div className="space-y-0">
            {/* Product 1: STARMIRROR */}
            <div
              className="group py-6 border-b border-[#D5D5D5] cursor-pointer transition-colors duration-300 hover:bg-[#E8E8E8]"
            >
              {/* Hidden video element for hover */}
              <video
                className="hidden group-hover:block absolute inset-0 w-full h-full object-cover opacity-30 z-0"
                src="/assets/video-product-1.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              {/* Main row: index + name + metadata */}
              <div className="flex flex-row items-center gap-4 md:gap-8">
                <span
                  className="text-xs flex-shrink-0 w-12"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
                >
                  00.01
                </span>
                <span
                  className="text-xl md:text-2xl transition-transform duration-300 group-hover:translate-x-2"
                  style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}
                >
                  STARMIRROR
                </span>
                <div className="flex items-center gap-4 md:gap-6 ml-auto">
                  <span
                    className="text-xs italic hidden md:inline"
                    style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}
                  >
                    Collectible
                  </span>
                  <span
                    className="text-xs flex-shrink-0"
                    style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
                  >
                    Available
                  </span>
                </div>
              </div>
              {/* Description below - full width on mobile */}
              <div className="mt-2 pl-[calc(2rem+8px)] md:pl-0">
                <p
                  className="text-xs md:text-sm"
                  style={{ fontFamily: "var(--font-body), 'Inter', sans-serif", color: "#9A9A9A" }}
                >
                  A mirror. A relic. A charm.
                </p>
              </div>
              {/* Mobile-only category/status */}
              <div className="mt-1 pl-[calc(2rem+8px)] md:hidden flex items-center gap-4">
                <span
                  className="text-xs italic"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}
                >
                  Collectible
                </span>
              </div>
            </div>

            {/* Product 2: PHYLACTERY */}
            <div
              className="group py-6 border-b border-[#D5D5D5] cursor-pointer transition-colors duration-300 hover:bg-[#E8E8E8]"
            >
              {/* Main row: index + name + metadata */}
              <div className="flex flex-row items-center gap-4 md:gap-8">
                <span
                  className="text-xs flex-shrink-0 w-12"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
                >
                  00.02
                </span>
                <span
                  className="text-xl md:text-2xl transition-transform duration-300 group-hover:translate-x-2"
                  style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}
                >
                  PHYLACTERY
                </span>
                <div className="flex items-center gap-4 md:gap-6 ml-auto">
                  <span
                    className="text-xs italic hidden md:inline"
                    style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}
                  >
                    Capsule
                  </span>
                  <span
                    className="text-xs flex-shrink-0"
                    style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
                  >
                    Available
                  </span>
                </div>
              </div>
              {/* Description below - full width on mobile */}
              <div className="mt-2 pl-[calc(2rem+8px)] md:pl-0">
                <p
                  className="text-xs md:text-sm"
                  style={{ fontFamily: "var(--font-body), 'Inter', sans-serif", color: "#9A9A9A" }}
                >
                  Wearable container with glass core.
                </p>
              </div>
              {/* Mobile-only category/status */}
              <div className="mt-1 pl-[calc(2rem+8px)] md:hidden flex items-center gap-4">
                <span
                  className="text-xs italic"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}
                >
                  Capsule
                </span>
              </div>
            </div>

            {/* Product 3: TIARA */}
            <div
              className="group py-6 border-b border-[#D5D5D5] cursor-pointer transition-colors duration-300 hover:bg-[#E8E8E8]"
            >
              {/* Main row: index + name + metadata */}
              <div className="flex flex-row items-center gap-4 md:gap-8">
                <span
                  className="text-xs flex-shrink-0 w-12"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
                >
                  00.03
                </span>
                <span
                  className="text-xl md:text-2xl transition-transform duration-300 group-hover:translate-x-2"
                  style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}
                >
                  TIARA
                </span>
                <div className="flex items-center gap-4 md:gap-6 ml-auto">
                  <span
                    className="text-xs italic hidden md:inline"
                    style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}
                  >
                    Headpiece
                  </span>
                  <span
                    className="text-xs flex-shrink-0"
                    style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#D0403B" }}
                  >
                    SOLD OUT
                  </span>
                </div>
              </div>
              {/* Description below - full width on mobile */}
              <div className="mt-2 pl-[calc(2rem+8px)] md:pl-0">
                <p
                  className="text-xs md:text-sm"
                  style={{ fontFamily: "var(--font-body), 'Inter', sans-serif", color: "#9A9A9A" }}
                >
                  Transforming headpiece.
                </p>
              </div>
              {/* Mobile-only category/status */}
              <div className="mt-1 pl-[calc(2rem+8px)] md:hidden flex items-center gap-4">
                <span
                  className="text-xs italic"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}
                >
                  Headpiece
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #D5D5D5" }} />

      {/* Manifesto Quote - Left aligned */}
      <section
        className="relative py-40 px-8 md:px-[15vw]"
        style={{ background: "rgba(240,240,232,0.75)" }}
      >
        <div className="max-w-[42rem] ml-[8vw] md:ml-[15vw]">
          <p
            className="leading-[1.35]"
            style={{
              fontFamily: "var(--font-quote), 'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
              color: "#0D0D0D"
            }}
          >
            Cuts through glare and bullshit. Protect and reflect.
          </p>
          <div
            className="mt-12 uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", fontSize: "0.7rem", color: "#9A9A9A", letterSpacing: "0.08em" }}
          >
            — STARMIRROR MANIFESTO
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #D5D5D5" }} />

      {/* The Duo - Asymmetric 35/65 */}
      <section
        className="relative py-40 px-8 md:px-[15vw] overflow-hidden"
        style={{ background: "rgba(245,245,245,0.85)" }}
      >
        {/* Video Background */}
        <video
          className="video-bg"
          src="/assets/video-about.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: 0.25 }}
        />
        <div className="video-overlay bg-black/40" />

        <div className="video-content max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Left Column - 35% */}
            <div className="md:col-span-2 flex flex-col gap-8">
              {/* LYAHUASCA */}
              <div className="flex flex-col">
                <div
                  className="aspect-[3/4] max-h-[300px] md:max-h-none overflow-hidden relative flex items-center justify-center"
                  style={{
                    background: "linear-gradient(180deg, #1C1C1E 0%, #0D0D0D 100%)",
                  }}
                >
                  {/* Large watermark name */}
                  <span
                    className="absolute text-center opacity-10 select-none"
                    style={{
                      fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif",
                      fontSize: "clamp(2rem, 8vw, 5rem)",
                      fontWeight: 700,
                      color: "#A0A0A0",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      writingMode: "horizontal-tb",
                    }}
                  >
                    LYAHUASCA
                  </span>
                  {/* Subtle grain overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  {/* Subtle scan line effect */}
                  <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                    }}
                  />
                </div>
                <p
                  className="mt-4 text-xs uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#0D0D0D" }}
                >
                  LYAHUASCA
                </p>
              </div>

              {/* MIKI.NGLO */}
              <div className="flex flex-col">
                <div
                  className="aspect-[3/4] max-h-[300px] md:max-h-none overflow-hidden relative flex items-center justify-center"
                  style={{
                    background: "linear-gradient(180deg, #1C1C1E 0%, #0D0D0D 100%)",
                  }}
                >
                  {/* Large watermark name */}
                  <span
                    className="absolute text-center opacity-10 select-none"
                    style={{
                      fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif",
                      fontSize: "clamp(2rem, 8vw, 5rem)",
                      fontWeight: 700,
                      color: "#A0A0A0",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    MIKI.NGLO
                  </span>
                  {/* Subtle grain overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  {/* Subtle scan line effect */}
                  <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                    }}
                  />
                </div>
                <p
                  className="mt-4 text-xs uppercase tracking-widest"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#0D0D0D" }}
                >
                  MIKI.NGLO
                </p>
              </div>
            </div>

            {/* Right Column - 65% */}
            <div className="md:col-span-3 flex flex-col justify-center">
              <div className="space-y-12">
                <div>
                  <p
                    className="text-xs uppercase tracking-widest mb-2"
                    style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}
                  >
                    LYAHUASCA
                  </p>
                  <p
                    className="text-xs uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#0D0D0D" }}
                  >
                    ART DIRECTION / PRODUCT DEVELOPMENT / 3D VISUALS
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-widest mb-2"
                    style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}
                  >
                    MIKI.NGLO
                  </p>
                  <p
                    className="text-xs uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#0D0D0D" }}
                  >
                    3D PRINTING / GRAPHIC DESIGN / WEB DEVELOPMENT
                  </p>
                </div>
                <p
                  className="text-xs mt-8"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}
                >
                  [PROCESS DOCUMENTATION AVAILABLE UPON REQUEST]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #D5D5D5" }} />

      {/* Acquisition */}
      <section
        id="acquisition"
        className="relative py-40 px-8 md:px-[15vw]"
        style={{ background: "rgba(13,13,13,0.75)" }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 flex items-center gap-4">
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
            >
              [03]
            </span>
            <h2
              className="text-3xl md:text-4xl font-semibold"
              style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}
            >
              ACQUISITION
            </h2>
          </div>

          {/* List - No filter chips */}
          <div className="space-y-0">
            {/* Item 1 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-[#D5D5D5]">
              <div className="flex items-center gap-4 md:gap-6">
                <span
                  className="text-xs"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
                >
                  001
                </span>
                <span
                  className="text-xl"
                  style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}
                >
                  STARMIRROR — COLLECTIBLE
                </span>
              </div>
              <div className="flex items-center gap-4 md:gap-6 mt-2 md:mt-0">
                <span
                  className="text-xs"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}
                >
                  PLA, Spray-painted
                </span>
                <span
                  className="text-xs"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
                >
                  Available
                </span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-[#D5D5D5]">
              <div className="flex items-center gap-4 md:gap-6">
                <span
                  className="text-xs"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
                >
                  002
                </span>
                <span
                  className="text-xl"
                  style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}
                >
                  PHYLACTERY — CAPSULE
                </span>
              </div>
              <div className="flex items-center gap-4 md:gap-6 mt-2 md:mt-0">
                <span
                  className="text-xs"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}
                >
                  Resin, Hand-finished
                </span>
                <span
                  className="text-xs"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
                >
                  Available
                </span>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-[#D5D5D5]">
              <div className="flex items-center gap-4 md:gap-6">
                <span
                  className="text-xs"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
                >
                  003
                </span>
                <span
                  className="text-xl"
                  style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}
                >
                  TIARA — HEADPIECE
                </span>
              </div>
              <div className="flex items-center gap-4 md:gap-6 mt-2 md:mt-0">
                <span
                  className="text-xs"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}
                >
                  Chrome-electroplated Resin
                </span>
                <span
                  className="text-xs"
                  style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#D0403B" }}
                >
                  SOLD OUT
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #D5D5D5" }} />

      {/* Process - Single column, left aligned */}
      <section
        id="process"
        className="relative py-40 px-8 md:px-[15vw]"
        style={{ background: "rgba(240,240,240,0.75)" }}
      >
        <div className="max-w-[42rem] ml-[8vw] md:ml-[15vw] mr-[8vw] md:mr-0">
          {/* Section Header */}
          <div className="mb-16 flex items-center gap-4">
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
            >
              [04]
            </span>
            <h2
              className="text-3xl md:text-4xl font-semibold"
              style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}
            >
              PROCESS
            </h2>
          </div>

          {/* Chapter 01 */}
          <div className="mb-32">
            <span
              className="text-xs block mb-4"
              style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
            >
              [01]
            </span>
            <h3
              className="text-2xl mb-4"
              style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}
            >
              CONCEPTION
            </h3>
            <p
              className="text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-body), 'Inter', sans-serif", color: "#9A9A9A" }}
            >
              Every artifact begins as a thought. A meditation on form, function, and the relationship between object and owner.
            </p>
          </div>

          {/* Chapter 02 */}
          <div className="mb-32">
            <span
              className="text-xs block mb-4"
              style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
            >
              [02]
            </span>
            <h3
              className="text-2xl mb-4"
              style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}
            >
              FABRICATION
            </h3>
            <p
              className="text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-body), 'Inter', sans-serif", color: "#9A9A9A" }}
            >
              3D-printed in PLA, hand-sanded and spray-painted — each piece finished with care and edge.
            </p>
          </div>

          {/* Chapter 03 */}
          <div>
            <span
              className="text-xs block mb-4"
              style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}
            >
              [03]
            </span>
            <h3
              className="text-2xl mb-4"
              style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}
            >
              FINITION
            </h3>
            <p
              className="text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-body), 'Inter', sans-serif", color: "#9A9A9A" }}
            >
              Chrome-electroplated, 3D-printed in resin. Hand-polished. No two pieces identical.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #D5D5D5" }} />

      {/* Transmit */}
      <section
        id="transmit"
        className="relative py-40 px-8 md:px-[15vw] overflow-hidden"
        style={{ background: "rgba(245,245,245,0.85)" }}
      >
        {/* Video Background */}
        <video
          className="video-bg"
          src="/assets/video-contact.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="video-overlay bg-black/50" />

        <div className="video-content max-w-[42rem]">
          {/* Section Header */}
          <div className="mb-8 flex items-center gap-4">
            <span
              className="text-xs"
              style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "rgba(255,255,255,0.6)" }}
            >
              [05]
            </span>
          </div>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-16"
            style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#FFFFFF", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            TRANSMIT
          </h2>

          {/* Form - Full rectangular borders */}
          <form className="space-y-8">
            <div>
              <label
                className="block text-xs uppercase tracking-widest mb-2"
                style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em" }}
              >
                NAME
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-white/90"
                style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace" }}
              />
            </div>

            <div>
              <label
                className="block text-xs uppercase tracking-widest mb-2"
                style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em" }}
              >
                EMAIL
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-white/90"
                style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace" }}
              />
            </div>

            <div>
              <label
                className="block text-xs uppercase tracking-widest mb-2"
                style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em" }}
              >
                ARTIFACT
              </label>
              <input
                type="text"
                placeholder="Which piece interests you?"
                className="w-full bg-white/90"
                style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace" }}
              />
            </div>

            <div>
              <label
                className="block text-xs uppercase tracking-widest mb-2"
                style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em" }}
              >
                MESSAGE
              </label>
              <textarea
                placeholder="Describe your interest or inquiry..."
                rows={4}
                className="w-full resize-none bg-white/90"
                style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace" }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 uppercase tracking-wider"
              style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", background: "#FFFFFF", color: "#0D0D0D" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#A0A0A0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FFFFFF";
              }}
            >
              SUBMIT
            </button>
          </form>
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #D5D5D5" }} />

      {/* Footer */}
      <footer
        className="relative py-6 px-8 md:px-[15vw] overflow-hidden"
        style={{ background: "var(--void)" }}
      >
        {/* Video Background */}
        <video
          className="video-bg"
          src="/assets/video-footer.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: 0.4 }}
        />
        <div className="video-overlay bg-black/30" />

        <div className="video-content flex flex-col md:flex-row items-center justify-between gap-3">
          <div
            className="text-xs"
            style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#FFFFFF", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
          >
            DEFACT © 2026
          </div>

          <div
            className="text-xs"
            style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "rgba(255,255,255,0.7)", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
          >
            COLOGNE, GERMANY
          </div>

          <div
            className="text-xs"
            style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "rgba(255,255,255,0.7)", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}
          >
            ARCHIVE
          </div>
        </div>
      </footer>
    </main>
  );
}