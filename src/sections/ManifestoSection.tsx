export default function ManifestoSection() {
  return (
    <section id="manifesto" data-theme="light" className="relative min-h-screen py-grid-4 bg-signal text-void">
      <div className="max-w-[90vw] mx-auto gsnap-1 md:gsnap-2">
        <div className="flex items-baseline gap-4 mb-grid-2 reveal-up">
          <span className="font-dm-mono text-micro tracking-mono text-void/40">[02/06]</span>
          <h2 className="font-clash text-h2 tracking-tight">02 — MANIFESTO</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-grid-1">
          <div className="md:col-span-8">
            <p className="font-clash text-h1 tracking-tight leading-[0.95] reveal-up">
              THE CODE<br />
              <span className="text-blood">IS</span> LAW
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col justify-end">
            <div className="reveal-up space-y-6">
              <p className="font-inter text-body text-void/70 leading-relaxed">
                We reject mass production. Every DEFACT artifact is born from an algorithm, refined by human intent, and materialized through precision engineering.
              </p>
              <p className="font-inter text-body text-void/70 leading-relaxed">
                Our objects exist at the intersection of digital parametricism and analog warmth — each one a unique geological event frozen in metal and polymer.
              </p>
              <div className="pt-6 border-t border-void/10">
                <span className="font-dm-mono text-micro tracking-mono text-void/50">
                  [MINTED ON ETHEREUM — VERIFIABLE ON CHAIN]
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
