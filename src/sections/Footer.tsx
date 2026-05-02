export default function Footer() {
  return (
    <footer className="bg-void text-signal py-24 px-8 md:px-16 border-t border-border-dark">
      <div className="max-w-[90vw] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* Brand */}
          <div className="md:col-span-6">
            <h3 className="font-clash text-h2 tracking-tight mb-8 glitch-intense" data-text="DEFACT">
              DEFACT
            </h3>
            <p className="font-inter text-body text-steel max-w-md">
              Objects of distinction. Forged in digital fire, cast in physical reality.
              Each artifact exists in the liminal space between computation and matter.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-dm-mono text-micro tracking-mono text-steel uppercase mb-6">
              [NAVIGATION]
            </h4>
            <ul className="space-y-3">
              {["Works", "Manifesto", "Protocol", "Acquisition", "Process", "Transmit"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="font-inter text-body text-signal hover:text-blood transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div className="md:col-span-3">
            <h4 className="font-dm-mono text-micro tracking-mono text-steel uppercase mb-6">
              [STATUS]
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slime animate-pulse" />
                <span className="font-dm-mono text-micro tracking-mono text-slime">
                  SYSTEM ONLINE
                </span>
              </div>
              <p className="font-dm-mono text-micro tracking-mono text-steel">
                LAT: 50.9375° N<br />
                LON: 6.9603° E
              </p>
              <p className="font-dm-mono text-micro tracking-mono text-steel pt-4">
                [NO COOKIES. NO TRACKING. PURE SIGNAL.]
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-dark flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-dm-mono text-micro tracking-mono text-steel">
            © 2024 DEFACT. ALL RIGHTS RESERVED.
          </span>
          <span className="font-dm-mono text-micro tracking-mono text-steel">
            [DESIGNED BY ALGORITHMS. CURATED BY HUMANS.]
          </span>
        </div>
      </div>
    </footer>
  );
}
