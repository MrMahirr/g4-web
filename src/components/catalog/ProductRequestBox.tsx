"use client";

import { useLocale, useTranslations } from "next-intl";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Enter } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { UnderlineLink, underlineLinkClass } from "@/components/ui/UnderlineLink";
import { isOrderInquiry } from "@/core/inquiry";
import type { InquiryType, QuoteUnit } from "@/core/types";
import { routes } from "@/data/navigation.data";
import { useInquiry } from "@/hooks/useInquiry";
import { useQuoteCart } from "@/hooks/useQuoteCart";
import { useShareLink } from "@/hooks/useShareLink";
import { cn } from "@/lib/utils";
import { QuantityBox, UnitSegment } from "./QuantityControls";

type Props = {
  product: { slug: string; name: string; code?: string };
  category: { slug: string } | null;
};

/** Miktar, birim, talep ve paylaşım eylemlerini bir arada tutar. */
export function ProductRequestBox({ product, category }: Props) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const cart = useQuoteCart();
  const inquiry = useInquiry();
  const { share } = useShareLink();
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState<QuoteUnit>("Adet");
  const inList = cart.hydrated && cart.has(product.slug);

  const addToList = () => {
    cart.upsert({ productSlug: product.slug, qty, unit });
    toast.success(inList ? t("quote.updated") : t("quote.added"), {
      description: `${product.name} · ${qty} ${unit}`,
    });
  };

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

  const shareLink = async () => {
    if (await share(product.name)) toast.success(t("i18n.productDetail.linkCopied"));
  };

  return (
    <>
      <Enter kind="rise" delay={0.35} className="flex flex-col gap-[1.375rem] rounded-card bg-white p-[1.625rem]">
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
          {t("i18n.productDetail.orderHintBefore")} {" "}
          <strong className="text-ember-d">
            {qty} {unit.toLocaleUpperCase(locale)}
          </strong>{" "}
          {t("i18n.productDetail.orderHintAfter")}
        </p>
      </Enter>

      <Enter kind="rise" delay={0.45} className="flex flex-wrap gap-[1.125rem]">
        <button
          type="button"
          onClick={() => request("soru")}
          className={cn(underlineLinkClass, "cursor-pointer text-ink")}
        >
          {t("product.ask")}
        </button>
        <button type="button" onClick={shareLink} className={cn(underlineLinkClass, "cursor-pointer text-ink")}>
          {t("product.share")}
        </button>
        <UnderlineLink href={category ? routes.category(category.slug) : routes.products} className="text-ember-d">
          {t("common.back")}
        </UnderlineLink>
      </Enter>
    </>
  );
}
