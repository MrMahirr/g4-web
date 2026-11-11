"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useCoverProgress } from "./useCoverProgress";

type Props = {
  children: ReactNode;
  /** true: sağa doğru kayar (tasarım: .drift.r). */
  reverse?: boolean;
  className?: string;
};

/** Dev yazı, bölüm ekrandan geçerken yatay kayar (tasarım: .drift → cover 0% … 100%, %10 → −%30). */
export function Drift({ children, reverse = false, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const progress = useCoverProgress(ref);
  const x = useTransform(progress, [0, 1], reverse ? ["-30%", "10%"] : ["10%", "-30%"]);

  return (
    <motion.div ref={ref} className={className} style={reduceMotion ? undefined : { x }}>
      {children}
    </motion.div>
  );
}
