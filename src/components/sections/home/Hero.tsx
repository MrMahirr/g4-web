import { Picture } from "@/components/shared/Picture";
import { Button } from "@/components/ui/Button";
import { images } from "@/data/images.manifest";
import { Kicker } from "./Kicker";
const asset = (key: string) => images[key];

export function Hero() {
 const img = asset("hero/ana");
 return <section className="home-hero"><div className="hero-outline" aria-hidden="true">G4</div><div className="home-wrap hero-grid"><div className="hero-copy"><Kicker>Medikal Ürünler · Hastane Tekstili · Tıbbi Cihazlar</Kicker><h1><span className="hero-mask"><span>Sağlık İçin</span></span><span className="hero-mask"><span className="hero-red">Güvenilir</span></span><span className="hero-mask"><span className="hero-stroke">Çözümler</span></span></h1><div className="hero-rot"><span className="sr-only">Genel Tıbbi Sarf Malzemeler, Tıbbi Cihazlar, Bipolar Forceps</span><span aria-hidden="true"><b>Genel Tıbbi Sarf Malzemeler</b><b>Tıbbi Cihazlar</b><b>Bipolar Forceps</b></span></div><p>Hastaneler, klinikler ve sağlık kuruluşları için güvenilir ürünler ve profesyonel çözümler sunuyoruz.</p><div className="home-actions"><Button href="/urunler">Ürünleri Gör</Button><Button href="/iletisim" variant="ghost">Bilgi Talep Et</Button></div></div><div className="hero-visual"><Picture src={img?.src} alt={img?.alt ?? ""} eager sizes="(max-width: 960px) 90vw, 45vw" className="hero-photo"/><div className="hero-badge" aria-hidden="true">G4 · GÜVEN · KALİTE · SAĞLIK ·</div><div className="hero-label">● &nbsp; G4 MEDİKAL</div></div></div></section>;
}
