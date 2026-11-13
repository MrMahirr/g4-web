"use client";

import { useTranslations } from "next-intl";

import { Enter } from "@/components/motion/Reveal";
import { Tag } from "@/components/ui/Tag";
import type { ImageEntry } from "@/core/types";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { ProductGallery } from "./ProductGallery";
import { ProductRequestBox } from "./ProductRequestBox";

type Props = {
  product: { slug: string; title: string; name: string; code?: string; description: string };
  category: { slug: string; title: string } | null;
  images: ImageEntry[];
  whatsappUrl: string;
};

/** Ürün detay gövdesi (tasarım: D4UrunDetay .pdx) — yapışkan galeri + talep kutusu. */
export function ProductDetail({ product, category, images, whatsappUrl }: Props) {
  const t = useTranslations();
  const clipboard = useCopyToClipboard();

  return (
    <div className="grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-start gap-[clamp(2rem,5vw,4.5rem)] max-stack:grid-cols-1">
      <ProductGallery product={product} category={category} images={images} />

      {/* Bilgi */}
      <div className="flex flex-col gap-[1.625rem]">
        {product.code ? (
          <Enter kind="rise" delay={0.1} className="flex flex-wrap items-center gap-3">
            <Tag>
              {t("product.code")} {product.code}
            </Tag>
            <button
              type="button"
              onClick={() => product.code && clipboard.copy(product.code)}
              className="min-h-8 cursor-pointer rounded-tag border border-line px-2 font-mono text-[0.6875rem] tracking-[0.06em] text-muted uppercase transition-colors hover:border-ink hover:text-ink"
            >
              {clipboard.copied ? t("common.copied") : t("common.copy")}
            </button>
          </Enter>
        ) : null}

        <Enter kind="rise" delay={0.15}>
          <h1 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.12] font-bold tracking-[-0.03em] text-balance">
            {product.title}
          </h1>
        </Enter>

        <Enter kind="rise" delay={0.25}>
          <p className="leading-[1.75] text-pretty text-muted">{product.description}</p>
        </Enter>

        <ProductRequestBox product={product} category={category} />

        <Enter kind="rise" delay={0.55}>
          <dl className="m-0 border-t border-line">
            {[
              { key: t("product.description"), value: product.description },
              { key: t("product.supply"), value: t("product.supplyText") },
              {
                key: t("product.support"),
                value: (
                  <>
                    {t("product.supportText")} {" "}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-ember-d"
                    >
                      WhatsApp
                    </a>
                  </>
                ),
              },
            ].map((row) => (
              <div
                key={row.key}
                className="grid grid-cols-[8.75rem_minmax(0,1fr)] gap-4 border-b border-line py-4 text-[0.9375rem] max-row:grid-cols-1"
              >
                <dt className="pt-0.5 font-mono text-xs tracking-[0.06em] text-muted uppercase">
                  {row.key}
                </dt>
                <dd className="m-0">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Enter>
      </div>
    </div>
  );
}
