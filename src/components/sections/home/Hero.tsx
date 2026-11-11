import { HeroAway } from "@/components/motion/HeroMotion";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Enter } from "@/components/motion/Reveal";
import { Picture } from "@/components/shared/Picture";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { ImageEntry } from "@/core/types";
import { homeCopy } from "@/data/home.data";
import { routes } from "@/data/navigation.data";

const copy = homeCopy.hero;

/** Anasayfa hero (tasarım: .hero2). */
export function Hero({ image }: { image: ImageEntry | null }) {
  return (
    <section className="relative isolate min-h-[860px] overflow-hidden bg-white pt-[150px] pb-[72px] grain max-stack:min-h-0">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <Picture src={image?.src} alt="" eager sizes="100vw" className="size-full" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 backdrop-blur-[10px] [mask-image:linear-gradient(to_right,black_30%,transparent_85%)] max-stack:[mask-image:none]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-white/85 via-white/55 via-40% to-white/0 max-stack:from-white/85 max-stack:via-white/70 max-stack:via-60% max-stack:to-white/30"
      />
      <Enter
        aria-hidden
        className="absolute top-[90px] -left-[4vw] -z-10 font-display text-[clamp(260px,42vw,640px)] leading-[0.8] font-extrabold tracking-[-0.07em] text-ghost [-webkit-text-stroke-color:rgb(30_48_64/0.2)] [-webkit-text-stroke-width:1.5px] select-none"
      >
        G4
      </Enter>

      <Container className="grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-center gap-14 max-stack:grid-cols-1">
        <HeroAway className="flex min-w-0 flex-col items-start gap-[34px]">
          <MaskedHeading
            delay={0.15}
            lines={[
              copy.lines[0],
              <span key="em" className="text-ember">
                {copy.lines[1]}
              </span>,
              <span
                key="gradient"
                className="bg-linear-to-r from-ink via-[#25597a] to-[#2f86b0] bg-clip-text text-transparent"
              >
                {copy.lines[2]}
              </span>,
            ]}
          />

          <Enter
            delay={0.8}
            className="flex min-h-[1.5em] w-full items-center gap-3.5 py-1 font-display text-[clamp(18px,1.6vw,22px)] font-medium"
          >
            <span aria-hidden="true" className="font-mono text-xs text-ember-d">
              →
            </span>
            <span className="sr-only">{copy.rotating.join(", ")}</span>
            <span aria-hidden="true" className="grid h-[1.5em] min-w-0 flex-1 overflow-hidden leading-[1.5em]">
              {copy.rotating.map((word, index) => (
                <span
                  key={word}
                  className="col-start-1 row-start-1 block truncate animate-rot-word motion-reduce:animate-none motion-reduce:not-first:hidden"
                  style={{ animationDelay: `${index * 3}s` }}
                >
                  {word}
                </span>
              ))}
            </span>
          </Enter>

          <Enter kind="rise" delay={0.9}>
            <p className="max-w-[600px] text-lead text-pretty text-muted">{copy.text}</p>
          </Enter>

          <Enter kind="rise" delay={1} className="flex flex-wrap gap-3">
            <Button href={routes.products}>{copy.primary}</Button>
            <Button href={routes.contact} variant="ghost">
              {copy.secondary}
            </Button>
          </Enter>
        </HeroAway>

      </Container>
    </section>
  );
}
