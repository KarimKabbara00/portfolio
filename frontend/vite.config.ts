import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber"],
          "react-vendor": ["react", "react-dom"],
          "react-spring": ["@react-spring/web"],
        },
      },
    },
  },
  assetsInclude: ["**/*.pdf"],
});
