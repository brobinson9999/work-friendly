import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  appType: "mpa", // serve 404s for not-found routes instead of falling back to index.html
  plugins: [react()],
});
