import type { ICatalogRepository } from "@/core/interfaces/ICatalogRepository";
import type { ImageEntry, ImageKey } from "@/core/types";
import { categories } from "@/data/categories.data";
import { company } from "@/data/company.data";
import { faq } from "@/data/faq.data";
import { images } from "@/data/images.manifest";
import { legalDocuments } from "@/data/legal.data";
import { news } from "@/data/news.data";
import { homeFeaturedSlugs, products } from "@/data/products.data";
import { references } from "@/data/references.data";
import { services } from "@/data/services.data";

/** İçeriği src/data altındaki TS dosyalarından okur. */
export class StaticCatalogRepository implements ICatalogRepository {
  getCompany() {
    return company;
  }
  getServices() {
    return services;
  }
  getCategories() {
    return categories;
  }
  getProducts() {
    return products;
  }
  getHomeFeaturedSlugs() {
    return homeFeaturedSlugs;
  }
  getReferences() {
    return references;
  }
  getNews() {
    return news;
  }
  getFaq() {
    return faq;
  }
  getLegalDocuments() {
    return legalDocuments;
  }
  getImage(key: ImageKey): ImageEntry | null {
    return images[key] ?? null;
  }
}
