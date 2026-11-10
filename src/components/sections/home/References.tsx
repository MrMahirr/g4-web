import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import type { ImageEntry, ReferenceItem } from "@/core/types";
import { homeCopy } from "@/data/home.data";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";

const copy = homeCopy.references;

/** Hücre: üzerine gelince beyaz zemin merkezden daireyle dolar (tasarım: .lg). */
export const referenceCellClass = cn(
  "group/lg relative isolate flex h-[200px] items-center justify-center overflow-hidden border-r border-b border-line p-[34px]",
  "before:absolute before:inset-0 before:-z-10 before:bg-paper before:content-[''] before:[clip-path:circle(0_at_50%_50%)]",
  "before:transition-[clip-path] before:duration-700 before:ease-soft hover:before:[clip-path:circle(75%_at_50%_50%)]",
);

type Props = { references: { reference: ReferenceItem; logo: ImageEntry | null }[] };

/** Referans ızgarası (tasarım: D4Main 6. bölüm). Logo gelene kadar kurum adı yazılır (plan K2). */
export function References({ references }: Props) {
  return (
    <Container as="section" className="flex flex-col gap-10 pb-[140px]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal kind="skew">
          <h2 className="font-display text-d2">{copy.title}</h2>
        </Reveal>
        <Reveal className="max-w-[460px]">
          <p className="leading-[1.75] text-pretty text-muted">{copy.text}</p>
        </Reveal>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] border-t border-l border-line">
        {references.map(({ reference, logo }, index) => (
          <Reveal key={reference.id} index={index % 4} className={referenceCellClass}>
            {logo ? (
              <Image
                src={logo.src}
                alt={reference.title}
                width={logo.width}
                height={logo.height}
                className="max-h-full max-w-full object-contain mix-blend-multiply grayscale transition-[filter,scale] duration-700 ease-soft group-hover/lg:scale-[1.06] group-hover/lg:grayscale-0"
              />
            ) : (
              <span className="absolute inset-0 -z-[5] flex items-center justify-center p-5 text-center font-mono text-xs leading-relaxed tracking-[0.04em] text-muted uppercase">
                {reference.title}
              </span>
            )}
            <span className="absolute bottom-2.5 left-3.5 translate-y-1.5 font-mono text-[11px] text-muted opacity-0 transition-[opacity,translate] duration-500 ease-soft group-hover/lg:translate-y-0 group-hover/lg:opacity-100">
              {reference.sectorLabel}
            </span>
          </Reveal>
        ))}
        <Link
          href={routes.references}
          className={cn(referenceCellClass, "flex-col items-start justify-between bg-tint text-ink no-underline")}
        >
          <span className="font-mono text-xs tracking-[0.04em] text-ember-d uppercase">{copy.allKicker}</span>
          <span className="font-display text-2xl font-semibold tracking-[-0.02em]">{copy.all}</span>
        </Link>
      </div>
    </Container>
  );
}
