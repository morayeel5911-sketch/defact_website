# DEFACT 3D — Visionary Upgrade Log
> Projekt: `/Volumes/T7/Vault_T7/00-Projects/defact-3d`
> Stack: Next.js 16 + R3F v9 + Tailwind v4 + GSAP
> Design System: "Clinical Archive / The Vault"
> Palette: --void #F0F0F0, --signal #0D0D0D
> Fonts: Clash Grotesk, DM Mono, Inter

---

## 2026-05-04: Start Visionary Upgrade (Variante 3)

### OpenCode Session
- Session: Feature 1 COMPLETED via `opencode run`
- Model: glm-5.1 Ollama Cloud
- Result: **SUCCESS** — Build compiled clean
- **OpenCode Config optimized:** 2 Custom Agents (defact-coder, defact-oracle), Project Skill, Wiki-Integration
- **Config fixes applied:** skills=Object (not Array), no top-level provider key, agents enabled

### OpenCode Setup Dokumentation
- **Wiki:** `/Volumes/T7/Vault_T7/wiki/notes/opencode-setup.md` (vollständige Doku)
- **Config:** `~/.config/opencode/opencode.json`
- **Project Skill:** `/Users/4ngl/.agents/skills/defact-project/SKILL.md`
- **Aliases:** `defact` (cd to project), `oc` (opencode shorthand) → `~/.zshrc`

### Feature 1: Lenis Smooth Scroll — ✅ COMPLETED
**Files changed:**
| File | Change |
|------|--------|
| `src/lib/lenis.ts` | Added `gsap.registerPlugin(ScrollTrigger)` for safety |
| `src/components/ClientWrapper.tsx` | Added `destroyLenis` import + cleanup in `useEffect` return |

**Was schon da:**
- `initLenis()`, `getLenis()`, `destroyLenis()` existierten
- Lenis ↔ ScrollTrigger sync existierte
- GSAP ticker driving Lenis RAF existierte

**Was gefixt wurde:**
1. ScrollTrigger Plugin-Registration jetzt garantiert in `lenis.ts`
2. Cleanup on unmount — kein Memory Leak bei remounts

**Build:** ✅ SUCCESS (5.2s compile, 261ms static pages, keine Errors)

---

### Feature 2: Magnetic Buttons — ✅ COMPLETED (OpenCode defact-coder)
**Agent:** `defact-coder` (deepseek-v4-pro)
**Files created:**
| File | Beschreibung |
|------|-------------|
| `src/components/MagneticButton.tsx` | Reusable magnetic button mit GSAP, 15px max displacement, elastic return, cleanup on unmount |

**Build:** ✅ SUCCESS (5.4s compile, keine Errors)
**Qualität:** Nutzt gleiches Pattern wie MagneticLink.tsx (handleMove/handleLeave), konsistent mit Projekt-Codebase.

---

### Feature 3: Ambient Sound — ✅ COMPLETED (OpenCode defact-coder + Manual Fix)
**Agent:** `defact-coder` (deepseek-v4-pro)
**Files created/modified:**
| File | Beschreibung |
|------|-------------|
| `src/components/AmbientSound.tsx` | Tone.js AMSynth "breathing" drone, -20dB, opt-in button, homepage-only |
| `src/components/ClientWrapper.tsx` | AmbientSound importiert und gerendert |
| `package.json` | `tone` dependency hinzugefügt |

**OpenCode Ergebnis:** Code generiert, aber Build failed mit TS Error.
**Manueller Fix:** `synthRef`/`ToneRef` Typ von `ReturnType<typeof ...>` auf `any` geändert (dynamic import TypeScript-Limitation).
**Build nach Fix:** ✅ SUCCESS

---

### Feature 4: Build + Deploy — ✅ COMPLETED
**Build:** TURBOPACK=0 npm run build — ✅ SUCCESS
**Output:** `out/` directory (43MB)
**Server:** `python3 -m http.server 3002` läuft auf localhost:3002
**Pitch-Deck:** `http://127.0.0.1:8765/pitch-visionary.html` (6 Slides, Keyboard-Nav)
**Preview:** `http://localhost:3002` — Live, mit Ambient Sound Button sichtbar
**Cloudflare Tunnel:** ✅ `https://skill-adding-senator-release.trycloudflare.com` (teilsam!)

### Gesamtergebnis Visionary Upgrade

| Feature | Status | Agent | Methode |
|---------|--------|-------|---------|
| Lenis Smooth Scroll | ✅ DONE | OpenCode `glm-5.1` | `opencode run` |
| Magnetic Nav Links | ✅ DONE | Hermes (Einz) | `patch` + `write_file` |
| Magnetic Buttons | ✅ DONE | OpenCode `defact-coder` | `opencode run --agent defact-coder` |
| Ambient Sound | ✅ DONE | OpenCode `defact-coder` + Fix | `opencode run` + manueller TS Fix |
| Build + Deploy | ✅ DONE | OpenCode `defact-coder` + Hermes | `opencode run` + `terminal` |

### Dateien geändert/erstellt
| File | Aktion |
|------|--------|
| `src/lib/lenis.ts` | `gsap.registerPlugin(ScrollTrigger)` hinzugefügt |
| `src/components/ClientWrapper.tsx` | `destroyLenis` cleanup + `AmbientSound` import |
| `src/components/MagneticLink.tsx` | ✅ NEU — Magnetic hover wrapper für Navigation |
| `src/components/MagneticButton.tsx` | ✅ NEU — Reusable magnetic button (OpenCode) |
| `src/components/AmbientSound.tsx` | ✅ NEU — Tone.js ambient drone, opt-in (OpenCode) |
| `src/components/Navigation.tsx` | `<a>` → `<MagneticLink>` für Desktop-Nav |
| `package.json` | `tone` dependency |

### New: OpenCode Setup v1.0
- **Config:** `~/.config/opencode/opencode.json` (2 Custom Agents, 7 Skills)
- **Agents:** `defact-coder` (Implementation), `defact-oracle` (Review)
- **Project Skill:** `/Users/4ngl/.agents/skills/defact-project/SKILL.md`
- **Wiki:** `/Volumes/T7/Vault_T7/wiki/notes/opencode-setup.md`

---

## Ende Log
**Why:** Awwards-Level. Magnetic interactions, smooth scroll, ambient sound, 3D depth. Die Website wird zu einem Erlebnis statt einer Präsentation.

### Parallel-Setup
- [x] OpenCode TUI gestartet (`proc_e15484086b94`)
- [x] Lenis bereits installiert (für smooth scroll)
- [x] CustomCursor existiert bereits
- [x] `public/images/flux/hero_00001_.png` (FLUX Hero) vorhanden

### Steps to implement:
1. **Lenis Smooth Scroll Integration** — `src/lib/lenis.ts` + `ClientWrapper.tsx` ← CURRENTLY IN PROGRESS via OpenCode
2. **Magnetic Buttons** — Web Component oder GSAP-basiert
3. **Magnetic Navigation** — Marquee-Style oder Magnetic-Links
4. **Ambient Sound Layer** — Tone.js oder Web Audio API (opt-in)
5. **Performance Audit** — Lighthouse nach jedem Step
6. **Build + Deploy** — Static export, Cloudflare Tunnel

### Key Constraints
- `TURBOPACK=0` muss gesetzt sein
- Nur EIN Canvas pro Seite (R3F)
- Draco Path gesetzt
- Kein EffectComposer (PostProcessing)
- Keine mixBlendMode (sichtbare Bilder auf dunklem Hintergrund)

---

### Dokumentation-Regel
Nach jedem implementierten Feature wird hier ein Eintrag gemacht:
- Was wurde gemacht?
- Welche Dateien wurden geändert?
- Performance-Impact?
- Blockers?

---

## 2026-05-12 — Technical Cleanup Pass (codex/defact-technical-cleanup-pitch)
- Added shared basePath-aware public asset helper and applied it to Hero artifact images, `src/data/products.ts`, and `src/sections/V2GallerySection.tsx` to prevent root-relative static-export breaks.
- Replaced Hero `SHOP/` anchor from `#shop` to `https://defact.world` with external-safe attributes.
- Repaired `eslint.config.mjs` ignores for AppleDouble files, build/output folders, `public/draco`, `.hermes`, dashboard/pitch HTML artifacts, and prototype folder.
- Fixed critical React/lint issues: duplicate hook block in `CreatorBiosSection`, removed unused dynamic imports in `page.tsx`, resolved `ScrollEffects` marquee scope issue, typed `AmbientSound` dynamic Tone import, ticker/listener cleanup in `LenisProvider`, and R3F safety updates in `Scene`/`ProductModel` (including Draco path before GLTF load).
- Removed invalid metadata link object emission and migrated font loading to `next/font` for DM Mono, Inter, Playfair Display; added explicit Fontshare stylesheet link for Clash Grotesk in `layout.tsx`.
- Added pitch file: `pitch/defact-visual-direction-cleanup.html` with options A/B/C (benefit/risk/effort + DEFACT tokens).

### Validation
- `npx tsc --noEmit`: ✅ pass
- `npm run lint`: ✅ pass, no warnings
- `TURBOPACK=0 npm run build`: ✅ pass after network approval for Google Fonts
- Static export path checks: ✅ no invalid metadata link meta, no root-relative public asset `src`, `/defact_website/images/` present

### Visual Decision
- User selected Option B on 2026-05-12: Royal Blue Digital Decay refinement.
- Implementation lock: preserve the current royal-blue base, use blue as a controlled signal field, keep grain/scanline atmosphere and GSAP stagger hierarchy, and avoid drifting back to full Clinical Archive reset or Chrome Archive hybrid without a new pitch approval.
