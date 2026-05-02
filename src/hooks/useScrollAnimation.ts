"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Fade in + slide up all sections
      const sections = containerRef.current?.querySelectorAll(".animate-section");
      sections?.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Stagger children within sections
      const staggerContainers = containerRef.current?.querySelectorAll(".stagger-children");
      staggerContainers?.forEach((container) => {
        const children = container.children;
        gsap.fromTo(
          children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Parallax for video backgrounds
      const videoBgs = containerRef.current?.querySelectorAll(".parallax-bg");
      videoBgs?.forEach((bg) => {
        gsap.to(bg, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: bg.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
