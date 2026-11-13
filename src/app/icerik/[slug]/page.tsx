import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { getCatalog } from "@/core/container";
import type { LegalDocument } from "@/core/types";
import { routes } from "@/data/navigation.data";
import { pageMetadata } from "@/lib/seo";

const LEGAL_SLUGS: LegalDocument["slug"][] = ["cerez-politikasi", "kvkk-aydinlatma-metni"];

function isLegalSlug(slug: string): slug is LegalDocument["slug"] {
  return (LEGAL_SLUGS as string[]).includes(slug);
}

/** Veride olmayan adres gerçek 404 döner (Cache Components kapalıyken desteklenir). */
export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/icerik/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const document = isLegalSlug(slug) ? getCatalog(await getLocale()).site.getLegalDocument(slug) : null;
  if (!document) return {};
  return pageMetadata({ title: document.title, path: `/icerik/${document.slug}`, noindex: document.approvalPending });
}

/** Yasal metinler: Çerez Politikası, KVKK Aydınlatma Metni (tasarımı yok; Tasarım D bileşenleriyle). */
export default async function LegalPage({ params }: PageProps<"/icerik/[slug]">) {
  const t = await getTranslations();
  const { slug } = await params;
  const document = isLegalSlug(slug) ? getCatalog(await getLocale()).site.getLegalDocument(slug) : null;
  if (!document) notFound();

  return (
    <>
      <PageHero
        crumbs={[{ label: t("common.home"), href: routes.home }, { label: t("nav.corporate") }, { label: document.title }]}
        title={[document.title]}
        titleClassName="text-[max(2.5rem,min(clamp(2.625rem,6vw,6rem),12svh))]"
      />
      <Container as="section" className="max-w-[53.75rem] pt-lead pb-section">
        {document.approvalPending ? (
          <p role="note" className="mb-10 rounded-card bg-tint px-6 py-5 font-mono text-xs leading-relaxed tracking-[0.04em] text-ember-d uppercase">
            {t("i18n.legalDraft")}
          </p>
        ) : null}
        <div className="flex flex-col gap-6">
          {document.paragraphs.map((paragraph) => (
            <Reveal key={paragraph}>
              <p className="text-lead text-pretty text-muted">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
