"use client";

export default function FooterSection() {
  return (
    <footer className="relative py-6 px-8 md:px-[15vw] overflow-hidden" style={{ background: "var(--void)" }}>
      <video className="video-bg parallax-bg" src="/assets/video-footer.mp4" autoPlay muted loop playsInline style={{ opacity: 0.4 }} />
      <div className="video-overlay bg-black/30" />

      <div className="video-content flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-xs" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#FFFFFF", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>
          DEFACT © 2026
        </div>
        <div className="text-xs" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "rgba(255,255,255,0.7)", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>
          COLOGNE, GERMANY
        </div>
        <div className="text-xs" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "rgba(255,255,255,0.7)", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>
          ARCHIVE
        </div>
      </div>
    </footer>
  );
}
