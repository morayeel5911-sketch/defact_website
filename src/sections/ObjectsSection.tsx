"use client";

import { useRef } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  status: "ACTIVE" | "SOLD OUT" | "COMING SOON";
  price: string;
  description: string;
  images: string[];
  material: string;
  type: string;
  weight: string;
}

const products: Product[] = [
  {
    id: "01.01",
    name: "Starmirror",
    status: "ACTIVE",
    price: "€2,400",
    description:
      "Four-pointed throwing star. Precision-machined composite surface reflecting ambient light at oblique angles. Designed for both ornamental display and ceremonial kinetic release.",
    images: ["/images/artifacts/starmirror_1.webp", "/images/artifacts/starmirror_2.webp", "/images/artifacts/starmirror_3.webp"],
    material: "PLA + Metallbeschichtung",
    type: "VIERZACKIGER WURFSTERN",
    weight: "120g",
  },
  {
    id: "01.02",
    name: "Phylactery",
    status: "SOLD OUT",
    price: "€3,200",
    description:
      "Tri-pointed distance star with asymmetric surface topology. Vessel-like form referencing alchemical containment rituals. Each piece unique in surface texture.",
    images: ["/images/artifacts/phylactery_1.webp", "/images/artifacts/phylactery_2.webp", "/images/artifacts/phylactery_3.webp"],
    material: "PLA + Glanzfarbe",
    type: "DREIZACKIGER DISTANCE-STAR",
    weight: "145g",
  },
  {
    id: "01.03",
    name: "Tiara",
    status: "ACTIVE",
    price: "€4,100",
    description:
      "Circumferential crown artifact with segmented radial geometry. Crown architecture referencing both biological structural optimization and ceremonial head adornment traditions.",
    images: ["/images/artifacts/tiara_1.webp", "/images/artifacts/tiara_2.webp"],
    material: "PLA + Satinfinish",
    type: "RADIALE KRONSTRUKTUR",
    weight: "210g",
  },
];

const statusColors: Record<string, string> = {
  ACTIVE: "text-slime",
  "SOLD OUT": "text-blood",
  "COMING SOON": "text-steel",
};

export default function ObjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="objects" data-theme="dark" className="relative min-h-screen py-32 bg-void">
      <div className="max-w-[90vw] mx-auto px-8 md:px-16 mb-16">
        <div className="flex items-baseline gap-4 reveal-up">
          <span className="font-dm-mono text-micro tracking-mono text-steel/50">[01/03]</span>
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
        {products.map((product, i) => (
          <div
            key={product.id}
            className="vault-card flex-shrink-0 w-[340px] md:w-[420px] aspect-[3/4] p-6 flex flex-col justify-between reveal-scale"
            style={{ transitionDelay: `${i * 100}ms` }}
            data-cursor-hover
          >
            {/* Product Image */}
            <div className="relative w-full h-[55%] overflow-hidden">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
                unoptimized
              />
              {product.images.length > 1 && (
                <div className="absolute bottom-2 right-2 flex gap-1">
                  {product.images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full ${
                        idx === 0 ? "bg-signal" : "bg-steel/30"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between items-start mt-4">
              <span className="font-dm-mono text-micro tracking-mono text-steel">
                [{product.id}]
              </span>
              <span className={`font-dm-mono text-micro tracking-mono ${statusColors[product.status]}`}>
                [{product.status}]
              </span>
            </div>

            <div className="mt-2">
              <h3 className="font-clash text-h2 tracking-tight text-signal mb-2">{product.name}</h3>
              <p className="font-inter text-body text-steel mb-4 leading-relaxed">
                {product.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-2 border-t border-border-dark/50 pt-3 mb-3">
                <div>
                  <span className="font-dm-mono text-[9px] tracking-mono text-steel/40 block uppercase">
                    Material
                  </span>
                  <span className="font-dm-mono text-micro tracking-mono text-steel/70 block mt-0.5">
                    {product.material}
                  </span>
                </div>
                <div>
                  <span className="font-dm-mono text-[9px] tracking-mono text-steel/40 block uppercase">
                    Typ
                  </span>
                  <span className="font-dm-mono text-micro tracking-mono text-steel/70 block mt-0.5">
                    {product.type}
                  </span>
                </div>
                <div>
                  <span className="font-dm-mono text-[9px] tracking-mono text-steel/40 block uppercase">
                    Gewicht
                  </span>
                  <span className="font-dm-mono text-micro tracking-mono text-steel/70 block mt-0.5">
                    {product.weight}
                  </span>
                </div>
              </div>

              <span className="font-dm-mono text-micro tracking-mono text-chrome">
                {product.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
