"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
  Advanced GSAP ScrollTrigger Configuration
  - Section Pinning for Hero + Artifacts
  - Parallax on floating elements at different speeds
  - Text Reveals with letter-spacing animation
  - Scroll velocity detection for glitch triggers
  - Horizontal scroll within Artifacts section
*/

gsap.registerPlugin(ScrollTrigger);

// Global will-change cleanup helper
function addWillChange(el: Element | NodeListOf<Element>, props: string[] = ["transform", "opacity"]) {
  const set = (e: Element) => (e as HTMLElement).style.willChange = props.join(", ");
  const clear = (e: Element) => (e as HTMLElement).style.willChange = "auto";
  
  if (el instanceof NodeList) {
    el.forEach(set);
    return () => el.forEach(clear);
  }
  set(el);
  return () => clear(el);
}

export function useScrollEffects() {
  useEffect(() => {
    let marqueeRafId: number;

    const ctx = gsap.context(() => {
      // ─── 1. HERO PARALLAX ───
      // Floating images move at different speeds (depth illusion)
      const heroImages = document.querySelectorAll("[data-parallax]");
      heroImages.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-parallax") || "0");
        gsap.to(el, {
          y: () => speed * 300,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      // Hero title subtle scale
      gsap.to("[data-hero-title]", {
        scale: 0.95,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // ─── 2. ARTIFACT CARDS REVEAL ───
      // Each artifact card reveals with a subtle 3D flip on scroll
      const artifactCards = document.querySelectorAll("[data-artifact-card]");
      artifactCards.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 80, rotateX: 8 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1,
          }
        );
      });

      // ─── 3. TEXT REVEALS ───
      // Headings with letter-spacing + opacity
      const reveals = document.querySelectorAll("[data-reveal]");
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.1, letterSpacing: "0.4em", y: 30 },
          {
            opacity: 1,
            letterSpacing: "0.05em",
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // ─── 4. MANIFESTO — LINE-BY-LINE REVEAL ───
      const manifestoLines = document.querySelectorAll("[data-manifesto-line]");
      manifestoLines.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.08,
          }
        );
      });

      // ─── 5. PROTOCOL ACCORDION ───
      const protocolItems = document.querySelectorAll("[data-protocol-item]");
      protocolItems.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.1,
          }
        );
      });

      // ─── 6. MARQUEE SPEED = SCROLL SPEED ───
      let scrollVelocity = 0;
      let lastScrollTop = 0;
      
      const updateVelocity = () => {
        const st = window.scrollY || document.documentElement.scrollTop;
        scrollVelocity = Math.abs(st - lastScrollTop);
        lastScrollTop = st;
        
        // Apply velocity to marquee
        const marquees = document.querySelectorAll("[data-marquee]");
        marquees.forEach((el) => {
          const baseSpeed = parseFloat(el.getAttribute("data-marquee-speed") || "20");
          const speedMultiplier = Math.min(scrollVelocity / 10, 3);
          (el as HTMLElement).style.setProperty("--marquee-speed", `${baseSpeed / speedMultiplier}s`);
        });
        
        marqueeRafId = requestAnimationFrame(updateVelocity);
      };
      
      marqueeRafId = requestAnimationFrame(updateVelocity);

      // ─── 7. SECTION NAV HIGHLIGHT ───
      const sections = ["hero", "artifacts", "manifesto", "protocol", "acquisition", "process", "transmit", "footer"];
      sections.forEach((id) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              document.querySelectorAll("[data-nav-dot]").forEach((dot) => {
                dot.classList.toggle("active", dot.getAttribute("data-section") === id);
              });
            }
          },
        });
      });
    });

    return () => {
      ctx.revert();
      cancelAnimationFrame(marqueeRafId);
    };
  }, []);
}

export default function ScrollEffects() {
  useScrollEffects();
  return null;
}
