import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import type { QuoteLine } from "@/core/types";
import {
  cartCleared,
  lineQtyChanged,
  lineRemoved,
  lineUnitChanged,
  lineUpserted,
  sanitizeLines,
  type QuoteCartState,
} from "./slices/quoteCartSlice";

const STORAGE_KEY = "g4-teklif-listesi";

/** Tarayıcıdaki kayıtlı teklif listesini okur. Depolama kapalıysa ya da veri bozuksa boş döner. */
export function readStoredLines(): QuoteLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitizeLines(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

function writeStoredLines(lines: QuoteLine[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Gizli sekme / dolu depolama: liste yalnız bu oturumda kalır.
  }
}

/** Teklif listesi her değiştiğinde localStorage'a yazar. */
export const persistenceListener = createListenerMiddleware();

persistenceListener.startListening({
  matcher: isAnyOf(lineUpserted, lineQtyChanged, lineUnitChanged, lineRemoved, cartCleared),
  effect: (_action, api) => {
    const { quoteCart } = api.getState() as { quoteCart: QuoteCartState };
    writeStoredLines(quoteCart.lines);
  },
});
