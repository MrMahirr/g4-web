import type { ISiteContent } from "@/core/interfaces/ISiteContent";
import type { ISiteContentRepository } from "@/core/interfaces/ISiteContentRepository";
import type { LegalDocument } from "@/core/types";

export class SiteContentService implements ISiteContent {
  constructor(private readonly repository: ISiteContentRepository) {}

  getCompany() {
    return this.repository.getCompany();
  }

  getFaq() {
    return this.repository.getFaq();
  }

  getLegalDocument(slug: LegalDocument["slug"]) {
    return this.repository.getLegalDocuments().find((document) => document.slug === slug) ?? null;
  }
}
