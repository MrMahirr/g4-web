import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { BackToTopLink } from "@/components/layout/BackToTopLink";
import { Reveal } from "@/components/motion/Reveal";
import { G4Logo } from "@/components/shared/G4Logo";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import type { CompanyInfo, ServiceItem } from "@/core/types";
import { about } from "@/data/about.data";
import {
  footerCorporateLinks,
  footerLegalLinks,
  routes,
} from "@/data/navigation.data";
import { tr } from "@/dictionaries/tr";
import { cn } from "@/lib/utils";

const footerLinkClass = cn(
  "inline-flex min-h-8 items-center text-sm text-muted no-underline transition-colors duration-300",
  "hover:text-ember-d",
);

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <span className="mb-3 font-mono text-[11px] tracking-[0.12em] text-faint uppercase">
      {children}
    </span>
  );
}

/** Footer (tasarım: D4Footer) — çağrı bloğu + dönen daire düğme, bağlantı sütunları, dev "Güven" yazısı. */
export function SiteFooter({
  company,
  services,
}: {
  company: CompanyInfo;
  services: ServiceItem[];
}) {
  return (
    <footer className="relative overflow-hidden bg-tint text-ink grain">
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] items-start gap-x-10 gap-y-10 pt-14 pb-10 lg:grid-cols-[minmax(0,2.4fr)_1fr_1fr_1.3fr_auto]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6 lg:col-span-1">
          <G4Logo size="footer" className="shrink-0 self-start" />
          <div className="flex min-w-0 flex-col gap-3.5">
            <Tag>Teklif Formu</Tag>
            <Reveal kind="skew">
              <h2 className="font-display text-[clamp(28px,3.4vw,44px)] leading-[1.05] font-bold tracking-[-0.03em] text-balance">
                Bizimle Çalışmak{" "}
                <span className="text-ember">İster misiniz?</span>
              </h2>
            </Reveal>
            <p className="max-w-[520px] text-[15px] leading-relaxed text-pretty text-muted">
              {about.callToAction.text}
            </p>
          </div>
        </div>

        <nav aria-label="Site içi bağlantılar" className="flex flex-col">
          <ColumnTitle>Kurumsal</ColumnTitle>
          {footerCorporateLinks.map((link) => (
            <Link key={link.href} href={link.href} className={footerLinkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Hizmetler" className="flex flex-col">
          <ColumnTitle>Hizmetlerimiz</ColumnTitle>
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

        <div className="flex flex-col gap-3">
          <ColumnTitle>İletişim</ColumnTitle>
          <address className="text-sm leading-[1.6] text-muted not-italic">
            {company.address.full}
          </address>
          <a
            href={`tel:${company.phone.tel}`}
            className={cn(
              footerLinkClass,
              "font-display text-lg font-semibold text-ink",
            )}
          >
            {company.phone.display}
          </a>
          <a
            href={`mailto:${company.email}`}
            className={cn(footerLinkClass, "text-ink")}
          >
            {company.email}
          </a>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {company.socials.map((social) => {
              const item =
                "inline-flex min-h-9 items-center font-mono text-[11px] tracking-[0.08em] uppercase no-underline";
              return social.href ? (
                <a
                  key={social.channel}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    item,
                    "text-muted transition-colors duration-300 hover:text-ember-d",
                  )}
                >
                  {social.label}
                </a>
              ) : (
                <span
                  key={social.channel}
                  aria-disabled="true"
                  title="Bağlantı yakında"
                  className={cn(item, "text-muted/50")}
                >
                  {social.label}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center p-4 lg:justify-end">
          <Link
            href={routes.contact}
            className={cn(
              "relative flex size-32 items-center justify-center rounded-full bg-ember-d text-center font-display text-sm font-semibold text-white no-underline",
              "transition-[scale,rotate,background-color] duration-700 ease-soft hover:scale-[1.08] hover:-rotate-6 hover:bg-wine",
            )}
          >
            <svg
              viewBox="0 0 200 200"
              aria-hidden="true"
              className="absolute -inset-[14px] size-[calc(100%+28px)] animate-spin-ring motion-reduce:animate-none"
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
                  G4 · YATIRIM · İNŞAAT · MEDİKAL · DIŞ TİCARET · TEKNOLOJİ
                  ·{" "}
                </textPath>
              </text>
            </svg>
            <span className="flex flex-col items-center gap-2">
              {tr.common.requestInfo}
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="flex justify-center overflow-hidden opacity-60"
      >
        <Reveal>
          <div className="font-display text-[clamp(56px,9vw,120px)] leading-[0.85] font-extrabold tracking-[-0.06em] whitespace-nowrap text-ghost [-webkit-text-stroke-color:rgb(30_48_64/0.12)] select-none">
            Güven
          </div>
        </Reveal>
      </div>

      <div className="border-t border-line">
        <Container className="flex flex-wrap justify-between gap-3 py-4 font-mono text-[11px] tracking-[0.08em] text-faint uppercase">
          <span>© 2026 G4 · {tr.common.rights}</span>
          <span className="flex flex-wrap gap-x-6 gap-y-1">
            {footerLegalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-faint no-underline transition-colors hover:text-ember-d"
              >
                {link.label}
              </Link>
            ))}
          </span>
          <BackToTopLink className="text-ink no-underline hover:text-ember-d">
            {tr.common.backToTop} ↑
          </BackToTopLink>
        </Container>
      </div>
    </footer>
  );
}
