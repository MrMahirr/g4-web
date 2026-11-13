import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { m } from "motion/react";
import type { ReactNode } from "react";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import type { NavLinkItem } from "@/components/layout/types";
import { cn, EASE_SOFT } from "@/lib/utils";

export const navLinkClass = cn(
  "group/nv inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-btn px-[clamp(0.4375rem,0.9vw,0.875rem)]",
  "text-[clamp(0.8125rem,1.05vw,0.9375rem)] font-medium whitespace-nowrap text-ink no-underline transition-colors duration-300",
  "hover:bg-ink/8 data-[state=open]:bg-ink/8 data-[active=true]:text-ember-d",
);

export function PlusMinus() {
  return (
    <span aria-hidden="true" className="relative size-2.5">
      <span className="absolute inset-x-0 top-1 h-0.5 bg-current" />
      <span className="absolute inset-x-0 top-1 h-0.5 rotate-90 bg-current transition-transform duration-500 ease-soft group-data-[state=open]/nv:rotate-0" />
    </span>
  );
}

export function MegaItem({
  label,
  isActive,
  children,
}: {
  label: string;
  isActive: boolean;
  children: ReactNode;
}) {
  return (
    <NavigationMenu.Item className="flex h-full items-center">
      <NavigationMenu.Trigger className={navLinkClass} data-active={isActive}>
        {label} <PlusMinus />
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="p-7">{children}</NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}

export function MegaLayout({ intro, links, image }: { intro: ReactNode; links: ReactNode; image?: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)] gap-9">
      <div className="flex flex-col justify-between gap-3.5">{intro}</div>
      {links}
      <div className="relative min-h-[16.25rem] overflow-hidden rounded-btn bg-sand">
        {image ? <Image src={image} alt="" fill sizes="320px" className="object-cover" /> : null}
      </div>
    </div>
  );
}

export function MegaOverviewLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <NavigationMenu.Link asChild>
      <UnderlineLink href={href} className="self-start text-ink">
        {children}
      </UnderlineLink>
    </NavigationMenu.Link>
  );
}

/** Numaralı mega menü bağlantıları — açılınca sırayla yükselir (tasarım: .mg-a, 40ms kademe). */
export function MegaLinks({ links, columns = 1, titleClassName }: {
  links: readonly NavLinkItem[];
  columns?: 1 | 2;
  titleClassName?: string;
}) {
  return (
    <ul className={cn("m-0 list-none p-0", columns === 2 ? "grid grid-cols-2 content-start gap-x-8" : "flex flex-col")}>
      {links.map((link, index) => (
        <m.li
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
              <span className="min-w-[1.625rem] font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
              <span className={cn("font-display text-[1.375rem] font-semibold tracking-[-0.02em]", titleClassName)}>
                {link.label}
              </span>
            </Link>
          </NavigationMenu.Link>
        </m.li>
      ))}
    </ul>
  );
}
