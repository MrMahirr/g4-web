import type {
  CompanyInfo,
  FaqItem,
  ImageEntry,
  ImageKey,
  LegalDocument,
  NewsItem,
  ProductCategory,
  ProductItem,
  ReferenceItem,
  ServiceItem,
} from "@/core/types";

/**
 * Ham içerik kaynağı. Bugün yerel TS dosyaları (StaticCatalogRepository);
 * yarın REST/CMS olursa yalnız bu arayüzün yeni bir uygulaması yazılır, servis ve arayüz değişmez.
 */
export interface ICatalogRepository {
  getCompany(): CompanyInfo;
  getServices(): ServiceItem[];
  getCategories(): ProductCategory[];
  getProducts(): ProductItem[];
  /** Anasayfada öne çıkan ürünlerin slug'ları, gösterim sırasıyla. */
  getHomeFeaturedSlugs(): string[];
  getReferences(): ReferenceItem[];
  getNews(): NewsItem[];
  getFaq(): FaqItem[];
  getLegalDocuments(): LegalDocument[];
  getImage(key: ImageKey): ImageEntry | null;
}
