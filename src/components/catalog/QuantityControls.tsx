"use client";
import { useTranslations } from "next-intl";

import { Minus, Plus } from "lucide-react";
import { QUOTE_UNITS, type QuoteUnit } from "@/core/types";
import { MAX_QTY } from "@/store/slices/quoteCartSlice";
import { cn } from "@/lib/utils";

type QtyProps = {
  id: string;
  value: number;
  onChange: (value: number) => void;
  size?: "md" | "sm";
  /** Görünür <label htmlFor> yoksa ekran okuyucu adı (ör. teklif çekmecesindeki satırlar). */
  label?: string;
};

/** Miktar kutusu (tasarım: .qbox) — eksi · sayı · artı. */
export function QuantityBox({ id, value, onChange, size = "md", label }: QtyProps) {
  const t = useTranslations();
  const clamp = (next: number) => Math.min(MAX_QTY, Math.max(1, Number.isFinite(next) ? Math.round(next) : 1));
  const height = size === "md" ? "h-14" : "h-11";
  const button = cn(
    "flex cursor-pointer items-center justify-center text-ink transition-colors duration-200 hover:bg-tint",
    size === "md" ? "w-[52px]" : "w-10",
  );

  return (
    <div className={cn("flex items-stretch overflow-hidden rounded-btn border border-ink", height)}>
      <button type="button" aria-label={t("product.decrease")} onClick={() => onChange(clamp(value - 1))} className={button}>
        <Minus size={18} strokeWidth={2.2} aria-hidden="true" />
      </button>
      <input
        id={id}
        aria-label={label}
        type="number"
        inputMode="numeric"
        min={1}
        max={MAX_QTY}
        value={value}
        onChange={(event) => onChange(clamp(Number(event.target.value)))}
        className={cn(
          "appearance-none border-x border-line bg-transparent text-center font-display font-bold text-ink",
          "focus:outline-2 focus:-outline-offset-2 focus:outline-ember",
          "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]",
          size === "md" ? "w-[72px] text-xl" : "w-14 text-base",
        )}
      />
      <button type="button" aria-label={t("product.increase")} onClick={() => onChange(clamp(value + 1))} className={button}>
        <Plus size={18} strokeWidth={2.2} aria-hidden="true" />
      </button>
    </div>
  );
}

type UnitProps = {
  value: QuoteUnit;
  onChange: (value: QuoteUnit) => void;
  size?: "md" | "sm";
};

/** Birim seçici (tasarım: .seg) — Adet / Kutu / Koli. */
export function UnitSegment({ value, onChange, size = "md" }: UnitProps) {
  const t = useTranslations();
  return (
    <div
      role="group"
      aria-label={t("product.unit")}
      className={cn("flex overflow-hidden rounded-btn border border-ink", size === "md" ? "h-14" : "h-11")}
    >
      {QUOTE_UNITS.map((unit) => (
        <button
          key={unit}
          type="button"
          aria-pressed={unit === value}
          onClick={() => onChange(unit)}
          className={cn(
            "cursor-pointer border-l border-line font-mono text-xs tracking-[0.06em] text-ink uppercase transition-colors duration-300 first:border-l-0",
            "aria-pressed:bg-tint",
            size === "md" ? "min-w-[72px] px-4" : "min-w-14 px-3",
          )}
        >
          {unit}
        </button>
      ))}
    </div>
  );
}
