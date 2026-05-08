"use client";

import { useState } from "react";
import Image from "next/image";

interface V2Asset {
  src: string;
  alt: string;
  label: string;
  subtitle: string;
}

const v2Assets: V2Asset[] = [
  {
    src: "/images/v2/artifact_abyss.jpg",
    alt: "Artifact Abyss",
    label: "01.01",
    subtitle: "ABYSS — DEEP CERAMIC",
  },
  {
    src: "/images/v2/artifact_fault.jpg",
    alt: "Artifact Fault",
    label: "01.02",
    subtitle: "FAULT — FRACTURE LINES",
  },
  {
    src: "/images/v2/artifact_horizon.jpg",
    alt: "Artifact Horizon",
    label: "01.03",
    subtitle: "HORIZON — CHROME RIM",
  },
  {
    src: "/images/v2/manifesto.jpg",
    alt: "Manifesto",
    label: "02.00",
    subtitle: "MANIFESTO — RITUAL OBJECTS",
  },
  {
    src: "/images/v2/process.jpg",
    alt: "Process",
    label: "05.00",
    subtitle: "PROCESS — LAYER LINES",
  },
  {
    src: "/images/v2/hero.jpg",
    alt: "Hero",
    label: "00.00",
    subtitle: "HERO — CLINICAL ARCHIVE",
  },
];

function V2Card({ asset, index }: { asset: V2Asset; index: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative group" data-cursor-hover>
      {/* Frame */}
      <div className="relative aspect-[4/5] bg-zinc-900/30 overflow-hidden">
        {/* Image */}
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, 33vw"
          onLoad={() => setLoaded(true)}
          unoptimized
        />

        {/* Loading skeleton */}
        {!loaded && <div className="absolute inset-0 bg-zinc-800/50 animate-pulse" />}

        {/* Border overlay */}
        <div className="absolute inset-3 border border-white/10 pointer-events-none" />

        {/* Top label */}
        <div className="absolute top-4 left-4 z-10">
          <span className="font-dm-mono text-micro tracking-mono text-white/50 block">
            {asset.label}
          </span>
        </div>

        {/* Bottom label */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="font-dm-mono text-micro tracking-mono text-white/70 uppercase">
            {asset.subtitle}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />
      </div>
    </div>
  );
}

export default function V2GallerySection() {
  return (
    <section id="v2-gallery" data-theme="dark" className="relative py-grid-1 bg-void">
      <div className="max-w-[90vw] mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="flex items-baseline gap-4 mb-8 reveal-up">
          <span className="font-dm-mono text-micro tracking-mono text-white/40">[V2]</span>
          <h2 className="font-clash text-h2 tracking-tight text-white">V2 ASSETS</h2>
        </div>

        {/* Grid — 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {v2Assets.map((asset, i) => (
            <div
              key={asset.label}
              className="reveal-up"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <V2Card asset={asset} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 pt-8 border-t border-white/10 reveal-up">
          <p className="font-dm-mono text-micro tracking-mono text-white/30">
            GENERATED VIA FLUX ON POLLINATIONS.AI — CLINICAL ARCHIVE AESTHETIC
          </p>
        </div>
      </div>
    </section>
  );
}
