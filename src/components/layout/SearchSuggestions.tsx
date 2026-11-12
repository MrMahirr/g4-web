"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { m } from "motion/react";
import { EASE_SOFT } from "@/lib/utils";
import type { NavLinkItem } from "./types";

type Props = {
  categories: readonly NavLinkItem[];
  onSelect: () => void;
  onQuery: (query: string) => void;
};

/** Arama metni yokken gösterilen popüler terimler ve ürün grupları. */
export function SearchSuggestions({ categories, onSelect, onQuery }: Props) {
  const t = useTranslations();

  return (
    <m.div
      className="flex flex-col gap-7"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_SOFT, delay: 0.1 }}
    >
      <div className="flex flex-col gap-3">
        <span className="text-xs tracking-[0.08em] text-faint uppercase">{t("search.popular")}</span>
        <div className="flex flex-wrap items-baseline gap-x-[18px] gap-y-1.5">
          {(t.raw("navLinks.popularSearches") as string[]).map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => onQuery(term)}
              className="cursor-pointer border-b border-transparent py-1 text-[15px] text-ink transition-colors duration-200 hover:border-ink"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-xs tracking-[0.08em] text-faint uppercase">{t("search.groups")}</span>
        <div className="flex flex-wrap items-baseline gap-x-[18px] gap-y-1.5">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              onClick={onSelect}
              className="border-b border-transparent py-1 text-[15px] text-ink no-underline transition-colors duration-200 hover:border-ink"
            >
              {category.label}
            </Link>
          ))}
        </div>
      </div>
    </m.div>
  );
}
