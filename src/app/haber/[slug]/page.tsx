import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { ReadingProgress } from "@/components/motion/ReadingProgress";
import { Enter, Reveal } from "@/components/motion/Reveal";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ListRow } from "@/components/shared/ListRow";
import { Picture } from "@/components/shared/Picture";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { container } from "@/core/container";
import type { ImageEntry } from "@/core/types";
import { routes } from "@/data/navigation.data";
import { pageCopy } from "@/data/pages.data";
import { tr } from "@/dictionaries/tr";
import { articleBlocks, formatShortDate, splitInTwo } from "@/lib/text";

const copy = pageCopy.news;

export function generateStaticParams() {
  return container
    .resolve("CatalogService")
    .getNews()
    .map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/haber/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const catalog = container.resolve("CatalogService");
  const item = catalog.getNewsBySlug(slug);
  return item ? { title: item.title, description: catalog.getNewsExcerpt(item) } : {};
}

/** Haber detay (tasarım: D4HaberDetay) — okuma çubuğu, taşan kapak, yapışkan yan bilgi, gövde, sonraki haber. */
export default async function NewsArticlePage({ params }: PageProps<"/haber/[slug]">) {
  const { slug } = await params;
  const catalog = container.resolve("CatalogService");
  const item = catalog.getNewsBySlug(slug);
  if (!item) notFound();

  const all = catalog.getNews();
  const next = all[(all.findIndex((entry) => entry.slug === slug) + 1) % all.length];
  const cover = catalog.getImage(item.imageKey);
  const gallery = item.galleryKeys.map((key) => catalog.getImage(key));
  const blocks = articleBlocks(item.paragraphs, gallery.length);
  const socials = catalog.getCompany().socials.filter((social) => social.href && ["linkedin", "x", "whatsapp"].includes(social.channel));
  const [firstLine, secondLine] = splitInTwo(item.title);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    datePublished: item.publishedAt,
    image: cover ? [cover.src] : undefined,
    publisher: { "@type": "Organization", name: catalog.getCompany().legalName },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ReadingProgress />

      <section className="relative isolate overflow-hidden bg-linear-170 from-white to-tint pt-[190px] pb-[220px] grain">
        <Container className="flex max-w-[1164px] flex-col gap-[30px]">
          <Enter>
            <Breadcrumb
              items={[
                { label: tr.common.home, href: routes.home },
                { label: "Haberler", href: routes.news },
              ]}
            />
          </Enter>
          <Enter delay={0.1}>
            <Tag>{copy.tag}</Tag>
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
            placeholderLabel="Haber görseli"
            curtain
            eager
            sizes="100vw"
            className="h-[620px] max-row:h-[360px]"
          />
        </Reveal>
      </Container>

      <Container as="section" className="pt-[100px] pb-[130px]">
        <div className="mx-auto grid max-w-[1100px] grid-cols-[200px_minmax(0,1fr)] items-start gap-[clamp(28px,5vw,80px)] max-[860px]:grid-cols-1">
          <aside className="sticky top-[120px] flex flex-col gap-[18px] font-mono text-xs tracking-[0.06em] uppercase max-[860px]:static max-[860px]:flex-row max-[860px]:flex-wrap max-[860px]:items-center">
            <span className="text-muted">{copy.kicker}</span>
            <span className="text-ember-d">{copy.source}</span>
            <time dateTime={item.publishedAt} className="text-muted">
              {formatShortDate(item.publishedAt)}
            </time>
            <hr className="m-0 h-px w-full border-0 bg-line max-[860px]:hidden" />
            <span className="text-muted">{copy.share}</span>
            <div className="flex flex-col gap-0.5 font-sans tracking-normal normal-case max-[860px]:flex-row max-[860px]:gap-4">
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
                        alt={image?.alt ?? `${item.title} — fotoğraf ${block.index + 1}`}
                        placeholderLabel="Foto galeri"
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
                  index={copy.next.toLocaleUpperCase("tr-TR")}
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
