"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { EASE_SOFT } from "@/lib/utils";
import { useCoverProgress } from "./useCoverProgress";

/* ------------------------------------------------------------------ */
/* Kaydırmaya bağlı belirme (tasarım: .sv · .sv-x · .sk · .scale-up)   */
/* ------------------------------------------------------------------ */

export type ScrollKind = "up" | "left" | "skew" | "scale";

type ScrollPreset = {
  /** Hareketin bittiği "cover" oranı (tasarımdaki animation-range sonu). */
  end: number;
  from: { opacity: number; x: number; y: number; skewY: number; scale: number; radius: number };
};

function scrollPreset(kind: ScrollKind): ScrollPreset {
  const still = { opacity: 1, x: 0, y: 0, skewY: 0, scale: 1, radius: 0 };
  switch (kind) {
    case "up": // .sv → entry 0% … cover 30%, translateY(80px)
      return { end: 0.3, from: { ...still, opacity: 0, y: 80 } };
    case "left": // .sv-x → entry 0% … cover 35%, translateX(-60px)
      return { end: 0.35, from: { ...still, opacity: 0, x: -60 } };
    case "skew": // .sk → entry 0% … cover 40%, translateY(60px) skewY(5deg)
      return { end: 0.4, from: { ...still, opacity: 0, y: 60, skewY: 5 } };
    case "scale": // .scale-up → entry 0% … cover 60%, scale(.86) + 40px köşe
      return { end: 0.6, from: { ...still, scale: 0.86, radius: 40 } };
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

type RevealProps = {
  children: ReactNode;
  kind?: ScrollKind;
  /** Kademe (tasarımdaki --i): her adım başlangıcı ve sonu biraz geciktirir. */
  index?: number;
  /** "scale" türünde köşe yarıçapının vardığı değer (px) — tasarımda öğenin kendi yarıçapı. */
  radius?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Kaydırmaya bağlı belirme: öğe ekrana girerken ilerler, geri kaydırınca geri oynar.
 * "Hareketi azalt" tercihinde öğe hareketsiz ve tam görünür çizilir.
 */
export function Reveal({ children, kind = "up", index = 0, radius = 0, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const progress = useCoverProgress(ref);
  const { end, from } = scrollPreset(kind);
  const shift = index * 0.05 * end;
  const range = [shift, end + shift];

  const opacity = useTransform(progress, range, [from.opacity, 1]);
  const x = useTransform(progress, range, [from.x, 0]);
  const y = useTransform(progress, range, [from.y, 0]);
  const skewY = useTransform(progress, range, [from.skewY, 0]);
  const scale = useTransform(progress, range, [from.scale, 1]);
  const borderRadius = useTransform(progress, range, [from.radius, radius]);

  const motionStyle = reduceMotion
    ? style
    : { ...style, opacity, x, y, skewY, scale, ...(kind === "scale" ? { borderRadius } : null) };

  return (
    <motion.div ref={ref} className={className} style={motionStyle}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Yüklemede belirme (tasarım: .fade · .rise · .ph-hero .ghost)        */
/* ------------------------------------------------------------------ */

export type EnterKind = "fade" | "rise" | "ghost";

function enterPreset(kind: EnterKind) {
  switch (kind) {
    case "fade": // fadeIn 1.2s
      return { initial: { opacity: 0 }, duration: 1.2 };
    case "rise": // riseIn 1.2s, translateY(40px)
      return { initial: { opacity: 0, y: 40 }, duration: 1.2 };
    case "ghost": // ghostIn 1.6s, translateX(12%)
      return { initial: { opacity: 0, x: "12%" }, duration: 1.6 };
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

type EnterProps = {
  children: ReactNode;
  kind?: EnterKind;
  /** Gecikme (sn) — tasarımdaki --d. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean;
};

/** Sayfa yüklenince bir kez oynayan giriş. */
export function Enter({ children, kind = "fade", delay = 0, className, style, ...rest }: EnterProps) {
  const { initial, duration } = enterPreset(kind);
  return (
    <motion.div
      className={className}
      style={style}
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, ease: EASE_SOFT, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
