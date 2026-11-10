import Link from "next/link";
import { ProgressLine, ProgressSection } from "@/components/motion/SectionProgress";
import { Picture } from "@/components/shared/Picture";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { UnderlineLink, underlineLinkClass } from "@/components/ui/UnderlineLink";
import type { ImageEntry, ServiceItem } from "@/core/types";
import { homeCopy } from "@/data/home.data";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";

const copy = homeCopy.services;

type Props = { services: { service: ServiceItem; image: ImageEntry | null }[] };

/** Yatay kayan hizmet şeridi (tasarım: .hs.hs-short — sabitleme kapalı, yatay kaydırılabilir). */
export function Services({ services }: Props) {
  const total = String(services.length).padStart(2, "0");

  return (
    <ProgressSection className="relative overflow-hidden bg-tint grain">
      <div className="flex flex-col gap-14 pt-[120px] pb-20">
        <Container className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-5">
            <Tag>{copy.tag}</Tag>
            <h2 className="font-display text-d2">{copy.title}</h2>
          </div>
          <div className="flex min-w-60 flex-col items-end gap-3.5">
            <UnderlineLink href={routes.services} className="text-ink">
              {copy.all}
            </UnderlineLink>
            <ProgressLine />
          </div>
        </Container>

        <div className="flex snap-x snap-mandatory scroll-pl-[max(32px,calc((100vw_-_1320px)/2_+_32px))] gap-6 overflow-x-auto pr-8 pb-6 pl-[max(32px,calc((100vw_-_1320px)/2_+_32px))]">
          {services.map(({ service, image }, index) => (
            <Link
              key={service.slug}
              href={routes.service(service.slug)}
              className="group flex w-[min(560px,82vw)] flex-none snap-start flex-col gap-[22px] text-ink no-underline"
            >
              <div className="relative">
                <Picture
                  src={image?.src}
                  alt={image?.alt ?? service.title}
                  zoomOnHover
                  sizes="(max-width: 700px) 82vw, 560px"
                  className="h-[360px] rounded-btn"
                />
                <span className="absolute top-3.5 left-4 z-[2] rounded-tag bg-ember px-[9px] py-[5px] font-mono text-xs text-white">
                  {String(index + 1).padStart(2, "0")} / {total}
                </span>
              </div>
              <h3 className="font-display text-d3 transition-colors duration-300 group-hover:text-ember-d">{service.title}</h3>
              <p className="max-w-[500px] leading-[1.75] text-pretty text-muted">{service.shortDescription}</p>
              <span className={cn(underlineLinkClass, "self-start")}>{copy.readMore}</span>
            </Link>
          ))}

          <div className="flex w-[420px] max-w-[82vw] flex-none snap-start flex-col justify-center gap-6 pr-16">
            <p className="font-display text-[34px] leading-[1.15] font-semibold tracking-[-0.03em]">{copy.closing}</p>
            <Button href={routes.contact} className="self-start">
              {homeCopy.hero.secondary}
            </Button>
          </div>
        </div>
      </div>
    </ProgressSection>
  );
}
