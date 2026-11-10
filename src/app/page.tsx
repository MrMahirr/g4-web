import { Categories } from "@/components/sections/home/Categories";
import { FeaturedProducts } from "@/components/sections/home/FeaturedProducts";
import { Hero } from "@/components/sections/home/Hero";
import { Introduction } from "@/components/sections/home/Introduction";
import { References } from "@/components/sections/home/References";
import { Services } from "@/components/sections/home/Services";
import { container } from "@/core/container";
import { toFeaturedRow } from "@/lib/featured";

export default function HomePage() {
  const catalog = container.resolve("CatalogService");
  const services = catalog.getServices();
  const serviceSlug = (domain: "medical" | "textile") => services.find((service) => service.domain === domain)?.slug ?? "";

  return (
    <>
      <Hero image={catalog.getImage("hero/ana")} />
      <Introduction
        image={catalog.getImage("ana/medikal-perde")}
        stats={catalog.getCompany().stats}
        medicalServiceSlug={serviceSlug("medical")}
        textileServiceSlug={serviceSlug("textile")}
      />
      <Services
        services={catalog.getHomeServices().map((service) => ({ service, image: catalog.getImage(service.imageKey) }))}
      />
      <Categories
        categories={catalog.getCategories().map((category) => ({ category, image: catalog.getImage(category.imageKey) }))}
      />
      <FeaturedProducts rows={catalog.getHomeFeaturedProducts().map((product) => toFeaturedRow(catalog, product))} />
      <References
        references={catalog
          .getHomeReferences()
          .map((reference) => ({ reference, logo: catalog.getImage(reference.logoKey) }))}
      />
    </>
  );
}
