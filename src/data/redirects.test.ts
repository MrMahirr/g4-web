import { describe, expect, it } from "vitest";
import { getCatalog } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { legacyRedirects, legacyServiceSlugs } from "@/data/redirects.data";

const catalog = getCatalog("tr");

/** Sitedeki tüm gerçek sayfa yolları. */
const livePaths = new Set<string>([
  routes.home,
  routes.about,
  routes.references,
  routes.career,
  routes.faq,
  routes.news,
  routes.services,
  routes.products,
  routes.contact,
  routes.cookies,
  routes.kvkk,
  ...catalog.products.getProducts().map((item) => routes.product(item.slug)),
  ...catalog.products.getCategories().map((item) => routes.category(item.slug)),
  ...catalog.services.getServices().map((item) => routes.service(item.slug)),
  ...catalog.news.getNews().map((item) => routes.newsItem(item.slug)),
]);

describe("eski adres yönlendirmeleri (plan 8.3)", () => {
  it("her hedef var olan bir sayfadır (parametreli hedefler hariç)", () => {
    const broken = legacyRedirects
      .filter((redirect) => !redirect.destination.includes(":") && !livePaths.has(redirect.destination))
      .map((redirect) => `${redirect.source} → ${redirect.destination}`);
    expect(broken).toEqual([]);
  });

  it("hiçbir kaynak var olan bir sayfayı gölgelemez", () => {
    const shadowed = legacyRedirects.filter((redirect) => livePaths.has(redirect.source)).map((redirect) => redirect.source);
    expect(shadowed).toEqual([]);
  });

  it("kaynaklar benzersizdir", () => {
    const sources = legacyRedirects.map((redirect) => redirect.source);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("eski hizmet slug'ları yeni hizmete işaret eder", () => {
    for (const [legacy, current] of Object.entries(legacyServiceSlugs)) {
      expect(catalog.services.getServiceBySlug(legacy)).toBeNull();
      expect(catalog.services.getServiceBySlug(current)).not.toBeNull();
    }
  });
});
