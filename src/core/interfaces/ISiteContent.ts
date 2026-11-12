import type { CompanyInfo, FaqItem, LegalDocument } from "@/core/types";

export interface ISiteContent {
  getCompany(): CompanyInfo;
  getFaq(): FaqItem[];
  getLegalDocument(slug: LegalDocument["slug"]): LegalDocument | null;
}
