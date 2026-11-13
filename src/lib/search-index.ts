import type { IProductCatalog } from "@/core/interfaces/IProductCatalog";
import type { IServiceCatalog } from "@/core/interfaces/IServiceCatalog";
import type { SearchEntry } from "@/core/types";
import { routes } from "@/data/navigation.data";
import { pad2, trLower } from "@/lib/catalog";
import { getTranslations } from "next-intl/server";

type SearchIndexSource = {
  products: Pick<IProductCatalog, "getProducts" | "getCategories">;
  services: Pick<IServiceCatalog, "getServices">;
};

export type SearchIndexLabels = {
  productFallback: string;
  productGroup: string;
  service: string;
  productRef: string;
};

/** Katalog verisinden arama katmanının hafif, sıralı dizinini üretir. */
export function buildSearchIndex(source: SearchIndexSource, labels: SearchIndexLabels): SearchEntry[] {
  const productEntries: SearchEntry[] = source.products.getProducts().map((product) => ({
    type: "urun",
    name: product.name,
    meta: product.code ? labels.productRef.replace("{code}", product.code) : labels.productFallback,
    href: routes.product(product.slug),
    imageKey: product.imageKey,
    haystack: trLower(`${product.title} ${product.code ?? ""}`),
  }));

  const categoryEntries: SearchEntry[] = source.products.getCategories().map((category, index) => ({
    type: "grup",
    name: category.title,
    meta: labels.productGroup.replace("{number}", pad2(index + 1)),
    href: routes.category(category.slug),
    imageKey: category.imageKey,
    haystack: trLower(category.title),
  }));

  const serviceEntries: SearchEntry[] = source.services.getServices().map((service, index) => ({
    type: "hizmet",
    name: service.title,
    meta: labels.service.replace("{number}", pad2(index + 1)),
    href: routes.service(service.slug),
    haystack: trLower(`${service.title} ${service.shortDescription}`),
  }));

  return [...productEntries, ...categoryEntries, ...serviceEntries];
}

/** Arama dizini etiketlerini tek yerden, etkin dilde çözer. */
export async function getSearchIndexLabels(): Promise<SearchIndexLabels> {
  const t = await getTranslations();
  return {
    productFallback: t("i18n.searchIndex.productFallback"),
    productGroup: t.raw("i18n.searchIndex.productGroup") as string,
    service: t.raw("i18n.searchIndex.service") as string,
    productRef: t.raw("i18n.searchIndex.productRef") as string,
  };
}
