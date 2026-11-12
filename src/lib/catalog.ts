import type { ProductItem, ProductQuery, ProductSort, SearchEntry, SearchEntryType } from "@/core/types";

/**
 * Sunucuda (CatalogService) ve tarayıcıda (arama katmanı, kategori filtresi) ortak kullanılan
 * saf fonksiyonlar. Veri dosyalarını içe aktarmaz; istemci paketine yalnız mantık girer.
 */

const TR = "tr-TR";

/** Türkçe'ye duyarlı küçük harf (İ→i, I→ı). */
export function trLower(value: string): string {
  return value.toLocaleLowerCase(TR);
}

const collator = new Intl.Collator(TR, { sensitivity: "base", numeric: true });

/** Filtreleme için gereken en küçük ürün biçimi (istemciye tüm ürün nesnesi gönderilmesin diye). */
export type FilterableProduct = Pick<ProductItem, "title" | "name" | "code" | "categorySlugs" | "subGroup">;

function sortProducts<T extends FilterableProduct>(list: T[], sort: ProductSort): T[] {
  switch (sort) {
    case "default":
      return list;
    case "az":
      return [...list].sort((a, b) => collator.compare(a.name, b.name));
    case "za":
      return [...list].sort((a, b) => collator.compare(b.name, a.name));
    default: {
      const exhaustive: never = sort;
      return exhaustive;
    }
  }
}

/** Kategori, alt grup, arama metni ve sıralamaya göre ürün listesi. */
export function filterProducts<T extends FilterableProduct>(all: T[], query: ProductQuery = {}): T[] {
  const { categorySlug, subGroup, q, sort = "default" } = query;
  const needle = q ? trLower(q.trim()) : "";

  const filtered = all.filter((product) => {
    if (categorySlug && !product.categorySlugs.includes(categorySlug)) return false;
    if (subGroup && product.subGroup !== subGroup) return false;
    if (needle && !trLower(`${product.title} ${product.code ?? ""}`).includes(needle)) return false;
    return true;
  });

  return sortProducts(filtered, sort);
}

export type SearchFilter = "all" | SearchEntryType;

export interface SearchHit<T extends SearchEntry = SearchEntry> {
  entry: T;
  /** Adın eşleşmeden önceki, eşleşen ve sonraki parçaları (vurgulama için). Eşleşme adda değilse `hit` boştur. */
  pre: string;
  hit: string;
  post: string;
}

function splitName(name: string, needle: string): Pick<SearchHit, "pre" | "hit" | "post"> {
  const index = trLower(name).indexOf(needle);
  if (index < 0) return { pre: name, hit: "", post: "" };
  return { pre: name.slice(0, index), hit: name.slice(index, index + needle.length), post: name.slice(index + needle.length) };
}

/** Dizinde arar. Boş sorguda sonuç dönmez. */
export function searchEntries<T extends SearchEntry>(index: T[], rawQuery: string): SearchHit<T>[] {
  const needle = trLower(rawQuery.trim());
  if (!needle) return [];
  return index
    .filter((entry) => entry.haystack.includes(needle))
    .map((entry) => ({ entry, ...splitName(entry.name, needle) }));
}

/** Sekme sayıları: tümü + tür başına. */
export function countByType(hits: SearchHit<SearchEntry>[]): Record<SearchFilter, number> {
  const counts: Record<SearchFilter, number> = { all: hits.length, urun: 0, grup: 0, hizmet: 0 };
  for (const hit of hits) counts[hit.entry.type] += 1;
  return counts;
}


/** "01", "02"… */
export function pad2(value: number): string {
  return String(value).padStart(2, "0");
}
