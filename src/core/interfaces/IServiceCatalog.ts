import type { ServiceItem } from "@/core/types";

export interface IServiceCatalog {
  getServices(): ServiceItem[];
  getServiceBySlug(slug: string): ServiceItem | null;
}
