import { getTranslations } from "next-intl/server";
import { HeroAway } from "@/components/motion/HeroMotion";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Enter } from "@/components/motion/Reveal";
import { Picture } from "@/components/shared/Picture";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { ImageEntry } from "@/core/types";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";

/** Anasayfa hero (tasarım: .hero2). */
export async function Hero({ image }: { image: ImageEntry | null }) {
  const t = await getTranslations("home.hero");
  const lines = t.raw("lines") as string[];
  const rotating = t.raw("rotating") as string[];

  return (
    <section
      className={cn(
        "relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-white grain",
        "pt-[max(6.75rem,min(9.375rem,18svh))] pb-[min(4.5rem,7svh)]",
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Picture src={image?.src} alt="" eager sizes="100vw" className="size-full" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 backdrop-blur-[10px] [mask-image:linear-gradient(to_right,black_30%,transparent_85%)] max-stack:backdrop-blur-[2px] max-stack:[mask-image:none]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-white/85 via-white/55 via-40% to-white/0 max-stack:from-white/80 max-stack:via-white/50 max-stack:via-60% max-stack:to-white/10" />
      <Enter
        aria-hidden
        className={cn(
          "absolute top-[min(5.625rem,10svh)] -left-[4vw] -z-10 font-display",
          "text-[min(clamp(16.25rem,42vw,40rem),70svh)] leading-[0.8] font-extrabold",
          "tracking-[-0.06em] text-ghost [-webkit-text-stroke-color:rgb(30_48_64/0.08)]",
          "[-webkit-text-stroke-width:1.5px] select-none",
        )}
      >
        G4
      </Enter>

      <Container className="grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-center gap-14 max-stack:grid-cols-1">
        <HeroAway className="flex min-w-0 flex-col items-start gap-[min(2.125rem,3.5svh)]">
          <MaskedHeading
            delay={0.15}
            className="text-[max(2.25rem,min(clamp(2.75rem,7.4vw,7.25rem),10.5svh))]"
            lines={[
              lines[0],
              <span key="em" className="text-ember">{lines[1]}</span>,
              <span key="gradient" className="-me-[0.1em] bg-linear-to-r from-ink via-[#25597a] to-[#2f86b0] bg-clip-text pe-[0.1em] text-transparent">{lines[2]}</span>,
            ]}
          />

          <Enter delay={0.8} className="flex min-h-[1.5em] w-full items-center gap-3.5 py-1 font-display text-[clamp(1.125rem,1.6vw,1.375rem)] font-medium">
            <span aria-hidden="true" className="font-mono text-xs text-ember-d">→</span>
            <span className="sr-only">{rotating.join(", ")}</span>
            <span aria-hidden="true" className="grid h-[1.5em] min-w-0 flex-1 overflow-hidden leading-[1.5em]">
              {/* Anahtar sıra numarası: dil değişince metin değişir ama span'ler yeniden doğmaz, böylece
                  üç kelimenin animasyon fazı birlikte kalır (kelime anahtarı olsaydı iki dilde aynı olan
                  "Bipolar Forceps" eski fazında kalır, diğerleri sıfırlanır ve üst üste binerdi). */}
              {rotating.map((word, index) => (
                <span key={index}className="col-start-1 row-start-1 block truncate animate-rot-word motion-reduce:animate-none motion-reduce:not-first:hidden" style={{ animationDelay: `${index * 3}s` }}>
                  {word}
                </span>
              ))}
            </span>
          </Enter>

          <Enter kind="rise" delay={0.9} className="w-full">
            <p className="max-w-[37.5rem] text-lead text-pretty text-muted">{t("text")}</p>
          </Enter>

          <Enter kind="rise" delay={1} className="flex w-full flex-wrap gap-3">
            <Button href={routes.products} className="max-sm:w-full max-sm:justify-between">{t("primary")}</Button>
            <Button href={routes.contact} variant="ghost" className="max-sm:w-full max-sm:justify-between">{t("secondary")}</Button>
          </Enter>
        </HeroAway>
      </Container>
    </section>
  );
}
