export default function TransmitSection() {
  return (
    <section id="transmit" data-theme="dark" className="relative min-h-screen py-grid-1 bg-void flex items-center">
      <div className="gc-g w-full">
        <div className="flex items-baseline gap-4 mb-8 reveal-up">
          <span className="font-dm-mono text-micro tracking-mono text-steel/50">[06/06]</span>
          <h2 className="font-clash text-h2 tracking-tight text-signal">06 — TRANSMIT</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="reveal-up">
            <p className="font-clash text-h1 tracking-tight leading-[0.9] text-signal mb-8">
              ESTABLISH<br />
              <span className="glitch-intense" data-text="CONNECTION">CONNECTION</span>
            </p>
            <p className="font-inter text-body text-steel max-w-md mb-8">
              For acquisition inquiries, collaboration proposals, or studio visits in Cologne.
            </p>
          </div>

          <div className="space-y-6 reveal-scale">
            <div className="vault-card p-6" data-cursor-hover>
              <span className="font-dm-mono text-micro tracking-mono text-steel block mb-2">[EMAIL]</span>
              <a
                href="mailto:hello@defact.studio"
                className="font-clash text-h3 tracking-tight text-signal hover:text-slime transition-colors"
              >
                hello@defact.studio
              </a>
            </div>
            <div className="vault-card p-6" data-cursor-hover>
              <span className="font-dm-mono text-micro tracking-mono text-steel block mb-2">[INSTAGRAM]</span>
              <a
                href="https://instagram.com/defact.studio"
                className="font-clash text-h3 tracking-tight text-signal hover:text-slime transition-colors"
              >
                @defact.studio
              </a>
            </div>
            <div className="vault-card p-6" data-cursor-hover>
              <span className="font-dm-mono text-micro tracking-mono text-steel block mb-2">[LOCATION]</span>
              <span className="font-clash text-h3 tracking-tight text-signal">
                50.9375° N, 6.9603° E
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
