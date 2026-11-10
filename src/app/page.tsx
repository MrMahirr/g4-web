import { Hero, Introduction, Services, Categories, FeaturedProducts, References } from "@/components/sections/home/HomeSections";
import { categories } from "@/data/categories.data";
import { company } from "@/data/company.data";
import { products, homeFeaturedSlugs } from "@/data/products.data";
import { references } from "@/data/references.data";
import { services } from "@/data/services.data";
import "./home.css";

export default function HomePage() {
 const featured = homeFeaturedSlugs.flatMap((slug) => { const product = products.find((item) => item.slug === slug && item.isFeaturedOnHome); return product ? [product] : []; });
 const remaining = products.filter((item) => item.isFeaturedOnHome && !homeFeaturedSlugs.includes(item.slug));
 return <><Hero/><Introduction stats={company.stats}/><Services services={services.filter((s) => s.isFeaturedOnHome)}/><Categories categories={categories}/><FeaturedProducts products={[...featured, ...remaining]}/><References references={references.filter((r) => r.isFeaturedOnHome)}/></>;
}
