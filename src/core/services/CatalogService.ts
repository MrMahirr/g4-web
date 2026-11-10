import type { ICatalogRepository } from "@/core/interfaces/ICatalogRepository";
import type { ICatalogService } from "@/core/interfaces/ICatalogService";
import type {
  ImageKey,
  NewsItem,
  ProductCategoryWithCount,
  ProductItem,
  ProductQuery,
  SearchEntry,
} from "@/core/types";
import { SARF_CATEGORY_SLUG, sarfSubGroups } from "@/data/categories.data";
import { routes } from "@/data/navigation.data";
import { filterProducts, pad2, trLower } from "@/lib/catalog";

/** İçerik sorguları. Veri kaynağını bilmez; yalnız ICatalogRepository ile konuşur. */
export class CatalogService implements ICatalogService {
  constructor(private readonly repository: ICatalogRepository) {}

  getCompany() {
    return this.repository.getCompany();
  }

  /* ---------- Hizmetler ---------- */

  getServices() {
    return this.repository.getServices();
  }

  getHomeServices() {
    return this.getServices().filter((service) => service.isFeaturedOnHome);
  }

  getServiceBySlug(slug: string) {
    return this.getServices().find((service) => service.slug === slug) ?? null;
  }

  /* ---------- Kategoriler ---------- */

  getCategories(): ProductCategoryWithCount[] {
    const products = this.repository.getProducts();
    return this.repository.getCategories().map((category) => ({
      ...category,
      productCount: products.filter((product) => product.categorySlugs.includes(category.slug)).length,
    }));
  }

  getCategoryBySlug(slug: string) {
    return this.getCategories().find((category) => category.slug === slug) ?? null;
  }

  getSubGroups(categorySlug: string) {
    if (categorySlug !== SARF_CATEGORY_SLUG) return [];
    const inCategory = this.getProducts({ categorySlug });
    return sarfSubGroups.map((group) => ({
      ...group,
      productCount: inCategory.filter((product) => product.subGroup === group.slug).length,
    }));
  }

  /* ---------- Ürünler ---------- */

  getProducts(query?: ProductQuery): ProductItem[] {
    return filterProducts(this.repository.getProducts(), query);
  }

  getProductBySlug(slug: string) {
    return this.repository.getProducts().find((product) => product.slug === slug) ?? null;
  }

  getRelatedProducts(slug: string, limit = 4): ProductItem[] {
    const product = this.getProductBySlug(slug);
    if (!product) return [];
    return this.getProducts({ categorySlug: product.categorySlugs[0] })
      .filter((candidate) => candidate.slug !== slug)
      .slice(0, limit);
  }

  getHomeFeaturedProducts(): ProductItem[] {
    return this.repository
      .getHomeFeaturedSlugs()
      .map((slug) => this.getProductBySlug(slug))
      .filter((product): product is ProductItem => product !== null);
  }

  getPrimaryCategory(product: ProductItem) {
    return this.getCategoryBySlug(product.categorySlugs[0]);
  }

  /* ---------- Referanslar ---------- */

  getReferences() {
    return this.repository.getReferences();
  }

  getHomeReferences() {
    return this.getReferences().filter((reference) => reference.isFeaturedOnHome);
  }

  /* ---------- Haberler ---------- */

  getNews(): NewsItem[] {
    return [...this.repository.getNews()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  getNewsBySlug(slug: string) {
    return this.repository.getNews().find((item) => item.slug === slug) ?? null;
  }

  /** İlk paragraftan, kelime ortasında kesmeden özet. */
  getNewsExcerpt(item: NewsItem, maxLength = 160): string {
    const text = item.paragraphs[0] ?? "";
    if (text.length <= maxLength) return text;
    const cut = text.slice(0, maxLength);
    return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
  }

  /* ---------- Diğer ---------- */

  getFaq() {
    return this.repository.getFaq();
  }

  getLegalDocument(slug: "cerez-politikasi" | "kvkk-aydinlatma-metni") {
    return this.repository.getLegalDocuments().find((document) => document.slug === slug) ?? null;
  }

  getImage(key: ImageKey | undefined) {
    return key ? this.repository.getImage(key) : null;
  }

  getSearchIndex(): SearchEntry[] {
    const productEntries: SearchEntry[] = this.repository.getProducts().map((product) => ({
      type: "urun",
      name: product.name,
      meta: product.code ? `Ref: ${product.code}` : "G4 Ürünleri",
      href: routes.product(product.slug),
      imageKey: product.imageKey,
      haystack: trLower(`${product.title} ${product.code ?? ""}`),
    }));

    const categoryEntries: SearchEntry[] = this.repository.getCategories().map((category, index) => ({
      type: "grup",
      name: category.title,
      meta: `Ürün grubu · ${pad2(index + 1)}`,
      href: routes.category(category.slug),
      imageKey: category.imageKey,
      haystack: trLower(category.title),
    }));

    const serviceEntries: SearchEntry[] = this.repository.getServices().map((service, index) => ({
      type: "hizmet",
      name: service.title,
      meta: `Hizmet · ${pad2(index + 1)}`,
      href: routes.service(service.slug),
      haystack: trLower(`${service.title} ${service.shortDescription}`),
    }));

    return [...productEntries, ...categoryEntries, ...serviceEntries];
  }
}
