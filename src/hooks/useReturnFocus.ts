"use client";

import { type RefObject, useRef } from "react";

/**
 * Radix Dialog kapanınca odağı yalnız `Dialog.Trigger`'a döndürür. Katmanlarımız (arama, mobil menü,
 * teklif çekmecesi) Redux durumuyla açıldığı için Trigger yok ve odak <body>'ye düşüyordu (WCAG 2.4.3).
 * `onOpenAutoFocus` anında odak hâlâ açan düğmededir; onu saklar, kapanınca oraya döner.
 *
 * Kullanım: `<Dialog.Content {...useReturnFocus()}>`. Açılışta belirli bir öğeye odaklanılacaksa
 * (ör. arama kutusu) `initialFocus` verilir; o öğeye React `autoFocus` konmaz, yoksa açan düğmeden önce
 * odağı alır ve geri dönülecek yer kaybolur.
 */
export function useReturnFocus(initialFocus?: RefObject<HTMLElement | null>) {
  const opener = useRef<HTMLElement | null>(null);

  return {
    onOpenAutoFocus: (event: Event) => {
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      if (initialFocus?.current) {
        event.preventDefault();
        initialFocus.current.focus();
      }
    },
    onCloseAutoFocus: (event: Event) => {
      const target = opener.current;
      opener.current = null;
      // Açan öğe sayfadan kalktıysa (ör. menüden başka sayfaya geçildi) Radix'in varsayılanı çalışır.
      if (target?.isConnected) {
        event.preventDefault();
        target.focus({ preventScroll: true });
      }
    },
  };
}
