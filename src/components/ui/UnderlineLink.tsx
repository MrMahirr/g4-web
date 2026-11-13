import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** Altı çizili metin bağlantısı: üzerine gelince çizgi silinip yeniden çizilir. */
export const underlineLinkClass = cn(
  "relative inline-flex min-h-11 items-center gap-2 font-semibold no-underline",
  "after:absolute after:inset-x-0 after:bottom-2 after:h-[0.09375rem] after:origin-right after:bg-current after:content-['']",
  "hover:after:animate-ul-redraw motion-reduce:hover:after:animate-none",
);

export function UnderlineLink({ className, ...rest }: ComponentPropsWithoutRef<typeof Link>) {
  return <Link {...rest} className={cn(underlineLinkClass, className)} />;
}
