import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ReferenceCard } from "@/components/sections/references/ReferenceCard";
import { ReferencesCta } from "@/components/sections/references/ReferencesCta";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { getCatalog } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return pageMetadata({ title: t("references.title"), description: t("references.lead"), path: routes.references });
}

/** Referanslar (tasarım: D4Referanslar) — numaralı büyük ızgara + kayan dev isimler. */
export default async function ReferencesPage() {
  const t = await getTranslations();
  const copy = await getTranslations("pages");
  const catalog = getCatalog(await getLocale());
  const references = catalog.references.getReferences();
  const total = references.length;

  return (
    <>
      <PageHero
        crumbs={[
          { label: t("common.home"), href: routes.home },
          { label: t("nav.corporate") },
          { label: copy("references.title") },
        ]}
        title={[copy("references.title")]}
        description={copy("references.lead")}
        ghost={String(references.length).padStart(2, "0")}
        image={catalog.images.getImage("hero/referanslar")}
      />

      <Container as="section" className="pt-lead">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {references.map((reference, index) => {
            const logo = catalog.images.getImage(reference.logoKey);
            const photo = catalog.images.getImage(reference.imageKey);
            return (
              <li key={reference.id}>
                <Reveal index={index % 3} className="h-full">
                  <ReferenceCard
                    reference={reference}
                    logo={logo}
                    photo={photo}
                    index={index}
                    total={total}
                  />
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>

      <Container className="pt-section pb-section">
        <Reveal>
          <ReferencesCta />
        </Reveal>
      </Container>

      <section aria-hidden="true" className="overflow-hidden pb-section">
        {/* Kendi kendine kayan şerit: metin iki kez dizilir, animate-marquee −%50'ye kayıp başa sarar. */}
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              className={cn(
                "shrink-0 pr-[0.5em] font-display text-[clamp(5.625rem,13vw,12.5rem)] leading-none font-extrabold",
                "tracking-[-0.06em] whitespace-nowrap text-transparent select-none",
                "[-webkit-text-stroke:1.5px_var(--color-line)]",
              )}
            >
              {copy("references.drift")} ·
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
