import { getCatalog } from "@/core/container";
import { buildSearchIndex, getSearchIndexLabels } from "@/lib/search-index";
import type { CatalogSummary } from "@/types/catalog-view";
import { getLocale } from "next-intl/server";

/*
  Arama katmanı ve teklif çekmecesinin verisi (plan 8.5). Önceden kök layout'ta her sayfanın
  HTML'ine gömülüyordu (~65 KB). Artık katman ilk açıldığında bir kez çekilir.
  Çalışma zamanı verisi kullanmadığı için derlemede statik JSON olarak üretilir.
*/
export async function GET() {
  const catalog = getCatalog(await getLocale());
  const imageSrc = (key: string | undefined) => catalog.images.getImage(key)?.src;

  const summary: CatalogSummary = {
    searchIndex: buildSearchIndex(catalog, await getSearchIndexLabels())
      .map((entry) => ({ ...entry, imageSrc: imageSrc(entry.imageKey) })),
    quoteProducts: catalog.products.getProducts().map((product) => ({
      slug: product.slug,
      name: product.name,
      code: product.code,
      imageSrc: imageSrc(product.imageKey),
    })),
  };
  return Response.json(summary);
}
