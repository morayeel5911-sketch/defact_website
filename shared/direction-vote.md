# DEFACT Design Direction — Voting Brief

**Date:** 2026-05-02
**Repo:** `morayeel5911-sketch/defact_website`
**Status:** Awaiting decision

---

## The Three Candidates

| | A. The Reliquary | B. The Atelier | C. The Sequence |
|---|---|---|---|
| **Mood** | Sacred, hidden, precious, dangerous | Workshop, warm, manual, intimate | Cinematic, cinematic, temporal, emotional |
| **Background** | Absolute darkness `#0A0A0A` | Warm ivory `#F7F5F0` | Chromatic gradient (dark-to-light journey) |
| **3D Object** | Floating in museum vitrine, spotlit, reflects darkness | On workbench under warm task light | Transforms into portal/light-source as user scrolls |
| **Scroll Behavior** | Object pauses on scroll (living specimen) | Left pane sticky, right pane scrolls | Scroll drives light intensity, object rotation speed, camera distance |
| **Typography** | Clash Grotesk + Playfair italic + mono labels with phosphor glow | Clash Grotesk with stroke-filling animation + brass borders | Clash Grotesk at extreme scale (14vw), mono as timeline markers |
| **Interaction** | Mouse tilt ±5° (curious animal) | Object responds to cursor position in left pane | Scroll velocity modulates bloom intensity and lens distortion |
| **Risk** | Can feel "gamer"/edgy if lighting is cold | Split screen breaks on mobile (needs fallback) | Chromatic aberration + postprocessing can destabilize WebGL |
| **Effort** | Medium-High (CSS + lighting) | High (responsive split-screen architecture) | Very High (custom scroll-jacking, postprocessing, performance tuning) |
| **Best For** | Brand that values mystery, exclusivity, art-world credibility | Brand that values process, hand-craft, transparency | Brand that values spectacle, immersion, digital-native experience |

---

## Evaluation Criteria

Score each direction **1–5** on these axes. Total max = 30.

| Criteria | Weight | Description |
|----------|--------|-------------|
| **Brand Alignment** | x3 | Does this match how DEFACT wants to be perceived? |
| **Visual Distinction** | x2 | Will this stand out from typical 3D product sites? |
| **Technical Feasibility** | x2 | Can we build + ship this with current stack (Next.js 16, R3F v9, GSAP)? |
| **Content Fit** | x1 | Do the existing assets (videos, GLB models, copy) work naturally? |
| **Mobile Experience** | x1 | Does the mobile version feel intentional, not broken-desktop? |
| **Maintainability** | x1 | Can the duo update content without calling a developer? |

---

## Current Assessment (Before Vote)

| Direction | Brand | Distinct | Feasible | Content | Mobile | Maint. | **Total** |
|-----------|-------|----------|----------|---------|--------|--------|-----------|
| A. Reliquary | 5/5 | 4/5 | 3/5 | 4/5 | 4/5 | 3/5 | **(5×3)+(4×2)+(3×2)+4+4+3 = 39/60** |
| B. Atelier | 4/5 | 4/5 | 2/5 | 5/5 | 2/5 | 3/5 | **(4×3)+(4×2)+(2×2)+5+2+3 = 36/60** |
| C. Sequence | 3/5 | 5/5 | 1/5 | 3/5 | 3/5 | 1/5 | **(3×3)+(5×2)+(1×2)+3+3+1 = 31/60** |

**Preliminary winner: A. The Reliquary** — highest brand alignment + feasible within current stack.

---

## Open Questions

Before final vote, answer these:

1. **Does "dark" contradict the current light-grey vault?** → The Vault was chosen for clinical archive. Dark = sacred archive. Shift is intentional.
2. **Can we ship dark in time?** → Mostly CSS changes + Scene.tsx lighting. No new dependencies. 2–3 days.
3. **What happens to the chrome material?** → Same material, but environment map changes from studio-lit to dark-spotlit. The chrome becomes MORE reflective (reads as polished).
4. **Print / screenshot problem?** → Dark pages screenshot as black boxes. Solution: CSS `@media print` forces light mode, OR we accept that this is digital-native.
5. **Do we keep The Vault as a toggle?** → No. The Vault exists as the v1 shipped state. The redesign REPLACES it. One direction only.

---

## Voting Method

Cast your vote by editing this file and adding your score table below. Or message:

**"I vote [A/B/C] because [one sentence]."**

Majority wins. Tie → I (Orchestrator) cast deciding vote.

---

## Votes

| Voter | Choice | Reason |
|-------|--------|--------|
| | | |

---

## Post-Vote Action

Once decided:
1. Archive the two losing directions to `/shared/archive/`
2. Create implementation todo list from the winning direction's "Code Changes" section
3. Assign to @fixer for execution
4. Oracle QA before merge to `main`
