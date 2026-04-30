# DEFACT Website — Complete Redesign Proposals

**Date:** 2026-04-30  
**Current State:** "The Vault" — light-grey clinical archive, fixed 3D hero (90vh) + scrolling sections below. Score: 4/10.  
**Goal:** Three radically different directions that break from the "white page with 3D" formula.

---

## Shared Context: Why the Current Design Fails

The current "Vault" approach treats the 3D object like a museum plinth: you see it, then you scroll past it. The object is passive. The page is a stack of grey boxes. Nothing responds to the user. Nothing transforms. The brand DEFACT — a Cologne duo making ritual objects through 3D printing and metal casting — demands a more visceral, spatial experience.

Each of the three directions below answers a different question:
- **A:** What if the object was *sacred*?
- **B:** What if you were *in the workshop*?
- **C:** What if the object *became* the navigation?

---

# Direction A: "The Reliquary" — Dark Museum

## 1. Visual Thesis
The chrome artifact floats in absolute darkness, lit by a single dramatic key light — everything else is shadow, and the user feels they have discovered something hidden, precious, and slightly dangerous.

## 2. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `reliquary-void` | `#0A0A0A` | Page background, infinite darkness |
| `reliquary-surface` | `#111111` | Elevated cards, section containers |
| `reliquary-line` | `#2A2A2E` | Hairline rules — visible against dark |
| `reliquary-text-primary` | `#F0F0F0` | Headlines, Clash Grotesk display |
| `reliquary-text-secondary` | `#6B6B6B` | Body text, descriptions |
| `reliquary-mono` | `#A0A0A0` | DM Mono labels, numbering |
| `reliquary-glow` | `#C8C8C8` | Hover states, focus rings |
| `reliquary-alarm` | `#D0403B` | SOLD OUT, preserved from current system |
| `reliquary-chrome` | `#E8E8E8` | Reflection highlights on the 3D object |
| `reliquary-amber` | `#3D2B1F` | Deep warm shadow — used ONLY in object environment map |

**Gradient accents:** No bright gradients. Instead, use `radial-gradient` light pools — a soft `#1C1C1E` → `#0A0A0A` vignette behind active sections.

## 3. Typography Treatment

- **Display:** Clash Grotesk at `clamp(3.5rem, 14vw, 10rem)`, weight 700, letter-spacing `-0.04em` (tighter than current), color `#F0F0F0`
- **Mono labels:** DM Mono at `0.65rem`, uppercase, letter-spacing `0.12em` (wider than current), color `#A0A0A0`. Add a subtle `text-shadow: 0 0 20px rgba(240,240,240,0.08)` — labels appear to emit a faint phosphor glow.
- **Body:** Inter at `1rem` / line-height `1.6`, weight 400, color `#6B6B6B`
- **Quotes:** Playfair Display italic, `clamp(1.8rem, 4vw, 2.8rem)`, color `#C8C8C8`
- **Nav:** DEFACT logotype in Clash Grotesk, weight 700, tracked out `0.08em`

## 4. Layout Structure

The page is **NOT full-width** sections. It is a sequence of **spotlit rectangles** floating in darkness.

```
┌─────────────────────────────────────────────┐
│  ░░░░░░░░░░░░ 0A0A0A VOID ░░░░░░░░░░░░░░  │
│                                             │
│        ┌──────────────────────┐             │
│        │   [3D CANVAS]        │             │
│        │   chrome artifact    │             │
│        │   60vh × 60vh        │             │
│        │   centered, floating │             │
│        └──────────────────────┘             │
│                                             │
│        "DEFACT" (below canvas, centered)    │
│        "ARCHIVE — COLOGNE — EST. 2024"      │
│                                             │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                             │
│        ┌──────────────────────────────┐     │
│        │  00.01  STARMIRROR          │     │
│        │  00.02  PHYLACTERY          │     │
│        │  00.03  TIARA     [SOLD OUT]│     │
│        └──────────────────────────────┘     │
│        (this card is centered, 70vw max)   │
│                                             │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                             │
│        ┌──────────────────────────────┐     │
│        │  "Cuts through glare..."    │     │
│        │  — STARMIRROR MANIFESTO     │     │
│        └──────────────────────────────┘     │
│                                             │
└─────────────────────────────────────────────┘
```

**Section architecture:**
1. **Hero:** 3D canvas is NOT full-bleed. It is a `60vh × 60vh` square (or `70vh × 50vh` portrait) centered in `100vh` of darkness. The object slowly rotates. No text competes with it.
2. **Title block:** Appears below the canvas after ~2s load delay, centered.
3. **Works card:** A dark card (`#111111` surface, `1px #2A2A2E` border) centered at `max-width: 800px`. Each product row is a horizontal band with a faint bottom rule.
4. **Manifesto card:** Same card treatment, centered, quote in Playfair italic.
5. **Duo:** Two portrait blocks in a 2-column grid WITHIN the card. Portraits are high-contrast B&W or duotone — not the current dark gradient placeholder.
6. **Process:** A vertical timeline running down the center of the page. Each chapter is a horizontal band with a thin vertical line connecting them.
7. **Transmit:** The card treatment again, but the form inputs are dark (`#1C1C1E` bg, `#2A2A2E` border, `#F0F0F0` text) — no white inputs.
8. **Footer:** Minimal, centered, single line of mono text.

## 5. 3D Interaction Model

The 3D scene is reconstructed as a **museum vitrine**:
- **Background:** The `Scene` Canvas has a dark CSS backdrop (`#0A0A0A`), but inside R3F the scene background is transparent. The lighting environment uses a **very dark HDRI** (almost black with a few warm pinpoint lights) so the chrome object reflects only selective highlights.
- **Key light:** A single `spotLight` from upper-right, warm `#FFF8F0`, intensity 2.5, casting sharp shadows.
- **Rim light:** A cool `#E8E8FF` pointLight from behind-left, intensity 0.8.
- **Ground plane:** A barely visible `MeshReflectorMaterial` (from Drei) at y=-1.5 — the object casts a faint reflection that grounds it in space. The reflector is mostly transparent, showing the void beneath.
- **Rotation:** The object rotates very slowly (1°/sec) via `useFrame` idle animation. On scroll, the rotation PAUSES — the object holds still while the user reads, then resumes when scrolling stops. This creates a "living specimen" feel.
- **Mouse interaction:** Subtle — on mousemove, the object tilts ±5° toward the cursor (like a curious animal). Very slow lerp (0.03).

## 6. Code Changes

| File | Change |
|---|---|
| `globals.css` | Replace all light tokens with dark tokens. Remove body `::after` grain overlay (grain reads as dust on dark — replace with subtle scan-line overlay or just eliminate). Update scrollbar to dark theme. |
| `page.tsx` | Restructure from full-width `py-40 px-[15vw]` sections to `max-w-[800px] mx-auto` centered cards floating in `#0A0A0A`. Remove the `min-h-[140vh]` hero text container. Title sits below the canvas naturally. |
| `Scene.tsx` | Complete lighting overhaul: dark HDRI environment (or remove `preset="studio"` and build custom dark env), remove ContactShadows (too visible on dark), add `MeshReflectorMaterial` ground plane. Remove ambientLight or drop to intensity 0.1. |
| `Navigation.tsx` | Transparent background always; invert text to `#F0F0F0` with `mix-blend-mode: difference` for automatic contrast over light/dark. |
| `ProductModel.tsx` | Add mouse-tracking rotation (tilt toward cursor). Add idle auto-rotation. |
| New: `components/DarkCard.tsx` | Reusable card wrapper: `#111111` bg, `1px solid #2A2A2E`, `padding: 3rem`, `border-radius: 0`. |
| New: `components/SpotlightVignette.tsx` | CSS radial gradient vignette behind active cards. |

## 7. Risk/Challenge Assessment

| Risk | Mitigation |
|---|---|
| **Dark pages feel "gamer"/edgy, not luxury** | Avoid neon, avoid purple/blue tints. Keep typography editorial (serif quotes, mono labels). Use warm light tones, not cold sci-fi. The Playfair italic manifesto is critical for warmth. |
| **Reflective ground plane is expensive** | Use `MeshReflectorMaterial` with `resolution={512}` and `blur={[300, 100]}` to keep it soft and cheap. |
| **Low-contrast body text is even worse on dark** | Body stays at `#6B6B6B` which is 4.8:1 on `#0A0A0A` — passes AA. Mono labels at `#A0A0A0` — 5.9:1. |
| **Print / screenshots look like black boxes** | This is a digital-first experience. If print screenshots are needed, add a light-mode toggle. |
| **R3F Canvas on dark is harder to debug** | Add `gl={{ alpha: false }}` and set Canvas background to `#0A0A0A` explicitly so there's no transparency confusion. |

**Effort:** Medium-High. Mostly CSS restructuring and lighting changes. No new dependencies.
**Impact:** Very High. Most visually distinct from current. Strong brand differentiation.
**Confidence:** 8/10 — dark luxury is proven (Tom Ford, Saint Laurent, certain Prada campaigns).

---

# Direction B: "The Atelier" — Split Screen Workshop

## 1. Visual Thesis
The page is a digital workshop: the left half is a permanently visible 3D workbench where objects are inspected under warm task lighting, while the right half scrolls through the story of how they are conceived, fabricated, and finished.

## 2. Color Palette

| Token | Hex | Usage |
|---|---|---|
| `atelier-ivory` | `#F7F5F0` | Main background — warm, eggshell, not clinical grey |
| `atelier-paper` | `#EDEAE2` | Card surfaces, form backgrounds |
| `atelier-brass` | `#B8A67A` | Primary accent — warm metallic, used sparingly for active states, hover, section numbers |
| `atelier-umber` | `#5C4A32` | Warm dark text, section headers |
| `atelier-charcoal` | `#2C2C2A` | Display text, DEFACT headline |
| `atelier-steel` | `#8A8580` | Secondary text, descriptions |
| `atelier-line` | `#D5CFC4` | Hairline rules — warm grey, visible on ivory |
| `atelier-soldout` | `#A85A5A` | Muted warm red for SOLD OUT (less aggressive than current `#D0403B`) |
| `atelier-light` | `#FFFDF8` | Warm white for input backgrounds |

**Material metaphor:** The page itself feels like heavy cotton paper (ivory), brass hardware (accent), and raw steel (type). No chrome in the UI — only in the 3D object.

## 3. Typography Treatment

- **Display:** Clash Grotesk at `clamp(3rem, 10vw, 8rem)`, weight 700, color `#2C2C2A`. The "DEFACT" headline in the hero uses outline/stroke treatment (`-webkit-text-stroke: 2px #2C2C2A; color: transparent`) for the first 2 seconds, then fills in.
- **Mono labels:** DM Mono, `0.7rem`, uppercase, `letter-spacing: 0.1em`, color `#8A8580`. NO glow. Labels feel stamped — mechanical, not digital.
- **Body:** Inter at `1.05rem` / line-height `1.65`, weight 400, color `#5C4A32` — warm brown body text instead of grey. This is unusual and immediately signals "craft."
- **Quotes:** Playfair Display italic, color `#5C4A32`, with a brass left-border (`3px solid #B8A67A`) instead of a dash.
- **Nav:** Transparent over the left-pane canvas. When scrolling the right pane, nav sticks to top of right pane with `atelier-paper` background.

## 4. Layout Structure

Desktop is a **persistent split screen**. The user's eye is always on the object while the story unfolds.

```
Desktop (≥1024px):
┌────────────────────┬──────────────────────────────────────┐
│                    │                                      │
│   [3D CANVAS]      │   DEFACT                             │
│   Sticky left      │   "Objects of Distinction"           │
│   50vw             │                                      │
│   Object rotates   │   [00.01] STARMIRROR                 │
│   on scroll        │   [00.02] PHYLACTERY                 │
│   and responds     │   [00.03] TIARA                      │
│   to mouse         │                                      │
│                    │   "Cuts through glare..."            │
│                    │   (manifesto with brass left border)   │
│                    │                                      │
│                    │   THE DUO                            │
│                    │   LYAHUASCA + MIKI.NGLO              │
│                    │                                      │
│                    │   PROCESS                            │
│                    │   Conception / Fabrication / Finition │
│                    │                                      │
│                    │   TRANSMIT                           │
│                    │   [form]                             │
│                    │                                      │
│                    │   Footer                             │
└────────────────────┴──────────────────────────────────────┘

Mobile (<1024px):
┌─────────────────────────────────────────────┐
│  [3D CANVAS] (50vh, top)                   │
│  Object rotates slowly                      │
├─────────────────────────────────────────────┤
│  DEFACT                                     │
│  "Objects of Distinction"                   │
│  ...scrollable content below...             │
└─────────────────────────────────────────────┘
```

**Section architecture (right pane):**
1. **Hero text:** "DEFACT" huge, "Objects of Distinction" below in DM Mono. This is the top of the scrollable right pane.
2. **Works list:** Simple vertical list, no cards. Product names in Clash Grotesk. Rule lines in `atelier-line`. Hover: text shifts right 8px + brass underline appears.
3. **Manifesto:** Full-width within the pane. Playfair italic + brass left border.
4. **The Duo:** 2-column grid of portraits (actual photos or high-quality illustrations). Warm tone.
5. **Process:** Three vertical blocks with brass `[01]`, `[02]`, `[03]` numbers. No cards.
6. **Transmit:** Paper-colored card (`atelier-paper`) with full-border inputs in `atelier-light`. Submit button: `atelier-brass` bg, `atelier-ivory` text.
7. **Footer:** Single line of mono, centered.

**Left pane behavior:**
- sticky `position:fixed; left:0; top:0; width:50vw; height:100vh`
- Canvas fills it entirely
- On scroll through the right pane, the object slowly rotates (120° over full scroll, same as current)
- When hovering over a product row on the right, the object "responds" — a brief flash of the rim light or a micro-zoom (1.02x)

## 5. 3D Interaction Model

- **Environment:** Warm workshop HDRI — imagine a wood-and-steel studio with large north-facing windows. Soft, broad highlights. No harsh spots.
- **Lighting:** Three-point studio rig:
  - Key: warm `#FFF5E6`, soft area light from upper-right
  - Fill: cool `#E8ECF0`, dim, from left  
  - Rim: brass-tinted `#FFF0D4` from behind
- **Ground:** A subtle shadow-only ground plane (no reflection). The object casts a soft contact shadow on a warm surface — like a craftsman's workbench.
- **Scroll response:** The object rotates with scroll (120° Y-axis, same as current). Additionally, when the user is in the "Works" section, the object switches to a **turntable mode** — it completes a full 360° rotation as the user scrolls through the 3 products.
- **Hover response:** When the user hovers over a product name, the object exhibits a **micro-breathing** animation (scale 1.0 → 1.015 over 0.6s) — as if acknowledging attention.

## 6. Code Changes

| File | Change |
|---|---|
| `page.tsx` | Complete rewrite of layout. Desktop: flex row with `w-[50vw]` left (canvas) and `w-[50vw]` right (scrollable content). Mobile: stacked. Sections become blocks within the right pane, not full-width. |
| `globals.css` | New token set for warm ivory/brass/umber system. Body background becomes `#F7F5F0`. Scrollbar thumb in `atelier-brass`. Selection background in `atelier-brass`. |
| `Scene.tsx` | Warm lighting overhaul. New environment map (workshop HDRI). ContactShadows with `color="#8A8580"` and `opacity={0.15}` for softer shadow. No post-processing needed — keep it clean. |
| `Navigation.tsx` | Desktop: nav sits at top of right pane, not fixed to viewport. `bg-transparent` when at top, `bg-[#F7F5F0]/90 backdrop-blur` when scrolled. Mobile: fixed top, full-width. |
| `ProductModel.tsx` | Add a `section` prop that rotates through material variants. When section changes, trigger a GSAP timeline: current object scales down 0.95 → model swaps → scales back up 1.0. |
| New: `components/SplitLayout.tsx` | Responsive split container: desktop flex-row, mobile flex-col. Manages the sticky left pane. |

## 7. Risk/Challenge Assessment

| Risk | Mitigation |
|---|---|
| **Split screen fails below ~1200px** | Test at 1024px (iPad Pro). If too cramped, switch to stacked at `lg:` breakpoint (`1024px`) instead of `md:` (`768px`). |
| **Warm brown body text looks muddy** | Use `#5C4A32` (dark umber) which is readable on ivory. Test with actual content. If it fails, use `#4A4A48` charcoal instead. |
| **Left pane 3D is performance-heavy on older devices** | Use `dpr={[1, 1.5]}` instead of `[1, 2]`. Disable shadows on mobile. Use `frameloop="demand"` and ensure `invalidate()` fires on scroll. |
| **Object feels disconnected from right-pane content** | Bridge them with scroll-driven rotation AND hover micro-interactions. Add a thin brass vertical line running down the gutter between panes. |
| **Desktop search engines / social previews show only half the page** | Add `meta` tags for social images that show a composite of object + text. Ensure `main` landmark wraps both panes. |

**Effort:** High. Requires responsive split-screen layout, warm lighting overhaul, and careful scroll coordination.
**Impact:** Very High. Unique in the luxury space — most competitors do full-bleed dark or light, not workshop split.
**Confidence:** 7/10 — split-screen layouts are proven (editorial sites, some portfolios) but rare in luxury object brands.

---

# Direction C: "The Sequence" — Scroll Storytelling

## 1. Visual Thesis
The page is a single, seamless scroll journey: as the user scrolls, the 3D object physically transforms from STARMIRROR → PHYLACTERY → TIARA, the camera orbits through different dramatic angles, and text materializes in sync with each object's surface — every scroll pixel advances both the story and the form.

## 2. Color Palette

This direction needs a palette that supports both **drama** and **clarity** — the background shifts as the story progresses.

| Token | Hex | Usage |
|---|---|---|
| `sequence-void` | `#0D0D0D` | Opening and closing moments — pure darkness |
| `sequence-mist` | `#1C1C1E` | Mid-scroll atmospheric haze |
| `sequence-steel` | `#2A2A2E` | Transition zones |
| `sequence-text` | `#F0F0F0` | All text — white on dark is demanded by the cinematic treatment |
| `sequence-mono` | `#888888` | Labels, numbering |
| `sequence-chrome` | `#E0E0E0` | Object highlight reference |
| `sequence-brass` | `#C4A77D` | Warm accent for "available" moments |
| `sequence-alarm` | `#D0403B` | Preserved for SOLD OUT |
| `sequence-gold` | `#D4AF37` | Acquired state / celebration moments |

**Key insight:** The background is NOT flat. It is a **shader-driven nebula** — dark, slow-moving, noise-based. It shifts subtly as the user scrolls. This is the "atmosphere" of the sequence.

## 3. Typography Treatment

- **Display:** Clash Grotesk, `#F0F0F0`, enormous (fills 40% of viewport width at chapter moments). Some letters are clipped by viewport edges for cinematic tension.
- **Mono labels:** DM Mono, `#888888`, `0.6rem`, extremely wide tracking (`0.15em`). Labels appear via typewriter effect or character-by-character reveal as the user scrolls into a section.
- **Body:** Inter, `#B0B0B0`, weight 300 (light — this is the only direction using weight 300), `1.1rem`. Lighter text fades INTO the mist rather than sitting on top.
- **Chapter numbers:** Playfair Display (NOT italic), `#C4A77D`, `15rem`, positioned as background watermarks behind active text.
- **Nav:** Hidden by default. Appears only on hover at top edge. DEFACT in Clash Grotesk, `#F0F0F0`, `mix-blend-mode: difference`.

## 4. Layout Structure

The page is **one vertical canvas of approximately 500vh**. There are no "sections" in the traditional sense — there are **beats** in a scroll timeline.

```
Scroll position 000vh:  [COMPLETE DARKNESS]
                        "DEFACT" fades in (faint, then sharp)
                        Object: STARMIRROR appears from center, chrome catching
                        a single shaft of light from above

Scroll position 050vh:  [CONCEPTION BEAT]
                        Camera pulls back. Text: "Every artifact begins
                        as a thought." Text appears letter by letter.
                        Object rotates slowly. Surface is matte PLA.

Scroll position 120vh:  [SURFACE TRANSITION]
                        Text: "3D-printed in PLA, hand-sanded"
                        The PLA surface of the object SCRUBS OFF via shader,
                        revealing chrome beneath. The transition is 1:1
                        mapped to scroll position.

Scroll position 180vh:  [OBJECT MORPH]
                        The STARMIRROR geometry DISSOLVES (particle dissolution
                        into 8,000 chrome particles) and REFORMS as PHYLACTERY.
                        Text: "Wearable container with glass core."
                        Particles reform over 20vh of scroll.

Scroll position 250vh:  [ACQUISITION BEAT]
                        Camera shifts to profile. Text appears as floating
                        labels attached to parts of the object:
                        "PLA, Spray-painted" → "Resin, Hand-finished" →
                        "Chrome-electroplated"
                        Each label is a 3D sprite pinned to a mesh vertex.

Scroll position 320vh:  [OBJECT MORPH 2]
                        PHYLACTERY → TIARA. Dissolve and reform.
                        Text: "Transforming headpiece." Text appears mirrored,
                        as if on a chrome surface.

Scroll position 380vh:  [MANIFESTO BEAT]
                        Camera: dramatic low-angle looking up at TIARA.
                        Text: "Cuts through glare and bullshit."
                        in Playfair italic, filling 80% of viewport width.
                        TIARA slowly rotates above the text.

Scroll position 450vh:  [PROCESS BEAT — FAST]
                        Three chapters flash by quickly:
                        CONCEPTION → FABRICATION → FINITION
                        Each word is a 3D extruded text block (Clash Grotesk)
                        that the camera FLYTHROUGHs.

Scroll position 480vh:  [TRANSMIT]
                        Camera settles. A simple contact form appears
                        centered on screen. The 3D object fades to 20% opacity
                        and becomes a background watermark.

Scroll position 500vh:  [FOOTER]
                        "DEFACT © 2026" fades in. Fade to black.
```

## 5. 3D Interaction Model

This is the most ambitious and requires the most new code.

### A. Scroll-Driven State Machine

Use GSAP ScrollTrigger WITH snap behavior to create a "locked" scroll experience:

```javascript
// Snap to nearest beat — prevents stopping mid-transition
ScrollTrigger.create({
  snap: {
    snapTo: (progress) => {
      const beats = [0, 0.1, 0.24, 0.36, 0.50, 0.64, 0.76, 0.90, 1.0];
      return beats.reduce((prev, curr) =>
        Math.abs(curr - progress) < Math.abs(prev - progress) ? curr : prev
      );
    },
    duration: { min: 0.4, max: 0.8 },
    ease: "power2.inOut"
  }
});
```

### B. Three GLB Models, One Scene

Load all three models at mount:

```javascript
const { scene: mirrorScene } = useGLTF("/models/starmirror.glb");
const { scene: phylScene } = useGLTF("/models/phylactery.glb");
const { scene: tiaraScene } = useGLTF("/models/tiara.glb");
```

Only ONE is visible at a time. Transitions are handled via:
- **Scale crossfade:** Current scales to 0 over 20vh of scroll → next scales from 0 to 1 over next 20vh. (Simplest, least risky)
- **Particle dissolution:** Current mesh converts to `Points` geometry, particles disperse outward, next model's particles converge from inward. (Most impressive, highest risk)

### C. Camera Choreography

Camera is NOT static. It follows a **CatmullRom spline** through 3D space, driven by scroll progress:

```javascript
// In useFrame, driven by scrollProgress (0→1)
const spline = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 4),      // Front
  new THREE.Vector3(2, 1, 3),      // Upper-right
  new THREE.Vector3(-2, 0, 3),     // Left
  new THREE.Vector3(0, -1, 3.5),   // Low
  new THREE.Vector3(0, 2, 2),      // Dramatic under
]);

const point = spline.getPoint(scrollProgress);
camera.position.copy(point);
camera.lookAt(0, 0, 0);
```

### D. Text-in-3D (Floating Labels)

Use Drei's `<Text>` component to place labels in 3D space, pinned to object vertices:

```jsx
<Text position={[vertexPosition]} fontSize={0.12} color="#888888"
      font="/fonts/DMMono-Regular.woff">
  {"PLA, Spray-painted"}
</Text>
```

These labels fade in/out based on scroll position.

### E. Background Nebula Shader

A fullscreen quad behind everything with a fragment shader:

```glsl
uniform float uTime;
uniform float uScroll;
varying vec2 vUv;

// Simplex noise functions...
void main() {
  float n = snoise(vec3(vUv * 2.0, uTime * 0.05));
  vec3 color = mix(vec3(0.05), vec3(0.08, 0.07, 0.06), n + uScroll * 0.1);
  gl_FragColor = vec4(color, 1.0);
}
```

This creates a living, breathing dark background that shifts as the user scrolls.

## 6. Code Changes

| File | Change |
|---|---|
| `page.tsx` | Complete rewrite. Single tall container (`height: 500vh` or more). No traditional sections — all content positioned absolutely and opacity/visibility controlled by GSAP ScrollTrigger. |
| `globals.css` | Dark theme tokens. Custom cursor (small chrome dot). Remove body grain — replace with Nebula fullscreen shader. `body` has `overflow: hidden` with a scrollable wrapper div. |
| `Scene.tsx` | Total rebuild. No more fixed hero canvas. Canvas is now `position: fixed; inset: 0; z-index: 0` — the ENTIRE page scrolls OVER a fixed 3D background. Add camera spline controller. Add post-processing: Bloom (subtle, threshold 0.85), Vignette (darkness 0.4). |
| `ProductModel.tsx` | Becomes a scene manager. Controls which model is visible, handles transitions, accepts `scrollProgress` and `currentBeat` props. |
| New: `components/ScrollController.tsx` | GSAP ScrollTrigger orchestrator. Maps scroll progress to: camera position, object visibility, text opacity, background shader uniforms. |
| New: `components/NebulaBackground.tsx` | R3F fullscreen shader mesh behind everything. |
| New: `components/FloatingLabel.tsx` | Drei `<Text>` wrapper with scroll-driven opacity. |
| New: `components/ChapterText.tsx` | Large display text with GSAP SplitText-style character reveal on scroll enter. |
| New: `lib/cameraPath.ts` | CatmullRom spline definition for camera journey. |

## 7. Risk/Challenge Assessment

| Risk | Mitigation |
|---|---|
| **Single tallest barrier: THREE GLB models** | If the client doesn't have `.glb` files for PHYLACTERY and TIARA, this direction is dead. Require 3 production-ready GLB models with Draco compression BEFORE build starts. |
| **500vh scroll feels infinite and exhausting** | Use snap points aggressively (every ~60vh). Give users a progress indicator (thin vertical line on right edge with brass dot showing position). |
| **Camera spline feels nauseating** | Keep camera movement slow and smooth. Maximum position delta per frame is tiny. Use `THREE.MathUtils.lerp` with factor 0.05. |
| **Particle dissolution tanks performance** | Implement as a progressive enhancement. Fallback: simple scale crossfade. Test on iPhone 13 with Chrome DevTools CPU throttling. |
| **Text in 3D is blurry / unreadable** | Use high-res Drei `<Text>` (resolution 2048), limit to 2–3 labels visible at once. Provide a 2D fallback in DOM behind the canvas. |
| **SEO disaster** | All text must ALSO exist in the DOM (for crawlers), just `opacity: 0` until its scroll beat. Use `aria-hidden` carefully. |
| **Accessibility: scroll hijacking** | Offer a "Skip to Content" link that jumps to the Transmit section. Support `prefers-reduced-motion` by disabling camera spline and showing static centered model + standard scroll layout. |
| **Build time explosion** | This is a 3–4 week build for one developer. Consider building the scroll system + one model first, then adding the other two as phase 2. |

**Effort:** Very High. Requires GSAP mastery, shader knowledge, and GLB asset pipeline.
**Impact:** Maximum. This is an Awwwards SOTD-level experience. No competitor in the Cologne/Düsseldorf design-object space has this.
**Confidence:** 6/10 — extremely ambitious. The particle transitions and camera spline are advanced R3F techniques. Success depends heavily on asset quality and performance tuning. If built, it scores 9+/10. If rushed, it scores 3/10 and breaks on mobile.

---

# Comparative Summary

| Dimension | Direction A: Reliquary | Direction B: Atelier | Direction C: Sequence |
|---|---|---|---|
| **Mood** | Sacred, hidden, dramatic | Crafted, warm, tangible | Cinematic, transformative, epic |
| **Brightness** | Dark | Light (warm ivory) | Dark with atmospheric depth |
| **3D Role** | Centered specimen in void | Sticky workshop inspection | Scroll-driven shapeshifter |
| **Interaction** | Slow, contemplative | Split-screen, workshop feel | Locked scroll, camera journey |
| **Typical User Time** | 45–90 sec | 60–120 sec | 120–180 sec |
| **Risk Level** | Medium | Medium | Very High |
| **Build Effort** | Medium (1 week) | High (2 weeks) | Very High (3–4 weeks) |
| **Awwwards Potential** | 7/10 (polished dark) | 7/10 (editorial split) | 9/10 (if executed perfectly) |
| **Mobile Experience** | Strong (dark scales well) | Good (stacks cleanly) | Weak (scroll hijacking is hard on touch) |
| **Brand Fit for DEFACT** | Strong — ritual objects in darkness | Strong — Cologne workshop authenticity | Strong — "objects of distinction" as journey |
| **Dependencies** | None new | None new | Requires 2 additional GLB models + shader work |

---

# Lead Designer Recommendation

**For immediate relaunch (2-week timeline):** Choose **Direction A (The Reliquary)**. It is the most achievable dramatic departure from the current build. It reuses the existing GLB model, requires no new assets, and creates an instantly memorable dark-luxury experience. The workshop warmth of Atelier is compelling but the split-screen layout introduces responsive risk. The Sequence is the dream build but requires assets that may not exist yet.

**For a 6-month brand campaign:** Begin production on **Direction C (The Sequence)** in parallel. Commission GLB models for PHYLACTERY and TIARA, and prototype the particle dissolution system as a standalone demo. When assets are ready, Sequence becomes the flagship experience.

---

*Written by DEFACT Lead Designer — 2026-04-30*
