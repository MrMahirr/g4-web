"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import type { InquiryType, QuoteLine } from "@/core/types";
import { routes } from "@/data/navigation.data";
import { EASE_SOFT } from "@/lib/utils";
import type { QuoteProductInfo } from "@/types/catalog-view";

const noteActionClass =
  "inline-flex min-h-10 cursor-pointer items-center rounded-tag px-3.5 font-mono text-xs tracking-[0.06em] uppercase no-underline";

type Props = {
  type: InquiryType;
  lines: QuoteLine[];
  bySlug: Map<string, QuoteProductInfo>;
  legacyProduct: string | null;
  onRemove: (slug: string) => void;
};

export function InquiryNote({
  type,
  lines,
  bySlug,
  legacyProduct,
  onRemove,
}: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  return (
    <m.div
      className="col-span-full grid grid-cols-[auto_minmax(0,1fr)] items-start gap-5 rounded-card bg-tint p-[22px] max-row:grid-cols-1"
      initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
      transition={{ duration: 0.8, ease: EASE_SOFT }}
    >
      <span className="flex size-[52px] items-center justify-center rounded-full bg-ember text-white">
        <ShoppingBag size={22} aria-hidden="true" />
      </span>
      <div className="flex min-w-0 flex-col gap-3">
        <span className="font-mono text-[11px] tracking-[0.08em] text-ember-d uppercase">
          {t(`inquiry.labels.${type}`)} · {t("inquiry.addedToForm")}
        </span>
        {lines.length > 0 ? (
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {lines.map((line) => {
              const product = bySlug.get(line.productSlug);
              return (
                <li key={line.productSlug} className="flex flex-wrap items-center justify-between gap-3">
                  <span className="flex min-w-0 flex-col gap-1">
                    <strong className="text-[15px] leading-[1.4]">{product?.name ?? line.productSlug}</strong>
                    <span className="font-mono text-xs tracking-[0.04em] text-muted">
                      {product?.code
                        ? `REF: ${product.code}`
                        : t("i18n.catalog.productsFallback")}
                      {type === "siparis"
                        ? ` · ${t("product.qty").toLocaleUpperCase(locale)}: ${line.qty} ${line.unit.toLocaleUpperCase(locale)}`
                        : ""}
                    </span>
                  </span>
                  <span className="flex gap-2">
                    <Link href={routes.product(line.productSlug)} className={`${noteActionClass} bg-white text-ink`}>
                      {t("inquiry.edit")}
                    </Link>
                    <button
                      type="button"
                      onClick={() => onRemove(line.productSlug)}
                      className={`${noteActionClass} border border-ink/30 bg-transparent text-ink`}
                    >
                      {t("inquiry.removeFromForm")}
                    </button>
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <strong className="text-[15px] leading-[1.4]">{legacyProduct}</strong>
        )}
      </div>
    </m.div>
  );
}
