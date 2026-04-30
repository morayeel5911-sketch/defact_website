# DEFACT Design Constitution

> This document is the single source of truth for all agents working on the DEFACT website.
> Every design decision, code contribution, and critique must align with these principles.

---

## Brand Identity

**DEFACT** is a Cologne-based design duo exploring the intersection of craftsmanship and digital aesthetics.
We are NOT a startup. NOT a SaaS. NOT a product catalog.

We are a **contemporary digital atelier** — think COS × David Chipperfield × digital brutalism.
Our website must feel like stepping into a cooled concrete gallery at 10 AM.

**Keywords:** Archive. Ritual. Artifact. Precision. Restraint. Tension.

---

## Anti-Patterns (FORBIDDEN)

These patterns are statistically overrepresented in AI-generated design and are **banned** from this project:

- ❌ Inter, Roboto, or system sans-serifs for display/headline text
- ❌ Purple, blue, or gradient backgrounds (linear-gradient with blue→purple)
- ❌ Card grids with rounded corners and box-shadows
- ❌ Feature lists, pricing tables, testimonial carousels
- ❌ Centered hero marketing speak ("Transform your workflow", "Unlock your potential")
- ❌ Drop shadows on cards or text (use 1px borders or none)
- ❌ Rounded corners larger than 2px (unless 3D geometry demands it)
- ❌ Generic dashboard/admin/analytics UI patterns
- ❌ Burger menus that slide in from the left like every SaaS app
- ❌ Floating action buttons, chat widgets, cookie banners in the spec
- ❌ Animated counters, progress bars, or statistics sections
- ❌ Stock photography vibes — only abstract 3D, texture close-ups, or nothing

---

## Typography

| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| **Display** | Clash Grotesk | Space Grotesk | Headlines, titles, section markers. Weight 600-700. |
| **Mono** | DM Mono | JetBrains Mono | Data, labels, metadata, navigation indices, form labels. Weight 400. Italic for emphasis. |
| **Body** | Inter | system-ui | Paragraphs, descriptions. Weight 400-500. Max line-length 65ch. |
| **Quote** | Playfair Display | Georgia | Manifesto quotes, pull-quotes. Italic only. |

**Rules:**
- Headlines must be the LOUDEST visual element — no competing with UI chrome.
- Type scale: hero 10vw, section headers 3-4rem, body 1rem, captions 0.75rem.
- ALL-CAPS is reserved for structural labels (section numbers, metadata), never headlines.
- Letter-spacing on mono: 0.05em minimum. On display: -0.02em.

---

## Color & Materiality

### Primary Palette (Clinical Archive)

| Token | Hex | Usage |
|-------|-----|-------|
| `--void` | `#FAFAFA` | Page background. Warm off-white, never pure white. |
| `--anodized` | `#FFFFFF` | Card surfaces, overlays. |
| `--signal` | `#111111` | Primary text. Near-black, not pure black. |
| `--steel` | `#7A7A7A` | Secondary text, labels, inactive states. |
| `--chrome` | `#808080` | Accent highlights, hover states, index numbers. |
| `--border` | `#E6E6E6` | Dividers, card borders, input underlines. |
| `--alarm` | `#D0403B` | Sold-out states, errors. Used sparingly. |

### 3D Material Palette

| Material | Color | Roughness | Metalness | EnvMap |
|----------|-------|-----------|-----------|--------|
| Chrome primary | `#C0C0C0` | 0.2 | 0.9 | 2.0 |
| Dark contrast | `#1C1C1E` | 0.8 | 0.1 | 0.5 |
| Warm accent | `#B8860B` | 0.3 | 0.85 | 1.5 |

### Rules:
- Backgrounds must feel like **physical material** (stone, linen, anodized aluminum) — not digital gradients.
- NO oversaturated digital colors. Muted, mineral, oxidized tones only.
- High-contrast type on light backgrounds. Dark backgrounds reserved for 3D canvas areas only.
- Grain overlay: opacity 0.02, mix-blend-mode: soft-light. Subtle, not a filter effect.

---

## Layout Rules

- **Asymmetric compositions preferred.** A 2:1 left:right split beats centered content.
- **Generous whitespace:** minimum 6rem vertical padding for major sections.
- **Broken-grid is acceptable.** Centered text grids are NOT acceptable (except for manifesto blocks).
- **Full-bleed R3F canvas** allowed as background or inline section element.
- **Mobile-first but editorial:** on mobile, stack vertically but maintain typographic hierarchy.
- **Grid:** 12-column, but elements may span non-standard widths.
- **Never full-bleed text.** Always constrain to max-width (7rem for body, 5rem for manifestos).

---

## Motion Thesis

- Motion should feel **physical** (inertia, mass, friction), never decorative.
- 3D camera moves should resemble a slowly revolving sculpture plinth — not a fly-through.
- Scroll-driven parallax: subtle, purposeful. Maximum shift: 30px per viewport.
- Hover transitions: 300ms ease-out. No bouncy springs.
- Page transitions: crossfade with 200ms opacity. No slide-in effects.
- **NO gimmicky hover animations** on static elements. Reserve motion for 3D and page-level transitions.
- Breathing animation on 3D objects: 2-4s period, y-axis oscillation ≤0.05 units.

---

## Content Voice

- Short, declarative sentences. No filler.
- UppERCASE for structural labels: `[01]`, `COLLECTIBLE`, `SURFACE // ACTIVE`
- Product descriptions are poetic + technical: "Glossy surface. Soft grip. Sharp edges."
- Manifesto quotes in Playfair Display italic: "Material has memory."
- NO marketing language. NO "We believe," NO "Our mission," NO "Empowering creators."

---

## Technical Constraints

- **Framework:** Next.js 14+ App Router with React Three Fiber
- **3D Integration:** R3F canvas as full-bleed background OR inline section element. Never modal/overlay.
- **Performance budget:** 60fps on M1 MacBook Air. Instancing, LOD, texture compression mandatory.
- **TypeScript:** strict, no `any`.
- **Mobile:** Touch interactions must feel native. No hover-only states on mobile.
- **Fonts:** Clash Grotesk (Fontshare), DM Mono + Inter + Playfair Display (Google Fonts).
- **Grain overlay:** CSS only, SVG noise pattern, opacity 0.02, mix-blend-mode soft-light.

---

## Agent Handoff Protocol

1. All agents read this file before generating any design or code.
2. Design tokens must be referenced from this file, never invented independently.
3. If a token or pattern is missing, flag it — do NOT substitute with a generic default.
4. Output goes to `/shared/` directory: `research_report.md`, `concepts_v1.md`, `critique_oracle.json`, `council_verdict.md`.
5. Critique scoring: 1-10 scale. Pass threshold: ≥8/10 on all dimensions.