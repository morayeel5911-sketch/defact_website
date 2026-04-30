# DEFACT Website — Design Review Report

**Reviewer:** Lead Designer, DEFACT  
**Date:** 2026-04-30  
**Site:** http://localhost:3002  
**Viewport tested:** 1280×800 (desktop), 375×812 (mobile)

---

## 1. Overall Assessment

**Score: 4 / 10**

The DEFACT site has a strong conceptual foundation — the Clinical Archive aesthetic, the restrained typography system, and the generous spatial rhythm are all directionally correct. However, the execution has critical failures that make the current build feel unfinished and unprofessional. The single most damaging issue is the completely blank hero (3D model not rendering), which leaves visitors with ~90vh of empty grey on arrival. Combined with placeholder portrait blocks in The Duo section and a broken flex layout in Works, the site currently reads as a wireframe rather than a finished luxury brand experience.

---

## 2. What's Working Well

| Element | Assessment |
|---|---|
| **Typography system** | Font loading is working. Clash Grotesk renders correctly for headlines and the DEFACT logotype. DM Mono provides the correct clinical/technical label aesthetic. Playfair Display italic delivers the manifesto quote with appropriate editorial gravitas. |
| **Color palette** | The restricted grey-to-black spectrum (`#F0F0F0` → `#0D0D0D`) with the single red accent (`#D0403B` for SOLD OUT) creates the intended clinical, archival mood. |
| **Navigation** | Clean fixed nav with subtle scroll-state background transition. The bracketed numbering `[01]–[04]` adds a catalog/archival specificity that fits the brand. Mobile overlay is functional. |
| **Section rhythm** | The generous vertical padding (`py-40`) and 1px hairline dividers between sections establish a deliberate, unhurried pacing. |
| **Process section** | The single-column, left-aligned chapters with mono numbering and clear hierarchy is the strongest content section. It reads with confidence. |
| **Grain overlay** | The SVG noise texture at 1.5% opacity is appropriately subtle. Good restraint. |
| **Selection color** | The bespoke selection state (`::selection { background: var(--molten); }`) is a nice detail. |

---

## 3. Critical Issues (Bugs / Broken Elements)

### 3.1 The 3D Hero Is Completely Blank — SEVERITY: CRITICAL

**Evidence:** `designer-review-hero.png` shows a solid `#F0F0F0` viewport. No model. No fallback placeholder geometry. No loading indicator. Nothing.

**Impact:** This is a luxury brand site whose entire above-the-fold experience is 90vh of empty grey. First impressions are catastrophic.

**Likely causes:**
- The GLB model at `/models/starmirror.glb` may be 404ing or the path is incorrect.
- The `<Canvas>` is transparent (`gl={{ alpha: true }}`) but the underlying `<div>` also has `background: "transparent"`. If the model fails to load and the fallback `<Suspense>` doesn't resolve to visible geometry, there's nothing to render.
- `useGLTF.setDecoderPath('/draco/')` — if Draco isn't available at this path, GLB decoding may fail silently.
- The `PlaceholderGeometry` fallback is wrapped inside `<Suspense>` but also inside the same `<group>`. If the error boundary catches a GLB failure, the fallback should render, but screenshots show nothing.

**Fix priority:** #1. Without this fix, the site should not go live.

### 3.2 The Duo Portraits Are Empty Placeholders — SEVERITY: HIGH

**Evidence:** `designer-review-duo.png`, `designer-review-fullpage.png` — Both portrait blocks are dark grey gradients (`#1C1C1E` → `#2A2A2E`) with a faint diamond glyph (`◆`). No actual images.

**Impact:** The founders section looks like a UI wireframe. For a brand trading on craftsmanship and human curation, hiding the creators behind opaque blocks sends the wrong message.

**Required:** Replace with actual portraits, or if unavailable, use a more intentional placeholder treatment (e.g., a generative gradient mesh, a duotone treatment, or a high-contrast silhouette). The current dark block + glyph reads as "forgot to add images."

### 3.3 Works Section Layout Collapses on Narrower Screens — SEVERITY: HIGH

**Evidence:** `designer-review-works.png` — Product metadata (`Collectible`, `Available`, description text) collapses onto a single line with the product name:
```
STARMIRRORCollectible Available A mirror. A relic. A charm.
```

**Root cause:** The flex row structure in each product card uses `flex-col md:flex-row` but the inner elements don't have `shrink-0` or min-width constraints. On intermediate widths, the metadata wraps awkwardly. The `SOLD OUT` badge on TIARA breaks to two lines (`SOLD` / `OUT`), which looks broken.

**Fix:** Give the product name a `flex-shrink-0` or `min-w-fit` class. Add `whitespace-nowrap` to status badges. Consider stacking the right-hand metadata below the product name on tablet widths.

### 3.4 Transmit Section Has Form/Header Alignment Drift — SEVERITY: MEDIUM

**Evidence:** `designer-review-fullpage.png` — The `[05]` section label and `TRANSMIT` heading sit left-aligned within `max-w-[42rem]`, but the form fields are also constrained. However, because the section uses `px-8 md:px-[15vw]`, the heading and the inputs are not visually keyed to each other — the heading feels orphaned.

---

## 4. Typography Issues

### 4.1 Inline `style={{ fontFamily: ... }}` Anti-Pattern

The entire page uses inline `style` props for font families instead of Tailwind utility classes. This is fragile and verbose. There are already CSS utility classes in `globals.css` (`.font-clash`, `.font-dm-mono`, `.font-inter`, `.font-playfair`) that are imported but almost never used in `page.tsx`.

**Recommendation:** Replace all inline font-family declarations with Tailwind classes. Example:
```jsx
// Current (everywhere)
style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif" }}

// Should be
className="font-clash"
```

This reduces code weight, improves consistency, and makes future theme changes easier.

### 4.2 Body Text Contrast Is Too Low

The process and works descriptions use `color: "#9A9A9A"` on `#F0F0F0` / `#F5F5F5` backgrounds. The contrast ratio is approximately 2.9:1, which fails WCAG AA for normal text. While the aesthetic intentionally mutes secondary text, some passages (especially the process descriptions) deserve more readable weight.

**Recommendation:** Darken body text to `#6B6B6B` (or `var(--steel)`) for descriptions, keeping true `#9A9A9A` only for tertiary labels.

### 4.3 `Inter` Is Loading But Being Asked for `wght@400,500`

In `layout.tsx`, the `inter` font object requests weights 400 and 500. In `page.tsx`, body text is used at `text-lg` with these weights. This is correct. No issue here — but verify variable font behavior with Next.js 15's new font system.

### 4.4 Duplicate Font Requests

`layout.tsx` loads Clash Grotesk via Fontshare AND Space Grotesk via Google Fonts, plus Inter and Playfair via Google Fonts. Space Grotesk is not referenced anywhere in the design system. Remove it to reduce network weight and CSS parsing.

---

## 5. Color & Spacing Issues

### 5.1 Sections Are Too Chromatically Similar

Every section is either `#F0F0F0`, `#F5F5F5`, or a hairline apart. While this achieves monastic restraint, it also means the page has no visual landmarks. Scrolling through the full-page screenshot feels like scrolling through a single infinite grey plane.

**Recommendation:** Introduce deliberate tonal shifts:
- **Hero / Title:** Keep `#F0F0F0` (or even slightly warmer, e.g., `#EBEBE8` for a material stone feel).
- **Works:** Stay light, but consider a `#FFFFFF` background to make the 1px rules sharper.
- **Manifesto:** The current `#F5F5F5` is almost indistinguishable from Works. Use a slightly warmer parchment tone (`#EAE6E0`) to signal a contemplative beat.
- **The Duo / Process:** These two sequential sections both use near-identical greys. Alternate them more distinctly.

### 5.2 The 1px Dividers Are Invisible on Some Monitors

`#D5D5D5` on `#F0F0F0` is a 0.08 luminance difference. On lower-contrast displays (MacBook Air, many IPS panels), these dividers disappear entirely.

**Recommendation:** Darken dividers to `#BFBFBF`, or switch to a subtle 2px rule for section breaks only.

### 5.3 Mobile Padding Is Insufficient

At `px-8` (2rem), the mobile viewport leaves content feeling cramped against the screen edges. For a luxury brand, generous side padding is expected.

**Recommendation:** Use `px-6 sm:px-10 md:px-[15vw]` or similar, and on mobile consider `max-w-screen-sm mx-auto` to give the page a contained editorial feel.

---

## 6. 3D Rendering Issues

### 6.1 Complete Model Failure

As documented in §3.1, the 3D scene renders nothing. The `<Canvas>` with `frameloop="demand"` and `dpr={[1, 2]}` is configured correctly for performance, but the content layer is missing.

### 6.2 Even the Fallback Geometry Is Missing

The `PlaceholderGeometry` component constructs a cylinder-based abstract form that should appear if the GLB fails. It doesn't appear in screenshots. This suggests either:
- The `<Canvas>` itself isn't mounting.
- Or the canvas renders transparently and the underlying scrollable content bleeds through.

Looking at `page.tsx` line 30–37:
```jsx
<div className="fixed top-0 left-0 w-full h-[90vh] z-0" style={{ background: "transparent" }}>
  <Scene>...<ProductModel /></Scene>
</div>
```
This is `z-0`, but if the Canvas doesn't render any visible pixels, you just see the body background (`var(--void)` = `#F0F0F0`).

### 6.3 Performance Risk with Post-Processing

The `EffectComposer` with Bloom + Chromatic Aberration + Vignette + ToneMapping is heavy. If the model does get fixed, consider disabling post-processing on mobile or low-power devices, as it can cause jank on 60fps scroll-driven animations.

### 6.4 Scroll-Driven Rotation Is Unidirectional

The model rotates +120° on Y over the full page scroll. This means if a user scrolls back up, the model rewinds. While logical, it means the model always faces roughly the same orientation when the user is at the top. Consider allowing continuous rotation or a subtle idle auto-rotation when not scrolling, to keep the object feeling alive.

---

## 7. Mobile Issues

### 7.1 Hero Is a Catastrophic Blank

**Evidence:** `designer-review-mobile.png` — The entire mobile viewport is empty grey.

**Impact:** On mobile, users have no visual cue that they should scroll. The + menu button is visible, but the lack of any content below the fold is disorienting.

### 7.2 Form Fields Are Too Narrow on Mobile

The transmit form uses `max-w-[42rem]` with `px-8`. On a 375px viewport, this yields ~300px field width, which is acceptable but tight. The labels (uppercase mono) feel large relative to the input. Consider bumping input height/padding on mobile.

### 7.3 Mobile Menu Icon Is Unconventional

Using `+` as the open-state icon is unexpected. Standard conventions are a hamburger (≡) or the word "Menu". The `×` close icon is correct. Maintain consistency: use `≡` / `×`.

### 7.4 The Duo Layout Stacks Poorly on Mobile

The asymmetric 35/65 grid collapses to a single column, but the right-hand metadata (roles, names) appears AFTER the two portrait blocks. Given the portraits are empty placeholders, mobile users scroll through two dark rectangles and only then see the explanatory text. If images were real, this would still be a lot of vertical scrolling before understanding who these people are.

**Recommendation:** On mobile, show one portrait + one bio block as a pair, then the second pair.

---

## 8. Recommendations (Ranked by Impact / Effort)

### 🔴 CRITICAL — Do Before Launch

| # | Recommendation | Effort | Impact |
|---|---|---|---|
| 1 | **Fix 3D model rendering.** Verify GLB path (`/models/starmirror.glb`), Draco decoder availability, and that the `<Canvas>` transparent background doesn't hide a mount failure. Add a visible fallback canvas (e.g., a high-contrast abstract geometric SVG or CSS animation) that renders instantly while the GLB loads. If the model cannot load reliably, replace the hero with a full-bleed static product image of the chrome artifact. | Medium | Critical |
| 2 | **Fix Works section flex layout.** Ensure metadata columns don't collapse onto the product name on intermediate/tablet widths. Add `flex-shrink-0` / `whitespace-nowrap` to status badges. | Low | High |
| 3 | **Replace Duo portrait placeholders.** Either source actual founder portraits or design a meaningful generative placeholder (e.g., a parametric mesh gradient, a high-contrast duotone block, or typographic initials at scale). | Medium | High |

### 🟡 HIGH — Major Polish

| # | Recommendation | Effort | Impact |
|---|---|---|---|
| 4 | **Refactor typography to Tailwind utility classes.** Remove all inline `style={{ fontFamily: ... }}` from `page.tsx`. Use `.font-clash`, `.font-dm-mono`, `.font-playfair`, `.font-inter` classes consistently. Remove unused Space Grotesk from font imports. | Low | Medium |
| 5 | **Improve color contrast for dividers and body text.** Darken hairline rules to `#BFBFBF`. Darken process/works descriptions to `#6B6B6B`. | Low | Medium |
| 6 | **Add intentional background tonal shifts between sections.** Use slightly warmer/desaturated tones for Manifesto and Duo to create visual rhythm. | Low | Medium |
| 7 | **Add a scroll indicator or subtle prompt below the hero.** If the 3D model is restored, consider a small animated chevron or "SCROLL" micro-label at the bottom of the 90vh hero so users know content exists below. | Low | Medium |

### 🟢 MEDIUM — Nice to Have

| # | Recommendation | Effort | Impact |
|---|---|---|---|
| 8 | **Mobile menu icon:** Replace `+` with `≡` (hamburger). | Low | Low |
| 9 | **Add reduced-motion support.** The GSAP ScrollTrigger and `frameloop="demand"` animations should respect `prefers-reduced-motion`. | Medium | Low |
| 10 | **Consider a loading state for the 3D scene.** A minimal CSS spinner or "RENDERING" mono label in the center of the hero would be better than 5 seconds of blank grey while the GLB decodes. | Low | Low |
| 11 | **Optimize post-processing for mobile.** Conditionally disable Bloom + Chromatic Aberration on viewports < 768px or when `navigator.hardwareConcurrency < 4`. | Medium | Low |
| 12 | **Form button idle state:** The black SUBMIT button is stark but correct. Consider a micro-interaction (e.g., a thin inner border highlight on hover) to confirm clickability. | Low | Low |

---

## Appendix: Screenshot Inventory

| File | Section | Notes |
|---|---|---|
| `/tmp/designer-review-hero.png` | Top of page / 3D viewport | **BLANK.** Grey background only. |
| `/tmp/designer-review-title.png` | DEFACT title area | Title present but hero above it empty. |
| `/tmp/designer-review-works.png` | Works product list | Layout collapse visible — metadata inline. |
| `/tmp/designer-review-manifesto.png` | Manifesto quote | Playfair italic renders correctly. Good. |
| `/tmp/designer-review-duo.png` | The Duo (partial) | Portrait blocks are empty dark placeholders. |
| `/tmp/designer-review-acquisition.png` | Acquisition list | Clean horizontal rows. Good readability. |
| `/tmp/designer-review-process.png` | Process chapters | Single-column layout, well-spaced. Best section. |
| `/tmp/designer-review-transmit.png` | Transmit / Contact form | Form structure is clean but heading alignment drifts. |
| `/tmp/designer-review-footer.png` | Footer | Simple, correct. |
| `/tmp/designer-review-fullpage.png` | Full page vertical | Confirms 3D never appears; portraits are placeholders. |
| `/tmp/designer-review-mobile.png` | Mobile viewport (375×812) | **Disaster.** Entire viewport is empty grey. |

---

## One-Line Summary

> The DEFACT site has the bones of a strong luxury editorial experience, but the hero is catastrophically blank, the founders section uses placeholders, and the Works layout breaks — making the current build feel like an unfinished prototype rather than a shippable brand destination. Fix the 3D rendering and replace the portrait placeholders, and the score jumps to 7/10 overnight.
