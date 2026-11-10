"use client";

import { useMemo, useState } from "react";
import type { SearchEntry } from "@/core/types";
import { countByType, searchEntries, type SearchFilter } from "@/lib/catalog";
import { useOverlay } from "./useOverlay";

/** Arama katmanının sorgusu, sekmesi ve sonuçları. Dizin sunucudan prop olarak gelir. */
export function useSearchOverlay(index: SearchEntry[]) {
  const overlay = useOverlay("search");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SearchFilter>("all");
  const hits = useMemo(() => searchEntries(index, query), [index, query]);
  const counts = useMemo(() => countByType(hits), [hits]);
  const results = useMemo(
    () => (filter === "all" ? hits : hits.filter((hit) => hit.entry.type === filter)),
    [filter, hits],
  );

  return { ...overlay, query, setQuery, filter, setFilter, results, counts };
}
