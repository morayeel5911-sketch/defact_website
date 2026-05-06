# DEFACT Audit Phase 2 — Plan (Oracle P1-P4 Fixes)

> Generiert: 2026-05-06
> Basierend auf: Oracle Audit 341 Zeilen, Commit 436cffe (P0 fixes applied)

---

## Phase 2.1 — P1: Dead Code Entfernung (Coder)

### Zu löschende Files:
1. `src/sections/ObjectsSection.tsx` — replaced by ArtifactsSection, veraltete Preise (€2.4k-€4.1k)
2. `src/sections/WorksSection.tsx` — broken video refs, inline product data redundant
3. `src/sections/FooterSection.tsx` — redundant, aktiver Footer.tsx existiert

### Zu recyceln:
4. `src/sections/DuoSection.tsx` — NICHT löschen, Content extrahieren für CreatorBiosSection

---

## Phase 2.2 — P1: Product Data Centralisierung (Coder)

### Ziel: `src/data/products.ts`
Single source of truth für alle Produkte — ArtifactsSection importiert statt inline data.

```ts
export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  status: "ACTIVE" | "COMING_SOON" | "SOLD_OUT";
  image: string;
  images?: string[];     // für Gallery
  specs: {
    material: string;
    weight: string;
    edition: string;
  };
  category?: string;
}

export const products: Product[] = [
  {
    id: "01.01",
    name: "STARMIRROR",
    tagline: "REFLECT. PROTECT. STRIKE.",
    description: "A FOUR-POINTED PRECISION THROWING STAR...",
    price: "€240",
    status: "ACTIVE",
    image: "/images/artifacts/starmirror_1.webp",
    images: ["/images/artifacts/starmirror_1.webp", ...],
    specs: { material: "PLA + Gloss Paint", weight: "120g", edition: "∞" },
    category: "MERCHANDISE",
  },
  // ... 01.02, 01.03
];
```

### Anpassungen:
- `ArtifactsSection.tsx` — inline `artifacts[]` → `import { products } from "@/data/products"`
- `AcquisitionSection.tsx` — "50 editions / 12 minted" → aus products ableiten oder als placeholder markieren

---

## Phase 2.3 — P4: CreatorBiosSection (Coder)

### Design System konform:
- Keine Video-Backgrounds (hatte DuoSection, sind broken)
- Light section (data-theme="light") — wie Manifesto
- Klare Portrait-Platzhalter + Studio-Info

### Content (aus DuoSection):
| Name | Role | Bio |
|------|------|-----|
| LYAHUASCA | ART DIRECTION / PRODUCT DEVELOPMENT / 3D VISUALS | ... |
| MIKI.NGLO | 3D PRINTING / GRAPHIC DESIGN / WEB DEVELOPMENT | ... |

### Layout:
- Asymmetrisch (wie HeroSection)
- Gradient-Platzhalter statt Video
- DM Mono für Labels, Clash Grotesk für Namen

---

## Phase 2.4 — P2: Lenis Provider (Coder)

### Ziel: `src/providers/LenisProvider.tsx`
React Context statt Module-Singleton. HMR-safe.

```tsx
// LenisProvider.tsx
const LenisContext = createContext<Lenis | null>(null);

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  useEffect(() => {
    const l = new Lenis({ lerp: 0.08, smoothWheel: true, ... });
    setLenis(l);
    function raf(time: number) { l.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => { l.destroy(); setLenis(null); };
  }, []);
  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
```

### Migration:
1. `src/lib/lenis.ts` — markieren als deprecated oder löschen
2. `src/components/ClientWrapper.tsx` — LenisProvider um children wrappen
3. `ScrollEffects.tsx` — Lenis-Integration via Context statt global

---

## Execution Order

1. **P1-Delete** (5min) — Orphaned files löschen, .gitignore aktualisieren
2. **P1-Products** (30min) — `src/data/products.ts` erstellen, ArtifactsSection refactoren
3. **P4-Team** (2h) — CreatorBiosSection erstellen, in page.tsx importieren
4. **P2-Lenis** (1h) — LenisProvider erstellen, ClientWrapper migrieren
5. **Build + Commit** (15min) — `next build` testen, commit

---

## Risiken / Abhängigkeiten

- **Bilder**: CreatorBiosSection braucht Portrait-Photos oder Platzhalter — wir nutzen CSS-Gradients + Text-Mask wie DuoSection
- **page.tsx Navigation**: `currentTheme` IntersectionObserver bleibt erstmal — SectionContext wäre P3
- **AcquisitionSection**: Preis-Discrepanz (€240 vs €2,400 alt) — Oracle empfahl "reconcile", wir nutzen ArtifactsSection-Preise als canonical

## Subagent-Aufteilung

| Task | Agent | Time |
|------|-------|------|
| P1-Delete + P1-Products | Coder | 35min |
| P4-Team + P2-Lenis | Coder | 3h |
| Code Review aller Änderungen | Oracle | 30min |
| Build Test + Commit | Einz | 15min |
