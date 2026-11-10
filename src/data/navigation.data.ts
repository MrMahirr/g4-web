import type { NavLink } from "@/core/types";

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
export const corporateLinks: NavLink[] = [
  { label: "Hakkımızda", href: routes.about },
  { label: "Referanslarımız", href: routes.references },
  { label: "Kariyer", href: routes.career },
  { label: "Sıkça Sorulan Sorular", href: routes.faq },
  { label: "Güncel Haberler", href: routes.news },
];

/** Mega menülerin sol sütun metinleri (tasarım: D4Header). */
export const megaMenuCopy = {
  kurumsal: {
    tag: "01 · Kurumsal",
    text: "Yenilikçi vizyonumuz ve kurumsal yaklaşımımızla sizlere daha yakından tanıtmak istiyoruz.",
    imageKey: "menu/kurumsal",
  },
  hizmetler: {
    tag: "02 · Profesyonel Çözümler",
    text: "Kaliteli, güvenilir ve yenilikçi hizmet anlayışımızla sektörümüzde fark yaratıyoruz.",
    allLabel: "Tüm Hizmetler",
    imageKey: "menu/hizmetler",
  },
  urunler: {
    tag: "03 · Siz Seçin, Biz Sunalım",
    title: "Ürün Grupları",
    text: "Zengin ürün yelpazemizle farklı sektör ve ihtiyaçlara hitap ediyor, yüksek kalite standartlarıyla fark yaratıyoruz.",
    allLabel: "Tüm Ürünler",
  },
} as const;

/** Footer "Kurumsal" sütunu (tasarım: D4Footer). */
export const footerCorporateLinks: NavLink[] = [
  { label: "Hakkımızda", href: routes.about },
  { label: "Ürünlerimiz", href: routes.products },
  { label: "Hizmetlerimiz", href: routes.services },
  { label: "Referanslarımız", href: routes.references },
  { label: "İnsan Kaynakları", href: routes.career },
  { label: "Sıkça Sorulan Sorular", href: routes.faq },
  { label: "İletişim", href: routes.contact },
];

/** Footer yasal bağlantılar (tasarımda yoktu, eklendi). */
export const footerLegalLinks: NavLink[] = [
  { label: "Çerez Politikası", href: routes.cookies },
  { label: "KVKK Aydınlatma Metni", href: routes.kvkk },
];

/** Arama katmanındaki "Sık arananlar". */
export const popularSearches = ["Bipolar", "Forseps", "Sütur", "Ambu", "Hastane Tekstili", "01-040V"];

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
