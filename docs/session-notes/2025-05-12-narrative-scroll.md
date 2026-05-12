# Session: Narrative-Scroll-Animations

**Datum:** 2025-05-11 / 2025-05-12 (Nachtsession)
**Branch:** `feature/narrative-scroll` → **merged to `main`**
**Umfang:** +1246 −130 Lines, 15 Dateien geändert

---

## ✅ Was wurde in dieser Session gebaut

### Phase 1: Foundation
- Footer `data-theme="dark"` fix → Footer-Label sichtbar
- Global ScrollTrigger config mit sauberem cleanup
- Hero-Bild: `yPercent: 15` parallax drift beim Scroll
- `will-change: transform` für GPU-Acceleration

### Phase 2: ScrollAnimation Hook (reusable)
- `src/hooks/useScrollAnimation.ts` — GSAP ScrollTrigger helper
- Unterstützt: `data-reveal`, `data-scale-reveal`, `staggerChildren`
- Auto-Kill bei unmount (gsap.context cleanup)
- `prefers-reduced-motion: reduce` → keine Animationen

### Phase 3-4: Section Transitions
- **Sticky Label**: `transform: translateY(-100%)` → springt auf 0% bei Enter
- **Line-Draw**: CSS pseudo-element `::after`, `scaleX` 0→1,
- **SectionNav**: `[01]` → `[02]` animierter Counter via GSAP tween
- **SectionBorder**: Fade-in am Section-Übergang

### Phase 5: Alle 9 Sections
| Section | Animationen |
|---------|-------------|
| Hero | Parallax + FadeInUp |
| Manifesto | Stagger-Reveal (Text-Blöcke 0.1s Abstand) |
| Artifacts | Scale-Reveal (0.92→1.0) + FadeInUp |
| Protocol | Stagger-Reveal |
| Process | FadeInUp |
| Transmit | FadeInUp |
| Gallery | Scale-Reveal (Cards) |
| CreatorBios | FadeInUp |
| Footer | FadeIn bei Enter |

### Phase 6: Polish
- `prefers-reduced-motion: reduce` = alle Animationen deaktiviert
- Mobile: Lenis touch-native, keine Lenis-touch
- Sauberes `gsap.context()` Cleanup bei allen Komponenten

---

## 📊 Tech-Stack & Setup

| Dependency | Version | Zweck |
|------------|---------|-------|
| next | 16.x | Framework |
| react-three/fiber | ^9.0.0 | 3D WebGL |
| react-three/drei | ^9.122.0 | R3F helpers |
| gsap | ^3.12.7 | Scroll animations |
| lenis | ^1.3.0 | Smooth scroll |
| tailwindcss | ^4.1.6 | Styling |

- Build: `TURBOPACK=0 npx next build`
- Static Export: `output: 'export'`, `basePath: '/defact_website'`
- Deploy: GitHub Actions → `gh-pages` branch → GitHub Pages

---

## 🗂️ Wichtige Dateien

- `AGENTS.md` — Projekt-Kontext (immer lesen!)
- `src/hooks/useScrollAnimation.ts` — ScrollTrigger helper
- `src/app/section-renderer.tsx` — Section switcher + GSAP context
- `src/app/sections/section-nav.client.tsx` — Sticky nav + Counter
- `src/app/sections/[section]/index.tsx` — Alle Sections mit GSAP
- `src/app/layout.tsx` — Lenis init, ThemeProvider
- `next.config.ts` — Static export config
- `.github/workflows/deploy.yml` — GitHub Pages deploy pipeline

---

## 🧪 Test-Workflow

### Local:
1. `cd /Volumes/T7/Vault_T7/00-Projects/defact-3d`
2. `TURBOPACK=0 npx next dev` (Port 3002)
3. Prüfen: `basePath` auskommentiert für local

### Build-Check:
1. `TURBOPACK=0 npx next build`
2. `npx serve out/

### Deploy:
1. Feature-Branch erstellen: `git checkout -b feature/xyz`
2. Änderungen committen
3. Push → GitHub Actions läuft
4. GH-Pages Deploy von Branch → testen
5. PR → `main` mergen wenn OK

---

## 🔄 Next Steps / Offene Punkte

1. **Video Background** — Das `bg-video.mp4` in der Hero Section rendert in Static Export nicht. Entweder:
   - Public-URL (Cloudflare R2 / AWS S3)
   - Oder: Das Video als Base64 in HTML einbetten
   - Oder: Fallback-Bild statt Video für static export

2. **Scroll-Ausweich-Animation am Footer** — Die `scroll-snap` Logik könnte noch optimiert werden

3. **Performance Audit** — Für Mobile: `will-change` nur wenn nötig

4. **Weitere Sections?** — Aktuell 9 Sections, weitere Erweiterungen möglich

---

## 📋 Letzte Session-Datei (falls gesucht)

Vorherige Sessions:
- `2025-05-08-adaptive-grid.md` — Adaptive Grid System
- `2025-04-27-session-note.md` — Erste Session, Projekt-Setup

