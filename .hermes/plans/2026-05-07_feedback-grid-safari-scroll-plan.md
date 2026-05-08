# DEFACT Website Feedback — Implementation Plan

## Zusammenfassung des Feedbacks

| # | Feedback | Priorität | Status |
|---|---|---|---|
| 1 | **Grid 3x skalieren** (80px → 240px) | 🔴 Hoch | Offen |
| 2 | **Elemente am Background Grid orientieren** | 🔴 Hoch | Phase 3 deployed, aber nicht perfekt |
| 3 | **Safari Desktop Lag** | 🔴 Hoch | SVG Pattern-Ansatz ist Safari-Problem |
| 4 | **Side Scrollbar Desktop** (horizontal scrollbar sichtbar) | 🟡 Mittel | Offen |
| 5 | **Broken Images** | 🟡 Mittel | Offen |
| 6 | ✅ **Glass-like Navbar** — gefällt | — | Erhalten |
| 7 | ✅ **Scrollprogress top** — gefällt | — | Erhalten |
| 8 | ✅ **Farbe + Grid = Blaupause** — gefällt | — | Erhalten |

---

## Detaillierte Problemanalyse

### 1. Grid 3x Skalieren (80px → 240px)
**Beschreibung:** `--grid-size` von 80px auf ~240px erhöhen. Das macht die Zellen sichtbar größer und das Grid dominanter.
**Implikationen:** Alle `gsnap-*` und `py-grid-*` Utilities skalieren automatisch mit (da sie `calc(var(--grid-size) * N)` nutzen). Content-Padding wird also automatisch größer.
**Aber:** 240px ist extrem groß für Mobile. Vorschlag: `--grid-size: 120px` (1.5x) für Mobile, `--grid-size: 240px` (3x) für Desktop via Media Query. Oder: wir skalieren wirklich auf 240px und sehen wie es aussieht.
**Dateien:** `globals.css` @theme Block

### 2. Elemente am Background Grid orientieren
**Beschreibung:** Text, Bilder, Cards sollen exakt auf Grid-Linien ausgerichtet sein.
**Status:** Phase 3 ist deployed (`gsnap-*`, `py-grid-*` auf allen Sections). Aber die Sections nutzen intern noch viele hardcoded Werte (z.B. `gap-8`, `mb-16`, `space-y-8` in Unter-Komponenten). Die Utility-Klassen greifen nur auf Top-Level-Container-Ebene.
**Vorschlag:** Tiefere Anpassung — auch innere Layout-Elemente (Cards, Text-Blöcke, Bild-Gaps) auf Grid-Snaps umstellen. Das erfordert mehr Arbeit als die schnelle Phase 3.
**Dateien:** Alle Section-Dateien (tiefergehende Patches)

### 3. Safari Desktop Lag
**Beschreibung:** Scroll laggt auf Safari Desktop.
**Ursache:** Das aktuelle SVG-Pattern-Ansatz (`<pattern>` gepflastert über 100% Seitenhöhe) ist bekannter Performance-Killer in Safari. Safari rendert SVG-Patterns sehr ineffizient bei großen Viewports.
**Lösungsoptionen:**
- **A)** Zurück zu Canvas, aber diesmal NICHT fixed — Canvas als `position: absolute` innerhalb des Scroll-Containers, so dass es nativ mitscrollt (kein JS Scroll-Listener nötig). Canvas muss aber die volle Seitenhöhe abdecken.
- **B)** CSS `background-image` mit `repeating-linear-gradient` + `repeating-linear-gradient` (Cross für die Linien) + radial-gradient für Node-Dots. Reines CSS, kein SVG/Canvas, hardwarebeschleunigt.
- **C)** Das SVG als `background-image` (Data-URI) auf `<main>` setzen. Browser rendert das als Bitmap-Background, nicht als DOM-SVG.
**Empfehlung:** Option B (CSS-only Grid) — schnellste Performance, kein JS, kein SVG-DOM. Aber am schwierigsten für die 10px Gaps an Kreuzungen.
**Alternative Empfehlung:** Option C (SVG als Data-URI background-image) — behält exaktes Design bei, Browser rendert als optimierten Hintergrund.
**Dateien:** `InterfaceGrid.tsx` komplett rewrite, `globals.css` ggf. Background-Styles

### 4. Side Scrollbar Desktop (horizontal scrollbar)
**Beschreibung:** Eine horizontale Scrollbar ist auf Desktop sichtbar.
**Ursache:** Vermutlich `overflow-x: hidden` nicht korrekt gesetzt, oder ein Element breiter als Viewport (z.B. Marquee, große Typo, oder `100vw` + Scrollbar-Breite).
**Lösung:** `overflow-x: hidden` auf `html`/`body` prüfen. Marquee-Elemente auf `max-w-full` begrenzen. `100vw` auf Desktop ist Problem weil Scrollbar-Breite subtrahiert wird → `100%` statt `100vw` nutzen.
**Dateien:** `globals.css`, `Footer.tsx` (Marquee), evtl. `page.tsx`

### 5. Broken Images
**Beschreibung:** Bilder laden nicht / Platzhalter sichtbar.
**Ursache:** V2 Assets (`/images/v2/...`) oder Artifact-Bilder (`/images/artifacts/...`) existieren ggf. nicht im `public/` Ordner, oder Next.js Image Optimization ist im Static Export kaputt.
**Lösung:** Prüfe ob Dateien existieren. `unoptimized` ist schon auf den Images gesetzt (gut für Static Export). Aber `next.config.ts` mit `output: 'export'` + `images: { unoptimized: true }` prüfen.
**Dateien:** `next.config.ts`, `public/images/` Verzeichnis checken

---

## Implementierungsplan

### Phase A: Quick Fixes (30 min)
1. **Grid skalieren** (`globals.css`): `--grid-size: 240px` für Desktop
2. **Horizontal Scrollbar** fixen (`globals.css` + `page.tsx`)
3. **Broken Images** diagnostic (`next.config.ts` + `public/` check)

### Phase B: Safari Performance (45 min)
4. **InterfaceGrid.tsx rewrite**: SVG-Pattern → CSS Data-URI Background oder Canvas (absolute, nicht fixed)
5. **Testen** in Safari Desktop

### Phase C: Deep Grid Alignment (60 min)
6. **Tiefere Grid-Snaps** in allen Sections: innere Gaps, Margins, Paddings auf Grid-Utilities umstellen
7. **HeroSection** speziell: Floating Images auf Grid-Zellen ausrichten
8. **ArtifactsSection**: Card-Layout auf Grid ausrichten
9. **Manifesto/Protocol/Process**: interne `gap-8` → `gap-grid-*`

### Phase D: Build & Deploy (15 min)
10. `TURBOPACK=0 npm run build`
11. Commit + Push
12. Live-URL teilen

---

## Offene Entscheidungen (brauchen dein Go)

| Frage | Option A | Option B |
|---|---|---|
| **Grid-Größe** | 240px überall (auch Mobile = riesig) | 240px Desktop / 120px Mobile responsive |
| **Safari Fix** | CSS Data-URI Background (schnell, performant) | Canvas absolute (exakt wie jetzt, aber mitscrollend) |
| **Deep Alignment** | Alles auf Grid snappen (mehr Arbeit, sauberer Look) | Nur Top-Level (aktueller Stand) |

---

## Risiken

- **240px Grid** auf Mobile wird extrem groß — Content könnte zu weit auseinandergezogen werden
- **CSS Data-URI** für Grid verliert die dynamische 10px-Gap an Kreuzungen (CSS kann das schlecht)
- **Safari Lag** könnte auch durch Lenis verursacht werden, nicht nur Grid

---

## Dateien die geändert werden

| Datei | Änderung |
|---|---|
| `src/app/globals.css` | `--grid-size`, Overflow-Fix, ggf. Grid-Background |
| `src/components/InterfaceGrid.tsx` | Safari-Performance Rewrite |
| `src/app/page.tsx` | Overflow-Fix |
| `next.config.ts` | Images unoptimized check |
| `src/sections/HeroSection.tsx` | Deep Grid-Snap |
| `src/sections/ArtifactsSection.tsx` | Deep Grid-Snap |
| `src/sections/ManifestoSection.tsx` | Deep Grid-Snap |
| `src/sections/ProtocolSection.tsx` | Deep Grid-Snap |
| `src/sections/ProcessSection.tsx` | Deep Grid-Snap |
| `src/sections/V2GallerySection.tsx` | Deep Grid-Snap |
| `src/sections/TransmitSection.tsx` | Deep Grid-Snap |
| `src/sections/CreatorBiosSection.tsx` | Deep Grid-Snap |
| `src/sections/Footer.tsx` | Deep Grid-Snap + Marquee-Fix |
