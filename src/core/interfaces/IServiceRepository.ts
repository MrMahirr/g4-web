import type { ServiceItem } from "@/core/types";

export interface IServiceRepository {
  getServices(): ServiceItem[];
}
