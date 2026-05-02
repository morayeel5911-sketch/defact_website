"use client";

export default function ProcessSection() {
  const chapters = [
    { num: "[01]", title: "CONCEPTION", desc: "Every artifact begins as a thought. A meditation on form, function, and the relationship between object and owner." },
    { num: "[02]", title: "FABRICATION", desc: "3D-printed in PLA, hand-sanded and spray-painted — each piece finished with care and edge." },
    { num: "[03]", title: "FINITION", desc: "Chrome-electroplated, 3D-printed in resin. Hand-polished. No two pieces identical." },
  ];

  return (
    <section id="process" className="relative py-40 px-8 md:px-[15vw] animate-section" style={{ background: "rgba(240,240,240,0.75)" }}>
      <div className="max-w-[42rem] ml-[8vw] md:ml-[15vw] mr-[8vw] md:mr-0 stagger-children">
        <div className="mb-16 flex items-center gap-4">
          <span className="text-xs" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}>[04]</span>
          <h2 className="text-3xl md:text-4xl font-semibold" style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}>PROCESS</h2>
        </div>

        {chapters.map((c) => (
          <div key={c.num} className="mb-32 last:mb-0">
            <span className="text-xs block mb-4" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "#A0A0A0" }}>{c.num}</span>
            <h3 className="text-2xl mb-4" style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#0D0D0D" }}>{c.title}</h3>
            <p className="text-lg leading-relaxed" style={{ fontFamily: "var(--font-body), 'Inter', sans-serif", color: "#9A9A9A" }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
