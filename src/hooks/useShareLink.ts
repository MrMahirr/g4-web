"use client";

import { useCallback } from "react";
import { useCopyToClipboard } from "./useCopyToClipboard";

/** Yerel paylaşım arayüzünü kullanır; desteklenmiyorsa bağlantıyı panoya kopyalar. */
export function useShareLink() {
  const clipboard = useCopyToClipboard();

  const share = useCallback(async (title: string) => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // Kullanıcı paylaşımı iptal etti.
      }
      return false;
    }
    return clipboard.copy(url);
  }, [clipboard]);

  return { share };
}
