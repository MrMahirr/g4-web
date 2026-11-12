"use client";
import { useTranslations } from "next-intl";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { QuantityBox, UnitSegment } from "@/components/catalog/QuantityControls";
import { Button } from "@/components/ui/Button";
import { routes } from "@/data/navigation.data";
import { useInquiry } from "@/hooks/useInquiry";
import { useOverlay } from "@/hooks/useOverlay";
import { useQuoteCart } from "@/hooks/useQuoteCart";
import { EASE_SOFT } from "@/lib/utils";
import { useCatalogSummary } from "@/hooks/useCatalogSummary";
import { useReturnFocus } from "@/hooks/useReturnFocus";
import type { QuoteProductInfo } from "@/types/catalog-view";

const NO_PRODUCTS: QuoteProductInfo[] = [];

/**
 * Çoklu ürün teklif listesi (plan K5). Tasarımda karşılığı yok; Tasarım D bileşenleriyle kuruldu:
 * sağdan kayan beyaz panel, liste satırı, miktar kutusu ve birim seçici.
 */
export function QuoteCartDrawer() {
  const t = useTranslations();
  const drawer = useOverlay("quoteCart");
  // Ürün adları/görselleri çekmece ilk açıldığında /api/katalog-ozet'ten gelir (plan 8.5);
  // gelene kadar satırda slug görünür.
  const products = useCatalogSummary(drawer.isOpen)?.quoteProducts ?? NO_PRODUCTS;
  const cart = useQuoteCart();
  const inquiry = useInquiry();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const bySlug = new Map(products.map((product) => [product.slug, product]));

  const requestQuote = () => {
    inquiry.requestOrder();
    drawer.close();
    router.push(routes.contactForm);
  };

  const returnFocus = useReturnFocus();
  const removeLine = (productSlug: string) => {
    cart.remove(productSlug);
    toast.message(t("quote.removed"));
  };
  const clearCart = () => {
    cart.clear();
    toast.message(t("quote.cleared"));
  };

  return (
    <Dialog.Root open={drawer.isOpen} onOpenChange={drawer.setOpen}>
      <AnimatePresence>
        {drawer.isOpen ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <m.div
                className="fixed inset-0 z-[90] bg-ink/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined} {...returnFocus}>
              <m.div
                className="fixed inset-y-0 right-0 z-[95] flex w-full max-w-[520px] flex-col bg-paper shadow-[0_40px_80px_-30px_rgb(30_48_64/0.45)]"
                initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
                animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
                transition={{ duration: 0.6, ease: EASE_SOFT }}
              >
                <div className="flex items-center justify-between gap-4 border-b border-line px-7 py-6">
                  <Dialog.Title className="font-display text-[30px] leading-none font-bold tracking-[-0.03em]">
                    {t("quote.title")}
                  </Dialog.Title>
                  <Dialog.Close
                    aria-label={t("common.close")}
                    className="grid size-11 cursor-pointer place-items-center rounded-full border border-line text-ink transition-colors hover:bg-ink/6"
                  >
                    <X size={18} aria-hidden="true" />
                  </Dialog.Close>
                </div>

                {cart.lines.length > 0 ? (
                  <>
                    <ul className="m-0 flex-1 list-none overflow-auto px-7 py-0">
                      {cart.lines.map((line, index) => {
                        const product = bySlug.get(line.productSlug);
                        const name = product?.name ?? line.productSlug;
                        return (
                          <li key={line.productSlug} className="flex flex-col gap-4 border-b border-line py-6">
                            <div className="grid grid-cols-[56px_minmax(0,1fr)_auto] items-start gap-4">
                              <span className="relative size-14 overflow-hidden rounded-btn bg-white ring-1 ring-line">
                                {product?.imageSrc ? (
                                  <Image src={product.imageSrc} alt="" fill sizes="56px" className="object-contain p-1.5" />
                                ) : null}
                              </span>
                              <span className="flex min-w-0 flex-col gap-1">
                                <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                                <Link
                                  href={routes.product(line.productSlug)}
                                  onClick={drawer.close}
                                  className="font-display text-[17px] leading-snug font-semibold tracking-[-0.015em] text-ink no-underline hover:text-ember-d"
                                >
                                  {name}
                                </Link>
                                {product?.code ? (
                                  <span className="font-mono text-xs tracking-[0.04em] text-ember-d">REF: {product.code}</span>
                                ) : null}
                              </span>
                              <button
                                type="button"
                                aria-label={`${name} — ${t("quote.remove")}`}
                                onClick={() => removeLine(line.productSlug)}
                                className="grid size-10 cursor-pointer place-items-center rounded-btn text-muted transition-colors hover:bg-tint hover:text-ember-d"
                              >
                                <Trash2 size={17} aria-hidden="true" />
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-3 pl-[72px] max-row:pl-0">
                              <QuantityBox
                                id={`teklif-adet-${line.productSlug}`}
                                label={`${name} — ${t("product.qty")}`}
                                size="sm"
                                value={line.qty}
                                onChange={(qty) => cart.setQty(line.productSlug, qty)}
                              />
                              <UnitSegment
                                size="sm"
                                value={line.unit}
                                onChange={(unit) => cart.setUnit(line.productSlug, unit)}
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="flex flex-col gap-4 border-t border-line px-7 py-6">
                      <Button onClick={requestQuote} className="w-full justify-between">
                        {t("quote.request")}
                      </Button>
                      <button
                        type="button"
                        onClick={clearCart}
                        className="self-start font-mono text-xs tracking-[0.06em] text-muted uppercase underline-offset-4 hover:text-ember-d hover:underline"
                      >
                        {t("quote.clear")}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-1 flex-col items-start justify-center gap-6 px-7">
                    <span className="grid size-[52px] place-items-center rounded-full bg-ember text-white">
                      <ShoppingBag size={22} aria-hidden="true" />
                    </span>
                    <p className="max-w-[360px] text-lead text-muted">{t("quote.empty")}</p>
                    <Button href={routes.products} onClick={drawer.close}>
                      {t("common.seeProducts")}
                    </Button>
                  </div>
                )}
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
