"use client";
import { useLocale, useTranslations } from "next-intl";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Enter } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { UnderlineLink, underlineLinkClass } from "@/components/ui/UnderlineLink";
import type { ImageEntry, InquiryType, QuoteUnit } from "@/core/types";
import { isOrderInquiry } from "@/core/inquiry";
import { routes } from "@/data/navigation.data";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useInquiry } from "@/hooks/useInquiry";
import { useQuoteCart } from "@/hooks/useQuoteCart";
import { cn } from "@/lib/utils";
import { QuantityBox, UnitSegment } from "./QuantityControls";

const ProductLightbox = dynamic(() => import("./ProductLightbox"), { ssr: false });

type Props = {
  product: { slug: string; title: string; name: string; code?: string; description: string };
  category: { slug: string; title: string } | null;
  images: ImageEntry[];
  whatsappUrl: string;
};

/** Ürün detay gövdesi (tasarım: D4UrunDetay .pdx) — yapışkan galeri + talep kutusu. */
export function ProductDetail({ product, category, images, whatsappUrl }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const cart = useQuoteCart();
  const inquiry = useInquiry();
  const clipboard = useCopyToClipboard();
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState<QuoteUnit>("Adet");

  const current = images[active];
  const hasThumbs = images.length > 1;
  const inList = cart.hydrated && cart.has(product.slug);

  const request = (type: InquiryType) => {
    const line = { productSlug: product.slug, qty, unit };
    if (isOrderInquiry(type)) {
      addToList();
      inquiry.requestOrder();
    } else {
      inquiry.askAboutProduct({ ...line, ref: product.code, type });
    }
    router.push(routes.contactForm);
  };

  const addToList = () => {
    cart.upsert({ productSlug: product.slug, qty, unit });
    toast.success(inList ? t("quote.updated") : t("quote.added"), { description: `${product.name} · ${qty} ${unit}` });
  };

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
      } catch {
        // Kullanıcı paylaşımı iptal etti.
      }
      return;
    }
    if (await clipboard.copy(url)) toast.success(t("i18n.productDetail.linkCopied"));
  };

  return (
    <div className="grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-start gap-[clamp(32px,5vw,72px)] max-stack:grid-cols-1">
      {/* Galeri */}
      <Enter
        className={cn(
          "sticky top-[110px] grid gap-3.5 max-stack:static",
          hasThumbs && "grid-cols-[96px_minmax(0,1fr)] max-stack:grid-cols-1",
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
              <motion.span
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
              </motion.span>
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
              className="absolute top-4 left-4 rounded-tag bg-tint px-2.5 py-1.5 font-mono text-[11px] tracking-[0.04em] text-ink uppercase"
            >
              {category.title}
            </span>
          ) : null}
          {current?.representative ? (
            <span className="absolute bottom-4 left-4 rounded-tag bg-white/90 px-2.5 py-1.5 font-mono text-[11px] tracking-[0.04em] text-muted uppercase">
              {t("common.representativeImage")}
            </span>
          ) : null}
        </button>
      </Enter>

      {/* Bilgi */}
      <div className="flex flex-col gap-[26px]">
        {product.code ? (
          <Enter kind="rise" delay={0.1} className="flex flex-wrap items-center gap-3">
            <Tag>
              {t("product.code")} {product.code}
            </Tag>
            <button
              type="button"
              onClick={() => product.code && clipboard.copy(product.code)}
              className="min-h-8 cursor-pointer rounded-tag border border-line px-2 font-mono text-[11px] tracking-[0.06em] text-muted uppercase transition-colors hover:border-ink hover:text-ink"
            >
              {clipboard.copied ? t("common.copied") : t("common.copy")}
            </button>
          </Enter>
        ) : null}

        <Enter kind="rise" delay={0.15}>
          <h1 className="font-display text-[clamp(28px,2.8vw,40px)] leading-[1.12] font-bold tracking-[-0.03em] text-balance">
            {product.title}
          </h1>
        </Enter>

        <Enter kind="rise" delay={0.25}>
          <p className="leading-[1.75] text-pretty text-muted">{product.description}</p>
        </Enter>

        <Enter kind="rise" delay={0.35} className="flex flex-col gap-[22px] rounded-card bg-white p-[26px]">
          <div className="flex flex-wrap gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="urun-miktar" className="font-mono text-xs tracking-[0.06em] text-muted uppercase">
                {t("product.qty")}
              </label>
              <QuantityBox id="urun-miktar" value={qty} onChange={setQty} />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs tracking-[0.06em] text-muted uppercase">{t("product.unit")}</span>
              <UnitSegment value={unit} onChange={setUnit} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button onClick={() => request("siparis")}>{t("product.order")}</Button>
            <Button variant="ghost" arrow="none" onClick={addToList} aria-pressed={inList}>
              {inList ? `${t("product.inQuote")} ✓` : t("product.addToQuote")}
            </Button>
          </div>
          <p className="font-mono text-xs leading-[1.6] tracking-[0.04em] text-muted uppercase">
            {t("i18n.productDetail.orderHintBefore")}{" "}
            <strong className="text-ember-d">
              {qty} {unit.toLocaleUpperCase(locale)}
            </strong>{" "}{t("i18n.productDetail.orderHintAfter")}
          </p>
        </Enter>

        <Enter kind="rise" delay={0.45} className="flex flex-wrap gap-[18px]">
          <button type="button" onClick={() => request("soru")} className={cn(underlineLinkClass, "cursor-pointer text-ink")}>
            {t("product.ask")}
          </button>
          <button type="button" onClick={share} className={cn(underlineLinkClass, "cursor-pointer text-ink")}>
            {t("product.share")}
          </button>
          <UnderlineLink href={category ? routes.category(category.slug) : routes.products} className="text-ember-d">
            {t("common.back")}
          </UnderlineLink>
        </Enter>

        <Enter kind="rise" delay={0.55}>
          <dl className="m-0 border-t border-line">
            {[
              { key: t("product.description"), value: product.description },
              { key: t("product.supply"), value: t("product.supplyText") },
              {
                key: t("product.support"),
                value: (
                  <>
                    {t("product.supportText")}{" "}
                    <a href={whatsappUrl} target="_blank" rel="noreferrer" className="font-semibold text-ember-d">
                      WhatsApp
                    </a>
                  </>
                ),
              },
            ].map((row) => (
              <div key={row.key} className="grid grid-cols-[140px_minmax(0,1fr)] gap-4 border-b border-line py-4 text-[15px] max-row:grid-cols-1">
                <dt className="pt-0.5 font-mono text-xs tracking-[0.06em] text-muted uppercase">{row.key}</dt>
                <dd className="m-0">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Enter>
      </div>

      {lightboxOpen ? (
        <ProductLightbox
          open={lightboxOpen}
          index={active}
          onClose={() => setLightboxOpen(false)}
          slides={images.map(({ src, alt, width, height }) => ({ src, alt: alt || product.name, width, height }))}
        />
      ) : null}
    </div>
  );
}
