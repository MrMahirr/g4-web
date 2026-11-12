import { useTranslations } from "next-intl";
import Link from "next/link";
import { FeaturedProductGrid } from "@/components/catalog/FeaturedProductGrid";
import { FeaturedProductList, type FeaturedRow } from "@/components/catalog/FeaturedProductList";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { routes } from "@/data/navigation.data";

/** Öne çıkan ürünler — masaüstü: liste satırları (tasarım D4Main 5); mobil: 2 sütun görselli ürün ızgarası. */
export function FeaturedProducts({ rows }: { rows: FeaturedRow[] }) {
  const t = useTranslations();
  return (
    <Container as="section" className="flex flex-col gap-6 pb-section row:gap-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-3 row:gap-5">
          <Reveal kind="skew">
            <h2 className="font-display text-d2">{t("home.featured.title")}</h2>
          </Reveal>
        </div>
        <Reveal className="max-row:hidden">
          <UnderlineLink href={routes.products}>{t("home.featured.all")}</UnderlineLink>
        </Reveal>
      </div>

      <FeaturedProductGrid rows={rows.slice(0, 6)} className="row:hidden" />
      <Link
        href={routes.products}
        className="flex min-h-12 items-center justify-center rounded-btn bg-ink font-mono text-xs tracking-[0.06em] text-white uppercase no-underline transition-colors duration-300 hover:bg-ember-d row:hidden"
      >
        {t("home.featured.all")}
      </Link>

      <FeaturedProductList rows={rows} className="max-row:hidden" />
    </Container>
  );
}
