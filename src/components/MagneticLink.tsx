"use client";

/* MagneticLink — React Hook-based magnetic hover effect */
import { useRef, useCallback } from "react";
import gsap from "gsap";

interface MagneticLinkProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number; // 0-1, default 0.3
}

export default function MagneticLink({
  children,
  className = "",
  href,
  onClick,
  strength = 0.3,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = (e.clientX - centerX) * strength;
      const distY = (e.clientY - centerY) * strength;

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

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </a>
  );
}
