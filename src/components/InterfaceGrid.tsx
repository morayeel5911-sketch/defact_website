"use client";

import { useEffect, useState } from "react";

/**
 * HUD Interface Grid — Scrolling SVG Background Pattern
 *
 * Positioned absolutely within <main> so it scrolls natively with content.
 * Uses a single <pattern> tile repeated across the entire page height.
 * No Canvas / no RAF / no JS scroll listeners needed.
 */

export default function InterfaceGrid() {
  const [config, setConfig] = useState({
    size: 80,
    gap: 10,
    nodeRadius: 1.8,
    lineOpacity: 0.50,
    nodeOpacity: 0.60,
  });

  useEffect(() => {
    const s = getComputedStyle(document.documentElement);
    setConfig({
      size: parseFloat(s.getPropertyValue("--grid-size")) || 80,
      gap: parseFloat(s.getPropertyValue("--grid-gap")) || 10,
      nodeRadius: parseFloat(s.getPropertyValue("--grid-node-radius")) || 1.8,
      lineOpacity: parseFloat(s.getPropertyValue("--grid-line-opacity")) || 0.50,
      nodeOpacity: parseFloat(s.getPropertyValue("--grid-node-opacity")) || 0.60,
    });
  }, []);

  const { size, gap, nodeRadius, lineOpacity, nodeOpacity } = config;
  const halfGap = gap / 2;
  const center = size / 2;

  const lineColor = `rgba(255,255,255,${lineOpacity})`;
  const nodeColor = `rgba(255,255,255,${nodeOpacity})`;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="grid-pattern"
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          {/* Vertical line — top half */}
          <line
            x1={center}
            y1={0}
            x2={center}
            y2={center - halfGap}
            stroke={lineColor}
            strokeWidth={1}
          />
          {/* Vertical line — bottom half */}
          <line
            x1={center}
            y1={center + halfGap}
            x2={center}
            y2={size}
            stroke={lineColor}
            strokeWidth={1}
          />
          {/* Horizontal line — left half */}
          <line
            x1={0}
            y1={center}
            x2={center - halfGap}
            y2={center}
            stroke={lineColor}
            strokeWidth={1}
          />
          {/* Horizontal line — right half */}
          <line
            x1={center + halfGap}
            y1={center}
            x2={size}
            y2={center}
            stroke={lineColor}
            strokeWidth={1}
          />
          {/* Node dot at intersection */}
          <circle
            cx={center}
            cy={center}
            r={nodeRadius}
            fill={nodeColor}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
}
