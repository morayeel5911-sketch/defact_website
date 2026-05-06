export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  status: "ACTIVE" | "COMING_SOON" | "SOLD_OUT";
  image: string;
  images?: string[];
  specs: {
    material: string;
    weight: string;
    edition: string;
  };
  category?: string;
}

export const products: Product[] = [
  {
    id: "01.01",
    name: "STARMIRROR",
    tagline: "REFLECT. PROTECT. STRIKE.",
    description:
      "A FOUR-POINTED PRECISION THROWING STAR WITH CENTRAL GRIP HOLE. 3D-PRINTED IN PLA, HAND-FINISHED WITH GLOSS PAINT. BALANCED FOR ROTATION. EACH PIECE UNIQUE.",
    price: "€240",
    status: "ACTIVE",
    image: "/images/artifacts/starmirror_1.webp",
    specs: { material: "PLA + Gloss Paint", weight: "120g", edition: "∞" },
    category: "MERCHANDISE",
  },
  {
    id: "01.02",
    name: "PHYLACTERY",
    tagline: "LONG TAIL. SHORT FUSE.",
    description:
      "A THREE-BLADED SHURIKEN WITH ELONGATED TAPERED HANDLE. DESIGNED FOR DISTANCE AND ACCURACY. THE EXTENDED TAIL PROVIDES STABILITY IN FLIGHT. HAND-FINISHED, MADE TO MOVE.",
    price: "€180",
    status: "ACTIVE",
    image: "/images/artifacts/phylactery_1.webp",
    specs: { material: "PLA + Gloss Paint", weight: "85g", edition: "∞" },
    category: "MERCHANDISE",
  },
  {
    id: "01.03",
    name: "TIARA",
    tagline: "WEARABLE WEAPON.",
    description:
      "A COMPACT FOUR-POINTED STAR WITH SMOOTH CERAMIC SURFACE. SMALL ENOUGH TO CONCEAL. SHARP ENOUGH TO MATTER. THE TIARA BLURS THE LINE BETWEEN ORNAMENT AND TOOL.",
    price: "€160",
    status: "COMING_SOON",
    image: "/images/artifacts/tiara_1.webp",
    specs: { material: "PLA + Ceramic Coat", weight: "65g", edition: "50" },
    category: "MERCHANDISE",
  },
];
