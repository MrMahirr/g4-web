import Image from "next/image";
import { ArrowSwap } from "@/components/ui/ArrowSwap";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import type { ImageEntry, ProductCategory } from "@/core/types";
import { homeCopy } from "@/data/home.data";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";

const copy = homeCopy.categories;

type Props = { categories: { category: ProductCategory; image: ImageEntry | null }[] };

/** Ürün grupları akordeonu (tasarım: .acc) — üzerine gelinen panel 4.5 kat genişler. */
export function Categories({ categories }: Props) {
  return (
    <Container as="section" className="flex flex-col gap-12 pt-[140px] pb-[60px]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[720px] flex-col gap-5">
          <Reveal>
            <Tag>{copy.tag}</Tag>
          </Reveal>
          <Reveal kind="skew">
            <h2 className="font-display text-d2">{copy.title}</h2>
          </Reveal>
        </div>
        <Reveal className="max-w-[420px]">
          <p className="leading-[1.75] text-pretty text-muted">{copy.text}</p>
        </Reveal>
      </div>

      <Reveal kind="scale" className="flex h-[560px] gap-2.5 overflow-hidden max-[900px]:h-auto max-[900px]:flex-col">
        {categories.map(({ category, image }, index) => (
          <Link
            key={category.slug}
            href={routes.category(category.slug)}
            className={cn(
              "group/acc relative isolate min-w-0 flex-[1_1_0] overflow-hidden rounded-card bg-white text-white no-underline ring-1 ring-line ring-inset",
              "transition-[flex-grow] duration-800 ease-soft hover:grow-[4.5] focus-visible:grow-[4.5] motion-reduce:transition-none",
              "max-[900px]:min-h-[120px] max-[900px]:flex-none max-[900px]:hover:grow-0 max-[900px]:focus-visible:grow-0",
            )}
          >
            <span className="absolute inset-0 -z-20 bg-white">
              {image ? (
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 50vw, 45vw"
                  className="object-cover transition-transform duration-1000 ease-soft group-hover/acc:scale-[1.06]"
                />
              ) : null}
            </span>
            <span className="absolute inset-0 -z-10 bg-linear-to-b from-ink/0 from-40% to-ink/92" />
            <span aria-hidden="true" className="absolute top-4 left-[18px] rounded-tag bg-ivory px-2 py-1 font-mono text-xs text-ink">
              {String(index + 1).padStart(2, "0")}
            </span>
            {/* Bağlantının erişilebilir adı bu başlıktan gelir (aria-label görünen metinle çakışıyordu). */}
            <span
              className={cn(
                "absolute bottom-7 left-1/2 -translate-x-1/2 rotate-180 font-display text-lg font-semibold whitespace-nowrap [writing-mode:vertical-rl]",
                "transition-opacity duration-400 group-hover/acc:opacity-0 group-focus-visible/acc:opacity-0",
                "max-[900px]:left-6 max-[900px]:translate-x-0 max-[900px]:rotate-0 max-[900px]:[writing-mode:horizontal-tb]",
                "max-[900px]:group-hover/acc:opacity-100",
              )}
            >
              {category.title}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-6 bottom-6 flex translate-y-4 items-end justify-between gap-4 opacity-0",
                "transition-[opacity,translate] duration-[400ms,600ms] ease-soft",
                "group-hover/acc:translate-y-0 group-hover/acc:opacity-100 group-hover/acc:delay-200",
                "group-focus-visible/acc:translate-y-0 group-focus-visible/acc:opacity-100",
                "max-[900px]:hidden",
              )}
            >
              <strong className="font-display text-[26px] leading-[1.15] tracking-[-0.02em]">{category.title}</strong>
              <span className="relative flex size-[52px] flex-none items-center justify-center overflow-hidden rounded-full bg-ember">
                <ArrowSwap trigger="acc" direction="up-right" size={20} />
              </span>
            </span>
          </Link>
        ))}
      </Reveal>
    </Container>
  );
}
