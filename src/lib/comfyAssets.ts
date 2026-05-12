// lib/comfyAssets.ts
// Helpers for loading ComfyUI-generated assets from /public/assets/comfy

export type ComfyCategory = "products" | "textures" | "backgrounds" | "heroes" | "raw";

const BASE = "/assets/comfy";

/** Build a public URL for a comfy-generated asset. */
export function comfyAssetUrl(category: ComfyCategory, filename: string): string {
  return `${BASE}/${category}/${filename}`;
}

/** List all known .webp and .png assets in a category (requires build-time scan). */
export async function listComfyAssets(category: ComfyCategory): Promise<string[]> {
  // In static export / ISR contexts you can use fs at build time,
  // or fetch a generated manifest. For the simplest case:
  return [category]; 
}

/** Prefer WebP, fall back to original extension if a WebP variant wasn't generated. */
export function comfySrcSet(
  category: ComfyCategory,
  basenameWithoutExt: string,
  originalExt: string = ".png"
): { src: string; fallback: string } {
  const webp = comfyAssetUrl(category, `${basenameWithoutExt}.webp`);
  const fallback = comfyAssetUrl(category, `${basenameWithoutExt}${originalExt}`);
  return { src: webp, fallback };
}
