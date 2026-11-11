"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { G4Logo } from "@/components/shared/G4Logo";
import { Button } from "@/components/ui/Button";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { Tag } from "@/components/ui/Tag";
import { megaMenuCopy, routes, sectionForPath, type NavSection } from "@/data/navigation.data";
import { tr } from "@/dictionaries/tr";
import { useOverlay } from "@/hooks/useOverlay";
import { preloadCatalogSummary } from "@/hooks/useCatalogSummary";
import { useQuoteCart } from "@/hooks/useQuoteCart";
import { cn, EASE_SOFT } from "@/lib/utils";
import { MobileNav } from "./MobileNav";
import { QuoteCartDrawer } from "./QuoteCartDrawer";
import { SearchOverlay } from "./SearchOverlay";
import type { HeaderData, NavLinkItem } from "./types";

/**
 * Yüzen kapsül header (tasarım: D4Header).
 * Kaydırınca daralır (hdShrink, 0 → 200px), altında okuma ilerleme çizgisi dolar (.bar-prog).
 */
export function SiteHeader({ data }: { data: HeaderData }) {
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
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        search.open();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [search]);

  return (
    <>
      <a
        href="#icerik"
        className="sr-only rounded-btn bg-ink px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]"
      >
        {tr.common.skipToContent}
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
            <Link href={routes.home} aria-label="G4 — Ana Sayfa" className="flex flex-none items-center">
              <G4Logo />
            </Link>

            <DesktopNav active={active} data={data} />

            <div className="flex flex-none items-center gap-3.5">
              <IconButton label={tr.search.open} onClick={search.open}>
                <Search size={19} aria-hidden="true" />
              </IconButton>
              <IconButton label={tr.quote.open} onClick={drawer.open}>
                <ShoppingBag size={18} aria-hidden="true" />
                {cart.hydrated && cart.count > 0 ? (
                  <span className="absolute -top-0.5 -right-0.5 grid size-5 place-items-center rounded-full bg-ember-d font-mono text-[10px] text-white">
                    {cart.count}
                  </span>
                ) : null}
              </IconButton>
              <a
                href={`tel:${data.phone.tel}`}
                className="inline-flex min-h-11 items-center gap-2 font-mono text-[13px] tracking-[0.04em] whitespace-nowrap text-muted no-underline max-[1320px]:hidden"
              >
                <span className="size-[7px] animate-dot-pulse rounded-full bg-ember motion-reduce:animate-none" />
                {data.phone.display}
              </a>
              <span className="max-nav:hidden">
                <Button
                  href={routes.contact}
                  size="sm"
                  arrow="up-right"
                  className="max-[1180px]:[&>span:last-child]:hidden [&>span:first-child]:px-[clamp(12px,1.2vw,18px)] [&>span:first-child]:text-[clamp(13px,1vw,15px)]"
                >
                  {tr.common.requestInfo}
                </Button>
              </span>
              <button
                type="button"
                aria-label={tr.nav.openMenu}
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

/** Hata sessizce yutulur; katman açılınca hook yeniden dener. */
const preloadSummary = () => void preloadCatalogSummary().catch(() => {});

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      // Katalog özetini düğmeye yaklaşınca çekmeye başla; katman açılınca hazır olsun.
      onPointerEnter={preloadSummary}
      onFocus={preloadSummary}
      className="relative flex size-11 flex-none cursor-pointer items-center justify-center rounded-full text-ink transition-colors duration-300 hover:bg-ink/7"
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Masaüstü menü + mega menüler (Radix NavigationMenu)                 */
/* ------------------------------------------------------------------ */

const navLinkClass = cn(
  "group/nv inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-btn px-[clamp(7px,0.9vw,14px)]",
  "text-[clamp(13px,1.05vw,15px)] font-medium whitespace-nowrap text-ink no-underline transition-colors duration-300",
  "hover:bg-ink/8 data-[state=open]:bg-ink/8 data-[active=true]:text-ember-d",
);

function PlusMinus() {
  return (
    <span aria-hidden="true" className="relative size-2.5">
      <span className="absolute inset-x-0 top-1 h-0.5 bg-current" />
      <span className="absolute inset-x-0 top-1 h-0.5 rotate-90 bg-current transition-transform duration-500 ease-soft group-data-[state=open]/nv:rotate-0" />
    </span>
  );
}

function DesktopNav({ active, data }: { active: NavSection | null; data: HeaderData }) {
  return (
    <NavigationMenu.Root
      aria-label={tr.nav.main}
      delayDuration={60}
      className="h-full min-w-0 max-nav:hidden [&>div:first-child]:h-full"
    >
      <NavigationMenu.List className="flex h-full items-center">
        <NavigationMenu.Item className="flex h-full items-center">
          <NavigationMenu.Link asChild active={active === "anasayfa"}>
            <Link href={routes.home} className={navLinkClass} data-active={active === "anasayfa"}>
              {tr.common.home}
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <MegaItem label={tr.nav.corporate} isActive={active === "kurumsal"}>
          <MegaLayout
            intro={
              <div className="flex flex-col gap-3.5">
                <Tag className="text-ember-d">{megaMenuCopy.kurumsal.tag}</Tag>
                <p className="text-[15px] leading-[1.75] text-muted">{megaMenuCopy.kurumsal.text}</p>
              </div>
            }
            links={<MegaLinks links={data.corporateLinks} />}
            image={data.menuImages.kurumsal}
          />
        </MegaItem>

        <MegaItem label={tr.nav.services} isActive={active === "hizmetler"}>
          <MegaLayout
            intro={
              <>
                <div className="flex flex-col gap-3.5">
                  <Tag className="text-ember-d">{megaMenuCopy.hizmetler.tag}</Tag>
                  <p className="text-[15px] leading-[1.75] text-muted">{megaMenuCopy.hizmetler.text}</p>
                </div>
                <MegaOverviewLink href={routes.services}>{megaMenuCopy.hizmetler.allLabel}</MegaOverviewLink>
              </>
            }
            links={<MegaLinks links={data.serviceLinks} />}
            image={data.menuImages.hizmetler}
          />
        </MegaItem>

        <MegaItem label={tr.nav.products} isActive={active === "urunler"}>
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)] gap-9">
            <div className="flex flex-col justify-between gap-3.5">
              <div className="flex flex-col gap-3.5">
                <Tag className="text-ember-d">{megaMenuCopy.urunler.tag}</Tag>
                <strong className="font-display text-[30px] font-bold tracking-[-0.03em]">
                  {megaMenuCopy.urunler.title}
                </strong>
                <p className="text-[15px] leading-[1.75] text-muted">{megaMenuCopy.urunler.text}</p>
              </div>
              <MegaOverviewLink href={routes.products}>{megaMenuCopy.urunler.allLabel}</MegaOverviewLink>
            </div>
            <MegaLinks links={data.categoryLinks} columns={2} titleClassName="text-[19px]" />
          </div>
        </MegaItem>

        <NavigationMenu.Item className="flex h-full items-center">
          <NavigationMenu.Link asChild active={active === "iletisim"}>
            <Link href={routes.contact} className={navLinkClass} data-active={active === "iletisim"}>
              {tr.nav.contact}
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <div className="absolute inset-x-0 top-[calc(100%+10px)]">
        <NavigationMenu.Viewport
          className={cn(
            "relative h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden rounded-[8px] border border-line bg-white",
            "shadow-[0_40px_80px_-36px_rgb(30_48_64/0.35)] transition-[height] duration-500 ease-soft",
            "data-[state=open]:animate-mega-in data-[state=closed]:animate-mega-out motion-reduce:animate-none",
          )}
        />
      </div>
    </NavigationMenu.Root>
  );
}

function MegaItem({ label, isActive, children }: { label: string; isActive: boolean; children: ReactNode }) {
  return (
    <NavigationMenu.Item className="flex h-full items-center">
      <NavigationMenu.Trigger className={navLinkClass} data-active={isActive}>
        {label} <PlusMinus />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="p-7">{children}</NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}

function MegaLayout({ intro, links, image }: { intro: ReactNode; links: ReactNode; image?: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)] gap-9">
      <div className="flex flex-col justify-between gap-3.5">{intro}</div>
      {links}
      <div className="relative min-h-[260px] overflow-hidden rounded-btn bg-sand">
        {image ? <Image src={image} alt="" fill sizes="320px" className="object-cover" /> : null}
      </div>
    </div>
  );
}

function MegaOverviewLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <NavigationMenu.Link asChild>
      <UnderlineLink href={href} className="self-start text-ink">
        {children}
      </UnderlineLink>
    </NavigationMenu.Link>
  );
}

/** Numaralı mega menü bağlantıları — açılınca sırayla yükselir (tasarım: .mg-a, 40ms kademe). */
function MegaLinks({
  links,
  columns = 1,
  titleClassName,
}: {
  links: NavLinkItem[];
  columns?: 1 | 2;
  titleClassName?: string;
}) {
  return (
    <ul className={cn("m-0 list-none p-0", columns === 2 ? "grid grid-cols-2 content-start gap-x-8" : "flex flex-col")}>
      {links.map((link, index) => (
        <motion.li
          key={link.href}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_SOFT, delay: 0.04 * index }}
        >
          <NavigationMenu.Link asChild>
            <Link
              href={link.href}
              className={cn(
                "flex items-baseline gap-4 border-b border-ink/10 py-3.5 text-ink no-underline",
                "transition-[color,padding] duration-500 ease-soft hover:pl-3 hover:text-ember-d focus-visible:pl-3",
              )}
            >
              <span className="min-w-[26px] font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
              <span className={cn("font-display text-[22px] font-semibold tracking-[-0.02em]", titleClassName)}>
                {link.label}
              </span>
            </Link>
          </NavigationMenu.Link>
        </motion.li>
      ))}
    </ul>
  );
}
