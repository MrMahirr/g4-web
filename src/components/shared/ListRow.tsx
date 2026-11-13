import Link from "next/link";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Picture } from "./Picture";

type Props = {
  href: string;
  /** Sıra numarası ("01"). */
  index: string;
  title: ReactNode;
  /** Mono alt satır ("REF: 01-110V-20010"). */
  meta?: ReactNode;
  /** Üzerine gelince dönerek açılan önizleme. `undefined`: önizleme yok; `null`: "Görsel alanı" şablonu. */
  previewSrc?: string | null;
  /** Başlığın altında düz metin (haber özeti). */
  description?: ReactNode;
  /** Başlık yazı boyutu (varsayılan: tasarımdaki clamp(18px, 1.8vw, 24px)). */
  titleClassName?: string;
  className?: string;
};

/** Liste satırı (tasarım: .rowl) — üzerine gelince zemin alttan dolar, ok döner, önizleme açılır. */
export function ListRow({ href, index, title, meta, description, previewSrc, titleClassName, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group/row relative isolate grid grid-cols-[minmax(4.5rem,auto)_minmax(0,1fr)_auto] items-center gap-6 border-b border-line py-[1.625rem]",
        "text-ink no-underline transition-[padding] duration-[600ms] ease-soft hover:pl-5 focus-visible:pl-5",
        "before:absolute before:inset-y-0 before:-inset-x-8 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-tint before:content-['']",
        "before:transition-transform before:duration-[600ms] before:ease-soft hover:before:scale-y-100 focus-visible:before:scale-y-100",
        "motion-reduce:transition-none motion-reduce:before:transition-none",
        "max-row:grid-cols-[auto_minmax(0,1fr)]",
        className,
      )}
    >
      <span className="font-mono text-[0.8125rem] text-muted transition-colors duration-300 group-hover/row:text-ember-d">
        {index}
      </span>
      <span className="flex min-w-0 flex-col gap-1.5">
        <strong
          className={cn(
            "font-display text-[clamp(1.125rem,1.8vw,1.5rem)] leading-tight font-semibold tracking-[-0.02em]",
            titleClassName,
          )}
        >
          {title}
        </strong>
        {meta ? <span className="font-mono text-xs tracking-[0.04em] opacity-70">{meta}</span> : null}
        {description ? <span className="text-[0.9375rem] leading-relaxed opacity-75">{description}</span> : null}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "relative flex size-[3.25rem] items-center justify-center overflow-hidden rounded-full border border-current transition-colors duration-500 ease-soft",
          "group-hover/row:border-ember group-hover/row:bg-ember group-hover/row:text-white",
          "group-focus-visible/row:border-ember group-focus-visible/row:bg-ember group-focus-visible/row:text-white",
          "max-row:hidden",
        )}
      >
        <ArrowSwap trigger="row" size={20} />
      </span>
      {previewSrc !== undefined ? (
        <Picture
          src={previewSrc}
          alt=""
          fit="contain"
          sizes="220px"
          className={cn(
            "pointer-events-none !absolute top-1/2 right-[7.5rem] z-[2] h-[9.375rem] w-[13.75rem] -translate-y-1/2 scale-[0.6] -rotate-6 rounded-btn opacity-0",
            "transition-[opacity,scale,rotate] duration-700 ease-soft group-hover/row:scale-100 group-hover/row:rotate-0 group-hover/row:opacity-100",
            "max-row:hidden",
          )}
        />
      ) : null}
    </Link>
  );
}
