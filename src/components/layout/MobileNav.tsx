"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { G4Logo } from "@/components/shared/G4Logo";
import { routes } from "@/data/navigation.data";
import { tr } from "@/dictionaries/tr";
import { useOverlay } from "@/hooks/useOverlay";
import { EASE_CURTAIN, EASE_SOFT } from "@/lib/utils";
import { useReturnFocus } from "@/hooks/useReturnFocus";
import type { HeaderData, NavLinkItem } from "./types";

/** Hamburger düğmesinin merkezi: dairesel açılım buradan başlar (tasarım: .hd-m .sheet). */
const ORIGIN = "calc(100% - 50px) 50px";

/** Mobil menü (≤1080px) — köşeden daireyle açılan tam ekran panel. */
export function MobileNav({ data }: { data: HeaderData }) {
  const menu = useOverlay("mobileNav");
  const reduceMotion = useReducedMotion();

  const groups: { label: string; href: string; children?: NavLinkItem[] }[] = [
    { label: tr.common.home, href: routes.home },
    { label: tr.nav.corporate, href: routes.about, children: data.corporateLinks },
    { label: tr.nav.services, href: routes.services, children: data.serviceLinks },
    { label: tr.nav.products, href: routes.products, children: data.categoryLinks },
    { label: tr.nav.contact, href: routes.contact },
  ];

  const returnFocus = useReturnFocus();

  return (
    <Dialog.Root open={menu.isOpen} onOpenChange={menu.setOpen}>
      <AnimatePresence>
        {menu.isOpen ? (
          <Dialog.Portal forceMount>
            <Dialog.Content asChild forceMount aria-describedby={undefined} {...returnFocus}>
              <motion.div
                className="fixed inset-0 z-[90] overflow-auto bg-white px-8 pt-[120px] pb-10"
                initial={reduceMotion ? { opacity: 0 } : { clipPath: `circle(0px at ${ORIGIN})` }}
                animate={reduceMotion ? { opacity: 1 } : { clipPath: `circle(150% at ${ORIGIN})` }}
                exit={reduceMotion ? { opacity: 0 } : { clipPath: `circle(0px at ${ORIGIN})` }}
                transition={{ duration: 0.8, ease: EASE_CURTAIN }}
              >
                <Dialog.Title className="sr-only">{tr.nav.main}</Dialog.Title>

                <div className="fixed inset-x-4 top-4 flex h-[72px] items-center justify-between pr-2 pl-3.5">
                  <Link href={routes.home} onClick={menu.close} aria-label="G4 — Ana Sayfa">
                    <G4Logo />
                  </Link>
                  <Dialog.Close
                    aria-label={tr.nav.closeMenu}
                    className="grid size-[52px] cursor-pointer place-items-center rounded-btn bg-ember text-white"
                  >
                    <X size={22} aria-hidden="true" />
                  </Dialog.Close>
                </div>

                <nav aria-label={tr.nav.main}>
                  {groups.map((group, index) => (
                    <motion.div
                      key={group.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: EASE_SOFT, delay: 0.25 + index * 0.05 }}
                    >
                      <Link
                        href={group.href}
                        onClick={menu.close}
                        className="block border-b border-ink/10 py-2.5 font-display text-[32px] font-semibold tracking-[-0.03em] text-ink no-underline"
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
                              className="block border-b border-ink/10 py-2 pl-[18px] text-lg font-medium text-muted no-underline"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </motion.div>
                  ))}
                </nav>

                <p className="mt-7 font-mono text-[13px] tracking-[0.04em] text-muted">
                  <a href={`tel:${data.phone.tel}`} className="text-inherit no-underline">
                    {data.phone.display}
                  </a>{" "}
                  ·{" "}
                  <a href={`mailto:${data.email}`} className="text-inherit no-underline">
                    {data.email}
                  </a>
                </p>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
