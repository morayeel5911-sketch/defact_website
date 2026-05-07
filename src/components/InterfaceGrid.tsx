"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "@/providers/LenisProvider";

/**
 * HUD Interface Grid — Scroll-Synced Virtual Viewport
 * Canvas stays fixed, but renders a virtual slice of infinite grid
 * shifted by Lenis scroll offset. Grid appears to scroll with content.
 */

export default function InterfaceGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const { lenis } = useLenis();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = 1, w = 0, h = 0;
    let rafId = 0;

    /** Read grid config from CSS custom properties */
    function getConfig() {
      const s = getComputedStyle(document.documentElement);
      return {
        size: parseFloat(s.getPropertyValue("--grid-size")) || 80,
        gap: parseFloat(s.getPropertyValue("--grid-gap")) || 10,
        nodeRadius: parseFloat(s.getPropertyValue("--grid-node-radius")) || 1.8,
        offsetX: parseFloat(s.getPropertyValue("--grid-offset-x")) || 0,
        offsetY: parseFloat(s.getPropertyValue("--grid-offset-y")) || 0,
        lineOpacity: parseFloat(s.getPropertyValue("--grid-line-opacity")) || 0.50,
        nodeOpacity: parseFloat(s.getPropertyValue("--grid-node-opacity")) || 0.60,
      };
    }

    function resize() {
      dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      if (!ctx) return;
      const { size, gap, nodeRadius, offsetX, offsetY, lineOpacity, nodeOpacity } = getConfig();
      const sy = scrollRef.current;

      const htmlBg = getComputedStyle(document.documentElement).backgroundColor;
      const isDark = htmlBg.includes("0, 15, 234") || htmlBg.includes("15, 234");
      const lineColor = isDark ? `rgba(255,255,255,${lineOpacity})` : `rgba(0,15,234,${lineOpacity + 0.05})`;
      const nodeColor = isDark ? `rgba(255,255,255,${nodeOpacity})` : `rgba(0,15,234,${nodeOpacity + 0.05})`;

      ctx.clearRect(0, 0, w, h);

      // === VERTICAL LINES ===
      // Only draw lines whose x is within viewport
      for (let x = offsetX + size; x < w; x += size) {
        // Determine first visible grid row (virtual coordinate space)
        const startRow = Math.floor((sy - offsetY) / size);
        // Draw from startRow-1 (slight overscan) until below viewport
        for (let row = startRow - 1; row * size - sy + offsetY < h + size; row++) {
          const yBase = row * size - sy + offsetY; // screen Y
          if (yBase < -size || yBase > h) continue; // cull

          // Line segment with gap at intersection
          ctx.beginPath();
          ctx.moveTo(x, yBase + gap / 2);
          ctx.lineTo(x, yBase + size - gap / 2);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Node dot at center of cell
          ctx.beginPath();
          ctx.arc(x, yBase + size / 2, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();
        }
      }

      // === HORIZONTAL LINES ===
      const startRowH = Math.floor((sy - offsetY) / size);
      for (let yVirt = (startRowH + 1) * size + offsetY; yVirt < sy + h + size; yVirt += size) {
        const yScreen = yVirt - sy; // screen Y
        if (yScreen < 0 || yScreen > h) continue; // cull

        for (let x = offsetX; x < w; x += size) {
          // Line segment with gap at intersection
          ctx.beginPath();
          ctx.moveTo(x + gap / 2, yScreen);
          ctx.lineTo(x + size - gap / 2, yScreen);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Node dot at center of cell
          ctx.beginPath();
          ctx.arc(x + size / 2, yScreen, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();
        }
      }
    }

    function loop() {
      draw();
      rafId = requestAnimationFrame(loop);
    }

    // Listen to Lenis scroll events (virtual scroll position)
    const onScroll = ({ scroll }: { scroll: number }) => {
      scrollRef.current = scroll;
    };

    if (lenis) lenis.on("scroll", onScroll);
    window.addEventListener("resize", resize);
    resize();
    rafId = requestAnimationFrame(loop);

    return () => {
      if (lenis) lenis.off("scroll", onScroll);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [lenis]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9996]"
      style={{ opacity: 1 }}
    />
  );
}
