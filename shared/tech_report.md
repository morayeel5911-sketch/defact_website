# DEFACT Technical Research Report

> **Date:** 2026-04-28  
> **Scope:** React Three Fiber (R3F) integration for luxury brand website — DEFACT Design Constitution aligned.  
> **Target Stack:** Next.js 14+ App Router, React Three Fiber v9+, @react-three/drei, @react-three/postprocessing, TypeScript strict.

---

## 1. Scroll-Driven 3D in R3F (2025–2026 Best Practices)

### 1.1 Architectural Decision: ScrollControls vs. Manual Scroll Binding

For DEFACT's gallery-like scroll experience, there are **two valid approaches** with different trade-offs:

#### Option A: `@react-three/drei` ScrollControls (Recommended for DEFACT)

Built-in damping, range helpers, and HTML/DOM scroll sync — ideal for editorial scroll sections.

```tsx
import { ScrollControls, Scroll, useScroll } from '@react-three/drei'

function Scene() {
  return (
    <ScrollControls pages={3} damping={0.1} distance={1}>
      {/* Objects reading scroll state */}
      <CameraRig />
      <ArtifactPlinth />

      {/* Canvas objects that physically scroll */}
      <Scroll>
        <Plinth position={[0, viewport.height, 0]} />
        <Plinth position={[0, viewport.height * 2, 0]} />
      </Scroll>

      {/* Optional: synced DOM overlay */}
      <Scroll html>
        <section style={{ top: '100vh' }}>[01] SURFACE</section>
        <section style={{ top: '200vh' }}>[02] ARTIFACT</section>
      </Scroll>
    </ScrollControls>
  )
}
```

**Key pattern:** Read scroll data imperatively in `useFrame`, never in React render:

```tsx
function CameraRig() {
  const ref = useRef<Object3D>(null)
  const data = useScroll()

  useFrame(() => {
    // offset = 0..1 across entire scroll track
    // delta = current scroll velocity (dampened)
    const a = data.range(0, 1 / 3)      // 0→1 for first third
    const b = data.curve(1 / 3, 1 / 3)  // 0→1→0 ease curve
    const visible = data.visible(2 / 3, 1 / 3, 0.1)

    // Mutate refs directly — zero React re-renders
    ref.current.position.y = data.offset * 10
    ref.current.rotation.y = data.offset * Math.PI * 0.25
  })

  return <group ref={ref}>{/* children */}</group>
}
```

#### Option B: Manual Scroll (Performance-Critical Flythroughs)

For raw 60fps with maximum control, skip ScrollControls and read `window.scrollY` directly into refs:

```tsx
function ManualScrollRig() {
  const scrollTarget = useRef(0)
  const scrollCurrent = useRef(0)

  useEffect(() => {
    const onScroll = () => { scrollTarget.current = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((_state, dt) => {
    // Physics-based inertia — matches Motion Thesis "mass, friction"
    scrollCurrent.current +=
      (scrollTarget.current - scrollCurrent.current) * 0.12

    // Apply to camera or objects without triggering React renders
    camera.position.y = scrollCurrent.current * 0.01
  })

  return null
}
```

### 1.2 Performance Verdict

| Approach | Re-renders | Control | Best For |
|---------|------------|---------|----------|
| `ScrollControls` | Zero (if used correctly) | Medium | Editorial sections, DOM sync |
| Manual refs | Zero | Maximum | Custom velocity logic, GSAP sync |

**Golden rule:** No React `useState` inside `useFrame`. Everything stays in refs or the animation loop. This is what keeps 60fps stable on M1 MacBook Air.

### 1.3 DEFACT Alignment

Use `ScrollControls` with `damping={0.1}` — slow, physical friction matches the "revolving sculpture plinth" motion thesis. Keep max parallax shift ≤ 30px per viewport (per Design Constitution §Motion Thesis).

---

## 2. Chrome / Metallic Materials on White Backgrounds

### 2.1 Material Choice: `meshPhysicalMaterial` over `meshStandardMaterial`

For clinical chrome, `MeshPhysicalMaterial` provides `clearcoat`, `ior`, and `anisotropy` — but at a higher per-pixel cost. For DEFACT's restrained aesthetic, `meshStandardMaterial` is **sufficient and faster** if configured correctly.

```tsx
// Chrome primary — matches Design Constitution 3DMaterialPalette
<mesh castShadow receiveShadow>
  <boxGeometry args={[1, 1, 1]} />
  <meshStandardMaterial
    color="#C0C0C0"
    metalness={0.9}
    roughness={0.2}
    envMapIntensity={2.0}
  />
</mesh>

// Dark contrast sculptural material
<mesh castShadow receiveShadow>
  <torusKnotGeometry args={[1, 0.3, 128, 64]} />
  <meshStandardMaterial
    color="#1C1C1E"
    metalness={0.1}
    roughness={0.8}
    envMapIntensity={0.5}
  />
</mesh>
```

**For advanced chrome realism** (e.g., hero centerpiece):

```tsx
<meshPhysicalMaterial
  color="#C0C0C0"
  metalness={1.0}
  roughness={0.15}
  clearcoat={1.0}
  clearcoatRoughness={0.1}
  envMapIntensity={2.5}
  ior={2.33}        // chromatic dispersion for polished metal
/>
```

### 2.2 Environment Maps: Preset vs. Custom HDR

Chrome **will not read well** on a white background without a strong environment map. The reflections create the contrast edges that define the form.

```tsx
import { Environment } from '@react-three/drei'

// Option A: Preset (fast, CDN-hosted, 1-2MB)
<Environment preset="studio" />

// Option B: Custom HDR (best quality, self-hosted)
<Environment files="/env/studio-soft-02.hdr" />
```

| Preset | Mood | DEFACT Fit |
|--------|------|------------|
| `studio` | Clean, soft boxes, neutral gray | **Primary choice** — clinical archive aesthetic |
| `city` | Cool, blue-gray reflections | Acceptable for contrast sections |
| `apartment` | Warm, residential | Too warm — violates "cooled concrete gallery" |
| `warehouse` | Industrial, gritty | Too aggressive |

**Recommendation:** Start with `<Environment preset="studio" />`. For production, commission or purchase a **soft-box studio HDRI** with high dynamic range but low color saturation. Host as `.hdr` or `.exr` and load via `<Environment files="..." />`.

### 2.3 Making Chrome Pop on WHITE Backgrounds Specifically

This is the hardest lighting scenario in 3D. White-on-white without edge definition looks amateur.

**Technique stack:**

1. **Scene background = transparent, CSS background = `--void #FAFAFA`**
   ```tsx
   <Canvas
     gl={{ alpha: true, antialias: true }}
     style={{ background: 'transparent' }}
   >
     {/* No <color attach="background" /> */}
   </Canvas>
   ```

2. **Use `<ContactShadows>` from drei for ground-plane grounding without a visible floor:**
   ```tsx
   <ContactShadows
     position={[0, -1.5, 0]}
     opacity={0.4}
     scale={10}
     blur={2}
     far={4}
   />
   ```

3. **Rim / key light in code (subtle, not competing with envMap):**
   ```tsx
   <directionalLight
     position={[5, 5, -5]}
     intensity={0.5}
     castShadow
   />
   ```

4. **`envMapIntensity > 1` (up to 2.5) is mandatory** — white backgrounds swallow reflection energy. The Design Constitution specifies `envMapIntensity: 2.0` for chrome primary.

5. **Post-processing: see Section 5** — subtle SSAO defines edges where light reflection alone fails.

---

## 3. GLB Model Loading in R3F

### 3.1 Basic Pattern: `useGLTF` with Draco

```tsx
import { useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

function Artifact({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} castShadow receiveShadow />
}

// Preload at module level — critical for perceived performance
useGLTF.preload('/models/artifact-draco.glb')

export default function ArtifactScene() {
  return (
    <Suspense fallback={<Loader />}> {/* DEFACT: custom DOM loader matching Clash Grotesk */
      <Artifact url="/models/artifact-draco.glb" />
    </Suspense>
  )
}
```

**Draco setup (set once, globally):**

```tsx
// app/layout.tsx or a root provider
useGLTF.setDecoderPath('/draco/')  // Host Draco WASM in /public/draco/
```

The `useGLTF` hook in drei automatically configures `DRACOLoader` when `setDecoderPath` is called.

### 3.2 Blender Export Settings for Web

| Setting | Value | Rationale |
|---------|-------|-----------|
| Format | `glTF 2.0 (.glb/.gltf)` | Native Three.js support |
| Images | `JPEG` or `WebP` (then convert to KTX2) | Smallest acceptable lossy |
| Compression | `Draco` enabled | 5-20x geometry compression |
| Draco Position Quantization | `14` bits | Balance: quality vs. size |
| Draco Normal Quantization | `10` bits | Normals degrade gracefully |
| Apply Modifiers | ✅ Yes | Exported mesh must be final |
| +Y Up | ✅ Yes | Matches Three.js |
| Materials | Principled BSDF → Standard (metalness/roughness) | PBR compatibility |

**Post-export optimization pipeline:**

```bash
# gltf-transform CLI — single source of truth for optimization
npm install -g @gltf-transform/cli

# Full pipeline: dedup → instance → texture-compress → draco → LOD
gltf-transform optimize \
  input.glb \
  output.glb \
  --texture-compress ktx2 \
  --compress draco

# Or manually:
gltf-transform dedup input.glb step1.glb
gltf-transform instance step1.glb step2.glb
gltf-transform uastc step2.glb step3.glb   # UASTC for visual quality
gltf-transform draco step3.glb final.glb
```

### 3.3 Loading States & Suspense Boundaries

For DEFACT's clinical aesthetic, the loading state must feel intentional — like a gallery preparing a room.

```tsx
import { Html, useProgress } from '@react-three/drei'

function DefactLoader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div
        className="font-mono text-xs uppercase tracking-widest"
        style={{ fontFamily: 'DM Mono, monospace', letterSpacing: '0.05em' }}
      >
        {progress.toFixed(0)}% — LOADING
      </div>
    </Html>
  )
}

// In Canvas:
<Suspense fallback={<DefactLoader />}>
  <ArtifactScene />
</Suspense>
```

**Nested Suspense for progressive loading:**

```tsx
<Suspense fallback={<DefactLoader />}>
  <CriticalModel />      {/* Above the fold: chrome hero */}
  <Suspense fallback={null}>
    <SecondaryModel />  {/* Below fold: lazy by scroll */}
  </Suspense>
</Suspense>
```

### 3.4 Multiple Models: Lazy Loading Strategy

For pages with multiple sections or a catalog:

```tsx
import { lazy, Suspense } from 'react'
import { Preload } from '@react-three/drei'

const LazyArtifact = lazy(() => import('./ArtifactModel'))

function Section({ visible }: { visible: boolean }) {
  return visible ? (
    <Suspense fallback={null}>
      <LazyArtifact />
    </Suspense>
  ) : null
}

// Critical path preloading via drei Preload
function CanvasWrapper() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Preload all /> {/* Preloads all assets in Suspense tree */}
        <Scene />
      </Suspense>
    </Canvas>
  )
}
```

**Intersection Observer pattern** for below-the-fold 3D sections:

```tsx
import { useInView } from 'react-intersection-observer'

function LazyCanvasSection() {
  const { ref, inView } = useInView({ triggerOnce: true, margin: '200px' })
  return (
    <div ref={ref} className="h-screen w-full">
      {inView && (
        <Canvas>
          <Suspense fallback={<DefactLoader />}>
            <Model />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
```

---

## 4. R3F Performance Optimization for Luxury Sites

### 4.1 On-Demand Rendering: `frameloop="demand"`

DEFACT's aesthetic is **predominantly static** — sculpture plinths, archival views. Continuous rendering wastes battery and GPU.

```tsx
<Canvas
  frameloop="demand"
  dpr={[1, 1.5]}        // Cap DPR for luxury site stability
  performance={{ min: 0.5 }}  // Adaptive DPR fallback if FPS drops
>
```

**When to call `invalidate()` manually:**

```tsx
import { useThree } from '@react-three/fiber'

function InteractiveArtifact() {
  const invalidate = useThree((state) => state.invalidate)

  return (
    <mesh
      onPointerOver={() => invalidate()}  // Start hover animation
      onPointerOut={() => invalidate()}    // End hover animation
    >
      {/* ... */}
    </mesh>
  )
}
```

**Decision matrix:**

| Scenario | frameloop | Notes |
|----------|-----------|-------|
| Static hero with slow breathing | `demand` | Breathing animation calls `invalidate()` each frame |
| Scroll-driven parallax | `demand` | Scroll event triggers `invalidate()` |
| Continuous orbit / flythrough | `always` | Rare for DEFACT aesthetic |
| Video or WebGPU particle system | `always` | Opt out from demand |

### 4.2 `<Preload>` for Critical Models

```tsx
import { Preload } from '@react-three/drei'

function CriticalScene() {
  return (
    <Suspense fallback={<DefactLoader />}>
      <HeroChromeModel />
      <Preload all />  {/* Triggers eager loading of all suspended assets */}
    </Suspense>
  )
}
```

### 4.3 Texture Compression: Basis Universal / KTX2

**Status in R3F (2025-2026):** KTX2/Basis Universal is the production standard for texture compression. It stays compressed in GPU memory (~10x VRAM reduction vs. PNG).

**Setup in R3F:**

```tsx
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js'
import { useLoader, Canvas } from '@react-three/fiber'

function KTX2Material() {
  const texture = useLoader(KTX2Loader, '/textures/chrome-base.ktx2', (loader) => {
    loader.setTranscoderPath('/basis/')  // Host WASM in /public/basis/
    loader.detectSupport(gl)             // Auto-detect ASTC/BC7/etc.
  })

  return <meshStandardMaterial map={texture} />
}
```

**Pipeline:** Convert textures with `gltf-transform uastc` or `toktx`.  
**Rule of thumb:** ETC1S for base color (smaller), UASTC for normal/roughness (quality-critical).

### 4.4 Instancing for Repeated Geometry

If DEFACT ever repeats geometric primitives (e.g., a grid of anodized cylinders):

```tsx
import { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'

function InstancedGrid({ count = 100 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useEffect(() => {
    if (!meshRef.current) return
    for (let i = 0; i < count; i++) {
      dummy.position.set((i % 10) - 5, Math.floor(i / 10) - 5, 0)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [count])

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <cylinderGeometry args={[0.2, 0.2, 1, 32]} />
      <meshStandardMaterial color="#1C1C1E" metalness={0.1} roughness={0.8} />
    </instancedMesh>
  )
}
```

Single draw call for 100+ objects. Per Design Constitution: "Instancing, LOD, texture compression mandatory."

---

## 5. Post-Processing for Chrome / Clinical Aesthetic

### 5.1 `@react-three/postprocessing` Setup

```tsx
import {
  EffectComposer,
  Bloom,
  SSAO,
  Vignette,
  Noise,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

function Effects() {
  return (
    <EffectComposer multisampling={4}>
      <SSAO
        blendFunction={BlendFunction.MULTIPLY}
        samples={16}
        radius={0.08}
        intensity={30}
        distanceScaling={false}
        luminanceInfluence={0.6}
      />
      <Bloom
        mipmapBlur
        luminanceThreshold={1}
        luminanceSmoothing={0.025}
        intensity={0.6}
      />
      <Noise opacity={0.02} blendFunction={BlendFunction.NORMAL} />
      <Vignette
        offset={0.35}
        darkness={0.35}
        eskil={false}
      />
    </EffectComposer>
  )
}
```

### 5.2 Bloom on Chrome Edges Only

**Use `Bloom` (not `SelectiveBloom`)** in 2025-2026. SelectiveBloom has known GPU memory allocation issues on recent `postprocessing` versions (confirmed issue #344 in pmndrs/react-postprocessing).

Instead, control bloom **on the material** via `toneMapped={false}` and `emissiveIntensity`:

```tsx
// For chrome highlight edges, bake emissive into the model or use a subtle shader
<meshStandardMaterial
  color="#C0C0C0"
  metalness={0.9}
  roughness={0.2}
  // No emissive = no bloom. Bloom is driven by luminanceThreshold > 1
/>
```

With `luminanceThreshold={1}` in Bloom, **nothing blooms unless a material exceeds 0-1 range**. This is the correct clinical approach: only specular highlights that clip into HDR values get bloom.

**If you need selective control**, set `toneMapped={false}` on objects that *should* bloom and keep default on others:

```tsx
// This object WILL bloom because its reflected light can exceed luminance 1
<meshPhysicalMaterial
  color="#FFFFFF"
  emissive="#E8E8E8"
  emissiveIntensity={0.3}   // Subtle rim glow
  toneMapped={false}         // Allows >1 values through
  metalness={1}
  roughness={0.1}
/>
```

### 5.3 SSAO for Depth on Light Backgrounds

SSAO is **critical** for DEFACT's white-background chrome. Without contact shadows, edges disappear.

Settings tuned for clinical aesthetic:

```tsx
<SSAO
  blendFunction={BlendFunction.MULTIPLY}
  samples={16}               // 16 is the sweet spot for quality/perf
  radius={0.08}              // Small radius: tight contact detail
  intensity={30}            // Multiply blend: subtle, not muddy
  distanceThreshold={1}
  distanceFalloff={0.15}
  rangeThreshold={0.5}
  rangeFalloff={0.05}
  luminanceInfluence={0.6}  // Less AO on bright reflective surfaces
  depthAwareUpsampling={true}
/>
```

**Trade-off:** SSAO adds ~0.5-1ms per frame. On M1 MacBook Air at 60fps (16.6ms budget), this is acceptable.

### 5.4 Vignette: Yes or No for Clinical Aesthetic?

**Verdict: YES, but extremely subtle.**

A clinical archive feels "viewed through a lens" — the vignette mimics the optical falloff of a high-end camera lens or gallery spotlighting.

```tsx
<Vignette
  offset={0.35}     // Wide: only corners affected
  darkness={0.35}   // Very gentle: 35% darkness at edge
  eskil={false}      // FALSE: standard circular vignette
  blendFunction={BlendFunction.NORMAL}
/>
```

**NOT recommended:**
- `offset < 0.2` (heavy, Instagram-like)
- `darkness > 0.6` (cluttered, contradicts restraint)
- `eskil={true}` (anisotropic, more cinematic than clinical)

### 5.5 Final Post-Processing Stack for DEFACT

```tsx
<EffectComposer multisampling={4}>
  {/* 1. Subtle contact shadow depth */}
  <SSAO
    blendFunction={BlendFunction.MULTIPLY}
    samples={16}
    radius={0.08}
    intensity={30}
    luminanceInfluence={0.6}
  />

  {/* 2. Micro film grain (matches CSS grain overlay thesis) */}
  <Noise opacity={0.015} blendFunction={BlendFunction.NORMAL} />

  {/* 3. Specular highlight bloom ONLY */}
  <Bloom
    mipmapBlur
    luminanceThreshold={1}
    luminanceSmoothing={0.025}
    intensity={0.6}
  />

  {/* 4. Optical falloff — clinical lens quality */}
  <Vignette offset={0.35} darkness={0.35} eskil={false} />
</EffectComposer>
```

---

## 6. Next.js 14+ App Router Integration

### 6.1 Mandatory Pattern: Dynamic Import + SSR Disabled

R3F requires `window` and `document`. In the App Router, **all R3F components must be client components imported dynamically**:

```tsx
// app/page.tsx — Server Component (no 'use client')
import dynamic from 'next/dynamic'

const SceneCanvas = dynamic(
  () => import('@/components/SceneCanvas'),  // This file has 'use client'
  { ssr: false }
)

export default function HomePage() {
  return (
    <main>
      <SceneCanvas />
    </main>
  )
}
```

```tsx
// components/SceneCanvas.tsx — Client Component
'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Environment, ContactShadows } from '@react-three/drei'
import { EffectComposer, SSAO, Bloom, Vignette, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export default function SceneCanvas() {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.5, 4], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        {/* 3D content */}
      </Suspense>
    </Canvas>
  )
}
```

### 6.2 TypeScript Strict Without `any`

Follow DEFACT's TS strict rule. Common R3F types:

```tsx
import type { ThreeElements } from '@react-three/fiber'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { EffectComposer as EffectComposerImpl } from 'postprocessing'
import { useRef } from 'react'
import * as THREE from 'three'

function ArtifactMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry />
      <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
    </mesh>
  )
}
```

### 6.3 Performance Budget Enforcement

Per Design Constitution: "60fps on M1 MacBook Air."

```tsx
<Canvas
  frameloop="demand"
  dpr={[1, 1.5]}
  performance={{ min: 0.5 }}
  gl={{
    powerPreference: 'high-performance',
    antialias: true,
    alpha: true,
  }}
>
```

Monitor with `@react-three/drei` `<Stats>` or `renderer.info` in dev:

```tsx
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

function PerfMonitor() {
  const gl = useThree((state) => state.gl)
  useEffect(() => {
    const id = setInterval(() => {
      console.log('calls:', gl.info.render.calls, 'triangles:', gl.info.render.triangles)
    }, 2000)
    return () => clearInterval(id)
  }, [gl])
  return null
}
```

---

## 7. Asset Pipeline Summary

| Step | Tool | Output |
|------|------|--------|
| Model → GLB | Blender (Draco, 14-bit pos) | `*.glb` |
| Texture → compressed | `gltf-transform uastc/ktx2` | `*.ktx2` |
| GLB → optimized | `gltf-transform optimize` | `final.glb` (Draco + KTX2) |
| Font loading | `next/font` or CSS `@font-face` | Clash Grotesk, DM Mono |
| Env map | `pmndrs/assets` presets or custom HDR | `.hdr` in `/public/env/` |
| Draco WASM | `three/examples/jsm/libs/draco` | `/public/draco/` |
| Basis WASM | `three/examples/jsm/libs/basis` | `/public/basis/` |

---

## 8. Anti-Patterns to Avoid

Per DEFACT Design Constitution, these are **banned**:

- ❌ `Suspense` without a meaningful fallback (violates archival ritual)
- ❌ `meshBasicMaterial` for anything lit (looks cheap, violates precision)
- ❌ Continuous `frameloop="always"` on static hero sections (violates performance budget)
- ❌ `toneMapped={false}` on all materials (excessive bloom, violates restraint)
- ❌ Dark vignette (`darkness > 0.6`) or `eskil={true}` (too cinematic, violates clinical)
- ❌ `Environment preset="sunset"` or `"dawn"` (warm colors violate "cooled concrete gallery")
- ❌ No `ssr: false` on dynamic R3F imports (Next.js crash)
- ❌ `any` TypeScript types (violates strict rule)

---

## Sources

- R3F Performance Docs: https://r3f.docs.pmnd.rs/advanced/scaling-performance
- Drei ScrollControls Docs: https://drei.docs.pmnd.rs/controls/scroll-controls
- React Postprocessing Docs: https://react-postprocessing.docs.pmnd.rs/
- PMNDRS GitHub Repositories (drei, react-three-fiber, react-postprocessing)
- Three.js Material Docs: https://threejs.org/docs/pages/MeshPhysicalMaterial.html
- Khronos KTX2/Basis Universal Spec: https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_texture_basisu
- Production examples: Uniswap, Guild.xyz, TanStack (useGLTF.preload patterns)

---

*Report generated for DEFACT agent protocol. All tokens and patterns validated against `/shared/DESIGN.md` brand constitution.*
