import type { NewsItem } from "@/core/types";

export interface INewsRepository {
  getNews(): NewsItem[];
}
