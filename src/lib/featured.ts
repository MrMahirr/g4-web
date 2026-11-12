import type { IImageResolver } from "@/core/interfaces/IImageResolver";
import type { IProductCatalog } from "@/core/interfaces/IProductCatalog";
import type { ProductItem } from "@/core/types";
import type { FeaturedRow } from "@/types/catalog-view";

/** Ürünü liste satırı verisine çevirir (anasayfa ve /urunler ortak). */
type FeaturedRowSource = {
  images: IImageResolver;
  products: Pick<IProductCatalog, "getPrimaryCategory">;
};

export function toFeaturedRow(catalog: FeaturedRowSource, product: ProductItem): FeaturedRow {
  return {
    slug: product.slug,
    name: product.name,
    code: product.code,
    imageSrc: catalog.images.getImage(product.imageKey)?.src ?? null,
    group: catalog.products.getPrimaryCategory(product)?.title ?? "",
  };
}
