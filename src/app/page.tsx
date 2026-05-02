"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
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
    <div className="fixed top-0 left-0 w-full h-screen z-0 flex items-center justify-center bg-void">
      <div className="font-dm-mono text-micro tracking-mono text-steel uppercase">
        [INITIALIZING]
      </div>
    </div>
  ),
});

const ProductModel = dynamic(() => import("@/components/ProductModel"), { ssr: false });

export default function Home() {
  const [currentTheme, setCurrentTheme] = useState("dark");
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
      { threshold: 0.5, rootMargin: "-64px 0px 0px 0px" }
    );

    document.querySelectorAll("[data-theme]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative w-full bg-void text-signal">
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
  );
}
