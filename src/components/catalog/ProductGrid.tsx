"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Picture } from "@/components/shared/Picture";
import { underlineLinkClass } from "@/components/ui/UnderlineLink";
import { routes } from "@/data/navigation.data";
import { cn, EASE_SOFT } from "@/lib/utils";
import { AddQuoteButton } from "./AddQuoteButton";

export type ProductCard = {
  slug: string;
  name: string;
  code?: string;
  imageSrc: string | null;
};

export type ProductView = "grid" | "list";

/** Ürün kartları (tasarım: D4UrunKategori .pc) — ızgara veya liste; yüklenince sırayla yükselir (70ms). */
export function ProductGrid({ products, view = "grid", animationKey = "" }: { products: ProductCard[]; view?: ProductView; animationKey?: string }) {
  const isList = view === "list";

  return (
    <ul
      className={cn(
        "m-0 list-none p-0",
        isList ? "flex flex-col gap-3" : "grid grid-cols-[repeat(auto-fill,minmax(min(280px,100%),1fr))] gap-4",
      )}
    >
      {products.map((product, index) => (
        <motion.li
          key={`${animationKey}-${product.slug}`}
          className="relative flex"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_SOFT, delay: Math.min(index, 12) * 0.07 }}
        >
          <Link
            href={routes.product(product.slug)}
            className={cn(
              "group flex w-full overflow-hidden rounded-card bg-white text-ink no-underline",
              "transition-[translate,box-shadow] duration-[600ms] ease-soft hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_rgb(30_48_64/0.4)]",
              "focus-visible:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
              isList ? "flex-row items-center max-[600px]:flex-col max-[600px]:items-stretch" : "flex-col",
            )}
          >
            <div className={cn("relative flex-none", isList ? "aspect-square w-40 max-[600px]:w-auto" : "aspect-[4/3]")}>
              <Picture
                src={product.imageSrc}
                alt={product.name}
                fit="contain"
                zoomOnHover
                sizes={isList ? "160px" : "(max-width: 640px) 90vw, 320px"}
                className="!absolute inset-0 border-0"
              />
            </div>
            <div className={cn("flex flex-1 flex-col gap-3 p-[22px]", isList ? "border-l border-sand max-[600px]:border-t max-[600px]:border-l-0" : "border-t border-sand")}>
              <span className="font-mono text-xs tracking-[0.04em] text-ember-d">
                {product.code ? `REF: ${product.code}` : "G4 ÜRÜNLERİ"}
              </span>
              <strong className="pr-10 font-display text-lg leading-[1.35] font-semibold tracking-[-0.015em]">{product.name}</strong>
              <span className={cn(underlineLinkClass, "min-h-9 self-start text-sm")}>İncele</span>
            </div>
          </Link>
          <AddQuoteButton
            slug={product.slug}
            name={product.name}
            className={cn("absolute z-[2]", isList ? "top-1/2 right-4 -translate-y-1/2" : "right-4 bottom-4")}
          />
        </motion.li>
      ))}
    </ul>
  );
}
