# Scroll-Synced Grid Architecture & Physics System
## Technical Recommendation — DEFACT Website

**Date:** 2026-05-07  
**Analyzes:** InterfaceGrid.tsx, page.tsx, LenisProvider.tsx, ScrollEffects.tsx, globals.css  
**Stack:** Next.js 16, React 19, Tailwind v4, GSAP 3.15, Lenis 1.3.23

---

## Executive Summary

The current grid is a **fixed-viewport canvas overlay** with hardcoded 80px cells. It does not scroll with content, does not align to section layouts, and cannot be reconfigured without editing source. This document recommends a **virtual viewport canvas architecture** synced to Lenis scroll, with grid parameters exposed via CSS custom properties, and advises **keeping Lenis** (not switching to ScrollSmoother).

**Recommended architecture at a glance:**
- Grid cell size: CSS custom property `--grid-size` (default 80px, overridable per section)
- Scroll sync: Canvas `translateY` driven by Lenis `scroll` event (virtual viewport)
- Section alignment: CSS custom properties `--grid-offset-x/y` + snap utility classes
- Scroll physics: Keep Lenis (lerp 0.08 → 0.06) with GSAP ScrollTrigger sync

---

## 1. Configurable Grid Cell Size

### Current State
```tsx
const GRID_SIZE = 80; // hardcoded
const GAP = 10;
const NODE_RADIUS = 1.8;
```

### Option A: CSS Custom Properties + React Props (RECOMMENDED)

**Approach:**
Define grid constants as CSS custom properties on `:root`. The Canvas component reads them via `getComputedStyle`. A React `gridSize` prop with CSS fallback.

```css
:root {
  --grid-size: 80px;
  --grid-gap: 10px;
  --grid-node-radius: 1.8px;
}

.section-signal {
  --grid-size: 100px; /* per-section override */
}
```

```tsx
// InterfaceGrid.tsx
function getGridConfig() {
  const style = getComputedStyle(document.documentElement);
  return {
    size: parseFloat(style.getPropertyValue('--grid-size')) || 80,
    gap: parseFloat(style.getPropertyValue('--grid-gap')) || 10,
    nodeRadius: parseFloat(style.getPropertyValue('--grid-node-radius')) || 1.8,
  };
}
```

**Pros:**
- No rebuild needed to tweak grid size — designers can adjust in DevTools
- Per-section overrides possible (e.g., hero at 100px for bolder lines, footer at 60px for density)
- Tailwind v4 `@theme` can reference the same values for alignment utilities
- Canvas and CSS stay in sync automatically

**Cons:**
- `getComputedStyle` call on every frame during resize (mitigated by caching)
- Slightly more code than a plain prop

**Complexity:** Low  
**Performance impact:** Negligible (computed once per resize, cached)

---

### Option B: React Props + Context

**Approach:**
```tsx
<GridProvider size={100} gap={10}>
  <InterfaceGrid />
</GridProvider>
```

**Pros:**
- Type-safe, explicit
- Easy to switch per-page or per-section via context

**Cons:**
- CSS (for alignment utilities) cannot read React context without JS bridge
- Requires prop drilling or context for every section that wants grid-aware layout
- Less designer-friendly than CSS vars

**Verdict:** Good for JS-only consumption, but CSS alignment (Section 3) needs CSS vars anyway. **Combine A + B:** CSS vars as source of truth, React context mirrors them for typed access.

---

### Option C: Tailwind Theme Extension

**Approach:**
```css
@theme {
  --grid-size: 80px;
  --spacing-grid: var(--grid-size);
}
```
Then `pl-grid`, `gap-grid`, etc.

**Pros:**
- Native Tailwind integration

**Cons:**
- Tailwind v4 theme values are build-time; runtime changes require CSS vars anyway
- Canvas cannot read Tailwind theme directly

**Verdict:** Use alongside Option A, not as replacement.

---

## 2. Scroll Sync: Making the Grid Move With Content

### Current Problem
The canvas is `fixed inset-0`. When you scroll down, the grid stays at the top of the viewport like a HUD overlay. For a "blueprint that coordinates the page" feel, the grid should appear to scroll with the document.

### Option A: Canvas Virtual Viewport (RECOMMENDED)

**Approach:**
Keep the canvas `position: fixed` (for GPU compositing and z-index), but render a **virtual slice** of an infinite grid shifted by scroll offset.

```tsx
export default function InterfaceGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let w = window.innerWidth;
    let h = window.innerHeight;

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
      if (!canvas || !ctx) return;
      const { size, gap, nodeRadius } = getGridConfig();
      const sy = scrollYRef.current;

      ctx.clearRect(0, 0, w, h);

      // Calculate virtual grid origin: we want the grid at scrollY to look
      // identical to the grid at scrollY=0 but shifted up by sy.
      // So the first visible horizontal line is at:
      // y_virtual = ceil((sy) / size) * size
      // y_screen  = y_virtual - sy

      const startRow = Math.floor(sy / size);
      const startCol = 0; // full width

      // Vertical lines
      for (let x = size; x < w; x += size) {
        const rowOffset = (sy % size);
        // Draw from first visible cell to bottom of viewport
        for (let row = startRow; row * size - sy < h + size; row++) {
          const yBase = row * size - sy;
          if (yBase < -size || yBase > h) continue;

          ctx.beginPath();
          ctx.moveTo(x, yBase + gap / 2);
          ctx.lineTo(x, yBase + size - gap / 2);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x, yBase + size / 2, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();
        }
      }

      // Horizontal lines (same logic transposed)
      const startRowH = Math.floor(sy / size);
      for (let yVirt = (startRowH + 1) * size; yVirt < sy + h + size; yVirt += size) {
        const yScreen = yVirt - sy;
        if (yScreen < 0 || yScreen > h) continue;
        for (let x = 0; x < w; x += size) {
          ctx.beginPath();
          ctx.moveTo(x + gap / 2, yScreen);
          ctx.lineTo(x + size - gap / 2, yScreen);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x + size / 2, yScreen, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();
        }
      }
    }

    // Listen to Lenis scroll via window scroll or Lenis instance
    // Since Lenis intercepts native scroll, we hook into Lenis events
    const handleScroll = () => {
      scrollYRef.current = window.scrollY; // Lenis updates window.scrollY
      requestAnimationFrame(draw);
    };

    // If using Lenis natively:
    // lenis.on('scroll', ({ scroll }) => { scrollYRef.current = scroll; ... });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => { resize(); draw(); });

    resize();
    draw();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9996]"
    />
  );
}
```

**Pros:**
- Canvas stays fixed (best performance, no layer promotion issues)
- Only viewport-sized canvas buffer (not `documentHeight × width`)
- Crisp subpixel rendering via DPR scaling preserved
- Works with any scroll physics (Lenis, native, keyboard)

**Cons:**
- Slightly more draw logic (virtual culling)
- Must ensure scroll event fires reliably with Lenis (Lenis updates `window.scrollY`, but native `scroll` event may not fire — see integration note below)

**Integration with existing LenisProvider:**
The current Lenis setup drives scroll via `l.raf()` and syncs to GSAP ticker. It does NOT update native `window.scrollY` by default — it transforms a wrapper div or uses virtual scroll. To get the true virtual scroll position, hook into Lenis directly:

```tsx
// Inside InterfaceGrid.tsx or via context
const { lenis } = useLenis();
useEffect(() => {
  if (!lenis) return;
  const onScroll = ({ scroll }: { scroll: number }) => {
    scrollYRef.current = scroll;
    requestAnimationFrame(draw);
  };
  lenis.on('scroll', onScroll);
  return () => lenis.off('scroll', onScroll);
}, [lenis]);
```

**Complexity:** Medium  
**Performance impact:** Low. Canvas draw is already happening; we just change the math. Culling actually *improves* performance on tall pages.

---

### Option B: One Large Scrolling Grid Div

**Approach:**
Remove `fixed` from canvas. Make it `absolute` inside a tall wrapper. The wrapper has `height: 100%` of page, and canvas has `width: 100%; height: 100%` of that wrapper. The canvas renders the full page grid once.

**Pros:**
- No virtual culling logic
- Native scroll behavior (no JS tracking needed)

**Cons:**
- Canvas buffer = `width × documentHeight × dpr`. For a 20,000px tall page at 2× DPR, that's a ~160MB canvas buffer. **Browser will crash or refuse to allocate.**
- Redraw on resize is catastrophic (must reallocate giant buffer)

**Verdict:** **Unusable** for a content-rich page. Rejected.

---

### Option C: CSS Grid Pattern (background-image)

**Approach:**
Replace canvas with CSS `repeating-linear-gradient` patterns on a fixed div.

```css
.grid-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9996;
  background-image:
    repeating-linear-gradient(
      to right,
      transparent 0px,
      transparent 39px,
      rgba(255,255,255,0.5) 39px,
      rgba(255,255,255,0.5) 40px,
      transparent 40px,
      transparent 80px
    ),
    repeating-linear-gradient(
      to bottom,
      /* same logic */
    );
  background-size: 80px 80px;
}
```

**Pros:**
- Zero JS
- GPU-composited as a texture

**Cons:**
- Cannot draw intersection gaps (the 10px break at cross points) cleanly
- Cannot draw node dots (the 1.8px circles) — CSS dots would be misaligned with gaps
- Cannot do per-cell theming or dynamic opacity
- No DPR awareness (1px lines look thick on high DPR screens)

**Verdict:** Too limited for the current design spec. Rejected.

---

### Option D: Per-Section Grid Backgrounds

**Approach:**
Each `<section>` renders its own small grid (canvas or CSS) as a background.

**Pros:**
- Natural scroll
- Section-specific grid sizes easy

**Cons:**
- Grid lines won't align across section boundaries (visual seams)
- 9 sections = 9 canvases or grid layers = overhead
- Defeats the "single coordinate system" blueprint metaphor

**Verdict:** Rejected for this aesthetic.

---

## 3. Aligning Section Content to Grid Lines

### Goal
Section padding, element positioning, and layout gaps should snap to the grid so that text blocks, images, and cards sit "on" the blueprint lines.

### Option A: CSS Custom Properties + Snap Utilities (RECOMMENDED)

**Approach:**
Expose `--grid-size`, `--grid-offset-x`, `--grid-offset-y` globally. Build Tailwind utilities that reference them.

```css
:root {
  --grid-size: 80px;
  /* Offset from viewport left edge to first vertical line */
  --grid-offset-x: 0px;
  --grid-offset-y: 0px;
}
```

Tailwind v4 custom utilities (in `globals.css`):

```css
@utility gsnap-1 { padding-left: calc(var(--grid-size) * 1); }
@utility gsnap-2 { padding-left: calc(var(--grid-size) * 2); }
@utility gsnap-3 { padding-left: calc(var(--grid-size) * 3); }
@utility gsnap-n-1 { padding-right: calc(var(--grid-size) * 1); }
@utility gsnap-n-2 { padding-right: calc(var(--grid-size) * 2); }
@utility gap-grid-1 { gap: var(--grid-size); }
@utility gap-grid-2 { gap: calc(var(--grid-size) * 2); }
```

Usage in sections:
```tsx
<section className="gsnap-2 gsnap-n-2 py-[calc(var(--grid-size)*4)]">
  {/* Content sits 2 cells from left, 2 from right, 4 cells padding top/bottom */}
</section>
```

**Dynamic offset on resize:**
If the designer wants the grid centered (e.g., total width = N*80 + remainder), compute `--grid-offset-x`:

```tsx
function updateGridOffset() {
  const size = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-size'));
  const remainder = window.innerWidth % size;
  document.documentElement.style.setProperty('--grid-offset-x', `${remainder / 2}px`);
}
window.addEventListener('resize', updateGridOffset);
```

The Canvas grid must also respect `--grid-offset-x` when drawing:

```tsx
const offsetX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--grid-offset-x')) || 0;
for (let x = offsetX + size; x < w; x += size) { ... }
```

**Pros:**
- CSS handles layout (no JS per frame)
- Works with Tailwind v4 `@utility`
- Responsive: grid size can change at breakpoints, layout adapts
- Canvas and DOM stay in sync via same CSS vars

**Cons:**
- Requires consistent adoption across all sections (refactoring existing `px-6 md:px-12` padding)
- `calc()` with CSS vars has wide support but may need fallbacks for very old browsers (not a concern here)

**Complexity:** Low-Medium  
**Performance impact:** Positive — reduces arbitrary layout values, enables more caching

---

### Option B: CSS Grid Layout (Container Grid)

**Approach:**
Make `<main>` a CSS Grid:

```css
main {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--grid-size), 1fr));
}
```

Sections span columns:
```tsx
<section className="col-span-full">...</section>
<div className="col-span-4 col-start-2">...</div>
```

**Pros:**
- True grid alignment enforced by browser layout engine
- Responsive column counts automatically

**Cons:**
- Retrofitting the existing asymmetric layouts (floating images, scattered annotations) into a strict grid is a massive refactor
- Conflicts with many existing `absolute` and `relative` positioned elements
- The current design is intentionally "broken grid" / anti-grid in places (MSCHF/Rick Owens aesthetic)

**Verdict:** Too rigid for this brand aesthetic. Rejected as primary, but useful for specific sub-components (e.g., the specs grid in HeroSection).

---

### Option C: JS Snap Hook

**Approach:**
```tsx
function useGridSnap() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const snap = () => {
      const size = getGridSize();
      const rect = el.getBoundingClientRect();
      const nearestX = Math.round(rect.left / size) * size;
      el.style.marginLeft = `${nearestX - rect.left}px`;
    };
    snap();
    window.addEventListener('resize', snap);
    return () => window.removeEventListener('resize', snap);
  }, []);
  return ref;
}
```

**Pros:**
- Can snap existing elements without CSS changes

**Cons:**
- Layout thrashing (`getBoundingClientRect` + style set causes forced reflow)
- Fights React's layout system
- Must run after every resize AND after images load (layout shift)

**Verdict:** Rejected — causes performance issues and maintenance pain.

---

## 4. Scroll Physics: Library Evaluation

### Current State
- **Lenis** (v1.3.23): `lerp: 0.08`, `wheelMultiplier: 0.7`, synced to GSAP ScrollTrigger
- **GSAP ScrollTrigger**: Heavy usage (parallax, reveals, marquee velocity, section pinning)
- **GSAP ticker**: Drives Lenis RAF loop

### Option A: Keep Lenis + Refine Config (RECOMMENDED)

**Recommended tuning:**
```tsx
const l = new Lenis({
  lerp: 0.06,           // Slightly smoother (was 0.08)
  smoothWheel: true,
  wheelMultiplier: 0.7,
  touchMultiplier: 1.5,
  infinite: false,
});
```

**Why keep it:**
- Already deeply integrated (`LenisProvider.tsx`, `ScrollEffects.tsx` uses ScrollTrigger)
- Lenis is ~2KB gzipped, free, actively maintained
- The "digital decay luxury" aesthetic benefits from slight scroll inertia, not heavy smoothing
- GSAP ScrollTrigger sync is battle-tested in this codebase

**Enhancement — inertia feel:**
Lenis lerp-based smoothing feels slightly "draggy" on fast scrolls. To improve without switching libraries:

```tsx
// Add velocity-based wheel multiplier
let lastScroll = 0;
lenis.on('scroll', ({ velocity }: { velocity: number }) => {
  // Subtle speed boost on fast flicks
  const multiplier = 0.7 + Math.min(Math.abs(velocity) / 5000, 0.3);
  lenis.options.wheelMultiplier = multiplier;
});
```

**Pros:**
- Minimal refactor risk (change 3 numbers)
- Preserves all existing ScrollTrigger animations
- Free

**Cons:**
- Lerp model is not true physics (no mass/spring feel)
- Cannot do advanced ScrollSmoother features (scrub lag smoothing, etc.)

**Complexity:** Very Low  
**Performance impact:** Neutral

---

### Option B: GSAP ScrollSmoother

**Approach:**
Replace Lenis with GSAP ScrollSmoother. Requires wrapper structure:

```tsx
<div id="smooth-wrapper">
  <div id="smooth-content">
    {/* all page content */}
  </div>
</div>
```

```tsx
const smoother = ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1.5,
  effects: true,
});
```

**Pros:**
- Best-in-class ScrollTrigger integration (it's the same team)
- Built-in speed effects (`data-speed`, `data-lag`) without custom code
- Smoother scrub on ScrollTrigger animations

**Cons:**
- **Paid plugin** — requires GSAP Club membership ($99/year or higher)
- **Major structural refactor** — all content must move into wrapper divs; `position: fixed` elements (InterfaceGrid, Navigation, CustomCursor, grain overlay) need special handling (`position: fixed` inside transformed parent breaks)
- **Heavier** — ~20KB extra vs Lenis
- The current `page.tsx` has many fixed-position siblings; moving them inside a transformed wrapper will break their positioning

**Verdict:** Rejected. The cost + refactor risk outweighs benefits for this project stage. If budget allows later, revisit for v2.

---

### Option C: Lenis + GSAP (Current) vs Lenis Inertia Plugin

Lenis has an official inertia plugin (`lenis/inertia`) that adds spring-based stopping.

```tsx
import { Lenis } from 'lenis';
import { inertia } from 'lenis/inertia';

const lenis = new Lenis({ /* ... */ });
inertia(lenis, { velocity: 1.2 });
```

**Pros:**
- Free
- Adds spring feel without leaving Lenis ecosystem

**Cons:**
- Plugin is newer, less documented than core
- May conflict with existing GSAP ticker integration
- Adds another dependency to audit

**Verdict:** Optional enhancement for v2. Not needed now.

---

### Option D: Custom Spring Physics

**Approach:**
Roll a custom RAF-based scroll interpolator with spring-damper equations.

```tsx
class ScrollSpring {
  target = 0;
  current = 0;
  velocity = 0;
  mass = 1;
  stiffness = 170;
  damping = 26;

  update() {
    const force = (this.target - this.current) * this.stiffness;
    const acceleration = force / this.mass;
    this.velocity += acceleration;
    this.velocity *= (1 - this.damping / 100);
    this.current += this.velocity;
  }
}
```

**Pros:**
- Total control over feel — can tune for "heavy/solid" (high mass) or "snappy" (high stiffness)
- No external dependency

**Cons:**
- Must reimplement: wheel normalization, touch handling, keyboard navigation, overscroll, accessibility, RTL, reduced-motion preference
- ScrollTrigger integration requires manually syncing scroll position
- Substantial engineering effort with ongoing maintenance

**Verdict:** Rejected. The brand can be expressed via animation easing, not scroll physics. Don't reinvent the wheel.

---

## 5. Implementation Complexity & Performance Matrix

| Approach | Complexity | Perf Impact | Bundle Impact | Refactor Risk | Aesthetic Fit |
|----------|-----------|-------------|---------------|---------------|---------------|
| **Grid: CSS vars + Canvas virtual viewport** (Rec.) | Medium | Low (improved) | +0KB | Medium (grid component only) | Excellent |
| Grid: Large scrolling canvas | Low | **Catastrophic** | +0KB | Low | Excellent |
| Grid: CSS background pattern | Low | Very Low | +0KB | Low | Poor (no nodes/gaps) |
| Grid: Per-section grids | Low | Medium | +0KB | Low | Poor (seams) |
| **Alignment: CSS vars + @utility** (Rec.) | Low | Positive | +0KB | Medium (all sections) | Excellent |
| Alignment: CSS Grid container | High | Low | +0KB | **High** (rewrite layouts) | Too rigid |
| Alignment: JS snap hook | Medium | **Negative** (reflow) | +0KB | Medium | Fragile |
| **Physics: Keep Lenis, tune lerp** (Rec.) | Very Low | Neutral | +0KB | None | Good |
| Physics: ScrollSmoother | High | Medium | +20KB | **High** (page structure) | Excellent |
| Physics: Custom spring | Very High | Negative | +~2KB | Very High | Unnecessary |

---

## Recommended Implementation Plan

### Phase 1: Grid Configurability (1-2 hours)
1. Add CSS custom properties to `globals.css`:
   ```css
   :root {
     --grid-size: 80px;
     --grid-gap: 10px;
     --grid-node-radius: 1.8px;
     --grid-offset-x: 0px;
     --grid-offset-y: 0px;
     --grid-line-opacity: 0.50;
     --grid-node-opacity: 0.60;
   }
   ```
2. Rewrite `InterfaceGrid.tsx` to read from CSS vars
3. Add `useLenis()` integration for scroll sync (virtual viewport draw)

### Phase 2: Snap Utilities (1 hour)
1. Add `@utility` classes in `globals.css`:
   ```css
   @utility gsnap-1 { padding-left: calc(var(--grid-size) * 1); }
   @utility gsnap-2 { padding-left: calc(var(--grid-size) * 2); }
   @utility gsnap-3 { padding-left: calc(var(--grid-size) * 3); }
   @utility gsnap-r-1 { padding-right: calc(var(--grid-size) * 1); }
   @utility gsnap-r-2 { padding-right: calc(var(--grid-size) * 2); }
   @utility gsnap-r-3 { padding-right: calc(var(--grid-size) * 3); }
   @utility py-grid-1 { padding-top: calc(var(--grid-size) * 1); padding-bottom: calc(var(--grid-size) * 1); }
   @utility py-grid-2 { padding-top: calc(var(--grid-size) * 2); padding-bottom: calc(var(--grid-size) * 2); }
   @utility py-grid-4 { padding-top: calc(var(--grid-size) * 4); padding-bottom: calc(var(--grid-size) * 4); }
   ```

### Phase 3: Section Refactor (2-3 hours)
1. Update `HeroSection`, `ArtifactsSection`, etc. to use `gsnap-*` utilities instead of arbitrary `px-6 md:px-12`
2. Ensure section vertical padding is grid-aligned (`py-grid-4` instead of `py-32`)

### Phase 4: Scroll Physics Tuning (15 min)
1. In `LenisProvider.tsx`, change `lerp: 0.08` → `lerp: 0.06`
2. Test all ScrollTrigger animations still work

---

## Key Code Samples

### InterfaceGrid.tsx (Recommended)
```tsx
"use client";
import { useEffect, useRef } from "react";
import { useLenis } from "@/providers/LenisProvider";

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

    function getConfig() {
      const s = getComputedStyle(document.documentElement);
      return {
        size: parseFloat(s.getPropertyValue("--grid-size")) || 80,
        gap: parseFloat(s.getPropertyValue("--grid-gap")) || 10,
        nodeRadius: parseFloat(s.getPropertyValue("--grid-node-radius")) || 1.8,
        offsetX: parseFloat(s.getPropertyValue("--grid-offset-x")) || 0,
        offsetY: parseFloat(s.getPropertyValue("--grid-offset-y")) || 0,
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
      const { size, gap, nodeRadius, offsetX } = getConfig();
      const sy = scrollRef.current;

      const htmlBg = getComputedStyle(document.documentElement).backgroundColor;
      const isDark = htmlBg.includes("0, 15, 234") || htmlBg.includes("15, 234");
      const lineColor = isDark ? "rgba(255,255,255,0.50)" : "rgba(0,15,234,0.55)";
      const nodeColor = isDark ? "rgba(255,255,255,0.60)" : "rgba(0,15,234,0.65)";

      ctx.clearRect(0, 0, w, h);

      // Vertical lines (with virtual culling)
      for (let x = offsetX + size; x < w; x += size) {
        const startRow = Math.floor((sy - offsetY) / size);
        for (let row = startRow - 1; row * size - sy + offsetY < h + size; row++) {
          const yBase = row * size - sy + offsetY;
          if (yBase < -size || yBase > h) continue;
          ctx.beginPath();
          ctx.moveTo(x, yBase + gap / 2);
          ctx.lineTo(x, yBase + size - gap / 2);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(x, yBase + size / 2, nodeRadius, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();
        }
      }

      // Horizontal lines
      const startRowH = Math.floor((sy - offsetY) / size);
      for (let yVirt = (startRowH + 1) * size + offsetY; yVirt < sy + h + size; yVirt += size) {
        const yScreen = yVirt - sy;
        if (yScreen < 0 || yScreen > h) continue;
        for (let x = offsetX; x < w; x += size) {
          ctx.beginPath();
          ctx.moveTo(x + gap / 2, yScreen);
          ctx.lineTo(x + size - gap / 2, yScreen);
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 1;
          ctx.stroke();
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
    />
  );
}
```

### globals.css Additions
```css
@theme {
  --grid-size: 80px;
  --grid-gap: 10px;
  --grid-node-radius: 1.8px;
  --grid-offset-x: 0px;
  --grid-offset-y: 0px;
}

@utility gsnap-1  { padding-left: calc(var(--grid-size) * 1); }
@utility gsnap-2  { padding-left: calc(var(--grid-size) * 2); }
@utility gsnap-3  { padding-left: calc(var(--grid-size) * 3); }
@utility gsnap-r-1 { padding-right: calc(var(--grid-size) * 1); }
@utility gsnap-r-2 { padding-right: calc(var(--grid-size) * 2); }
@utility gsnap-r-3 { padding-right: calc(var(--grid-size) * 3); }
@utility py-grid-1 { padding-top: calc(var(--grid-size) * 1); padding-bottom: calc(var(--grid-size) * 1); }
@utility py-grid-2 { padding-top: calc(var(--grid-size) * 2); padding-bottom: calc(var(--grid-size) * 2); }
@utility py-grid-4 { padding-top: calc(var(--grid-size) * 4); padding-bottom: calc(var(--grid-size) * 4); }
@utility py-grid-6 { padding-top: calc(var(--grid-size) * 6); padding-bottom: calc(var(--grid-size) * 6); }
```

### LenisProvider.tsx Tune
```tsx
const l = new Lenis({
  lerp: 0.06,        // was 0.08 — slightly silkier
  smoothWheel: true,
  wheelMultiplier: 0.7,
  touchMultiplier: 1.5,
});
```

---

## Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Canvas RAF conflicts with GSAP ticker | Medium | Ensure only one RAF driver. Use GSAP ticker for Lenis, use separate RAF only for grid canvas (it reads scrollRef, doesn't drive scroll). |
| Layout shift when switching to grid-aligned padding | Medium | Test each section after refactor; keep fallback padding for mobile where grid cells may be too large |
| `--grid-size` not available during SSR | Low | CSS vars are client-side only; canvas doesn't render until mount anyway. Default values in JS cover hydration. |
| Fixed canvas + `position: fixed` nav stacking | Low | Keep z-index: 9996 for grid, 9997 for grain, 9999 for cursor. Verified in current setup. |
| ScrollSmoother FOMO later | N/A | Architecture is portable — switching later mainly requires HTML wrapper changes, not grid logic. |

---

## Conclusion

**Do not switch scroll physics libraries.** Lenis + GSAP ScrollTrigger is the correct choice for this stack and aesthetic.

**Do adopt CSS custom properties for grid config** and rewrite `InterfaceGrid.tsx` with a virtual viewport draw loop synced to Lenis scroll events. This gives the grid a "scrolls with content" feel while keeping the canvas fixed and performant.

**Do add `@utility` snap classes** to align sections to the grid via `padding-left/right` and `padding-top/bottom`. This is the sweet spot between rigorous grid alignment and design flexibility.

**Estimated effort:** ~4-5 hours total (1-2 hrs grid refactor, 1 hr utilities, 2-3 hrs section alignment, 15 min physics tuning).
