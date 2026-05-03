"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Only show custom cursor on devices with fine pointer + hover support
    // AND if user hasn't requested reduced motion (WCAG 2.3.3)
    const mqHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mqHover.matches || mqMotion.matches) return;

    setShowCursor(true);

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Start OUTSIDE viewport so cursor doesn't flash at (0,0)
    let mouseX = -100, mouseY = -100;
    let cursorX = -100, cursorY = -100;
    let dotX = -100, dotY = -100;
    let hasMoved = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Make visible on first mouse movement
      if (!hasMoved) {
        hasMoved = true;
        cursor.style.opacity = "1";
        dot.style.opacity = "1";
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover], [role='button']")) {
        cursor.classList.add("cursor-hover");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover], [role='button']")) {
        cursor.classList.remove("cursor-hover");
      }
    };

    const animate = () => {
      // Smooth follow with different lerp speeds
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;

      cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
      dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;

      rafId = requestAnimationFrame(animate);
    };

    // Add body class for CSS cursor: none
    document.body.classList.add("has-custom-cursor");
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    
    rafId = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!showCursor) return null;

  return (
    <>
      {/* Outer ring — starts invisible until mouse moves */}
      <div
        ref={cursorRef}
        className="custom-cursor"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          border: "1px solid rgba(255,255,255,0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
          opacity: 0, // Hidden until first mousemove
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, opacity 0.2s ease",
        }}
      />
      {/* Center dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          background: "#fff",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          mixBlendMode: "difference",
          opacity: 0, // Hidden until first mousemove
        }}
      />
    </>
  );
}
