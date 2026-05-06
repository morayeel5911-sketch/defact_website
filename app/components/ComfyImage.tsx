// app/components/ComfyImage.tsx
// Beispiel-Component für ComfyUI-generierte Assets

import Image from 'next/image';
import type { StaticImageData } from 'next/image';

const COMFY_BASE = '/assets/comfy';

export type ComfyCategory = 'heroes' | 'textures' | 'backgrounds' | 'products' | 'raw';

export interface ComfyAsset {
  name: string;          // ohne Extension, z.B. "defact_hero_00001_"
  category: ComfyCategory;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

function comfyUrl(asset: ComfyAsset, format: 'webp' | 'png' = 'webp'): string {
  return `${COMFY_BASE}/${asset.category}/${asset.name}.${format}`;
}

export function ComfyImage({ asset, className = '', ...rest }: { asset: ComfyAsset; className?: string } & Omit<Parameters<typeof Image>[0], 'src' | 'alt' | 'width' | 'height'>) {
  return (
    <Image
      src={comfyUrl(asset)}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      className={className}
      {...rest}
    />
  );
}

// Beispiel: Hero-Banner
export function HeroBanner() {
  // manifest: /assets/comfy/heroes/manifest.json
  // variants[0].paths.webp = "/assets/comfy/heroes/defact_hero_00002_.webp"
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Image
        src="/assets/comfy/heroes/defact_hero_00002_.webp"
        alt="DEFACT Hero"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/30" />
      <h1 className="absolute bottom-12 left-12 text-6xl font-bold text-white tracking-tighter" style={{ fontFamily: 'Clash Grotesk, sans-serif' }}>
        DEFACT
      </h1>
    </section>
  );
}

// Beispiel: Textur-Kachel
export function TextureTile({ name, label }: { name: string; label: string }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-sm group">
      <Image
        src={`/assets/comfy/textures/${name}.webp`}
        alt={label}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <div className="absolute inset-0 border border-[--signal]/20" />
    </div>
  );
}
