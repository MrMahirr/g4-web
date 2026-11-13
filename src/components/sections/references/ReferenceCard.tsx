import Image from "next/image";
import type { ImageEntry, ReferenceItem } from "@/core/types";
import { cn } from "@/lib/utils";

type Props = {
  reference: ReferenceItem;
  logo: ImageEntry | null;
  photo: ImageEntry | null;
  index: number;
  total: number;
};

function getInitials(title: string): string {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

export function ReferenceCard({ reference, logo, photo, index, total }: Props) {
  const number = String(index + 1).padStart(2, "0");
  const totalNumber = String(total).padStart(2, "0");

  return (
    <article
      className={cn(
        "group/rc relative flex h-full flex-col border border-line bg-paper",
        "transition-[border-color,translate,box-shadow] duration-500 ease-soft hover:-translate-y-1",
        "hover:border-ink/30 hover:shadow-[0_24px_48px_-28px_rgb(30_48_64/0.35)]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        {logo ? (
          <div className="flex h-full items-center justify-center p-10">
            <Image
              src={logo.src}
              alt={reference.title}
              width={logo.width}
              height={logo.height}
              className={cn(
                "max-h-full max-w-full object-contain mix-blend-multiply grayscale",
                "transition-[filter,scale] duration-700 ease-soft group-hover/rc:scale-[1.04]",
                "group-hover/rc:grayscale-0 motion-reduce:transition-none",
              )}
            />
          </div>
        ) : photo ? (
          <>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className={cn(
                "object-cover grayscale-[70%] transition-[filter,scale] duration-700 ease-soft",
                "group-hover/rc:scale-[1.05] group-hover/rc:grayscale-0",
                "motion-reduce:transition-none",
              )}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent"
            />
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-tint">
            <span className="font-display text-6xl text-ink/15">{getInitials(reference.title)}</span>
          </div>
        )}
        <span className="absolute top-4 left-4 bg-paper px-2.5 py-1 font-mono text-xs text-ink">
          {number} / {totalNumber}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-ember-d uppercase">
          {reference.sectorLabel}
        </span>
        <h3
          className="font-display text-xl leading-[1.25] font-semibold tracking-[-0.02em] text-balance text-ink"
        >
          {reference.title}
        </h3>
        <div className="mt-auto pt-4">
          <span
            className={cn(
              "block h-px w-10 bg-ember transition-[width] duration-700 ease-soft",
              "group-hover/rc:w-full motion-reduce:transition-none",
            )}
          />
        </div>
      </div>
    </article>
  );
}
