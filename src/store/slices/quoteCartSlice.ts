import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { MAX_QTY, QUOTE_UNITS, type QuoteLine, type QuoteUnit } from "@/core/types";

/** Çoklu ürün teklif listesi. Tarayıcıda localStorage'da saklanır (bkz. store/persistence.ts). */
export interface QuoteCartState {
  lines: QuoteLine[];
  /** localStorage okunana kadar false; rozet ve liste bu süre içinde çizilmez (hydration uyumu). */
  hydrated: boolean;
}

const initialState: QuoteCartState = { lines: [], hydrated: false };

function clampQty(qty: number): number {
  if (!Number.isFinite(qty)) return 1;
  return Math.min(MAX_QTY, Math.max(1, Math.round(qty)));
}

function isUnit(value: unknown): value is QuoteUnit {
  return QUOTE_UNITS.includes(value as QuoteUnit);
}

/** Saklanan veriyi güvenle okur; bozuk ya da eski biçimli satırları atar. */
export function sanitizeLines(raw: unknown): QuoteLine[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const lines: QuoteLine[] = [];
  for (const item of raw) {
    if (typeof item !== "object" || item === null) continue;
    const { productSlug, qty, unit } = item as Record<string, unknown>;
    if (typeof productSlug !== "string" || !productSlug || seen.has(productSlug)) continue;
    seen.add(productSlug);
    lines.push({ productSlug, qty: clampQty(Number(qty)), unit: isUnit(unit) ? unit : "Adet" });
  }
  return lines;
}

const quoteCartSlice = createSlice({
  name: "quoteCart",
  initialState,
  reducers: {
    /** localStorage'dan ilk yükleme. */
    cartHydrated(state, action: PayloadAction<QuoteLine[]>) {
      state.lines = action.payload;
      state.hydrated = true;
    },
    /** Ürün listede varsa miktar ve birimi günceller, yoksa ekler. */
    lineUpserted(state, action: PayloadAction<QuoteLine>) {
      const { productSlug, unit } = action.payload;
      const qty = clampQty(action.payload.qty);
      const existing = state.lines.find((line) => line.productSlug === productSlug);
      if (existing) {
        existing.qty = qty;
        existing.unit = unit;
      } else {
        state.lines.push({ productSlug, qty, unit });
      }
    },
    lineQtyChanged(state, action: PayloadAction<{ productSlug: string; qty: number }>) {
      const line = state.lines.find((item) => item.productSlug === action.payload.productSlug);
      if (line) line.qty = clampQty(action.payload.qty);
    },
    lineUnitChanged(state, action: PayloadAction<{ productSlug: string; unit: QuoteUnit }>) {
      const line = state.lines.find((item) => item.productSlug === action.payload.productSlug);
      if (line) line.unit = action.payload.unit;
    },
    lineRemoved(state, action: PayloadAction<string>) {
      state.lines = state.lines.filter((line) => line.productSlug !== action.payload);
    },
    cartCleared(state) {
      state.lines = [];
    },
  },
  selectors: {
    selectLines: (state) => state.lines,
    selectLineCount: (state) => state.lines.length,
    selectIsHydrated: (state) => state.hydrated,
    selectLineBySlug: (state, slug: string) => state.lines.find((line) => line.productSlug === slug),
  },
});

export const { cartHydrated, lineUpserted, lineQtyChanged, lineUnitChanged, lineRemoved, cartCleared } =
  quoteCartSlice.actions;
export const { selectLines, selectLineCount, selectIsHydrated, selectLineBySlug } = quoteCartSlice.selectors;
export default quoteCartSlice;
