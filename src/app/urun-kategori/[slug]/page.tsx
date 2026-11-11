import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CategoryResults, type CategoryProduct } from "@/components/catalog/CategoryResults";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { Enter } from "@/components/motion/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { container } from "@/core/container";
import { homeCopy } from "@/data/home.data";
import { routes } from "@/data/navigation.data";
import { tr } from "@/dictionaries/tr";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import type { Crumb } from "@/components/shared/Breadcrumb";
import { breadcrumbLd } from "@/lib/structured-data";

/** Veride olmayan adres gerçek 404 döner (Cache Components kapalıyken desteklenir). */
export const dynamicParams = false;

export function generateStaticParams() {
  return container
    .resolve("CatalogService")
    .getCategories()
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/urun-kategori/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const catalog = container.resolve("CatalogService");
  const category = catalog.getCategoryBySlug(slug);
  if (!category) return {};
  return pageMetadata({
    title: category.title,
    description: homeCopy.categories.text,
    path: routes.category(category.slug),
    image: catalog.getImage(category.imageKey),
  });
}

/** Başlığı iki satıra böler: son kelime kor renkli satır olur (tasarım: "Bipolar / Forceps"). */
function splitTitle(title: string) {
  const words = title.split(" ");
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
  const { slug } = await params;
  const catalog = container.resolve("CatalogService");
  const category = catalog.getCategoryBySlug(slug);
  if (!category) notFound();

  const categories = catalog.getCategories();
  const position = categories.findIndex((item) => item.slug === slug) + 1;
  const products: CategoryProduct[] = catalog.getProducts({ categorySlug: slug }).map((product) => ({
    slug: product.slug,
    title: product.title,
    name: product.name,
    code: product.code,
    categorySlugs: product.categorySlugs,
    subGroup: product.subGroup,
    imageSrc: catalog.getImage(product.imageKey)?.src ?? null,
  }));

  const crumbs: Crumb[] = [
    { label: tr.common.home, href: routes.home },
    { label: tr.nav.products, href: routes.products },
    { label: category.title },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs, routes.category(category.slug))} />
      <PageHero
        crumbs={crumbs}
        title={splitTitle(category.title)}
        description={homeCopy.categories.text}
        ghost={String(position).padStart(2, "0")}
        image={catalog.getImage(`hero/kategori-${slug}`)}
      />

      <Container as="section" className="flex flex-col gap-9 pt-10 pb-[130px]">
        <Enter>
          <nav
            aria-label="Ürün grupları"
            className="flex gap-1.5 overflow-x-auto border-b border-line [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((item) => {
              const current = item.slug === slug;
              return (
                <Link
                  key={item.slug}
                  href={routes.category(item.slug)}
                  aria-current={current ? "page" : undefined}
                  className={cn(
                    "relative flex min-h-14 flex-none items-center px-[18px] font-medium whitespace-nowrap text-muted no-underline",
                    "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:scale-x-0 after:bg-ember after:content-['']",
                    "after:transition-transform after:duration-500 after:ease-soft hover:after:scale-x-100",
                    "aria-[current=page]:font-bold aria-[current=page]:text-ink aria-[current=page]:after:scale-x-100",
                  )}
                >
                  {item.title}
                </Link>
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
            <CategoryResults products={products} subGroups={catalog.getSubGroups(slug)} />
          </Suspense>
        ) : (
          <div className="flex flex-col items-start gap-5 rounded-card bg-white p-[clamp(28px,4vw,56px)]">
            <h2 className="max-w-[720px] font-display text-[clamp(28px,3vw,44px)] leading-[1.1] font-bold tracking-[-0.03em]">
              {tr.product.emptyCategoryTitle}
            </h2>
            <p className="max-w-[620px] text-lead text-muted">{tr.product.emptyCategoryText}</p>
            <Button href={routes.contactForm}>{tr.common.requestInfo}</Button>
          </div>
        )}
      </Container>
    </>
  );
}
