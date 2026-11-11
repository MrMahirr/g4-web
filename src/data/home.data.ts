/** Anasayfa metinleri — tasarım D4Main ve mevcut siteden birebir (vault: İçerik Envanteri). */
export const homeCopy = {
  hero: {
    tag: "Medikal Ürünler · Hastane Tekstili · Tıbbi Cihazlar",
    /** Üç satır: düz · kor renkli · kontur. */
    lines: ["Sağlık İçin", "Güvenilir", "Çözümler"] as const,
    rotating: ["Genel Tıbbi Sarf Malzemeler", "Tıbbi Cihazlar", "Bipolar Forceps"],
    text: "Hastaneler, klinikler ve sağlık kuruluşları için ihtiyaç duyduğunuz ürün ve çözümleri tek çatı altında sunuyoruz.",
    primary: "Ürünleri Gör",
    secondary: "Bilgi Talep Et",
    imageLabel: "G4 MEDİKAL",
    badgeRing: "G4 MEDİKAL · HASTANE · KLİNİK · LABORATUVAR · ",
  },
  intro: {
    tag: "G4 Medikal",
    statement: {
      before: "G4 olarak sağlık sektörünün ihtiyaç duyduğu",
      accent: "ürün, ekipman ve profesyonel çözümleri",
      after: "tek çatı altında sunuyoruz.",
    },
    paragraphs: [
      "Hastaneler, tıp merkezleri, klinikler, poliklinikler, laboratuvarlar ve sağlık kuruluşlarının ihtiyaçlarına yönelik geniş ürün yelpazemizle hizmet vermekteyiz.",
      "Uzman kadromuz ve güçlü tedarik ağımız sayesinde ürün temin süreçlerini hızlı, güvenilir ve etkin bir şekilde yönetiyor; müşterilerimizin operasyonel verimliliğine katkı sağlıyoruz.",
    ],
  },
  services: {
    tag: "Profesyonel Çözümler",
    title: "Medikal Hizmetlerimiz",
    all: "Tüm Hizmetler",
    readMore: "Devamını Oku",
    closing: "Kaliteli, güvenilir ve yenilikçi hizmet anlayışımızla sektörümüzde fark yaratıyoruz.",
  },
  categories: {
    tag: "Siz Seçin, Biz Sunalım",
    title: "Ürün Grupları",
    text: "Zengin ürün yelpazemizle farklı sektör ve ihtiyaçlara hitap ediyor, yüksek kalite standartlarıyla fark yaratıyoruz.",
  },
  featured: {
    tag: "Ürünler",
    title: "Öne Çıkan Ürünlerimiz",
    all: "Tümünü Göster",
  },
  references: {
    title: "Referanslarımız",
    text: "Güvenimizi ve kalitemizi tercih eden firmalarla gerçekleştirdiğimiz projelerden bazılarını burada inceleyebilirsiniz.",
    all: "Tümünü Görüntüle",
  },
} as const;
