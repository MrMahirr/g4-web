import type { IServiceCatalog } from "@/core/interfaces/IServiceCatalog";
import type { IServiceRepository } from "@/core/interfaces/IServiceRepository";

export class ServiceCatalogService implements IServiceCatalog {
  constructor(private readonly repository: IServiceRepository) {}

  getServices() {
    return this.repository.getServices();
  }

  getServiceBySlug(slug: string) {
    return this.getServices().find((service) => service.slug === slug) ?? null;
  }
}
