"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import SectionNav from "@/components/SectionNav";
import useScrollReveal from "@/hooks/useScrollReveal";

import HeroSection from "@/sections/HeroSection";
import ArtifactsSection from "@/sections/ArtifactsSection";
import ManifestoSection from "@/sections/ManifestoSection";
import ProtocolSection from "@/sections/ProtocolSection";
import ProcessSection from "@/sections/ProcessSection";
import TransmitSection from "@/sections/TransmitSection";
import CreatorBiosSection from "@/sections/CreatorBiosSection";
import V2GallerySection from "@/sections/V2GallerySection";
import Footer from "@/sections/Footer";

// ScrollProgress is kept here (not in ClientWrapper) since it depends on section names
import ScrollProgress from "@/components/ScrollProgress";

// Register ScrollTrigger (redundant/safe since LenisProvider also does this)
gsap.registerPlugin(ScrollTrigger);

const sectionNames = [
  "Hero",
  "Artifacts",
  "Manifesto",
  "Protocol",
  "Process",
  "V2 Gallery",
  "Transmit",
  "Creators",
  "Footer",
];

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [loaded, setLoaded] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  useScrollReveal();

  // ScrollTrigger global config — setup
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

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

      <main ref={mainRef} className={`relative w-full bg-void text-signal transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <ScrollProgress sections={sectionNames} />
        <SectionNav sections={sectionNames} />
        <Navigation theme={currentTheme} />
        <CustomCursor />

        {/* ScrollEffects + AmbientSound are handled by ClientWrapper in layout.tsx */}

        <div className="grain-overlay" />

        <HeroSection />
        <ArtifactsSection />
        <ManifestoSection />
        <ProtocolSection />
        <ProcessSection />
        <V2GallerySection />
        <TransmitSection />
        <CreatorBiosSection />
        <Footer />
      </main>
    </>
  );
}
