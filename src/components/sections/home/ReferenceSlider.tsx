"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "motion/react";
import { useCallback, type ReactNode } from "react";

/**
 * Sonsuz döngülü referans şeridi (Embla): kendiliğinden akar, fareyle üzerine gelince durur;
 * elle sürükleme kapalıdır; yalnız ok düğmeleriyle gezilir (sondan sonra başa sarar).
 * Hareket azaltma tercihi açıksa otomatik akış kapalı kalır, kullanıcı yine kaydırabilir.
 */
export function ReferenceSlider({ label, children }: { label: string; children: ReactNode }) {
  const t = useTranslations("i18n.carousel");
  const reduceMotion = useReducedMotion();
  const [viewportRef, emblaApi] = useEmblaCarousel({ loop: true, watchDrag: false, align: "start" }, [
    AutoScroll({
      speed: 0.7,
      startDelay: 1500,
      playOnInit: !reduceMotion,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  /*
    Otomatik akış (AutoScroll) kendi sabit hızlı kaydırıcısını kurar; ok düğmesiyle verilen scrollPrev/Next
    onunla çakışır ve etkisiz kalır. Embla'nın önerdiği gibi: önce yönü ver, sonra akışı sıfırla —
    akış, startDelay kadar bekleyip kaldığı yerden sürer.
  */
  const step = useCallback(
    (direction: "prev" | "next") => {
      if (!emblaApi) return;
      if (direction === "prev") emblaApi.scrollPrev();
      else emblaApi.scrollNext();
      emblaApi.plugins().autoScroll?.reset();
    },
    [emblaApi],
  );

  const arrowClass =
    "absolute top-1/2 z-10 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_24px_-8px_rgb(30_48_64/0.45)] transition-colors duration-300 hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember";

  return (
    <div className="relative">
      <div
        ref={viewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        className="overflow-hidden border-t border-l border-line"
      >
        <div className="flex">{children}</div>
      </div>
      <button type="button" aria-label={t("previous")} onClick={() => step("prev")} className={`${arrowClass} left-3`}>
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <button type="button" aria-label={t("next")} onClick={() => step("next")} className={`${arrowClass} right-3`}>
        <ChevronRight size={22} aria-hidden="true" />
      </button>
    </div>
  );
}
