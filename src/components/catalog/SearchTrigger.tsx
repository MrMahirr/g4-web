"use client";

import { Search } from "lucide-react";
import { useOverlay } from "@/hooks/useOverlay";
import { cn } from "@/lib/utils";

/** Site içi arama katmanını açan geniş düğme (tasarım: .sline görünümü). */
export function SearchTrigger({ label, className }: { label: string; className?: string }) {
  const search = useOverlay("search");
  return (
    <button
      type="button"
      onClick={search.open}
      className={cn(
        "group/st flex w-full max-w-[460px] cursor-pointer items-center gap-4 border-b border-ink/30 pb-3.5 text-left text-faint",
        "transition-colors duration-300 hover:border-ink hover:text-ink",
        className,
      )}
    >
      <Search size={20} strokeWidth={1.8} aria-hidden="true" />
      <span className="flex-1 font-display text-xl tracking-[-0.02em]">{label}</span>
      <span aria-hidden="true" className="rounded-btn border border-line px-[7px] py-[3px] font-mono text-[11px]">
        Ctrl K
      </span>
    </button>
  );
}
