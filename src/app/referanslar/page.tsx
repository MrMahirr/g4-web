import type { Metadata } from "next";
import Link from "next/link";
import { Drift } from "@/components/motion/Drift";
import { Reveal } from "@/components/motion/Reveal";
import {
  ReferenceVisual,
  referenceCellClass,
} from "@/components/sections/home/References";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { container } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { pageCopy } from "@/data/pages.data";
import { tr } from "@/dictionaries/tr";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

const copy = pageCopy.references;

export const metadata: Metadata = pageMetadata({
  title: copy.title,
  description: copy.lead,
  path: routes.references,
});

/** Referanslar (tasarım: D4Referanslar) — numaralı büyük ızgara + kayan dev isimler. */
export default function ReferencesPage() {
  const catalog = container.resolve("CatalogService");
  const references = catalog.getReferences();
  const total = String(references.length + 1).padStart(2, "0");

  return (
    <>
      <PageHero
        crumbs={[
          { label: tr.common.home, href: routes.home },
          { label: tr.nav.corporate },
          { label: copy.title },
        ]}
        title={[copy.title]}
        description={copy.lead}
        ghost={String(references.length).padStart(2, "0")}
        image={catalog.getImage("hero/referanslar")}
      />

      <Container as="section" className="py-[100px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] border-t border-l border-line">
          {references.map((reference, index) => {
            const logo = catalog.getImage(reference.logoKey);
            const photo = catalog.getImage(reference.imageKey);
            const hasPhoto = !logo && Boolean(photo);
            return (
              <Reveal
                key={reference.id}
                index={index % 4}
                className={cn(referenceCellClass, "h-[280px]")}
              >
                <span
                  className={cn(
                    "absolute top-3.5 right-4 z-10 font-mono text-xs",
                    hasPhoto ? "text-white" : "text-ember-d",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ReferenceVisual
                  reference={reference}
                  logo={logo}
                  photo={photo}
                />
                {hasPhoto ? null : (
                  <span className="absolute bottom-2.5 left-3.5 translate-y-1.5 font-mono text-[11px] text-muted opacity-0 transition-[opacity,translate] duration-500 ease-soft group-hover/lg:translate-y-0 group-hover/lg:opacity-100">
                    {reference.sectorLabel}
                  </span>
                )}
              </Reveal>
            );
          })}
          <Reveal index={3} className="border-r border-b border-line">
            <Link
              href={routes.contact}
              className={cn(
                referenceCellClass,
                "h-[280px] flex-col items-start justify-between border-0 bg-ember text-ink no-underline",
              )}
            >
              <span className="font-mono text-xs">
                {total} / {total}
              </span>
              <span className="font-display text-[28px] leading-[1.1] font-bold tracking-[-0.03em]">
                {copy.cta}
              </span>
            </Link>
          </Reveal>
        </div>
      </Container>

      <section aria-hidden="true" className="overflow-hidden pb-[100px]">
        <Drift>
          <div className="font-display text-[clamp(90px,13vw,200px)] leading-none font-extrabold tracking-[-0.06em] whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_var(--color-line)] select-none">
            {copy.drift}
          </div>
        </Drift>
      </section>
    </>
  );
}
