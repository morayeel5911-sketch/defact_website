"use client";

import { createContext, useContext, useEffect, useRef } from "react";
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
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const l = new Lenis({
      lerp: 0.06,
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
    });

    // Sync with GSAP ScrollTrigger
    l.on("scroll", ScrollTrigger.update);

    // GSAP ticker drives Lenis RAF
    const ticker = (time: number) => {
      l.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = l;

    return () => {
      gsap.ticker.remove(ticker);
      l.off("scroll", ScrollTrigger.update);
      l.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (target: string | number | HTMLElement, options?: Record<string, unknown>) => {
    if (lenisRef.current) lenisRef.current.scrollTo(target, options);
  };

  const contextValue: LenisContextValue = {
    get lenis() {
      return lenisRef.current;
    },
    scrollTo,
  };

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
}
