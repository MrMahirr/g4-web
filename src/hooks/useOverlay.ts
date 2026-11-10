"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  mobileNavOpened,
  overlayClosed,
  quoteCartOpened,
  searchOpened,
  selectOverlay,
  type Overlay,
} from "@/store/slices/uiSlice";

/** Arama katmanı, mobil menü ve teklif çekmecesinin aç/kapa durumu (aynı anda yalnız biri açık). */
export function useOverlay(overlay: Overlay) {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectOverlay) === overlay;

  const open = useCallback(() => {
    switch (overlay) {
      case "search":
        return dispatch(searchOpened());
      case "mobileNav":
        return dispatch(mobileNavOpened());
      case "quoteCart":
        return dispatch(quoteCartOpened());
      default: {
        const exhaustive: never = overlay;
        return exhaustive;
      }
    }
  }, [dispatch, overlay]);

  const close = useCallback(() => dispatch(overlayClosed()), [dispatch]);

  /** Radix Dialog `onOpenChange` ile doğrudan kullanılabilir. */
  const setOpen = useCallback((next: boolean) => (next ? open() : close()), [open, close]);

  return { isOpen, open, close, setOpen };
}
