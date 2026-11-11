import Link from "next/link";
import { Picture } from "@/components/shared/Picture";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";
import { AddQuoteButton } from "./AddQuoteButton";
import type { FeaturedRow } from "./FeaturedProductList";

/** Mobil ürün ızgarası: 2 sütun, kare görselli kompakt kartlar; teklif düğmesi görselin köşesinde. */
export function FeaturedProductGrid({ rows, className }: { rows: FeaturedRow[]; className?: string }) {
  return (
    <ul aria-label="Öne çıkan ürünler" className={cn("m-0 grid list-none grid-cols-2 gap-3 p-0", className)}>
      {rows.map((row) => (
        <li key={row.slug} className="relative min-w-0">
          <Link
            href={routes.product(row.slug)}
            className="group flex h-full flex-col overflow-hidden rounded-card bg-paper text-ink no-underline ring-1 ring-line ring-inset active:bg-tint"
          >
            <Picture
              src={row.imageSrc}
              alt=""
              fit="contain"
              sizes="(max-width: 760px) 50vw, 320px"
              className="aspect-square w-full border-0 border-b border-line"
            />
            <span className="flex flex-1 flex-col gap-1 p-3">
              <span className="truncate font-mono text-[11px] tracking-[0.04em] text-ember-d">
                {row.code ? `REF: ${row.code}` : "G4 ÜRÜNLERİ"}
              </span>
              <strong className="line-clamp-2 font-display text-[15px] leading-snug font-semibold tracking-[-0.01em] text-pretty">
                {row.name}
              </strong>
            </span>
          </Link>
          <AddQuoteButton slug={row.slug} name={row.name} className="absolute top-2 right-2 z-[3] shadow-sm" />
        </li>
      ))}
    </ul>
  );
}
