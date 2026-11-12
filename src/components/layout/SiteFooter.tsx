import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { G4Logo } from "@/components/shared/G4Logo";
import type { CompanyInfo, ServiceItem } from "@/core/types";
import {
  footerCorporateLinks,
  footerLegalLinks,
  routes,
} from "@/data/navigation.data";
import { cn } from "@/lib/utils";
import { FooterContact } from "./footer/FooterContact";
import { FooterColumnTitle } from "./footer/FooterColumnTitle";

const footerLinkClass = cn(
  "inline-flex min-h-8 items-center text-sm text-muted no-underline transition-colors duration-300",
  "hover:text-ember-d",
);

/** Footer (tasarım: D4Footer) — çağrı bloğu + dönen daire düğme, bağlantı sütunları, dev "Güven" yazısı. */
export async function SiteFooter({
  company,
  services,
}: {
  company: CompanyInfo;
  services: ServiceItem[];
}) {
  const t = await getTranslations();
  return (
    <footer className="relative overflow-hidden bg-tint text-ink grain">
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] items-start gap-x-10 gap-y-10 px-[clamp(16px,2vw,32px)] pt-14 pb-10 lg:grid-cols-[minmax(0,2.4fr)_1fr_1fr_1.3fr_auto]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6 lg:col-span-1">
          <G4Logo size="footer" className="shrink-0 self-start" />
          <div className="flex min-w-0 flex-col gap-3.5">
            <Reveal kind="skew">
              <h2 className="font-display text-[clamp(28px,3.4vw,44px)] leading-[1.05] font-bold tracking-[-0.03em] text-balance">
                {t("footer.ctaBefore")} {" "}
                <span className="text-ember">{t("footer.ctaAccent")}</span>
              </h2>
            </Reveal>
            <p className="max-w-[520px] text-[15px] leading-relaxed text-pretty text-muted">
              {t("about.callToAction.text")}
            </p>
          </div>
        </div>

        <nav aria-label={t("footer.links")} className="flex flex-col">
          <FooterColumnTitle icon={Building2}>{t("footer.corporate")}</FooterColumnTitle>
          {footerCorporateLinks.map((link) => (
            <Link key={link.href} href={link.href} className={footerLinkClass}>
              {t(`navLinks.footerCorporate.${link.key}`)}
            </Link>
          ))}
        </nav>

        <nav aria-label={t("footer.services")} className="flex flex-col">
          <FooterColumnTitle icon={Briefcase}>{t("footer.services")}</FooterColumnTitle>
          {services.map((service) => (
            <Link
              key={service.slug}
              href={routes.service(service.slug)}
              className={footerLinkClass}
            >
              {service.title}
            </Link>
          ))}
        </nav>

        <FooterContact company={company} />
        <div className="flex justify-center p-4 lg:justify-end">
          <Link
            href={routes.contact}
            className={cn(
              "group/ring relative flex size-32 items-center justify-center rounded-full bg-ember-d text-center font-display text-sm font-semibold text-white no-underline",
              "transition-[scale,rotate,background-color] duration-700 ease-soft hover:scale-[1.08] hover:-rotate-6 hover:bg-wine",
            )}
          >
            <svg
              viewBox="0 0 200 200"
              aria-hidden="true"
              className="absolute -inset-[14px] size-[calc(100%+28px)] animate-spin-ring [animation-play-state:paused] group-hover/ring:[animation-play-state:running] motion-reduce:animate-none"
            >
              <defs>
                <path
                  id="footer-ring"
                  d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0"
                />
              </defs>
              <text
                className="font-mono"
                fontSize="10.5"
                letterSpacing="3.2"
                fill="#4C6274"
                fillOpacity="0.7"
              >
                <textPath href="#footer-ring">
                  {t("footer.ring")}
                </textPath>
              </text>
            </svg>
            <span className="flex flex-col items-center gap-2">
              {t("common.requestInfo")}
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="flex justify-center overflow-hidden pb-2.5"
      >
        <Reveal>
          <div className="font-display text-[clamp(120px,20vw,300px)] leading-[0.85] font-extrabold tracking-[-0.06em] whitespace-nowrap text-ghost [-webkit-text-stroke-color:rgb(30_48_64/0.16)] select-none">
            {t("footer.trust")}
          </div>
        </Reveal>
      </div>

      <div className="border-t border-line">
        <div className="flex w-full flex-wrap justify-between gap-3 px-[clamp(16px,2vw,32px)] py-4 font-mono text-[11px] tracking-[0.08em] text-faint uppercase">
          <span>{t("footer.copyright", { rights: t("common.rights") })}</span>
          <span className="flex flex-wrap gap-x-6 gap-y-1">
            {footerLegalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-faint no-underline transition-colors hover:text-ember-d"
              >
                {t(`navLinks.footerLegal.${link.key}`)}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
