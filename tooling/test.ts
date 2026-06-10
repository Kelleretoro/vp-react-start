import type { UserConfig } from "vite-plus";

export const test = {
  include: ["src/**/*.test.{ts,tsx}"],

  // This is a starter template, so the initial project can be valid even before
  // any tests exist.
  passWithNoTests: true,

  reporters: ["tree"],
} satisfies NonNullable<UserConfig["test"]>;
