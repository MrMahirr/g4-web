"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, List, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { ProductItem, ProductSort, SarfSubGroup } from "@/core/types";
import { tr } from "@/dictionaries/tr";
import { filterProducts } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { ProductGrid, type ProductCard, type ProductView } from "./ProductGrid";

export type CategoryProduct = Pick<ProductItem, "slug" | "title" | "name" | "code" | "categorySlugs" | "subGroup"> & {
  imageSrc: string | null;
};

type SubGroupOption = { slug: SarfSubGroup; title: string; productCount: number };

type Props = {
  products: CategoryProduct[];
  subGroups: SubGroupOption[];
};

const SORTS: ProductSort[] = ["default", "az", "za"];

function toSort(value: string | null): ProductSort {
  switch (value) {
    case "az":
    case "za":
      return value;
    default:
      return "default";
  }
}

const pillClass = cn(
  "min-h-11 cursor-pointer rounded-tag border border-line bg-transparent px-[18px] font-mono text-xs tracking-[0.06em] text-ink uppercase",
  "transition-colors duration-300 hover:border-ink aria-pressed:border-ink aria-pressed:bg-tint",
);

const viewButtonClass = cn(
  "flex size-12 cursor-pointer items-center justify-center rounded-tag border border-line bg-transparent text-muted transition-colors duration-300",
  "hover:border-ink aria-pressed:border-ink aria-pressed:bg-tint aria-pressed:text-ink",
);

/**
 * Kategori ürünleri + filtreler. Alt grup, arama ve sıralama URL'de tutulur
 * (?grup=&q=&sirala=), görünüm (ızgara/liste) yalnız bu oturumda.
 */
export function CategoryResults({ products, subGroups }: Props) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [view, setView] = useState<ProductView>("grid");

  const group = subGroups.find((item) => item.slug === params.get("grup"))?.slug;
  const query = params.get("q") ?? "";
  const sort = toSort(params.get("sirala"));

  const results: ProductCard[] = useMemo(
    () =>
      filterProducts(products, { subGroup: group, q: query, sort }).map(({ slug, name, code, imageSrc }) => ({
        slug,
        name,
        code,
        imageSrc,
      })),
    [products, group, query, sort],
  );

  const update = (key: "grup" | "q" | "sirala", value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value && value !== "default") next.set(key, value);
    else next.delete(key);
    const search = next.toString();
    router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-9">
      {subGroups.length > 0 ? (
        <div role="group" aria-label="Alt gruplar" className="flex flex-wrap gap-2">
          <button type="button" aria-pressed={!group} onClick={() => update("grup", "")} className={pillClass}>
            {tr.product.allSubGroups} ({products.length})
          </button>
          {subGroups.map((item) => (
            <button
              key={item.slug}
              type="button"
              aria-pressed={group === item.slug}
              onClick={() => update("grup", item.slug)}
              className={pillClass}
            >
              {item.title} ({item.productCount})
            </button>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="font-mono text-[13px] tracking-[0.04em] text-muted" aria-live="polite">
          {String(results.length).padStart(2, "0")} {tr.product.countSuffix.toLocaleUpperCase("tr-TR")}
        </span>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex min-h-12 items-center gap-2.5 border-b-[1.5px] border-line pr-1 transition-colors focus-within:border-ember">
            <Search size={17} className="text-faint" aria-hidden="true" />
            <span className="sr-only">{tr.product.searchInCategory}</span>
            <input
              type="search"
              value={query}
              placeholder={tr.product.searchInCategory}
              onChange={(event) => update("q", event.target.value)}
              className="w-[220px] min-w-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-faint focus-visible:outline-none"
            />
          </label>

          <label className="flex min-h-12 items-center">
            <span className="sr-only">Sıralama</span>
            <select
              value={sort}
              onChange={(event) => update("sirala", event.target.value)}
              className="h-12 cursor-pointer rounded-tag border border-line bg-white px-3 font-mono text-xs tracking-[0.06em] text-ink uppercase hover:border-ink"
            >
              {SORTS.map((option) => (
                <option key={option} value={option}>
                  {tr.product.sort[option]}
                </option>
              ))}
            </select>
          </label>

          <div role="group" aria-label="Görünüm" className="flex gap-1.5">
            <button type="button" aria-label="Izgara görünümü" aria-pressed={view === "grid"} onClick={() => setView("grid")} className={viewButtonClass}>
              <LayoutGrid size={18} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Liste görünümü" aria-pressed={view === "list"} onClick={() => setView("list")} className={viewButtonClass}>
              <List size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {results.length > 0 ? (
        <ProductGrid products={results} view={view} animationKey={`${group ?? ""}-${sort}-${view}`} />
      ) : (
        <p className="py-6 text-lead text-muted">Aramanızla eşleşen ürün bulunamadı.</p>
      )}
    </div>
  );
}
