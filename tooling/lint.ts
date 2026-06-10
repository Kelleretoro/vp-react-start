import type { UserConfig } from "vite-plus";

import { generatedPatterns, outputPatterns } from "./patterns";

export const lint = {
  env: {
    browser: true,
    es2022: true,
  },

  ignorePatterns: [...outputPatterns, ...generatedPatterns],

  jsPlugins: [
    {
      name: "vite-plus",
      specifier: "vite-plus/oxlint-plugin",
    },
  ],

  rules: {
    "vite-plus/prefer-vite-plus-imports": "error",
  },

  options: {
    reportUnusedDisableDirectives: "error",
    typeAware: true,
    typeCheck: true,
  },
} satisfies NonNullable<UserConfig["lint"]>;
