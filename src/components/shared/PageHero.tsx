import type { ReactNode } from "react";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Enter } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Breadcrumb, type Crumb } from "./Breadcrumb";

type Props = {
  crumbs: Crumb[];
  /** Başlık satırları (her öğe ayrı satır, maskeden yükselir). */
  title: ReactNode[];
  /** Başlığın üstündeki ◆ etiket. */
  tag?: string;
  description?: ReactNode;
  /** Arkadaki dev kontur yazı (dekoratif). */
  ghost?: string;
  /** Sağ tarafta duran öğe (ör. kategori sayfasındaki daire görsel). */
  aside?: ReactNode;
  /** Başlık ilk satır gecikmesi (sn). */
  delay?: number;
  children?: ReactNode;
};

/** İç sayfa başlığı (tasarım: .ph-hero) — sayfa yolu, etiket, maskeli başlık, hayalet dev yazı. */
export function PageHero({ crumbs, title, tag, description, ghost, aside, delay = 0.1, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-linear-170 from-white to-tint pt-[190px] pb-[90px] grain">
      {ghost ? (
        <Enter
          kind="ghost"
          delay={0.2}
          aria-hidden
          className="absolute -right-[2vw] -bottom-[6vw] -z-10 font-display text-[clamp(200px,28vw,440px)] leading-[0.8] font-extrabold tracking-[-0.06em] whitespace-nowrap text-ghost select-none"
        >
          {ghost}
        </Enter>
      ) : null}
      <Container className="flex flex-wrap items-end justify-between gap-10">
        <div className="flex max-w-[760px] min-w-0 flex-col gap-[30px]">
          <Enter>
            <Breadcrumb items={crumbs} />
          </Enter>
          {tag ? (
            <Enter delay={0.1}>
              <Tag>{tag}</Tag>
            </Enter>
          ) : null}
          <MaskedHeading lines={title} delay={tag ? delay + 0.05 : delay} />
          {description ? (
            <Enter kind="rise" delay={0.5}>
              <p className="max-w-[640px] text-lead text-pretty text-muted">{description}</p>
            </Enter>
          ) : null}
          {children}
        </div>
        {aside}
      </Container>
    </section>
  );
}
