import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Separate sub-project with its own package.json, lockfile and eslint config.
      "vite-popup/**",
    ],
  },
  ...coreWebVitals,
  ...typescript,
  {
    // Build config files are CommonJS; require() is the correct idiom there.
    files: ["*.config.js", "*.config.cjs"],
    languageOptions: { sourceType: "commonjs" },
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
];

export default eslintConfig;
