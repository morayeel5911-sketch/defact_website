"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import SectionNav from "@/components/SectionNav";
import useScrollReveal from "@/hooks/useScrollReveal";

import HeroSection from "@/sections/HeroSection";
import ObjectsSection from "@/sections/ObjectsSection";
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
  "Objects",
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

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />

      <main className={`relative w-full bg-void text-signal transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <ScrollProgress sectionNames={sectionNames} />
        <SectionNav sections={sectionNames} />
        <Navigation theme={currentTheme} />
        <CustomCursor />

        <div className="grain-overlay" />

        <HeroSection
          scene={
            <Scene>
              <ProductModel scale={1.2} variant="chrome" />
            </Scene>
          }
        />
        <ObjectsSection />
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
