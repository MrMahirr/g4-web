import type { SearchEntry } from "@/core/types";

/** Arama katmanına giden dizin girdisi + küçük görselin yolu. */
export type SearchEntryWithImage = SearchEntry & { imageSrc?: string };

/** Teklif çekmecesinin ürün adlarını göstermek için ihtiyaç duyduğu hafif ürün bilgisi. */
export type QuoteProductInfo = { slug: string; name: string; code?: string; imageSrc?: string };

export type NavLinkItem = { label: string; href: string };

/** Header'ın sunucudan aldığı tüm veri. */
export type HeaderData = {
  phone: { display: string; tel: string };
  email: string;
  corporateLinks: NavLinkItem[];
  serviceLinks: NavLinkItem[];
  categoryLinks: NavLinkItem[];
  menuImages: { kurumsal?: string; hizmetler?: string };
  searchIndex: SearchEntryWithImage[];
  quoteProducts: QuoteProductInfo[];
};
