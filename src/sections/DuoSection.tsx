"use client";

export default function DuoSection() {
  return (
    <section
      className="relative py-40 px-8 md:px-[15vw] overflow-hidden animate-section"
      style={{ background: "rgba(245,245,245,0.85)" }}
    >
      <video className="video-bg parallax-bg" src="/assets/video-about.mp4" autoPlay muted loop playsInline style={{ opacity: 0.25 }} />
      <div className="video-overlay bg-black/40" />

      <div className="video-content max-w-7xl mx-auto stagger-children">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 flex flex-col gap-8">
            {[
              { name: "LYAHUASCA", role: "ART DIRECTION / PRODUCT DEVELOPMENT / 3D VISUALS" },
              { name: "MIKI.NGLO", role: "3D PRINTING / GRAPHIC DESIGN / WEB DEVELOPMENT" }
            ].map((person) => (
              <div key={person.name} className="flex flex-col">
                <div className="aspect-[3/4] max-h-[300px] md:max-h-none overflow-hidden relative flex items-center justify-center"
                  style={{ background: "linear-gradient(180deg, #0f1d30 0%, #0A1628 100%)" }}
                >
                  <span className="absolute text-center opacity-10 select-none"
                    style={{
                      fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif",
                      fontSize: "clamp(2rem, 8vw, 5rem)",
                      fontWeight: 700,
                      color: "#A0A0A0",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {person.name}
                  </span>
                  <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  <div className="absolute inset-0 opacity-[0.02]"
                    style={{
                      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                    }}
                  />
                </div>
                <p className="mt-4 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#0D0D0D" }}>
                  {person.name}
                </p>
              </div>
            ))}
          </div>

          <div className="md:col-span-3 flex flex-col justify-center space-y-12">
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}>
                LYAHUASCA
              </p>
              <p className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#0D0D0D" }}>
                ART DIRECTION / PRODUCT DEVELOPMENT / 3D VISUALS
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}>
                MIKI.NGLO
              </p>
              <p className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#0D0D0D" }}>
                3D PRINTING / GRAPHIC DESIGN / WEB DEVELOPMENT
              </p>
            </div>
            <p className="text-xs mt-8" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}>
              [PROCESS DOCUMENTATION AVAILABLE UPON REQUEST]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
