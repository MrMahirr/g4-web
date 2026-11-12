"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { clearCalmNavigation, isCalmNavigation } from "./calmNavigation";

/* ------------------------------------------------------------------ */
/* Görününce belirme (tasarım: .sv · .sv-x · .sk · .scale-up)         */
/* ------------------------------------------------------------------ */

export type ScrollKind = "up" | "left" | "skew" | "scale";

type ScrollPreset = {
  /** Tasarımdaki animation-range sonu; süreye eklenir (uzun aralık = daha yavaş hareket). */
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
 * Görününce belirme: öğe ekrana girdiğinde hareketin tamamı kendi kendine bir kez oynar
 * (kaydırma hızına bağlı değildir, geri kaydırınca geri oynamaz).
 * "Hareketi azalt" tercihinde öğe hareketsiz ve tam görünür çizilir.
 */
export function Reveal({ children, kind = "up", index = 0, radius = 0, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.15, margin: "0px 0px -8% 0px" });
  const { end, from } = scrollPreset(kind);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  const hidden = {
    opacity: from.opacity,
    x: from.x,
    y: from.y,
    skewY: from.skewY,
    scale: from.scale,
    ...(kind === "scale" ? { borderRadius: from.radius } : null),
  };
  const shown = {
    opacity: 1,
    x: 0,
    y: 0,
    skewY: 0,
    scale: 1,
    ...(kind === "scale" ? { borderRadius: radius } : null),
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={{ duration: 0.9 + end, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Yüklemede belirme (tasarım: .fade · .rise · .ph-hero .ghost)        */
/* ------------------------------------------------------------------ */

export type EnterKind = "fade" | "rise" | "ghost";

/**
 * CSS animasyonu (globals.css → animate-enter-*). motion ile yapıldığında sunucu HTML'i opaklık 0 ile
 * geliyor ve ekranın üstündeki içerik JS yüklenene kadar görünmüyordu (mobil LCP ~5 sn — plan 8.5).
 */
const enterClass: Record<EnterKind, string> = {
  fade: "animate-enter-fade", // fadeIn 1.2s
  rise: "animate-enter-rise", // riseIn 1.2s, translateY(40px)
  ghost: "animate-enter-ghost", // ghostIn 1.6s, translateX(12%)
};

type EnterProps = {
  children: ReactNode;
  kind?: EnterKind;
  /** Gecikme (sn) — tasarımdaki --d. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean;
  /** true: CalmLink ile kardeş sayfadan gelindiyse tam giriş yerine kısa, gecikmesiz belirme oynar. */
  calmOnSiblingNav?: boolean;
};

/** Sayfa yüklenince bir kez oynayan giriş. "Hareketi azalt" tercihinde içerik doğrudan görünür. */
export function Enter({
  children,
  kind = "fade",
  delay = 0,
  className,
  style,
  calmOnSiblingNav = false,
  ...rest
}: EnterProps) {
  const pathname = usePathname();
  // İlk render'da bir kez okunur; sunucuda ve ilk yüklemede işaret boş olduğundan hidrasyon farkı oluşmaz.
  const [calm] = useState(() => calmOnSiblingNav && isCalmNavigation(pathname));

  useEffect(() => {
    if (calm) clearCalmNavigation(pathname);
  }, [calm, pathname]);

  if (calm) {
    return (
      <div
        className={cn("animate-enter-fade motion-reduce:animate-none", className)}
        style={{ ...style, animationDuration: "0.4s" }}
        {...rest}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(enterClass[kind], "motion-reduce:animate-none", className)}
      style={delay ? { ...style, animationDelay: `${delay}s` } : style}
      {...rest}
    >
      {children}
    </div>
  );
}
