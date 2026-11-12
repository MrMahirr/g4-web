import { describe, expect, it } from "vitest";
import { isOrderInquiry, linesForInquiry } from "@/core/inquiry";

const line = { productSlug: "igneler", qty: 2, unit: "Kutu" as const };

describe("inquiry helpers", () => {
  it("identifies order inquiries", () => {
    expect(isOrderInquiry("siparis")).toBe(true);
    expect(isOrderInquiry("bilgi")).toBe(false);
  });

  it("selects cart or product lines based on inquiry type", () => {
    expect(linesForInquiry({ type: "siparis", product: null }, [line])).toEqual([line]);
    expect(linesForInquiry({ type: "soru", product: line }, [])).toEqual([line]);
    expect(linesForInquiry({ type: null, product: null }, [line])).toEqual([]);
  });
});
