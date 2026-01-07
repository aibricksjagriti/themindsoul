import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // headers: {
    //   // ✅ Disable strict COOP/CORP headers to fix Firebase popup close issue
    //   "Cross-Origin-Opener-Policy": "unsafe-none",
    //   "Cross-Origin-Embedder-Policy": "unsafe-none",
    // },
    // headers: {
    //   "Cross-Origin-Opener-Policy": "same-origin",
    //   "Cross-Origin-Embedder-Policy": "require-corp",
    // },
    port: 5173, // optional: set your preferred dev port
  },
});
