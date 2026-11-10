import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InquiryType, QuoteLine } from "@/core/types";

/**
 * Ürün sayfasından iletişim formuna taşınan talep.
 * - "siparis": form, teklif listesindeki tüm ürünleri taşır (liste quoteCart'tadır).
 * - "bilgi" / "soru": yalnız `product` alanındaki tek ürün hakkındadır; listeye eklenmez.
 */
export interface InquiryState {
  type: InquiryType | null;
  product: QuoteLine | null;
}

const initialState: InquiryState = { type: null, product: null };

const inquirySlice = createSlice({
  name: "inquiry",
  initialState,
  reducers: {
    orderRequested(state) {
      state.type = "siparis";
      state.product = null;
    },
    productAsked(state, action: PayloadAction<{ type: Exclude<InquiryType, "siparis">; product: QuoteLine }>) {
      state.type = action.payload.type;
      state.product = action.payload.product;
    },
    inquiryCleared() {
      return initialState;
    },
  },
  selectors: {
    selectInquiry: (state) => state,
  },
});

export const { orderRequested, productAsked, inquiryCleared } = inquirySlice.actions;
export const { selectInquiry } = inquirySlice.selectors;
export default inquirySlice;
