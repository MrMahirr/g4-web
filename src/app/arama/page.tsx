import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { container } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { pageCopy } from "@/data/pages.data";
import { tr } from "@/dictionaries/tr";
import { SearchResults } from "./SearchResults";

export const metadata: Metadata = { title: pageCopy.search.title, robots: { index: false, follow: true } };

/** Arama sonuçları (/arama?q=) — tasarımı yok; arama katmanının görünümüyle. */
export default function SearchPage() {
  const catalog = container.resolve("CatalogService");
  const index = catalog.getSearchIndex().map((entry) => ({ ...entry, imageSrc: catalog.getImage(entry.imageKey)?.src }));

  return (
    <>
      <PageHero
        crumbs={[{ label: tr.common.home, href: routes.home }, { label: pageCopy.search.title }]}
        title={[pageCopy.search.title]}
        description={pageCopy.search.lead}
      />
      <Container as="section" className="pt-[70px] pb-[130px]">
        <Suspense fallback={<div className="mx-auto h-24 max-w-[720px]" />}>
          <SearchResults index={index} />
        </Suspense>
      </Container>
    </>
  );
}
