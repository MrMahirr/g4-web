"use client";

import { useEffect, useState } from "react";
import type { CatalogSummary } from "@/types/catalog-view";

export const CATALOG_SUMMARY_URL = "/api/katalog-ozet";

/** Sayfa ömrü boyunca tek istek: arama ve teklif çekmecesi aynı sonucu paylaşır. */
let cached: CatalogSummary | null = null;
let pending: Promise<CatalogSummary> | null = null;

/** Veriyi önceden çekmeye başlar (ör. tetikleyici düğmenin üzerine gelince). */
export function preloadCatalogSummary(): Promise<CatalogSummary> {
  if (cached) return Promise.resolve(cached);
  pending ??= fetch(CATALOG_SUMMARY_URL)
    .then((response) => {
      if (!response.ok) throw new Error(`Katalog özeti alınamadı: ${response.status}`);
      return response.json() as Promise<CatalogSummary>;
    })
    .then((data) => (cached = data))
    .catch((error: unknown) => {
      pending = null; // bir sonraki açılışta yeniden denensin
      throw error;
    });
  return pending;
}

/**
 * Arama dizini + teklif ürünleri. `active` olunca (katman açıldığında) yüklenir; o zamana kadar null.
 * Önceden kök layout'ta her sayfaya gömülüyordu (plan 8.5).
 */
export function useCatalogSummary(active: boolean): CatalogSummary | null {
  const [data, setData] = useState<CatalogSummary | null>(cached);

  useEffect(() => {
    if (!active || data) return;
    let alive = true;
    preloadCatalogSummary()
      .then((summary) => alive && setData(summary))
      .catch((error: unknown) => console.error(error));
    return () => {
      alive = false;
    };
  }, [active, data]);

  return data;
}
