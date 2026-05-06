"use client";

import { LenisProvider } from "@/providers/LenisProvider";
import ScrollEffects from "@/components/ScrollEffects";
import AmbientSound from "@/components/AmbientSound";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <ScrollEffects />
      <AmbientSound />
      {children}
    </LenisProvider>
  );
}
