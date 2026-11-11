import Link from "next/link";
import { Fragment } from "react";

export type Crumb = { label: string; href?: string };

/** Sayfa yolu. Son öğe geçerli sayfadır ve bağlantı değildir. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Sayfa yolu"
      className="flex flex-wrap gap-3 font-mono text-xs tracking-[0.06em] text-muted uppercase"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <Fragment key={`${item.label}-${index}`}>
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="no-underline transition-colors hover:text-ember-d">
                {item.label}
              </Link>
            ) : (
              <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-ember-d" : undefined}>
                {item.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
