import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** Büyük harfli mono etiket (yalnız yazı, işaretsiz). */
export function Tag({ className, ...rest }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      {...rest}
      className={cn(
        "inline-flex items-center font-mono text-xs font-medium tracking-[0.04em] text-ember-d uppercase",
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
      className={cn("rounded-tag bg-sand px-[0.4375rem] py-0.5 font-mono text-xs tracking-[0.04em] text-ink", className)}
    />
  );
}
