import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ListRow } from "@/components/shared/ListRow";
import { PageHero } from "@/components/shared/PageHero";
import { Picture } from "@/components/shared/Picture";
import { Container } from "@/components/ui/Container";
import { underlineLinkClass } from "@/components/ui/UnderlineLink";
import { container } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { pageCopy } from "@/data/pages.data";
import { tr } from "@/dictionaries/tr";
import { cn } from "@/lib/utils";
import { formatShortDate, splitSentences } from "@/lib/text";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Haberler",
  description: "G4 kurumsal haberleri ve duyuruları.",
  path: routes.news,
});

/** Haberler (tasarım: D4Haberler) — en yeni haber büyük, diğerleri tarih sütunlu satır. */
export default function NewsPage() {
  const catalog = container.resolve("CatalogService");
  const [lead, ...rest] = catalog.getNews();
  const leadImage = lead ? catalog.getImage(lead.imageKey) : null;

  return (
    <>
      <PageHero
        crumbs={[{ label: tr.common.home, href: routes.home }, { label: tr.nav.corporate }, { label: "Haberler" }]}
        title={[
          pageCopy.news.titleLines[0],
          <span key="em" className="text-ember">
            {pageCopy.news.titleLines[1]}
          </span>,
        ]}
        ghost="Haber"
        image={catalog.getImage("hero/haberler")}
      />

      {lead ? (
        <Container as="section" className="pt-lead pb-section">
          <Link
            href={routes.newsItem(lead.slug)}
            className="group grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-end gap-[clamp(28px,4vw,64px)] text-ink no-underline max-stack:grid-cols-1"
          >
            <Picture
              src={leadImage?.src}
              alt={leadImage?.alt ?? lead.title}
              placeholderLabel="Haber görseli"
              curtain
              eager
              zoomOnHover
              sizes="(max-width: 960px) 100vw, 58vw"
              className="h-[520px] rounded-card max-row:h-[340px]"
            />
            <div className="flex flex-col gap-[22px] pb-2.5">
              <Reveal>
                <span className="font-mono text-[13px] text-ember-d">{formatShortDate(lead.publishedAt)} · 01</span>
              </Reveal>
              <Reveal kind="skew">
                <h2 className="font-display text-d2 text-[clamp(32px,3.6vw,54px)] transition-colors duration-400 group-hover:text-ember-d">
                  {lead.title}
                </h2>
              </Reveal>
              <Reveal>
                <p className="leading-[1.75] text-pretty text-muted">{splitSentences(lead.paragraphs[0] ?? "")[0]}</p>
              </Reveal>
              <Reveal>
                <span className={cn(underlineLinkClass, "self-start")}>{tr.common.readMore}</span>
              </Reveal>
            </div>
          </Link>
        </Container>
      ) : null}

      {rest.length > 0 ? (
        <Container as="section" className="pb-section">
          <div className="border-t border-line">
            {rest.map((item) => (
              <ListRow
                key={item.slug}
                href={routes.newsItem(item.slug)}
                index={formatShortDate(item.publishedAt)}
                title={item.title}
                description={catalog.getNewsExcerpt(item, 90)}
                previewSrc={catalog.getImage(item.imageKey)?.src ?? null}
                titleClassName="text-[clamp(22px,2.4vw,34px)] leading-[1.15] tracking-[-0.03em]"
                className="grid-cols-[160px_minmax(0,1fr)_auto] max-row:grid-cols-1"
              />
            ))}
          </div>
        </Container>
      ) : null}
    </>
  );
}
