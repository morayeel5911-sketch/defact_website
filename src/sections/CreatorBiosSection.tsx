"use client";

export default function CreatorBiosSection() {
  const creators = [
    {
      index: "01",
      name: "LYAHUASCA",
      role: "ART DIRECTION / PRODUCT DEVELOPMENT / 3D VISUALS",
      align: "left" as const,
    },
    {
      index: "02",
      name: "MIKI.NGLO",
      role: "3D PRINTING / GRAPHIC DESIGN / WEB DEVELOPMENT",
      align: "right" as const,
    },
  ];

  return (
    <section
      id="creators"
      data-theme="light"
      className="relative py-grid-4 md:py-grid-4 gsnap-1 md:gsnap-2 overflow-hidden animate-section bg-void"
    >
      {/* Global noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Section header — asymmetric, left-weighted */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between pb-8 md:pb-12 border-b border-[#D5D5D5] mb-grid-2 md:mb-grid-2">
          <div>
            <p className="font-dm-mono text-micro tracking-mono uppercase text-steel mb-3">
              [Personnel File]
            </p>
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-medium text-signal leading-[0.9] tracking-tight">
              CREATORS
            </h2>
          </div>
          <div className="mt-6 md:mt-0 md:text-right">
            <p className="font-dm-mono text-micro tracking-mono uppercase text-steel mb-1">
              Studio
            </p>
            <p className="font-dm-mono text-xs uppercase tracking-widest text-signal">
              COLOGNE, GERMANY
            </p>
          </div>
        </div>

        {/* Creator records */}
        <div className="flex flex-col">
          {creators.map((creator, i) => {
            const isLast = i === creators.length - 1;
            const isLeft = creator.align === "left";

            const indexBlock = (
              <div
                className={
                  isLeft
                    ? "md:col-span-1"
                    : "md:col-span-1 md:col-start-12 md:text-right"
                }
              >
                <span className="font-dm-mono text-micro tracking-mono text-steel block">
                  {creator.index}
                </span>
              </div>
            );

            const portraitBlock = (
              <div
                className={`${
                  isLeft ? "md:col-span-5" : "md:col-span-5"
                } aspect-[3/4] max-h-[420px] relative overflow-hidden`}
              >
                {/* Chrome-silver gradient placeholder */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #F0F0F0 0%, #E0E0E0 50%, #D0D0D0 100%)",
                  }}
                />
                {/* Name watermark */}
                <span className="absolute inset-0 flex items-center justify-center text-signal/[0.06] font-display text-[clamp(2rem,6vw,4.5rem)] font-bold tracking-[-0.03em] leading-none select-none">
                  {creator.name}
                </span>
                {/* Noise overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  }}
                />
                {/* Scanlines */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)",
                  }}
                />
                {/* Portrait placeholder label */}
                <div className="absolute bottom-4 left-4">
                  <span className="font-dm-mono text-[0.65rem] uppercase tracking-widest text-signal/40">
                    [PORTRAIT]
                  </span>
                </div>
              </div>
            );

            const textBlock = (
              <div
                className={`${
                  isLeft
                    ? "md:col-span-6"
                    : "md:col-span-6 md:col-start-1"
                } flex flex-col justify-end pb-2`}
              >
                <h3 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-medium text-signal leading-none tracking-tight">
                  {creator.name}
                </h3>
                <div className="w-12 h-[1px] bg-[#D5D5D5] mt-6 mb-4" />
                <p className="font-dm-mono text-xs uppercase tracking-[0.15em] text-steel">
                  {creator.role}
                </p>
              </div>
            );

            return (
              <div
                key={creator.name}
                className={`grid grid-cols-1 md:grid-cols-12 gap-grid-1 md:gap-grid-1 py-12 md:py-16 ${
                  !isLast ? "border-b border-[#D5D5D5]" : ""
                }`}
              >
                {isLeft ? (
                  <>
                    {indexBlock}
                    {portraitBlock}
                    {textBlock}
                  </>
                ) : (
                  <>
                    {textBlock}
                    {portraitBlock}
                    {indexBlock}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-grid-2 md:mt-grid-2 pt-8 border-t border-[#D5D5D5]">
          <p className="font-dm-mono text-micro tracking-mono uppercase text-steel">
            [Process documentation available upon request]
          </p>
        </div>
      </div>
    </section>
  );
}
