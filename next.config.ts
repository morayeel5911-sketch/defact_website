import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for hosting without Node server
  output: 'export',
  
  // Image optimization disabled for static export
  images: {
    unoptimized: true,
  },
  
  // Transpile Three.js related packages for proper ESM handling
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "maath",
    "troika-three-text",
    "two-slope-normal-map",
  ],
};

export default nextConfig;
