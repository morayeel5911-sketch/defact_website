"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

const MAX_DISPLACEMENT = 15;

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const distX = Math.max(
        -MAX_DISPLACEMENT,
        Math.min(MAX_DISPLACEMENT, (e.clientX - rect.left - rect.width / 2) * strength)
      );
      const distY = Math.max(
        -MAX_DISPLACEMENT,
        Math.min(MAX_DISPLACEMENT, (e.clientY - rect.top - rect.height / 2) * strength)
      );

      gsap.to(ref.current, {
        x: distX,
        y: distY,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [strength]
  );

  const handleLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  useEffect(() => {
    return () => {
      gsap.killTweensOf(ref.current);
    };
  }, []);

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`will-change-transform ${className}`}
    >
      {children}
    </button>
  );
}
