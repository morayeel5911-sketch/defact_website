import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    "**/._*",
    ".next/**",
    "out/**",
    "node_modules/**",
    "public/draco/**",
    ".hermes/**",
    "dashboard.html",
    "pitch/prototype/**",
    "pitch/**/*.html",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
