# DETAILED IMPLEMENTATION PLAN — DEFACT Website Feedback Fixes

## Feedback Summary (from `/Volumes/T7/Vault_T7/00-Inbox/Feedback/defact_Website Feedback.pdf`)

| # | Issue | Priority | Root Cause (Analyzed) |
|---|---|---|---|
| 1 | Grid too small — needs 3x scaling (80px → 240px) | 🔴 High | `--grid-size: 80px` is too fine, looks busy |
| 2 | Elements must align to background grid | 🔴 High | Only top-level containers use grid snaps; inner gaps/margins are hardcoded |
| 3 | Safari Desktop scroll lag | 🔴 High | SVG `<pattern>` tiled over 100% page height is a known Safari performance killer |
| 4 | Horizontal scrollbar visible on Desktop | 🟡 Medium | `overflow-x` not properly set, or `100vw` without scrollbar compensation |
| 5 | Broken images | 🟡 Medium | Unknown — needs investigation of `public/images/` and `next.config.ts` |

---

## Architectural Decisions

### Decision 1: Grid Scaling
- **Desktop:** `--grid-size: 240px` (3x current)
- **Mobile (<768px):** `--grid-size: 120px` (1.5x current)
- **Implementation:** CSS custom property with `@media` query override
- **Impact:** All `gsnap-*`, `py-grid-*`, `gap-grid-*`, `mt-grid-*`, `mb-grid-*` utilities auto-scale because they use `calc(var(--grid-size) * N)`

### Decision 2: Safari Performance Fix
- **Approach:** Replace SVG `<pattern>` with CSS `background-image` using a Data-URI SVG
- **Why:** Safari renders SVG patterns in the DOM very inefficiently for large areas. A `background-image` is rasterized by the compositor and scrolls hardware-accelerated.
- **Preservation:** Exact same visual: 10px gaps at intersections, 1.8px node dots, 50%/60% opacity
- **Tradeoff:** Grid color can't dynamically adapt to section theme (light/dark) without JS. Since all sections are currently dark-themed (`bg-void`), we use the dark grid colors (`rgba(255,255,255,0.50)` lines, `rgba(255,255,255,0.60)` nodes).

### Decision 3: Deep Grid Alignment
- **Approach:** Convert ALL inner spacing values in ALL sections to grid utilities
- **Scope:** Every `gap-`, `mb-`, `mt-`, `py-`, `px-`, `space-y-`, `space-x-` value that affects layout alignment
- **Files:** All 9 section files + `InterfaceGrid.tsx` + `globals.css`

### Decision 4: Horizontal Scrollbar Fix
- **Approach:**
  1. Add `overflow-x: hidden` to `html` and `body` in `globals.css`
  2. Replace all `w-screen` / `100vw` with `w-full` / `100%` in sections
  3. Check `Footer.tsx` Marquee width
  4. Check `page.tsx` main container width

### Decision 5: Broken Images Diagnostic
- **Approach:**
  1. Verify `next.config.ts` has `images: { unoptimized: true }` for static export
  2. Check which images in `public/images/` actually exist
  3. Check if V2 assets referenced in `V2GallerySection.tsx` exist on disk

---

## Step-by-Step Implementation

### STEP 1: `globals.css` — Grid Scaling + Overflow Fix + Grid Background

**A. Grid size responsive scaling:**
```css
@theme {
  --grid-size: 120px;  /* Mobile default */
}
@media (min-width: 768px) {
  :root {
    --grid-size: 240px;
  }
}
```

**B. Overflow fix:**
```css
html, body {
  overflow-x: hidden;
}
```

**C. Keep existing utilities** (`gsnap-*`, `py-grid-*`, etc.) — they auto-scale via `var(--grid-size)`.

### STEP 2: `InterfaceGrid.tsx` — Replace SVG Pattern with CSS Background

**Remove the entire component file** and replace with a thin wrapper that injects CSS background styles. The grid becomes a CSS background, not a React component.

**Approach:** Since the grid is now a CSS background, we don't need a React component at all. We can inject it via `globals.css` on `main` or keep a minimal component that sets inline styles.

**Minimal component approach (preserves React integration):**
```tsx
"use client";
export default function InterfaceGrid() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{
        backgroundImage: `url("data:image/svg+xml,...grid pattern SVG...")`,
        backgroundSize: "var(--grid-size) var(--grid-size)",
        opacity: 1,
      }}
    />
  );
}
```

**SVG Pattern to encode:**
- Grid cell: 240px × 240px (or 120px on mobile)
- Vertical line: center of cell, 10px gap at intersection
- Horizontal line: center of cell, 10px gap at intersection
- Node dot: 1.8px radius at exact center
- Line opacity: 50% white
- Node opacity: 60% white

### STEP 3: `page.tsx` — Width Fix

Replace `w-full` checks. Ensure `main` uses `w-full` not `w-screen`.

### STEP 4: `next.config.ts` — Images Check

Verify:
```ts
images: {
  unoptimized: true,
}
```

### STEP 5: Deep Grid Alignment — All Sections

For each section, convert these Tailwind utilities to grid equivalents:

**Mapping table:**
| Original | Grid Utility |
|---|---|
| `gap-4` / `gap-4` (16px) | `gap-grid-1` (80→240px) — TOO BIG. Use `gap-4` for fine gaps, `gap-grid-1` for coarse |
| `gap-6` (24px) | `gap-4` or `gap-grid-1` depending on context |
| `gap-8` (32px) | `gap-grid-1` |
| `mb-16` (64px) | `mb-grid-1` |
| `mb-24` (96px) | `mb-grid-1` or `mb-grid-2` |
| `mb-32` (128px) | `mb-grid-2` |
| `mt-48` (192px) | `mt-grid-2` |
| `py-12` (48px) | `py-4` or keep |
| `py-16` (64px) | `py-8` or `py-grid-1` |
| `py-24` (96px) | `py-grid-1` |
| `py-32` (128px) | `py-grid-2` |
| `px-6` (24px) | `gsnap-1` (but 240px is too big for mobile!) |
| `px-8` (32px) | `gsnap-1` or keep `px-8` |
| `px-12` (48px) | `gsnap-1` |
| `px-16` (64px) | `gsnap-1` |

**IMPORTANT:** With `--grid-size: 240px`, `gsnap-1` = 240px padding. That's WAY too much for mobile content padding. We need a dual approach:
- **Section outer padding:** Keep `px-6 md:px-12` (fine control), don't use `gsnap-*` for outer padding
- **Content alignment:** Use `gsnap-*` for content indentation (e.g., text blocks, cards)
- **Vertical spacing:** Use `py-grid-*`, `mt-grid-*`, `mb-grid-*`, `gap-grid-*`

**Revised strategy:**
- `gsnap-*`: ONLY for content indentation/offset (left padding of text blocks), NOT for section outer padding
- `py-grid-*`: For section vertical padding
- `gap-grid-*`: For grid gaps between major elements
- `mt-grid-*` / `mb-grid-*`: For vertical margins between sections/major blocks
- Fine gaps (inside cards, between small elements): Keep Tailwind defaults (`gap-4`, `space-y-4`, etc.)

### STEP 6: Footer.tsx — Marquee Width Fix

Ensure Marquee component doesn't cause horizontal overflow. Check if `w-screen` is used.

### STEP 7: Build & Test

```bash
cd /Users/4ngl/Projects/defact_website
TURBOPACK=0 npm run build
```

---

## Files to Modify (ordered)

1. `src/app/globals.css` — Grid size, overflow, utilities
2. `src/components/InterfaceGrid.tsx` — SVG → CSS background
3. `src/app/page.tsx` — Width fix
4. `next.config.ts` — Images verification
5. `src/sections/HeroSection.tsx` — Deep grid alignment
6. `src/sections/ArtifactsSection.tsx` — Deep grid alignment
7. `src/sections/ManifestoSection.tsx` — Deep grid alignment
8. `src/sections/ProtocolSection.tsx` — Deep grid alignment
9. `src/sections/ProcessSection.tsx` — Deep grid alignment
10. `src/sections/V2GallerySection.tsx` — Deep grid alignment + image check
11. `src/sections/TransmitSection.tsx` — Deep grid alignment
12. `src/sections/CreatorBiosSection.tsx` — Deep grid alignment
13. `src/sections/Footer.tsx` — Deep grid alignment + marquee fix
14. `src/components/Marquee.tsx` — Width check

---

## Verification Checklist (for post-Oracle review)

- [ ] Build succeeds: `TURBOPACK=0 npm run build` exits 0
- [ ] No horizontal scrollbar on Desktop (Chrome, Safari)
- [ ] Grid visible at ~240px cell size on Desktop, ~120px on Mobile
- [ ] Grid scrolls smoothly with content (no lag in Safari Desktop)
- [ ] All images load (no 404s in browser devtools)
- [ ] Content aligns visually to grid lines (text blocks, cards, headers)
- [ ] `gsnap-*` only used for content indentation, not outer padding
- [ ] Navbar still glass-like and working
- [ ] Scrollprogress still visible at top

---

## Notes for Oracle

- The user prefers "Digital Decay Luxury" aesthetic (MSCHF × Mugler × 032C × Rick Owens)
- Keep existing colors: `--void: #000FEA`, `--signal: #FFFFFF`, etc.
- Keep existing fonts: Clash Grotesk, DM Mono, Inter, Playfair Display
- Keep glass-like navbar (user explicitly likes it)
- Keep scrollprogress (user explicitly likes it)
- The grid should look like a "blueprint" / "Blaupause"
- Current branch: `main`
- Build command: `TURBOPACK=0 npm run build`
- Deploy: `git add -A && git commit -m "..." && git push origin main`
- Live URL: `https://morayeel5911-sketch.github.io/defact_website/`
