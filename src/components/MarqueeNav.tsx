"use client";

import { useRef, useEffect } from "react";

const ITEMS = ["ARTIFACTS", "MANIFESTO", "PROTOCOL", "ACQUISITION", "PROCESS", "TRANSMIT", "SHOP", "CONTACT"];

export default function MarqueeNav() {
  const trackRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    
    let pos = 0;
    const speed = 0.8;
    
    const animate = () => {
      pos -= speed;
      if (Math.abs(pos) >= el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(animate);
    };
    
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);
  
  return (
    <div style={{ 
      overflow: "hidden", 
      whiteSpace: "nowrap",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      padding: "16px 0",
      fontFamily: "var(--font-dm-mono)",
      fontSize: "11px",
      letterSpacing: "0.2em",
    }}>
      <div ref={trackRef} style={{ display: "inline-flex", gap: "80px" }}>
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <a 
            key={i} 
            href={`#${item.toLowerCase()}`}
            style={{ 
              color: "rgba(255,255,255,0.35)", 
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.color = "#39FF14"}
            onMouseLeave={(e) => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.35)"}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
