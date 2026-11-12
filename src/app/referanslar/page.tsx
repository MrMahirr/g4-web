import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Drift } from "@/components/motion/Drift";
import { Reveal } from "@/components/motion/Reveal";
import { ReferenceCard } from "@/components/sections/references/ReferenceCard";
import { ReferencesCta } from "@/components/sections/references/ReferencesCta";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { getCatalog } from "@/core/container";
import { routes } from "@/data/navigation.data";
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
  const references = catalog.getReferences();
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
        image={catalog.getImage("hero/referanslar")}
      />

      <Container as="section" className="pt-lead">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {references.map((reference, index) => {
            const logo = catalog.getImage(reference.logoKey);
            const photo = catalog.getImage(reference.imageKey);
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
        <Drift>
          <div className="font-display text-[clamp(90px,13vw,200px)] leading-none font-extrabold tracking-[-0.06em] whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_var(--color-line)] select-none">
            {copy("references.drift")}
          </div>
        </Drift>
      </section>
    </>
  );
}
