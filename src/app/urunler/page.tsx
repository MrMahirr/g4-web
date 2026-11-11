import type { Metadata } from "next";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import Image from "next/image";
import Link from "next/link";
import { FeaturedProductList } from "@/components/catalog/FeaturedProductList";
import { SearchTrigger } from "@/components/catalog/SearchTrigger";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { container } from "@/core/container";
import { homeCopy } from "@/data/home.data";
import { routes } from "@/data/navigation.data";
import { tr } from "@/dictionaries/tr";
import { toFeaturedRow } from "@/lib/featured";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ürün Grupları",
  description: homeCopy.categories.text,
  path: routes.products,
});

/** Ürün grupları (tasarım: D4Urunler). */
export default function ProductsPage() {
  const catalog = container.resolve("CatalogService");
  const categories = catalog.getCategories();
  const total = String(categories.length).padStart(2, "0");
  const productVariety = catalog.getCompany().stats.find((stat) => stat.label === "Ürün")?.value;

  return (
    <>
      <PageHero
        crumbs={[{ label: tr.common.home, href: routes.home }, { label: tr.nav.products }]}
        title={[
          "Ürün",
          <span key="em" className="text-ember">
            Grupları
          </span>,
        ]}
        description={homeCopy.categories.text}
        image={catalog.getImage("hero/urunler")}
        ghost={productVariety ? String(productVariety) : undefined}
      >
        <SearchTrigger label="Ürün adı veya Ref kodu ile ara" />
      </PageHero>

      <Container as="section" aria-label="Ürün grupları" className="pt-lead pb-section">
        <div className="grid grid-cols-6 gap-4 max-stack:grid-cols-2 max-[600px]:grid-cols-1">
          {categories.map((category, index) => {
            const image = catalog.getImage(category.imageKey);
            const wide = index < 2;
            return (
              <Reveal
                key={category.slug}
                index={index % 3}
                className={cn(wide ? "col-span-3 min-h-[440px]" : "col-span-2 min-h-[360px]", "max-stack:col-span-1 max-stack:min-h-[360px]")}
              >
                <Link
                  href={routes.category(category.slug)}
                  className={cn(
                    "group/cg relative isolate flex h-full flex-col justify-between overflow-hidden rounded-card bg-white p-[22px] text-ink no-underline",
                    "before:absolute before:inset-0 before:-z-20 before:bg-tint before:content-[''] before:[clip-path:inset(100%_0_0_0)]",
                    "before:transition-[clip-path] before:duration-700 before:ease-soft hover:before:[clip-path:inset(0)] focus-visible:before:[clip-path:inset(0)]",
                  )}
                >
                  <span className="flex justify-between gap-4 font-mono text-xs tracking-[0.04em] opacity-70">
                    <span>
                      {String(index + 1).padStart(2, "0")} / {total}
                    </span>
                    <span>
                      {category.productCount} {tr.product.countSuffix.toLocaleUpperCase("tr-TR")}
                    </span>
                  </span>
                  <span className="absolute inset-[60px_30px_90px] -z-10">
                    {image ? (
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="(max-width: 600px) 90vw, (max-width: 960px) 45vw, 30vw"
                        className="rounded-xl object-cover transition-[scale] duration-1000 ease-soft group-hover/cg:scale-[1.05]"
                      />
                    ) : null}
                  </span>
                  <span className="flex items-end justify-between gap-4">
                    <strong className="font-display text-2xl leading-[1.15] font-semibold tracking-[-0.02em]">
                      {category.title}
                    </strong>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative flex size-[52px] flex-none items-center justify-center overflow-hidden rounded-full border border-current transition-colors duration-500 ease-soft",
                        "group-hover/cg:border-ember group-hover/cg:bg-ember group-hover/cg:text-white",
                      )}
                    >
                      <ArrowSwap trigger="cg" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <section className="relative overflow-hidden bg-tint py-section grain">
        <Container>
          <FeaturedProductList
            filterable
            rows={catalog.getHomeFeaturedProducts().map((product) => toFeaturedRow(catalog, product))}
            heading={
              <div className="flex flex-col gap-5">
                <h2 className="font-display text-d2">{homeCopy.featured.title}</h2>
              </div>
            }
          />
        </Container>
      </section>
    </>
  );
}
