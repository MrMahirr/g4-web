import { z } from "zod";
import type { IInquiryService, InquiryValidationResult } from "@/core/interfaces/IInquiryService";
import { QUOTE_UNITS, type InquiryDraft } from "@/core/types";

const inquiryDraftSchema = z.object({
  type: z.enum(["siparis", "bilgi", "soru"]),
  productSlug: z.string().trim().min(1, "Ürün seçilmelidir."),
  ref: z.string().trim().min(1).optional(),
  qty: z.number().finite().int().min(1).max(9999),
  unit: z.enum(QUOTE_UNITS),
});

/** Faz 7'deki form endpoint'iyle paylaşılacak talep doğrulaması. */
export class InquiryService implements IInquiryService {
  validateDraft(input: unknown): InquiryValidationResult {
    const parsed = inquiryDraftSchema.safeParse(input);
    if (parsed.success) return { ok: true, value: parsed.data satisfies InquiryDraft };

    const issues: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      issues[key] ??= issue.message;
    }
    return { ok: false, issues };
  }
}
