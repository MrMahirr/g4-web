import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { Picture } from "@/components/shared/Picture";
import { Container } from "@/components/ui/Container";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { getCatalog } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { pageMeta } from "@/content/page-meta";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return pageMetadata({ title: t("about.title"), description: t("about.lead"), path: routes.about });
}

/** Hakkımızda (tasarım: D4Hakkimizda). */
export default async function AboutPage() {
  const t = await getTranslations();
  const copy = await getTranslations("pages");
  const intro = copy.raw("about.intro") as string[];
  const sectors = copy.raw("about.sectors") as { title: string; lead: string; paragraphs: string[] }[];
  const catalog = getCatalog(await getLocale());
  const cover = catalog.getImage(pageMeta.about.coverImageKey);
  const services = catalog.getServices();

  return (
    <>
      <PageHero
        crumbs={[{ label: t("common.home"), href: routes.home }, { label: t("nav.corporate") }, { label: copy("about.title") }]}
        title={[copy("about.title")]}
        description={copy("about.lead")}
        ghost="G4"
        image={catalog.getImage("hero/hakkimizda")}
      />

      <Container as="section" className="pt-lead">
        <Reveal kind="scale" radius={6} className="overflow-hidden rounded-card">
          <Picture
            src={cover?.src}
            alt={cover?.alt ?? copy("about.title")}
            curtain
            curtainVeil={false}
            eager
            sizes="100vw"
            className="h-[620px] max-row:h-[380px]"
          />
        </Reveal>
      </Container>

      <Container as="section" className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] gap-12 py-section">
        {intro.map((paragraph, index) => (
          <Reveal key={paragraph} index={index}>
            <p className="text-lead text-pretty text-muted">{paragraph}</p>
          </Reveal>
        ))}
      </Container>

      <section className="relative overflow-hidden bg-tint py-section grain">
        <Container className="flex flex-col gap-[34px]">
          <Reveal>
            <Quote size={56} fill="currentColor" strokeWidth={0} className="text-ember" aria-hidden="true" />
          </Reveal>
          <Reveal kind="skew">
            <p className="max-w-[1150px] font-display text-[clamp(26px,3.2vw,46px)] leading-[1.25] font-medium tracking-[-0.03em] text-balance">
              {copy("about.vision.before")} <span className="text-ember">{copy("about.vision.accent")}</span> {copy("about.vision.after")}
            </p>
          </Reveal>
        </Container>
      </section>

      <Container as="section" className="py-section">
        {sectors.map((sector, index) => {
          const meta = pageMeta.about.sectors[index];
          const image = catalog.getImage(meta.imageKey);
          const service = services.find((item) => item.domain === meta.domain);
          const reversed = index % 2 === 1;
          return (
            <div
              key={sector.title}
              className="grid grid-cols-2 items-center gap-[clamp(32px,6vw,96px)] border-t border-line py-[clamp(48px,6.25vw,90px)] max-stack:grid-cols-1"
            >
              <Picture
                src={image?.src}
                alt={image?.alt ?? sector.title}
                curtain
                curtainMirrored={meta.domain === "medical"}
                sizes="(max-width: 960px) 100vw, 50vw"
                className={cn("h-[520px] rounded-btn max-row:h-[360px]", reversed && "order-2 max-stack:order-none")}
              />
              <div className="flex flex-col gap-6">
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
                      {t("common.readMore")}
                    </UnderlineLink>
                  </Reveal>
                ) : null}
              </div>
            </div>
          );
        })}
      </Container>
    </>
  );
}
