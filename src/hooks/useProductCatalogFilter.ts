"use client";

import { useMemo, useState } from "react";
import type { ProductItem, ProductQuery, ProductSort, SarfSubGroup } from "@/core/types";
import { filterProducts } from "@/lib/catalog";

/** Katalog ekranındaki istemci filtreleri; ham ürünler sayfadan prop olarak verilir. */
export function useProductCatalogFilter(products: ProductItem[], initial: ProductQuery = {}) {
  const [categorySlug, setCategorySlug] = useState(initial.categorySlug);
  const [subGroup, setSubGroup] = useState<SarfSubGroup | undefined>(initial.subGroup);
  const [q, setQuery] = useState(initial.q ?? "");
  const [sort, setSort] = useState<ProductSort>(initial.sort ?? "default");

  const query = useMemo<ProductQuery>(
    () => ({ categorySlug, subGroup, q, sort }),
    [categorySlug, q, sort, subGroup],
  );
  const results = useMemo(() => filterProducts(products, query), [products, query]);

  return { results, query, setCategorySlug, setSubGroup, setQuery, setSort };
}
