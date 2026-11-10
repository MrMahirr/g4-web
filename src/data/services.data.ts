import type { ServiceItem } from "@/core/types";

/** 4 hizmet — metinler mevcut siteden birebir (vault: 08 - Hizmet Detay). Sıra, menüdeki sıradır. */
export const services: ServiceItem[] = [
  {
    id: "svc-insaat",
    slug: "g4-yatirim-ve-insaat-faaliyetleri",
    title: "G4 Yatırım Ve İnşaat Faaliyetleri",
    shortDescription:
      "Sağlık kurumlarının ihtiyaçlarına uygun konsept geliştirme, projelendirme ve uygulama süreçlerinde uçtan uca hizmet sunmaktayız.",
    paragraphs: [
      "G4 Yatırım İnşaat ve Danışmanlık olarak; sağlık kurumlarının ihtiyaçlarına uygun konsept geliştirme, projelendirme ve uygulama süreçlerinde uçtan uca hizmet sunmaktayız. Hastane, tıp merkezi, poliklinik ve sağlık tesislerinin konsept, mimari ve uygulama projeleri uzman ekiplerimiz tarafından hazırlanmakta; projeler ergonomik, işlevsel ve ilgili mevzuat ile ruhsatlandırma şartlarına uygun hale getirilmektedir.",
      "Bununla birlikte mevcut sağlık tesislerinin tadilat, yenileme ve dönüşüm projeleri profesyonel olarak planlanmakta, uygulama ve yapım süreçleri titizlikle yönetilmektedir. G4, sağlık yatırımlarının planlama aşamasından anahtar teslim uygulamaya kadar tüm süreçlerinde güvenilir çözüm ortağı olarak hizmet vermektedir.",
    ],
    imageKey: "hizmetler/insaat",
    domain: "construction",
  },
  {
    id: "svc-arac",
    slug: "arac-kiralama-hizmetleri",
    title: "Araç Kiralama Hizmetleri",
    shortDescription:
      "Bireysel ve kurumsal müşterilerimize güvenilir, konforlu ve ekonomik ulaşım çözümleri sunuyoruz.",
    paragraphs: [
      "G4 Araç Kiralama Hizmetleri olarak, bireysel ve kurumsal müşterilerimize güvenilir, konforlu ve ekonomik ulaşım çözümleri sunuyoruz. Geniş araç filomuz ile günlük, haftalık ve uzun dönem kiralama ihtiyaçlarınıza profesyonel hizmet anlayışıyla cevap veriyoruz.",
      "Bakımları düzenli olarak yapılan araçlarımız, güvenlik ve konfor standartlarına uygun şekilde sizlere teslim edilir. İş seyahatlerinden özel organizasyonlara, şehir içi kullanımdan uzun yolculuklara kadar her ihtiyaca uygun araç seçenekleriyle yanınızdayız.",
      "Müşteri memnuniyetini ön planda tutan hizmet anlayışımız, hızlı rezervasyon süreçlerimiz ve uygun fiyat politikamız ile araç kiralama deneyiminizi kolay, güvenli ve keyifli hale getiriyoruz.",
    ],
    imageKey: "hizmetler/arac-kiralama",
    domain: "fleet",
  },
  {
    id: "svc-tekstil",
    slug: "g4-hastane-tekstili",
    title: "G4 Hastane Tekstili",
    shortDescription:
      "Kaliteli, hijyenik ve dayanıklı hastane tekstili ürünleriyle sağlık kuruluşlarının ihtiyaçlarına profesyonel çözümler sunuyoruz.",
    paragraphs: [
      "Kaliteli, hijyenik ve dayanıklı hastane tekstili ürünleriyle sağlık kuruluşlarının ihtiyaçlarına profesyonel çözümler sunuyoruz.",
    ],
    imageKey: "hizmetler/hastane-tekstili",
    domain: "textile",
    relatedCategorySlug: "hastane-tekstili",
    isFeaturedOnHome: true,
  },
  {
    id: "svc-medikal",
    slug: "g4-medikal-faaliyetler",
    title: "G4 Medikal Faaliyetler",
    shortDescription:
      "G4 Medikal olarak sağlık sektörünün ihtiyaç duyduğu ürün, ekipman ve profesyonel çözümleri tek çatı altında sunuyoruz.",
    paragraphs: [
      "G4 Medikal olarak sağlık sektörünün ihtiyaç duyduğu ürün, ekipman ve profesyonel çözümleri tek çatı altında sunuyoruz. Hastaneler, tıp merkezleri, klinikler, poliklinikler, laboratuvarlar ve sağlık kuruluşlarının ihtiyaçlarına yönelik geniş ürün yelpazemizle hizmet vermekteyiz.",
      "Kalite, güvenilirlik ve sürdürülebilir hizmet anlayışını temel alan firmamız; medikal sarf malzemelerinden hastane tekstiline, tıbbi cihazlardan sağlık yapılarının projelendirilmesine kadar birçok alanda çözüm ortağı olarak faaliyet göstermektedir. Sağlık sektöründeki gelişmeleri yakından takip ederek, kurumların ihtiyaçlarına uygun yenilikçi ve ekonomik çözümler sunmayı hedefliyoruz.",
      "Uzman kadromuz ve güçlü tedarik ağımız sayesinde ürün temin süreçlerini hızlı, güvenilir ve etkin bir şekilde yönetiyor; müşterilerimizin operasyonel verimliliğine katkı sağlıyoruz. Her projede kalite standartlarını ön planda tutarak, sağlık hizmetlerinin daha güvenli ve daha verimli sunulmasına destek oluyoruz.",
    ],
    imageKey: "hizmetler/medikal",
    domain: "medical",
    isFeaturedOnHome: true,
  },
];
