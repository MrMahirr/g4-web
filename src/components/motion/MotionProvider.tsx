"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { EASE_SOFT } from "@/lib/utils";

/** Tüm motion animasyonları için ortak ayar: kullanıcının "hareketi azalt" tercihine uyar. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.9, ease: EASE_SOFT }}>
      <LazyMotion features={domAnimation} strict>{children}</LazyMotion>
    </MotionConfig>
  );
}
