"use client";

export default function AcquisitionSection() {
  const items = [
    { idx: "001", name: "STARMIRROR", sub: "COLLECTIBLE", material: "PLA, Spray-painted", status: "Available", statusColor: "#A0A0A0" },
    { idx: "002", name: "PHYLACTERY", sub: "CAPSULE", material: "Resin, Hand-finished", status: "Available", statusColor: "#A0A0A0" },
    { idx: "003", name: "TIARA", sub: "HEADPIECE", material: "Chrome-electroplated Resin", status: "SOLD OUT", statusColor: "#D0403B" },
  ];

  return (
    <section id="acquisition" className="relative py-40 px-8 md:px-[15vw] animate-section" style={{ background: "rgba(13,13,13,0.75)" }}>
      <div className="max-w-5xl mx-auto stagger-children">
        <div className="mb-16 flex items-center gap-4">
          <span className="text-xs" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}>[03]</span>
          <h2 className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}>ACQUISITION</h2>
        </div>

        <div className="space-y-0">
          {items.map((item) => (
            <div key={item.idx} className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-[#D5D5D5]">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-xs" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}>{item.idx}</span>
                <span className="text-xl" style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}>
                  {item.name} — {item.sub}
                </span>
              </div>
              <div className="flex items-center gap-4 md:gap-6 mt-2 md:mt-0">
                <span className="text-xs" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#9A9A9A" }}>{item.material}</span>
                <span className="text-xs" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: item.statusColor }}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
