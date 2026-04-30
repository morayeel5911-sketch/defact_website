"use client";

import React, { useRef, useEffect, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin once at module load
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Component to set Draco decoder path before any model loads
function EffectComposerBeforeLoad() {
  useEffect(() => {
    useGLTF.setDecoderPath('/draco/');
  }, []);
  return null;
}

type Variant = "chrome" | "matte" | "dark";

interface ProductModelProps {
  modelPath?: string;
  position?: [number, number, number];
  scale?: number;
  material?: "transmission" | "standard";
  variant?: Variant;
}

const variantMaterials = {
  chrome: {
    color: "#C8C8C8",
    metalness: 1.0,
    roughness: 0.05,
    envMapIntensity: 2.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  },
  matte: {
    color: "#1C1C1E",
    metalness: 0.1,
    roughness: 0.8,
    envMapIntensity: 0.5,
    clearcoat: 0,
    clearcoatRoughness: 0.5,
  },
  dark: {
    color: "#0D0D0D",
    metalness: 0.3,
    roughness: 0.4,
    envMapIntensity: 1.0,
    clearcoat: 0.2,
    clearcoatRoughness: 0.3,
  },
};

// Real GLB model loader
function GLBModel({ modelPath = "/models/starmirror.glb", scale = 1, variant = "chrome" }: { modelPath?: string; scale?: number; variant?: Variant }) {
  // Set Draco decoder path BEFORE useGLTF call
  useGLTF.setDecoderPath('/draco/');
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const scrollRef = useRef({ progress: 0 });
  const matProps = variantMaterials[variant];

  // GSAP ScrollTrigger for smooth scroll tracking - guard for client-side only
  useEffect(() => {
    if (typeof window === "undefined" || !document.body) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          scrollRef.current.progress = self.progress;
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Apply material to all meshes in the loaded scene
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          // Dispose old materials
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material.dispose();
          }
        }
        // Apply variant material
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(matProps.color),
          metalness: matProps.metalness,
          roughness: matProps.roughness,
          envMapIntensity: matProps.envMapIntensity,
          clearcoat: matProps.clearcoat,
          clearcoatRoughness: matProps.clearcoatRoughness,
        });
      }
    });
  }, [scene, variant, matProps]);

  useFrame((state) => {
    if (!innerRef.current || !groupRef.current) return;

    const scrollProgress = scrollRef.current.progress;

    // Scroll-driven Y rotation - 120 degrees over full page scroll
    const targetRotationY = scrollProgress * Math.PI * 0.67;
    innerRef.current.rotation.y = THREE.MathUtils.lerp(
      innerRef.current.rotation.y,
      targetRotationY,
      0.08
    );

    // Scroll-driven X tilt - subtle 15 degree tilt
    const targetRotationX = scrollProgress * Math.PI * 0.083;
    innerRef.current.rotation.x = THREE.MathUtils.lerp(
      innerRef.current.rotation.x,
      targetRotationX,
      0.06
    );

    // Parallax - object rises then sinks
    const parallaxY = Math.sin(scrollProgress * Math.PI) * 0.12;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      parallaxY,
      0.1
    );

    // Subtle breathing scale pulse
    const breathPhase = (state.clock.elapsedTime * Math.PI * 2) / 5;
    const breathScale = 1 + Math.sin(breathPhase) * 0.008;
    const finalScale = breathScale * scale;
    innerRef.current.scale.setScalar(finalScale);
  });

  // Auto-center the model
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const normalizedScale = 1.8 / maxDim; // Fit in ~1.8 unit box

    scene.position.sub(center);
    scene.scale.setScalar(normalizedScale);
    scene.position.y += size.y * normalizedScale * 0.5; // Lift to sit on ground
  }, [scene]);

  return (
    <group ref={groupRef}>
      <group ref={innerRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

// Placeholder fallback
function PlaceholderGeometry({ scale = 1, variant = "chrome" }: { scale?: number; variant?: Variant }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const scrollRef = useRef({ progress: 0 });
  const matProps = variantMaterials[variant];

  useEffect(() => {
    if (typeof window === "undefined" || !document.body) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          scrollRef.current.progress = self.progress;
        },
      });
    });
    return () => ctx.revert();
  }, []);

  useFrame((state) => {
    if (!innerRef.current || !groupRef.current) return;

    const scrollProgress = scrollRef.current.progress;

    const targetRotationY = scrollProgress * Math.PI * 0.67;
    innerRef.current.rotation.y = THREE.MathUtils.lerp(innerRef.current.rotation.y, targetRotationY, 0.08);
    const targetRotationX = scrollProgress * Math.PI * 0.083;
    innerRef.current.rotation.x = THREE.MathUtils.lerp(innerRef.current.rotation.x, targetRotationX, 0.06);

    const parallaxY = Math.sin(scrollProgress * Math.PI) * 0.12;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, parallaxY, 0.1);

    const breathPhase = (state.clock.elapsedTime * Math.PI * 2) / 5;
    const breathScale = 1 + Math.sin(breathPhase) * 0.008;
    innerRef.current.scale.setScalar(breathScale * scale * 0.7);
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRef} scale={scale * 0.7}>
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />
          <meshPhysicalMaterial color={matProps.color} roughness={matProps.roughness} metalness={matProps.metalness} envMapIntensity={matProps.envMapIntensity} clearcoat={matProps.clearcoat} clearcoatRoughness={matProps.clearcoatRoughness} />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.65, 0.65, 0.15, 32]} />
          <meshPhysicalMaterial color={matProps.color} roughness={matProps.roughness} metalness={matProps.metalness} envMapIntensity={matProps.envMapIntensity} clearcoat={matProps.clearcoat} clearcoatRoughness={matProps.clearcoatRoughness} />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
          <meshPhysicalMaterial color={matProps.color} roughness={matProps.roughness} metalness={matProps.metalness} envMapIntensity={matProps.envMapIntensity} clearcoat={matProps.clearcoat} clearcoatRoughness={matProps.clearcoatRoughness} />
        </mesh>
        <mesh position={[0, -0.75, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.1, 32]} />
          <meshPhysicalMaterial color={matProps.color} roughness={matProps.roughness + 0.1} metalness={Math.max(0, matProps.metalness - 0.1)} envMapIntensity={matProps.envMapIntensity * 0.8} clearcoat={Math.max(0, matProps.clearcoat - 0.2)} clearcoatRoughness={matProps.clearcoatRoughness + 0.2} />
        </mesh>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.55, 0, Math.sin(angle) * 0.55]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[0.12, 0.8, 0.05]} />
              <meshPhysicalMaterial color={matProps.color} roughness={matProps.roughness} metalness={matProps.metalness} envMapIntensity={matProps.envMapIntensity} clearcoat={matProps.clearcoat} clearcoatRoughness={matProps.clearcoatRoughness} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Error boundary for GLB loading - uses React class-based error boundary
class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Loading state component with subtle animation
function LoadingState({ variant = "chrome" }: { variant?: Variant }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const matProps = variantMaterials[variant];

  useFrame((state) => {
    if (!innerRef.current || !groupRef.current) return;
    // Slow rotation to indicate loading
    innerRef.current.rotation.y += 0.005;
    // Subtle breathing
    const breathPhase = (state.clock.elapsedTime * Math.PI * 2) / 5;
    const breathScale = 1 + Math.sin(breathPhase) * 0.008;
    innerRef.current.scale.setScalar(breathScale * 0.7);
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRef} scale={0.7}>
        {/* Motor shape placeholder */}
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />
          <meshPhysicalMaterial
            color={matProps.color}
            roughness={matProps.roughness}
            metalness={matProps.metalness}
            envMapIntensity={matProps.envMapIntensity}
            clearcoat={matProps.clearcoat}
            clearcoatRoughness={matProps.clearcoatRoughness}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.65, 0.65, 0.15, 32]} />
          <meshPhysicalMaterial
            color={matProps.color}
            roughness={matProps.roughness}
            metalness={matProps.metalness}
            envMapIntensity={matProps.envMapIntensity}
            clearcoat={matProps.clearcoat}
            clearcoatRoughness={matProps.clearcoatRoughness}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
          <meshPhysicalMaterial
            color={matProps.color}
            roughness={matProps.roughness}
            metalness={matProps.metalness}
            envMapIntensity={matProps.envMapIntensity}
            clearcoat={matProps.clearcoat}
            clearcoatRoughness={matProps.clearcoatRoughness}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh position={[0, -0.75, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.1, 32]} />
          <meshPhysicalMaterial
            color={matProps.color}
            roughness={matProps.roughness + 0.1}
            metalness={Math.max(0, matProps.metalness - 0.1)}
            envMapIntensity={matProps.envMapIntensity * 0.8}
            clearcoat={Math.max(0, matProps.clearcoat - 0.2)}
            clearcoatRoughness={matProps.clearcoatRoughness + 0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.55, 0, Math.sin(angle) * 0.55]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[0.12, 0.8, 0.05]} />
              <meshPhysicalMaterial
                color={matProps.color}
                roughness={matProps.roughness}
                metalness={matProps.metalness}
                envMapIntensity={matProps.envMapIntensity}
                clearcoat={matProps.clearcoat}
                clearcoatRoughness={matProps.clearcoatRoughness}
                transparent
                opacity={0.7}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default function ProductModel({
  modelPath = "/models/starmirror.glb",
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  material = "standard",
  variant = "chrome",
}: ProductModelProps) {
  // Use LoadingState as Suspense fallback for better UX during loading
  const loadingFallback = <LoadingState variant={variant} />;

  return (
    <group position={position}>
      {/* Set decoder path once before Suspense */}
      <EffectComposerBeforeLoad />
      <Suspense fallback={loadingFallback}>
        <ModelErrorBoundary fallback={<LoadingState variant={variant} />}>
          <GLBModel modelPath={modelPath} scale={scale} variant={variant} />
        </ModelErrorBoundary>
      </Suspense>
    </group>
  );
}