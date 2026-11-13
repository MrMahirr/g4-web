import { useTranslations } from "next-intl";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { routes, type NavSection } from "@/data/navigation.data";
import { cn } from "@/lib/utils";
import { MegaItem, MegaLayout, MegaLinks, MegaOverviewLink, navLinkClass } from "./MegaMenu";
import type { HeaderData } from "../types";

/* ------------------------------------------------------------------ */
/* Masaüstü menü + mega menüler (Radix NavigationMenu)                 */
/* ------------------------------------------------------------------ */

export function DesktopNav({ active, data }: { active: NavSection | null; data: HeaderData }) {
  const t = useTranslations();
  const corporateLinks = data.corporateLinks.map((link) => ({
    href: link.href,
    label: t(`navLinks.corporate.${link.key}`),
  }));

  return (
    <NavigationMenu.Root
      aria-label={t("nav.main")}
      delayDuration={60}
      className="h-full min-w-0 max-nav:hidden [&>div:first-child]:h-full"
    >
      <NavigationMenu.List className="flex h-full items-center">
        <NavigationMenu.Item className="flex h-full items-center">
          <NavigationMenu.Link asChild active={active === "anasayfa"}>
            <Link href={routes.home} className={navLinkClass} data-active={active === "anasayfa"}>
              {t("common.home")}
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <MegaItem label={t("nav.corporate")} isActive={active === "kurumsal"}>
          <MegaLayout
            intro={
              <div className="flex flex-col gap-3.5">
                <p className="text-[0.9375rem] leading-[1.75] text-muted">{t("mega.corporate.text")}</p>
              </div>
            }
            links={<MegaLinks links={corporateLinks} />}
            image={data.menuImages.kurumsal}
          />
        </MegaItem>

        <MegaItem label={t("nav.services")} isActive={active === "hizmetler"}>
          <MegaLayout
            intro={
              <>
                <div className="flex flex-col gap-3.5">
                  <p className="text-[0.9375rem] leading-[1.75] text-muted">{t("mega.services.text")}</p>
                </div>
                <MegaOverviewLink href={routes.services}>{t("mega.services.allLabel")}</MegaOverviewLink>
              </>
            }
            links={<MegaLinks links={data.serviceLinks} />}
            image={data.menuImages.hizmetler}
          />
        </MegaItem>

        <MegaItem label={t("nav.products")} isActive={active === "urunler"}>
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)] gap-9">
            <div className="flex flex-col justify-between gap-3.5">
              <div className="flex flex-col gap-3.5">
                <strong className="font-display text-[1.875rem] font-bold tracking-[-0.03em]">
                  {t("mega.products.title")}
                </strong>
                <p className="text-[0.9375rem] leading-[1.75] text-muted">{t("mega.products.text")}</p>
              </div>
              <MegaOverviewLink href={routes.products}>{t("mega.products.allLabel")}</MegaOverviewLink>
            </div>
            <MegaLinks links={data.categoryLinks} columns={2} titleClassName="text-[1.1875rem]" />
          </div>
        </MegaItem>

        <NavigationMenu.Item className="flex h-full items-center">
          <NavigationMenu.Link asChild active={active === "iletisim"}>
            <Link href={routes.contact} className={navLinkClass} data-active={active === "iletisim"}>
              {t("nav.contact")}
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <div className="absolute inset-x-0 top-[calc(100%+0.625rem)]">
        <NavigationMenu.Viewport
          className={cn(
            "relative h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden rounded-[8px] border border-line bg-white",
            "shadow-[0_40px_80px_-36px_rgb(30_48_64/0.35)] transition-[height] duration-500 ease-soft",
            "data-[state=open]:animate-mega-in data-[state=closed]:animate-mega-out",
            "motion-reduce:animate-none",
          )}
        />
      </div>
    </NavigationMenu.Root>
  );
}
