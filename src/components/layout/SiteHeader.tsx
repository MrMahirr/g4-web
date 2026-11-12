"use client";
import { useTranslations } from "next-intl";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { G4Logo } from "@/components/shared/G4Logo";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { Button } from "@/components/ui/Button";
import { routes, sectionForPath } from "@/data/navigation.data";
import { useOverlay } from "@/hooks/useOverlay";
import { useHotkey } from "@/hooks/useHotkey";
import { useQuoteCart } from "@/hooks/useQuoteCart";
import { cn, EASE_SOFT } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import { QuoteCartDrawer } from "./QuoteCartDrawer";
import { SearchOverlay } from "./SearchOverlay";
import { DesktopNav } from "./header/DesktopNav";
import { IconButton } from "./header/IconButton";
import type { HeaderData } from "./types";

/**
 * Yüzen kapsül header (tasarım: D4Header).
 * Kaydırınca daralır (hdShrink, 0 → 200px), altında okuma ilerleme çizgisi dolar (.bar-prog).
 */
export function SiteHeader({ data }: { data: HeaderData }) {
  const t = useTranslations();
  const pathname = usePathname();
  const active = sectionForPath(pathname);
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const maxWidth = useTransform(scrollY, [0, 200], [1320, 1240]);
  const height = useTransform(scrollY, [0, 200], [72, 64]);
  const background = useTransform(scrollY, [0, 200], ["rgba(255,255,255,0.9)", "rgba(255,255,255,0.98)"]);

  const search = useOverlay("search");
  const mobile = useOverlay("mobileNav");
  const drawer = useOverlay("quoteCart");
  const cart = useQuoteCart();

  // Ctrl/⌘ + K her sayfada aramayı açar.
  useHotkey("k", search.open, { mod: true });

  return (
    <>
      <a
        href="#icerik"
        className="sr-only rounded-btn bg-ink px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
      >
        {t("common.skipToContent")}
      </a>

      <header id="top" className="pointer-events-none fixed inset-x-0 top-4 z-[80]">
        <div className="px-4">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_SOFT }}
            style={reduceMotion ? undefined : { maxWidth, height, backgroundColor: background }}
            className={cn(
              "pointer-events-auto relative mx-auto flex h-[72px] max-w-site items-center justify-between gap-[clamp(8px,1.2vw,20px)]",
              "rounded-[8px] border border-ink/10 bg-white/90 pr-2 pl-3.5 shadow-[0_12px_32px_-20px_rgb(30_48_64/0.35)]",
              "backdrop-blur-[18px] backdrop-saturate-[1.4]",
            )}
          >
            <Link href={routes.home} aria-label={t("i18n.logoHome")} className="flex flex-none items-center">
              <G4Logo />
            </Link>

            <DesktopNav active={active} data={data} />

            <div className="flex flex-none items-center gap-3.5">
              <IconButton label={t("search.open")} onClick={search.open}>
                <Search size={19} aria-hidden="true" />
              </IconButton>
              <IconButton label={t("quote.open")} onClick={drawer.open}>
                <ShoppingBag size={18} aria-hidden="true" />
                {cart.hydrated && cart.count > 0 ? (
                  <span className="absolute -top-0.5 -right-0.5 grid size-5 place-items-center rounded-full bg-ember-d font-mono text-[10px] text-white">
                    {cart.count}
                  </span>
                ) : null}
              </IconButton>
              <span className="max-nav:hidden">
                <LanguageToggle />
              </span>
              <span className="max-nav:hidden">
                <Button
                  href={routes.contact}
                  size="sm"
                  arrow="up-right"
                  className="max-[73.75rem]:[&>span:last-child]:hidden [&>span:first-child]:px-[clamp(12px,1.2vw,18px)] [&>span:first-child]:text-[clamp(13px,1vw,15px)]"
                >
                  {t("common.requestInfo")}
                </Button>
              </span>
              <button
                type="button"
                aria-label={t("nav.openMenu")}
                onClick={mobile.open}
                className="hidden size-[52px] cursor-pointer place-items-center rounded-btn bg-ember text-white max-nav:grid"
              >
                <Menu size={22} aria-hidden="true" />
              </button>
            </div>

            <motion.span
              aria-hidden="true"
              className="absolute inset-x-2 bottom-0 h-0.5 origin-left bg-ember"
              style={{ scaleX: reduceMotion ? 0 : scrollYProgress }}
            />
          </motion.div>
        </div>
      </header>

      <SearchOverlay categories={data.categoryLinks} />
      <MobileNav data={data} />
      <QuoteCartDrawer />
    </>
  );
}
