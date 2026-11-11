"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

type Props = {
  value: number;
  className?: string;
  /** Saniye cinsinden sayma süresi. */
  duration?: number;
};

/**
 * Ekrana girince kendi kendine sayan sayaç (bir kez çalışır).
 * Ekran okuyucu yalnız gerçek değeri okur; "hareketi azalt" tercihinde değer doğrudan yazılır.
 */
export function CountUp({ value, className, duration = 2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const current = useMotionValue(0);
  const rounded = useTransform(current, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(current, value, { duration, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, reduceMotion, value, duration, current]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <motion.span aria-hidden="true" className="tabular-nums">
        {reduceMotion ? value : rounded}
      </motion.span>
    </span>
  );
}
