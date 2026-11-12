import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { CallBackCard } from "@/components/shared/CallBackCard";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { getCatalog } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { faqLd } from "@/lib/structured-data";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  // Başlık iki satıra bölünmüş ("Sık Sorulan" / "Sorular"); sekme başlığı tam ad olmalı.
  return pageMetadata({ title: t("navLinks.corporate.faq"), description: t("pages.faq.lead"), path: routes.faq });
}

/** Sıkça Sorulan Sorular (tasarım: D4SSS) + FAQPage yapılandırılmış verisi. */
export default async function FaqPage() {
  const t = await getTranslations();
  const copy = await getTranslations("pages");
  const catalog = getCatalog(await getLocale());
  const faq = catalog.getFaq();

  return (
    <>
      <JsonLd data={faqLd(faq)} />
      <PageHero
        crumbs={[{ label: t("common.home"), href: routes.home }, { label: t("nav.corporate") }, { label: t("navLinks.corporate.faq") }]}
        title={[
          copy("faq.titleLines.0"),
          <span key="em" className="text-ember">
            {copy("faq.titleLines.1")}
          </span>,
        ]}
        description={copy("faq.lead")}
        ghost="?"
        image={catalog.getImage("hero/sorular")}
      />

      <Container as="section" className="max-w-[1100px] pt-lead pb-section">
        <FaqAccordion items={faq} />
      </Container>

      <Container as="section" className="max-w-[1100px] pb-section">
        <CallBackCard variant="plain" />
      </Container>
    </>
  );
}
