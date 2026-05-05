"use client";

import { useEffect, useState, useCallback } from "react";
import { initLenis, destroyLenis } from "@/lib/lenis";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollEffects from "@/components/ScrollEffects";
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
      <ScrollEffects />
      <AmbientSound />
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}>
        {children}
      </div>
    </>
  );
}
