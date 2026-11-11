import type { MetadataRoute } from "next";
import { container } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { absoluteUrl } from "@/lib/seo";

type Entry = MetadataRoute.Sitemap[number];

/** /sitemap.xml — tüm statik sayfalar + ürün, kategori, hizmet ve haber sayfaları. */
export default function sitemap(): MetadataRoute.Sitemap {
  const catalog = container.resolve("CatalogService");
  const entry = (path: string, priority: number, changeFrequency: Entry["changeFrequency"] = "monthly"): Entry => ({
    url: absoluteUrl(path),
    changeFrequency,
    priority,
  });

  const staticPages: Entry[] = [
    entry(routes.home, 1, "weekly"),
    entry(routes.products, 0.9, "weekly"),
    entry(routes.services, 0.8),
    entry(routes.about, 0.7),
    entry(routes.references, 0.6),
    entry(routes.news, 0.6, "weekly"),
    entry(routes.faq, 0.5),
    entry(routes.career, 0.5),
    entry(routes.contact, 0.7),
  ];

  // Hukuk onayı bekleyen yasal metinler "noindex" olduğu için haritaya eklenmez.
  const legalPages = (["cerez-politikasi", "kvkk-aydinlatma-metni"] as const)
    .map((slug) => catalog.getLegalDocument(slug))
    .filter((document) => document && !document.approvalPending)
    .map((document) => entry(`/icerik/${document!.slug}`, 0.2, "yearly"));

  return [
    ...staticPages,
    ...catalog.getCategories().map((category) => entry(routes.category(category.slug), 0.8, "weekly")),
    ...catalog.getProducts().map((product) => entry(routes.product(product.slug), 0.7)),
    ...catalog.getServices().map((service) => entry(routes.service(service.slug), 0.7)),
    ...catalog.getNews().map((item) => ({
      ...entry(routes.newsItem(item.slug), 0.4, "yearly"),
      lastModified: item.publishedAt,
    })),
    ...legalPages,
  ];
}
