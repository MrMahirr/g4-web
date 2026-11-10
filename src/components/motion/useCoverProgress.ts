"use client";

import { useScroll, type MotionValue } from "motion/react";
import type { RefObject } from "react";

/**
 * Tasarımdaki CSS `animation-timeline: view()` karşılığı.
 * Öğenin üstü ekranın altına değdiği an 0, öğenin altı ekranın üstünden çıktığı an 1 olur
 * (CSS'teki "cover" aralığı). Tasarımdaki `animation-range: entry 0% cover 30%` gibi aralıklar
 * bu değerin [0, 0.30] dilimine eşlenir.
 */
export function useCoverProgress(ref: RefObject<HTMLElement | null>): MotionValue<number> {
  return useScroll({ target: ref, offset: ["start end", "end start"] }).scrollYProgress;
}
