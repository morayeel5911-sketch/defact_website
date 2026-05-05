"use client";

import React, { useRef, useEffect, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Variant = "chrome" | "matte" | "dark";

interface ProductModelProps {
  modelPath?: string;
  position?: [number, number, number];
  scale?: number;
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

// Simple loading placeholder
function LoadingFallback({ variant = "chrome" }: { variant?: Variant }) {
  const groupRef = useRef<THREE.Group>(null);
  const matProps = variantMaterials[variant];

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.005;
    const breath = 1 + Math.sin(state.clock.elapsedTime * Math.PI * 0.4) * 0.008;
    groupRef.current.scale.setScalar(breath * 0.7);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />
        <meshPhysicalMaterial
          color={matProps.color}
          roughness={matProps.roughness}
          metalness={matProps.metalness}
          envMapIntensity={matProps.envMapIntensity}
          clearcoat={matProps.clearcoat}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// Real GLB model loader
function GLBModel({ modelPath = "/models/starmirror.glb", scale = 1, variant = "chrome" }: ProductModelProps) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const scrollRef = useRef({ progress: 0 });
  const matProps = variantMaterials[variant];

  // Set Draco decoder path (must be called after mount, not at module level)
  useEffect(() => {
    // Only runs in browser — setDecoderPath must be called before first model load
    if (typeof window !== "undefined") {
      useGLTF.setDecoderPath('/draco/');
    }
  }, []);

  // GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined" || !document.body) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => { scrollRef.current.progress = self.progress; },
      });
    });
    return () => ctx.revert();
  }, []);

  // GPU memory cleanup on unmount
  useEffect(() => {
    return () => {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.geometry) {
            mesh.geometry.dispose();
          }
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else {
              mesh.material.dispose();
            }
          }
        }
      });
      // Clear the GLTF cache so the same path can be re-used without stale state
      useGLTF.clear(modelPath);
    };
  }, [scene, modelPath]);

  // Apply materials
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material.dispose();
          }
        }
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
    const sp = scrollRef.current.progress;

    innerRef.current.rotation.y = THREE.MathUtils.lerp(
      innerRef.current.rotation.y, sp * Math.PI * 0.67, 0.08
    );
    innerRef.current.rotation.x = THREE.MathUtils.lerp(
      innerRef.current.rotation.x, sp * Math.PI * 0.083, 0.06
    );

    const parallaxY = Math.sin(sp * Math.PI) * 0.12;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y, parallaxY, 0.1
    );

    const breath = 1 + Math.sin(state.clock.elapsedTime * Math.PI * 0.4) * 0.008;
    innerRef.current.scale.setScalar(breath * scale);
  });

  // Auto-center
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const normalizedScale = 1.8 / maxDim;
    scene.position.sub(center);
    scene.scale.setScalar(normalizedScale);
    scene.position.y += size.y * normalizedScale * 0.5;
  }, [scene]);

  return (
    <group ref={groupRef}>
      <group ref={innerRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

// Error boundary
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
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default function ProductModel({
  modelPath = "/models/starmirror.glb",
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  variant = "chrome",
}: ProductModelProps) {
  return (
    <group position={position}>
      <Suspense fallback={<LoadingFallback variant={variant} />}>
        <ModelErrorBoundary fallback={<LoadingFallback variant={variant} />}>
          <GLBModel modelPath={modelPath} scale={scale} variant={variant} />
        </ModelErrorBoundary>
      </Suspense>
    </group>
  );
}
