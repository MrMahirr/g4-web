import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeaturedProductList } from "@/components/catalog/FeaturedProductList";
import { ProductDetail } from "@/components/catalog/ProductDetail";
import { Enter } from "@/components/motion/Reveal";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { container } from "@/core/container";
import type { ImageEntry } from "@/core/types";
import { routes } from "@/data/navigation.data";
import { tr } from "@/dictionaries/tr";
import { toFeaturedRow } from "@/lib/featured";

export function generateStaticParams() {
  return container
    .resolve("CatalogService")
    .getProducts()
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/urun/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const catalog = container.resolve("CatalogService");
  const product = catalog.getProductBySlug(slug);
  if (!product) return {};
  const image = catalog.getImage(product.imageKey);
  return {
    title: product.title,
    description: product.description,
    openGraph: image ? { images: [image.src] } : undefined,
  };
}

/** Ürün detay sayfası (tasarım: D4UrunDetay). */
export default async function ProductPage({ params }: PageProps<"/urun/[slug]">) {
  const { slug } = await params;
  const catalog = container.resolve("CatalogService");
  const product = catalog.getProductBySlug(slug);
  if (!product) notFound();

  const category = catalog.getPrimaryCategory(product);
  const images = [product.imageKey, ...(product.galleryKeys ?? [])]
    .map((key) => catalog.getImage(key))
    .filter((image): image is ImageEntry => image !== null);
  const related = catalog.getRelatedProducts(slug).map((item) => toFeaturedRow(catalog, item));

  return (
    <>
      <section className="bg-tint pt-[150px] pb-10">
        <Container>
          <Enter>
            <Breadcrumb
              items={[
                { label: tr.common.home, href: routes.home },
                { label: tr.nav.products, href: routes.products },
                ...(category ? [{ label: category.title, href: routes.category(category.slug) }] : []),
                { label: product.code ?? product.name },
              ]}
            />
          </Enter>
        </Container>
      </section>

      <Container as="section" className="pt-14 pb-[120px]">
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
          whatsappUrl={catalog.getCompany().whatsappUrl}
        />
      </Container>

      {related.length > 0 && category ? (
        <section className="relative overflow-hidden bg-tint pt-[110px] pb-[120px] grain">
          <Container>
            <FeaturedProductList
              rows={related}
              preview={false}
              titleClassName="text-[19px]"
              heading={
                <>
                  <h2 className="font-display text-[clamp(32px,4vw,56px)] leading-none font-bold tracking-[-0.04em]">
                    {category.title}
                  </h2>
                  <UnderlineLink href={routes.category(category.slug)} className="text-ink">
                    {tr.common.showAll}
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
