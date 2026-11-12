import type { ICatalogService } from "@/core/interfaces/ICatalogService";
import type { SearchEntry } from "@/core/types";
import { routes } from "@/data/navigation.data";
import { pad2, trLower } from "@/lib/catalog";

type SearchIndexSource = Pick<ICatalogService, "getProducts" | "getCategories" | "getServices">;

type SearchIndexLabels = {
  productFallback: string;
  productGroup: string;
  service: string;
  productRef: string;
};

/** Katalog verisinden arama katmanının hafif, sıralı dizinini üretir. */
export function buildSearchIndex(source: SearchIndexSource, labels: SearchIndexLabels): SearchEntry[] {
  const productEntries: SearchEntry[] = source.getProducts().map((product) => ({
    type: "urun",
    name: product.name,
    meta: product.code ? labels.productRef.replace("{code}", product.code) : labels.productFallback,
    href: routes.product(product.slug),
    imageKey: product.imageKey,
    haystack: trLower(`${product.title} ${product.code ?? ""}`),
  }));

  const categoryEntries: SearchEntry[] = source.getCategories().map((category, index) => ({
    type: "grup",
    name: category.title,
    meta: labels.productGroup.replace("{number}", pad2(index + 1)),
    href: routes.category(category.slug),
    imageKey: category.imageKey,
    haystack: trLower(category.title),
  }));

  const serviceEntries: SearchEntry[] = source.getServices().map((service, index) => ({
    type: "hizmet",
    name: service.title,
    meta: labels.service.replace("{number}", pad2(index + 1)),
    href: routes.service(service.slug),
    haystack: trLower(`${service.title} ${service.shortDescription}`),
  }));

  return [...productEntries, ...categoryEntries, ...serviceEntries];
}
