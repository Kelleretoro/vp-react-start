import type { UserConfig } from "vite-plus";

import { generatedPatterns, outputPatterns } from "./patterns";

type LintOptions = NonNullable<UserConfig["lint"]>;

const basePlugins = ["eslint", "typescript", "unicorn", "oxc"] satisfies LintOptions["plugins"];
const reactPlugins = ["react", "jsx-a11y"] satisfies LintOptions["plugins"];
const appPlugins = [...basePlugins, ...reactPlugins] satisfies LintOptions["plugins"];
const testPlugins = [...appPlugins, "vitest"] satisfies LintOptions["plugins"];

export const lint = {
  plugins: appPlugins,

  categories: {
    correctness: "error",
    suspicious: "error",
    perf: "warn",
  },

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
    "react/react-in-jsx-scope": "off",
    "vite-plus/prefer-vite-plus-imports": "error",
  },

  options: {
    reportUnusedDisableDirectives: "error",
    typeAware: true,
    typeCheck: true,
  },

  overrides: [
    {
      files: ["src/**/*.test.{ts,tsx}"],

      // Test files still contain TypeScript/React/JSX, so keep the app plugins
      // and add Vitest-specific rules/globals on top.
      plugins: testPlugins,

      env: {
        vitest: true,
      },
    },
  ],
} satisfies LintOptions;
