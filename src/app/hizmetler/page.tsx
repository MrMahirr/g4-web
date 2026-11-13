import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CallBackCard } from "@/components/shared/CallBackCard";
import { PageHero } from "@/components/shared/PageHero";
import { Picture } from "@/components/shared/Picture";
import { Container } from "@/components/ui/Container";
import { getCatalog } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return pageMetadata({ title: t("services.title"), description: t("services.lead"), path: routes.services });
}

/** Hizmetler (tasarım: D4Hizmetler) — her hizmet büyük başlıklı satır. */
export default async function ServicesPage() {
  const t = await getTranslations();
  const copy = await getTranslations("pages");
  const catalog = getCatalog(await getLocale());
  const services = catalog.services.getServices();

  return (
    <>
      <PageHero
        crumbs={[{ label: t("common.home"), href: routes.home }, { label: t("nav.services") }]}
        title={[copy("services.title")]}
        description={copy("services.lead")}
        ghost={String(services.length).padStart(2, "0")}
        image={catalog.images.getImage("hero/hizmetler")}
      />

      <Container as="section" className="pt-lead pb-section">
        {services.map((service, index) => {
          const image = catalog.images.getImage(service.imageKey);
          return (
            <Link
              key={service.slug}
              href={routes.service(service.slug)}
              className="group grid grid-cols-[5.625rem_minmax(0,1.2fr)_minmax(0,1fr)] items-start gap-[clamp(1.5rem,4vw,4rem)] border-t border-line py-16 text-ink no-underline max-stack:grid-cols-1"
            >
              <Reveal>
                <span className="block pt-3.5 font-mono text-sm text-ember-d">{String(index + 1).padStart(2, "0")}</span>
              </Reveal>
              <div className="flex flex-col gap-[1.375rem]">
                <Reveal kind="skew">
                  <h2
                    className={cn(
                      "font-display text-[clamp(2.125rem,4.4vw,4.25rem)] leading-[1.02] font-bold tracking-[-0.04em]",
                      "transition-[color,translate] duration-700 ease-soft group-hover:translate-x-3.5 group-hover:text-ember-d",
                    )}
                  >
                    {service.title}
                  </h2>
                </Reveal>
                <Reveal>
                  <p className="max-w-[35rem] text-lead text-pretty text-muted">{service.shortDescription}</p>
                </Reveal>
                <Reveal>
                  <span className="mt-2 inline-flex items-center gap-2.5 font-semibold">
                    {t("common.readMore")}
                    <span
                      aria-hidden="true"
                      className="relative flex size-[2.875rem] items-center justify-center overflow-hidden rounded-full bg-ink text-white transition-colors duration-500 ease-soft group-hover:bg-ember"
                    >
                      <ArrowSwap trigger="plain" />
                    </span>
                  </span>
                </Reveal>
              </div>
              <Picture
                src={image?.src}
                alt={image?.alt ?? service.title}
                curtain
                zoomOnHover
                sizes="(max-width: 960px) 100vw, 40vw"
                className="h-80 rounded-btn"
              />
            </Link>
          );
        })}
      </Container>

      <Container as="section" className="pb-section">
        <CallBackCard phone={catalog.site.getCompany().phone} variant="wide" />
      </Container>
    </>
  );
}
