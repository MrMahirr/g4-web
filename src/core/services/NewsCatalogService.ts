import type { INewsCatalog } from "@/core/interfaces/INewsCatalog";
import type { INewsRepository } from "@/core/interfaces/INewsRepository";
import type { NewsItem } from "@/core/types";

export class NewsCatalogService implements INewsCatalog {
  constructor(private readonly repository: INewsRepository) {}

  getNews(): NewsItem[] {
    return [...this.repository.getNews()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  getNewsBySlug(slug: string) {
    return this.repository.getNews().find((item) => item.slug === slug) ?? null;
  }
}
