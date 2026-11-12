import type { ProductCategoryWithCount, ProductItem, ProductQuery, SarfSubGroup } from "@/core/types";

export interface IProductCatalog {
  getCategories(): ProductCategoryWithCount[];
  getCategoryBySlug(slug: string): ProductCategoryWithCount | null;
  getSubGroups(categorySlug: string): { slug: SarfSubGroup; title: string; productCount: number }[];
  getProducts(query?: ProductQuery): ProductItem[];
  getProductBySlug(slug: string): ProductItem | null;
  getRelatedProducts(slug: string, limit?: number): ProductItem[];
  getHomeFeaturedProducts(): ProductItem[];
  getPrimaryCategory(product: ProductItem): ProductCategoryWithCount | null;
}
