import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * `base` matters on GitHub Pages: a project site is served from
 * https://<user>.github.io/<repo>/, so a build made with the default base of
 * "/" will request its assets from the domain root and 404. Set VITE_BASE to
 * "/<repo>/" for that case. The single-file build (`pnpm build:single`) has no
 * asset references at all and ignores this entirely.
 */
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
