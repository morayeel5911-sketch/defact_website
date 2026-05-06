"use client";

import { useState } from "react";
import Image from "next/image";
import { products, type Product } from "@/data/products";

const CATEGORY_PILLS = ["3D PRINTING", "ART DIRECTION", "MERCHANDISE", "TECHNOLOGY", "CONCEPT", "MISC"] as const;

function ArtifactCard({ artifact, index }: { artifact: Product; index: number }) {
  const [imgError, setImgError] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div data-artifact-card className={`relative flex flex-col lg:flex-row ${isEven ? "" : "lg:flex-row-reverse"} gap-8 lg:gap-16 min-h-[80vh] items-center py-16`}>
      {/* Annotation line */}
      <div className={`hidden lg:block absolute top-0 ${isEven ? "left-[48%]" : "right-[48%]"} w-px h-24 bg-white/20`} />

      {/* Image side */}
      <div className="relative w-full lg:w-1/2 aspect-square lg:aspect-[4/5] bg-zinc-900/30 rounded-sm overflow-hidden group">
        {/* Border frame */}
        <div className="absolute inset-4 border border-white/10 rounded-sm" />
        
        {/* Shuriken Image */}
        {imgError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs tracking-widest text-white/30 font-mono uppercase">
              {artifact.name}
            </span>
          </div>
        ) : (
          <Image
            src={artifact.image}
            alt={artifact.name}
            fill
            className="object-contain p-12 transition-all duration-500 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_30px_rgba(57,255,20,0.3)]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            onError={() => setImgError(true)}
            unoptimized
          />
        )}

        {/* Labels */}
        <span className="absolute top-6 left-6 text-[10px] tracking-widest text-white/40 font-mono z-10">
          FIG. {artifact.id}
        </span>
        <span className="absolute bottom-6 right-6 text-[10px] tracking-widest text-white/40 font-mono z-10">
          {artifact.status}
        </span>
      </div>

      {/* Text side */}
      <div className="w-full lg:w-1/2 space-y-8">
        <div className="border-l border-white/20 pl-6">
          <span className="text-[10px] tracking-[0.3em] text-white/50 block mb-2 font-mono">
            {artifact.id}
          </span>
          <h3 className="font-display text-4xl lg:text-5xl uppercase text-white leading-[0.9]">
            {artifact.name}
          </h3>
          <p className="text-sm tracking-wider text-white/60 mt-2 uppercase font-mono">
            {artifact.tagline}
          </p>
        </div>

        <p className="text-base leading-relaxed text-white/80 max-w-md">
          {artifact.description}
        </p>

        {/* Specs grid */}
        <div className="grid grid-cols-3 gap-6 border-t border-white/20 pt-6">
          <div>
            <span className="text-[10px] tracking-[0.2em] text-white/60 uppercase block">Material</span>
            <span className="font-mono text-sm text-white mt-1 block">{artifact.specs.material}</span>
          </div>
          <div>
            <span className="text-[10px] tracking-[0.2em] text-white/60 uppercase block">Weight</span>
            <span className="font-mono text-sm text-white mt-1 block">{artifact.specs.weight}</span>
          </div>
          <div>
            <span className="text-[10px] tracking-[0.2em] text-white/60 uppercase block">Edition</span>
            <span className="font-mono text-sm text-white mt-1 block">{artifact.specs.edition}</span>
          </div>
        </div>

        <div className="flex items-center gap-6 pt-2">
          <span className="font-mono text-lg text-white">{artifact.price}</span>
          <a
            href="https://defact.world"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-[0.3em] text-white/60 hover:text-white transition-colors uppercase font-mono"
          >
            {artifact.status === "COMING_SOON" ? "NOTIFY ME →" : "SHOP →"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ArtifactsSection() {
  return (
    <section id="works" data-theme="dark" className="relative py-32 px-6 lg:px-16 min-h-screen bg-[#0a0a0a]">
      {/* Section header */}
      <div className="mb-32 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 border-b border-white/10 pb-8">
        <div>
          <span className="text-[10px] tracking-[0.3em] text-white/50 block mb-4 font-mono">
            DEFACT.ARTIFACTS
          </span>
          <h2 className="font-display text-5xl lg:text-7xl uppercase text-white leading-[0.9]">
            OBJECTS FOR<br />THE REAL
          </h2>
        </div>
        <p className="text-sm text-white/70 max-w-md lg:text-right">
          EXPLORE THE INTERSECTION OF CRAFTSMANSHIP AND DIGITAL PRECISION.
          EACH PIECE IS DESIGNED, 3D-PRINTED, AND HAND-FINISHED IN COLOGNE.
        </p>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-3 mb-24">
        {CATEGORY_PILLS.map((pill) => (
          <span key={pill} className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase border border-white/20 text-white/60 hover:border-white/40 hover:text-white/80 transition-all cursor-default">
            {pill}
          </span>
        ))}
      </div>

      {/* Artifacts */}
      <div className="space-y-48">
        {products.map((artifact, i) => (
          <ArtifactCard key={artifact.id} artifact={artifact} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-48 flex flex-col items-center gap-6">
        <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase text-center font-mono">
          ALL OBJECTS ARE MADE TO ORDER. CONTACT FOR CUSTOM EDITIONS.
        </p>
        <a
          href="https://defact.world"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-[0.2em] text-white border-b border-white pb-1 hover:opacity-70 transition-opacity uppercase font-mono"
        >
          VISIT THE SHOP →
        </a>
      </div>
    </section>
  );
}
