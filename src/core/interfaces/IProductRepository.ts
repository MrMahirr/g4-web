import type { ProductCategory, ProductItem } from "@/core/types";

export interface IProductRepository {
  getCategories(): ProductCategory[];
  getProducts(): ProductItem[];
  getHomeFeaturedSlugs(): string[];
}
