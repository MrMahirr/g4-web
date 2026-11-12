import type { SearchEntry } from "@/core/types";
import type { corporateLinks } from "@/data/navigation.data";

/** Arama katmanına giden dizin girdisi + küçük görselin yolu. */
export type SearchEntryWithImage = SearchEntry & { imageSrc?: string };

/** Teklif çekmecesinin ürün adlarını göstermek için ihtiyaç duyduğu hafif ürün bilgisi. */
export type QuoteProductInfo = { slug: string; name: string; code?: string; imageSrc?: string };

export type CorporateLinkKey = (typeof corporateLinks)[number]["key"];
export type NavLinkItem = { label: string; href: string };
export type CorporateNavLinkItem = { key: CorporateLinkKey; href: string };

/** Header'ın sunucudan aldığı tüm veri. */
export type HeaderData = {
  phone: { display: string; tel: string };
  email: string;
  corporateLinks: readonly CorporateNavLinkItem[];
  serviceLinks: readonly NavLinkItem[];
  categoryLinks: readonly NavLinkItem[];
  menuImages: { kurumsal?: string; hizmetler?: string };
};

/** Arama katmanı ve teklif çekmecesinin ihtiyaç duyduğu katalog özeti — /api/katalog-ozet (plan 8.5). */
export type CatalogSummary = {
  searchIndex: SearchEntryWithImage[];
  quoteProducts: QuoteProductInfo[];
};
