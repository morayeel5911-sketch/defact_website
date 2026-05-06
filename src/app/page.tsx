"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import SectionNav from "@/components/SectionNav";
import useScrollReveal from "@/hooks/useScrollReveal";

import HeroSection from "@/sections/HeroSection";
import ArtifactsSection from "@/sections/ArtifactsSection";
import ManifestoSection from "@/sections/ManifestoSection";
import ProtocolSection from "@/sections/ProtocolSection";
import AcquisitionSection from "@/sections/AcquisitionSection";
import ProcessSection from "@/sections/ProcessSection";
import TransmitSection from "@/sections/TransmitSection";
import CreatorBiosSection from "@/sections/CreatorBiosSection";
import V2GallerySection from "@/sections/V2GallerySection";
import Footer from "@/sections/Footer";

// ScrollProgress is kept here (not in ClientWrapper) since it depends on section names
import ScrollProgress from "@/components/ScrollProgress";

import InterfaceGrid from "@/components/InterfaceGrid";

const Scene = dynamic(() => import("@/components/Scene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <div className="font-dm-mono text-micro tracking-mono text-steel uppercase">
        [INITIALIZING]
      </div>
    </div>
  ),
});

const ProductModel = dynamic(() => import("@/components/ProductModel"), { ssr: false });

const sectionNames = [
  "Hero",
  "Artifacts",
  "Manifesto",
  "Protocol",
  "Acquisition",
  "Process",
  "V2 Gallery",
  "Transmit",
  "Creators",
  "Footer",
];

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [loaded, setLoaded] = useState(false);
  useScrollReveal();

  // Theme observer — deduplicated: SectionNav reads from here instead of running its own
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute("data-theme") || "dark";
            setCurrentTheme(theme);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-64px 0px 0px 0px" }
    );

    document.querySelectorAll("[data-theme]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handlePreloaderDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Preloader onComplete={handlePreloaderDone} />

      <main className={`relative w-full bg-void text-signal transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <ScrollProgress sections={sectionNames} />
        <SectionNav sections={sectionNames} />
        <Navigation theme={currentTheme} />
        <CustomCursor />

        {/* ScrollEffects + AmbientSound are handled by ClientWrapper in layout.tsx */}

        <div className="grain-overlay" />
        <InterfaceGrid />

        <HeroSection />
        <ArtifactsSection />
        <ManifestoSection />
        <ProtocolSection />
        <AcquisitionSection />
        <ProcessSection />
        <V2GallerySection />
        <TransmitSection />
        <CreatorBiosSection />
        <Footer />
      </main>
    </>
  );
}