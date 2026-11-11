"use client";

import { useCallback } from "react";
import type { InquiryDraft, InquiryType, QuoteLine } from "@/core/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { inquiryCleared, orderRequested, productAsked, selectInquiry } from "@/store/slices/inquirySlice";

/** Tek ürün soru/bilgi talebini veya çoklu ürün sipariş talebini forma taşır. */
export function useInquiry() {
  const dispatch = useAppDispatch();
  const inquiry = useAppSelector(selectInquiry);

  const requestOrder = useCallback(() => dispatch(orderRequested()), [dispatch]);
  const askAboutProduct = useCallback(
    (draft: Omit<InquiryDraft, "type"> & { type: Exclude<InquiryType, "siparis"> }) => {
      const product: QuoteLine = { productSlug: draft.productSlug, qty: draft.qty, unit: draft.unit };
      dispatch(productAsked({ type: draft.type, product }));
    },
    [dispatch],
  );
  const clear = useCallback(() => dispatch(inquiryCleared()), [dispatch]);

  return { inquiry, requestOrder, askAboutProduct, clear };
}
