# DEFACT Visual Direction Critique — Design Director's Summary

> **Oracle Review Date:** 2026-04-28  
> **Constitution:** `/shared/DESIGN.md`  
> **Prior User Choice:** Clinical Archive (light, sterile, `#FAFAFA` void, chrome on white)

---

## Executive Verdict

| Rank | Direction | Verdict | Score Avg |
|------|-----------|---------|-----------|
| **1st** | **A: The Vault** | ✅ **PASS** | 8.2 / 10 |
| 2nd | C: The Relic | ❌ REJECT | 6.4 / 10 |
| 3rd | B: The Ledger | 🔄 REVISION | 6.0 / 10 |

**The Vault is the clear winner.** It honors the Clinical Archive preference, is technically sound, and the 90vh silent hero is the most distinctive move across all three directions.

---

## Direction A: The Vault — PASS (8.2/10)

> *"Museum storage room at 4 AM — vast, cold, lit only by a single halogen tracking the chrome artifact's edges."*

### Scores

| Dimension | Score | Key Point |
|-----------|-------|-----------|
| Originality | 8 | 90vh silent hero is genuinely bold. Full-width list rows over card grids is correct. |
| Brand Alignment | 9 | Clinical Archive taken to its logical extreme. All constitution keywords embodied. |
| Technical Feasibility | 8 | Single canvas, transparent bg, demand rendering — the simplest, most proven architecture. |
| Luxury Presence | 9 | Extreme restraint IS luxury. 15vw margins, 160px padding, 42rem text — gallery grammar. |
| Scroll Experience | 7 | Delayed gratification arc is strong, but risks monotony after hero. Needs a subtle scroll affordance. |

### What to Keep
- The 90vh silent hero — do not compromise on this
- Full-width horizontal list rows with 1px dividers (no card grids)
- Extreme whitespace (15vw padding, 160px section padding)
- Strict monochrome with chrome object as the only reflective moment
- Footer as stamp, not menu
- `frameloop="demand"` with scroll-driven `invalidate()`
- No bloom, SSAO only

### What to Change
- Add a subtle scroll indicator (thin 1px vertical line extending downward, not a bouncing arrow)
- Reduce mobile hero to 120vh with title appearing at 80vh
- Differentiate Works and Acquisition lists visually (they're structurally identical)
- Ensure Duo portrait objects don't read as placeholder blocks
- Make Process `[01]/[02]/[03]` labels visible enough to serve as navigation anchors
- Add 100ms transition to submit button hover (fast enough to feel mechanical, slow enough to register)

### Risk: MEDIUM
Primary risk: the 90vh silent hero puts enormous pressure on 3D asset quality. If the chrome object isn't stunning, the entire first impression collapses. Mitigation: ensure production-quality chrome object before committing.

---

## Direction B: The Ledger — REVISION (6.0/10)

> *"A specimen catalog from 1923 cross-referenced with a contemporary metalworker's notebook."*

### Scores

| Dimension | Score | Key Point |
|-----------|-------|-----------|
| Originality | 7 | Specimen catalog concept is coherent but editorial-design-on-web is well-established. |
| Brand Alignment | 6 | Warm paper palette contradicts "cooled concrete gallery." Playfair hero headline violates typography rules. |
| Technical Feasibility | 6 | Multiple inline canvases create WebGL context management complexity. |
| Luxury Presence | 6 | Warm tones risk feeling like a coffee shop brand, not $200+ collectibles. |
| Scroll Experience | 5 | Flattest of the three. No scroll-driven 3D. Feels like reading a PDF, not experiencing a gallery. |

### Critical Issues
1. **Warm palette betrays Clinical Archive.** `#F2F0EB` void vs. constitution's `#FAFAFA`. The user chose light/sterile — this is warm/bookish.
2. **Playfair Display for hero headline** violates "Headlines must be the LOUDEST visual element" in Clash Grotesk.
3. **3D object demoted to "plate"** — positioned alongside text like an illustration, not commanding the viewport. Undermines perceived product value.
4. **No scroll-driven 3D interaction** — wastes the medium entirely.
5. **Information density** contradicts "Generous whitespace" rule (64px vs. 96px minimum).

### What's Worth Salvaging
- Sticky sidebar with persistent page index (best navigation innovation across all directions)
- Marginal numbers in the gutter (beautiful editorial detail)
- Double-rule section breaks (more distinctive than single 1px rules)

### Risk: HIGH
If the warm palette is rejected by stakeholders, the entire direction collapses. Multiple inline canvases are technically unproven for this stack.

---

## Direction C: The Relic — REJECT (6.4/10)

> *"A crypt-to-cathedral procession: from near-total darkness into warm gold-tinged illumination."*

### Scores

| Dimension | Score | Key Point |
|-----------|-------|-----------|
| Originality | 7 | Dark-to-light journey with scroll-driven lighting is strong, but dark+gold is a known luxury trope. |
| Brand Alignment | 5 | Fundamentally violates Clinical Archive. Dark backgrounds, gradient journey, centered layouts. |
| Technical Feasibility | 4 | `frameloop="always"` + full post-processing stack + fog + dynamic lighting = likely misses 60fps budget. |
| Luxury Presence | 8 | Undeniably premium. Dark+gold feels expensive, but risks feeling like a generic watch/jewelry brand. |
| Scroll Experience | 8 | Strongest scroll journey. Every scroll action has narrative meaning. The pilgrimage arc is compelling. |

### Critical Issues
1. **Dark backgrounds for content sections** violate "Dark backgrounds reserved for 3D canvas areas only."
2. **Gradient background journey** (`#0A0A0A` → `#FAFAFA`) violates "Backgrounds must feel like physical material — not digital gradients."
3. **Centered hero and manifesto** violate "Asymmetric compositions preferred."
4. **Gold replacing chrome as primary UI accent** expands the color system beyond the constitution.
5. **`frameloop="always"` with full post-processing** is unproven at 60fps on M1 Air.
6. **Chrome on black** is a harder, untested lighting scenario vs. the proven chrome-on-white approach.

### What's Worth Salvaging
- Scroll-driven lighting rig concept (adapt to light-background context)
- Gold rim glow technique (use constitution's warm accent `#B8860B` for 3D materials only)
- "Journey" narrative structure (apply within the light palette using subtle tonal shifts)
- Gold focus states on form inputs

### Risk: HIGH
Stakeholder rejection near-certain due to Clinical Archive betrayal. Performance budget likely missed. Chrome-on-black lighting unproven.

---

## Cross-Direction Observations

### Strongest Individual Moves
1. **The Vault's 90vh silent hero** — most distinctive single idea
2. **The Ledger's sticky sidebar** — best navigation innovation
3. **The Relic's scroll-driven lighting** — most ambitious 3D concept

### Ideas to Extract for The Vault
- From Ledger: marginal numbers in the gutter for Works list rows
- From Ledger: double-rule section breaks
- From Relic: gold accent used ONLY for 3D warm accent material (`#B8860B` per constitution)
- From Relic: "journey" concept applied within the light palette

### Constitution Compliance
| Direction | Anti-Patterns Avoided | Major Violations |
|-----------|----------------------|------------------|
| A: The Vault | 8/8 | 1 minor (palette shift `#F0F0F0`) |
| B: The Ledger | 5/8 | 3 major (warm palette, Playfair hero, reduced hierarchy) |
| C: The Relic | 4/8 | 4 critical (dark bg, gradient, centered, gold UI) |

### Clinical Archive Fidelity
- **A: HONORS** — Takes Clinical Archive to its logical extreme
- **B: BETRAYS** — Replaces clinical coolness with warm paper nostalgia
- **C: BETRAYS** — Replaces light/sterile with dark/dramatic

---

## Recommendation

**Proceed with Direction A (The Vault)** with the specified modifications. The direction is constitution-compliant, technically feasible, and has the strongest luxury presence. The 90vh silent hero is the most distinctive brand move available.

Extract the best ideas from B and C (sticky sidebar index, marginal numbers, double-rules, gold 3D accent) and evaluate them as optional enhancements to The Vault in a subsequent refinement round.

Do not pursue Direction C in its current form. Do not pursue Direction B without a fundamental palette revision back to Clinical Archive cool tones.

---

*Full structured critique with detailed scoring rationale available in `/shared/critique_oracle.json`.*
