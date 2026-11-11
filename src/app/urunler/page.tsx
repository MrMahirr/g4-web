import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SearchTrigger } from "@/components/catalog/SearchTrigger";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { Picture } from "@/components/shared/Picture";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { container } from "@/core/container";
import { homeCopy } from "@/data/home.data";
import { routes } from "@/data/navigation.data";
import { tr } from "@/dictionaries/tr";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ürün Grupları",
  description: homeCopy.categories.text,
  path: routes.products,
});

const SHOWCASE_SIZE = 4;

/** Ürün grupları — katalog düzeni: içindekiler dizini + her grup için bir katalog sayfası (kapak + ürün vitrini). */
export default function ProductsPage() {
  const catalog = container.resolve("CatalogService");
  const categories = catalog.getCategories();
  const total = String(categories.length).padStart(2, "0");
  const productVariety = catalog.getCompany().stats.find((stat) => stat.label === "Ürün")?.value;
  const countLabel = tr.product.countSuffix.toLocaleUpperCase("tr-TR");

  return (
    <>
      <PageHero
        crumbs={[{ label: tr.common.home, href: routes.home }, { label: tr.nav.products }]}
        tag={homeCopy.categories.tag}
        title={[
          "Ürün",
          <span key="em" className="text-ember">
            Grupları
          </span>,
        ]}
        description={homeCopy.categories.text}
        ghost={productVariety ? String(productVariety) : undefined}
      >
        <SearchTrigger label="Ürün adı veya Ref kodu ile ara" />
      </PageHero>

      <Container as="nav" aria-label="Katalog içindekiler" className="pt-[70px]">
        <div className="mb-2 flex items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
          <h2 className="font-mono text-xs tracking-[0.12em] uppercase">İçindekiler</h2>
          <span className="font-mono text-xs tracking-[0.04em] text-muted">{total} GRUP</span>
        </div>
        <ol className="m-0 grid list-none grid-cols-2 gap-x-14 p-0 max-stack:grid-cols-1">
          {categories.map((category, index) => (
            <li key={category.slug}>
              <a
                href={`#${category.slug}`}
                className="flex min-h-14 items-baseline gap-4 border-b border-line py-3.5 text-ink no-underline transition-colors hover:text-ember-d"
              >
                <span className="w-7 flex-none font-mono text-xs text-ember-d">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-display text-lg font-semibold tracking-[-0.015em]">{category.title}</span>
                <span aria-hidden="true" className="mb-1 min-w-6 flex-1 self-end border-b border-dotted border-faint/60" />
                <span className="font-mono text-xs tracking-[0.04em] text-muted">
                  {category.productCount} {countLabel}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </Container>

      <div className="flex flex-col gap-[90px] pt-[90px] pb-[130px]">
        {categories.map((category, index) => {
          const cover = catalog.getImage(category.imageKey);
          const products = catalog.getProducts({ categorySlug: category.slug });
          const withImage = products.filter((product) => catalog.getImage(product.imageKey));
          const withoutImage = products.filter((product) => !catalog.getImage(product.imageKey));
          const showcase = [...withImage, ...withoutImage].slice(0, SHOWCASE_SIZE);
          const rest = category.productCount - showcase.length;

          return (
            <Container as="section" key={category.slug} id={category.slug} aria-labelledby={`${category.slug}-baslik`} className="scroll-mt-28">
              <Reveal>
                <header className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-t-2 border-ink pt-5 pb-6">
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                    <span className="font-mono text-sm tracking-[0.04em] text-ember-d">
                      {String(index + 1).padStart(2, "0")} / {total}
                    </span>
                    <h2 id={`${category.slug}-baslik`} className="font-display text-d3">
                      {category.title}
                    </h2>
                  </div>
                  <span className="font-mono text-xs tracking-[0.04em] text-muted">
                    {category.productCount} {countLabel}
                  </span>
                </header>

                <div className="grid grid-cols-[minmax(240px,320px)_1fr] gap-px border border-line bg-line max-stack:grid-cols-1">
                  <Link
                    href={routes.category(category.slug)}
                    className="group/cg relative flex min-h-[320px] flex-col justify-between bg-tint p-6 text-ink no-underline"
                  >
                    <span className="font-mono text-xs tracking-[0.12em] uppercase opacity-70">Grup kapağı</span>
                    <span className="absolute inset-[56px_24px_84px]">
                      {cover ? (
                        <Image
                          src={cover.src}
                          alt=""
                          fill
                          sizes="(max-width: 960px) 90vw, 320px"
                          className="object-contain transition-[scale] duration-1000 ease-soft group-hover/cg:scale-[1.06]"
                        />
                      ) : null}
                    </span>
                    <span className="relative flex items-center justify-between gap-3 font-medium">
                      Tüm grubu incele
                      <span
                        aria-hidden="true"
                        className="relative flex size-11 flex-none items-center justify-center overflow-hidden rounded-full border border-current transition-colors duration-500 ease-soft group-hover/cg:border-ember group-hover/cg:bg-ember group-hover/cg:text-white"
                      >
                        <ArrowSwap trigger="cg" />
                      </span>
                    </span>
                  </Link>

                  {showcase.length > 0 ? (
                    <ul className="m-0 grid list-none grid-cols-4 gap-px bg-line p-0 max-nav:grid-cols-2">
                      {showcase.map((product) => (
                        <li key={product.slug} className="flex bg-paper">
                          <Link
                            href={routes.product(product.slug)}
                            className="group flex w-full flex-col text-ink no-underline transition-colors hover:bg-ivory"
                          >
                            <Picture
                              src={catalog.getImage(product.imageKey)?.src ?? null}
                              alt={product.name}
                              fit="contain"
                              zoomOnHover
                              sizes="(max-width: 960px) 45vw, 220px"
                              className="aspect-square w-full border-0"
                            />
                            <span className="flex flex-1 flex-col gap-2 border-t border-line p-4">
                              <span className="font-mono text-[11px] tracking-[0.06em] text-ember-d">
                                {product.code ? `REF: ${product.code}` : "G4 ÜRÜNLERİ"}
                              </span>
                              <strong className="line-clamp-3 font-display text-[15px] leading-[1.35] font-semibold tracking-[-0.01em]">
                                {product.name}
                              </strong>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-start justify-center gap-4 bg-paper p-8">
                      <p className="max-w-[460px] text-muted">{tr.product.emptyCategoryText}</p>
                      <Button href={routes.contactForm}>{tr.common.requestInfo}</Button>
                    </div>
                  )}
                </div>

                {rest > 0 ? (
                  <div className="flex justify-end pt-4">
                    <Link
                      href={routes.category(category.slug)}
                      className="font-mono text-xs tracking-[0.06em] text-ember-d uppercase underline-offset-4 hover:underline"
                    >
                      +{rest} {tr.product.countSuffix} daha — grubun tamamını gör
                    </Link>
                  </div>
                ) : null}
              </Reveal>
            </Container>
          );
        })}
      </div>
    </>
  );
}
