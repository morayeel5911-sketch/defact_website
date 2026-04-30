# DEFACT Design Research Report: Visual & Technical References

## Mood DNA
**Clinical Archive.** A cooled concrete gallery at 10 AM. Materiality of anodized aluminum and raw stone. Tension between rigid grids and asymmetric breaks. High-contrast typography acting as the primary structural element. Movement that feels weighted and physical, eschewing digital "bounce" for mechanical inertia.

---

## 1. Exemplary Digital Galleries & Ateliers

### David Zwirner
- **URL**: [davidzwirner.com](https://www.davidzwirner.com)
- **Palette**: `#FFFFFF` (Pure), `#000000` (Signal), `#F5F5F5` (Void)
- **Typography**: High-contrast Sans-Serif for navigation, Serif for exhibition titles. Strong hierarchy.
- **Composition**: Strict vertical scrolling with large-scale image blocks. Hybrid grid (full-bleed images mixed with tight text alignments).
- **Signature Element**: The "Exhibition-First" approach where the imagery dictates the page length and flow.

### Herzog & de Meuron
- **URL**: [herzogdemeuron.com](https://www.herzogdemeuron.com)
- **Palette**: `#000000` (Deep Black), `#FFFFFF` (White), `#CCCCCC` (Concrete Grey)
- **Typography**: Industrial, utilitarian sans-serif. Heavy use of indices (`[01]`, `[02]`).
- **Composition**: Brutalist, asymmetric. Project lists act as a database/index rather than a marketing gallery.
- **Signature Element**: The "Index System"—treating projects as archival entries rather than "portfolio pieces".

### Aesop (Digital Experience)
- **URL**: [aesop.com](https://www.aesop.com)
- **Palette**: Muted mineral tones, `#EAE7E2` (Warm stone), `#333333` (Steel)
- **Typography**: Classic Serif (editorial) paired with a restrained Sans-Serif.
- **Composition**: Highly structured, almost pharmaceutical grid. Generous whitespace and margins.
- **Signature Element**: "The Archive Layout"—pages feel like a curated catalog of artifacts rather than an e-commerce store.

### Byredo
- **URL**: [byredo.com](https://www.byredo.com)
- **Palette**: `#FAFAFA` (Off-white), `#111111` (Ink)
- **Typography**: Extreme contrast between bold headlines and tiny, precise metadata.
- **Composition**: Centered product focal points surrounded by vast "dead space" (whitespace).
- **Signature Element**: "Sartorial Precision"—the way text is aligned to the extreme edges of the viewport.

### COS Studios
- **URL**: [cosstores.com](https://www.cosstores.com)
- **Palette**: `#FFFFFF`, `#F2F2F2` (Light grey), `#000000`
- **Typography**: Geometric, architectural sans-serif.
- **Composition**: Low-contrast, tonal backgrounds with stark, sharp-edged imagery.
- **Signature Element**: "Architectural Framing"—using thin 1px borders to create "rooms" within the page.

---

## 2. Technical R3F/Three.js References

### The "Chrome Monolith" (Archetype)
- **Aesthetic**: High-specular chrome objects on `#FAFAFA` background.
- **Technical approach**: `MeshStandardMaterial` with `metalness: 1.0` and `roughness: 0.1`. Use of a high-quality `.hdr` environment map for clinical reflections.
- **Interaction**: Scroll-driven orbital rotation. Camera moves on a fixed radius, simulating a sculpture plinth.

### The "Infinite White Void" (Archive)
- **Aesthetic**: 3D artifacts floating in a boundless, light-grey space.
- **Technical approach**: `Canvas` as full-bleed background. Implementation of `ContactShadows` for grounded realism without heavy baking. 
- **Interaction**: Smooth-damped (Lerp) camera transitions between "artifacts" triggered by text-grid navigation.

### The "Material Study" (Technical Showcase)
- **Aesthetic**: Extreme close-ups of textures (anodized aluminum, brushed steel).
- **Technical approach**: High-resolution normal maps and roughness maps. Integration of a CSS-based noise overlay (`mix-blend-mode: soft-light`) to break digital sterility.
- **Interaction**: Mouse-follow parallax (subtle, $\leq 30\text{px}$) to create a sense of physical depth.

---

## 3. Anti-Patterns (To Avoid)

| Pattern | Why it fails DEFACT | DEFACT Alternative |
| :--- | :--- | :--- |
| **Rounded Corners** | Feels like a consumer app/SaaS. | Sharp $2\text{px}$ or $0\text{px}$ corners. |
| **Gradient Backgrounds** | Too "digital" and ephemeral. | Solid materials (Stone, Linen, Aluminum). |
| **Bouncy Springs** | Feels like a mobile game or generic UI. | Heavy inertia and linear/ease-out fades. |
| **Centered Hero Copy** | Generic marketing "transformation" speak. | Asymmetric, declarative, technical labels. |
| **Floating Action Buttons** | Clutters the visual "silence" of the gallery. | Hidden, index-based navigation. |
| **Soft Shadows** | Lowers the "precision" and "sharpness". | $1\text{px}$ borders or hard, computed shadows. |
