"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { EASE_SOFT } from "@/lib/utils";

type Props = {
  value: number;
  /** Saniye. */
  duration?: number;
  className?: string;
};

/**
 * Ekrana girince 0'dan hedefe sayar. Sunucu çıktısında gerçek değer yazılıdır
 * (JS yoksa ve arama motorları için); ekran okuyucu yalnız son değeri okur.
 */
export function CountUp({ value, duration = 1.8, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduceMotion) return;

    const controls = animate(0, value, {
      duration,
      ease: EASE_SOFT,
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, duration]);

  return (
    <span className={className} aria-label={String(value)}>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {value}
      </span>
    </span>
  );
}
