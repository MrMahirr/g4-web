import { UnderlineLink } from "@/components/ui/UnderlineLink";
import type { CompanyInfo } from "@/core/types";
import { formatShortDate } from "@/lib/text";

type Props = {
  publishedAt: string;
  locale: "tr" | "en";
  socials: CompanyInfo["socials"];
  kicker: string;
  source: string;
  share: string;
};

/** Haber metninin tarih ve sosyal paylaşım yan bilgisi. */
export function NewsArticleSidebar({
  publishedAt,
  locale,
  socials,
  kicker,
  source,
  share,
}: Props) {
  return (
    <aside className="sticky top-[120px] flex flex-col gap-[18px] font-mono text-xs tracking-[0.06em] uppercase max-[53.75rem]:static max-[53.75rem]:flex-row max-[53.75rem]:flex-wrap max-[53.75rem]:items-center">
      <span className="text-muted">{kicker}</span>
      <span className="text-ember-d">{source}</span>
      <time dateTime={publishedAt} className="text-muted">
        {formatShortDate(publishedAt, locale)}
      </time>
      <hr className="m-0 h-px w-full border-0 bg-line max-[53.75rem]:hidden" />
      <span className="text-muted">{share}</span>
      <div className="flex flex-col gap-0.5 font-sans tracking-normal normal-case max-[53.75rem]:flex-row max-[53.75rem]:gap-4">
        {socials.map((social) => (
          <UnderlineLink
            key={social.channel}
            href={social.href ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="min-h-9 self-start text-sm"
          >
            {social.label}
          </UnderlineLink>
        ))}
      </div>
    </aside>
  );
}
