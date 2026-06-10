import type { UserConfig } from "vite-plus";

import { buildOutputPatterns, generatedPatterns } from "./patterns";

type TaskInput = { auto: true } | string;

// Automatic input tracking keeps task cache keys accurate without manually
// listing every source/config file. The exclusions remove generated, output, and
// tool-owned files that can be read and rewritten during a task. Generated files
// are derived from source files, so they should not independently affect cache
// keys.
const taskInput = [
  { auto: true },
  "!**/node_modules/**",
  "!**/.vite/**",
  "!**/.vite-temp/**",
  "!**/coverage/**",
  "!**/dist/**",
  "!**/.output/**",
  ...generatedPatterns.map((pattern) => `!**/${pattern}`),
] satisfies TaskInput[];

// Environment variables that can affect client/server build output.
const appEnv = ["NODE_ENV", "VITE_*"];

export const tasks = {
  "task:app:dev": {
    command: "vp dev",
    cache: false,
  },

  // Formatting mutates source files, so it should always run instead of using a
  // cached result.
  "task:app:fmt": {
    command: "vp fmt",
    cache: false,
  },

  "task:app:lint": {
    command: "vp lint",
    env: appEnv,
    input: taskInput,
  },

  // Vite+ check already includes formatting/linting behavior, so ready can call
  // check instead of repeating fmt/lint as separate steps.
  "task:app:check": {
    command: "vp check",
    env: appEnv,
    input: taskInput,
  },

  "task:app:test": {
    command: "vp test",
    env: appEnv,
    input: taskInput,
  },

  "task:app:build": {
    command: "vp build",
    env: appEnv,
    input: taskInput,
    output: buildOutputPatterns.map((pattern) => `${pattern}/**`),
  },

  "task:ready": {
    command: ["vp run task:app:check", "vp run task:app:test", "vp run task:app:build"],
  },
} satisfies NonNullable<NonNullable<UserConfig["run"]>["tasks"]>;
