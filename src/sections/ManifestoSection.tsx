"use client";

export default function ManifestoSection() {
  return (
    <section
      className="relative py-40 px-8 md:px-[15vw] animate-section"
      style={{ background: "rgba(240,240,232,0.75)" }}
    >
      <div className="max-w-[42rem] ml-[8vw] md:ml-[15vw]">
        <p
          className="leading-[1.35]"
          style={{
            fontFamily: "var(--font-quote), 'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
            color: "#0D0D0D"
          }}
        >
          Cuts through glare and bullshit. Protect and reflect.
        </p>
        <div
          className="mt-12 uppercase tracking-widest"
          style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", fontSize: "0.7rem", color: "#9A9A9A", letterSpacing: "0.08em" }}
        >
          — STARMIRROR MANIFESTO
        </div>
      </div>
    </section>
  );
}
