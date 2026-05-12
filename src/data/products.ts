import { publicAsset } from "@/lib/publicAsset";

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
    tagline: "REFLECTIVE RITUAL INTERFACE.",
    description:
      "A FOUR-POINT FIELD OBJECT FOR MIRRORING SIGNAL, BODY, AND ROOM. PRINTED IN PLA, HAND-FINISHED WITH GLOSS PAINT, THEN TREATED AS AN ARTIFACT RATHER THAN A PRODUCT.",
    price: "€240",
    status: "ACTIVE",
    image: publicAsset("/images/artifacts/starmirror_1.webp"),
    specs: { material: "PLA + Gloss Paint", weight: "120g", edition: "∞" },
    category: "RITUAL OBJECT",
  },
  {
    id: "01.02",
    name: "PHYLACTERY",
    tagline: "CONTAINER FOR SIGNALS.",
    description:
      "A THREE-POINT CARRIER WITH AN EXTENDED HANDLE, BUILT LIKE A SMALL ARCHIVE FOR PRESSURE, INTENTION, AND TOUCH. EACH PIECE SITS BETWEEN TALISMAN, ACCESSORY, AND PROP.",
    price: "€180",
    status: "ACTIVE",
    image: publicAsset("/images/artifacts/phylactery_1.webp"),
    specs: { material: "PLA + Gloss Paint", weight: "85g", edition: "∞" },
    category: "BODY ARTIFACT",
  },
  {
    id: "01.03",
    name: "TIARA",
    tagline: "WEARABLE INTERFERENCE.",
    description:
      "A COMPACT CEREMONIAL STAR FOR THE HEAD, HAND, OR SURFACE. SMALL ENOUGH TO READ AS JEWELRY, STRANGE ENOUGH TO INTERRUPT THE ROOM.",
    price: "€160",
    status: "COMING_SOON",
    image: publicAsset("/images/artifacts/tiara_1.webp"),
    specs: { material: "PLA + Ceramic Coat", weight: "65g", edition: "50" },
    category: "ORNAMENT SYSTEM",
  },
];
