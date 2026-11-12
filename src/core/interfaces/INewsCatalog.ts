import type { NewsItem } from "@/core/types";

export interface INewsCatalog {
  getNews(): NewsItem[];
  getNewsBySlug(slug: string): NewsItem | null;
}
