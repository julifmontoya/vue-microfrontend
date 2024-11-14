import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "host-app",
      remotes: {
        microfrontend1: "http://localhost:7070/assets/remoteEntry.js",
        microfrontend2: 'http://localhost:6060/assets/remoteEntry.js'
      },
      shared: ["vue"],
    }),
  ],
  build: {
    target: "esnext", // to support shared modules
  },
});
