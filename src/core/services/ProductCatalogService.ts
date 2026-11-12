import type { IProductCatalog } from "@/core/interfaces/IProductCatalog";
import type { IProductRepository } from "@/core/interfaces/IProductRepository";
import type { ProductCategoryWithCount, ProductItem, ProductQuery } from "@/core/types";
import { SARF_CATEGORY_SLUG, sarfSubGroups } from "@/content/constants";
import { filterProducts } from "@/lib/catalog";

export class ProductCatalogService implements IProductCatalog {
  constructor(
    private readonly repository: IProductRepository,
    private readonly subGroupLabels: Record<string, string>,
  ) {}

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
      title: this.subGroupLabels[group.slug],
      productCount: inCategory.filter((product) => product.subGroup === group.slug).length,
    }));
  }

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
}
