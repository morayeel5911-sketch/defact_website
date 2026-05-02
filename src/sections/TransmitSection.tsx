"use client";

export default function TransmitSection() {
  const fields = [
    { label: "NAME", type: "text", placeholder: "Your name" },
    { label: "EMAIL", type: "email", placeholder: "your@email.com" },
    { label: "ARTIFACT", type: "text", placeholder: "Which piece interests you?" },
  ];

  return (
    <section id="transmit" className="relative py-40 px-8 md:px-[15vw] overflow-hidden animate-section" style={{ background: "rgba(245,245,245,0.85)" }}>
      <video className="video-bg parallax-bg" src="/assets/video-contact.mp4" autoPlay muted loop playsInline />
      <div className="video-overlay bg-black/50" />

      <div className="video-content max-w-[42rem]">
        <div className="mb-8 flex items-center gap-4">
          <span className="text-xs" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "rgba(255,255,255,0.6)" }}>[05]</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-16" style={{ fontFamily: "var(--font-display), 'Clash Grotesk', sans-serif", color: "#FFFFFF", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>TRANSMIT</h2>

        <form className="space-y-8">
          {fields.map((f) => (
            <div key={f.label}>
              <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em" }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} className="w-full bg-white/90" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace" }} />
            </div>
          ))}
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em" }}>MESSAGE</label>
            <textarea placeholder="Describe your interest or inquiry..." rows={4} className="w-full resize-none bg-white/90" style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace" }} />
          </div>
          <button
            type="submit"
            className="w-full py-4 uppercase tracking-wider transition-colors duration-300 hover:bg-[#A0A0A0]"
            style={{ fontFamily: "var(--font-mono), 'DM Mono', monospace", background: "#FFFFFF", color: "#0D0D0D" }}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </section>
  );
}
