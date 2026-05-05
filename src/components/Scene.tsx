"use client";

import { Suspense, ReactNode, useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { ShaderPlane } from "./HeroShader";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

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

// Mouse tracking for HeroShader — shared via state in parent
function HeroMouseTracker({ mousePos }: { mousePos: { x: number; y: number } }) {
  const { gl } = useThree();
  const targetRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    mousePos.x += (targetRef.current.x - mousePos.x) * 0.05;
    mousePos.y += (targetRef.current.y - mousePos.y) * 0.05;
  });

  return null;
}

function HeroBackground({ mousePos }: { mousePos: { x: number; y: number } }) {
  return (
    <group>
      <ShaderPlane mousePos={mousePos} />
    </group>
  );
}

export default function Scene({ children }: { children?: ReactNode }) {
  const [mousePos] = useState({ x: 0.5, y: 0.5 });
  return (
    <div className="fixed inset-0 z-0" style={{ touchAction: "none" }}>
      <CanvasErrorBoundary>
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
          <HeroMouseTracker mousePos={mousePos} />

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, -5]} intensity={0.8} color="#FFFFFF" />
          <directionalLight position={[-3, 2, -5]} intensity={0.4} color="#E8E8FF" />
          <pointLight position={[0, 3, 2]} intensity={0.5} color="#FFFFFF" />

          {/* Studio environment for chrome reflections */}
          <Environment preset="studio" environmentIntensity={2} />

          {/* Hero shader background */}
          <Suspense fallback={<LoadingFallback />}>
            <HeroBackground mousePos={mousePos} />
            {children}
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
