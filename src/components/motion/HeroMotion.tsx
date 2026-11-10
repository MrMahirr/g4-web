"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { EASE_CURTAIN } from "@/lib/utils";

/** Hero metni sayfa kaydırıldıkça aşağı kayar ve solar (tasarım: heroAway, 0 → 760px). */
export function HeroAway({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 760], [0, 160]);
  const opacity = useTransform(scrollY, [0, 760], [1, 0.1]);

  return (
    <motion.div className={className} style={reduceMotion ? undefined : { y, opacity }}>
      {children}
    </motion.div>
  );
}

type CircleOpenProps = {
  children: ReactNode;
  className?: string;
  /** Dairenin açıldığı nokta. Tasarım: hero görseli 70% 60%, kategori görseli merkez. */
  origin?: string;
};

/** Görsel bir noktadan daireyle açılır (tasarım: .hero-img / circleOpen 1.6s, .3s gecikme). */
export function CircleOpen({ children, className, origin = "70% 60%" }: CircleOpenProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { clipPath: `circle(0% at ${origin})` }}
      animate={{ clipPath: `circle(140% at ${origin})` }}
      transition={{ duration: 1.6, delay: 0.3, ease: EASE_CURTAIN }}
    >
      {children}
    </motion.div>
  );
}
