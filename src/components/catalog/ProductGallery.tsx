"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { Enter } from "@/components/motion/Reveal";
import type { ImageEntry } from "@/core/types";
import { cn } from "@/lib/utils";

const ProductLightbox = dynamic(() => import("./ProductLightbox"), { ssr: false });

type Props = {
  product: { name: string };
  category: { title: string } | null;
  images: ImageEntry[];
};

/** Ürün görselleri, küçük resimleri ve ışık kutusu tetikleyicisi. */
export function ProductGallery({ product, category, images }: Props) {
  const t = useTranslations();
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const current = images[active];
  const hasThumbs = images.length > 1;

  return (
    <>
      {/* Galeri */}
      <Enter
        className={cn(
          "sticky top-[6.875rem] grid gap-3.5 max-stack:static",
          hasThumbs && "grid-cols-[6rem_minmax(0,1fr)] max-stack:grid-cols-1",
        )}
      >
        {hasThumbs ? (
          <div className="flex flex-col gap-2.5 max-stack:order-2 max-stack:flex-row max-stack:overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={t("i18n.productDetail.image", { index: index + 1 })}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
                className={cn(
                  "relative size-24 flex-none cursor-pointer overflow-hidden rounded-btn border border-line bg-white transition-colors duration-300",
                  "aria-pressed:border-ember aria-pressed:ring-1 aria-pressed:ring-ember aria-pressed:ring-inset",
                )}
              >
                <Image src={image.src} alt="" fill sizes="96px" className="object-contain p-2" />
              </button>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => current && setLightboxOpen(true)}
          disabled={!current}
          className="relative aspect-square cursor-zoom-in overflow-hidden rounded-card bg-white disabled:cursor-default"
        >
          {/* Ad görünen içerikten gelir: görselin alt metni + bu metin (+ "Temsili görsel" etiketi). */}
          {current ? <span className="sr-only">{t("i18n.productDetail.zoom")}</span> : null}
          <AnimatePresence initial={false}>
            {current ? (
              <m.span
                key={current.src}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Image
                  src={current.src}
                  alt={current.alt || product.name}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 960px) 100vw, 55vw"
                  className="object-contain p-[12%]"
                />
              </m.span>
            ) : (
              <span className="absolute inset-0 flex items-center justify-center bg-checker font-mono text-xs tracking-[0.06em] text-muted uppercase">
                {t("common.imagePlaceholder")}
              </span>
            )}
          </AnimatePresence>
          {category ? (
            // Kategori sayfa yolunda ve bilgi sütununda da var; düğme adına karışmasın.
            <span
              aria-hidden="true"
              className="absolute top-4 left-4 rounded-tag bg-tint px-2.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.04em] text-ink uppercase"
            >
              {category.title}
            </span>
          ) : null}
          {current?.representative ? (
            <span className="absolute bottom-4 left-4 rounded-tag bg-white/90 px-2.5 py-1.5 font-mono text-[0.6875rem] tracking-[0.04em] text-muted uppercase">
              {t("common.representativeImage")}
            </span>
          ) : null}
        </button>
      </Enter>

      {lightboxOpen ? (
        <ProductLightbox
          open={lightboxOpen}
          index={active}
          onClose={() => setLightboxOpen(false)}
          slides={images.map(({ src, alt, width, height }) => ({
            src,
            alt: alt || product.name,
            width,
            height,
          }))}
        />
      ) : null}
    </>
  );
}
