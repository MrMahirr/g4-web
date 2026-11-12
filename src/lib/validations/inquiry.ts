import { z } from "zod";
import { QUOTE_UNITS, type InquiryDraft } from "@/core/types";

type Translate = (key: "form.errors.productRequired") => string;

export function createInquirySchema(t: Translate) {
  return z.object({
    type: z.enum(["siparis", "bilgi", "soru"]),
    productSlug: z.string().trim().min(1, t("form.errors.productRequired")),
    ref: z.string().trim().min(1).optional(),
    qty: z.number().finite().int().min(1).max(9999),
    unit: z.enum(QUOTE_UNITS),
  });
}

export type InquiryValidationResult =
  | { ok: true; value: InquiryDraft }
  | { ok: false; issues: Record<string, string> };

export function validateInquiryDraft(
  schema: ReturnType<typeof createInquirySchema>,
  input: unknown,
): InquiryValidationResult {
  const parsed = schema.safeParse(input);
  if (parsed.success) return { ok: true, value: parsed.data };
  const issues: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path.join(".") || "form";
    issues[key] ??= issue.message;
  }
  return { ok: false, issues };
}
