"use client";
import { useTranslations } from "next-intl";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { G4Logo } from "@/components/shared/G4Logo";
import { LanguageList } from "@/components/layout/LanguageToggle";
import { routes } from "@/data/navigation.data";
import { useOverlay } from "@/hooks/useOverlay";
import { EASE_CURTAIN, EASE_SOFT } from "@/lib/utils";
import { useReturnFocus } from "@/hooks/useReturnFocus";
import type { HeaderData, NavLinkItem } from "./types";

/** Hamburger düğmesinin merkezi: dairesel açılım buradan başlar (tasarım: .hd-m .sheet). */
const ORIGIN = "calc(100% - 50px) 50px";

/** Mobil menü (≤1080px) — köşeden daireyle açılan tam ekran panel. */
export function MobileNav({ data }: { data: HeaderData }) {
  const t = useTranslations();
  const menu = useOverlay("mobileNav");
  const reduceMotion = useReducedMotion();

  const groups: { label: string; href: string; children?: readonly NavLinkItem[] }[] = [
    { label: t("common.home"), href: routes.home },
    { label: t("nav.corporate"), href: routes.about, children: data.corporateLinks.map((link) => ({ href: link.href, label: t(`navLinks.corporate.${link.key}`) })) },
    { label: t("nav.services"), href: routes.services, children: data.serviceLinks },
    { label: t("nav.products"), href: routes.products, children: data.categoryLinks },
    { label: t("nav.contact"), href: routes.contact },
  ];

  const returnFocus = useReturnFocus();

  return (
    <Dialog.Root open={menu.isOpen} onOpenChange={menu.setOpen}>
      <AnimatePresence>
        {menu.isOpen ? (
          <Dialog.Portal forceMount>
            <Dialog.Content asChild forceMount aria-describedby={undefined} {...returnFocus}>
              <m.div
                className="fixed inset-0 z-[90] overflow-auto bg-white px-8 pt-[7.5rem] pb-10"
                initial={reduceMotion ? { opacity: 0 } : { clipPath: `circle(0px at ${ORIGIN})` }}
                animate={reduceMotion ? { opacity: 1 } : { clipPath: `circle(150% at ${ORIGIN})` }}
                exit={reduceMotion ? { opacity: 0 } : { clipPath: `circle(0px at ${ORIGIN})` }}
                transition={{ duration: 0.8, ease: EASE_CURTAIN }}
              >
                <Dialog.Title className="sr-only">{t("nav.main")}</Dialog.Title>

                <div className="fixed inset-x-4 top-4 flex h-[4.5rem] items-center justify-between pr-2 pl-3.5">
                  <Link href={routes.home} onClick={menu.close} aria-label={t("i18n.logoHome")}>
                    <G4Logo />
                  </Link>
                  <div className="flex items-center gap-2">
                    <Dialog.Close
                      aria-label={t("nav.closeMenu")}
                      className="grid size-[3.25rem] cursor-pointer place-items-center rounded-btn bg-ember text-white"
                    >
                      <X size={22} aria-hidden="true" />
                    </Dialog.Close>
                  </div>
                </div>

                <nav aria-label={t("nav.main")}>
                  {groups.map((group, index) => (
                    <m.div
                      key={group.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: EASE_SOFT, delay: 0.25 + index * 0.05 }}
                    >
                      <Link
                        href={group.href}
                        onClick={menu.close}
                        className="block border-b border-ink/10 py-2.5 font-display text-[2rem] font-semibold tracking-[-0.03em] text-ink no-underline"
                      >
                        {group.label}
                      </Link>
                      {group.children ? (
                        <div>
                          {group.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={menu.close}
                              className="block border-b border-ink/10 py-2 pl-[1.125rem] text-lg font-medium text-muted no-underline"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </m.div>
                  ))}
                </nav>

                <p className="mt-7 font-mono text-[0.8125rem] tracking-[0.04em] text-muted">
                  <a href={`tel:${data.phone.tel}`} className="text-inherit no-underline">
                    {data.phone.display}
                  </a>{" "}
                  ·{" "}
                  <a href={`mailto:${data.email}`} className="text-inherit no-underline">
                    {data.email}
                  </a>
                </p>

                <LanguageList />
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
