import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { G4Logo } from "@/components/shared/G4Logo";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import type { CompanyInfo, ServiceItem } from "@/core/types";
import { about } from "@/data/about.data";
import { footerCorporateLinks, footerLegalLinks, routes } from "@/data/navigation.data";
import { tr } from "@/dictionaries/tr";
import { cn } from "@/lib/utils";

const footerLinkClass = cn(
  "inline-flex min-h-9 items-center text-muted no-underline transition-[color,translate] duration-500 ease-soft",
  "hover:translate-x-1.5 hover:text-ember-d",
);

function ColumnTitle({ children }: { children: ReactNode }) {
  return <span className="mb-3.5 font-mono text-xs tracking-[0.08em] text-ember-d uppercase">{children}</span>;
}

/** Footer (tasarım: D4Footer) — çağrı bloğu + dönen daire düğme, bağlantı sütunları, dev "Güven" yazısı. */
export function SiteFooter({ company, services }: { company: CompanyInfo; services: ServiceItem[] }) {
  return (
    <footer className="relative overflow-hidden bg-tint text-ink grain">
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] items-center gap-12 pt-[130px] pb-[90px]">
        <div className="flex flex-col gap-[26px]">
          <Tag>Teklif Formu</Tag>
          <Reveal kind="skew">
            <h2 className="font-display text-d2 text-balance">
              Bizimle Çalışmak <span className="text-ember">İster misiniz?</span>
            </h2>
          </Reveal>
          <p className="max-w-[600px] text-lead text-pretty text-muted">{about.callToAction.text}</p>
        </div>
        <div className="flex justify-center p-[30px]">
          <Link
            href={routes.contact}
            className={cn(
              "relative flex size-[200px] items-center justify-center rounded-full bg-ember-d text-center font-display text-lg font-semibold text-white no-underline",
              "transition-[scale,rotate,background-color] duration-700 ease-soft hover:scale-[1.08] hover:-rotate-6 hover:bg-wine",
            )}
          >
            <svg
              viewBox="0 0 200 200"
              aria-hidden="true"
              className="absolute -inset-[22px] size-[calc(100%+44px)] animate-spin-ring motion-reduce:animate-none"
            >
              <defs>
                <path id="footer-ring" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
              </defs>
              <text className="font-mono" fontSize="10.5" letterSpacing="3.2" fill="#4C6274">
                <textPath href="#footer-ring">G4 · YATIRIM · İNŞAAT · MEDİKAL · DIŞ TİCARET · TEKNOLOJİ · </textPath>
              </text>
            </svg>
            <span className="flex flex-col items-center gap-2">
              {tr.common.requestInfo}
              <ArrowUpRight size={22} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </Container>

      <Container>
        <hr className="m-0 h-px border-0 bg-line" />
      </Container>

      <Container className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-10 pt-16 pb-14">
        <div className="flex flex-col gap-[22px]">
          <G4Logo size="footer" className="self-start" />
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
            <Link key={service.slug} href={routes.service(service.slug)} className={footerLinkClass}>
              {service.title}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <ColumnTitle>İletişim</ColumnTitle>
          <address className="leading-[1.6] text-muted not-italic">{company.address.full}</address>
          <a
            href={`tel:${company.phone.tel}`}
            className={cn(footerLinkClass, "font-display text-[22px] font-semibold text-ink")}
          >
            {company.phone.display}
          </a>
          <a href={`mailto:${company.email}`} className={cn(footerLinkClass, "text-ink")}>
            {company.email}
          </a>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {company.socials.map((social) => {
              const chip =
                "inline-flex min-h-9 items-center rounded-tag border px-2.5 font-mono text-xs tracking-[0.04em] uppercase no-underline";
              return social.href ? (
                <a
                  key={social.channel}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(chip, "border-ink/18 text-muted transition-colors duration-300 hover:border-ink hover:text-ember-d")}
                >
                  {social.label}
                </a>
              ) : (
                <span key={social.channel} aria-disabled="true" title="Bağlantı yakında" className={cn(chip, "border-ink/10 text-muted/60")}>
                  {social.label}
                </span>
              );
            })}
          </div>
        </div>
      </Container>

      <div aria-hidden="true" className="flex justify-center overflow-hidden pb-2.5">
        <Reveal>
          <div className="font-display text-[clamp(120px,20vw,300px)] leading-[0.85] font-extrabold tracking-[-0.06em] whitespace-nowrap text-ghost [-webkit-text-stroke-color:rgb(30_48_64/0.16)] select-none">
            Güven
          </div>
        </Reveal>
      </div>

      <div className="border-t border-ink/12">
        <Container className="flex flex-wrap justify-between gap-3 py-[22px] font-mono text-xs tracking-[0.04em] text-muted uppercase">
          <span>© 2026 G4 · {tr.common.rights}</span>
          <span className="flex flex-wrap gap-5">
            {footerLegalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-muted no-underline hover:text-ember-d">
                {link.label}
              </Link>
            ))}
          </span>
          <a href="#top" className="text-ink no-underline hover:text-ember-d">
            {tr.common.backToTop} ↑
          </a>
        </Container>
      </div>
    </footer>
  );
}
