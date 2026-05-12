# DEFACT 3D Website — Offene Main Quest Plan

**Datum:** 2026-05-12  
**Branch:** `codex/defact-technical-cleanup-pitch` (26 uncommitted Files)  
**Ziel:** Oracle-Review Fixes + GSAP→CSS Migration + Merge

---

## Status Quo

- **26 modifizierte Files** auf `codex/defact-technical-cleanup-pitch` — uncommitted
- Letzter main-Commit: Phase 6 (prefers-reduced-motion + ScrollTrigger cleanup)
- Oracle-Review vom 2026-05-09 offen — 4 kritische/wichtige Punkte

---

## Phase 0: Cleanup-Branch stabilisieren

| # | Task | Agent | Zeit |
|---|------|-------|------|
| 0.1 | Git diff review — verstehen was in den 26 Files geändert wurde | Einz | 15min |
| 0.2 | Commit auf Branch `codex/defact-technical-cleanup-pitch` | Einz | 5min |
| 0.3 | Build test: `npx next build` | Einz | 3min |
| 0.4 | Bei Build-OK: Push + GH-Pages Preview deploy | Einz | 5min |

**Gate:** Build muss passieren bevor Phase 1 startet.

---

## Phase 1: Kritische Oracle-Fixes (Security & Bundle)

| # | Task | Agent | Zeit |
|---|------|-------|------|
| 1.1 | **CSP Meta-Tag** in `src/app/layout.tsx` einfügen | Coder | 20min |
| 1.2 | **Dead Dependencies** entfernen: `npm uninstall @react-three/rapier @react-three/postprocessing tone maath troika-three-text` | Coder | 10min |
| 1.3 | `package.json` cleanup — ggf. weitere ungenutzte Deps prüfen | Coder | 15min |
| 1.4 | Build test nach Deps-Removal | Coder | 3min |

**Gate:** Build muss passieren. CSP muss im HTML `<head>` sichtbar sein.

---

## Phase 2: Canvas Lifecycle (Performance)

| # | Task | Agent | Zeit |
|---|------|-------|------|
| 2.1 | IntersectionObserver in `Scene.tsx` einbauen | Coder | 30min |
| 2.2 | `frameloop="demand"` wenn Hero nicht sichtbar | Coder | 15min |
| 2.3 | Mobile-Battery-Test (Simulator oder Lighthouse) | Einz | 15min |

---

## Phase 3: GSAP → CSS Scroll-Driven Animations (Migration)

| # | Task | Agent | Zeit |
|---|------|-------|------|
| 3.1 | Reveal-Animationen (`useScrollAnimation.ts`) auf `animation-timeline: view()` migrieren | Coder | 2h |
| 3.2 | Parallax-Effekte auf `animation-timeline: scroll()` migrieren | Coder | 1.5h |
| 3.3 | Progress-Dots (SectionNav) auf CSS `scroll(root)` umstellen | Coder | 45min |
| 3.4 | Lenis behalten — nur ScrollTrigger entfernen | Coder | 30min |
| 3.5 | `prefers-reduced-motion` für CSS-Animationen | Coder | 20min |

**Gate:** Alle Scroll-Effekte müssen ohne GSAP ScrollTrigger funktionieren. Lenis bleibt für Smooth-Scroll.

---

## Phase 4: Build, Preview, Merge

| # | Task | Agent | Zeit |
|---|------|-------|------|
| 4.1 | `npx next build` (statischer Export) | Coder | 3min |
| 4.2 | Lokaler Server + Cloudflare Tunnel für Preview | Einz | 5min |
| 4.3 | User-Review der Preview | User | — |
| 4.4 | Merge `codex/defact-technical-cleanup-pitch` → `main` | Einz | 5min |
| 4.5 | GH-Pages Deploy von main | Einz | 5min |

---

## Risiken

| Risiko | Wahrscheinlichkeit | Mitigation |
|--------|-------------------|------------|
| CSS `animation-timeline` nicht in Safari ≤15 | Hoch | `@supports` Query + GSAP Fallback |
| Build bricht nach Deps-Removal | Mittel | Einzeln deinstallieren, jeweils builden |
| 26 uncommitted Files enthalten halbfertige Arbeit | Mittel | Zuerst diff reviewen |

---

## Agent-Zuweisung

| Agent | Rolle | Modell |
|-------|-------|--------|
| **Einz** | Plan, Review, Merge, Deploy | kimi-k2.6:cloud |
| **Coder** | Implementierung, Fixes | deepseek-v4-flash:openrouter (neu) |
| **Oracle** | Architektur-Review | deepseek-v4-pro:cloud |
