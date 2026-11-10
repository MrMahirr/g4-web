import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Picture } from "@/components/shared/Picture";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import type { ImageEntry, StatItem } from "@/core/types";
import { homeCopy } from "@/data/home.data";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";

const copy = homeCopy.intro;

type Props = {
  image: ImageEntry | null;
  stats: StatItem[];
  medicalServiceSlug: string;
  textileServiceSlug: string;
};

/** "G4 Medikal" tanıtımı: büyük cümle, perdeli görsel, iki paragraf, sayaçlar (tasarım: D4Main 2. bölüm). */
export function Introduction({ image, stats, medicalServiceSlug, textileServiceSlug }: Props) {
  return (
    <Container as="section" className="flex flex-col gap-[90px] pt-[150px] pb-[130px]">
      <div className="flex flex-col gap-7">
        <Reveal>
          <Tag>{copy.tag}</Tag>
        </Reveal>
        <Reveal kind="skew">
          <p className="max-w-[1150px] font-display text-[clamp(28px,3.6vw,52px)] leading-[1.18] font-semibold tracking-[-0.03em] text-balance">
            {copy.statement.before} <span className="text-ember">{copy.statement.accent}</span> {copy.statement.after}
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-start gap-[clamp(32px,6vw,96px)] max-stack:grid-cols-1">
        <Picture
          src={image?.src}
          alt={image?.alt ?? ""}
          curtain
          sizes="(max-width: 960px) 100vw, 40vw"
          className="h-[560px] rounded-btn max-row:h-[380px]"
        />
        <div className="flex flex-col gap-[26px] pt-5">
          {copy.paragraphs.map((paragraph) => (
            <Reveal key={paragraph}>
              <p className="text-lead text-pretty text-muted">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal className="flex flex-wrap gap-3">
            <Button href={routes.service(medicalServiceSlug)} variant="coal">
              G4 Medikal Faaliyetler
            </Button>
            <Button href={routes.service(textileServiceSlug)} variant="ghost" arrow="none">
              G4 Hastane Tekstili
            </Button>
          </Reveal>
        </div>
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
