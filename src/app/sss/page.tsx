import type { Metadata } from "next";
import { CallBackCard } from "@/components/shared/CallBackCard";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { container } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { pageCopy } from "@/data/pages.data";
import { tr } from "@/dictionaries/tr";

const copy = pageCopy.faq;

export const metadata: Metadata = { title: "Sıkça Sorulan Sorular", description: copy.lead };

/** Sıkça Sorulan Sorular (tasarım: D4SSS) + FAQPage yapılandırılmış verisi. */
export default function FaqPage() {
  const faq = container.resolve("CatalogService").getFaq();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
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
      />

      <Container as="section" className="max-w-[1100px] py-[110px]">
        <FaqAccordion items={faq} />
      </Container>

      <Container as="section" className="max-w-[1100px] pb-[120px]">
        <CallBackCard variant="plain" />
      </Container>
    </>
  );
}
