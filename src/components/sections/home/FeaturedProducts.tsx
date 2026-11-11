import { FeaturedProductList, type FeaturedRow } from "@/components/catalog/FeaturedProductList";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { homeCopy } from "@/data/home.data";
import { routes } from "@/data/navigation.data";

const copy = homeCopy.featured;

/** Öne çıkan ürünler (tasarım: D4Main 5. bölüm — liste satırları). */
export function FeaturedProducts({ rows }: { rows: FeaturedRow[] }) {
  return (
    <Container as="section" className="flex flex-col gap-10 pt-[100px] pb-[130px]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-5">
          <Reveal>
            <Tag>{copy.tag}</Tag>
          </Reveal>
          <Reveal kind="skew">
            <h2 className="font-display text-d2">{copy.title}</h2>
          </Reveal>
        </div>
        <Reveal>
          <UnderlineLink href={routes.products}>{copy.all}</UnderlineLink>
        </Reveal>
      </div>
      <FeaturedProductList rows={rows} />
    </Container>
  );
}
