import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Categories } from "@/components/sections/home/Categories";
import { FeaturedProducts } from "@/components/sections/home/FeaturedProducts";
import { Hero } from "@/components/sections/home/Hero";
import { Introduction } from "@/components/sections/home/Introduction";
import { References } from "@/components/sections/home/References";
import { getCatalog } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { toFeaturedRow } from "@/lib/featured";
import { pageMetadata, siteTitle } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("i18n");
  return {
    ...pageMetadata({
      title: siteTitle,
      description: t("siteDescription"),
      path: "/",
    }),
    // Anasayfada başlık şablonu ("%s · G4") uygulanmaz.
    title: { absolute: siteTitle },
  };
}

/** Vitrin sırası: medikal ile açılır, diğer hizmetler arkasından gelir. */
const showcaseOrder = ["medical", "textile", "construction", "fleet"];

export default async function HomePage() {
  const catalog = getCatalog(await getLocale());
  const showcase = catalog
    .services.getServices()
    .toSorted((a, b) => showcaseOrder.indexOf(a.domain) - showcaseOrder.indexOf(b.domain))
    .map((service) => {
  const image = catalog.images.getImage(service.imageKey);
    return {
      slug: service.slug,
      href: routes.service(service.slug),
      title: service.title,
      description: service.shortDescription,
      image: image ? { src: image.src, alt: image.alt } : null,
    };
  });

  return (
    <>
      <Hero image={catalog.images.getImage("hero/ana")} />
      <Introduction services={showcase} stats={catalog.site.getCompany().stats} />
      <Categories
        categories={catalog
          .products.getCategories()
          .map((category) => ({
            category,
        image: catalog.images.getImage(category.imageKey),
          }))}
      />
      <FeaturedProducts
        rows={catalog
          .products.getHomeFeaturedProducts()
          .map((product) => toFeaturedRow(catalog, product))}
      />
      <References
        references={catalog
          .references.getHomeReferences()
          .map((reference) => ({
            reference,
        logo: catalog.images.getImage(reference.logoKey),
        photo: catalog.images.getImage(reference.imageKey),
          }))}
      />
    </>
  );
}
