import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { ImageEntry, ReferenceItem } from "@/core/types";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { ReferenceSlider } from "./ReferenceSlider";

/** Hücre: üzerine gelince beyaz zemin merkezden daireyle dolar (tasarım: .lg). */
export const referenceCellClass = cn(
  "group/lg relative isolate flex h-[200px] items-center justify-center overflow-hidden border-r border-b border-line p-[34px]",
  "before:absolute before:inset-0 before:-z-10 before:bg-paper before:content-[''] before:[clip-path:circle(0_at_50%_50%)]",
  "before:transition-[clip-path] before:duration-700 before:ease-soft hover:before:[clip-path:circle(75%_at_50%_50%)]",
);

type Props = {
  references: {
    reference: ReferenceItem;
    logo: ImageEntry | null;
    photo: ImageEntry | null;
  }[];
};

/**
 * Hücre içeriği: logo varsa logo; yoksa sektörü temsil eden fotoğraf + kurum adı; ikisi de yoksa yalnız kurum adı.
 * Fotoğraf gri tonlu durur, üzerine gelince renklenir.
 */
export function ReferenceVisual({
  reference,
  logo,
  photo,
}: {
  reference: ReferenceItem;
  logo: ImageEntry | null;
  photo: ImageEntry | null;
}) {
  if (logo) {
    return (
      <Image
        src={logo.src}
        alt={reference.title}
        width={logo.width}
        height={logo.height}
        className="max-h-full max-w-full object-contain mix-blend-multiply grayscale transition-[filter,scale] duration-700 ease-soft group-hover/lg:scale-[1.06] group-hover/lg:grayscale-0"
      />
    );
  }
  if (photo) {
    return (
      <>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          className="-z-[5] object-cover grayscale-[70%] transition-[filter,scale] duration-700 ease-soft group-hover/lg:scale-[1.06] group-hover/lg:grayscale-0"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-[4] bg-gradient-to-t from-ink/85 via-ink/25 to-ink/30"
        />
        <span className="absolute inset-x-4 bottom-4 flex flex-col gap-1.5 text-left text-white">
          <span className="font-mono text-[11px] tracking-[0.04em] text-white/75 uppercase">
            {reference.sectorLabel}
          </span>
          <span className="font-display text-lg leading-[1.2] font-semibold tracking-[-0.02em] text-balance">
            {reference.title}
          </span>
        </span>
      </>
    );
  }
  return (
    <span className="absolute inset-0 -z-[5] flex items-center justify-center p-5 text-center font-mono text-xs leading-relaxed tracking-[0.04em] text-muted uppercase">
      {reference.title}
    </span>
  );
}

/** Referans ızgarası (tasarım: D4Main 6. bölüm). */
export function References({ references }: Props) {
  const t = useTranslations();
  return (
    <Container as="section" className="flex flex-col gap-10 pb-section">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal kind="skew">
          <h2 className="font-display text-d2">{t("home.references.title")}</h2>
        </Reveal>
        <Reveal className="max-w-[440px]">
          <p className="leading-[1.75] text-pretty text-muted">{t("home.references.text")}</p>
        </Reveal>
      </div>

      <Reveal>
        <ReferenceSlider label={t("home.references.title")}>
          {/* Az kurumda şerit görünür alanı doldurmaz ve Embla döngüyü kapatır; liste iki kez dizilir (2. kopya ekran okuyucudan gizli). */}
          {[0, 1].flatMap((copyIndex) =>
            references.map(({ reference, logo, photo }) => (
            <div
              key={`${copyIndex}-${reference.id}`}
              aria-hidden={copyIndex === 1 ? true : undefined}
              className="min-w-0 flex-[0_0_min(300px,80%)]"
            >
              <div className={referenceCellClass}>
                <ReferenceVisual reference={reference} logo={logo} photo={photo} />
                {!logo && photo ? null : (
                  <span className="absolute bottom-2.5 left-3.5 translate-y-1.5 font-mono text-[11px] text-muted opacity-0 transition-[opacity,translate] duration-500 ease-soft group-hover/lg:translate-y-0 group-hover/lg:opacity-100">
                    {reference.sectorLabel}
                  </span>
                )}
              </div>
            </div>
            )),
          )}
        </ReferenceSlider>
      </Reveal>

      <Reveal className="flex justify-center">
        <Button href={routes.references} variant="ghost">
          {t("home.references.all")}
        </Button>
      </Reveal>
    </Container>
  );
}
