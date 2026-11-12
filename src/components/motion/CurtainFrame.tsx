"use client";

import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useCoverProgress } from "./useCoverProgress";

/**
 * Çapraz perde: görselin ortası (0,0) sayılırsa, kaydırdıkça perde (+,+) köşesinden (sağ üst)
 * (−,−) köşesine (sol alt) doğru çapraz çekilerek açılır. İki katman: önde lacivert (ink),
 * arkasında gecikmeli açık mavi (tint-2). Her katman hareket eden kenarında en koyudur.
 * Lacivertin kenarı açık maviye yumuşak bir geçişle karışır; dış kenar nettir.
 * Görsel 1.3x'ten yerine oturur. Geri kaydırınca perde geri kapanır.
 */

/**
 * "to top right" ekseninde 0 = sol alt köşe (−,−), 100 = sağ üst köşe (+,+); eş değer çizgileri çaprazdır.
 * c: perdenin kenarı — c'nin altı örtülü, üstü açık.
 */
const toMask = (feather: number) => (c: number) =>
  `linear-gradient(to top right, black ${c - feather}%, transparent ${c + feather}%)`;

/** Kenarda en koyu, sol alta doğru saydamlaşan renk; ara durakla kademesiz geçiş. */
const toVeil = (rgb: string, from: number, to: number) => (c: number) => {
  const edge = Math.max(c, 0.1);
  const mid = (from + to) / 2;
  return `linear-gradient(to top right, rgb(${rgb} / ${from}) 0%, rgb(${rgb} / ${mid}) ${edge * 0.6}%, rgb(${rgb} / ${to}) ${edge}%)`;
};

const INK = "30 48 64"; // --color-ink
const TINT = "226 237 244"; // --color-tint-2

/** Dış (açık mavi) kenar hafif yumuşak; lacivert kenar açık maviye geniş bir bantla karışır. */
const BACK_FEATHER = 5;
const FRONT_FEATHER = 18;

/** Kaydırma ilerlemesini yumuşatan yay: tekerlek adımlarındaki sıçramaları akıcı harekete çevirir. */
const SPRING = { stiffness: 90, damping: 24, mass: 0.6, restDelta: 0.0005 };

function useEdge(progress: MotionValue<number>, range: [number, number], feather: number) {
  return useTransform(progress, range, [100 + feather, -feather]);
}

type Props = {
  children: ReactNode;
  /** Yatay aynalama: perde (−,+) köşesinden (sol üst) (+,−) köşesine (sağ alt) doğru açılır. */
  mirrored?: boolean;
  /** false: yarı saydam perde katmanları çizilmez, yalnız kaydırmaya bağlı 1.3x → 1 yakınlaşma kalır. */
  veil?: boolean;
};

export function CurtainFrame({ children, mirrored = false, veil = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const progress = useSpring(useCoverProgress(ref), SPRING);
  const front = useEdge(progress, [0.03, 0.46], FRONT_FEATHER);
  const back = useEdge(progress, [0.07, 0.54], BACK_FEATHER);
  const frontMask = useTransform(front, toMask(FRONT_FEATHER));
  const backMask = useTransform(back, toMask(BACK_FEATHER));
  const frontVeil = useTransform(front, toVeil(INK, 0.3, 0.68));
  const backVeil = useTransform(back, toVeil(TINT, 0.28, 0.66));
  const scale = useTransform(progress, [0.04, 0.55], [1.3, 1]);

  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { scale }}>
        {children}
      </motion.div>
      {reduceMotion || !veil ? null : (
        <div aria-hidden="true" className={cn("absolute inset-0 z-[4]", mirrored && "-scale-x-100")}>
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 z-[4] backdrop-blur-[2px]"
            style={{ backgroundImage: backVeil, maskImage: backMask, WebkitMaskImage: backMask }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 z-[5]"
            style={{ backgroundImage: frontVeil, maskImage: frontMask, WebkitMaskImage: frontMask }}
          />
        </div>
      )}
    </div>
  );
}
