import type { Metadata } from "next";
import { Quote, Sparkle } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { Picture } from "@/components/shared/Picture";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { container } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { pageCopy } from "@/data/pages.data";
import { tr } from "@/dictionaries/tr";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

const copy = pageCopy.about;

export const metadata: Metadata = pageMetadata({ title: copy.title, description: copy.lead, path: routes.about });

/** Hakkımızda (tasarım: D4Hakkimizda). */
export default function AboutPage() {
  const catalog = container.resolve("CatalogService");
  const cover = catalog.getImage(copy.coverImageKey);
  const services = catalog.getServices();
  const band = [...copy.band, ...copy.band, ...copy.band, ...copy.band];

  return (
    <>
      <PageHero
        crumbs={[{ label: tr.common.home, href: routes.home }, { label: tr.nav.corporate }, { label: copy.title }]}
        title={[copy.title]}
        description={copy.lead}
        ghost="G4"
      />

      <Container as="section" className="pt-10">
        <Reveal kind="scale" radius={6} className="overflow-hidden rounded-card">
          <Picture src={cover?.src} alt={cover?.alt ?? copy.title} curtain eager sizes="100vw" className="h-[620px] max-row:h-[380px]" />
        </Reveal>
      </Container>

      <Container as="section" className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] gap-12 pt-[130px] pb-[110px]">
        {copy.intro.map((paragraph, index) => (
          <Reveal key={paragraph} index={index}>
            <p className="text-lead text-pretty text-muted">{paragraph}</p>
          </Reveal>
        ))}
      </Container>

      <section className="relative overflow-hidden bg-tint py-[140px] grain">
        <Container className="flex flex-col gap-[34px]">
          <Tag>{copy.vision.tag}</Tag>
          <Reveal>
            <Quote size={56} fill="currentColor" strokeWidth={0} className="text-ember" aria-hidden="true" />
          </Reveal>
          <Reveal kind="skew">
            <p className="max-w-[1150px] font-display text-[clamp(26px,3.2vw,46px)] leading-[1.25] font-medium tracking-[-0.03em] text-balance">
              {copy.vision.before} <span className="text-ember">{copy.vision.accent}</span> {copy.vision.after}
            </p>
          </Reveal>
        </Container>
      </section>

      <Container as="section" className="pt-[60px] pb-[120px]">
        {copy.sectors.map((sector, index) => {
          const image = catalog.getImage(sector.imageKey);
          const service = services.find((item) => item.domain === sector.domain);
          const reversed = index % 2 === 1;
          return (
            <div
              key={sector.title}
              className="grid grid-cols-2 items-center gap-[clamp(32px,6vw,96px)] border-t border-line py-[90px] max-stack:grid-cols-1"
            >
              <Picture
                src={image?.src}
                alt={image?.alt ?? sector.title}
                curtain
                curtainMirrored={sector.domain === "medical"}
                sizes="(max-width: 960px) 100vw, 50vw"
                className={cn("h-[520px] rounded-btn max-row:h-[360px]", reversed && "order-2 max-stack:order-none")}
              />
              <div className="flex flex-col gap-6">
                <Reveal>
                  <span className="font-mono text-[13px] text-ember-d">
                    {String(index + 1).padStart(2, "0")} / {String(copy.sectors.length).padStart(2, "0")}
                  </span>
                </Reveal>
                <Reveal kind="skew">
                  <h2 className="font-display text-d2 text-[clamp(32px,3.6vw,56px)]">{sector.title}</h2>
                </Reveal>
                <Reveal>
                  <p className="text-lead text-pretty text-muted">{sector.lead}</p>
                </Reveal>
                {sector.paragraphs.map((paragraph) => (
                  <Reveal key={paragraph}>
                    <p className="leading-[1.75] text-pretty text-muted">{paragraph}</p>
                  </Reveal>
                ))}
                {service ? (
                  <Reveal>
                    <UnderlineLink href={routes.service(service.slug)} className="self-start text-ember-d">
                      {tr.common.readMore}
                    </UnderlineLink>
                  </Reveal>
                ) : null}
              </div>
            </div>
          );
        })}
      </Container>

      <section aria-hidden="true" className="overflow-hidden bg-ember py-6 text-ink">
        <div className="flex w-max animate-marquee [animation-direction:reverse] motion-reduce:animate-none">
          {band.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="inline-flex items-center gap-9 pr-9 font-display text-[clamp(30px,3.6vw,52px)] font-bold tracking-[-0.03em] whitespace-nowrap"
            >
              {word}
              <Sparkle size={20} fill="currentColor" strokeWidth={0} />
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
