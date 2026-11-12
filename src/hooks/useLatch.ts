"use client";

import { useState } from "react";

/**
 * Değer bir kez true olunca true kalır. Ertelenen katmanlar ilk açılışta çizilir,
 * kapanınca da kapanış animasyonu oynayabilsin diye çizili kalır.
 */
export function useLatch(value: boolean): boolean {
  const [latched, setLatched] = useState(value);
  // React'in "önceki değerden türetilen durum" kalıbı: render sırasında aynı bileşenin durumu güncellenir.
  if (value && !latched) setLatched(true);
  return latched || value;
}
