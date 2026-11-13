import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { Enter, Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { getCatalog } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages");
  return pageMetadata({ title: t("career.titleLines.0"), description: t("career.lead"), path: routes.career });
}

/** Kariyer / İK başvurusu (tasarım: D4Kariyer). T.C. kimlik no alanı kaldırıldı (plan Ç10). */
export default async function CareerPage() {
  const t = await getTranslations();
  const copy = await getTranslations("pages");
  const titleLines = copy.raw("career.titleLines") as string[];
  const steps = copy.raw("career.steps") as string[];
  const catalog = getCatalog(await getLocale());
  const email = catalog.site.getCompany().email;

  return (
    <>
      <PageHero
        crumbs={[{ label: t("common.home"), href: routes.home }, { label: t("nav.corporate") }, { label: t("navLinks.corporate.career") }]}
        title={[
          titleLines[0],
          <span key="em" className="text-ember">
            {titleLines[1]}
          </span>,
        ]}
        description={copy("career.lead")}
        image={catalog.images.getImage("hero/kariyer")}
        className="pb-[min(3.75rem,6svh)]"
        footer={
          <Enter kind="rise" delay={0.7} className="mt-[min(3.125rem,5svh)] grid grid-cols-3 border-t border-ink/14 max-[56.25rem]:grid-cols-1">
            {steps.map((step, index) => (
              <div
                key={step}
                className={cn(
                  "flex flex-col gap-[1.125rem] border-r border-ink/14 pt-10 pr-8 pb-11 last:border-r-0 not-first:pl-8",
                  "max-[56.25rem]:border-r-0 max-[56.25rem]:border-b max-[56.25rem]:not-first:pl-0",
                )}
              >
                <span aria-hidden="true" className="font-display text-[min(6rem,11svh)] leading-[0.8] font-extrabold tracking-[-0.06em] text-ember text-outline">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="leading-[1.75] text-pretty text-muted">{step}</p>
              </div>
            ))}
          </Enter>
        }
      />

      <Container
        as="section"
        className="grid grid-cols-[repeat(auto-fit,minmax(min(26.25rem,100%),1fr))] items-start gap-[clamp(2rem,6vw,6rem)] py-section"
      >
        <div className="flex flex-col gap-[1.375rem]">
          <Reveal kind="skew">
            <h2 className="font-display text-d2 text-balance">
              {copy("career.asideTitle.before")} <span className="text-ember">{copy("career.asideTitle.accent")}</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-lead text-pretty text-muted">{copy("career.asideLead")}</p>
          </Reveal>
          <Reveal>
            <p className="leading-[1.75] text-pretty text-muted">{copy("career.asideText")}</p>
          </Reveal>
        </div>
        <Reveal>
          <div className="rounded-card bg-white p-[clamp(1.75rem,4vw,3.5rem)]">
            <LeadForm kind="career" idPrefix="ik" tag={copy("career.formTag")} subject={copy("career.subject")} email={email} />
          </div>
        </Reveal>
      </Container>
    </>
  );
}
