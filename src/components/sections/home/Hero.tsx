import { CircleOpen, HeroAway } from "@/components/motion/HeroMotion";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Enter } from "@/components/motion/Reveal";
import { G4Logo } from "@/components/shared/G4Logo";
import { Picture } from "@/components/shared/Picture";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import type { ImageEntry } from "@/core/types";
import { homeCopy } from "@/data/home.data";
import { routes } from "@/data/navigation.data";

const copy = homeCopy.hero;

/** Anasayfa hero (tasarım: .hero2). */
export function Hero({ image }: { image: ImageEntry | null }) {
  return (
    <section className="relative isolate min-h-[860px] overflow-hidden bg-linear-165 from-white via-[#EEF5F9] via-55% to-[#FBEDEA] pt-[150px] pb-[72px] grain max-stack:min-h-0">
      <Enter
        aria-hidden
        className="absolute top-[90px] -left-[4vw] -z-10 font-display text-[clamp(260px,42vw,640px)] leading-[0.8] font-extrabold tracking-[-0.07em] text-ghost [-webkit-text-stroke-color:rgb(30_48_64/0.07)] select-none"
      >
        G4
      </Enter>
      <div
        aria-hidden="true"
        className="absolute -right-[200px] -bottom-[260px] -z-10 size-[760px] rounded-full bg-radial from-ember/35 to-ember/0 to-65%"
      />

      <Container className="grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-end gap-14 max-stack:grid-cols-1">
        <HeroAway className="flex min-w-0 flex-col items-start gap-[34px]">
          <Enter delay={0.1}>
            <Tag>{copy.tag}</Tag>
          </Enter>

          <MaskedHeading
            delay={0.15}
            lines={[
              copy.lines[0],
              <span key="em" className="text-ember">
                {copy.lines[1]}
              </span>,
              <span key="outline" className="text-outline">
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

        <div className="relative">
          <CircleOpen className="h-[620px] overflow-hidden rounded-card max-stack:h-[480px]">
            <Picture
              src={image?.src}
              alt={image?.alt ?? ""}
              eager
              sizes="(max-width: 960px) 100vw, 42vw"
              className="h-full"
            />
          </CircleOpen>

          <Enter
            delay={1.2}
            aria-hidden
            className="absolute bottom-[60px] -left-[70px] size-[150px] max-stack:left-4"
          >
            <svg viewBox="0 0 150 150" className="size-full animate-spin-badge motion-reduce:animate-none">
              <defs>
                <path id="hero-badge-ring" d="M75,75 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" />
              </defs>
              <text className="font-mono" fontSize="10" letterSpacing="2.6" fill="#1E3040">
                <textPath href="#hero-badge-ring">{copy.badgeRing}</textPath>
              </text>
            </svg>
            <span className="absolute inset-[38px] flex items-center justify-center rounded-full bg-ember">
              <G4Logo size="badge" inverted alt="" />
            </span>
          </Enter>

          <Enter
            delay={1.3}
            className="absolute top-4 right-4 rounded-tag bg-white/90 px-2.5 py-1.5 font-mono text-[11px] tracking-[0.04em] text-ink"
          >
            ● {copy.imageLabel}
          </Enter>
        </div>
      </Container>
    </section>
  );
}
