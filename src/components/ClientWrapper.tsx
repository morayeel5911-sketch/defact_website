"use client";

import { useEffect } from "react";
import { initLenis, destroyLenis } from "@/lib/lenis";
import ScrollEffects from "@/components/ScrollEffects";
import AmbientSound from "@/components/AmbientSound";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  return (
    <>
      <ScrollEffects />
      <AmbientSound />
      {children}
    </>
  );
}
