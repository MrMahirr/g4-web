import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CategoryResults, type CategoryProduct } from "@/components/catalog/CategoryResults";
import { CategoryTabLink } from "@/components/catalog/CategoryTabLink";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { Enter } from "@/components/motion/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getCatalog } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { breakAfterSlash } from "@/lib/text";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbLd } from "@/lib/structured-data";
import type { Crumb } from "@/types/navigation";

/** Veride olmayan adres gerçek 404 döner (Cache Components kapalıyken desteklenir). */
export const dynamicParams = false;

export function generateStaticParams() {
  return getCatalog("tr")
    .products.getCategories()
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/urun-kategori/[slug]">): Promise<Metadata> {
  const t = await getTranslations("home");
  const { slug } = await params;
  const catalog = getCatalog(await getLocale());
  const category = catalog.products.getCategoryBySlug(slug);
  if (!category) return {};
  return pageMetadata({
    title: category.title,
    description: t("categories.text"),
    path: routes.category(category.slug),
    image: catalog.images.getImage(category.imageKey),
  });
}

/** Başlığı iki satıra böler: son kelime kor renkli satır olur (tasarım: "Bipolar / Forceps"). */
function splitTitle(title: string) {
  const words = breakAfterSlash(title).split(" ");
  const last = words.pop() ?? title;
  const accent = (
    <span key="em" className="text-ember">
      {last}
    </span>
  );
  return words.length ? [words.join(" "), accent] : [accent];
}

/** Ürün kategori sayfası (tasarım: D4UrunKategori). */
export default async function CategoryPage({ params }: PageProps<"/urun-kategori/[slug]">) {
  const t = await getTranslations();
  const home = await getTranslations("home");
  const { slug } = await params;
  const catalog = getCatalog(await getLocale());
  const category = catalog.products.getCategoryBySlug(slug);
  if (!category) notFound();

  const categories = catalog.products.getCategories();
  const position = categories.findIndex((item) => item.slug === slug) + 1;
  const products: CategoryProduct[] = catalog.products.getProducts({ categorySlug: slug }).map((product) => ({
    slug: product.slug,
    title: product.title,
    name: product.name,
    code: product.code,
    categorySlugs: product.categorySlugs,
    subGroup: product.subGroup,
    imageSrc: catalog.images.getImage(product.imageKey)?.src ?? null,
  }));

  const crumbs: Crumb[] = [
    { label: t("common.home"), href: routes.home },
    { label: t("nav.products"), href: routes.products },
    { label: category.title },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs, routes.category(category.slug))} />
      <PageHero
        crumbs={crumbs}
        title={splitTitle(category.title)}
        description={home("categories.text")}
        ghost={String(position).padStart(2, "0")}
        image={catalog.images.getImage(`hero/kategori-${slug}`)}
      />

      <Container as="section" className="flex flex-col gap-9 pt-lead pb-section">
        <Enter>
          <nav
            aria-label={home("categories.title")}
            className="flex gap-1.5 overflow-x-auto border-b border-line [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((item) => {
              const current = item.slug === slug;
              return (
                <CategoryTabLink
                  key={item.slug}
                  href={routes.category(item.slug)}
                  current={current}
                  className={cn(
                    "relative flex min-h-14 flex-none items-center px-[1.125rem] font-medium whitespace-nowrap text-muted no-underline",
                    "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:scale-x-0 after:bg-ember after:content-['']",
                    "after:transition-transform after:duration-500 after:ease-soft hover:after:scale-x-100",
                    "aria-[current=page]:font-bold aria-[current=page]:text-ink aria-[current=page]:after:scale-x-100",
                  )}
                >
                  {item.title}
                </CategoryTabLink>
              );
            })}
          </nav>
        </Enter>

        {products.length > 0 ? (
          <Suspense
            fallback={
              <ProductGrid
                products={products.map(({ slug: productSlug, name, code, imageSrc }) => ({ slug: productSlug, name, code, imageSrc }))}
              />
            }
          >
            <CategoryResults products={products} subGroups={catalog.products.getSubGroups(slug)} />
          </Suspense>
        ) : (
          <div className="flex flex-col items-start gap-5 rounded-card bg-white p-[clamp(1.75rem,4vw,3.5rem)]">
            <h2 className="max-w-[45rem] font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.03em]">
              {t("product.emptyCategoryTitle")}
            </h2>
            <p className="max-w-[38.75rem] text-lead text-muted">{t("product.emptyCategoryText")}</p>
            <Button href={routes.contactForm}>{t("common.requestInfo")}</Button>
          </div>
        )}
      </Container>
    </>
  );
}
