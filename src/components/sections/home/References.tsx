import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReferenceItem } from "@/core/types";

export function References({ references }: { references: ReferenceItem[] }) {
 return <section className="home-wrap home-section references-section"><div className="home-heading"><h2>Referanslarımız</h2><p>Güvenimizi ve kalitemizi tercih eden kurumlarla gerçekleştirdiğimiz çalışmalardan bazıları.</p></div><div className="reference-grid">{references.map(r=><div key={r.id}><strong>{r.title}</strong><span>{r.sectorLabel}</span></div>)}<Link href="/referanslar">Tümünü Görüntüle <ArrowRight size={19}/></Link></div></section>;
}
