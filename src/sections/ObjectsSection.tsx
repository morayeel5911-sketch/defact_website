"use client";

import { useRef } from "react";

const objects = [
  { id: "01.01", name: "Artifact A", status: "ACTIVE", price: "€2,400" },
  { id: "01.02", name: "Artifact B", status: "SOLD OUT", price: "€3,200" },
  { id: "01.03", name: "Artifact C", status: "SOLD OUT", price: "€1,800" },
  { id: "01.04", name: "Artifact D", status: "ACTIVE", price: "€4,100" },
  { id: "01.05", name: "Artifact E", status: "COMING SOON", price: "—" },
];

export default function ObjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="works" data-theme="dark" className="relative min-h-screen py-32 bg-void">
      <div className="max-w-[90vw] mx-auto px-8 md:px-16 mb-16">
        <div className="flex items-baseline gap-4 reveal-up">
          <span className="font-dm-mono text-micro tracking-mono text-steel/50">[01/06]</span>
          <h2 className="font-clash text-h2 tracking-tight text-signal">01 — OBJECTS</h2>
        </div>
        <p className="font-clash text-h3 tracking-tight text-molten mt-4 reveal-up">
          FORGED IN DIGITAL FIRE
        </p>
      </div>

      <div
        ref={scrollRef}
        className="horizontal-scroll-container overflow-x-auto px-8 md:px-16 pb-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {objects.map((item, i) => (
          <div
            key={item.id}
            className="vault-card flex-shrink-0 w-[320px] md:w-[400px] aspect-[3/4] p-8 flex flex-col justify-between reveal-scale"
            style={{ transitionDelay: `${i * 100}ms` }}
            data-cursor-hover
          >
            <div className="flex justify-between items-start">
              <span className="font-dm-mono text-micro tracking-mono text-steel">[{item.id}]</span>
              <span className={`status-badge ${item.status === "ACTIVE" ? "status-badge-active" : ""}`}>
                [{item.status}]
              </span>
            </div>
            <div>
              <h3 className="font-clash text-h2 tracking-tight text-signal mb-2">{item.name}</h3>
              <p className="font-inter text-body text-steel mb-4">
                Sculptural object generated through computational processes and materialized via additive manufacturing.
              </p>
              <span className="font-dm-mono text-micro tracking-mono text-chrome">{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
