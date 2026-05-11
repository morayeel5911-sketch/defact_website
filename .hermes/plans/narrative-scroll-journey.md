# DEFACT Website — Narrative Scroll Journey (Option B)
## Implementierungsplan (Oracle-reviewed)

**Projekt:** DEFACT 3D Website  
**Scope:** Scroll-Driven Narrative Experience  
**Geschätzter Aufwand:** 4–5 Sessions  
**Branch:** `feature/narrative-scroll`  
**Letztes Update:** 2026-05-11

---

## Ziel

Die 9 Sections der DEFACT-Website sollen zu einer zusammenhängenden, scroll-gesteuerten Narrative verschmelzen. Der User soll beim Scrollen durch die Seite das Gefühl haben, durch einen einzigen, kohärenten Raum zu navigieren — nicht durch 9 abgetrennte Kapitel.

---

## Abgrenzung (Out of Scope)

- ❌ Kein neues Design-System (Farben, Fonts bleiben)
- ❌ Keine neuen Sections hinzufügen
- ❌ Kein R3F-WebGL-Code ändern (Scene, Shader, etc.)
- ❌ Keine Content-Änderungen (Texte, Bilder)
- ❌ Kein Mobile-Breakdown (Animations auf `prefers-reduced-motion` und Touch konditional reduzieren)

---

## Phase 1: Foundation — GSAP ScrollTrigger Setup (Session 1)

### Task 1.0: Blocker-Fixes (VOR Phase 1)
- ✅ **Footer `data-theme="dark"`** — Erledigt auf Branch
- ✅ **Lenis-Sync** — Bereits vorhanden in `LenisProvider.tsx` (l.on("scroll", ScrollTrigger.update) + gsap.ticker)

### Task 1.1: Dependencies
- `gsap@3.15.0` bereits installiert
- `@gsap/react` **NICHT** installiert — wir nutzen manuelles `gsap.context()` + `useEffect`

### Task 1.2: Global ScrollTrigger-Konfiguration
- In `page.tsx`: `gsap.registerPlugin(ScrollTrigger)` einmalig (bereits via LenisProvider, aber redundant/safe)
- **NICHT:** `ScrollTrigger.defaults({ scrub: 1 })` — scrub nur bei Parallax/Farb-Tweens
- `ScrollTrigger.config({ ignoreMobileResize: true })`
- Cleanup bei Unmount: `ScrollTrigger.getAll().forEach(t => t.kill())`

### Task 1.3: Section-Refs-System
- `useRef` Array oder Map für alle Sections
- Alternative: Jede Section managed eigene `ScrollTrigger.create()`
- **Decision:** Jede Section selbst-verwaltet (kapselt Animation + Cleanup)

### Task 1.4: Theme-Transition (Korrigiert nach Oracle)
- **NICHT:** `currentTheme` State tweenen (String geht nicht)
- **SONDERN:** Direkte CSS-Farb-Tweens via GSAP:
  ```typescript
  gsap.to(sectionRef, {
    backgroundColor: "#0D0D0D",
    scrollTrigger: { trigger: sectionRef, start: "top 80%", end: "top 20%", scrub: true }
  });
  ```
- Body-Farbe interpoliert zwischen Section-Themes

---

## Phase 2: Scroll-Driven Farbwechsel (Session 1–2)

### Task 2.1: Smooth Theme-Transition
- Direkte GSAP-Farb-Tweens auf Section-Container
- Kein React-State für Theme — DOM-Driven

### Task 2.2: Grid-Farb-Interpolation
- InterfaceGrid: Duplizierter Grid-Layer (light + dark) mit opacity-crossfade
- Da SVG als `background-image`: CSS `opacity` tween auf zwei Grid-Container
- Alle 9 Sections: `<div className="dark-grid">` + `<div className="light-grid">` statt einem

---

## Phase 3: Parallax-Tiefen (Session 2)

### Task 3.1: Hintergrund-Parallax
- Hero-Bild: `yPercent: 15` auf `<Image>` (NICHT auf Section-Container — schützt SVG-Linien)
- Andere Section-Bilder: `yPercent: -20 bis +20`
- `will-change: transform` für Performance

### Task 3.2: Grid-Parallax
- InterfaceGrid: `yPercent: -10` (langsamer als Content)

### Task 3.3: Content-Stagger
- Text-Elemente: sequentieller Y-Offset beim Scroll

---

## Phase 4: Section-Morphs & Sticky Headlines (Session 3)

### Task 4.1: Sticky Section-Labels
- `position: sticky; top: 50vh;` oder GSAP-Pin
- Fade-out bei Section-Wechsel

### Task 4.2: Index-Counter Durchlauf
- "[01]" → "[02]" → "[03]" animiert (GSAP textContent tween)

### Task 4.3: SVG Line-Draw Reveals
- `stroke-dashoffset` Animation auf Divider-Linien
- Anwendung: Section-Trennlinien, Manifesto-Zitat-Linien

---

## Phase 5: Pinning & Scroll-Linked Transitions (Session 4)

### Task 5.1: Manifesto Section Pin
- `pin: true`, `end: "+=100%"` (NICHT 200% — Oracle: Content zu kurz)
- Text erscheint Zeile-für-Zeile

### Task 5.2: Gallery Scroll-Linked Image Reveal
- `clipPath` oder `scale` Reveal — Bild "wächst" beim Scrollen

### Task 5.3: Footer "Absorption"
- Z-Index Layer-System definieren (Content z-10, Grid z-0, Overlays z-20, Navigation z-50)
- Footer "überdeckt" vorherige Section

---

## Phase 6: Polish & Performance (Session 5)

### Task 6.1: `prefers-reduced-motion`
- Alle Animationen auf `0` bei `prefers-reduced-motion: reduce`
- GSAP `matchMedia`

### Task 6.2: Mobile-Optimierung
- Parallax auf Touch: 50% Werte
- Pinning auf Mobile deaktiviert (Viewport-Verlust)
- `ScrollTrigger.matchMedia({ "(min-width: 768px)": () => { ... } })`

### Task 6.3: RAF & Cleanup
- `gsap.context()` für Scoped cleanup
- Chrome DevTools Layout-Thrashing check

---

## Dateien & Änderungen

| Datei | Änderung |
|-------|----------|
| `src/app/page.tsx` | Theme-Observer entfernen, ScrollTrigger-Setup |
| `src/hooks/useScrollReveal.ts` | Erweitern um ScrollTrigger-Integration |
| `src/components/InterfaceGrid.tsx` | Opacity-Crossfade für Theme-Transition |
| `src/sections/HeroSection.tsx` | Parallax auf Hero-Bild |
| `src/sections/ManifestoSection.tsx` | Pinning + Text-Reveal |
| `src/sections/V2GallerySection.tsx` | Scroll-Linked Image Reveal |
| `src/sections/ProtocolSection.tsx` | Line-Draw Reveals |
| `src/sections/ProcessSection.tsx` | Content-Stagger |
| `src/sections/ArtifactsSection.tsx` | Parallax + Stagger |
| `src/sections/TransmitSection.tsx` | Parallax |
| `src/sections/CreatorBiosSection.tsx` | Stagger |
| `src/sections/Footer.tsx` | ✅ `data-theme` fix erledigt |
| `src/components/SectionNav.tsx` | Index-Counter Animation |

---

## Risiken & Mitigation (Oracle-Feedback)

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| GSAP + R3F Canvas konfligieren | Mittel | Hoch | Canvas in eigener fixed Layer, ScrollTrigger nur auf DOM |
| Scroll-Performance auf Mobile | Hoch | Mittel | `@media` reduced motion, parallax aus, pinning aus |
| Zu viele gleichzeitige ScrollTrigger | Mittel | Mittel | Batch-Erstellung, cleanup bei unmount |
| Theme-Transition matschig | Mittel | Niedrig | Nach Task 2.2 Preview, frühes Feedback |
| Hero SVG-Linien bei Parallax zerstört | Niedrig | Hoch | Parallax nur auf `<Image>`, nicht Container |

---

## Verifikation

- [ ] `TURBOPACK=0 npx next build` erfolgreich
- [ ] Keine TypeScript-Fehler
- [ ] Kein Layout-Thrashing in Chrome DevTools
- [ ] `prefers-reduced-motion` reduziert Animationen
- [ ] Mobile Pinning deaktiviert
- [ ] Safari Rendering okay
- [ ] GitHub Pages Deploy erfolgreich

---

> **Nächster Schritt:** Feature-Branch `feature/narrative-scroll` erstellen → Phase 1 beginnen.
