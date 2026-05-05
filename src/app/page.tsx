"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import SectionNav from "@/components/SectionNav";
import ScrollEffects from "@/components/ScrollEffects";
import AmbientSound from "@/components/AmbientSound";
import useScrollReveal from "@/hooks/useScrollReveal";
import { initLenis, destroyLenis } from "@/lib/lenis";

import HeroSection from "@/sections/HeroSection";
import ArtifactsSection from "@/sections/ArtifactsSection";
import ManifestoSection from "@/sections/ManifestoSection";
import ProtocolSection from "@/sections/ProtocolSection";
import AcquisitionSection from "@/sections/AcquisitionSection";
import ProcessSection from "@/sections/ProcessSection";
import TransmitSection from "@/sections/TransmitSection";
import Footer from "@/sections/Footer";

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
  "Transmit",
  "Footer",
];

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [loaded, setLoaded] = useState(false);
  useScrollReveal();

  // Lenis smooth scroll — lifecycle managed here (was in ClientWrapper)
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  // Theme observer — combines Navigation theme + SectionNav highlighting
  // (deduped: SectionNav now receives activeSection from this observer)
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
        <ScrollEffects />
        <AmbientSound />

        <div className="grain-overlay" />

        <HeroSection />
        <ArtifactsSection />
        <ManifestoSection />
        <ProtocolSection />
        <AcquisitionSection />
        <ProcessSection />
        <TransmitSection />
        <Footer />
      </main>
    </>
  );
}