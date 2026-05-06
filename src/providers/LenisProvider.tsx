"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once — single source of truth
gsap.registerPlugin(ScrollTrigger);

interface LenisContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: Record<string, unknown>) => void;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const l = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
    });

    // Sync with GSAP ScrollTrigger
    l.on("scroll", ScrollTrigger.update);

    // GSAP ticker drives Lenis RAF
    gsap.ticker.add((time) => {
      l.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    setLenis(l);

    return () => {
      l.destroy();
      setLenis(null);
    };
  }, []);

  const scrollTo = (target: string | number | HTMLElement, options?: Record<string, unknown>) => {
    if (lenis) lenis.scrollTo(target, options);
  };

  return (
    <LenisContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
