import type { corporateLinks } from "@/data/navigation.data";

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
