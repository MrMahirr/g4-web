import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import Image from "next/image";
import Link from "next/link";
import { FeaturedProductList } from "@/components/catalog/FeaturedProductList";
import { SearchTrigger } from "@/components/catalog/SearchTrigger";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { getCatalog } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { toFeaturedRow } from "@/lib/featured";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return pageMetadata({ title: t("categories.title"), description: t("categories.text"), path: routes.products });
}

/** Ürün grupları (tasarım: D4Urunler). */
export default async function ProductsPage() {
  const t = await getTranslations();
  const home = await getTranslations("home");
  const locale = await getLocale();
  const catalog = getCatalog(locale);
  const categories = catalog.products.getCategories();
  const total = String(categories.length).padStart(2, "0");
  const productVariety = catalog.site.getCompany().stats.find((stat) => stat.id === "products")?.value;

  return (
    <>
      <PageHero
        crumbs={[{ label: t("common.home"), href: routes.home }, { label: t("nav.products") }]}
        title={[
          t("i18n.productsHeading.before"),
          <span key="em" className="text-ember">
            {t("i18n.productsHeading.accent")}
          </span>,
        ]}
        description={home("categories.text")}
        image={catalog.images.getImage("hero/urunler")}
        ghost={productVariety ? String(productVariety) : undefined}
      >
        <SearchTrigger label={t("i18n.catalog.searchProduct")} />
      </PageHero>

      <Container as="section" aria-label={home("categories.title")} className="pt-lead pb-section">
        <div className="grid grid-cols-6 gap-4 max-stack:grid-cols-2 max-[37.5rem]:grid-cols-1">
          {categories.map((category, index) => {
            const image = catalog.images.getImage(category.imageKey);
            const wide = index < 2;
            return (
              <Reveal
                key={category.slug}
                index={index % 3}
                className={cn(wide ? "col-span-3 min-h-[27.5rem]" : "col-span-2 min-h-[22.5rem]", "max-stack:col-span-1 max-stack:min-h-[22.5rem]")}
              >
                <Link
                  href={routes.category(category.slug)}
                  className={cn(
                    "group/cg relative isolate flex h-full flex-col justify-between overflow-hidden rounded-card bg-white p-[1.375rem] text-ink no-underline",
                    "before:absolute before:inset-0 before:-z-20 before:bg-tint before:content-[''] before:[clip-path:inset(100%_0_0_0)]",
                    "before:transition-[clip-path] before:duration-700 before:ease-soft hover:before:[clip-path:inset(0)] focus-visible:before:[clip-path:inset(0)]",
                  )}
                >
                  <span className="flex justify-between gap-4 font-mono text-xs tracking-[0.04em] opacity-70">
                    <span>
                      {String(index + 1).padStart(2, "0")} / {total}
                    </span>
                    <span>
                      {category.productCount} {t("product.countSuffix").toLocaleUpperCase(locale)}
                    </span>
                  </span>
                  <span className="absolute inset-[3.75rem_1.875rem_5.625rem] -z-10">
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
                        "relative flex size-[3.25rem] flex-none items-center justify-center overflow-hidden rounded-full border border-current transition-colors duration-500 ease-soft",
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
            rows={catalog.products.getHomeFeaturedProducts().map((product) => toFeaturedRow(catalog, product))}
            heading={
              <div className="flex flex-col gap-5">
                <h2 className="font-display text-d2">{home("featured.title")}</h2>
              </div>
            }
          />
        </Container>
      </section>
    </>
  );
}
