"use client";

import Marquee from "@/components/Marquee";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-void text-signal relative">
      {/* Top marquee band */}
      <div className="border-y border-border-dark py-4">
        <Marquee
          text="DEFACT — DIGITAL DECAY LUXURY — OBJECTS OF DISTINCTION — COLOGNE — EST. 2024 —"
          speed={25}
          textClassName="font-clash text-h3 tracking-tight text-signal/10"
        />
      </div>

      <div className="max-w-[90vw] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand + Manifesto */}
          <div className="md:col-span-5">
            <h3 className="font-clash text-h2 tracking-tight mb-6">
              DEFACT
            </h3>
            <p className="font-inter text-body text-steel max-w-sm leading-relaxed mb-8">
              Objects of distinction. Forged in digital fire, cast in physical reality.
              Each artifact exists in the liminal space between computation and matter.
            </p>
            <button
              onClick={scrollToTop}
              className="font-dm-mono text-micro tracking-mono text-steel hover:text-slime transition-colors uppercase group flex items-center gap-2"
              data-cursor-hover
            >
              <span>[BACK TO TOP ↑]</span>
            </button>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <h4 className="font-dm-mono text-micro tracking-mono text-steel uppercase mb-6">
              [NAV]
            </h4>
            <ul className="space-y-2">
              {["Works", "Manifesto", "Protocol", "Acquisition", "Process", "Transmit"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="font-inter text-body text-signal/60 hover:text-blood transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Lectures & Talks */}
          <div className="md:col-span-3">
            <h4 className="font-dm-mono text-micro tracking-mono text-steel uppercase mb-6">
              [LECTURES & TALKS]
            </h4>
            <ul className="space-y-3">
              {[
                "ETH Zürich — Swiss Federal Institute of Technology",
                "ZHdK — Zurich University of the Arts",
                "RCA — Royal College of Art, London",
              ].map((inst) => (
                <li
                  key={inst}
                  className="font-dm-mono text-micro tracking-mono text-steel/60"
                >
                  {inst}
                </li>
              ))}
            </ul>
          </div>

          {/* System Status */}
          <div className="md:col-span-2">
            <h4 className="font-dm-mono text-micro tracking-mono text-steel uppercase mb-6">
              [STATUS]
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slime animate-pulse" />
                <span className="font-dm-mono text-micro tracking-mono text-slime">
                  ONLINE
                </span>
              </div>
              <p className="font-dm-mono text-micro tracking-mono text-steel/40">
                LAT: 50.9375° N
                <br />
                LON: 6.9603° E
              </p>
              <p className="font-dm-mono text-micro tracking-mono text-steel/40 pt-2">
                [NO COOKIES]
                <br />
                [NO TRACKING]
                <br />
                [PURE SIGNAL]
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-24 pt-8 border-t border-border-dark flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="font-dm-mono text-micro tracking-mono text-steel/40">
            © 2024 DEFACT. ALL RIGHTS RESERVED.
          </span>
          <span className="font-dm-mono text-micro tracking-mono text-steel/40">
            [DESIGNED BY ALGORITHMS. CURATED BY HUMANS.]
          </span>
          <span className="font-dm-mono text-micro tracking-mono text-steel/40">
            [NOT A STUDIO — JUST US]
          </span>
        </div>
      </div>
    </footer>
  );
}
