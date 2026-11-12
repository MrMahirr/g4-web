/** Sitedeki tüm içerik tipleri. Veri dosyaları (src/data) ve servis arayüzleri bunları kullanır. */

import type {
  CompanyInfoSchema,
  FaqItemSchema,
  ImageEntrySchema,
  LegalDocumentSchema,
  NewsItemSchema,
  ProductCategorySchema,
  ProductItemSchema,
  ReferenceItemSchema,
  ServiceItemSchema,
} from "@/content/schema";

export type ServiceDomain = "medical" | "construction" | "textile" | "fleet";

/** Görsel manifestindeki anahtar ("urunler/foley-sonda-cesitleri"). Dosya yoksa bileşen şablon çizer. */
export type ImageKey = string;

export interface ImageEntry {
  /** public/ altındaki yol ("/images/urunler/foley-sonda-cesitleri.webp") — `npm run images` ile gorsel-arsivi/ içinden üretilir. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Birebir ürün fotoğrafı değil, alt grubu temsil eden stok görsel. */
  representative?: boolean;
  credit?: { site: string; photographer: string; url: string };
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  paragraphs: string[];
  imageKey: ImageKey;
  domain: ServiceDomain;
  /** Hizmet sayfasının altında listelenecek ürün kategorisi. */
  relatedCategorySlug?: string;
  /** Anasayfadaki "Medikal Hizmetlerimiz" şeridinde gösterilir. */
  isFeaturedOnHome?: boolean;
}

export interface ProductCategory {
  id: string;
  slug: string;
  title: string;
  imageKey: ImageKey;
  domain: ServiceDomain;
}

export interface ProductCategoryWithCount extends ProductCategory {
  productCount: number;
}

/** "Genel Tıbbi Sarf Malzemeler" kategorisinin alt grupları. */
export type SarfSubGroup =
  | "siringa-igne"
  | "sonda-kateter"
  | "solunum-anestezi"
  | "cerrahi-pansuman"
  | "kardiyoloji-kagit"
  | "laboratuvar-tup"
  | "koruyucu-diger";

export interface ProductItem {
  id: string;
  /** Eski sitedeki URL ile birebir aynı. */
  slug: string;
  /** Eski sitedeki tam başlık (Ref kodu dahil olabilir) — sayfa başlığı ve SEO için. */
  title: string;
  /** Listelerde gösterilen ad (Ref kodu ayrı satırda gösterildiği için başlıktan çıkarılmış). */
  name: string;
  /** Ref / ürün kodu ("01-110V-20010"). */
  code?: string;
  /** İlk öğe ana kategoridir (sayfa yolu, kanonik). Bir ürün birden çok kategoride olabilir. */
  categorySlugs: string[];
  subGroup?: SarfSubGroup;
  imageKey: ImageKey;
  description: string;
  galleryKeys?: ImageKey[];
  isFeaturedOnHome?: boolean;
}

export interface ReferenceItem {
  id: string;
  title: string;
  sectorLabel: string;
  /** Kurumun sektörünü temsil eden stok fotoğraf (kurumun kendi fotoğrafı değildir). */
  imageKey?: ImageKey;
  /** Kurum logosu gelirse doldurulur; doluysa fotoğrafın yerine logo gösterilir. */
  logoKey?: ImageKey;
  isFeaturedOnHome?: boolean;
}

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  /** ISO tarih-saat. */
  publishedAt: string;
  paragraphs: string[];
  imageKey: ImageKey;
  galleryKeys: ImageKey[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/** Hukuk onayı gelene kadar taslak olarak yayımlanacak yasal metin. */
export interface LegalDocument {
  slug: "cerez-politikasi" | "kvkk-aydinlatma-metni";
  title: string;
  paragraphs: string[];
  /** Gerçek metin müşteri tarafından henüz onaylanmadığında görünür uyarı. */
  approvalPending: boolean;
}

export interface StatItem {
  /** Dile bağlı olmayan kimlik — kod sayaçları etikete göre değil buna göre bulur. */
  id: "customers" | "orders" | "products" | "packages";
  value: number;
  /** Üstteki mono satır ("Memnuniyet Oranı"). */
  kicker: string;
  /** Alttaki ad ("Mutlu Müşteri"). */
  label: string;
}

export type SocialChannel = "whatsapp" | "telegram" | "instagram" | "x" | "linkedin";

export interface SocialLink {
  channel: SocialChannel;
  label: string;
  /** Bağlantı henüz verilmediyse null — çip tıklanamaz gösterilir. */
  href: string | null;
}

export interface CompanyInfo {
  legalName: string;
  shortName: string;
  address: { full: string; street: string; district: string; city: string; mapsUrl: string; mapsEmbedUrl: string };
  phone: { display: string; tel: string };
  email: string;
  whatsappUrl: string;
  socials: SocialLink[];
  stats: StatItem[];
}

type IsMutuallyAssignable<Left, Right> = Left extends Right
  ? Right extends Left
    ? true
    : false
  : false;
type Assert<T extends true> = T;

export type ServiceItemMatchesSchema = Assert<IsMutuallyAssignable<ServiceItem, ServiceItemSchema>>;
export type ProductCategoryMatchesSchema = Assert<
  IsMutuallyAssignable<ProductCategory, ProductCategorySchema>
>;
export type ProductItemMatchesSchema = Assert<IsMutuallyAssignable<ProductItem, ProductItemSchema>>;
export type ReferenceItemMatchesSchema = Assert<IsMutuallyAssignable<ReferenceItem, ReferenceItemSchema>>;
export type NewsItemMatchesSchema = Assert<IsMutuallyAssignable<NewsItem, NewsItemSchema>>;
export type FaqItemMatchesSchema = Assert<IsMutuallyAssignable<FaqItem, FaqItemSchema>>;
export type LegalDocumentMatchesSchema = Assert<IsMutuallyAssignable<LegalDocument, LegalDocumentSchema>>;
export type CompanyInfoMatchesSchema = Assert<IsMutuallyAssignable<CompanyInfo, CompanyInfoSchema>>;
export type ImageEntryMatchesSchema = Assert<IsMutuallyAssignable<ImageEntry, ImageEntrySchema>>;

export interface NavLink {
  label: string;
  href: string;
}

/* ---------- Katalog sorguları ---------- */

export type ProductSort = "default" | "az" | "za";

export interface ProductQuery {
  categorySlug?: string;
  subGroup?: SarfSubGroup;
  /** Ad veya Ref kodunda aranır. */
  q?: string;
  sort?: ProductSort;
}

/* ---------- Site içi arama ---------- */

export type SearchEntryType = "urun" | "grup" | "hizmet";

export interface SearchEntry {
  type: SearchEntryType;
  name: string;
  /** Alt satır ("Ref: 01-110V-20010", "Ürün grubu · 03"). */
  meta: string;
  href: string;
  imageKey?: ImageKey;
  /** Eşleşmenin arandığı, Türkçe küçük harfe çevrilmiş metin. */
  haystack: string;
}

/* ---------- Teklif listesi ve talep ---------- */

export const QUOTE_UNITS = ["Adet", "Kutu", "Koli"] as const;
export type QuoteUnit = (typeof QUOTE_UNITS)[number];

export interface QuoteLine {
  productSlug: string;
  qty: number;
  unit: QuoteUnit;
}

export type InquiryType = "siparis" | "bilgi" | "soru";

/** Ürün sayfasından iletişim formuna taşınan tek ürün talebi. */
export interface InquiryDraft {
  type: InquiryType;
  productSlug: string;
  ref?: string;
  qty: number;
  unit: QuoteUnit;
}
