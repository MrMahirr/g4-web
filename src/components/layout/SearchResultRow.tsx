"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box } from "lucide-react";
import { motion } from "motion/react";
import { searchTypeLabel, type SearchHit } from "@/lib/catalog";
import { EASE_SOFT } from "@/lib/utils";
import type { SearchEntryWithImage } from "./types";

type Props = {
  hit: SearchHit<SearchEntryWithImage>;
  /** Sıra — giriş animasyonu 30ms kademeli (tasarım: .srow2 sIn). */
  position: number;
  onSelect?: () => void;
};

/** Arama sonucu satırı (tasarım: .srow2) — arama katmanı ve /arama sayfası ortak. */
export function SearchResultRow({ hit, position, onSelect }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_SOFT, delay: Math.min(position, 12) * 0.03 }}
    >
      <Link
        href={hit.entry.href}
        data-result
        onClick={onSelect}
        className="group/sr -mx-3 flex items-center gap-4 rounded-[10px] px-3 py-3.5 text-ink no-underline transition-colors duration-200 outline-none hover:bg-ink/4.5 focus-visible:bg-ink/4.5"
      >
        <span className="relative flex size-10 flex-none items-center justify-center overflow-hidden rounded-[8px] bg-[#F1F5F8] text-[#8A9AA7]">
          <Box size={18} strokeWidth={1.6} aria-hidden="true" />
          {hit.entry.imageSrc ? <Image src={hit.entry.imageSrc} alt="" fill sizes="40px" className="bg-white object-contain p-1" /> : null}
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base leading-[1.35]">
            {hit.pre}
            <b className="font-semibold text-ember-d">{hit.hit}</b>
            {hit.post}
          </span>
          <span className="text-[13px] text-faint">{hit.entry.meta}</span>
        </span>
        <span className="flex-none text-xs text-faint">{searchTypeLabel(hit.entry.type)}</span>
        <ArrowRight
          size={16}
          aria-hidden="true"
          className="flex-none text-[#B5C2CC] transition-[translate,color] duration-300 ease-soft group-hover/sr:translate-x-[3px] group-hover/sr:text-ink"
        />
      </Link>
    </motion.div>
  );
}
