import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Picture } from "@/components/shared/Picture";
import { images } from "@/data/images.manifest";
import type { ProductCategory } from "@/core/types";
import { Kicker } from "./Kicker";
const asset = (key: string) => images[key];

export function Categories({ categories }: { categories: ProductCategory[] }) {
 return <section className="home-wrap home-section"><div className="home-heading"><div><Kicker>Siz Seçin, Biz Sunalım</Kicker><h2>Ürün Grupları</h2></div><p>Zengin ürün yelpazemizle farklı ihtiyaçlara hitap ediyor, yüksek kalite standartlarıyla fark yaratıyoruz.</p></div><div className="category-accordion">{categories.map((c,i)=>{const img=asset(c.imageKey);return <Link className="category-panel" href={`/urun-kategori/${c.slug}`} key={c.id}><Picture src={img?.src} alt={img?.alt ?? ""} sizes="(max-width: 960px) 100vw, 40vw" className="category-photo"/><span className="category-number">0{i+1}</span><span className="category-title">{c.title}</span><span className="category-arrow"><ArrowUpRight/></span></Link>})}</div></section>;
}
