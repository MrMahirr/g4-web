import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/shared/Picture";
import { CountUp } from "@/components/motion/CountUp";
import { images } from "@/data/images.manifest";
import type { StatItem } from "@/core/types";
import { Kicker } from "./Kicker";
const asset = (key: string) => images[key];

export function Introduction({ stats }: { stats: StatItem[] }) {
 const img = asset("ana/medikal-perde");
 return <section className="home-wrap home-section"><Kicker>G4 Medikal</Kicker><h2 className="intro-heading"><span className="intro-word">Sağlık</span>{" "}<span className="intro-word">için</span>{" "}<span className="intro-word">güvenle,</span>{" "}<em><span className="intro-word">gelecek</span>{" "}<span className="intro-word">için</span>{" "}<span className="intro-word">birlikte.</span></em></h2><div className="intro-grid"><Picture src={img?.src} alt={img?.alt ?? ""} curtain sizes="(max-width: 960px) 100vw, 50vw" className="intro-photo"/><div className="intro-copy"><p>Sağlık sektörünün ihtiyaç duyduğu ürün, ekipman ve profesyonel çözümleri tek çatı altında sunuyoruz.</p><p>Kalite ve güveni odağımıza alıyor, sağlık kuruluşlarının yanında güçlü bir çözüm ortağı olarak yer alıyoruz.</p><div className="home-actions"><Button href="/hizmet/g4-medikal-faaliyetler" variant="coal">G4 Medikal Faaliyetler</Button><Button href="/hizmet/g4-hastane-tekstili" variant="ghost" arrow="none">G4 Hastane Tekstili</Button></div></div></div><div className="home-stats">{stats.map((s,i)=><div key={s.label}><span>{s.kicker}</span><strong className={i===3 ? "accent" : ""}><CountUp value={s.value}/><small>+</small></strong><p>{s.label}</p></div>)}</div></section>;
}
