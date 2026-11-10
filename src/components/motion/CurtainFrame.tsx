"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE_CURTAIN, EASE_SOFT } from "@/lib/utils";

/** Perde açılımı: kor rengi perde sağa çekilir, içerik 1.3x'ten yerine oturur (tasarımdaki .curtain). */
export function CurtainFrame({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial="closed"
      whileInView="open"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className="curtain-visual absolute inset-0"
        variants={{ closed: { scale: 1.3 }, open: { scale: 1 } }}
        transition={{ duration: 1.4, ease: EASE_SOFT }}
      >
        {children}
      </motion.div>
      <motion.span
        aria-hidden="true"
        className="curtain-overlay absolute inset-0 z-[4] origin-right bg-ember"
        variants={{ closed: { scaleX: 1 }, open: { scaleX: 0 } }}
        transition={{ duration: 1.1, ease: EASE_CURTAIN }}
      />
    </motion.div>
  );
}
