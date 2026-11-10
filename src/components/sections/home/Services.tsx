import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Picture } from "@/components/shared/Picture";
import { Button } from "@/components/ui/Button";
import { images } from "@/data/images.manifest";
import type { ServiceItem } from "@/core/types";
import { Kicker } from "./Kicker";
import { ServiceScroller } from "./ServiceScroller";
const asset = (key: string) => images[key];

export function Services({ services }: { services: ServiceItem[] }) {
 return <section className="home-services"><div className="home-wrap home-section"><div className="home-heading"><div><Kicker>Profesyonel Çözümler</Kicker><h2>Medikal Hizmetlerimiz</h2></div><Link className="home-more" href="/hizmetler">Tüm Hizmetler <ArrowUpRight size={18}/></Link></div><ServiceScroller>{services.map((s,i)=>{const img=asset(s.imageKey);return <Link href={`/hizmet/${s.slug}`} className="service-card" key={s.id}><Picture src={img?.src} alt={img?.alt ?? ""} sizes="(max-width: 960px) 80vw, 32vw" className="service-photo"/><div className="service-card-info"><span>0{i+1} / 02</span><ArrowUpRight/><h3>{s.title}</h3></div></Link>})}<div className="service-end"><span>G4 MEDİKAL</span><p>Kaliteli, güvenilir ve yenilikçi çözümlerle yanınızdayız.</p><Button href="/iletisim" variant="ivory">Bilgi Talep Et</Button></div></ServiceScroller></div></section>;
}
