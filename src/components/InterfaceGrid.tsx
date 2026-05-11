"use client";

/**
 * HUD Interface Grid — Per-Section Background Pattern
 *
 * Adaptive color: grid lines contrast against section background.
 * - dark sections (bg-void) → white grid
 * - light sections (bg-signal) → dark grid
 * - chrome sections (bg-chrome) → dark grid
 *
 * Rendered INSIDE each section as z-0 background layer,
 * so content (z-10+) appears ABOVE the grid.
 */

type GridTheme = "dark" | "light" | "chrome";

const GRID_COLORS: Record<GridTheme, string> = {
  dark: "rgba(240,240,240,0.12)",    // white/signal at 12%
  light: "rgba(13,13,13,0.08)",      // void at 8%
  chrome: "rgba(13,13,13,0.08)",     // void at 8%
};

function buildGridSvg(strokeColor: string): string {
  return encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <g>
    <line x1="60" y1="0" x2="60" y2="55" stroke="${strokeColor}" stroke-width="1"/>
    <line x1="60" y1="65" x2="60" y2="120" stroke="${strokeColor}" stroke-width="1"/>
    <line x1="0" y1="60" x2="55" y2="60" stroke="${strokeColor}" stroke-width="1"/>
    <line x1="65" y1="60" x2="120" y2="60" stroke="${strokeColor}" stroke-width="1"/>
    <circle cx="60" cy="60" r="1.5" fill="${strokeColor}"/>
  </g>
</svg>
`.trim());
}

interface InterfaceGridProps {
  theme?: GridTheme;
  className?: string;
}

export default function InterfaceGrid({ theme = "dark", className = "" }: InterfaceGridProps) {
  const strokeColor = GRID_COLORS[theme];
  const gridSvg = buildGridSvg(strokeColor);

  return (
    <div
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,${gridSvg}")`,
        backgroundSize: "120px 120px",
      }}
      aria-hidden="true"
    />
  );
}
