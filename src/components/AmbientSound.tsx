"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AmbientSound() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [consented, setConsented] = useState(false);
  const synthRef = useRef<any>(null);
  const ToneRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    import("tone").then((Tone) => {
      if (cancelled) return;
      ToneRef.current = Tone;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!enabled || !ToneRef.current) return;
    const Tone = ToneRef.current;

    const synth = new Tone.AMSynth({
      harmonicity: 0.5,
      modulation: { type: "sine" },
      oscillator: { type: "sine" },
      envelope: { attack: 2, decay: 1, sustain: 1, release: 6 },
      modulationEnvelope: { attack: 1, decay: 0.5, sustain: 1, release: 4 },
    }).toDestination();

    synth.volume.value = -20;
    synthRef.current = synth;

    const lfo = new Tone.LFO(0.05, -24, -16).connect(synth.volume);
    const filter = new Tone.Filter(300, "lowpass").connect(synth.output);

    let active = true;

    function breathe() {
      if (!active) return;
      const now = Tone.now();
      synth.triggerAttack("C2", now + 0.1);
      synth.triggerRelease(now + 6);
      Tone.Transport.schedule(() => {
        if (active) breathe();
      }, now + 7);
    }

    Tone.Transport.start();
    breathe();

    return () => {
      active = false;
      synth.dispose();
      lfo.dispose();
      filter.dispose();
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, [enabled]);

  useEffect(() => {
    if (pathname !== "/") {
      setConsented(false);
    }
  }, [pathname]);

  const isHomepage = pathname === "/";

  if (!isHomepage) return null;

  return (
    <>
      {!consented && (
        <button
          type="button"
          onClick={() => {
            setConsented(true);
            setEnabled(true);
          }}
          style={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 9999,
            padding: "6px 12px",
            fontSize: 12,
            color: "#fff",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 6,
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            transition: "opacity 0.3s",
          }}
          aria-label="Enable ambient sound"
        >
          Enable Sound
        </button>
      )}
    </>
  );
}
