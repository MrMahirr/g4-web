import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/forms/LeadForm";
import { Reveal } from "@/components/motion/Reveal";
import { CallBackCard } from "@/components/shared/CallBackCard";
import { PageHero } from "@/components/shared/PageHero";
import { Picture } from "@/components/shared/Picture";
import { Container } from "@/components/ui/Container";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { container } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { pageCopy } from "@/data/pages.data";
import { tr } from "@/dictionaries/tr";
import { cn } from "@/lib/utils";
import { splitSentences } from "@/lib/text";
import { pageMetadata } from "@/lib/seo";
import type { Crumb } from "@/components/shared/Breadcrumb";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbLd, serviceLd } from "@/lib/structured-data";

/** Dikey fotoğrafların geniş kapakta hangi bölgesinin görüneceği (varsayılan: orta). */
const heroPositions: Record<string, string> = {
  "hizmetler/arac-kiralama": "object-[50%_58%]",
};

/** Veride olmayan adres gerçek 404 döner (Cache Components kapalıyken desteklenir). */
export const dynamicParams = false;

export function generateStaticParams() {
  return container
    .resolve("CatalogService")
    .getServices()
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/hizmet/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const catalog = container.resolve("CatalogService");
  const service = catalog.getServiceBySlug(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.shortDescription,
    path: routes.service(service.slug),
    image: catalog.getImage(service.imageKey),
  });
}

/** Hizmet detay (tasarım: D4HizmetDetay) — kapak, yapışkan hizmet listesi, gövde, teklif formu. */
export default async function ServicePage({ params }: PageProps<"/hizmet/[slug]">) {
  const { slug } = await params;
  const catalog = container.resolve("CatalogService");
  const service = catalog.getServiceBySlug(slug);
  if (!service) notFound();

  const services = catalog.getServices();
  const position = services.findIndex((item) => item.slug === slug) + 1;
  const image = catalog.getImage(service.imageKey);
  const category = service.relatedCategorySlug ? catalog.getCategoryBySlug(service.relatedCategorySlug) : null;

  // Tasarımdaki gibi ilk cümle büyük giriş, kalanlar düz paragraf.
  const [lead, ...restOfFirst] = splitSentences(service.paragraphs[0] ?? "");
  const paragraphs = [restOfFirst.join(" "), ...service.paragraphs.slice(1)].filter(Boolean);

  const path = routes.service(service.slug);
  const crumbs: Crumb[] = [
    { label: tr.common.home, href: routes.home },
    { label: tr.nav.services, href: routes.services },
    { label: service.title },
  ];

  return (
    <>
      <JsonLd data={serviceLd(service, path, image)} />
      <JsonLd data={breadcrumbLd(crumbs, path)} />
      <PageHero
        crumbs={crumbs}
        title={[service.title]}
        titleMotion="rise"
        titleClassName="max-w-[1100px] text-[clamp(42px,6vw,96px)] leading-none tracking-[-0.04em]"
        description={pageCopy.services.lead}
        ghost={String(position).padStart(2, "0")}
        image={catalog.getImage(`hero/hizmet-${service.imageKey.split("/")[1]}`)}
        imagePosition={heroPositions[service.imageKey] ?? "object-center"}
      />

      <Container as="section" className="pt-lead">
        <Reveal kind="scale" radius={6} className="overflow-hidden rounded-card">
          <Picture src={image?.src} alt={image?.alt ?? service.title} curtain eager sizes="100vw" className="h-[560px] max-row:h-[360px]" />
        </Reveal>
      </Container>

      <Container as="section" className="py-section">
        <div className="grid grid-cols-[minmax(0,4fr)_minmax(0,8fr)] items-start gap-[clamp(32px,6vw,96px)] max-stack:grid-cols-1">
          <aside className="sticky top-[120px] flex flex-col gap-6 max-stack:static">
            <nav aria-label="Hizmetlerimiz" className="border-t border-line">
              {services.map((item, index) => {
                const current = item.slug === slug;
                return (
                  <Link
                    key={item.slug}
                    href={routes.service(item.slug)}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "grid grid-cols-[36px_minmax(0,1fr)] items-baseline gap-3 border-b border-line py-[18px] font-medium text-ink no-underline",
                      "transition-[padding,color] duration-500 ease-soft hover:pl-2.5 hover:text-ember-d",
                      current && "font-bold text-ember-d",
                    )}
                  >
                    <span className="font-mono text-xs font-normal text-muted">{String(index + 1).padStart(2, "0")}</span>
                    {item.title}
                  </Link>
                );
              })}
            </nav>
            <CallBackCard variant="sidebar" />
          </aside>

          <div className="flex flex-col gap-[26px]">
            {lead ? (
              <Reveal>
                <p className="font-display text-[clamp(22px,2.2vw,30px)] leading-[1.4] font-medium tracking-[-0.02em] text-pretty">{lead}</p>
              </Reveal>
            ) : null}
            {paragraphs.map((paragraph) => (
              <Reveal key={paragraph}>
                <p className="text-lead text-pretty text-muted">{paragraph}</p>
              </Reveal>
            ))}
            {category ? (
              <Reveal>
                <UnderlineLink href={routes.category(category.slug)} className="self-start text-ember-d">
                  {category.title} ürünlerini gör ({category.productCount})
                </UnderlineLink>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>

      <Container as="section" className="pb-section">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(380px,100%),1fr))] gap-14 rounded-card bg-white p-[clamp(32px,5vw,72px)]">
          <div className="flex flex-col gap-[18px]">
            <Reveal kind="skew">
              <h2 className="font-display text-d2">{pageCopy.services.formTitle}</h2>
            </Reveal>
            <Reveal>
              <p className="leading-[1.75] text-muted">{pageCopy.services.formText}</p>
            </Reveal>
          </div>
          <Reveal>
            <LeadForm kind="quote" idPrefix="teklif" subject={service.title} email={catalog.getCompany().email} />
          </Reveal>
        </div>
      </Container>
    </>
  );
}
