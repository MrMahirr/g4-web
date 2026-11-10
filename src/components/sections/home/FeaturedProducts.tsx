import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Picture } from "@/components/shared/Picture";
import { images } from "@/data/images.manifest";
import type { ProductItem } from "@/core/types";
import { Kicker } from "./Kicker";
const asset = (key: string) => images[key];

export function FeaturedProducts({ products }: { products: ProductItem[] }) {
 return <section className="home-wrap home-section products-section"><div className="home-heading"><div><Kicker>Ürünler</Kicker><h2>Öne Çıkan Ürünlerimiz</h2></div><Link className="home-more" href="/urunler">Tümünü Göster <ArrowUpRight size={18}/></Link></div><div className="product-list">{products.map((p,i)=>{const img=asset(p.imageKey);return <Link href={`/urun/${p.slug}`} className="product-row" key={p.id}><span className="product-index">{String(i+1).padStart(2,"0")}</span><span className="product-name">{p.name}</span><span className="product-ref">{p.code ? `REF: ${p.code}` : "G4 MEDİKAL"}</span><span className="product-preview"><Picture src={img?.src} alt={img?.alt ?? ""} fit="contain" sizes="180px" className="product-preview-image"/></span><ArrowUpRight className="product-arrow"/></Link>})}</div></section>;
}
