"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useCoverProgress } from "./useCoverProgress";

/**
 * Perde (tasarım: .curtain): kaydırdıkça kor rengi perde sağa çekilir (entry 10% … cover 45%),
 * görsel 1.3x'ten yerine oturur (… cover 55%). Geri kaydırınca perde geri kapanır.
 */
export function CurtainFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const progress = useCoverProgress(ref);
  const curtain = useTransform(progress, [0.04, 0.45], [1, 0]);
  const scale = useTransform(progress, [0.04, 0.55], [1.3, 1]);

  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { scale }}>
        {children}
      </motion.div>
      {reduceMotion ? null : (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 z-[4] origin-right bg-ember"
          style={{ scaleX: curtain }}
        />
      )}
    </div>
  );
}
