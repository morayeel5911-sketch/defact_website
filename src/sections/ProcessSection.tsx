export default function ProcessSection() {
  return (
    <section id="process" data-theme="chrome" className="relative min-h-screen py-32 bg-chrome text-void">
      <div className="max-w-[90vw] mx-auto px-8 md:px-16">
        <div className="flex items-baseline gap-4 mb-16 reveal-up">
          <span className="font-dm-mono text-micro tracking-mono text-void/40">[05/06]</span>
          <h2 className="font-clash text-h2 tracking-tight">05 — PROCESS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-5 reveal-up">
            <p className="font-clash text-h2 tracking-tight leading-[0.95] mb-8">
              FROM BIT<br />TO MATTER
            </p>
            <div className="space-y-4 font-dm-mono text-micro tracking-mono text-void/50 mono-run">
              <p>
                0010 1101 0110 1001<br />
                PARAMETRIC_SEED: 0x4F2A<br />
                VORONOI_DENSITY: HIGH<br />
                MATERIAL: BRONZE_INFUSED_PLA<br />
                LAYER_HEIGHT: 0.12mm<br />
                INFILL: 85% GYROID<br />
                POST_PROCESS: PATINA + POLISH
              </p>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            {[
              { step: "01", title: "DESIGN", desc: "Topology optimization and form-finding" },
              { step: "02", title: "SIMULATE", desc: "Stress analysis and thermal validation" },
              { step: "03", title: "PRINT", desc: "72-hour continuous fabrication cycle" },
              { step: "04", title: "FINISH", desc: "Chemical patination and hand-polishing" },
            ].map((item, i) => (
              <div
                key={item.step}
                className="vault-card-light p-6 flex items-center gap-6 reveal-left"
                style={{ transitionDelay: `${i * 100}ms` }}
                data-cursor-hover
              >
                <span className="font-dm-mono text-micro tracking-mono text-void/30 w-12">
                  [{item.step}]
                </span>
                <div className="flex-1">
                  <h4 className="font-clash text-h3 tracking-tight text-void">{item.title}</h4>
                  <p className="font-inter text-body text-void/60">{item.desc}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-void/20 group-hover:bg-slime transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
