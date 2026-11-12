import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { getCatalog } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { buildSearchIndex } from "@/lib/search-index";
import { SearchResults } from "./SearchResults";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return pageMetadata({ title: t("search.title"), path: routes.search, noindex: true });
}

/** Arama sonuçları (/arama?q=) — tasarımı yok; arama katmanının görünümüyle. */
export default async function SearchPage() {
  const t = await getTranslations();
  const pages = await getTranslations("pages");
  const catalog = getCatalog(await getLocale());
  const index = buildSearchIndex(catalog, {
    productFallback: t("i18n.searchIndex.productFallback"),
    productGroup: t("i18n.searchIndex.productGroup"),
    service: t("i18n.searchIndex.service"),
    productRef: t("i18n.searchIndex.productRef"),
  }).map((entry) => ({ ...entry, imageSrc: catalog.getImage(entry.imageKey)?.src }));

  return (
    <>
      <PageHero
        crumbs={[{ label: t("common.home"), href: routes.home }, { label: pages("search.title") }]}
        title={[pages("search.title")]}
        description={pages("search.lead")}
      />
      <Container as="section" className="pt-lead pb-section">
        <Suspense fallback={<div className="mx-auto h-24 max-w-[720px]" />}>
          <SearchResults index={index} />
        </Suspense>
      </Container>
    </>
  );
}
