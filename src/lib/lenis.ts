"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger);

// Global Lenis instance
let lenisInstance: Lenis | null = null;

export function initLenis() {
  if (lenisInstance) return lenisInstance;
  
  lenisInstance = new Lenis({
    lerp: 0.08,          // Luxury smooth feel
    smoothWheel: true,
    wheelMultiplier: 0.7, // Heavy, weighted scroll
    touchMultiplier: 1.5,
  });
  
  // Sync Lenis mit GSAP ScrollTrigger
  lenisInstance.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    if (lenisInstance) lenisInstance.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  
  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
