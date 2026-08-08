import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      server: { entry: "src/server.ts" },
    }),
    viteReact(),
    cloudflare({
      viteEnvironment: {
        name: "ssr",
      },
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  experimental: {
    /**
     * Workaround for Vite 7 + @cloudflare/vite-plugin bug:
     *
     * When CSS @font-face url() references point to /fonts/ (public/ dir),
     * Vite encodes them as hashed public-asset placeholders inside JS chunks.
     * At renderChunk time, it looks up those hashes in `publicAssetUrlCache`
     * for the current environment — but the Cloudflare SSR environment never
     * has this cache populated, causing:
     *   "Cannot read properties of undefined (reading 'get')"
     *
     * This hook intercepts public-path URLs and returns them unchanged, so
     * Vite never encodes them as hashed placeholders in the first place.
     * They remain literal strings in the output, which is correct since
     * public/ assets are served as-is at runtime.
     */
    renderBuiltUrl(filename, { type }) {
      if (type === "public") {
        return { relative: false, runtime: JSON.stringify("/" + filename) };
      }
    },
  },
});