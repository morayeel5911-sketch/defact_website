import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for hosting without Node server
  output: 'export',
  
  // GitHub Pages deploys to /defact_website/ subpath
  basePath: '/defact_website',
  assetPrefix: '/defact_website/',
  
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
