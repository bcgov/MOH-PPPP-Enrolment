import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/pppp/",
  plugins: [
    vue({
      // This is needed so Vite can find web image paths
      // For example, <img src="/images/logo.png"> will not work without the code below
      template: {
        transformAssetUrls: {
          includeAbsolute: false,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  test: {
    environment: "jsdom",
  },
  server: {
    proxy: {
      "/pppp/api": {
        target: "https://pppp-web-0752cb-dev.apps.silver.devops.gov.bc.ca/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
