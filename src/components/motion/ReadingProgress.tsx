"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";

/** Sol kenarda dikey okuma çubuğu (tasarım: D4HaberDetay .prog-r). */
export function ReadingProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  if (reduceMotion) return null;

  return (
    <motion.span
      aria-hidden="true"
      className="fixed inset-y-0 left-0 z-[90] w-1 origin-top bg-ember"
      style={{ scaleY: scrollYProgress }}
    />
  );
}
