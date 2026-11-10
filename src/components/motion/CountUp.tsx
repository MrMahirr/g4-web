"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import { useRef } from "react";
import { useCoverProgress } from "./useCoverProgress";

type Props = {
  value: number;
  className?: string;
};

/**
 * Kaydırmaya bağlı sayaç (tasarım: .count2 → entry 10% … cover 45%).
 * Ekran okuyucu yalnız gerçek değeri okur; "hareketi azalt" tercihinde değer doğrudan yazılır.
 */
export function CountUp({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const progress = useCoverProgress(ref);
  const current = useTransform(progress, [0.04, 0.45], [0, value], { clamp: true });
  const rounded = useTransform(current, (latest) => Math.round(latest));

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <motion.span aria-hidden="true" className="tabular-nums">
        {reduceMotion ? value : rounded}
      </motion.span>
    </span>
  );
}
