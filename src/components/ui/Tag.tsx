import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** ◆ işaretli, büyük harfli mono etiket. */
export function Tag({ className, ...rest }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      {...rest}
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-xs font-medium tracking-[0.04em] text-ember-d uppercase",
        "before:size-2 before:rotate-45 before:bg-current before:content-['']",
        className,
      )}
    />
  );
}

/** Mono zeminli küçük kod/etiket çipi (ürün kodu, token adı). */
export function Chip({ className, ...rest }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      {...rest}
      className={cn("rounded-tag bg-sand px-[7px] py-0.5 font-mono text-xs tracking-[0.04em] text-ink", className)}
    />
  );
}
