"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn, EASE_SOFT } from "@/lib/utils";

type Props = {
  /** Her öğe bir satır; satırlar sırayla maskeden yükselir. */
  lines: ReactNode[];
  as?: "h1" | "h2";
  size?: "d1" | "d2";
  /** İlk satırın gecikmesi (sn). */
  delay?: number;
  /** Satırlar arası gecikme (sn). */
  stagger?: number;
  className?: string;
};

/** Satır maskeli başlık: satırlar eğik açıyla alttan yükselir (tasarımdaki .ln). */
export function MaskedHeading({ lines, as: Heading = "h1", size = "d1", delay = 0.1, stagger = 0.1, className }: Props) {
  return (
    <Heading className={cn("font-display text-balance", size === "d1" ? "text-d1" : "text-d2", className)}>
      {lines.map((line, index) => (
        <span key={index} className="-mb-[0.06em] block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={{ y: "105%", skewY: 6 }}
            animate={{ y: 0, skewY: 0 }}
            transition={{ duration: 1.2, ease: EASE_SOFT, delay: delay + index * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Heading>
  );
}
