import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/seo";

/** /robots.txt — geliştirme sayfası /stil, API ve arama sonuçları taranmaz. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/stil", "/api/", "/arama"] },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
