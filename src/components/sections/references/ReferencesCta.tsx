import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";

export async function ReferencesCta() {
  const copy = await getTranslations("pages");

  return (
    <section aria-labelledby="references-cta-title">
      <div
        className={cn(
          "relative isolate overflow-hidden bg-ink px-6 py-14 text-white",
          "sm:px-12 lg:px-16 lg:py-20",
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            "absolute -right-6 -bottom-16 -z-10 select-none font-display",
            "text-[clamp(160px,22vw,320px)] leading-none font-extrabold text-transparent",
            "[-webkit-text-stroke:1.5px_rgb(255_255_255/0.12)]",
          )}
        >
          G4
        </div>
        <div aria-hidden="true" className="absolute top-0 left-0 h-1.5 w-24 bg-ember" />

        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.08em] text-white/70 uppercase">
              {copy("references.ctaEyebrow")}
            </p>
            <h2
              id="references-cta-title"
              className={cn(
                "mt-4 max-w-[14ch] font-display text-[clamp(32px,4.4vw,56px)]",
                "leading-[1.05] font-bold tracking-[-0.03em] text-balance",
              )}
            >
              {copy("references.cta")}
            </h2>
            <p className="mt-5 max-w-[46ch] leading-[1.7] text-white/75">
              {copy("references.ctaText")}
            </p>
          </div>
          {/* Koyu zeminde varsayılan ink dolgusu kaybolur; paletin hover rengi wine kullanılır. */}
          <Button
            href={routes.contact}
            variant="ember"
            className="before:bg-wine"
          >
            {copy("references.ctaButton")}
          </Button>
        </div>
      </div>
    </section>
  );
}
