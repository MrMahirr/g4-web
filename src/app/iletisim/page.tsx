import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { underlineLinkClass } from "@/components/ui/UnderlineLink";
import { container } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { tr } from "@/dictionaries/tr";
import { cn } from "@/lib/utils";
import { ContactForm } from "./ContactForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "İletişim",
  description: "Profesyonel ekibimiz size en kısa sürede dönüş yapacaktır.",
  path: routes.contact,
});

const infoTextClass = "font-display text-[20px] leading-[1.35] font-semibold tracking-[-0.02em] break-words";

function InfoCell({ index, tag, children }: { index: number; tag: string; children: ReactNode }) {
  return (
    <Reveal index={index} className="flex flex-col gap-3 border-b border-line py-6 last:border-b-0">
      <Tag>{tag}</Tag>
      {children}
    </Reveal>
  );
}

/** İletişim sayfası (tasarım: D4Iletisim). */
export default function ContactPage() {
  const catalog = container.resolve("CatalogService");
  const company = catalog.getCompany();
  const products = catalog.getProducts().map((product) => ({
    slug: product.slug,
    name: product.name,
    code: product.code,
  }));

  return (
    <>
      <PageHero
        crumbs={[{ label: tr.common.home, href: routes.home }, { label: tr.nav.contact }]}
        title={[tr.nav.contact]}
        description="Profesyonel ekibimiz size en kısa sürede dönüş yapacaktır."
        ghost="Merhaba"
        image={catalog.getImage("hero/iletisim")}
      />

      <Container as="section" className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 pt-[90px] pb-[130px]">
        <Suspense fallback={<div className="min-h-[640px] rounded-card bg-white" />}>
          <ContactForm email={company.email} products={products} />
        </Suspense>

        <div className="relative">
          <div className="flex flex-col gap-8 lg:absolute lg:inset-0">
            <Reveal index={1} className="relative flex min-h-[320px] flex-1 overflow-hidden rounded-card bg-tint-2 lg:min-h-0">
              <iframe
                src={company.address.mapsEmbedUrl}
                title={`G4 konum haritası: ${company.address.street} ${company.address.district}/${company.address.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="size-full border-0"
              />
              <a
                href={company.address.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute right-4 bottom-4 rounded-tag bg-white px-3 py-2.5 font-mono text-xs text-ink no-underline shadow-md"
              >
                {tr.common.viewOnMap.toLocaleUpperCase("tr-TR")} ↗
              </a>
            </Reveal>

            <div className="border-t border-line">
              <InfoCell index={2} tag="Adres">
                <p className={infoTextClass}>{company.address.full}</p>
                <a href={company.address.mapsUrl} target="_blank" rel="noreferrer" className={cn(underlineLinkClass, "self-start text-ember-d")}>
                  {tr.common.viewOnMap}
                </a>
              </InfoCell>
              <InfoCell index={3} tag="Telefon">
                <p className={infoTextClass}>{company.phone.display}</p>
                <a href={`tel:${company.phone.tel}`} className={cn(underlineLinkClass, "self-start text-ember-d")}>
                  {tr.common.callNow}
                </a>
              </InfoCell>
              <InfoCell index={4} tag="E-posta">
                <p className={infoTextClass}>{company.email}</p>
                <a href={`mailto:${company.email}`} className={cn(underlineLinkClass, "self-start text-ember-d")}>
                  {tr.common.sendEmail}
                </a>
              </InfoCell>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
