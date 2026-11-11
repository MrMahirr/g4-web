"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import type { QuoteLine, QuoteUnit } from "@/core/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  cartCleared,
  lineQtyChanged,
  lineRemoved,
  lineUnitChanged,
  lineUpserted,
  selectIsHydrated,
  selectLines,
} from "@/store/slices/quoteCartSlice";

/** Teklif listesi: okuma + ekle / güncelle / çıkar / temizle. */
export function useQuoteCart() {
  const dispatch = useAppDispatch();
  const lines = useAppSelector(selectLines);
  const hydrated = useAppSelector(selectIsHydrated);

  const upsert = useCallback((line: QuoteLine) => {
    dispatch(lineUpserted(line));
    toast.success("Ürün teklif listesine eklendi.");
  }, [dispatch]);
  const setQty = useCallback(
    (productSlug: string, qty: number) => dispatch(lineQtyChanged({ productSlug, qty })),
    [dispatch],
  );
  const setUnit = useCallback(
    (productSlug: string, unit: QuoteUnit) => dispatch(lineUnitChanged({ productSlug, unit })),
    [dispatch],
  );
  const remove = useCallback((productSlug: string) => { dispatch(lineRemoved(productSlug)); toast.message("Ürün listeden kaldırıldı."); }, [dispatch]);
  const clear = useCallback(() => { dispatch(cartCleared()); toast.message("Teklif listesi temizlendi."); }, [dispatch]);
  const has = useCallback((productSlug: string) => lines.some((line) => line.productSlug === productSlug), [lines]);

  return { lines, count: lines.length, hydrated, has, upsert, setQty, setUnit, remove, clear };
}
