"use client";
import { useState, useEffect, useRef } from "react";

export function useThrottledMouse(fps: number = 10) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const lastUpdate = useRef(0);
  const pendingPos = useRef({ x: 0.5, y: 0.5 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const interval = 1000 / fps;

    const handleMouseMove = (e: MouseEvent) => {
      pendingPos.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };

      const now = performance.now();
      if (now - lastUpdate.current >= interval) {
        lastUpdate.current = now;
        setMousePos(pendingPos.current);
      } else if (rafId.current === null) {
        rafId.current = requestAnimationFrame(() => {
          rafId.current = null;
          setMousePos(pendingPos.current);
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [fps]);

  return mousePos;
}
