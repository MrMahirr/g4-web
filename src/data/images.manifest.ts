import type { ImageEntry, ImageKey } from "@/core/types";

/**
 * Görsel manifesti — sitedeki tüm fotoğrafların tek kaynağı.
 * Anahtar kuralı: "<klasör>/<slug>" → dosya public/images/<klasör>/<slug>.jpg
 *   urunler/<ürün slug> · kategoriler/<kategori slug> · hizmetler/<kısa ad>
 *   haberler/<haber slug>[-n] · hero/ana · ana/medikal-perde · menu/kurumsal · menu/hizmetler
 *   kurumsal/hakkimizda-1 · kurumsal/kariyer · kurumsal/sss · genel/404 · genel/og
 *
 * Faz 2'de (Unsplash) doldurulacak. Anahtarı burada olmayan görsel için bileşenler
 * "Görsel alanı" şablonunu çizer; site görselsiz de eksiksiz çalışır.
 */
export const images: Record<ImageKey, ImageEntry> = {};
