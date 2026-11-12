import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { legacyRedirects } from "./src/data/redirects.data";

const nextConfig: NextConfig = {
  // Docker imajı için: .next/standalone altında node_modules gerektirmeyen küçük bir sunucu üretir.
  output: "standalone",
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

export default createNextIntlPlugin("./src/i18n/request.ts")(nextConfig);
