"use client";

export default function WorksSection() {
  const products = [
    { idx: "00.01", name: "STARMIRROR", cat: "Collectible", desc: "A mirror. A relic. A charm.", status: "Available", statusColor: "#A0A0A0" },
    { idx: "00.02", name: "PHYLACTERY", cat: "Capsule", desc: "Wearable container with glass core.", status: "Available", statusColor: "#A0A0A0" },
    { idx: "00.03", name: "TIARA", cat: "Headpiece", desc: "Transforming headpiece.", status: "SOLD OUT", statusColor: "#D0403B" },
  ];

  return (
    <section
      id="works"
      className="relative py-40 px-8 md:px-[15vw] overflow-hidden animate-section"
      style={{ background: "rgba(13,13,13,0.75)" }}
    >
      <video className="video-bg parallax-bg" src="/assets/video-product-1.mp4" autoPlay muted loop playsInline style={{ opacity: 0.15 }} />
      <div className="video-overlay bg-black/60" />

      <div className="video-content max-w-7xl mx-auto stagger-children">
        {products.map((p) => (
          <div key={p.idx} className="group py-6 border-b border-[#D5D5D5] cursor-pointer transition-colors duration-300 hover:bg-[#E8E8E8]">
            <div className="flex flex-row items-center gap-4 md:gap-8">
              <span className="text-xs flex-shrink-0 w-12" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}>
                {p.idx}
              </span>
              <span className="text-xl md:text-2xl transition-transform duration-300 group-hover:translate-x-2" style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}>
                {p.name}
              </span>
              <div className="flex items-center gap-4 md:gap-6 ml-auto">
                <span className="text-xs italic hidden md:inline" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}>
                  {p.cat}
                </span>
                <span className="text-xs flex-shrink-0" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: p.statusColor }}>
                  {p.status}
                </span>
              </div>
            </div>
            <div className="mt-2 pl-[calc(2rem+8px)] md:pl-0">
              <p className="text-xs md:text-sm" style={{ fontFamily: "var(--font-body), 'Inter', sans-serif", color: "#9A9A9A" }}>
                {p.desc}
              </p>
            </div>
            <div className="mt-1 pl-[calc(2rem+8px)] md:hidden flex items-center gap-4">
              <span className="text-xs italic" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}>
                {p.cat}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
