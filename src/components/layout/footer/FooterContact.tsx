import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import type { IconType } from "react-icons";
import { FaInstagram, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import type { CompanyInfo } from "@/core/types";
import { cn } from "@/lib/utils";

const footerLinkClass = cn(
  "inline-flex min-h-8 items-center text-sm text-muted no-underline transition-colors duration-300",
  "hover:text-ember-d",
);

/** Sosyal kanal → platformun kendi logosu (lucide 1.x marka ikonu içermez; Font Awesome 6 Brands). */
const socialIcons: Record<string, IconType> = {
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  x: FaXTwitter,
  linkedin: FaLinkedinIn,
};

/** İletişim kanalları ve sosyal ağlar için footer sütunu. */
export async function FooterContact({ company }: { company: CompanyInfo }) {
  const t = await getTranslations();
  return (
    <div className="flex flex-col gap-3">
      <span
        className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-faint uppercase"
      >
        <MapPin size={14} aria-hidden="true" className="text-ember-d" />
        {t("footer.contact")}
      </span>
      <address className="flex items-start gap-2.5 text-sm leading-[1.6] text-muted not-italic">
        <MapPin size={16} aria-hidden="true" className="mt-1 shrink-0 text-ember-d" />
        {company.address.full}
      </address>
      <a
        href={`tel:${company.phone.tel}`}
        className={cn(footerLinkClass, "gap-2.5 font-display text-lg font-semibold text-ink")}
      >
        <Phone size={16} aria-hidden="true" className="shrink-0 text-ember-d" />
        {company.phone.display}
      </a>
      <a href={`mailto:${company.email}`} className={cn(footerLinkClass, "gap-2.5 text-ink")}>
        <Mail size={16} aria-hidden="true" className="shrink-0 text-ember-d" />
        {company.email}
      </a>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {company.socials.map((social) => {
          const item =
            "inline-flex min-h-9 items-center gap-1.5 font-mono text-[11px] tracking-[0.08em] uppercase no-underline";
          const SocialIcon = socialIcons[social.channel];
          return social.href ? (
            <a
              key={social.channel}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={cn(item, "text-muted transition-colors duration-300 hover:text-ember-d")}
            >
              {SocialIcon ? <SocialIcon size={14} aria-hidden="true" /> : null}
              {social.label}
            </a>
          ) : (
            <span
              key={social.channel}
              aria-disabled="true"
              title={t("footer.comingSoon")}
              className={cn(item, "text-muted/50")}
            >
              {SocialIcon ? <SocialIcon size={14} aria-hidden="true" /> : null}
              {social.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
