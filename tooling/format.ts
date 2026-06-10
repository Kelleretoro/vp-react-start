import type { UserConfig } from "vite-plus";

import { generatedPatterns, outputPatterns } from "./patterns";

export const fmt = {
  ignorePatterns: [...outputPatterns, ...generatedPatterns],

  sortImports: {
    internalPattern: ["#/"],
  },

  sortTailwindcss: {
    functions: ["clsx", "cn", "cva"],
    stylesheet: "src/styles.css",
  },
} satisfies NonNullable<UserConfig["fmt"]>;
