"use client";

import { m, useReducedMotion, useScroll, type MotionValue } from "motion/react";
import { createContext, useContext, useRef, type ReactNode } from "react";

const ProgressContext = createContext<MotionValue<number> | null>(null);

/**
 * İçindeki <ProgressLine /> bölüm ekranda kayarken dolar
 * (tasarım: .hs-prog, view timeline "contain 0% → 100%": bölüm ekrana tam girdiği andan
 * üstü ekranın üstüne değene kadar).
 */
export function ProgressSection({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "start start"] });
  return (
    <ProgressContext.Provider value={scrollYProgress}>
      <section ref={ref} className={className}>
        {children}
      </section>
    </ProgressContext.Provider>
  );
}

/** 240px'lik ilerleme çizgisi. */
export function ProgressLine() {
  const progress = useContext(ProgressContext);
  const reduceMotion = useReducedMotion();
  return (
    <span aria-hidden="true" className="relative block h-0.5 w-60 bg-ink/15">
      <m.span
        className="absolute inset-0 origin-left bg-ember"
        style={{ scaleX: reduceMotion || !progress ? 1 : progress }}
      />
    </span>
  );
}
