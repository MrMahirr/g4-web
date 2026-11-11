"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { CurtainFrame } from "@/components/motion/CurtainFrame";
import { cn } from "@/lib/utils";

export type ShowcaseItem = {
  slug: string;
  href: string;
  title: string;
  description: string;
  image: { src: string; alt: string } | null;
};

type Props = {
  items: ShowcaseItem[];
  /** Otomatik geçiş aralığı (ms). */
  interval?: number;
};

/**
 * Hizmet vitrini: solda büyük ana görsel, sağda hizmet satırları.
 * Görsel belli aralıkla sıradaki hizmete geçer; bir satırın üzerine gelinince (ya da odaklanınca)
 * o hizmetin görseli açılır ve otomatik geçiş duraklar.
 */
export function ServiceShowcase({ items, interval = 5000 }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const auto = !paused && !reduceMotion && items.length > 1;

  useEffect(() => {
    if (!auto) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % items.length), interval);
    return () => window.clearTimeout(timer);
  }, [auto, active, interval, items.length]);

  return (
    <div
      className="grid grid-cols-[minmax(0,6fr)_minmax(0,5fr)] items-stretch gap-[clamp(32px,6vw,96px)] max-stack:grid-cols-1"
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-btn bg-sand max-stack:aspect-[16/11]">
        <CurtainFrame>
          {items.map((item, index) =>
            item.image ? (
              <Image
                key={item.slug}
                src={item.image.src}
                alt={index === active ? item.image.alt : ""}
                aria-hidden={index === active ? undefined : true}
                fill
                sizes="(max-width: 960px) 100vw, 50vw"
                className={cn(
                  "object-cover transition-[opacity,scale] duration-1000 ease-soft",
                  index === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
                )}
              />
            ) : null,
          )}
        </CurtainFrame>
        <span className="absolute bottom-4 left-4 z-[6] rounded-tag bg-paper/90 px-2.5 py-1.5 font-mono text-xs tracking-[0.06em] text-ink uppercase backdrop-blur-sm">
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} · {items[active]?.title}
        </span>
      </div>

      <ul className="m-0 flex list-none flex-col justify-center border-t border-line p-0">
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <li key={item.slug} className="border-b border-line">
              <Link
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                onMouseEnter={() => {
                  setActive(index);
                  setPaused(true);
                }}
                onFocus={() => {
                  setActive(index);
                  setPaused(true);
                }}
                onBlur={() => setPaused(false)}
                className="group relative grid grid-cols-[auto_1fr_auto] items-start gap-x-5 py-7 text-ink no-underline"
              >
                <span
                  className={cn(
                    "pt-1.5 font-mono text-xs tracking-[0.08em] transition-colors duration-500",
                    isActive ? "text-ember-d" : "text-faint",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-3">
                  <span
                    className={cn(
                      "font-display text-[clamp(22px,2.2vw,30px)] leading-[1.15] font-semibold tracking-[-0.03em] transition-colors duration-500",
                      isActive ? "text-ink" : "text-muted",
                    )}
                  >
                    {item.title}
                  </span>
                  <span
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-700 ease-soft",
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="block max-w-[460px] leading-[1.7] text-pretty text-muted">{item.description}</span>
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  size={22}
                  aria-hidden="true"
                  className={cn(
                    "mt-1 transition-[translate,color,opacity] duration-500 ease-soft",
                    isActive ? "translate-0 text-ember-d opacity-100" : "-translate-x-1 translate-y-1 opacity-40",
                  )}
                />
                {isActive && auto ? (
                  <span
                    key={`${index}-${active}`}
                    aria-hidden="true"
                    style={{ "--bar-ms": `${interval}ms` } as CSSProperties}
                    className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left animate-bar-fill bg-ember-d"
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
