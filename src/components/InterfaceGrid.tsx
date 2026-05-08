"use client";

/**
 * HUD Interface Grid — CSS Background Pattern (Safari-Performance-Optimized)
 *
 * Uses a CSS background-image with an encoded SVG pattern tile.
 * Safari renders background-images as composited layers (GPU-accelerated),
 * avoiding the SVG pattern DOM performance penalty.
 */

const GRID_SVG = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <g opacity="0.5">
    <line x1="60" y1="0" x2="60" y2="55" stroke="white" stroke-width="1"/>
    <line x1="60" y1="65" x2="60" y2="120" stroke="white" stroke-width="1"/>
    <line x1="0" y1="60" x2="55" y2="60" stroke="white" stroke-width="1"/>
    <line x1="65" y1="60" x2="120" y2="60" stroke="white" stroke-width="1"/>
    <circle cx="60" cy="60" r="1.8" fill="white" opacity="0.6"/>
  </g>
</svg>
`.trim());

export default function InterfaceGrid() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{
        backgroundImage: `url("data:image/svg+xml,${GRID_SVG}")`,
        backgroundSize: "var(--grid-size) var(--grid-size)",
        opacity: 1,
      }}
      aria-hidden="true"
    />
  );
}
