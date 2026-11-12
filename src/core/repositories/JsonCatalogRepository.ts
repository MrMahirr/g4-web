import { loadContent } from "@/content/load";
import type { Locale } from "@/i18n/request";
import type { IImageRepository } from "@/core/interfaces/IImageRepository";
import type { INewsRepository } from "@/core/interfaces/INewsRepository";
import type { IProductRepository } from "@/core/interfaces/IProductRepository";
import type { IReferenceRepository } from "@/core/interfaces/IReferenceRepository";
import type { IServiceRepository } from "@/core/interfaces/IServiceRepository";
import type { ISiteContentRepository } from "@/core/interfaces/ISiteContentRepository";
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

export class JsonCatalogRepository
  implements
    ISiteContentRepository,
    IServiceRepository,
    IProductRepository,
    IReferenceRepository,
    INewsRepository,
    IImageRepository
{
  constructor(private readonly locale: Locale) {}

  private get content() {
    return loadContent(this.locale);
  }

  getCompany(): CompanyInfo {
    return this.content.company;
  }

  getServices(): ServiceItem[] {
    return this.content.services;
  }

  getCategories(): ProductCategory[] {
    return this.content.categories;
  }

  getProducts(): ProductItem[] {
    return this.content.products;
  }

  getHomeFeaturedSlugs(): string[] {
    return this.content.homeFeaturedSlugs;
  }

  getReferences(): ReferenceItem[] {
    return this.content.references;
  }

  getNews(): NewsItem[] {
    return this.content.news;
  }

  getFaq(): FaqItem[] {
    return this.content.faq;
  }

  getLegalDocuments(): LegalDocument[] {
    return this.content.legal;
  }

  getImage(key: ImageKey): ImageEntry | null {
    return this.content.images[key] ?? null;
  }
}
