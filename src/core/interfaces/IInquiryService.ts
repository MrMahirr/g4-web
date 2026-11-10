import type { InquiryDraft } from "@/core/types";

export type InquiryValidationResult =
  | { ok: true; value: InquiryDraft }
  | { ok: false; issues: Record<string, string> };

/** Form gönderiminden bağımsız talep doğrulama kapısı. Gönderim Faz 7'de eklenecek. */
export interface IInquiryService {
  validateDraft(input: unknown): InquiryValidationResult;
}
