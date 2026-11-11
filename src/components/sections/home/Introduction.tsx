import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceShowcase, type ShowcaseItem } from "@/components/sections/home/ServiceShowcase";
import { Container } from "@/components/ui/Container";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import type { StatItem } from "@/core/types";
import { homeCopy } from "@/data/home.data";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";

const copy = homeCopy.intro;

type Props = {
  services: ShowcaseItem[];
  stats: StatItem[];
};

/** "G4 Medikal" tanıtımı + hizmetler tek bölümde: büyük cümle, hizmet vitrini (hover'da görsel değişir), sayaçlar. */
export function Introduction({ services, stats }: Props) {
  return (
    <Container as="section" className="flex flex-col gap-[clamp(40px,5vw,72px)] pt-section pb-section">
      <div className="flex flex-col gap-7">
        <Reveal kind="skew">
          <p className="max-w-[1150px] font-display text-[clamp(28px,3.6vw,52px)] leading-[1.18] font-semibold tracking-[-0.03em] text-balance">
            {copy.statement.before} <span className="text-ember">{copy.statement.accent}</span> {copy.statement.after}
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 gap-[clamp(24px,5vw,80px)] max-stack:grid-cols-1">
        {copy.paragraphs.map((paragraph) => (
          <Reveal key={paragraph}>
            <p className="text-pretty text-muted">{paragraph}</p>
          </Reveal>
        ))}
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-end justify-end gap-4">
          <UnderlineLink href={routes.services} className="text-ink">
            {homeCopy.services.all}
          </UnderlineLink>
        </div>
        <ServiceShowcase items={services} />
      </div>

      <div className="grid grid-cols-4 border-t border-line max-stack:grid-cols-2">
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            index={index}
            className={cn(
              "flex flex-col gap-2 border-r border-line pt-[34px] pr-7 pb-2.5 last:border-r-0 not-first:pl-7",
              "max-stack:border-r-0 max-stack:not-first:pl-0",
            )}
          >
            <span className="font-mono text-xs tracking-[0.08em] text-muted uppercase">{stat.kicker}</span>
            <CountUp
              value={stat.value}
              className={cn(
                "font-display text-[clamp(56px,6vw,96px)] leading-none font-bold tracking-[-0.05em]",
                index === stats.length - 1 ? "text-ember-d" : "text-ink",
              )}
            />
            <span className="font-semibold">{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
