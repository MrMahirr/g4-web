"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useCoverProgress } from "./useCoverProgress";

/**
 * Çapraz perde: kaydırdıkça görselin üzerindeki yarı saydam, tema renkli gradyan perde
 * sağ üstten sol alt köşeye doğru çapraz çekilir; arkasından daha açık ikinci katman gelir.
 * Görsel 1.3x'ten yerine oturur. Geri kaydırınca perde geri kapanır.
 */

/** t=1 tüm alanı örten, t=0 sol alt köşeye çekilmiş üçgen (kenar çapraz). */
const toClip = (t: number) => `polygon(0% 100%, 0% ${100 - 200 * t}%, ${200 * t}% 100%)`;

export function CurtainFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const progress = useCoverProgress(ref);
  const front = useTransform(progress, [0.04, 0.42], [1, 0]);
  const back = useTransform(progress, [0.08, 0.5], [1, 0]);
  const frontClip = useTransform(front, toClip);
  const backClip = useTransform(back, toClip);
  const scale = useTransform(progress, [0.04, 0.55], [1.3, 1]);

  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { scale }}>
        {children}
      </motion.div>
      {reduceMotion ? null : (
        <>
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 z-[4] bg-linear-to-tr from-tint/70 via-tint-2/45 to-paper/10 backdrop-blur-[2px]"
            style={{ clipPath: backClip }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 z-[5] bg-linear-to-tr from-ink/75 via-ink/40 to-muted/5"
            style={{ clipPath: frontClip }}
          />
        </>
      )}
    </div>
  );
}
