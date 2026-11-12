import type { InquiryRequest, InquiryType, QuoteLine } from "@/core/types";

export function isOrderInquiry(type: InquiryType | null): type is "siparis" {
  return type === "siparis";
}

export function linesForInquiry(request: InquiryRequest, cartLines: QuoteLine[]): QuoteLine[] {
  switch (request.type) {
    case "siparis":
      return cartLines;
    case "bilgi":
    case "soru":
      return request.product ? [request.product] : [];
    case null:
      return [];
    default: {
      const exhaustive: never = request.type;
      return exhaustive;
    }
  }
}
