import type {
  CompanyInfo,
  FaqItem,
  ImageEntry,
  ImageKey,
  LegalDocument,
  NewsItem,
  ProductCategoryWithCount,
  ProductItem,
  ProductQuery,
  ReferenceItem,
  SarfSubGroup,
  SearchEntry,
  ServiceItem,
} from "@/core/types";

/** Sayfaların ve bileşenlerin içerik için kullandığı tek kapı. */
export interface ICatalogService {
  getCompany(): CompanyInfo;

  getServices(): ServiceItem[];
  getHomeServices(): ServiceItem[];
  getServiceBySlug(slug: string): ServiceItem | null;

  /** Ürün sayısıyla birlikte, menü sırasıyla. */
  getCategories(): ProductCategoryWithCount[];
  getCategoryBySlug(slug: string): ProductCategoryWithCount | null;
  /** Bir kategorideki alt grup filtreleri ve ürün sayıları (yalnız Genel Tıbbi Sarf için dolu). */
  getSubGroups(categorySlug: string): { slug: SarfSubGroup; title: string; productCount: number }[];

  getProducts(query?: ProductQuery): ProductItem[];
  getProductBySlug(slug: string): ProductItem | null;
  /** Aynı ana kategoriden, kendisi hariç. */
  getRelatedProducts(slug: string, limit?: number): ProductItem[];
  getHomeFeaturedProducts(): ProductItem[];
  /** Ürünün ana kategorisi (sayfa yolu için). */
  getPrimaryCategory(product: ProductItem): ProductCategoryWithCount | null;

  getReferences(): ReferenceItem[];
  getHomeReferences(): ReferenceItem[];

  /** En yeniden eskiye. */
  getNews(): NewsItem[];
  getNewsBySlug(slug: string): NewsItem | null;
  getNewsExcerpt(item: NewsItem, maxLength?: number): string;

  getFaq(): FaqItem[];
  getLegalDocument(slug: LegalDocument["slug"]): LegalDocument | null;

  getImage(key: ImageKey | undefined): ImageEntry | null;

  /** Arama katmanına gönderilen hafif dizin (ürün + ürün grubu + hizmet). */
  getSearchIndex(): SearchEntry[];
}
