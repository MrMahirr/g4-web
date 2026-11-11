import type { Metadata } from "next";
import { CallBackCard } from "@/components/shared/CallBackCard";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { container } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { pageCopy } from "@/data/pages.data";
import { tr } from "@/dictionaries/tr";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { faqLd } from "@/lib/structured-data";

const copy = pageCopy.faq;

export const metadata: Metadata = pageMetadata({ title: "Sıkça Sorulan Sorular", description: copy.lead, path: routes.faq });

/** Sıkça Sorulan Sorular (tasarım: D4SSS) + FAQPage yapılandırılmış verisi. */
export default function FaqPage() {
  const catalog = container.resolve("CatalogService");
  const faq = catalog.getFaq();

  return (
    <>
      <JsonLd data={faqLd(faq)} />
      <PageHero
        crumbs={[{ label: tr.common.home, href: routes.home }, { label: tr.nav.corporate }, { label: "SSS" }]}
        title={[
          copy.titleLines[0],
          <span key="em" className="text-ember">
            {copy.titleLines[1]}
          </span>,
        ]}
        description={copy.lead}
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
