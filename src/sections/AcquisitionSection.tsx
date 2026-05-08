export default function AcquisitionSection() {
  return (
    <section id="acquisition" data-theme="dark" className="relative min-h-screen py-32 bg-void overflow-hidden">
      {/* Marquee */}
      <div className="border-y border-border-dark py-6 mb-24 overflow-hidden">
        <div className="marquee-track">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="font-clash text-h2 tracking-tight text-signal/10 mx-8 whitespace-nowrap">
              CLAIM YOUR ARTIFACT — LIMITED EDITION — MINT NOW —
            </span>
          ))}
        </div>
      </div>

      <div className="gc-g">
        <div className="flex items-baseline gap-4 mb-16 reveal-up">
          <span className="font-dm-mono text-micro tracking-mono text-steel/50">[04/06]</span>
          <h2 className="font-clash text-h2 tracking-tight text-signal">04 — ACQUISITION</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal-up">
            <p className="font-clash text-h1 tracking-tight leading-[0.9] text-signal mb-8">
              SECURE<br />
              <span className="liquid-text">YOUR</span><br />
              ARTIFACT
            </p>
            <p className="font-inter text-body text-steel max-w-md mb-8">
              Each piece is produced in strictly limited editions. Once minted, the algorithm retires — no duplicates, no reproductions.
            </p>
            <button
              className="font-dm-mono text-micro tracking-mono uppercase px-8 py-4 border border-slime text-slime hover:bg-slime hover:text-void transition-all duration-300"
              data-cursor-hover
            >
              [INITIATE ACQUISITION →]
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 reveal-scale">
            {[
              { label: "EDITION SIZE", value: "50" },
              { label: "MINTED", value: "12" },
              { label: "FLOOR PRICE", value: "€1,800" },
              { label: "CHAIN", value: "ETH" },
            ].map((stat) => (
              <div key={stat.label} className="vault-card p-6">
                <span className="font-dm-mono text-micro tracking-mono text-steel block mb-2">
                  [{stat.label}]
                </span>
                <span className="font-clash text-h2 tracking-tight text-signal">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
