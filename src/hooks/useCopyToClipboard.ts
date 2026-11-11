"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Panoya kopyalama durumunu kısa süreli gösterir; zamanlayıcı unmount'ta temizlenir. */
export function useCopyToClipboard(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), resetAfter);
      return true;
    } catch {
      setCopied(false);
      return false;
    }
  }, [resetAfter]);

  return { copied, copy };
}
