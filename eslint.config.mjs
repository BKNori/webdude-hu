import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  { ignores: ["coverage/**", "scripts/**", "_mentesek/**", "server.js"] },
]);

export default eslintConfig;
