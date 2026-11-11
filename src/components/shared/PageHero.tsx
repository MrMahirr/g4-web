import Image from "next/image";
import type { ReactNode } from "react";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Enter } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import type { ImageEntry } from "@/core/types";
import { cn } from "@/lib/utils";
import { Breadcrumb, type Crumb } from "./Breadcrumb";

type Props = {
  crumbs: Crumb[];
  /** Başlık satırları (her öğe ayrı satır, maskeden yükselir). */
  title: ReactNode[];
  description?: ReactNode;
  /** Arkadaki dev kontur yazı (dekoratif). */
  ghost?: string;
  /** Sağ tarafta duran öğe (ör. kategori sayfasındaki daire görsel). */
  aside?: ReactNode;
  /** Başlık ilk satır gecikmesi (sn). */
  delay?: number;
  /** "mask": satır maskesi (.ln), "rise": tek blok yükselme (hizmet detay). */
  titleMotion?: "mask" | "rise";
  /** Başlık boyutu (varsayılan text-d1). */
  titleClassName?: string;
  /** Alt boşluk (varsayılan 90px). */
  className?: string;
  children?: ReactNode;
  /** Başlık bloğunun altında, tam genişlikte duran içerik (kariyer adımları). */
  footer?: ReactNode;
  /** Başlığın arkasında duran tam genişlik görsel (üzerine okunurluk için açık perde çekilir). */
  image?: ImageEntry | null;
  /** Görselin kadraj konumu (varsayılan "object-center"; ör. "object-top" üst kısmı gösterir). */
  imagePosition?: string;
};

/** İç sayfa başlığı (tasarım: .ph-hero) — sayfa yolu, etiket, maskeli başlık, hayalet dev yazı. */
export function PageHero({
  crumbs,
  title,
  description,
  ghost,
  aside,
  delay = 0.1,
  titleMotion = "mask",
  titleClassName,
  className,
  children,
  footer,
  image,
  imagePosition = "object-center",
}: Props) {
  const headingDelay = delay;
  return (
    <section className={cn("relative isolate overflow-hidden bg-linear-170 from-white to-tint pt-hero-top pb-hero-bottom grain", className)}>
      {image ? (
        <>
          <Image src={image.src} alt="" fill priority sizes="100vw" className={cn("-z-20 object-cover", imagePosition)} />
          <div aria-hidden="true" className="absolute inset-0 -z-20 bg-linear-to-r from-white/95 via-white/75 to-white/20" />
        </>
      ) : null}
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
        <div className="flex max-w-[1100px] min-w-0 flex-col gap-[30px]">
          <Enter>
            <Breadcrumb items={crumbs} />
          </Enter>
          {titleMotion === "rise" ? (
            <Enter kind="rise" delay={headingDelay}>
              <h1 className={cn("font-display text-d1 leading-[0.95] font-bold tracking-[-0.05em] text-balance", titleClassName)}>
                {title}
              </h1>
            </Enter>
          ) : (
            <MaskedHeading lines={title} delay={headingDelay} className={titleClassName} />
          )}
          {description ? (
            <Enter kind="rise" delay={0.5}>
              <p className="max-w-[640px] text-lead text-pretty text-muted">{description}</p>
            </Enter>
          ) : null}
          {children}
        </div>
        {aside}
        {footer ? <div className="basis-full">{footer}</div> : null}
      </Container>
    </section>
  );
}
