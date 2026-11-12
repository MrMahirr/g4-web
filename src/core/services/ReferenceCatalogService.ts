import type { IReferenceCatalog } from "@/core/interfaces/IReferenceCatalog";
import type { IReferenceRepository } from "@/core/interfaces/IReferenceRepository";

export class ReferenceCatalogService implements IReferenceCatalog {
  constructor(private readonly repository: IReferenceRepository) {}

  getReferences() {
    return this.repository.getReferences();
  }

  getHomeReferences() {
    return this.getReferences().filter((reference) => reference.isFeaturedOnHome);
  }
}
