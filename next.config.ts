import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile Three.js related packages for proper ESM handling
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
    "postprocessing",
    "maath",
    "troika-three-text",
    "two-slope-normal-map",
  ],
};

export default nextConfig;
