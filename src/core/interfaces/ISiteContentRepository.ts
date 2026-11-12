import type { CompanyInfo, FaqItem, LegalDocument } from "@/core/types";

export interface ISiteContentRepository {
  getCompany(): CompanyInfo;
  getFaq(): FaqItem[];
  getLegalDocuments(): LegalDocument[];
}
