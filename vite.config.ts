import { defineConfig } from "vite-plus";

import { fmt } from "./tooling/format";
import { lint } from "./tooling/lint";
import { getPlugins } from "./tooling/plugins";
import { tasks } from "./tooling/tasks";
import { test } from "./tooling/test";

export default defineConfig(({ mode }) => {
  return {
    server: { port: 3000 },
    resolve: { tsconfigPaths: true },
    plugins: getPlugins(mode),
    fmt,
    lint,
    test,
    run: { tasks },
  };
});
