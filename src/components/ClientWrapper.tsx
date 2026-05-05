"use client";

import { useEffect } from "react";
import { initLenis, destroyLenis } from "@/lib/lenis";

import { useState, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollEffects from "@/components/ScrollEffects";
import CustomCursor from "@/components/CustomCursor";
import AmbientSound from "@/components/AmbientSound";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);
  const handleDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <LoadingScreen onDone={handleDone} />
      <ScrollProgress />
      <ScrollEffects />
      <CustomCursor />
      <AmbientSound />
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}>
        {children}
      </div>
    </>
  );
}
