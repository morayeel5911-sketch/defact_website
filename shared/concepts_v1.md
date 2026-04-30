# DEFACT Visual Direction Concepts v1

> Generated for DEFACT Lead Visual Designer  
> Date: 2026-04-28  
> Status: Concept Specification — Ready for Implementation Review  

This document presents three distinct visual directions for the DEFACT landing page. Each direction is a completely different gallery experience while remaining faithful to the **Design Constitution** (`/shared/DESIGN.md`).

**Current State Reference:** The live site is "Clinical Archive" — white backgrounds (`#FAFAFA`), chrome torus knot placeholder, Clash Grotesk headlines at 10vw, DM Mono metadata at 0.75rem, Playfair italic manifesto, grid-based product cards with `#E6E6E6` borders, fixed navigation with backdrop blur, 8-section scroll layout.

---

# DIRECTION A — "THE VAULT"

## 1. Visual Thesis
**A museum storage room at 4 AM — vast, cold, lit only by a single halogen tracking the chrome artifact's edges.** Objects exist in a state of archival suspension; the viewer is an intruder in a protected space.

## 2. Atmosphere Description
Scrolling through "The Vault" feels like walking along an infinitely long white corridor where each section is a room behind frosted glass. Information is withheld until you arrive — no previews, no teasers. The 3D object hangs in absolute center-frame, isolated on its plinth, breathing slowly. Typography arrives late, not early. The experience rewards patience with sudden clarity.

## 3. Composition Rules

| Rule | Value | Rationale |
|------|-------|-----------|
| Grid | Single-column, max-width 42rem (672px) for text blocks | Prevents any center-aligned marketing layouts |
| Asymmetry | R3F canvas occupies **full viewport** z-index 0; all typography floats above at z-index 10 with generous offset | Breaks the "card grid" convention entirely |
| Section dividers | 1px horizontal rule (`#E0E0E0`) spanning 100% width, not card borders | Linear progression, not modular boxes |
| Hero | No visible text in first 90vh. Only the 3D object, centered, breathing. Title appears below fold | Forces attention on material first |
| Margin philosophy | 15vw horizontal padding on desktop, 6vw on mobile | Extreme whitespace as active design element |

**Z-Index Layering:**
```
z-0:   R3F Canvas (full viewport, fixed, transparent background)
z-5:   Section dividers (1px lines)
z-10:  Typography and content blocks
z-50:  Navigation (minimal, no backdrop blur — solid)
z-999: Grain overlay (mix-blend-mode: soft-light)
```

## 4. Design Tokens

### Color Changes from Current

| Token | Current | Vault Direction | Change |
|-------|---------|-----------------|--------|
| `--void` | `#FAFAFA` | `#F0F0F0` | Cooler, slightly grey — museum fluorescent lighting |
| `--anodized` | `#FFFFFF` | `#F5F5F5` | Never pure white — always slightly muted |
| `--signal` | `#111111` | `#0D0D0D` | Deeper, more absolute |
| `--steel` | `#7A7A7A` | `#9A9A9A` | Lighter grey — less contrast, more atmospheric |
| `--border` | `#E6E6E6` | `#D5D5D5` | Slightly more visible for minimal structure |
| `--chrome` | `#808080` | `#A0A0A0` | Brighter, the ONLY reflective/color moment |
| `--alarm` | `#D0403B` | UNCHANGED | Reserved for sold-out states |

**Note:** No new colors introduced. Strict monochrome. The chrome 3D object is the only "warmth" in the entire experience.

### Type Scale Changes

| Element | Current | Vault Direction |
|---------|---------|-----------------|
| Hero display | `clamp(3rem, 10vw, 10rem)` | `clamp(4rem, 14vw, 12rem)` — even more dominant |
| Hero display weight | 700 | 700 (unchanged) |
| Hero display letter-spacing | -0.02em | `-0.03em` — tighter, more mass |
| Section headers | `3-4rem` | `2.5rem` — smaller, more obedient |
| Body | 1rem / 16px | 1.125rem / 18px — slightly larger for readability at distance |
| Captions/metadata | 0.75rem | 0.7rem (`11.2px`) — even more miniature, more precise |
| Mono letter-spacing | 0.05em | `0.08em` — more spaced, archival catalog feel |

### Spacing Changes

| Context | Current | Vault Direction |
|---------|---------|-----------------|
| Major section padding | `py-24` (96px) | `py-40` (160px) — much more breath |
| Hero height | 100vh | **140vh** — object sits in upper 60%, text emerges at 100vh-140vh |
| Between sections | 0 | `mt-0` with 1px divider; no stacking gap |
| Horizontal padding | `px-6 md:px-12` | `px-8 md:px-[15vw]` — extreme margins |
| Content max-width | `max-w-7xl` (1280px) | `max-w-[42rem]` (672px) for text — never wide |

## 5. Section-by-Section Breakdown

### Hero (First Viewport)
- **R3F Canvas:** Full `100vw × 100vh`, fixed position, transparent alpha. Object centered at `[0, 0, 0]`, scale `1.0`. Camera at `[0, 0, 4.5]`, FOV `42` (narrower, more intimate).
- **Visible text:** **NONE** in first 90vh. The hero is the object alone.
- **Below fold (90vh-140vh):** The DEFACT title appears as a single massive word, left-aligned at `15vw`, `clamp(4rem, 14vw, 12rem)`. Below it, a single line in DM Mono: `ARCHIVE — COLOGNE — EST. 2024`. Then a thin 1px rule spanning full width.
- **No tagline, no description, no CTA.** Only presence.
- **Scroll behavior:** Scrolling down causes the object to slowly drift upward (parallax Y: `-30px` over first 50vh of scroll) while rotating on Y-axis from `0` to `π/4`.

### Works Index (3 Products)
- **No card grid.** No borders, no backgrounds on product items.
- **Layout:** Full-width horizontal list. Each product is a row separated by 1px `#D5D5D5` line.
- **Row content (left to right):**
  - Index number in DM Mono, `0.7rem`, `#A0A0A0`, e.g., `00.01`
  - Product name in Clash Grotesk, `1.5rem`, `#0D0D0D`
  - Category in DM Mono italic, `0.7rem`, `#9A9A9A`
  - Status (Available/Sold Out) right-aligned, `0.7rem` — `#9A9A9A` or `#D0403B`
- **Hover state:** The entire row gains `background: #E8E8E8` instantly (no shadow, no border-radius). The product name shifts `translateX(8px)` over 300ms ease-out. No 3D preview on hover — this is a list, not a catalog.
- **On click:** (future) Link to detail page. For now, no interaction.

### Manifesto Quote
- **Background:** `#F0F0F0` (same as void — seamless transition).
- **Layout:** Left-aligned block, max-width `42rem`, positioned at `15vw` margin. **Not centered.**
- **Quote text:** Playfair Display italic, `2.5rem`, leading `1.35`, `#0D0D0D`. The quote is longer and uninterrupted — no attribution visible immediately.
- **Attribution appears 200ms after scroll-into-view:** DM Mono, `0.7rem`, `#9A9A9A`, letter-spacing `0.08em`, positioned below quote with `2rem` gap.
- **No quotation marks in the text.** Only the typography implies quotation.

### The Duo
- **Background:** `#F5F5F5` — a subtle shift from the surrounding `#F0F0F0`.
- **Layout:** Two columns, but NOT the current 50/50 grid. Instead: left column `35%` width, right column `65%` width. Asymmetric.
- **Left column (35%):** Two thin portrait placeholders (currently solid `#1C1C1E` blocks with 3D object). These are reduced to `aspect-[3/4]` instead of `aspect-square`. Name and role metadata below each in DM Mono, `0.75rem`.
- **Right column (65%):** A single paragraph of body text in Inter, `1.125rem`, `#7A7A7A`, max-width `40ch`. Below it: a single line in DM Mono — `[PROCESS DOCUMENTATION AVAILABLE UPON REQUEST]`.
- **R3F:** The 3D objects in the portrait blocks use **dark contrast material** (`#1C1C1E`, roughness 0.8, metalness 0.1) — matte, sculptural, not chrome.

### Acquisition
- **No filter chips.** No buttons. No interactive elements.
- **Layout:** Same horizontal list as Works Index, but with additional metadata columns.
- **Columns per row:** Index | Name — Category | Edition | Material | Status
- **All in DM Mono, `0.75rem`,** except Name which is Clash Grotesk `1.25rem`.
- **Active hover:** Row background shifts to `#E8E8E8`.
- **The list is the interface.** No cards, no thumbnails.

### Process
- **Background:** `#F0F0F0`.
- **Layout:** Single column, max-width `42rem`, left-aligned at `15vw`.
- **No giant chapter numbers.** Instead: small DM Mono labels `[01]`, `[02]`, `[03]` at `0.7rem`, `#A0A0A0`.
- **Chapter titles:** Clash Grotesk, `2rem`, `#0D0D0D`.
- **Body:** Inter, `1.125rem`, `#7A7A7A`.
- **Vertical spacing between chapters:** `8rem` — vast, contemplative gaps.
- **No pull-quotes within process.** The manifesto section was the only quotation moment.

### Transmit / Contact
- **Background:** `#F5F5F5` — the lightest moment in the page.
- **Layout:** Single column, max-width `42rem`.
- **Form styling:** Inputs have **no bottom border**. Instead, a full 1px rectangular border (`#D5D5D5`) around each field. No underlines — rectangles only. `border-radius: 0`. Background: `#FFFFFF`.
- **Labels:** DM Mono, `0.65rem`, `#9A9A9A`, uppercase, letter-spacing `0.08em`, positioned above the field (not inside).
- **Submit button:** Full-width, `#0D0D0D` background, `#FFFFFF` text. On hover: background `#A0A0A0`. No transition on color — instant switch, mechanical.
- **No "SEND A SIGNAL TO THE STUDIO" tagline.** The section title "TRANSMIT" and the form are enough.

### Footer
- **Layout:** Single row, full width, 1px top border `#D5D5D5`.
- **Three zones spaced with justify-between:**
  - Left: `DEFACT © 2026` in DM Mono `0.65rem`
  - Center: `COLOGNE, GERMANY` in DM Mono `0.65rem`
  - Right: No links. Just the text `ARCHIVE` in DM Mono `0.65rem`
- **Height:** Minimal. `py-6`. No navigation links. The footer is a stamp, not a menu.

## 6. 3D Scene Brief

### Camera
- **Position:** `[0, 0, 4.5]` — pulled back slightly from current `z: 5`
- **FOV:** `42` (narrower than current 45) — telephoto compression, more sculptural
- **Fixed.** No scroll-driven camera movement. Only object rotation.
- **Target:** `[0, 0, 0]` — dead center.

### Lighting Mood
- **Environment:** `preset="studio"` with `envMapIntensity: 2.5` (increased from 2.0) — the chrome object must be the brightest thing on screen.
- **Directional light 1:** `[5, 5, -5]`, intensity `0.4`, color `#FFFFFF` — key light from upper right
- **Directional light 2:** `[-3, 2, -5]`, intensity `0.2`, color `#E8E8FF` — subtle cool fill
- **No ambient light increase.** The object lives in shadow; the chrome catches light.
- **ContactShadows:** `opacity: 0.25`, `blur: 1` (sharper), `scale: 6` (smaller — the plinth is intimate, not vast)

### Material Tweaks
- **Hero object:** Chrome primary — `metalness: 0.95`, `roughness: 0.15`, `color: #C8C8C8` (slightly cooler than current `#C0C0C0`), `envMapIntensity: 2.5`
- **Duo portrait objects:** Dark contrast — `metalness: 0.1`, `roughness: 0.8`, `color: #1C1C1E` — matte, archival

### Scroll Behavior
- **No continuous scroll animation in canvas.** Use `frameloop="demand"`.
- **Trigger `invalidate()` on scroll events** (via `window.addEventListener` with `{ passive: true }`) to drive rotation only when user scrolls.
- **Rotation formula:** `obj.rotation.y = scrollProgress * Math.PI * 0.5` — 90 degrees total over full page scroll. Not constant rotation — scroll drives it directly.
- **Parallax:** Object Y position shifts `-0.05` units over first 100vh scroll (`Math.sin(Math.PI * scrollProgress) * 0.05`). Subtle.

### Post-Processing
- **SSAO:** Reduce intensity from 30 to `20` — lighter contact shadows on light background
- **Vignette:** `offset: 0.45`, `darkness: 0.25` — very wide, very subtle
- **Bloom:** Disabled entirely for this direction. Chrome should not bloom in a clinical vault. Only reflections define form.
- **Noise:** `opacity: 0.015` — reduced from CSS grain

## 7. Anti-Patterns Checklist

| Anti-Pattern | How Vault Avoids It |
|-------------|---------------------|
| Centered hero copy | No hero copy at all in first 90vh. Title is below-fold, left-aligned. |
| Card grids with rounded corners | Full-width horizontal rows with 1px lines. Zero borders on items. |
| Drop shadows | No `box-shadow` anywhere. Only 1px `#D5D5D5` borders. |
| Rounded corners > 2px | All corners: 0px. Rectangular inputs, sharp edges. |
| Feature lists | Acquisition is a data table/list, not feature bullets. |
| Marketing taglines | "A COLOGNE-BASED DESIGN DUO..." removed. Only "ARCHIVE — COLOGNE — EST. 2024". |
| Testimonial carousels | Only a single manifesto quote, left-aligned, static. |
| Animated counters | No numbers that increment. Index numbers are static strings. |
| Floating action buttons | No persistent UI elements beyond fixed nav. |
| Chat widgets / cookie banners | Constitution-compliant: absent. |
| Stock photography | Only 3D chrome object and placeholder dark blocks. |
| Purple/blue gradients | Strict monochrome `#F0F0F0` → `#0D0D0D`. No gradients of any kind. |
| Burger menu sliding from left | Mobile menu is full-screen fade, not slide. |

## 8. Key CSS Changes

```css
:root {
  --void: #F0F0F0;
  --anodized: #F5F5F5;
  --signal: #0D0D0D;
  --steel: #9A9A9A;
  --chrome: #A0A0A0;
  --border: #D5D5D5;
  /* --alarm remains #D0403B */
}

body {
  background: var(--void);
  color: var(--signal);
}

/* Reduced grain — more clinical */
body::after {
  opacity: 0.015;
}

/* Narrower, more authoritative scrollbar */
::-webkit-scrollbar {
  width: 2px;
}

/* Section dividers */
section + section::before {
  content: "";
  display: block;
  height: 1px;
  background: var(--border);
  margin-bottom: 10rem; /* 160px */
}

/* Form inputs: rectangular, not underlined */
input, textarea {
  border: 1px solid var(--border);
  border-radius: 0;
  background: #FFFFFF;
  padding: 1rem;
}

/* No gradient backgrounds anywhere */
/* Remove: background: linear-gradient(...) from all sections */
```

## 9. Key Component Changes

### Navigation.tsx
- **Remove `backdrop-blur-md`.** Nav background switches between `transparent` and `var(--void)` (`#F0F0F0`) with no blur.
- **Height reduced:** `py-3` instead of `py-4`. More compact.
- **Mobile menu:** Instead of white overlay, use `background: var(--void)` with fade-in opacity transition. No sliding.
- **Links:** Remove `hover:translate-x-1`. Hover only changes color: `#9A9A9A` → `#A0A0A0`. No motion.

### page.tsx
- **Hero section restructured:** Remove `ProductShowcase` as separate component. Inline the `<Scene>` full-viewport. Title block moves to `100vh` offset with `mt-[100vh]`.
- **Works section:** Replace `grid grid-cols-1 md:grid-cols-3 gap-8` with `flex flex-col` containing rows. Each row is a `div` with `py-6 border-b border-[#D5D5D5]`. Remove the card containers with `#E6E6E6` borders. Remove 3D hover previews entirely.
- **Works product data structure unchanged**, just rendering as list rows.
- **Manifesto:** Change from `text-center` to `text-left` (or default). Remove `max-w-4xl mx-auto` — use `max-w-[42rem] ml-[15vw]`.
- **Duo:** Change `grid-cols-2` to custom `grid-cols-[35%_65%]` or use Flex with `w-[35%]` / `w-[65%]`.
- **Acquisition:** Replace filter chips with... nothing. Remove the filter row entirely. Just the list.
- **Process:** Remove giant watermarked `01/02/03` numbers. Use small `[01]` labels.
- **Transmit:** Replace border-bottom inputs with full bordered rectangles. Remove tagline.
- **Footer:** Replace three-column centered layout with single `flex justify-between` row. Remove link list.

### ProductModel.tsx
- **No geometry changes.** The torus knot remains the placeholder.
- **Material props:** Accept a `variant` prop: `"chrome" | "matte" | "dark"`.
- **Chrome variant (hero):** `metalness: 0.95`, `roughness: 0.15`, `color: #C8C8C8`.
- **Matte variant (duo portraits):** `metalness: 0.1`, `roughness: 0.8`, `color: #1C1C1E`.
- **Scroll-driven rotation:** Move from breathing animation to direct scroll-linked rotation. Keep breathing at reduced amplitude (`0.01` instead of `0.02`).
- **Scale:** Reduce default from `0.8` to `0.7` — object should feel slightly smaller, more precious.

### Scene.tsx
- **Background:** Change from `<color attach="background" args={["#FFFFFF"]}/>` to NO background color. Canvas uses `gl={{ alpha: true, antialias: true }}` with `style={{ background: 'transparent' }}`.
- **ContactShadows:** `blur: 1` (sharper), `opacity: 0.25`, `scale: 6`.
- **Lighting:** Reduce ambient to `0.6` from `0.8`. Reduce directional 1 intensity to `0.4` from `1.0`.
- **Post-processing:** Add `frameloop="demand"` to `<Canvas>`. Implement scroll listener that calls `invalidate()`.
- **Remove OrbitControls.** No need if they are already disabled.

---

# DIRECTION B — "THE LEDGER"

## 1. Visual Thesis
**A specimen catalog from 1923 cross-referenced with a contemporary metalworker's notebook — every object is annotated, measured, and indexed with the severity of a botanical archive.**

## 2. Atmosphere Description
Scrolling through "The Ledger" feels like turning pages of a rare monograph. Dense with information but never cluttered. Thin horizontal and vertical rules create invisible cells that organize the eye. Numbers in the margins act as anchors. The 3D object is not the hero — it is a plate, a figure, positioned alongside its technical description like an engraving in an old book. The background has the warmth of aged paper.

## 3. Composition Rules

| Rule | Value | Rationale |
|------|-------|-----------|
| Grid | 12-column, but used with **pinned two-column sidebar layout** | Left sidebar: 3 columns (25%) sticky, right content: 9 columns (75%) |
| Asymmetry | Left sidebar contains persistent navigation + section index; right side contains all content | Creates the feeling of a reference document with a fixed table of contents |
| Rules | `0.5px` horizontal rules (`#D4CFC4`) between ALL elements — thinner than current | Finer precision, archival delicacy |
| Section dividers | Double-rule at major section breaks: two `0.5px` lines with `3px` gap between them | Like specimen catalogs |
| Hero | Split layout immediately — no full-screen object. 3D appears in a "plate" area alongside opening index data | Object is data, not spectacle |

**Z-Index Layering:**
```
z-0:   Page background (#F2F0EB)
z-5:   Thin rules and grid lines
z-10:  3D canvas plates (inline, not fixed)
z-20:  Text content
z-30:  Sticky left sidebar
z-999: Grain overlay
```

## 4. Design Tokens

### Color Changes from Current

| Token | Current | Ledger Direction | Change |
|-------|---------|------------------|--------|
| `--void` | `#FAFAFA` | `#F2F0EB` | Warm paper tone — aged manuscript |
| `--anodized` | `#FFFFFF` | `#FAF8F3` | Slightly warm white for cards |
| `--signal` | `#111111` | `#1A1714` | Warm black, not pure — ink on paper |
| `--steel` | `#7A7A7A` | `#8C867A` | Warm grey — pencil/lead tone |
| `--chrome` | `#808080` | `#6B6560` | Muted, like a catalog illustration |
| `--border` | `#E6E6E6` | `#D4CFC4` | Warm, sepia-tinged rule color |
| `--alarm` | `#D0403B` | `#B85C4F` | Muted terracotta — more period-appropriate |
| **NEW:** `--ink` | — | `#3A3530` | Dark warm brown for secondary headings |
| **NEW:** `--rule` | — | `#D4CFC4` | Dedicated rule color |

**Note:** The palette is now warm-neutral, not cool-neutral. No chrome color in UI — the 3D object's chrome is the only metallic moment.

### Type Scale Changes

| Element | Current | Ledger Direction |
|---------|---------|------------------|
| Hero display | `clamp(3rem, 10vw, 10rem)` | `clamp(3rem, 6vw, 5rem)` — **much smaller**, more editorial |
| Hero display weight | 700 | 600 — slightly lighter |
| Hero display font | Clash Grotesk | **Playfair Display (normal, not italic)** — editorial serif for an opening |
| Section headers | Clash Grotesk `3-4rem` | DM Mono, `0.8rem`, UPPERCASE, letter-spacing `0.1em` — no large headers, only index labels |
| Body | Inter 1rem | Inter 1rem, leading `1.6` — unchanged |
| Captions/metadata | DM Mono 0.75rem | DM Mono `0.65rem` — even smaller, denser |
| Mono letter-spacing | 0.05em | `0.06em` — tight but present |
| Pull quotes | Playfair Display italic 2-5rem | Playfair Display italic `1.75rem`, `#3A3530` — smaller, integrated |
| Numbers (indices) | 0.75rem | `0.65rem`, positioned in left margin at negative offset | 

### Spacing Changes

| Context | Current | Ledger Direction |
|---------|---------|------------------|
| Major section padding | `py-24` (96px) | `py-16` (64px) — tighter, denser |
| Row/item padding | `py-4` | `py-3` — compact list density |
| Gap between sections | — | `8px` (the double-rule gap) |
| Horizontal padding | `px-6 md:px-12` | `px-6 md:px-8` — narrower, content-dense |
| Content max-width | `max-w-7xl` | `max-w-[90rem]` (1440px) — wider for sidebar layout |

## 5. Section-by-Section Breakdown

### Hero (First Viewport)
- **Layout:** No full-screen canvas. Instead: two-column layout immediately.
  - **Left (3 cols / 25%):** Sticky sidebar containing:
    - "DEFACT" in DM Mono `0.7rem`, uppercase, at top
    - Below: an index of the entire page with page numbers: `WORKS ...... 01`, `MANIFESTO .. 02`, `THE DUO .... 03`, etc. in DM Mono `0.65rem`.
    - At bottom: `COLOGNE, GERMANY` and `© 2026`.
  - **Right (9 cols / 75%):**
    - Top rule (`0.5px`, `#D4CFC4`).
    - Opening "title page" treatment: "OBJECTS OF DISTINCTION" in **Playfair Display (normal)**, `clamp(3rem, 6vw, 5rem)`, `#1A1714`.
    - Subtitle in DM Mono italic: `A catalogue of artifacts by DEFACT`.
    - Thin rule.
    - **3D "Plate" area:** A `400px × 400px` inline canvas (not fixed/fullscreen) containing the chrome object at scale `0.6`. The canvas has a `0.5px border` (`#D4CFC4`) like an engraving plate.
    - Below the plate: a small caption in DM Mono `0.6rem`: `FIG. 01 — TORUS KNOT SPECIMEN, CHROME. RENDER DATE: 2026-04-28`.
    - Below that: opening paragraph in Inter `1rem`, max-width `55ch`, `#8C867A`.
    - Bottom rule.
- **No scroll indicator.** The index in the sidebar indicates there is more.

### Works Index (3 Products)
- **No card grid. No hover previews.**
- **Layout:** Table-like structure with columns:
  - `FIG.` — DM Mono, `0.65rem`, `#6B6560`
  - `ARTIFACT` — Clash Grotesk, `1.1rem`, `#1A1714`
  - `CATEGORY` — DM Mono italic, `0.65rem`, `#8C867A`
  - `MATERIAL` — DM Mono, `0.65rem`, `#8C867A`
  - `STATUS` — DM Mono, `0.65rem`, `#8C867A` or `#B85C4F`
  - `EDITION` — DM Mono, `0.65rem`, `#6B6560`
- **Each product is a row** separated by `0.5px` rule.
- **Left margin numbers:** Each row has a marginal `01`, `02`, `03` in DM Mono `0.6rem`, `#B5AFA4`, positioned at `left: -3rem` (absolute, in the gutter).
- **3D present?** NO. Only text data. The 3D object was in the hero plate.

### Manifesto Quote
- **Background:** `#F2F0EB` (continuous, no shift).
- **Layout:** Indented block quote style. Left border: `2px solid #D4CFC4`. Padding-left: `2rem`.
- **Quote:** Playfair Display italic, `1.75rem`, `#3A3530`, leading `1.45`. Max-width `55ch`.
- **Attribution:** DM Mono, `0.65rem`, `#8C867A`, positioned inline after a long em-dash: `— STARMIRROR MANIFESTO, 2025`.
- **No center alignment.** Block quote is left-aligned, editorial-style.

### The Duo
- **Layout:** Still 2 columns, but now within the 9-column right content area.
- **Each person is a "specimen entry":**
  - Top: 3D canvas `280px × 200px` (landscape, not portrait), bordered `0.5px #D4CFC4`.
  - Name in Clash Grotesk, `1.25rem`, `#1A1714`.
  - Role in DM Mono, `0.65rem`, `#8C867A`, uppercase.
  - Below: a small paragraph in Inter `0.875rem`, `#8C867A`, max-width `35ch` — a brief "artist statement" for each, like a museum wall label.
  - Technical data table below name:
    ```
    DISCIPLINE ... [VALUE]
    ORIGIN ....... [VALUE]
    ```
    in DM Mono `0.6rem`, rows separated by `0.5px` rule.

### Acquisition
- **Same dense table as Works** but extended with:
  - `PRICE` column (or `VALUE` / `PRICE ON REQUEST`)
  - `DATE ACQUIRED` column (or `PENDING`)
- **Filter chips remain** but redesigned: small DM Mono `0.6rem`, `0.5px border #D4CFC4`, `padding: 2px 8px`, `border-radius: 0`. Active state: `background: #1A1714`, `color: #FAF8F3`.

### Process
- **No large chapter numbers.**
- **Instead:** Each phase is a "spread" with:
  - Left side: a small 3D plate (200px) showing the process state.
  - Right side: the description.
- **Phase labels:** `[01] CONCEPTION`, `[02] FABRICATION`, `[03] FINITION` in DM Mono `0.7rem`, uppercase, `#6B6560`. Not large — structural.
- **Quotes within process:** Italic inline, not pull-quotes. "Form follows fiction." in Playfair Display italic `1rem`, `#3A3530`, inline after the paragraph.

### Transmit / Contact
- **Layout:** Two-column within the 9-col area.
  - Left: "TRANSMIT" in Playfair Display, `2rem`, `#1A1714`. Below: instructions in Inter `0.875rem`, `#8C867A`.
  - Right: the form.
- **Form styling:** `0.5px border #D4CFC4` on all inputs. Background: `#FAF8F3`. `border-radius: 0`. Labels in DM Mono `0.6rem`, `#8C867A`, uppercase.
- **Submit button:** `background: #1A1714`, `color: #FAF8F3`, DM Mono `0.7rem`, uppercase. Hover: `background: #3A3530`.

### Footer
- **Integrated into left sidebar.** The sidebar IS the footer — there is no separate footer block.
- On mobile: sidebar collapses to top strip; footer appears as final row with `0.5px` top rule.

## 6. 3D Scene Brief

### Camera
- **Hero plate:** Camera at `[0, 0, 4]`, FOV `45`. Object at `[0, 0, 0]`, scale `0.6`.
- **Duo/process plates:** Camera at `[0, 0, 3.5]`, FOV `40`. Object scale `0.5`.
- **Canvas sizing:** Inline, not fixed. Aspect ratio `1/1` for hero, `4/3` for process plates.
- **No scroll-driven camera.** Each plate is a static view with subtle breathing only.

### Lighting Mood
- **Environment:** `preset="studio"` but at reduced intensity: `envMapIntensity: 1.8` — less clinical, more subdued.
- **Ambient:** `0.7` — slightly warmer to match paper tone.
- **Directional:** Single key light `[4, 4, -4]`, intensity `0.6`, color `#FFF8F0` (warm white — like archival lighting).
- **No ContactShadows on small plates** — the border frame provides grounding.
- **ContactShadows only on hero plate:** `opacity: 0.15`, `blur: 2`.

### Material Tweaks
- **All objects:** Slightly warmer chrome: `color: #BCB0A4`, `metalness: 0.9`, `roughness: 0.2`.
- **The warmth should feel like aged silver, not clinical chrome.** The `envMap` will still be studio preset but the material color shift adds patina.

### Scroll Behavior
- **NO scroll-driven rotation.** Each plate is a static still life.
- **Breathing only:** `amplitude: 0.015` (reduced from current 0.02), period `5s` (slower).
- **frameloop="demand"** — only invalidate on hover (if interactive) or every frame for breathing.

### Post-Processing
- **No post-processing on inline canvases.** Too heavy for multiple small scenes.
- **SSAO/Bloom/Vignette:** Removed entirely for this direction. The flat catalog aesthetic should feel printed, not CG.
- **If post-processing is required for hero only:** Very subtle SSAO (`intensity: 10`) and no bloom.

## 7. Anti-Patterns Checklist

| Anti-Pattern | How Ledger Avoids It |
|-------------|---------------------|
| Card grids with shadows | Data table layout with `0.5px` rules. No cards, no shadows. |
| Drop shadows | Zero shadows. Grounding provided by thin borders only. |
| Rounded corners | All `border-radius: 0`. Printed-page aesthetic. |
| Feature lists | Dense catalog data tables, not bullet lists. |
| Centered hero copy | Two-column editorial layout — title left, 3D plate right. |
| Animated counters | Static index numbers. No motion. |
| Generic dashboard UI | The "data table" is a museum specimen list, not an admin panel. Typography and spacing make it archival, not SaaS. |
| Marketing language | Opening subtitle: "A catalogue of artifacts by DEFACT" — declarative, not persuasive. |
| Burger menu sliding from left | Sidebar is persistent on desktop; mobile uses top strip, not overlay. |
| Stock photography | Only 3D plates with precise captions. |

## 8. Key CSS Changes

```css
:root {
  --void: #F2F0EB;
  --anodized: #FAF8F3;
  --signal: #1A1714;
  --steel: #8C867A;
  --chrome: #6B6560;
  --border: #D4CFC4;
  --alarm: #B85C4F;
  --ink: #3A3530;
  --rule: #D4CFC4;
}

body {
  background: var(--void);
  color: var(--signal);
}

/* Thinner rules */
.rule-thin {
  border: none;
  border-top: 0.5px solid var(--rule);
}

/* Double-rule for section breaks */
.rule-double::before,
.rule-double::after {
  content: "";
  display: block;
  border-top: 0.5px solid var(--rule);
}
.rule-double::after {
  margin-top: 3px;
}

/* Marginal numbers — positioned in gutter */
.marginal-num {
  position: absolute;
  left: -3rem;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: #B5AFA4;
}

/* Small inline 3D plates */
.plate-canvas {
  border: 0.5px solid var(--rule);
  background: var(--anodized);
  display: block;
}

/* Remove all gradient backgrounds */
section {
  background: transparent; /* let --void show through */
}

/* Sticky sidebar */
.sidebar {
  position: sticky;
  top: 2rem;
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

## 9. Key Component Changes

### Navigation.tsx
- **Remove existing top nav entirely.** For "The Ledger," navigation lives in the **left sidebar** — persistent, not fixed top.
- **Mobile:** Reintroduce a minimal top bar with brand name and a "CONTENTS" button that expands to show the sidebar index. No slide animation — instant toggle.

### page.tsx
- **Restructure entire layout to two-column sidebar:**
  ```tsx
  <div className="flex min-h-screen">
    <aside className="w-1/4 sticky top-0 h-screen border-r border-[#D4CFC4] p-6">
      {/* Sidebar: brand, index, footer */}
    </aside>
    <main className="w-3/4 p-8">
      {/* All sections render here */}
    </main>
  </div>
  ```
- **Hero:** Remove `<ProductShowcase>` full-screen. Instead inline a `<Scene>` in a bordered container `400×400px`.
- **Works:** Replace grid with stacked rows. Add marginal numbers using absolute positioning.
- **Manifesto:** Indent with left border. Remove center alignment.
- **Duo:** 2-column within main area. Inline small canvases, not full-width dark blocks.
- **Process:** Add inline 3D plates for each phase.
- **Transmit:** 2-column within main area.
- **Footer:** Moved to sidebar bottom. No separate footer section.

### ProductModel.tsx
- **Add `autoRotate` prop at `speed: 0.2`** for hero plate — slow, continuous museum-plinth rotation. Not scroll-driven.
- **Reduce scale default to `0.6`.**
- **Material warm shift:** Default color to `#BCB0A4`.

### Scene.tsx
- **Accept `size` prop:** `"full" | "plate"` to switch between full-viewport and inline bordered modes.
- **Plate mode:** Remove `ContactShadows`. Add no background color — let CSS border show through. Canvas uses `alpha: true`.
- **Reduce lighting intensity** in plate mode — objects should feel like illustrations, not spotlit sculptures.

---

# DIRECTION C — "THE RELIC"

## 1. Visual Thesis
**A crypt-to-cathedral procession: you begin in near-total darkness where a single chrome artifact is the only light source, and as you scroll, the darkness recedes into warm gold-tinged illumination, finally arriving at a blinding white archival space.**

## 2. Atmosphere Description
The first scroll is a pilgrimage. You enter in darkness — only the edges of a chrome object catch sharp directional light. As you descend, thin gold lines begin to appear in the margins. Quotes are spoken as incantations, large and centered. By the time you reach the contact form, the background is `#FAFAFA` and the gold has become halos, not foreground. The scroll journey is the narrative: from mystery to clarity, from darkness to documentation.

## 3. Composition Rules

| Rule | Value | Rationale |
|------|-------|-----------|
| Grid | 12-column, asymmetric — 3:5 splits, alternating sides | Drama through compositional tension |
| Asymmetry | Hero is **centered** (the ONLY exception—because the object is a reliquary) but all subsequent sections are heavily asymmetric (2:1 or 1:2) | The hero is sacred; everything else is archival |
| Section backgrounds | Gradient transitions between sections, NOT solid jumps | The procession must feel continuous |
| Text placement | Manifesto quotes full-width, centered, large — like liturgical text on a wall | Incantation aesthetic |
| Gold accent | Line markers, selection highlights, scroll progress indicator — never large fills | Gold as light, not material |

**Z-Index Layering:**
```
z-0:   R3F Canvas (fixed, full-viewport, transparent)
z-1:   CSS gradient layer (fixed, full-viewport, scroll-linked opacity)
z-5:   Accent gold lines (decorative, absolute)
z-10:  Content sections
z-20:  Navigation (glassmorphism on dark, solid on light)
z-999: Grain overlay + subtle vignette CSS
```

## 4. Design Tokens

### Color Changes from Current

| Token | Current | Relic Direction | Change |
|-------|---------|-----------------|--------|
| `--void` | `#FAFAFA` | `varies` — starts `#0A0A0A` (hero), transitions to `#FAFAFA` (footer) | The journey IS the color |
| `--anodized` | `#FFFFFF` | `#FFFFFF` — unchanged | Destination color |
| `--signal` | `#111111` | `#0D0D0D` | Near-black hero text |
| `--steel` | `#7A7A7A` | `#8A8A8A` | Slightly lighter for dark reading |
| `--chrome` | `#808080` | `#C4A35A` | **Gold** — the return of halation |
| `--border` | `#E6E6E6` | `varies` — `#2A2A2A` (hero) to `#E6E6E6` (footer) | Dark to light |
| `--alarm` | `#D0403B` | UNCHANGED | Emergency stays red |
| **NEW:** `--gold` | — | `#C4A35A` | Accent: lines, highlights, selection |
| **NEW:** `--dark-void` | — | `#0A0A0A` | Hero background |
| **NEW:** `--mid-void` | — | `#4A4A4A` | Transition zone background |

**Background Journey:**
```
Hero (0vh)        → #0A0A0A (absolute dark)
Works (100vh)     → #1A1A1A (slight lift)
Manifesto (200vh) → #2A2A2A (grey — quote appears here, gold accents visible)
Duo (300vh)       → #4A4A4A (mid-grey)
Acquisition (400vh)→ #8A8A8A (light grey — text switches to dark)
Process (500vh)   → #C8C8C8 (almost white)
Transmit (600vh)  → #FAFAFA (arrival — full light)
Footer            → #FAFAFA
```

**Text Color Journey:**
- Sections with dark backgrounds (`#0A0A0A` through `#2A2A2A`): Text is `#E8E8E8` (warm white).
- Sections from `#4A4A4A` onward: Text transitions to `#11111` — there is a midpoint where both exist.
- The switch happens at the Acquisition section threshold.

### Type Scale Changes

| Element | Current | Relic Direction |
|---------|---------|-----------------|
| Hero display | `clamp(3rem, 10vw, 10rem)` | `clamp(5rem, 16vw, 14rem)` — **massive**, emerging from darkness |
| Hero display color | `#111111` | `#E8E8E8` — white on black |
| Hero tagline | Playfair italic `#7A7A7A` | Playfair italic `#C4A35A` — gold |
| Section headers | Clash Grotesk `3-4rem` | Clash Grotesk `2.5rem` — smaller, the object dominates |
| Manifesto quote | `2rem-5rem` | `clamp(2rem, 5vw, 4rem)` — centered, large, line breaks like verse |
| Manifesto line-height | `leading-relaxed` | `leading-[1.2]` — tight, dramatic |
| Body | Inter 1rem | Inter `1.05rem` — slightly smaller for density |
| Mono/metadata | 0.75rem | `0.7rem`, letter-spacing `0.06em` |

### Spacing Changes

| Context | Current | Relic Direction |
|---------|---------|-----------------|
| Major section padding | `py-24` (96px) | `py-32` (128px) — dramatic vertical spacing |
| Hero height | 100vh | **150vh** — the object lingers in darkness longer |
| Between elements | `gap-4`, `gap-8` | Increased to `gap-12` or `gap-16` — air around each element |
| Horizontal padding | `px-6 md:px-12` | `px-8 md:px-16` — slightly wider |

## 5. Section-by-Section Breakdown

### Hero (First Viewport: 0-150vh)
- **Background:** `#0A0A0A` — near-black. NOT a gradient. Solid dark.
- **R3F Canvas:** Full-viewport, fixed, transparent. Object centered.
- **Object:** Chrome with **emissive rim** — `emissive: #C4A35A`, `emissiveIntensity: 0.15`. The object appears to be glowing at its edges. Material: `metalness: 1.0`, `roughness: 0.1`, `color: #C8C8C8`, `envMapIntensity: 3.0` — high intensity for sharp reflections in darkness.
- **Lighting:** Single strong key light `[2, 5, 3]`, intensity `1.5`, color `#FFF8E7` (warm white). No fill. Deep shadows.
- **Text in hero:**
  - "DEFACT" in Clash Grotesk, `clamp(5rem, 16vw, 14rem)`, `#E8E8E8`, at `20vh` from top. Massive, haunting.
  - Below it, a single thin **gold line** (`1px`, `#C4A35A`, width `60px`).
  - Below that: "A mirror. A relic. A charm." in Playfair Display italic, `1.5rem`, `#C4A35A`.
- **No metadata in hero.** No datasheet. No tagline. Just the name, a gold line, and the incantation.
- **Scroll indicator:** Gold text (`#C4A35A`) at bottom center: `↓` (no words, just the arrow).

### Works Index (3 Products)
- **Background:** `#1A1A1A` — one step lighter.
- **Layout:** Asymmetric. Left column `40%` contains section label `[01] WORKS` in DM Mono. Right column `60%` contains the product list.
- **Product cards:** Redesigned as **reliquary containers**:
  - Each card: `background: #111111`, `border: 1px solid #2A2A2A`.
  - On hover: `border-color: #C4A35A` (gold), transition `300ms ease-out`. No shadow.
  - Product name: Clash Grotesk, `1.25rem`, `#E8E8E8`.
  - Category: DM Mono, `0.7rem`, `#C4A35A` — gold.
  - Description: DM Mono, `0.7rem`, `#7A7A7A`.
  - No 3D previews. The object is sacred and only shown in hero.
- **Hover reveal:** On card hover, a thin `1px` gold line draws from left to right beneath the product name (CSS `width: 0% → 100%`, `transition: width 400ms ease-out`).

### Manifesto Quote
- **Background:** `#2A2A2A` — the grey threshold.
- **Layout:** Full-width, centered, max-width `55ch`.
- **Quote:** Playfair Display italic, `clamp(2rem, 5vw, 4rem)`, `#E8E8E8`, leading `1.2`, `text-align: center`.
- **Incantation formatting:** Add line breaks to create verse structure:
  ```
  "Material has memory.
  
  Cuts through glare
  and bullshit.
  
  Protect.
  Reflect."
  ```
- **Attribution:** Below with `4rem` gap. DM Mono, `0.7rem`, `#C4A35A`, letter-spacing `0.08em`: `— STARMIRROR MANIFESTO`.
- **Decorative element:** A thin `1px` vertical gold line, `80px` tall, centered above the quote.

### The Duo
- **Background:** `#4A4A4A` — mid-grey. The light begins.
- **Layout:** 2 columns, `1:2` split (left smaller, right larger).
- **Left column:** A single dark image block `aspect-[3/4]`, `background: #0A0A0A`, containing a 3D object with the **dark contrast material** (matte, `#1C1C1E`). The dark object in a dark box — barely visible, implied.
- **Right column:** The two names and roles, stacked vertically with `4rem` gap.
  - Name: Clash Grotesk, `1.5rem`, `#E8E8E8`.
  - Role: DM Mono, `0.7rem`, `#C4A35A`.
  - Below each: a `1px` line `40px` wide, `#8A8A8A` — like a signature underline.
- **No duplicate images.** Only one portrait block, shared context.

### Acquisition
- **Background:** `#8A8A8A` — light grey. **Text color switches to `#111111` here.**
- **This is the transition zone.** The page is now reading like a normal document.
- **Layout:** Single column, max-width `48rem`, left-aligned.
- **Rows:** Acquisition list with `1px border-bottom #A0A0A0` (dark rule on light grey).
- **Index numbers:** DM Mono, `0.7rem`, `#C4A35A` — gold maintains presence.
- **Names:** Clash Grotesk, `1.25rem`, `#111111`.
- **Status:** DM Mono, `0.7rem`, `#111111` (available) or `#D0403B` (sold out).
- **Filter chips:** `background: transparent`, `border: 1px solid #A0A0A0`, `color: #111111`. Active: `background: #111111`, `color: #E8E8E8`, `border-color: #111111`.

### Process
- **Background:** `#C8C8C8` — almost white.
- **Layout:** Alternating asymmetric. Chapter 01: image left (40%), text right (60%). Chapter 02: reversed. Chapter 03: image left.
- **Image areas:** Light grey blocks (`#B8B8B8`) containing 3D objects, not dark. The objects are now in daylight.
- **Chapter labels:** DM Mono, `0.7rem`, `#C4A35A` — gold index numbers.
- **Titles:** Clash Grotesk, `2rem`, `#111111`.
- **Body:** Inter, `1.05rem`, `#4A4A4A`.
- **Giant watermarks return:** The `01`, `02`, `03` numbers at `12rem`, `opacity: 0.05`, `#111111` — like the current site, but on light grey.

### Transmit / Contact
- **Background:** `#FAFAFA` — arrival. Full light.
- **Layout:** Single column, max-width `40rem`, centered. **The ONLY centered text layout** — because the destination should feel resolved and stable.
- **Title:** "TRANSMIT" in Clash Grotesk, `4rem`, `#111111`, centered.
- **Tagline:** `SEND A SIGNAL TO THE STUDIO` in DM Mono, `0.7rem`, `#C4A35A` — gold returns as the final accent.
- **Form:** Inputs with `border-bottom: 1px solid #E6E6E6`. Focus state: `border-bottom: 1px solid #C4A35A` — gold underline on focus.
- **Submit button:** `background: #111111`, `color: #FAFAFA`. Hover: `background: #C4A35A`, `color: #111111` — gold hover state.

### Footer
- **Background:** `#FAFAFA`.
- **Layout:** Single row, `border-top: 1px solid #E6E6E6`.
- **Three columns:**
  - Left: `DEFACT © 2026`, DM Mono `0.7rem`, `#111111`.
  - Center: No text. Only a single `1px` vertical gold line, `20px` tall, `#C4A35A` — like a final mark.
  - Right: `COLOGNE`, DM Mono `0.7rem`, `#111111`.

## 6. 3D Scene Brief

### Camera
- **Position:** `[0, 0.2, 4.2]`, FOV `40` — slightly lower and closer, more intimate.
- **Fixed position.** Scroll drives lighting and fog, not camera.

### Lighting Mood — The Key Innovation

**This direction uses scroll-driven lighting as its primary effect:**

```tsx
function LightingRig() {
  const scroll = useScroll(); // from drei ScrollControls
  
  useFrame(() => {
    const progress = scroll.offset; // 0 to 1
    
    // Key light intensity increases from 0.2 to 1.5 over scroll
    keyLight.intensity = 0.2 + progress * 1.3;
    
    // Ambient light increases from 0.1 to 0.8
    ambientLight.intensity = 0.1 + progress * 0.7;
    
    // Light color warms from cool blue-grey to warm white
    keyLight.color.setHSL(0.6, 0.05, 0.5 + progress * 0.5); // cool → warm
  });
}
```

**Light setup:**
- **Key light:** `[3, 5, 2]`, starting `intensity: 0.3`, `color: #88A0B0` (cool blue-grey). Ends at `intensity: 1.5`, `color: #FFF8E7` (warm white).
- **Fill light:** `[-2, 2, -3]`, starting `intensity: 0`. Ends at `intensity: 0.4`, `color: #E8E0D0`.
- **Rim light:** `[-3, 4, -2]`, `color: #C4A35A` (gold), `intensity: 0.3` — constant. Creates gold edge halation.
- **Environment:** `preset="studio"` with `envMapIntensity: 1.0` initially, increasing to `2.5` over scroll.

**Fog (atmospheric, critical for this direction):**
```tsx
<fog attach="fog" args={['#0A0A0A', 5, 20]} />
```
Fog color transitions from `#0A0A0A` to `#FAFAFA` over scroll. Fog distance shortens as user scrolls (object becomes clearer).

### Material Tweaks
- **Hero object:** `MeshPhysicalMaterial` — `metalness: 1.0`, `roughness: 0.08`, `clearcoat: 1.0`, `clearcoatRoughness: 0.1`, `color: #D0D0D0`, `emissive: #C4A35A`, `emissiveIntensity: 0.15` (subtle gold glow on edges).
- **Duo objects:** Matte dark, no emissive.
- **Process objects:** Standard chrome, no emissive.

### Scroll Behavior
- **Object rotation:** `rotation.y = scrollProgress * Math.PI * 0.75` — slightly more than Vault.
- **Object vertical drift:** `position.y = -0.1 + scrollProgress * 0.2` — starts slightly low, rises to center.
- **frameloop="always" is REQUIRED for this direction** — lighting transitions must be smooth and continuous. However, cap at `dpr={[1, 1.5]}` to maintain performance.
- **Invalidate is not sufficient** — the lighting rig must update every frame for smooth color temperature transitions.

### Post-Processing
- **Vignette:** Starts heavy (`offset: 0.3`, `darkness: 0.8`) and lightens over scroll to (`offset: 0.5`, `darkness: 0.2`) — the "emerging from darkness" effect.
- **Bloom:** Enabled. `luminanceThreshold: 0.8`, `intensity: 0.5` — the gold emissive edges will bloom.
- **SSAO:** `intensity: 25` — moderate contact shadows.
- **Noise:** `opacity: 0.02` — standard.

## 7. Anti-Patterns Checklist

| Anti-Pattern | How Relic Avoids It |
|-------------|-------------------|
| Purple/blue gradient backgrounds | Background journey is monochromatic greyscale: `#0A0A0A` → `#FAFAFA`. No purple/blue. |
| Drop shadows on cards | Cards use `1px solid #2A2A2A` borders. Hover changes border to gold. |
| Rounded corners > 2px | All corners: 0px. |
| Card grids | Works are asymmetric 40:60 layout, not centered grid. |
| Centered hero marketing speak | Hero text is "DEFACT" + "A mirror. A relic. A charm." — poetic, not persuasive. Asymmetric sections follow. |
| Centered text grids | Only manifesto and transmit are centered — these are sacred/processing moments justified by the narrative. |
| Feature lists | Acquisition is a sparse list, not feature bullets. |
| Animated counters | No incrementing numbers. |
| Burger menu sliding from left | Mobile nav: full-screen dark overlay with fade. |
| Floating action buttons | None. |
| Stock photography | Only 3D chrome objects with dramatic lighting. |
| Generic dashboard UI | The acquisition list is intentionally sparse and typographic, not data-dense. |

## 8. Key CSS Changes

```css
:root {
  /* Note: --void is dynamic in this direction — cannot be static */
  --anodized: #FFFFFF;
  --signal: #0D0D0D;
  --steel: #8A8A8A;
  --chrome: #C4A35A; /* Gold replaces grey chrome */
  --border: #2A2A2A; /* Dark border for dark sections */
  --alarm: #D0403B;
  --gold: #C4A35A;
  --dark-void: #0A0A0A;
  --mid-void: #4A4A4A;
}

/* Dynamic background transition handled via inline styles or CSS custom properties updated by JS */
/* Each section declares its own background */

/* Gold accent utilities */
.text-gold {
  color: var(--gold);
}

.border-gold {
  border-color: var(--gold);
}

/* Dark section text */
.text-light {
  color: #E8E8E8;
}

/* Light section text */
.text-dark {
  color: #111111;
}

/* Hero-specific: massive type */
.hero-display {
  font-size: clamp(5rem, 16vw, 14rem);
  letter-spacing: -0.03em;
  line-height: 0.9;
}

/* Gold line decorative element */
.gold-line {
  width: 60px;
  height: 1px;
  background: var(--gold);
}

/* Scroll indicator: gold arrow */
.scroll-arrow {
  color: var(--gold);
  font-size: 1.5rem;
  animation: bounce 2s infinite;
}

/* Card hover gold border transition */
.reliquary-card {
  background: #111111;
  border: 1px solid #2A2A2A;
  transition: border-color 300ms ease-out;
}
.reliquary-card:hover {
  border-color: var(--gold);
}

/* Form focus gold underline */
input:focus, textarea:focus {
  border-bottom-color: var(--gold);
  outline: none;
}

/* Manifesto verse line breaks preserved */
.manifesto-quote {
  white-space: pre-line;
  line-height: 1.2;
}
```

## 9. Key Component Changes

### Navigation.tsx
- **Glassmorphism variant for dark sections:** When `scrolled` and background is dark, nav uses `background: rgba(10, 10, 10, 0.7)`, `backdrop-blur-md`, no border.
- **When in light sections:** Switch to `background: rgba(250, 250, 250, 0.9)`, `border-bottom: 1px solid #E6E6E6`.
- **The switch is section-aware.** Requires reading scroll position or using `IntersectionObserver` on light sections.
- **Logo color:** `#E8E8E8` on dark, `#111111` on light.
- **Links:** Gold hover (`#C4A35A`) on dark; grey hover (`#808080`) on light.

### page.tsx
- **Each section declares explicit `background` inline style** as per the journey map (dark → light).
- **Text color classes toggled per section:** `text-[#E8E8E8]` for dark sections, `text-[#111111]` for light.
- **Hero restructured:** Title at `20vh`, huge. Scroll indicator at bottom. No datasheet block. Remove the gradient `background: linear-gradient(...)` — solid `#0A0A0A`.
- **Works:** Remove 3-column grid. Use `flex` with `w-[40%]` label block and `w-[60%]` card column. Cards use `reliquary-card` class (dark bg + border).
- **Manifesto:** Add `white-space: pre-line` for verse formatting. Add gold vertical line above. Center-aligned, max-width `55ch`.
- **Duo:** Single image block left, names right. Remove duplicate image blocks.
- **Acquisition:** Text color switch. Gold index numbers. Remove filter chips or restyle.
- **Process:** Alternating asymmetric layout. Light grey blocks for 3D. Giant watermarks return.
- **Transmit:** Centered layout. Gold focus states. Gold hover on submit.
- **Footer:** Centered vertical gold line as decorative element.

### ProductModel.tsx
- **Accept `emissive` prop:** Boolean to enable gold rim glow.
- **Emissive material:** When `emissive={true}`:
  ```tsx
  <meshPhysicalMaterial
    color="#D0D0D0"
    metalness={1.0}
    roughness={0.08}
    clearcoat={1.0}
    emissive="#C4A35A"
    emissiveIntensity={0.15}
  />
  ```
- **Scroll-linked vertical position:** Accept `scrollProgress` and shift Y from `-0.1` to `0.1`.
- **Reduce default scale to `0.75`** — object should feel precious, not oversized.

### Scene.tsx
- **Add fog:** `<fog attach="fog" args={['#0A0A0A', 5, 20]} />`.
- **Add lighting rig:** `directionalLight`, `ambientLight`, and a gold `spotLight` or `pointLight` for rim.
- **frameloop="always"** — required for smooth lighting transitions.
- **Remove ContactShadows in hero** — fog provides grounding. Add ContactShadows only in light sections (can be toggled per section via prop or scroll position).
- **Post-processing:** Add `Bloom`, `Vignette`, `SSAO`, `Noise` via `@react-three/postprocessing`.
- **Scroll-driven environment intensity:** Use `useScroll` to interpolate `envMapIntensity` from `1.0` to `2.5`.

---

# Cross-Direction Comparison Matrix

| Dimension | Current (Clinical Archive) | A: The Vault | B: The Ledger | C: The Relic |
|-----------|---------------------------|--------------|---------------|--------------|
| **Atmosphere** | Clean gallery | Freezer unit, museum storage | Rare book, specimen catalog | Crypt → cathedral procession |
| **Background** | `#FAFAFA` flat | `#F0F0F0` monochrome flat | `#F2F0EB` warm paper | `#0A0A0A` → `#FAFAFA` journey |
| **Hero layout** | Object + text overlay | Object alone (90vh silence) | Object as "plate" beside index | Object in darkness, gold rim glow |
| **Works layout** | 3-col card grid | Full-width list rows | Data table with marginal numbers | Asymmetric 40:60 reliquary cards |
| **Navigation** | Fixed top, blur | Fixed top, solid, minimal | Left sticky sidebar | Fixed top, dark/light adaptive |
| **R3F canvas** | Full-viewport fixed plates | Full-viewport fixed, transparent | Inline bordered plates (400px) | Full-viewport fixed, scroll-lit |
| **Post-processing** | SSAO + subtle bloom | SSAO only, no bloom | None (printed feel) | Full stack: bloom, vignette, fog |
| **Motion thesis** | Breathing + scroll rotation | Scroll rotation only, demand render | Static plates, auto-rotate only | Continuous lighting transitions |
| **Gold accent** | None (`#808080` grey) | None (strict monochrome) | None (warm grey) | `#C4A35A` gold throughout |
| **Form inputs** | Border-bottom underline | Bordered rectangles | Bordered rectangles | Border-bottom, gold on focus |
| **Type hierarchy** | Loud display, small metadata | Even louder display, smaller metadata | Smaller display, denser metadata | Massive display, incantation quotes |
| **Primary emotion** | Clinical precision | Isolation, weight | Scholarly rigor | Mystery, revelation |

---

# Implementation Priority Notes

1. **Direction A (Vault)** is the most technically conservative — it removes features rather than adding them. Lowest implementation risk. Best for rapid deployment.

2. **Direction B (Ledger)** requires the most layout restructuring (sidebar navigation) but uses the simplest 3D setup (static plates, no scroll controls). Medium risk.

3. **Direction C (Relic)** is the most technically ambitious — scroll-driven lighting, fog, post-processing, adaptive navigation. Highest risk but highest impact. Requires thorough performance testing on M1 MacBook Air.

All three directions:
- Use the same four fonts (Clash Grotesk, DM Mono, Inter, Playfair Display)
- Pass DESIGN.md anti-pattern checks
- Work with R3F + Next.js App Router
- Start from the current `page.tsx` structure and modify incrementally

---

*End of Concepts v1*
