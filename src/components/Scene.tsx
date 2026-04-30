"use client";

import { Suspense, ReactNode, useEffect, useRef, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, Lightformer } from "@react-three/drei";
import * as THREE from "three";

// Memoize to prevent re-creation
const EMPTY_ARRAY: never[] = [];

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#C8C8C8" wireframe />
    </mesh>
  );
}

function ScrollInvalidate() {
  const { invalidate } = useThree();

  useEffect(() => {
    const handleScroll = () => {
      invalidate();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [invalidate]);

  return null;
}

// Custom studio environment with light sources for better chrome reflections
function StudioEnvironment() {
  return (
    <Environment preset="studio" environmentIntensity={2.5}>
      {/* Key light - warm from upper right */}
      <Lightformer
        intensity={2}
        rotation={[0, Math.PI / 4, 0]}
        position={[5, 5, -5]}
        scale={[10, 5, 1]}
        color="#FFFFFF"
      />
      {/* Fill light - cool from left */}
      <Lightformer
        intensity={0.8}
        rotation={[0, -Math.PI / 3, 0]}
        position={[-5, 3, -2]}
        scale={[8, 4, 1]}
        color="#E8E8FF"
      />
      {/* Rim light - subtle back glow */}
      <Lightformer
        intensity={0.5}
        rotation={[0, Math.PI, 0]}
        position={[0, 2, -8]}
        scale={[15, 3, 1]}
        color="#F0F0FF"
      />
      {/* Floor light - subtle uplight for chrome underside */}
      <Lightformer
        intensity={0.3}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        scale={[10, 10, 1]}
        color="#FFFFFF"
      />
    </Environment>
  );
}

export default function Scene({ children }: { children?: ReactNode }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <ScrollInvalidate />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, -5]}
        intensity={0.8}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 2, -5]} intensity={0.4} color="#E8E8FF" />
      <pointLight position={[0, 3, 2]} intensity={0.5} color="#FFFFFF" />

      {/* Studio environment with lightformers for chrome reflections */}
      <StudioEnvironment />

      {/* Contact shadows - sharper for clinical feel */}
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.25}
        scale={6}
        blur={1}
        far={4}
        color="#888888"
      />

      {/* 3D Content */}
      <Suspense fallback={<LoadingFallback />}>
        {children}
      </Suspense>

      {/* REMOVED: EffectComposer - causes silent crashes on some GPU configurations */}
      {/* TODO: Re-enable postprocessing once stability is confirmed */}
    </Canvas>
  );
}