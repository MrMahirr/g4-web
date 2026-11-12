"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { linesForInquiry } from "@/core/inquiry";
import type { InquiryType } from "@/core/types";
import { useInquiry } from "@/hooks/useInquiry";
import { useQuoteCart } from "@/hooks/useQuoteCart";
import type { QuoteProductInfo } from "@/types/catalog-view";

export function useInquiryLines(products: QuoteProductInfo[]) {
  const params = useSearchParams();
  const { inquiry, clear: clearInquiry } = useInquiry();
  const cart = useQuoteCart();
  const legacyProduct = params.get("product_name");
  const bySlug = useMemo(() => new Map(products.map((product) => [product.slug, product])), [products]);
  const type: InquiryType | null = inquiry.type ?? (legacyProduct ? "bilgi" : null);
  const lines = useMemo(() => linesForInquiry(inquiry, cart.lines), [inquiry, cart.lines]);
  const removeLine = (slug: string) => {
    if (inquiry.type === "siparis") {
      cart.remove(slug);
      if (lines.length <= 1) clearInquiry();
    } else {
      clearInquiry();
    }
  };
  return { type, lines, bySlug, legacyProduct, removeLine };
}
