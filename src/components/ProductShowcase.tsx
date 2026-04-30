"use client";

import { useRef } from "react";
import Scene from "./Scene";
import ProductModel from "./ProductModel";

export default function ProductShowcase() {
  const modelRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={modelRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)" }}
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Scene>
          <ProductModel scale={1.2} />
        </Scene>
      </div>

      {/* Overlay Text */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        {/* Product Name */}
        <h2
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#111111" }}
        >
          STAR MIRROR
        </h2>

        {/* Tagline */}
        <p
          className="mt-4 text-xl md:text-2xl italic"
          style={{
            fontFamily: "var(--font-quote), 'Playfair Display', serif",
            fontStyle: "italic",
            color: "#7A7A7A"
          }}
        >
          A mirror. A relic. A charm.
        </p>

        {/* Datasheet Block */}
        <div
          className="mt-8 p-4 border border-[#E6E6E6] bg-white/60 backdrop-blur-sm"
          style={{
            fontFamily: "var(--font-mono), 'DM Mono', monospace",
            fontSize: "0.75rem",
            color: "#7A7A7A"
          }}
        >
          <p>SURFACE // ACTIVE</p>
          <p>COMPOSITION // BRONZE + RESIN</p>
          <p>FINISH // HAND POLISHED</p>
          <p>DIMENSION // 320×220×85mm</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce"
        style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", fontSize: "0.75rem", color: "#7A7A7A" }}
      >
        <span style={{ color: "#808080" }}>&gt;</span> INITIALIZE_SCROLL
        <span className="ml-2">↓</span>
      </div>
    </section>
  );
}