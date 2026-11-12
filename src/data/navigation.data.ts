
/** Sabit sayfa yolları — bileşenler yolu elle yazmaz, buradan alır. */
export const routes = {
  home: "/",
  about: "/icerik/hakkimizda",
  references: "/referanslar",
  career: "/insan-kaynaklari",
  faq: "/sss",
  news: "/haberler",
  services: "/hizmetler",
  products: "/urunler",
  contact: "/iletisim",
  contactForm: "/iletisim#form",
  search: "/arama",
  cookies: "/icerik/cerez-politikasi",
  kvkk: "/icerik/kvkk-aydinlatma-metni",
  service: (slug: string) => `/hizmet/${slug}`,
  category: (slug: string) => `/urun-kategori/${slug}`,
  product: (slug: string) => `/urun/${slug}`,
  newsItem: (slug: string) => `/haber/${slug}`,
} as const;

/** Header'daki aktif menü anahtarı. */
export type NavSection = "anasayfa" | "kurumsal" | "hizmetler" | "urunler" | "iletisim";

/** Kurumsal mega menüsü ve mobil menüdeki alt bağlantılar. */
export const corporateLinks = [
  { key: "about", href: routes.about },
  { key: "references", href: routes.references },
  { key: "career", href: routes.career },
  { key: "faq", href: routes.faq },
  { key: "news", href: routes.news },
] as const satisfies readonly { key: "about" | "references" | "career" | "faq" | "news"; href: string }[];

/** Mega menülerin sol sütun metinleri (tasarım: D4Header). */
export const megaMenu = {
  kurumsal: {
    imageKey: "menu/kurumsal",
  },
  hizmetler: {
    imageKey: "menu/hizmetler",
  },
  urunler: {
  },
} as const;

/** Footer "Kurumsal" sütunu (tasarım: D4Footer). */
export const footerCorporateLinks = [
  { key: "about", href: routes.about },
  { key: "products", href: routes.products },
  { key: "services", href: routes.services },
  { key: "references", href: routes.references },
  { key: "career", href: routes.career },
  { key: "faq", href: routes.faq },
  { key: "contact", href: routes.contact },
] as const satisfies readonly { key: "about" | "products" | "services" | "references" | "career" | "faq" | "contact"; href: string }[];

/** Footer yasal bağlantılar (tasarımda yoktu, eklendi). */
export const footerLegalLinks = [
  { key: "cookies", href: routes.cookies },
  { key: "kvkk", href: routes.kvkk },
] as const satisfies readonly { key: "cookies" | "kvkk"; href: string }[];


/** Yol → aktif menü bölümü. */
export function sectionForPath(pathname: string): NavSection | null {
  if (pathname === "/") return "anasayfa";
  const first = pathname.split("/")[1] ?? "";
  switch (first) {
    case "icerik":
    case "referanslar":
    case "insan-kaynaklari":
    case "sss":
    case "haberler":
    case "haber":
      return "kurumsal";
    case "hizmetler":
    case "hizmet":
      return "hizmetler";
    case "urunler":
    case "urun-kategori":
    case "urun":
      return "urunler";
    case "iletisim":
      return "iletisim";
    default:
      return null;
  }
}
