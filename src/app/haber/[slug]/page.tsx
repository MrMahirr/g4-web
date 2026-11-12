import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { ReadingProgress } from "@/components/motion/ReadingProgress";
import { Enter, Reveal } from "@/components/motion/Reveal";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ListRow } from "@/components/shared/ListRow";
import { Picture } from "@/components/shared/Picture";
import { Container } from "@/components/ui/Container";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { getCatalog } from "@/core/container";
import type { ImageEntry } from "@/core/types";
import { routes } from "@/data/navigation.data";
import { articleBlocks, formatShortDate, splitInTwo } from "@/lib/text";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbLd, newsArticleLd } from "@/lib/structured-data";

/** Veride olmayan adres gerçek 404 döner (Cache Components kapalıyken desteklenir). */
export const dynamicParams = false;

export function generateStaticParams() {
  return getCatalog("tr")
    .getNews()
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/haber/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const catalog = getCatalog(locale);
  const item = catalog.getNewsBySlug(slug);
  if (!item) return {};
  return pageMetadata({
    title: item.title,
    description: catalog.getNewsExcerpt(item),
    path: routes.newsItem(item.slug),
    image: catalog.getImage(item.imageKey),
    type: "article",
  });
}

/** Haber detay (tasarım: D4HaberDetay) — okuma çubuğu, taşan kapak, yapışkan yan bilgi, gövde, sonraki haber. */
export default async function NewsArticlePage({ params }: PageProps<"/haber/[slug]">) {
  const t = await getTranslations();
  const copy = await getTranslations("pages");
  const { slug } = await params;
  const locale = await getLocale();
  const catalog = getCatalog(locale);
  const item = catalog.getNewsBySlug(slug);
  if (!item) notFound();

  const all = catalog.getNews();
  const next = all[(all.findIndex((entry) => entry.slug === slug) + 1) % all.length];
  const cover = catalog.getImage(item.imageKey);
  const gallery = item.galleryKeys.map((key) => catalog.getImage(key));
  const blocks = articleBlocks(item.paragraphs, gallery.length);
  const socials = catalog.getCompany().socials.filter((social) => social.href && ["linkedin", "x", "whatsapp"].includes(social.channel));
  const [firstLine, secondLine] = splitInTwo(item.title);

  const path = routes.newsItem(item.slug);

  return (
    <>
      <JsonLd data={newsArticleLd(item, path, catalog.getNewsExcerpt(item), cover)} />
      <JsonLd
        data={breadcrumbLd(
          [{ label: t("common.home"), href: routes.home }, { label: copy("news.titleLines.1"), href: routes.news }, { label: item.title }],
          path,
        )}
      />
      <ReadingProgress />

      <section className="relative isolate overflow-hidden bg-linear-170 from-white to-tint pt-hero-top pb-[220px] grain">
        <Container className="flex max-w-[1164px] flex-col gap-[30px]">
          <Enter>
            <Breadcrumb
              items={[
                { label: t("common.home"), href: routes.home },
                { label: copy("news.titleLines.1"), href: routes.news },
              ]}
            />
          </Enter>
          <MaskedHeading
            size="d2"
            delay={0.15}
            className="text-[clamp(40px,5.4vw,84px)]"
            lines={
              secondLine
                ? [
                    firstLine,
                    <span key="em" className="text-ember">
                      {secondLine}
                    </span>,
                  ]
                : [firstLine]
            }
          />
        </Container>
      </section>

      <Container className="relative z-[2] -mt-[170px]">
        <Reveal kind="scale" radius={6} className="overflow-hidden rounded-card">
          <Picture
            src={cover?.src}
            alt={cover?.alt ?? item.title}
            placeholderLabel={t("common.imagePlaceholder")}
            curtain
            eager
            sizes="100vw"
            className="h-[620px] max-row:h-[360px]"
          />
        </Reveal>
      </Container>

      <Container as="section" className="pt-lead pb-section">
        <div className="mx-auto grid max-w-[1100px] grid-cols-[200px_minmax(0,1fr)] items-start gap-[clamp(28px,5vw,80px)] max-[53.75rem]:grid-cols-1">
          <aside className="sticky top-[120px] flex flex-col gap-[18px] font-mono text-xs tracking-[0.06em] uppercase max-[53.75rem]:static max-[53.75rem]:flex-row max-[53.75rem]:flex-wrap max-[53.75rem]:items-center">
            <span className="text-muted">{copy("news.kicker")}</span>
            <span className="text-ember-d">{copy("news.source")}</span>
            <time dateTime={item.publishedAt} className="text-muted">
              {formatShortDate(item.publishedAt, locale)}
            </time>
            <hr className="m-0 h-px w-full border-0 bg-line max-[53.75rem]:hidden" />
            <span className="text-muted">{copy("news.share")}</span>
            <div className="flex flex-col gap-0.5 font-sans tracking-normal normal-case max-[53.75rem]:flex-row max-[53.75rem]:gap-4">
              {socials.map((social) => (
                <UnderlineLink key={social.channel} href={social.href ?? "#"} target="_blank" rel="noreferrer" className="min-h-9 self-start text-sm">
                  {social.label}
                </UnderlineLink>
              ))}
            </div>
          </aside>

          <article className="flex flex-col gap-7">
            {blocks.map((block, index) => {
              switch (block.kind) {
                case "lead":
                  return (
                    <Reveal key={index}>
                      <p className="font-display text-[clamp(22px,2.2vw,28px)] leading-normal font-medium tracking-[-0.02em] text-pretty">
                        {block.text}
                      </p>
                    </Reveal>
                  );
                case "paragraph":
                  return (
                    <Reveal key={index}>
                      <p className="text-xl leading-[1.85] text-pretty text-[#2E4456]">{block.text}</p>
                    </Reveal>
                  );
                case "quote":
                  return (
                    <Reveal key={index} kind="skew">
                      <blockquote className="my-3 border-l-[3px] border-ember pl-7 font-display text-[clamp(24px,2.4vw,34px)] leading-[1.35] font-semibold tracking-[-0.025em]">
                        {block.text}
                      </blockquote>
                    </Reveal>
                  );
                case "figure": {
                  const image: ImageEntry | null = gallery[block.index] ?? null;
                  return (
                    <figure key={index} className="my-4">
                      <Picture
                        src={image?.src}
                        alt={image?.alt ?? t("i18n.news.photo", { title: item.title, number: block.index + 1 })}
                        placeholderLabel={t("i18n.news.gallery")}
                        curtain
                        sizes="(max-width: 860px) 100vw, 860px"
                        className="h-[440px] rounded-card max-row:h-[280px]"
                      />
                    </figure>
                  );
                }
                default: {
                  const exhaustive: never = block;
                  return exhaustive;
                }
              }
            })}

            {next && next.slug !== item.slug ? (
              <div className="mt-5 border-t border-line">
                <ListRow
                  href={routes.newsItem(next.slug)}
            index={copy("news.next").toLocaleUpperCase(locale)}
                  title={next.title}
                  titleClassName="text-2xl"
                  className="grid-cols-[120px_minmax(0,1fr)_auto]"
                />
              </div>
            ) : null}
          </article>
        </div>
      </Container>
    </>
  );
}
