"use client";

import InterfaceGrid from "@/components/InterfaceGrid";
import Marquee from "@/components/Marquee";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" data-theme="dark" className="bg-void text-signal relative">
      <InterfaceGrid theme="dark" />
      {/* Contact CTA Banner */}
      <div className="border-y border-border-dark">
        <a
          href="#contact"
          className="block py-8 md:py-12 text-center hover:bg-signal/5 transition-colors"
          data-cursor-hover
        >
          <h2 className="font-clash text-h1 tracking-tight text-signal">
            ENTER THE FIELD
          </h2>
        </a>
      </div>

      {/* Bottom Marquee */}
      <div className="border-b border-border-dark py-3">
        <Marquee
          text="CONTACT CONTACT — DEFACT DEFACT — LYAHUASCA LYAHUASCA — MIKI.NGLO MIKI.NGLO — TERMS OF SERVICE — PRIVACY POLICY — RIGHT OF WITHDRAWAL — DEFACT DEFACT —"
          speed={30}
          textClassName="font-dm-mono text-micro tracking-mono text-signal/20"
        />
      </div>

      {/* Footer Content */}
      <div className="px-6 md:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-dm-mono text-micro tracking-mono text-steel/40 block">
              DEFACT
            </span>
            <span className="font-dm-mono text-micro tracking-mono text-steel/40 block">
              ©2024
            </span>
          </div>

          {/* Creators */}
          <div>
            <div className="space-y-1">
              <a
                href="#"
                className="font-dm-mono text-micro tracking-mono text-steel/40 hover:text-signal transition-colors block"
              >
                LYAHUASCA
              </a>
              <a
                href="#"
                className="font-dm-mono text-micro tracking-mono text-steel/40 hover:text-signal transition-colors block"
              >
                MIKI.NGLO
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className="space-y-1">
              <a
                href="#"
                className="font-dm-mono text-micro tracking-mono text-steel/40 hover:text-signal transition-colors block"
              >
                TERMS OF SERVICE
              </a>
              <a
                href="#"
                className="font-dm-mono text-micro tracking-mono text-steel/40 hover:text-signal transition-colors block"
              >
                PRIVACY POLICY
              </a>
              <a
                href="#"
                className="font-dm-mono text-micro tracking-mono text-steel/40 hover:text-signal transition-colors block"
              >
                RIGHT OF WITHDRAWAL
              </a>
            </div>
          </div>

          {/* Instagram */}
          <div className="text-right">
            <a
              href="https://instagram.com/defact_de"
              target="_blank"
              rel="noopener noreferrer"
              className="font-dm-mono text-micro tracking-mono text-steel/40 hover:text-signal transition-colors"
            >
              @DEFACT_DE
            </a>
          </div>
        </div>

        {/* Back to top */}
        <div className="mt-12 pt-6 border-t border-border-dark flex justify-between items-center">
          <button
            onClick={scrollToTop}
            className="font-dm-mono text-micro tracking-mono text-steel/40 hover:text-slime transition-colors uppercase"
            data-cursor-hover
          >
            [↑ BACK TO TOP]
          </button>
          <span className="font-dm-mono text-micro tracking-mono text-steel/20">
            COLOGNE, GERMANY — LAT: 50.9375°N / LON: 6.9603°E
          </span>
        </div>
      </div>
    </footer>
  );
}
