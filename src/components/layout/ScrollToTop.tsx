"use client";
import { useTranslations } from "next-intl";

import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { EASE_SOFT } from "@/lib/utils";

/** Sayfa yeterince kaydırılınca belirir. */
const SHOW_AFTER = 480;

/**
 * Sağ altta sabit "başa dön" düğmesi (her sayfada): kaydırınca yumuşakça belirir, çevresindeki ince halka
 * sayfa ilerlemesini gösterir, tıklayınca sayfa yumuşakça en üste kayar.
 */
export function ScrollToTop() {
  const t = useTranslations();
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => setVisible(value > SHOW_AFTER));

  return (
    <AnimatePresence>
      {visible ? (
        <m.button
          type="button"
          aria-label={t("common.backToTop")}
          onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
          initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.85 }}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          transition={{ duration: 0.45, ease: EASE_SOFT }}
          className="group fixed right-5 bottom-5 z-[70] grid size-12 cursor-pointer place-items-center rounded-full bg-white/90 text-ink shadow-[0_12px_28px_-12px_rgb(30_48_64/0.45)] backdrop-blur-md transition-colors duration-300 hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember sm:right-8 sm:bottom-8"
        >
          <svg viewBox="0 0 48 48" aria-hidden="true" className="absolute inset-0 size-full -rotate-90">
            <circle cx="24" cy="24" r="22" fill="none" strokeWidth="2" className="stroke-ink/10 group-hover:stroke-white/20" />
            <m.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              className="stroke-ember-d group-hover:stroke-white"
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowUp size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </m.button>
      ) : null}
    </AnimatePresence>
  );
}
