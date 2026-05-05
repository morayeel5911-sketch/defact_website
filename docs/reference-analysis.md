# DEFACT Referenz-Analyse: Awwards-Level Sites

## Zusammenfassung der analysierten Referenzen

### 1. sutera.ch — "Reality By Design"
**Was macht es awwards-level:**
- Asymmetrisches scattered layout — Elemente floaten frei, nicht in rigid grids
- 3D organisches Objekt (mossy rock + flower) als Hero-Fokus mit Annotation-Linien
- Monospace Daten-Ästhetik — `[SYSTEM: ONLINE]`, `LAT: 50.9375° N`, technische Readouts
- Floating annotation boxes — Etymologie-Box, Status-Indikatoren
- Thin 1px Linien verbinden Text zu 3D-Objekten
- Light/weiß-dominant statt dark-mode

**Für DEFACT adaptierbar:**
- Floating status boxes mit Koordinaten
- SVG annotation lines zwischen Text und 3D
- Etymologie-Box für "DE + FACT"

---

### 2. occupied.unadsgn.tw — "Occupied Jewelry"
**Was macht es awwards-level:**
- Dark ritual luxury aesthetic — Schwarz, Rot, Gold
- Event timeline mit datierten Ritual-Events
- Membership/Exklusivitäts-Aesthetic
- Video-Hero mit Overlay-Navigation
- "NOT A STUDIO — JUST ME" personal touch

**Für DEFACT adaptierbar:**
- Event timeline für Pop-up Events/Exhibitions
- Ritual-Sprache ("The Thorned Gathering", "Ceremony of Fractures")
- Video-Hero mit minimal UI overlay

---

### 3. emilieaubry.com — "Director Portfolio"
**Was macht es awwards-level:**
- Full-bleed editorial imagery — Riesiges Foto als Hintergrund
- Minimal UI frame — Nur Nav + Project Index, nichts blockiert das Bild
- Numbered project index (01, 02, 03, 04) am unteren Rand
- Serif/Sans pairing — Playfair Display für Brand, Helvetica für Nav
- Hover-to-change — Project index wechselt das Hero-Bild

**Für DEFACT adaptierbar:**
- Numbered artifact index (01.01, 01.02...) als Bottom-Bar
- Full-bleed Hero-Image statt Grid
- Serif für Brand + Sans für UI

---

### 4. utopiatokyo.com — "Cyberpunk Masks"
**Was macht es awwards-level:**
- **Experience Warning Dialog** — "[ENABLE GLITCH EFFECT]" vs "[USE SAFE MODE]"
- Glitch typography auf Headlines — Buchstaben verschieben sich
- Cyberpunk UI — `>_EXECUTE_CREATION`, Daten-Readouts
- Mask builder interaktiv — Attribute (Strength, Agility, Vitality)
- Japanische Typografie als Design-Element
- `35.6762°N / 139.6503°E JAPAN` Koordinaten

**Für DEFACT adaptierbar:**
- Experience Warning als Brand-Moment
- Glitch auf DEFACT Logo
- Koordinaten `50.9375°N / 6.9603°E COLOGNE`
- Attribute für Artifacts (Rarity, Material, Edition Size)

---

## Gemeinsame awwards-Patterns

| Pattern | Sutera | Occupied | Emilie | Utopia | DEFACT Status |
|---------|--------|----------|--------|--------|---------------|
| Full-bleed Hero | ❌ | ✅ Video | ✅ Foto | ❌ | ❌ (hat R3F) |
| Asymmetric Layout | ✅ | ✅ | ✅ | ✅ | ✅ Implementiert |
| Monospace Daten | ✅ | ✅ | ❌ | ✅ | ✅ Implementiert |
| Scroll Progress | ❌ | ❌ | ❌ | ❌ | ✅ Implementiert |
| Custom Cursor | ❌ | ❌ | ❌ | ❌ | ✅ Implementiert |
| Preloader | ❌ | ❌ | ❌ | ❌ | ✅ Implementiert |
| Marquee | ❌ | ❌ | ❌ | ✅ | ✅ Implementiert |
| Section Nav Dots | ❌ | ❌ | ❌ | ❌ | ✅ Implementiert |
| Numbered Index | ❌ | ❌ | ✅ | ❌ | ❌ (TODO) |
| Experience Warning | ❌ | ❌ | ❌ | ✅ | ❌ (TODO) |
| Glitch Typography | ❌ | ❌ | ❌ | ✅ | ✅ (auf Logo) |

## Nächste Schritte

1. **Numbered Artifact Index** (wie Emilie Aubry) — Bottom-Bar mit 01.01, 01.02...
2. **Experience Warning** (wie Utopia Tokyo) — Dialog mit [ENABLE GLITCH] vs [SAFE MODE]
3. **Video Hero** — Full-bleed Video von defact.world als Hero-Hintergrund
4. **Attribute Cards** — Für jedes Artifact: Rarity, Material, Edition Size (wie Utopia Mask Builder)
