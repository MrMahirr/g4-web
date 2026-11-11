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

const toCard = ({ slug, name, code, imageSrc }: CategoryProduct): ProductCard => ({ slug, name, code, imageSrc });

const indexClass = cn(
  "flex min-h-11 cursor-pointer items-baseline justify-between gap-3 border-b border-line bg-transparent px-1 py-2.5 text-left text-[15px] text-ink",
  "transition-colors duration-300 hover:text-ember-d aria-pressed:border-b-2 aria-pressed:border-ember aria-pressed:font-bold",
  "max-stack:border max-stack:px-3 max-stack:aria-pressed:border-2",
);

const viewButtonClass = cn(
  "flex size-12 cursor-pointer items-center justify-center rounded-tag border border-line bg-transparent text-muted transition-colors duration-300",
  "hover:border-ink aria-pressed:border-ink aria-pressed:bg-tint aria-pressed:text-ink",
);

/**
 * Solda alt grup dizini (yapışkan), sağda ürün kartları.
 * Alt grup, arama ve sıralama URL'de tutulur (?grup=&q=&sirala=), görünüm yalnız bu oturumda.
 */
export function CategoryResults({ products, subGroups }: Props) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [view, setView] = useState<ProductView>("grid");

  const group = subGroups.find((item) => item.slug === params.get("grup"))?.slug;
  const query = params.get("q") ?? "";
  const sort = toSort(params.get("sirala"));

  const filtered = useMemo(() => filterProducts(products, { subGroup: group, q: query, sort }), [products, group, query, sort]);

  const update = (key: "grup" | "q" | "sirala", value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value && value !== "default") next.set(key, value);
    else next.delete(key);
    const search = next.toString();
    router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
  };

  const countLabel = tr.product.countSuffix.toLocaleUpperCase("tr-TR");
  const hasSidebar = subGroups.length > 0;

  return (
    <div className={cn("grid gap-12", hasSidebar && "grid-cols-[240px_1fr] max-stack:grid-cols-1")}>
      {hasSidebar ? (
        <aside className="self-start min-[961px]:sticky min-[961px]:top-28">
          <h2 className="mb-2 border-b-2 border-ink pb-3 font-mono text-xs tracking-[0.12em] uppercase">Alt Gruplar</h2>
          <div role="group" aria-label="Alt gruplar" className="flex flex-col max-stack:flex-row max-stack:flex-wrap max-stack:gap-2">
            <button type="button" aria-pressed={!group} onClick={() => update("grup", "")} className={indexClass}>
              <span>{tr.product.allSubGroups}</span>
              <span className="font-mono text-xs text-muted">{products.length}</span>
            </button>
            {subGroups.map((item) => (
              <button key={item.slug} type="button" aria-pressed={group === item.slug} onClick={() => update("grup", item.slug)} className={indexClass}>
                <span>{item.title}</span>
                <span className="font-mono text-xs text-muted">{item.productCount}</span>
              </button>
            ))}
          </div>
        </aside>
      ) : null}

      <div className="flex min-w-0 flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink pb-4">
          <span className="font-mono text-[13px] tracking-[0.04em] text-muted" aria-live="polite">
            {String(filtered.length).padStart(2, "0")} {countLabel}
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
                className="w-[200px] min-w-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-faint focus-visible:outline-none"
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

        {filtered.length > 0 ? (
          <ProductGrid products={filtered.map(toCard)} view={view} animationKey={`${group ?? ""}-${sort}-${view}`} />
        ) : (
          <p className="py-6 text-lead text-muted">Aramanızla eşleşen ürün bulunamadı.</p>
        )}
      </div>
    </div>
  );
}
