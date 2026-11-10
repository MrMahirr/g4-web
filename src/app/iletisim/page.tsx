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

export const metadata: Metadata = {
  title: "İletişim",
  description: "Profesyonel ekibimiz size en kısa sürede dönüş yapacaktır.",
};

function InfoCell({ index, tag, children }: { index: number; tag: string; children: ReactNode }) {
  return (
    <Reveal
      index={index}
      className={cn(
        "flex flex-col gap-4 border-r border-line py-10 pr-8 last:border-r-0 not-first:pl-8",
        "max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:not-first:pl-0",
      )}
    >
      <Tag>{tag}</Tag>
      {children}
    </Reveal>
  );
}

/** İletişim sayfası (tasarım: D4Iletisim). */
export default function ContactPage() {
  const catalog = container.resolve("CatalogService");
  const company = catalog.getCompany();
  const products = catalog.getProducts().map((product) => ({ slug: product.slug, name: product.name, code: product.code }));

  return (
    <>
      <PageHero
        crumbs={[{ label: tr.common.home, href: routes.home }, { label: tr.nav.contact }]}
        title={[tr.nav.contact]}
        description="Profesyonel ekibimiz size en kısa sürede dönüş yapacaktır."
        ghost="Merhaba"
      />

      <Container as="section" className="pt-[90px]">
        <div className="grid grid-cols-3 border-t border-line max-[900px]:grid-cols-1">
          <InfoCell index={0} tag="Adres">
            <p className="font-display text-[22px] leading-[1.35] font-medium tracking-[-0.02em]">{company.address.full}</p>
            <a href={company.address.mapsUrl} target="_blank" rel="noreferrer" className={cn(underlineLinkClass, "self-start text-ember-d")}>
              {tr.common.viewOnMap}
            </a>
          </InfoCell>
          <InfoCell index={1} tag="Telefon">
            <p className="font-display text-[clamp(28px,2.8vw,40px)] font-bold tracking-[-0.04em]">{company.phone.display}</p>
            <a href={`tel:${company.phone.tel}`} className={cn(underlineLinkClass, "self-start text-ember-d")}>
              {tr.common.callNow}
            </a>
          </InfoCell>
          <InfoCell index={2} tag="E-posta">
            <p className="font-display text-[clamp(22px,2.2vw,30px)] font-bold tracking-[-0.03em] break-words">{company.email}</p>
            <a href={`mailto:${company.email}`} className={cn(underlineLinkClass, "self-start text-ember-d")}>
              {tr.common.sendEmail}
            </a>
          </InfoCell>
        </div>
      </Container>

      <Container
        as="section"
        className="grid grid-cols-[repeat(auto-fit,minmax(min(480px,100%),1fr))] items-stretch gap-8 pt-[90px] pb-[130px]"
      >
        <Suspense fallback={<div className="min-h-[640px] rounded-card bg-white" />}>
          <ContactForm email={company.email} products={products} />
        </Suspense>

        <Reveal index={1}>
          <a
            href={company.address.mapsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${tr.common.viewOnMap}: ${company.address.street} ${company.address.district}/${company.address.city}`}
            className="relative isolate block h-full min-h-[560px] overflow-hidden rounded-card bg-tint-2 no-underline"
          >
            <span aria-hidden="true" className="absolute inset-0 bg-map-grid" />
            <span aria-hidden="true" className="absolute -inset-x-[5%] top-[52%] h-3.5 -rotate-9 bg-ink/16" />
            <span aria-hidden="true" className="absolute -inset-y-[5%] left-[42%] w-2.5 rotate-14 bg-ink/16" />
            <span aria-hidden="true" className="absolute -inset-y-[5%] left-[76%] w-1.5 -rotate-5 bg-ink/16" />
            <span aria-hidden="true" className="absolute -inset-x-[5%] top-[20%] h-1.5 rotate-5 bg-ink/16" />
            <span aria-hidden="true" className="absolute top-[44%] left-1/2 -mt-2.5 -ml-2.5 size-5 animate-map-ripple rounded-full border border-ember motion-reduce:hidden" />
            <span
              aria-hidden="true"
              className="absolute top-[44%] left-1/2 -mt-2.5 -ml-2.5 size-5 animate-map-ripple rounded-full border border-ember [animation-delay:1.3s] motion-reduce:hidden"
            />
            <span aria-hidden="true" className="absolute top-[44%] left-1/2 -mt-2.5 -ml-2.5 size-5 rounded-full bg-ember shadow-[0_0_0_8px_rgb(228_72_47/0.25)]" />
            <span className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-ink">
              <span className="flex flex-col gap-1">
                <span className="font-mono text-[11px] text-ember-d">G4 · {company.address.city.toLocaleUpperCase("tr-TR")}</span>
                <strong className="font-display text-[22px] tracking-[-0.02em]">{company.address.street}</strong>
                <span className="text-sm text-muted">
                  {company.address.district}/{company.address.city}
                </span>
              </span>
              <span className="rounded-tag border border-ink/30 px-3 py-2.5 font-mono text-xs">
                {tr.common.viewOnMap.toLocaleUpperCase("tr-TR")} ↗
              </span>
            </span>
          </a>
        </Reveal>
      </Container>
    </>
  );
}
