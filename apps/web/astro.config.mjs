import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "@tanstack/react-virtual",
        "@base-ui/react/select",
        "@base-ui/react/checkbox",
        "@base-ui/react/dialog",
        "@base-ui/react/slider",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
      ],
    },
  },
});
