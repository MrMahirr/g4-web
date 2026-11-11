import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Her öğe bir satır; satırlar sırayla maskeden yükselir. */
  lines: ReactNode[];
  as?: "h1" | "h2";
  size?: "d1" | "d2";
  /** İlk satırın gecikmesi (sn) — tasarımdaki --d. */
  delay?: number;
  /** Satırlar arası gecikme (sn). */
  stagger?: number;
  className?: string;
};

/**
 * Satır maskeli başlık (tasarım: .ln / lnUp 1.2s): satırlar eğik açıyla alttan yükselir.
 * CSS animasyonu (globals.css → animate-line-up): başlık JS beklemeden çizilir (LCP).
 */
export function MaskedHeading({ lines, as: Heading = "h1", size = "d1", delay = 0.1, stagger = 0.1, className }: Props) {
  return (
    <Heading
      className={cn(
        // Kalınlık ve aralıklar ayrıca, en sonda yazılır: çağıran boyutu (text-[...]) değiştirse de
        // tailwind-merge satır aralığını silmez, tasarımdaki ağırlık korunur.
        "font-display font-bold text-balance",
        size === "d1" ? "text-d1" : "text-d2",
        className,
        size === "d1" ? "leading-[0.95] tracking-[-0.05em]" : "leading-none tracking-[-0.04em]",
      )}
    >
      {lines.map((line, index) => (
        <span key={index} className="-mb-[0.06em] block overflow-hidden pb-[0.06em]">
          <span
            className="block animate-line-up motion-reduce:animate-none"
            style={{ animationDelay: `${delay + index * stagger}s` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Heading>
  );
}
