"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { EASE_SOFT } from "@/lib/utils";

export type RevealKind = "up" | "left" | "skew" | "fade" | "scale";

function variantsFor(kind: RevealKind): Variants {
  const shown = { opacity: 1, x: 0, y: 0, skewY: 0, scale: 1 };
  switch (kind) {
    case "up": // tasarımdaki .sv
      return { hidden: { opacity: 0, y: 80 }, shown };
    case "left": // .sv-x
      return { hidden: { opacity: 0, x: -60 }, shown };
    case "skew": // .sk
      return { hidden: { opacity: 0, y: 60, skewY: 5 }, shown };
    case "fade": // .fade
      return { hidden: { opacity: 0 }, shown };
    case "scale": // .scale-up
      return { hidden: { scale: 0.86 }, shown };
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

type Props = {
  children: ReactNode;
  kind?: RevealKind;
  /** Kademeli belirme için sıra (her adım 0.08 sn gecikme). */
  index?: number;
  /** Ek gecikme (sn). */
  delay?: number;
  /** true: ekrana girmeyi beklemeden sayfa yüklenince oynar (hero içerikleri). */
  onLoad?: boolean;
  className?: string;
};

/** İçeriği ekrana girerken bir kez belirir. JS yoksa içerik sunucu çıktısında zaten vardır. */
export function Reveal({ children, kind = "up", index = 0, delay = 0, onLoad = false, className }: Props) {
  const trigger = onLoad
    ? { animate: "shown" as const }
    : { whileInView: "shown" as const, viewport: { once: true, amount: 0.2 } };

  return (
    <motion.div
      className={className}
      variants={variantsFor(kind)}
      initial="hidden"
      {...trigger}
      transition={{ duration: 1, ease: EASE_SOFT, delay: delay + index * 0.08 }}
    >
      {children}
    </motion.div>
  );
}
