import { describe, expect, it } from "vitest";
import { buildInquiryDraft } from "@/lib/inquiry-draft";

const labels = {
  hello: "Merhaba,",
  thanks: "Teşekkürler.",
  subject: { siparis: "Sipariş", bilgi: "Bilgi", soru: "Soru" },
  intro: { siparis: "Sipariş listem", bilgi: "Bilgi istiyorum", soru: "Sorum var" },
  countSuffix: "ürün",
};
const products = new Map([
  ["igne", { name: "İğne", code: "A-1" }],
  ["sonda", { name: "Sonda", code: "B-2" }],
]);

describe("buildInquiryDraft", () => {
  it("builds an order draft for multiple products", () => {
    const draft = buildInquiryDraft({
      type: "siparis",
      lines: [
        { productSlug: "igne", qty: 2, unit: "Kutu" },
        { productSlug: "sonda", qty: 1, unit: "Adet" },
      ],
      products,
      legacyProduct: null,
      labels,
    });
    expect(draft?.subject).toBe("Sipariş – 2 ürün");
  });

  it("builds a single product information and question draft", () => {
    const information = buildInquiryDraft({
      type: "bilgi",
      lines: [{ productSlug: "igne", qty: 1, unit: "Adet" }],
      products,
      legacyProduct: null,
      labels,
    });
    const question = buildInquiryDraft({
      type: "soru",
      lines: [{ productSlug: "igne", qty: 1, unit: "Adet" }],
      products,
      legacyProduct: null,
      labels,
    });
    expect(information?.subject).toBe("Bilgi – A-1");
    expect(question?.message).toContain("Sorum var");
  });

  it("uses legacy product when no line exists", () => {
    const draft = buildInquiryDraft({
      type: "bilgi",
      lines: [],
      products,
      legacyProduct: "Eski ürün",
      labels,
    });
    expect(draft?.message).toContain("- Eski ürün");
  });

  it("returns null for empty input", () => {
    expect(
      buildInquiryDraft({ type: null, lines: [], products, legacyProduct: null, labels }),
    ).toBeNull();
  });
});
