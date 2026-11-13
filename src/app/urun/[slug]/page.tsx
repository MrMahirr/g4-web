import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeaturedProductList } from "@/components/catalog/FeaturedProductList";
import { ProductDetail } from "@/components/catalog/ProductDetail";
import { Enter } from "@/components/motion/Reveal";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { getCatalog } from "@/core/container";
import type { ImageEntry } from "@/core/types";
import { routes } from "@/data/navigation.data";
import { toFeaturedRow } from "@/lib/featured";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbLd, productLd } from "@/lib/structured-data";
import type { Crumb } from "@/types/navigation";

/** Veride olmayan adres gerçek 404 döner (Cache Components kapalıyken desteklenir). */
export const dynamicParams = false;

export function generateStaticParams() {
  return getCatalog("tr")
    .products.getProducts()
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/urun/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const catalog = getCatalog(await getLocale());
  const product = catalog.products.getProductBySlug(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.title,
    description: product.description,
    path: routes.product(product.slug),
    image: catalog.images.getImage(product.imageKey),
  });
}

/** Ürün detay sayfası (tasarım: D4UrunDetay). */
export default async function ProductPage({ params }: PageProps<"/urun/[slug]">) {
  const t = await getTranslations();
  const { slug } = await params;
  const catalog = getCatalog(await getLocale());
  const product = catalog.products.getProductBySlug(slug);
  if (!product) notFound();

  const category = catalog.products.getPrimaryCategory(product);
  const images = [product.imageKey, ...(product.galleryKeys ?? [])]
    .map((key) => catalog.images.getImage(key))
    .filter((image): image is ImageEntry => image !== null);
  const related = catalog.products.getRelatedProducts(slug).map((item) => toFeaturedRow(catalog, item));
  const path = routes.product(product.slug);
  const crumbs: Crumb[] = [
    { label: t("common.home"), href: routes.home },
    { label: t("nav.products"), href: routes.products },
    ...(category ? [{ label: category.title, href: routes.category(category.slug) }] : []),
    { label: product.code ?? product.name },
  ];

  return (
    <>
      <JsonLd data={productLd(product, path, images, category?.title)} />
      <JsonLd data={breadcrumbLd([...crumbs.slice(0, -1), { label: product.name }], path)} />
      <section className="bg-tint pt-[max(6.75rem,min(clamp(7.5rem,10.4167vw,9.375rem),22svh))] pb-10">
        <Container>
          <Enter>
            <Breadcrumb items={crumbs} />
          </Enter>
        </Container>
      </section>

      <Container as="section" className="pt-lead pb-section">
        <ProductDetail
          product={{
            slug: product.slug,
            title: product.title,
            name: product.name,
            code: product.code,
            description: product.description,
          }}
          category={category ? { slug: category.slug, title: category.title } : null}
          images={images}
          whatsappUrl={catalog.site.getCompany().whatsappUrl}
        />
      </Container>

      {related.length > 0 && category ? (
        <section className="relative overflow-hidden bg-tint py-section grain">
          <Container>
            <FeaturedProductList
              rows={related}
              preview={false}
              titleClassName="text-[1.1875rem]"
              heading={
                <>
                  <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-none font-bold tracking-[-0.04em]">
                    {category.title}
                  </h2>
                  <UnderlineLink href={routes.category(category.slug)} className="text-ink">
                    {t("common.showAll")}
                  </UnderlineLink>
                </>
              }
            />
          </Container>
        </section>
      ) : null}
    </>
  );
}
