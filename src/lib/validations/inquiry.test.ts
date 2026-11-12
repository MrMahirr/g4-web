import { describe, expect, it } from "vitest";
import { createInquirySchema, validateInquiryDraft } from "@/lib/validations/inquiry";

const schema = createInquirySchema(() => "Ürün seçilmelidir.");

describe("inquiry validation", () => {
  it("accepts valid drafts and rejects invalid product and quantity", () => {
    const valid = validateInquiryDraft(schema, {
      type: "bilgi",
      productSlug: "igneler",
      qty: 2,
      unit: "Kutu",
    });
    const invalid = validateInquiryDraft(schema, {
      type: "soru",
      productSlug: "",
      qty: 0,
      unit: "Palet",
    });
    expect(valid).toEqual({
      ok: true,
      value: { type: "bilgi", productSlug: "igneler", qty: 2, unit: "Kutu" },
    });
    expect(invalid).toMatchObject({
      ok: false,
      issues: {
        productSlug: expect.any(String),
        qty: expect.any(String),
        unit: expect.any(String),
      },
    });
  });
});
