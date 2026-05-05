"use client";

import { Suspense, ReactNode, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { HeroShaderContent } from "./HeroShader";

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

// Mouse tracking for HeroShader
function MouseTracker() {
  const { viewport } = useThree();

  useEffect(() => {
    const shaderMesh = (window as unknown as Record<string, unknown>).__heroShaderMesh as
      | THREE.Mesh
      | undefined;
    if (!shaderMesh) return;

    const mat = shaderMesh.material as THREE.ShaderMaterial;
    if (!mat.uniforms?.uMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      mat.uniforms.uMouse.value.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      );
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}

function HeroBackground() {
  const mousePos = { x: 0.5, y: 0.5 }; // Default center position
  return (
    <group>
      <HeroShaderContent mousePos={mousePos} />
    </group>
  );
}

export default function Scene({ children }: { children?: ReactNode }) {
  return (
    <div className="fixed inset-0 z-0" style={{ touchAction: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          premultipliedAlpha: false,
        }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <ScrollInvalidate />
        <MouseTracker />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, -5]} intensity={0.8} color="#FFFFFF" />
        <directionalLight position={[-3, 2, -5]} intensity={0.4} color="#E8E8FF" />
        <pointLight position={[0, 3, 2]} intensity={0.5} color="#FFFFFF" />

        {/* Studio environment for chrome reflections */}
        <Environment preset="studio" environmentIntensity={2} />

        {/* Hero shader background */}
        <Suspense fallback={<LoadingFallback />}>
          <HeroBackground />
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
