import type { SearchEntry } from "@/core/types";

/** Önizleme görseliyle zenginleştirilmiş arama girdisi. */
export type SearchEntryWithImage = SearchEntry & { imageSrc?: string };

/** Teklif çekmecesinin ihtiyaç duyduğu hafif ürün bilgisi. */
export type QuoteProductInfo = { slug: string; name: string; code?: string; imageSrc?: string };

/** Arama katmanı ve teklif çekmecesinin katalog özeti. */
export type CatalogSummary = {
  searchIndex: SearchEntryWithImage[];
  quoteProducts: QuoteProductInfo[];
};

/** Ürün liste satırının görünüm verisi. */
export type FeaturedRow = {
  slug: string;
  name: string;
  code?: string;
  imageSrc: string | null;
  group: string;
};
