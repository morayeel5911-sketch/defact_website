"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let isHovering = false;
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    const onMouseEnterLink = (e: Event) => {
      const target = e.target as HTMLElement;
      const text = target.getAttribute("data-cursor") || "VIEW";
      isHovering = true;
      gsap.to(cursor, { scale: 3, duration: 0.4, ease: "power2.out" });
      gsap.to(cursor, { backgroundColor: "rgba(57, 255, 20, 0.8)", duration: 0.2 });
      label.textContent = text;
      label.style.opacity = "1";
    };
    
    const onMouseLeaveLink = () => {
      isHovering = false;
      gsap.to(cursor, { scale: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(cursor, { backgroundColor: "rgba(57, 255, 20, 0.6)", duration: 0.2 });
      label.style.opacity = "0";
    };
    
    window.addEventListener("mousemove", onMouseMove);
    
    // Apply to links, buttons, and [data-cursor-hover]
    const addListeners = () => {
      document.querySelectorAll("a, button, [data-cursor-hover]").forEach(el => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };
    
    addListeners();
    
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    
    const tick = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    
    const raf = requestAnimationFrame(tick);
    
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);
  
  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: "rgba(57, 255, 20, 0.6)",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        willChange: "transform",
      }}
    >
      <span 
        ref={labelRef} 
        style={{ 
          fontSize: "6px", 
          color: "#fff", 
          opacity: 0,
          transition: "opacity 0.3s",
          whiteSpace: "nowrap",
          fontFamily: "var(--font-dm-mono)",
          letterSpacing: "0.1em",
        }} 
      />
    </div>
  );
}
