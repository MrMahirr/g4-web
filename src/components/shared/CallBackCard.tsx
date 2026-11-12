import { getLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { getCatalog } from "@/core/container";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";

type Variant = "wide" | "plain" | "sidebar";

/**
 * "Sizi Arayalım" kutusu.
 * - wide: büyük cümle + düğme yan yana (tasarım: D4Hizmetler)
 * - plain: küçük metin + düğme yan yana (tasarım: D4SSS)
 * - sidebar: dikey, telefonlu (tasarım: D4HizmetDetay kenar çubuğu)
 */
export async function CallBackCard({ variant = "wide", className }: { variant?: Variant; className?: string }) {
  const t = await getTranslations("about");
  const phone = getCatalog(await getLocale()).getCompany().phone;
  const title = t("callBack.title");
  const text = t("callBack.text");
  const button = t("callBack.button");

  switch (variant) {
    case "sidebar":
      return (
        <div className={cn("flex flex-col gap-3.5 rounded-card bg-tint p-7", className)}>
          <Tag>{title}</Tag>
          <p className="text-[15px] leading-[1.75] text-muted">{text}</p>
          <Button href={routes.contact} className="self-start">
            {button}
          </Button>
          <a href={`tel:${phone.tel}`} className="inline-flex min-h-9 items-center font-mono text-sm text-ink no-underline">
            {phone.display}
          </a>
        </div>
      );
    case "plain":
    case "wide":
      return (
        <Reveal>
          <div
            className={cn(
              "relative flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-card grain",
              variant === "wide" ? "bg-tint-2 p-[clamp(32px,5vw,64px)]" : "bg-tint p-[clamp(28px,4vw,48px)]",
              className,
            )}
          >
            <div className={cn("flex flex-col", variant === "wide" ? "max-w-[680px] gap-3.5" : "max-w-[600px] gap-2.5")}>
              <Tag>{title}</Tag>
              {variant === "wide" ? (
                <p className="font-display text-[clamp(24px,2.6vw,36px)] leading-[1.2] font-semibold tracking-[-0.03em]">{text}</p>
              ) : (
                <p className="leading-[1.75] text-muted">{text}</p>
              )}
            </div>
            <Button href={routes.contact}>{button}</Button>
          </div>
        </Reveal>
      );
    default: {
      const exhaustive: never = variant;
      return exhaustive;
    }
  }
}
