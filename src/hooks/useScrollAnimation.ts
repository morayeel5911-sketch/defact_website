"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollAnimationOptions {
  /** Parallax: verschiebt Element vertikal beim Scroll (yPercent) */
  parallax?: {
    yPercent?: number;
    start?: string;
    end?: string;
  };
  /** FadeInUp: Element erscheint von unten mit Fade */
  fadeInUp?: {
    y?: number;
    duration?: number;
    stagger?: number;
  };
  /** ScaleReveal: Element skaliert von klein zu groß */
  scaleReveal?: {
    scale?: number;
    duration?: number;
  };
  /** Pin: Section wird gepinnt */
  pin?: {
    end?: string;
  };
}

/**
 * Universal Scroll-Animation Hook für DEFACT Sections.
 * Jede Section verwendet ihren eigenen useRef + useEffect.
 * Cleanup automatisch via gsap.context().
 *
 * Usage:
 *   const sectionRef = useRef<HTMLElement>(null);
 *   useScrollAnimation(sectionRef, { parallax: { yPercent: 15 } });
 */
export function useScrollAnimation(
  containerRef: React.RefObject<HTMLElement | null>,
  options: ScrollAnimationOptions
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Parallax
      if (options.parallax) {
        const targets = el.querySelectorAll("[data-parallax]");
        if (targets.length === 0) {
          // Fallback: container selbst animieren
          gsap.to(el, {
            yPercent: options.parallax.yPercent ?? 10,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: options.parallax.start ?? "top bottom",
              end: options.parallax.end ?? "bottom top",
              scrub: true,
            },
          });
        } else {
          targets.forEach((target) => {
            const y = parseFloat(target.getAttribute("data-parallax") ?? "10");
            gsap.to(target, {
              yPercent: y,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: options.parallax?.start ?? "top bottom",
                end: options.parallax?.end ?? "bottom top",
                scrub: true,
              },
            });
          });
        }
      }

      // FadeInUp — auf Kinder mit data-reveal
      if (options.fadeInUp) {
        const targets = el.querySelectorAll("[data-reveal]");
        if (targets.length > 0) {
          gsap.from(
            targets,
            {
              y: options.fadeInUp.y ?? 40,
              opacity: 0,
              duration: options.fadeInUp.duration ?? 1,
              stagger: options.fadeInUp.stagger ?? 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // ScaleReveal
      if (options.scaleReveal) {
        const targets = el.querySelectorAll("[data-scale-reveal]");
        if (targets.length > 0) {
          gsap.from(
            targets,
            {
              scale: options.scaleReveal.scale ?? 0.9,
              opacity: 0,
              duration: options.scaleReveal.duration ?? 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // Pin
      if (options.pin) {
        ScrollTrigger.create({
          trigger: el,
          pin: true,
          end: options.pin.end ?? "+=100%",
          scrub: true,
        });
      }
    }, el);

    return () => ctx.revert();
  }, [containerRef, options]);
}

export default useScrollAnimation;
