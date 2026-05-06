// components/ui/ComfyImage.tsx
// Usage: <ComfyImage category="products" name="flux2_product_studio_00001_" />

import Image from "next/image";
import { comfyAssetUrl } from "@/lib/comfyAssets";
import type { ComfyCategory } from "@/lib/comfyAssets";

interface Props {
  category: ComfyCategory;
  filename: string;          // e.g. "flux2_product_studio_00001_.png"
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

export default function ComfyImage({
  category,
  filename,
  alt,
  width = 512,
  height = 512,
  fill = false,
  className = "",
  priority = false,
}: Props) {
  const src = comfyAssetUrl(category, filename);

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      priority={priority}
      unoptimized
      // ^ unoptimized because we already run sharp/cwebp beforehand;
      //   remove if you want Next.js Image Optimization in dev/server mode.
    />
  );
}
