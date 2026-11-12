"use client";
import { useTranslations } from "next-intl";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SearchResultRow } from "@/components/layout/SearchResultRow";
import type { SearchEntryWithImage } from "@/types/catalog-view";
import { routes } from "@/data/navigation.data";
import { countByType, searchEntries, type SearchFilter } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const FILTERS: SearchFilter[] = ["all", "urun", "grup", "hizmet"];

/** /arama?q= tam sayfa sonuçlar — arama katmanının sayfa hali (sorgu URL'de). */
export function SearchResults({ index }: { index: SearchEntryWithImage[] }) {
  const t = useTranslations();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = params.get("q") ?? "";
  const [filter, setFilter] = useState<SearchFilter>("all");

  const hits = useMemo(() => searchEntries(index, query), [index, query]);
  const counts = useMemo(() => countByType(hits), [hits]);
  const shown = filter === "all" ? hits : hits.filter((hit) => hit.entry.type === filter);

  const setQuery = (value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set("q", value);
    else next.delete("q");
    const search = next.toString();
    router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
  };

  return (
    <div className="mx-auto flex max-w-[720px] flex-col gap-7">
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className={cn(
          "relative flex items-center gap-4 pb-3.5",
          "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-line after:content-['']",
          "before:absolute before:inset-x-0 before:bottom-0 before:z-[1] before:h-[1.5px] before:origin-left before:scale-x-0 before:bg-ink before:content-['']",
          "before:transition-transform before:duration-[600ms] before:ease-soft focus-within:before:scale-x-100",
        )}
      >
        <Search size={22} strokeWidth={1.8} className="flex-none text-faint" aria-hidden="true" />
        <label htmlFor="arama-sayfa" className="sr-only">
          {t("search.open")}
        </label>
        <input
          id="arama-sayfa"
          type="search"
          autoComplete="off"
          placeholder={t("search.placeholder")}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-h-14 min-w-0 flex-1 bg-transparent font-display text-[clamp(26px,3.4vw,40px)] tracking-[-0.03em] text-ink outline-none placeholder:text-[#9AAAB6] focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
      </form>

      {query.trim() ? (
        <div className="flex flex-col gap-[18px]">
          <div role="group" aria-label={t("search.filterLabel")} className="flex flex-wrap gap-[22px]">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
                className={cn(
                  "relative cursor-pointer py-1.5 text-sm text-faint transition-colors duration-200 hover:text-ink aria-pressed:text-ink",
                  "after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:scale-x-0 after:bg-ember-d after:content-['']",
                  "after:transition-transform after:duration-400 after:ease-soft aria-pressed:after:scale-x-100",
                )}
              >
                {t(`search.filters.${item}`)}
                <sup className="ml-[3px] text-[10px] text-faint">{counts[item]}</sup>
              </button>
            ))}
          </div>
          <div aria-live="polite" className="flex flex-col">
            {shown.map((hit, position) => (
              <SearchResultRow key={`${filter}-${hit.entry.type}-${hit.entry.href}`} hit={hit} position={position} />
            ))}
            {shown.length === 0 ? (
              <p className="py-[18px] text-[15px] leading-[1.6] text-muted">
                “{query}” {t("search.noResultsBefore")}{" "}
                <Link href={routes.contact} className="font-semibold text-ink">
                  {t("search.noResultsLink")}
                </Link>
                {t("search.noResultsAfter")}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
