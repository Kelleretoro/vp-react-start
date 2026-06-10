import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import type { PluginOption } from "vite-plus";

function isTestMode(mode: string) {
  return mode === "test" || process.env["VITEST"] === "true";
}

// Vitest loads the Vite config, but TanStack Start wires app runtime behavior.
// Tests still need React/Tailwind transforms without booting Start's runtime.
function getRuntimePlugins(mode: string) {
  if (isTestMode(mode)) {
    return [] satisfies PluginOption[];
  }

  return tanstackStart();
}

export function getPlugins(mode: string) {
  return [
    ...getRuntimePlugins(mode),
    // React's Vite plugin must come after Start's Vite plugin.
    viteReact(),
    tailwindcss(),
  ] satisfies PluginOption[];
}
