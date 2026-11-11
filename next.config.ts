import type { NextConfig } from "next";
import { legacyRedirects } from "./src/data/redirects.data";

const nextConfig: NextConfig = {
  // Eski site adresleri → yeni sayfalar (308). Liste: src/data/redirects.data.ts (plan 8.3).
  async redirects() {
    return legacyRedirects.map((redirect) => ({ ...redirect, permanent: true }));
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
