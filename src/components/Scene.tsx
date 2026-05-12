"use client";

import { Suspense, ReactNode, useEffect, useRef, type MutableRefObject } from "react";
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
function HeroMouseTracker({
  mousePosRef,
}: {
  mousePosRef: MutableRefObject<{ x: number; y: number }>;
}) {
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
    mousePosRef.current.x += (targetRef.current.x - mousePosRef.current.x) * 0.05;
    mousePosRef.current.y += (targetRef.current.y - mousePosRef.current.y) * 0.05;
  });

  return null;
}

function HeroBackground({
  mousePosRef,
}: {
  mousePosRef: MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <group>
      <ShaderPlane mousePosRef={mousePosRef} />
    </group>
  );
}

export default function Scene({ children }: { children?: ReactNode }) {
  const mousePosRef = useRef({ x: 0.5, y: 0.5 });
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
          <HeroMouseTracker mousePosRef={mousePosRef} />

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, -5]} intensity={0.8} color="#FFFFFF" />
          <directionalLight position={[-3, 2, -5]} intensity={0.4} color="#E8E8FF" />
          <pointLight position={[0, 3, 2]} intensity={0.5} color="#FFFFFF" />

          {/* Studio environment for chrome reflections */}
          <Environment preset="studio" environmentIntensity={2} />

          {/* Hero shader background */}
          <Suspense fallback={<LoadingFallback />}>
            <HeroBackground mousePosRef={mousePosRef} />
            {children}
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
