import type { ReactNode } from "react";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Breadcrumb, type Crumb } from "./Breadcrumb";

type Props = {
  crumbs: Crumb[];
  /** Başlık satırları (her öğe ayrı satır). */
  title: ReactNode[];
  description?: ReactNode;
  /** Arkadaki dev kontur yazı (dekoratif). */
  ghost?: string;
  children?: ReactNode;
};

/** İç sayfa başlığı: sayfa yolu, maskeli başlık, arkada hayalet dev yazı. */
export function PageHero({ crumbs, title, description, ghost, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-linear-170 from-white to-tint pt-[190px] pb-[90px] grain">
      {ghost ? (
        <Reveal
          kind="fade"
          onLoad
          delay={0.2}
          className="absolute -right-[2vw] -bottom-[6vw] -z-10 font-display text-[clamp(200px,28vw,440px)] leading-[0.8] font-extrabold tracking-[-0.06em] whitespace-nowrap text-ghost"
        >
          <span aria-hidden="true">{ghost}</span>
        </Reveal>
      ) : null}
      <Container className="flex flex-col gap-[30px]">
        <Reveal kind="fade" onLoad>
          <Breadcrumb items={crumbs} />
        </Reveal>
        <MaskedHeading lines={title} />
        {description ? (
          <Reveal onLoad delay={0.5}>
            <p className="max-w-[640px] text-lead text-pretty text-muted">{description}</p>
          </Reveal>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
