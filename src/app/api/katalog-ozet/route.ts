import type { CatalogSummary } from "@/components/layout/types";
import { getCatalog } from "@/core/container";
import { getLocale } from "next-intl/server";

/*
  Arama katmanı ve teklif çekmecesinin verisi (plan 8.5). Önceden kök layout'ta her sayfanın
  HTML'ine gömülüyordu (~65 KB). Artık katman ilk açıldığında bir kez çekilir.
  Çalışma zamanı verisi kullanmadığı için derlemede statik JSON olarak üretilir.
*/
export async function GET() {
  const catalog = getCatalog(await getLocale());
  const imageSrc = (key: string | undefined) => catalog.getImage(key)?.src;

  const summary: CatalogSummary = {
    searchIndex: catalog.getSearchIndex().map((entry) => ({ ...entry, imageSrc: imageSrc(entry.imageKey) })),
    quoteProducts: catalog.getProducts().map((product) => ({
      slug: product.slug,
      name: product.name,
      code: product.code,
      imageSrc: imageSrc(product.imageKey),
    })),
  };
  return Response.json(summary);
}
