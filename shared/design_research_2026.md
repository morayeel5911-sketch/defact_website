# DEFACT 3D Design Research Report — 2025-2026
## Luxury, Art & Design-Brand WebGL Experiences + Claude AI Design Capabilities

**Date:** 2026-04-30  
**Scope:** Award-winning 3D websites using React Three Fiber / Three.js / WebGL, plus Claude AI's emerging visual design capabilities for frontend production.  
**Confidence:** High — sources include Awwwards SOTD listings, agency case studies, Codrops technical deep-dives, Anthropic official docs, and 2026 tool reviews.

---

## 1. Executive Summary

Three themes dominate the 2025-2026 landscape of award-winning luxury and design-brand 3D websites:

1. **Scroll-driven cinematography** — The camera is no longer static; scroll position drives camera paths through 3D environments, with GSAP ScrollTrigger + Lenis as the dominant pairing over Lenis for smooth scroll dampening. This technique is now standard at studios like Immersive Garden, Colla Studio, and Basement Studio.

2. **Bas-relief / material realism** — Chrome, brushed gold, frosted glass, and procedurally generated clouds are rendered via custom shaders. The move to **KTX2 / Basis Universal** GPU-compressed textures and **Draco compression** for GLTF is now baseline for production performance.

3. **Modular component architecture for campaigns** — Valentino's 2025 product launch (built by Colla Studio) and Cartier's Watches & Wonders series (Immersive Garden) use modular Three.js scene components that can be rearranged per product, enabling rapid deployment across SKUs without rebuilding from scratch.

On the AI side, **Claude Design** (launched April 17, 2026) represents a leap from text-only assistance to an actual visual prototyping surface powered by Claude Opus 4.7. It does not generate static images (still the domain of Midjourney/Leonardo), but it produces **interactive, editable prototypes with real code** — including 3D, shaders, and voice/video. Its killer feature is reading an existing codebase or Figma file and auto-applying a brand's design system to every new output.

For DEFACT, the most actionable takeaways are: (1) adopt scroll-driven camera paths as the primary navigation mechanic, (2) design a modular Three.js component system that recombines per product/campaign, and (3) use Claude Design to generate first-pass prototypes from brand assets, then hand off to Claude Code for production implementation.

---

## 2. Reference Sites (Table)

| # | Site / URL | Agency | Tech Stack | Visually Distinctive | DEFACT-Applicable Technique |
|:-:|---|---|---|---|---|
| 1 | **Cartier Watches & Wonders 2025** — `awwwards.com/sites/cartier-watches-wonders-2025` | Immersive Garden (Paris) | Three.js, Blender, GSAP, Lenis, Sass, Web Audio API | Six immersive 3D "alcoves," each inspired by a Cartier timepiece. Hidden gestures reward curiosity. Atmospheric textures + evolving compositions. | **Alcove/section transitions:** Design each DEFACT product launch as a self-contained 3D world with unique lighting/materiality that transitions seamlessly via scroll. |
| 2 | **Valentino Paris: A Night's Tale** — `paris-a-nights-tale-experience.valentino.com` | Valentino / Internal | Three.js, WebGL, custom shaders | Night-time Parisian atmosphere; scroll-driven narrative through cinematic streets and product reveals. | **Atmospheric lighting:** Use HDR environment maps + real-time point lights to create a "scene" rather than a "page." Pre-bake ambient occlusion where possible. |
| 3 | **Valentino Product Launch Landing Pages** (2025) — `collastudio.com/work/valentino-product-launch` | Colla Studio | Three.js (scroll-telling), modular component architecture | Highly modular landing pages: each product gets its own 3D model, gallery, virtual try-on, and CTAs. Reusable component blocks. | **Modular 3D component system:** Build a "kit of parts" (hero 3D scene, product gallery, AR viewer, CTA strip) that composes per-campaign without code changes. |
| 4 | **Louis Vuitton VIA** — `immersive-g.com/projects/louis-vuitton-1` | Immersive Garden | Three.js, WebGL, glitch transitions, dynamic effects | Virtual LV trunk in a 3D experiential space. Glitch transitions capture LV's "dreams and travel" theme. Photorealistic visuals with artistic 3D animation. | **Glitch/web3 transitions:** Use post-processing shaders (chromatic aberration, RGB shift) as brand-specific transition signatures between product states. |
| 5 | **Gucci Beauty Wishes** — `thebrandingdesign.com/project/gucci-beauty-wishes` | MONOGRID | Three.js, Vue.js (UI), WebGL | Products "bloom" like flowers in an interactive garden. Gamified gift guide section. Responsive across app, iPad, and web. | **Product-as-natural-element:** Models do not sit on shelves; they grow, bloom, or float. Treat the 3D product as an organic entity with its own animation identity. |
| 6 | **Cartier Love Is All** — `immersive-g.com/projects/cartier-love-is-all` | Immersive Garden | Three.js, GSAP | Vertical scrolling through dynamic scenes. Seamless blend of storytelling + e-commerce integration. | **Story-commerce fusion:** Build narrative 3D scenes that resolve into specific product SKUs with a single scroll/click, never breaking immersion. |
| 7 | **Cartier Love Experience** — `bonjour.paris/works/love-experience` | Decimal + Bureau Bonjour + Bonjour Paris | WebGL / Three.js | Mini-site exploring LOVE bracelet variations (sizes, metals, diamond settings) in a smooth, intuitive way. 3D still lifes enhance visual impact. | **Product variation explorer:** Allow users to cycle through materials/finishes in real-time on a single 3D model with instant reactivity. |
| 8 | **Cartier End of Year 23 — Above the Clouds** — `immersive-g.com/projects/cartier-end-of-year-23` | Immersive Garden | Three.js, procedural cloud generation | Procedurally generated clouds + dynamic product exploration. Instant loading despite heavy 3D. | **Procedural generation:** Use shader-generated clouds/nebulae/atmosphere rather than baked textures to reduce asset size and increase runtime dynamism. |
| 9 | **Cartier Watches & Wonders 24** — `immersive-g.com/projects/cartier-watches-and-wonders-24` | Immersive Garden | Three.js, GSAP, Lenis, custom scroll | Each watch presented in a unique environment: horizon, water, mirror effects. Clickable hotspots for product details. | **Environment-as-metaphor:** Match the 3D scene's environment to the product's story. A watch inspired by water gets a water scene; a watch inspired by aviation gets sky. |
| 10 | **Immersive Garden own site (2025)** — `awwwards.com/sites/immersive-garden-website` | Immersive Garden | Three.js, Blender, Houdini, ZBrush, GSAP, Lenis, KTX2 compression | Bas-relief 3D design with tactile, artistic depth. Rapid scroll feature. Menu transitions as 3D morphs. Minimalist color palette (2 colors). | **Bas-relief / low-relief 3D:** Do not model everything in full 3D. Use displaced planes and normal maps to fake depth — dramatically lowers GPU load while maintaining luxury feel. |
| 11 | **Dioriviera** — `awwwards.com/sites/dioriviera` | Immersive Garden | Three.js, GSAP, WebGL | Interactive exploration of Dioriviera capsule collection. 3D product renders with mouse-reactive interaction. | **Mouse-reactive inspection:** Allow micro-orbits around products on hover/tilt — gives the user agency without requiring click-to-orbit. |
| 12 | **Longines Spirit Flyback** — `awwwards.com/longines-spirit-flyback-by-immersive-garden` | Immersive Garden | Three.js, GSAP, custom scroll | Antarctic 3D landscapes with Byrd's plane soaring overhead. Real-time directional changes tied to the flyback watch feature. | **Narrative geography:** If the product has a heritage story (aviation, exploration, ocean), build a 3D geography of that story and let the user scroll through it. |
| 13 | **SKIT Studio** — `awwwards.com/sites/skit-studio` | SKIT Studio | Three.js, GSAP, Blender | Immersive 3D website blending storytelling, interaction, and motion. WebGL cursor trail. | **WebGL cursor trail:** Replace the default cursor with a GPU-rendered trail (glow, particles, or glass distortion) that reinforces the brand's material language. |
| 14 | **Timeless** — `awwwards.com/sites/timeless` | Unknown | WebGL, Three.js | Premium lounge aesthetic. WebGL portal, locations slider, stairs scroll. | **WebGL portal transitions:** Use fullscreen shader wipe (e.g., ink bleed, fractal dissolve) when moving between scenes rather than standard page loads. |
| 15 | **Basement Studio 2025** — `basement.studio` | Basement Studio | Next.js, Vercel, Three.js | Commitment to selected projects. High-quality 3D + minimal UI. | **Restraint as luxury:** Not every page needs 3D. Basement alternates pure UI with moments of heavy WebGL. The contrast makes the 3D feel premium. |
| 16 | **14islands** — `awwwards.com/sites/14islands` | 14islands (Stockholm) | Gatsby, React, Three.js, SVG, WebGL | Flat design + 3D WebGL blend. Microinteractions and storytelling. | **Flat-to-3D transitions:** Use 2D flat UI that organically "lifts" into 3D on scroll or hover, bridging static and immersive modes. |
| 17 | **Woodlight** — `awwwards.com/sites/woodlight` | Unknown | Three.js, reactive shaders | Scroll-driven WebGL experience. Reactive shaders + fluid transitions. | **Reactive shaders:** Background shaders that subtly shift color/intensity based on scroll velocity or time-on-section. |
| 18 | **The Race to Save Space** — `awwwards.com/sites/the-race-to-save-space` | Unknown | Nuxt.js, Three.js, WebGL | Interactive storytelling about space debris. Sound + data viz + infinite scroll. | **Data-as-3D:** If DEFACT has metrics/sustainability stories, represent data points as 3D debris/constellation elements that users explore spatially. |
| 19 | **Nussli Website Relaunch** — `awwwards.com/sites/nussli-website-relaunch-3d-canvas` | Unknown | Astro, Three.js, GSAP | Projects presented as 3D elements on a canvas in space. 3D scroll header, modular content, page transitions. | **3D project canvas:** Treat product/project cards as 3D planes floating in space, navigable via scroll with GSAP ScrollTrigger. |
| 20 | **EASY TOMORROW Brand** — `awwwards.com/sites/easy-tomorrow-brand-website` | Unknown | Three.js, WebGL | 360-degree 3D WebGL virtual experience. Playful identity expressed through interactive 3D. | **360° product view:** Full spherical product inspection, not just turntable rotation. Essential for luxury credibility. |
| 21 | **Mousham Singh 3D Web** — `awwwards.com/sites/mousham-singh-3d-web` | Unknown | Three.js, GSAP, WebGL | Scroll-based storytelling, WebGL hero section, 3D contact section. | **3D contact / footer:** Even utility pages (contact, imprint) can carry a subtle 3D element — a particle field or floating glass shape. |
| 22 | **Yamê - The Molazone** — `awwwards.com/sites/yame-the-molazone` | Studio 9P | Three.js, Next.js, Blender | Immersive album release experience. 360° exploration, mini-game, exclusive content. | **Gamified discovery:** Hide easter eggs (AR content, behind-the-scenes textures) that users unlock via interaction — extending session time. |
| 23 | **Trawelt** — `awwwards.com/sites/trawelt` | HOLOGRAPHIK | 3D, WebGL, GSAP | Unique brand direction connected to travel. Hero 3D animation + hover interactions + scroll-driven page transitions. | **Hero 3D reveal:** The first 3-5 seconds of the hero should be a controlled 3D reveal of the product, choreographed like a film opening. |
| 24 | **Dopo Powerbank** — `awwwards.com/sites/dopo-powerbank` | Unknown | React Three Fiber, Blender, GSAP | Scroll-based storytelling exploring product features through smooth camera transitions. | **R3F + Blender pipeline:** Use Blender for modeling, export as GLB with Draco, load in R3F with `@react-three/drei` helpers. |
| 25 | **Oakley Encoder** — `awwwards.com/sites/oakley-encoder-sports-glasses` | Karolin Braun | React Three Fiber, GSAP | Scrolling unveils product features interactively. Dark, sporty aesthetic. | **Feature-on-scroll:** As user scrolls, product components separate/disassemble to reveal internal technology — exploded view driven by scroll position. |
| 26 | **Rimowa Unique** — `awwwards.com/sites/rimowa-unique` | Rimowa / Internal | React, Three.js, WebGL, Webpack | WebGL luggage configurator. AA-compliant, fully integrated into e-commerce ecosystem. | **E-commerce integration:** The 3D configurator must push SKU variant selections directly to cart/checkout via API without page reload. |
| 27 | **OGAKI** — `awwwards.com/sites/ogaki` | Unknown | Next.js, GSAP, Figma | Fashion/luxury social-first agency. Clean, minimal, photo/video heavy. | **Luxury minimalism:** For DEFACT's UI chrome, adopt OGAKI's restraint: large white space, serif typography, single accent color. Let the 3D scene own the drama. |
| 28 | **CHANEL - Les 4 Ombres Boutons** — `awwwards.com/sites/chanel-les-4-ombres-boutons` | Unknown | Vue.js, GSAP, WebGL | Interactive landing page merging 3D modeling with fluid, high-performance development. 360° product views. | **360° WebGL product:** Full 3D rotation + zoom on product detail pages, not just a 10-image carrusel. |
| 29 | **Bleu de CHANEL L'Exclusif** — `awwwards.com/sites/bleu-de-chanel-lexclusif` | Unknown | Vue.js, GSAP, WebGL, Next.js | Immersive landing page for fragrance. Elegance + fluid navigation + high-end 3D. | **Fluid navigation:** No hard cuts between sections; the page "breathes" — sections dissolve, merge, or slide via WebGL shaders. |
| 30 | **Joseph Santamaria Portfolio** — `joseph-san.com` | Joseph Santamaria (solo) | Three.js, GSAP, ScrollTrigger, Observer, SplitText, Blender, KTX2, Draco, custom shaders | Scroll-driven 3D world — "a place, not a tab." Snap-block scrolling, tesseract transition, two particle systems, soundtrack synced to scroll. | **Snap-scroll cinematography:** Use GSAP Observer + ScrollTrigger to make the site feel like a single camera take. Lock sections with snap behavior so users land cleanly on beats, not mid-transition. |
| 31 | **Chillbase Careers** — `chipsa.design/works/chillbase` | Chipsa | WebGPU, Three.js TSL, Web Worker | Particle animation forming shapes (logo, developer silhouette). 80,000 particles via compute shaders. WebGL2 Transform Feedback fallback. | **WebGPU compute shaders:** Use GPU compute for particle morphing. If browser support allows, this yields 10x+ particle counts vs. CPU/vertex-shader approaches. |
| 32 | **Aether 1 Earbuds** — `itsoffbrand.com/our-work/aether1` | OFF+BRAND | Three.js, GSAP, Lenis, GPGPU flow-fields, fluid-sim cursor, audio-reactive waves | AI chat + 3D WebGL + brand design combined. Baked camera paths, GSAP scene swaps, 60fps on iPhone SE 2020. | **Audio-reactive 3D:** Tie sound/music to vertex displacement or shader uniforms. If DEFACT has a sonic brand identity, make the 3D scene breathe with it. |
| 33 | **Awwwards-adidas (open source)** — `github.com/Ali-Sanati/awwwards-adidas` | Ali-Sanati | Next.js, React Three Fiber, GSAP, Framer Motion, TailwindCSS, Drei, Aceternity UI | Awwwards-level polish with open-source stack. Scroll-animated 3D landing page for shoe product. | **Open-source blueprint:** This repo contains the exact file structure and patterns needed to ship an Awwwards-grade R3F site with Next.js, GSAP, and Tailwind. |
| 34 | **PorscheLab** — `github.com/ASTRICKK/PorscheLab` | ASTRICKK | React Three Fiber, drei, GSAP, Vite, gltfjsx | Real-time 3D car configurator. 60-120 FPS on mobile. HDRI environments, material controls (paint, metalness, roughness), spatial audio. | **HDRI environment storytelling:** Use 8 cinematic HDRI environments to place the product in aspirational contexts. Each environment = a different brand story. |
| 35 | **Ueno 3D Interview** — `awwwards.com/sites/ueno-3d-interview` | Ueno | Three.js, GSAP, React, WebGL | Playful 3D game-like interview experience. Hot dog avatar, office pool, character animations with breathing code. | **Character breathing animations:** Even static 3D characters feel alive with subtle sine-wave body/hand movement at different frequencies. |
| 36 | **Planetono** — `tubikstudio.com/works/planetono` | Tubik Studio | Three.js, custom scroll engine, Rive micro-interactions | Experimental space-food ordering flow. Scroll-driven 3D + animated UI + portal-style layout. | **Portal-style layout:** Use a central "window" into the 3D world, surrounded by 2D UI. Reduces GPU load while maintaining immersion. |
| 37 | **Alphane Labs** — `tubikstudio.com/works/alphane-labs` | Tubik Studio | Three.js, Nuxt 3, Blender, orthographic camera, wireframe shaders | Industrial air-sensor blueprint. Scroll-driven orthographic reveal + wireframe shaders. | **Orthographic + wireframe:** For technical/craft products, use orthographic projection + wireframe shader overlay to emphasize precision engineering. |
| 38 | **Max Mara - Jacket Circle** — `awwwards.com/websites/three-js` | Adoratorio Studio | Three.js, WebGL | Circular product showcase with scroll interaction. | **Circular product carousel:** Arrange products in a 3D cylindrical or orbital layout that rotates with scroll. |

---

## 3. Visual Techniques Breakdown

### 3.1 Chrome Rendering & Luxury Materials

The "chrome" look on luxury sites is not achieved with a single `MeshStandardMaterial`.

| Technique | How It's Done | DEFACT Application |
|---|---|---|
| **Physical material workflow** | Use `MeshPhysicalMaterial` with `transmission`, `thickness`, `ior`, and `clearcoat`. Or use `@react-three/drei`'s `<MeshTransmissionMaterial>`. | DEFACT products with glass/plastic/crystal elements can use physically accurate transmission. |
| **MatCaps for performance gold** | Pre-bake gold matcap textures from HDRI studio setups. Apply as `matcap` on a standard material. Much cheaper than real-time environment mapping. | Gold watch bezels, metallic logos, trophy elements. |
| **Environment maps (HDRI)** | Use `.hdr` environment maps loaded via `RGBELoader` or Drei's `<Environment>` component. Rotate the env map subtly on scroll. | Reflective car paint, polished marble, liquid surfaces. |
| **Normal + displacement combo** | Bake high-poly details to normal maps, use displacement for macro form. Keeps geometry light while looking detailed. | Leather texture, embossed patterns, fabric weave. |

**Key reference:** Cartier's "Love Experience" uses pre-baked still lifes + real-time WebGL mini-site hybrid. The still lifes handle photorealism; the WebGL handles interactivity.

**Confidence: High** — confirmed via Immersive Garden case studies and Codrops technical articles.

### 3.2 Scroll-Driven Camera & Storytelling

This is the dominant navigation pattern for 2025-2026 luxury 3D sites.

**Architecture:**
1. **Lenis** for smooth scroll dampening (replaces native scroll events).
2. **GSAP ScrollTrigger** links scroll position to timeline progress.
3. **GSAP Observer** unifies mouse wheel, touch drag, and trackpad into normalized delta values.
4. **Camera path** is either an explicit spline (CatmullRom) or keyframed positions/rotations.
5. **Snap behavior** locks the user to section beats — prevents awkward mid-transition pauses.

**Critical code pattern (paraphrased from Joseph Santamaria / Codrops):**

```javascript
// Use Observer instead of raw scroll
gsap.registerPlugin(ScrollTrigger, Observer);

Observer.create({
  target: window,
  type: "wheel,touch,scroll", // unified input
  onChange: (self) => {
    // normalized delta, independent of device
    const velocity = self.deltaY;
    // drive camera along spline
    cameraProgress += velocity * multiplier;
  }
});

// Snap to nearest section after scroll settles
ScrollTrigger.create({
  snap: 1 / (sections.length - 1),
  duration: { min: 0.5, max: 1.2 },
  delay: 0,
  ease: "power2.inOut"
});
```

**DEFACT application:** Treat each product launch as a "scene" in a continuous camera journey. The hero scene introduces the brand, scroll down to enter the product universe, continue scrolling to reveal materials/tech, end at CTA.

**Confidence: Very High** — Joseph Santamaria's Codrops article (April 2026) is a definitive technical walkthrough ofproduction scroll-driven 3D.

### 3.3 Post-Processing Effects

The most effective post-processing on luxury sites is subtle, not noisy.

| Effect | Implementation | When to Use |
|---|---|---|
| **Bloom** | `@react-three/postprocessing` `<Bloom>` | Hero moments, chrome highlights, glass edges. Use threshold 0.8+, intensity 0.5-. |
| **Chromatic aberration** | Custom shader pass or `chromaticAberration` in postprocessing | Transition moments (like LV VIA glitch). Never during stable viewing. |
| **Vignette** | `Vignette` from `@react-three/postprocessing` | Darkens corners, focuses attention on center product. |
| **Depth of field (bokeh)** | `BokehPass` | Cinematic product focus pulls. Expensive — use sparingly. |
| **Film grain / noise** | Custom fragment shader overlay at 2-4% opacity | Unifies digital renders with photographic authenticity. |
| **SSAO (Screen Space Ambient Occlusion)** | `SSAO` from postprocessing | Adds contact shadowing between product and surface. Critical for realism. |

**DEFACT application:** Apply a "cinematic" post-processing preset (bloom + subtle grain + SSAO) during product reveals. Strip it back for standard browsing to preserve performance.

**Confidence: High** — standard in Drei/postprocessing docs and confirmed across multiple agency case studies.

### 3.4 Lighting Strategies

| Pattern | Description | Source |
|---|---|---|
| **Three-point studio lighting** | Key, fill, rim lights (often invisible area lights) arranged in a fixed rig that travels with the camera. | Cartier, Chanel, Dior |
| **HDRI environment rotation** | Slowly rotate the environment map based on scroll position or time. Creates ever-changing reflections. | PorscheLab, Rimowa |
| **Volumetric light shafts** | Fake with transparent cone geometry + additive blending, or use true volumetric shaders. | Joseph Santamaria lava scene |
| **Light color temperature shifts** | Shift key light from warm (3000K) to cool (6500K) during scroll transitions to signal emotional tone change. | Immersive Garden Cartier campaigns |
| **Emissive accents** | Product details (LED indicators, screen glow) use `emissive` property with bloom amplification. | Aether 1 Earbuds |

**DEFACT application:** Design a "lighting rig" as a reusable component — key, fill, rim lights positioned relative to product with adjustable color temperature. Rig travels with camera path.

### 3.5 Particle Systems

| Type | Use Case | Technique |
|---|---|---|
| **Drifting petals/sparkles** | Luxury softness, organic feel | Sprites or instanced planes, billboarded to camera. Slow vertical drift + subtle horizontal noise. |
| **Ember/spark systems** | Energy, danger, heat | GPU instanced meshes with upward velocity + random jitter. Additive blending. |
| **Cursor trails** | Interactivity, brand signature | Render-to-texture ping-pong or compute shader trail. Fade previous frames with decay factor. |
| **Product dissolution** | Transition between SKUs | GSAP ScrollTrigger manipulates `position` attribute of BufferGeometry particles. Mesh dissolves into point cloud, reforms as next product. |

**Joseph Santamaria's dual-particle approach:** The rose field uses soft, slow, vertical particles. The lava scene uses fast, hot, upward particles. Both run in the same render loop but with separate emission rates, shader uniforms, and blending modes. The key insight: "Getting both to sit inside the same performance budget without one starving the other took real tuning."

**DEFACT application:** Design a "particle vocabulary" — 2-3 particle systems that appear across all DEFACT campaigns but behave differently per product. E.g., slow metallic dust for watches, fast liquid splash for fragrances.

---

## 4. Claude AI Design Capabilities

### 4.1 Where Claude Excels vs. Other AI Tools

| Dimension | Claude (Opus 4.7) | ChatGPT / DALL-E | Midjourney | Figma AI | Canva AI |
|---|---|---|---|---|---|
| **Text generation** | Best-in-class | Strong | N/A (prompting only) | N/A | N/A |
| **Code generation** | Best-in-class (Claude Code) | Good | N/A | Dev Mode only | None |
| **Interactive prototypes** | ✅ Real code (HTML, React, 3D, shaders) | ❌ Static images / mockups | ❌ Static images | ✅ Limited interactivity | ❌ Static |
| **Image generation** | ❌ No photorealistic images | ✅ DALL-E 3 strong | ✅ Best artistic quality | ✅ UI generation | ✅ Templates + AI |
| **Design system awareness** | ✅ Reads codebase, applies automatically | ❌ Manual by prompt | ❌ None | ✅ Component libraries | ✅ Brand Kit |
| **3D / WebGL / Shaders** | ✅ Claude Design supports 3D, shaders, voice, video | ❌ Cannot generate WebGL code | ❌ Cannot generate code | ❌ No WebGL | ❌ No WebGL |
| **Design-to-code handoff** | ✅ Claude Design → Claude Code bundle | ❌ No native handoff | ❌ No code | ✅ Dev Mode / MCP | ❌ No code |
| **Vector generation** | ✅ SVG, diagrams, charts | ✅ SVG limited | ❌ Raster only | ✅ Figma-native | ✅ Limited |
| **Collaborative editing** | Group chat | Real-time chat | Discord | Multiplayer | Multiplayer |
| **Export formats** | HTML, URL, PDF, PPTX, Canva bundle | Image, PDF | Image, PNG | Figma file | Canva file |

**Sources:** Anthropic official launch post (April 17, 2026), TechCrunch coverage, Art & Algorithms analysis, Lushbinary comparison table, Various 2026 tool review blogs.

### 4.2 Claude Design Specifics (Launched April 17, 2026)

**What Claude Design IS:**
- A **two-pane canvas** (chat left, rendered design right) at `claude.ai/design`
- Powered by **Claude Opus 4.7**, Anthropic's most capable vision model (2,576px on long edge — 3x previous resolution)
- Produces **actual code** under the hood, not flat images — enables interactive prototypes with voice, video, shaders, and 3D
- Reads a team's **existing codebase and design files** (GitHub repo, Tailwind config, Figma exports, past slide decks, live website) and auto-builds a design system
- Refinement via: typed chat, inline comments on elements, direct text edits, and **adjustment knobs/sliders** for spacing, color, layout
- Handoff to Claude Code via a **machine-readable bundle** containing component structure, tokens, layout hierarchy, and assets

**What Claude Design IS NOT:**
- An image generator. Claude Design will NOT create photorealistic hero images of women in studios. For those, use Midjourney, Leonardo, or Flora.
- A pixel-perfect production tool. At launch (research preview), typography, image placement, and complex multi-screen flows have rough edges.
- A replacement for Figma. Figma remains the industry standard for production UI/UX with 80-90% market share and 2,000+ plugins.

### 4.3 Claude's Default "House Style" (Opus 4.7)

According to Anthropic's official prompting docs:

- Warm cream/off-white backgrounds (~`#F4F1EA`)
- Serif display type (Georgia, Fraunces, Playfair)
- Italic word-accents
- Terracotta/amber accent color

**Warning:** This reads well for editorial, hospitality, and portfolio briefs, but will feel "off" for dashboards, dev tools, fintech, healthcare, or enterprise apps. For DEFACT's luxury positioning, the serif + warm palette defaults might actually align well — but explicitly override them to match DEFACT's actual brand.

### 4.4 Prompting Techniques for Best Visual Results from Claude

**From Anthropic's official prompting docs (platform.claude.com) and community guides:**

1. **Anti-"AI slop" preamble:**
   Claude Opus 4.7 "requires less frontend design prompting than previous models to avoid generic patterns that users call the 'AI slop' aesthetic." However, this prompt snippet still works well:
   > "Create distinctive, creative frontends that surprise and delight. Prioritize CSS-only solutions for HTML. Focus on high-impact reveals (animation-delay) that create more delight than scattered micro-interactions. Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic. Avoid defaulting to sans-serif fonts (especially Inter/Roboto) or purple gradients."

2. **Explicitly reference design system components by name:**
   > "Use the PrimaryButton and Card components from our design system. Apply the GoldAccent color token."

3. **Use comments for component-level changes, chat for structural ones:**
   - **Comments (inline on canvas):** "tighten this spacing," "swap this icon," "make this label larger"
   - **Chat (text prompt):** "split this into two sections," "rewrite the value prop," "try a completely different aesthetic direction"

4. **Provide reference inputs broadly:**
   - Upload screenshots of existing DEFACT pages
   - Link the GitHub repo so Claude reads actual component code
   - Upload past pitch decks (PPTX) to extract brand patterns
   - Use the web capture tool to pull live elements from defact.com

5. **For 3D / WebGL specifically:**
   Claude Design "supports advanced prototypes with voice, video, shaders, 3D elements, and embedded AI calls." When prompting for 3D:
   - Specify the renderer: "Build this as a React Three Fiber scene"
   - Name materials explicitly: "Use MeshPhysicalMaterial with clearcoat for the glass dome"
   - Name animation libraries: "Animate entrance with GSAP ScrollTrigger, not Framer Motion"
   - Specify performance constraints: "Ensure this runs at 60fps on iPhone 13 by using instanced meshes and KTX2 textures"

6. **Leverage the handoff to Claude Code:**
   When a design is ready, select "Send to Claude Code" export. The bundle contains:
   - Component structure as machine-readable spec
   - Design tokens actually used on canvas
   - Layout hierarchy
   - Referenced assets
   
   This creates "the only end-to-end AI design-to-code pipeline" currently available (per Lushbinary review, 2026).

---

## 5. Recommendations for DEFACT (Ranked)

### Rank 1: Scroll-Driven 3D Cinematography (Critical)
**What:** Build DEFACT product pages as continuous scroll-driven 3D journeys, not paginated galleries. Each product's "universe" is a scene. The camera is the user.

**How:**
- Use **GSAP ScrollTrigger + Observer + Lenis** as the scroll stack.
- Define camera paths as splines or keyframed position/rotation sequences.
- Implement snap behavior so users always land cleanly on section beats.
- Preload next section assets during current section idle time.

**Why DEFACT:** Luxury brands (Cartier, Chanel, Valentino, LV) have proven this pattern converts. The user is not "browsing a catalog"; they are "entering a world." This differentiates DEFACT from static e-commerce.

### Rank 2: Modular Three.js Component Architecture (Critical)
**What:** Design a "kit of parts" for product launches: hero 3D scene, product viewer, material configurator, AR viewer, story section, CTA strip. Recombine without code changes.

**How:**
- Use **React Three Fiber** for declarative component composition.
- Separate 3D assets into "scene" (environment) and "product" (model) GLBs.
- Drive visibility and animation via props/state, not hardcoded timelines.
- Follow Valentino/Colla Studio's pattern: avoid CMS, build robust component system.

**Why DEFACT:** Enables same-day-deployment for new product drops. Speed to market is the differentiator in luxury fashion.

### Rank 3: Bas-Relief / Low-Relief 3D for Performance (High)
**What:** Do not model everything in full 3D. Use displaced planes + normal maps to fake depth for backgrounds, textures, and ambient elements.

**How:**
- Build in Blender, bake high-poly detail to normal maps.
- Use `.exr` displacement on simple geometry (`PlaneGeometry` with high subdiv).
- Apply KTX2/Basis Universal texture compression for GPU efficiency.

**Why DEFACT:** Immersive Garden's own 2025 site proves this achieves "high level of realism while minimizing GPU load and memory usage." DEFACT can look premium on mid-range devices.

### Rank 4: Procedural Cloud / Atmosphere for Brand Identity (High)
**What:** Replace static background images with procedural shader-generated atmosphere (clouds, nebula, light rays) that respond to scroll and time.

**How:**
- Use Fragment Shader with fractal Brownian motion (fBM) + simplex noise.
- Map noise to color gradients matching DEFACT's seasonal palette.
- Animate via time uniform + scroll velocity uniform.

**Why DEFACT:** Cartier's "Above the Clouds" campaign and Louis Vuitton's travel theme both prove that procedural atmosphere reads as "luxury" — it is unique, unphotographable, and memorable.

### Rank 5: Material/Finish Real-Time Configurator (High)
**What:** Let users cycle through DEFACT material options (leathers, metals, fabrics) in real-time on the 3D model.

**How:**
- Pre-bake material variants as separate material definitions, not separate models.
- Swap `material` prop on click/tap.
- Use `MeshPhysicalMaterial` with `transmission` / `clearcoat` for glass/crystal elements.
- Push selected variant SKU directly to cart via headless Shopify/bigCommerce API.

**Why DEFACT:** Rimowa's luggage configurator and Cartier's bracelet configurator both show that real-time material swap dramatically increases conversion. It answers the user's #1 question: "What does this look like in MY finish?"

### Rank 6: Audio-Reactive 3D / Brand Soundscape (Medium-High)
**What:** If DEFACT has a sonic brand identity, make the 3D scene subtly react to it.

**How:**
- Tie Web Audio API frequency data to shader uniforms (vertex displacement, color shift, light intensity).
- Keep audio user-controlled (never autoplay) with a muted-by-default toggle.
- Reference Joseph Santamaria's approach: soundtrack gets muffled during project transitions via lowpass filter, reinforcing spatial continuity.

**Why DEFACT:** The Aether 1 Earbuds case study explicitly shows that audio-reactive 3D "turns passive viewing into playful discovery."

### Rank 7: WebGPU Compute Shaders for Particles (Medium)
**What:** Use WebGPU's compute shaders for high-count particle systems (80,000+ particles) that morph between shapes.

**How:**
- Write compute shaders in Three.js TSL (Three Shading Language).
- Provide WebGL2 Transform Feedback fallback for Firefox/Safari.
- Run 3D rendering in a Web Worker to keep main thread responsive.

**Why DEFACT:** The Chillbase case study proves this runs 80,000 particles smoothly on mobile. DEFACT could use this for signature "product morph" transitions or ambient brand particles.

### Rank 8: Claude Design for Rapid Prototyping + Claude Code for Production (Medium)
**What:** Use Claude Design to generate first-pass interactive prototypes from DEFACT brand assets, then hand off to Claude Code for implementation.

**How:**
1. Upload DEFACT's existing website screenshots, Figma files, and codebase to Claude Design.
2. Let Claude build a design system automatically.
3. Prompt: "Create a scroll-driven 3D landing page prototype for our new [PRODUCT]. Use our GoldAccent token, the serif display font, and apply MeshPhysicalMaterial with clearcoat."
4. Refine via inline comments and adjustment knobs.
5. Export "Send to Claude Code" bundle.
6. In Claude Code: `/team-plan` reads the bundle; specialist agents build from spec; quality engineer validates.

**Why DEFACT:** This is literally the only end-to-end AI design-to-code pipeline available in 2026. It compresses "brief → mockup → prototype → production" from weeks to days.

---

## Sources & Citations

| # | Source | Type | Confidence |
|:-:|---|---|---|
| 1 | [Awwwards Three.js Collection](https://www.awwwards.com/websites/three-js/) | Award platform | High |
| 2 | [Awwwards 3D Websites](https://www.awwwards.com/websites/3d/) | Award platform | High |
| 3 | [Immersive Garden Portfolio](https://immersive-g.com/projects/) | Studio case studies | High |
| 4 | [Cartier W&W 2025 Awwwards SOTD](https://www.awwwards.com/sites/cartier-watches-wonders-2025) | Award platform | High |
| 5 | [Valentino Product Launch — Colla Studio](https://work.collastudio.com/work/valentino-product-launch/) | Studio case study | High |
| 6 | [Gucci Beauty Wishes — MONOGRID](https://thebrandingdesign.com/project/gucci-beauty-wishes/) | Studio case study | High |
| 7 | [Cartier Love Experience — Bonjour Paris](https://bonjour.paris/works/love-experience) | Studio case study | High |
| 8 | [Cartier Love Is All — Immersive Garden](https://immersive-g.com/projects/cartier-love-is-all/) | Studio case study | High |
| 9 | [Cartier EOY 23 — Immersive Garden](https://immersive-g.com/projects/cartier-end-of-year-23/) | Studio case study | High |
| 10 | [Immersive Garden Own Site Case Study](https://www.awwwards.com/case-study-immersive-gardens-new-website.html) | Technical case study | High |
| 11 | [SKIT Studio Awwwards](https://www.awwwards.com/sites/skit-studio) | Award platform | High |
| 12 | [Timeless Awwwards](https://www.awwwards.com/sites/timeless) | Award platform | Medium |
| 13 | [Basement Studio Awwwards](https://www.awwwards.com/sites/basement-studio-1) | Award platform | High |
| 14 | [14islands Awwwards](https://www.awwwards.com/sites/14islands) | Award platform | High |
| 15 | [Woodlight Awwwards](https://www.awwwards.com/sites/woodlight) | Award platform | Medium |
| 16 | [Mousham Singh 3D Web Awwwards](https://www.awwwards.com/sites/mousham-singh-3d-web) | Award platform | Medium |
| 17 | [Yamê The Molazone Awwwards](https://awwwards.com/sites/yame-the-molazone) | Award platform | High |
| 18 | [Trawelt Awwwards](https://www.awwwards.com/sites/trawelt) | Award platform | High |
| 19 | [Dopo Powerbank Awwwards](https://www.awwwards.com/sites/dopo-powerbank) | Award platform | High |
| 20 | [Oakley Encoder Awwwards](https://www.awwwards.com/sites/oakley-encoder-sports-glasses) | Award platform | High |
| 21 | [Rimowa Unique Awwwards](https://www.awwwards.com/sites/rimowa-unique) | Award platform | High |
| 22 | [OGAKI Awwwards](https://awwwards.com/sites/ogaki) | Award platform | High |
| 23 | [CHANEL Les 4 Ombres Awwwards](https://awwwards.com/sites/chanel-les-4-ombres-boutons) | Award platform | High |
| 24 | [Bleu de CHANEL Awwwards](https://awwwards.com/sites/bleu-de-chanel-lexclusif) | Award platform | High |
| 25 | [Joseph Santamaria Portfolio — Codrops](https://tympanus.net/codrops/2026/04/28/more-than-a-portfolio-building-a-scroll-driven-3d-world-with-something-to-say/) | Technical deep-dive | **Very High** |
| 26 | [Chillbase — Chipsa Case Study](https://chipsa.design/works/chillbase) | Studio case study | High |
| 27 | [Aether 1 Earbuds — OFF+BRAND](https://www.itsoffbrand.com/our-work/aether1) | Studio case study | High |
| 28 | [PorscheLab GitHub](https://github.com/ASTRICKK/PorscheLab) | Open source | High |
| 29 | [Awwwards-adidas GitHub](https://github.com/Ali-Sanati/awwwards-adidas) | Open source | High |
| 30 | [React Three Fiber Production Discussion](https://github.com/pmndrs/react-three-fiber/discussions/1142) | Community evidence | High |
| 31 | [Claude Design — Anthropic Launch](https://www.anthropic.com/news/claude-design-anthropic-labs) | Official product docs | **Very High** |
| 32 | [Claude Prompting Best Practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) | Official docs | **Very High** |
| 33 | [Claude builds visuals — Anthropic Blog](https://www.claude.com/blog/claude-builds-visuals) | Official blog | **Very High** |
| 34 | [Claude Design: Art & Algorithms](https://artandalgorithms.ai/articles/code/claude-launch-week-april-2026) | Industry analysis | High |
| 35 | [Claude Design Starter Guide](https://claudiaplusai.substack.com/p/claude-design-starter-guide-and-examples) | Community guide | High |
| 36 | [Claude Design to Claude Code Handoff](https://claudefa.st/blog/guide/mechanics/claude-design-handoff) | Community guide | High |
| 37 | [Claude Design vs Figma vs Canva](https://www.sketchto.com/posts/product-reviews/claude-design-vs-figma-ai-vs-canva-ai-2) | Tool comparison | High |
| 38 | [Best AI Design Tools 2026](https://www.comparegen.ai/blog/best-ai-design-tools-2026) | Tool comparison | Medium |
| 39 | [Midjourney vs Claude vs etc. — AIViewer](https://www.aiviewer.ai/guides/best-ai-image-generators-compared/) | Tool comparison | High |
| 40 | [WebGL Development Guide 2026](https://mdx.so/blog/webgl-development-how-to-build-immersive-3d-web-experiences-in-2026) | Technical guide | High |
| 41 | [Best 3D Website Examples 2026](https://www.withlore.co/blog/best-3d-website-examples/) | Industry blog | Medium |
| 42 | [Ueno 3D Interview — Behind the Scenes](https://loremipsum.ueno.co/the-ueno-3d-interview-behind-the-scenes-da13885d8768) | Technical retrospective | High |
| 43 | [Tubik Studio — Alphane Labs](https://tubikstudio.com/works/alphane-labs) | Studio case study | High |
| 44 | [Tubik Studio — Planetono](https://tubikstudio.com/works/planetono) | Studio case study | High |
| 45 | [Claude Design — TechCrunch](https://techcrunch.com/2026/04/17/anthropic-launches-claude-design/) | News | High |

---

## Appendix: Quick-Reference DEFACT Stack Recommendation

Based on this research, the recommended production stack for DEFACT's next 3D luxury web experience:

| Layer | Technology | Justification |
|---|---|---|
| Framework | Next.js 15 + App Router | Used by Valentino, Basement Studio, PorscheLab, Aether 1 |
| 3D Renderer | React Three Fiber (R3F) + Drei | Declarative, composable, ecosystem standard |
| Animation | GSAP (ScrollTrigger, Observer, SplitText) | Industry standard for scroll-driven 3D cinematography |
| Scroll | Lenis | Smooth scroll dampening; used by Immersive Garden, Cartier, Aether 1 |
| Post-Processing | `@react-three/postprocessing` | Bloom, SSAO, DOF, chromatic aberration |
| Shaders | Custom GLSL + TSL for WebGPU | Procedural atmosphere, particle systems |
| 3D Assets | Blender → GLB with Draco → KTX2 compression | Proven pipeline from Immersive Garden + Codrops |
| State | Zustand | Lightweight; used widely in R3F community |
| Styling | Tailwind CSS + design tokens | Rapid iteration; matches Claude Design output |
| Build | Vite or Next.js native | Vite used by PorscheLab for speed; Next.js for SSR/SEO |
| AI Prototyping | Claude Design → Claude Code | Only end-to-end AI design-to-code pipeline in 2026 |
| Hosting | Vercel | Used by Basement Studio, PorscheLab, adidas clone |

---

*Report compiled 2026-04-30. All URLs and tool capabilities accurate as of search date. Claude Design capabilities are based on April 2026 launch state; features may have evolved since.*
