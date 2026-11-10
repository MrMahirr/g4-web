import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { Enter, Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/ui/Container";
import { container } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { pageCopy } from "@/data/pages.data";
import { tr } from "@/dictionaries/tr";
import { cn } from "@/lib/utils";

const copy = pageCopy.career;

export const metadata: Metadata = { title: "Kariyer", description: copy.lead };

/** Kariyer / İK başvurusu (tasarım: D4Kariyer). T.C. kimlik no alanı kaldırıldı (plan Ç10). */
export default function CareerPage() {
  const email = container.resolve("CatalogService").getCompany().email;

  return (
    <>
      <PageHero
        crumbs={[{ label: tr.common.home, href: routes.home }, { label: tr.nav.corporate }, { label: "Kariyer" }]}
        title={[
          copy.titleLines[0],
          <span key="em" className="text-ember">
            {copy.titleLines[1]}
          </span>,
        ]}
        description={copy.lead}
        ghost={copy.ghost}
        className="pb-[60px]"
        footer={
          <Enter kind="rise" delay={0.7} className="mt-[50px] grid grid-cols-3 border-t border-ink/14 max-[900px]:grid-cols-1">
            {copy.steps.map((step, index) => (
              <div
                key={step}
                className={cn(
                  "flex flex-col gap-[18px] border-r border-ink/14 pt-10 pr-8 pb-11 last:border-r-0 not-first:pl-8",
                  "max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:not-first:pl-0",
                )}
              >
                <span aria-hidden="true" className="font-display text-[96px] leading-[0.8] font-extrabold tracking-[-0.06em] text-ember text-outline">
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
        className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-start gap-[clamp(32px,6vw,96px)] pt-[120px] pb-[130px]"
      >
        <div className="sticky top-[120px] flex flex-col gap-[22px] max-stack:static">
          <Reveal kind="skew">
            <h2 className="font-display text-d2 text-balance">
              {copy.asideTitle.before} <span className="text-ember">{copy.asideTitle.accent}</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-lead text-pretty text-muted">{copy.asideLead}</p>
          </Reveal>
          <Reveal>
            <p className="leading-[1.75] text-pretty text-muted">{copy.asideText}</p>
          </Reveal>
        </div>
        <Reveal>
          <div className="rounded-card bg-white p-[clamp(28px,4vw,56px)]">
            <LeadForm kind="career" idPrefix="ik" tag={copy.formTag} subject={copy.subject} email={email} />
          </div>
        </Reveal>
      </Container>
    </>
  );
}
