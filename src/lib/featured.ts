import type { ICatalogService } from "@/core/interfaces/ICatalogService";
import type { ProductItem } from "@/core/types";
import type { FeaturedRow } from "@/types/catalog-view";

/** Ürünü liste satırı verisine çevirir (anasayfa ve /urunler ortak). */
export function toFeaturedRow(catalog: ICatalogService, product: ProductItem): FeaturedRow {
  return {
    slug: product.slug,
    name: product.name,
    code: product.code,
    imageSrc: catalog.getImage(product.imageKey)?.src ?? null,
    group: catalog.getPrimaryCategory(product)?.title ?? "",
  };
}
