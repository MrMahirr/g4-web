import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { underlineLinkClass } from "@/components/ui/UnderlineLink";
import { getCatalog } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";
import { ContactForm } from "./ContactForm";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return pageMetadata({ title: t("nav.contact"), description: t("i18n.meta.contact.description"), path: routes.contact });
}

const infoTextClass = "font-display text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.35] font-semibold tracking-[-0.02em] break-words";

function InfoCell({ index, tag, children }: { index: number; tag: string; children: ReactNode }) {
  return (
    <Reveal index={index} className="flex flex-col gap-[clamp(0.5rem,1vw,0.75rem)] border-b border-line py-[clamp(1rem,2vw,1.5rem)] last:border-b-0">
      <Tag className="text-sm font-bold">{tag}</Tag>
      {children}
    </Reveal>
  );
}

/** İletişim sayfası (tasarım: D4Iletisim). */
export default async function ContactPage() {
  const t = await getTranslations();
  const locale = await getLocale();
  const catalog = getCatalog(locale);
  const company = catalog.site.getCompany();
  const products = catalog.products.getProducts().map((product) => ({
    slug: product.slug,
    name: product.name,
    code: product.code,
  }));

  return (
    <>
      <PageHero
        crumbs={[{ label: t("common.home"), href: routes.home }, { label: t("nav.contact") }]}
        title={[t("nav.contact")]}
        description={t("i18n.meta.contact.description")}
        image={catalog.images.getImage("hero/iletisim")}
      />

      <Container as="section" className="grid grid-cols-1 items-stretch gap-[clamp(1.25rem,2.5vw,2rem)] md:grid-cols-2 pt-lead pb-section">
        {/* Form istemcide çizilir (useSearchParams); yer tutucu da "form" çapasını taşır ki
            /iletisim#form ile doğrudan gelindiğinde tarayıcı kaydırabilsin (plan 8.7). */}
        <Suspense fallback={<div id="form" className="min-h-[40rem] scroll-mt-28 rounded-card bg-white" />}>
          <ContactForm email={company.email} products={products} />
        </Suspense>

        <div className="relative">
          <div className="flex flex-col gap-[clamp(1.25rem,2.5vw,2rem)] md:absolute md:inset-0">
            <Reveal index={1} className="relative flex aspect-[4/3] flex-1 overflow-hidden rounded-card bg-tint-2 md:aspect-auto md:min-h-0">
              <iframe
                src={company.address.mapsEmbedUrl}
                title={t("i18n.contact.mapTitle", {
                  address: `${company.address.street} ${company.address.district}/${company.address.city}`,
                })}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
              />
              <a
                href={company.address.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute right-4 bottom-4 rounded-tag bg-white px-3 py-2.5 font-mono text-xs text-ink no-underline shadow-md"
              >
                {t("common.viewOnMap").toLocaleUpperCase(locale)} ↗
              </a>
            </Reveal>

            <div className="border-t border-line">
              <InfoCell index={2} tag={t("i18n.contact.address")}>
                <p className={infoTextClass}>{company.address.full}</p>
                <a href={company.address.mapsUrl} target="_blank" rel="noreferrer" className={cn(underlineLinkClass, "self-start text-ember-d")}>
                  {t("common.viewOnMap")}
                </a>
              </InfoCell>
              <InfoCell index={3} tag={t("i18n.contact.phone")}>
                <p className={infoTextClass}>{company.phone.display}</p>
                <a href={`tel:${company.phone.tel}`} className={cn(underlineLinkClass, "self-start text-ember-d")}>
                  {t("common.callNow")}
                </a>
              </InfoCell>
              <InfoCell index={4} tag={t("i18n.contact.email")}>
                <p className={infoTextClass}>{company.email}</p>
                <a href={`mailto:${company.email}`} className={cn(underlineLinkClass, "self-start text-ember-d")}>
                  {t("common.sendEmail")}
                </a>
              </InfoCell>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
