"use client";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { ListRow } from "@/components/shared/ListRow";
import { routes } from "@/data/navigation.data";
import { cn, EASE_SOFT } from "@/lib/utils";
import { AddQuoteButton } from "./AddQuoteButton";

export type FeaturedRow = {
  slug: string;
  name: string;
  code?: string;
  /** Önizleme görseli; yoksa "Görsel alanı" şablonu. */
  imageSrc: string | null;
  /** Filtre grubu (ana kategori adı). */
  group: string;
};

type Props = {
  rows: FeaturedRow[];
  /** Verilirse başlık solda, filtre düğmeleri sağda durur (tasarım: D4Urunler). */
  heading?: ReactNode;
  /** true: "Tümü / <kategori>…" filtre düğmeleri (tasarım: .pill2). */
  filterable?: boolean;
  /** false: üzerine gelince açılan önizleme görseli gösterilmez (ürün detay "benzer ürünler"). */
  preview?: boolean;
  /** Başlık yazı boyutu (ListRow'a geçer). */
  titleClassName?: string;
  className?: string;
};

const ALL = "Tümü";

/** Ürün liste satırları (tasarım: .rowl). Filtre değişince satırlar sırayla yükselir (riseIn .7s, 60ms). */
export function FeaturedProductList({
  rows,
  heading,
  filterable = false,
  preview = true,
  titleClassName,
  className,
}: Props) {
  const groups = [ALL, ...Array.from(new Set(rows.map((row) => row.group)))];
  const [selected, setSelected] = useState(ALL);
  const shown = selected === ALL ? rows : rows.filter((row) => row.group === selected);
  const showFilters = filterable && groups.length > 2;

  const filters = showFilters ? (
    <div role="group" aria-label="Ürün filtresi" className="flex flex-wrap gap-2">
      {groups.map((group) => (
        <button
          key={group}
          type="button"
          aria-pressed={group === selected}
          onClick={() => setSelected(group)}
          className={cn(
            "min-h-11 cursor-pointer rounded-tag border border-ink/25 bg-transparent px-[18px] font-mono text-xs tracking-[0.06em] text-ink uppercase",
            "transition-colors duration-300 hover:border-ink aria-pressed:border-ink aria-pressed:bg-tint",
          )}
        >
          {group}
        </button>
      ))}
    </div>
  ) : null;

  return (
    <div className={cn("flex flex-col gap-9", className)}>
      {heading || filters ? (
        <div className="flex flex-wrap items-end justify-between gap-6">
          {heading}
          {filters}
        </div>
      ) : null}

      <ul className="m-0 list-none border-t border-ink/14 p-0">
        {shown.map((row, index) => (
          <motion.li
            key={`${selected}-${row.slug}`}
            className="relative"
            initial={filterable ? { opacity: 0, y: 40 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_SOFT, delay: index * 0.06 }}
          >
            <ListRow
              href={routes.product(row.slug)}
              index={String(index + 1).padStart(2, "0")}
              title={row.name}
              meta={row.code ? `REF: ${row.code}` : "G4 ÜRÜNLERİ"}
              previewSrc={preview ? row.imageSrc : undefined}
              titleClassName={titleClassName}
              className="border-ink/14 pr-[64px]"
            />
            <AddQuoteButton slug={row.slug} name={row.name} className="absolute top-1/2 right-0 z-[3] -translate-y-1/2" />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
