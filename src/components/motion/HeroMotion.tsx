"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Hero metni sayfa kaydırıldıkça aşağı kayar ve solar (tasarım: heroAway, 0 → 760px). */
export function HeroAway({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 760], [0, 160]);
  const opacity = useTransform(scrollY, [0, 760], [1, 0.1]);

  return (
    <m.div className={className} style={reduceMotion ? undefined : { y, opacity }}>
      {children}
    </m.div>
  );
}

type CircleOpenProps = {
  children: ReactNode;
  className?: string;
  /** Dairenin açıldığı nokta. Tasarım: hero görseli 70% 60%, kategori görseli merkez. */
  origin?: string;
};

/**
 * Görsel bir noktadan daireyle açılır (tasarım: .hero-img / circleOpen 1.6s, .3s gecikme).
 * CSS animasyonu (globals.css → animate-circle-open): kapak görseli JS beklemeden açılır (LCP).
 */
export function CircleOpen({ children, className, origin = "70% 60%" }: CircleOpenProps) {
  return (
    <div
      className={cn("animate-circle-open motion-reduce:animate-none", className)}
      style={{ "--circle-origin": origin } as CSSProperties}
    >
      {children}
    </div>
  );
}
