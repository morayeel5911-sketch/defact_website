"use client";

import { useEffect, useRef } from "react";

/**
 * HUD Interface Grid — V3
 * Blueprint-style grid with gaps at intersections + node dots.
 * Renders on Canvas for crisp lines and performance.
 */

const GRID_SIZE = 80; // px between major lines
const GAP = 10; // px gap at intersections (5px each side)
const NODE_RADIUS = 1.8; // node dot size

export default function InterfaceGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function draw() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Determine color based on theme (read from html background)
      const htmlBg = getComputedStyle(document.documentElement).backgroundColor;
      const isDark = htmlBg.includes("0, 15, 234") || htmlBg.includes("15, 234");
      const lineColor = isDark ? "rgba(255, 255, 255, 0.28)" : "rgba(0, 15, 234, 0.32)";
      const nodeColor = isDark ? "rgba(255, 255, 255, 0.30)" : "rgba(0, 15, 234, 0.35)";

      ctx.clearRect(0, 0, w, h);

      // Vertical lines
      for (let x = GRID_SIZE; x < w; x += GRID_SIZE) {
        for (let y = 0; y < h; y += GRID_SIZE) {
          // Draw line segment from y to y+GRID_SIZE-GAP
          ctx.beginPath();
          ctx.moveTo(x, y + GAP / 2);
          ctx.lineTo(x, y + GRID_SIZE - GAP / 2);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Node dot at intersection
          ctx.beginPath();
          ctx.arc(x, y + GRID_SIZE / 2, NODE_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();
        }
      }

      // Horizontal lines
      for (let y = GRID_SIZE; y < h; y += GRID_SIZE) {
        for (let x = 0; x < w; x += GRID_SIZE) {
          ctx.beginPath();
          ctx.moveTo(x + GAP / 2, y);
          ctx.lineTo(x + GRID_SIZE - GAP / 2, y);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Node dot
          ctx.beginPath();
          ctx.arc(x + GRID_SIZE / 2, y, NODE_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();
        }
      }
    }

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9996]"
      style={{ opacity: 1 }}
    />
  );
}
