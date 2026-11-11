import type { CompanyInfo } from "@/core/types";

/** İletişim bilgileri tek kaynak: header, footer, iletişim sayfası ve JSON-LD buradan okur. */
export const company: CompanyInfo = {
  legalName: "G4",
  shortName: "G4",
  address: {
    full: "Remzi Oğuz Arık Mahallesi Paris Caddesi Paris Apartmanı No 64/5 Çankaya/Ankara",
    street: "Paris Caddesi No 64/5",
    district: "Çankaya",
    city: "Ankara",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Paris+Caddesi+64%2F5+%C3%87ankaya+Ankara",
    mapsEmbedUrl: "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1sParis+Caddesi+64/5+%C3%87ankaya+Ankara!6i16!3m1!1str!5m1!1str",
  },
  phone: { display: "0539 516 3606", tel: "+905395163606" },
  email: "satinalma@g4.com.tr",
  whatsappUrl: "https://wa.me/905395163606",
  socials: [
    { channel: "whatsapp", label: "WhatsApp", href: "https://wa.me/905395163606" },
    // Telegram ve Instagram bağlantıları sonradan verilecek (plan: Ç7).
    { channel: "telegram", label: "Telegram", href: null },
    { channel: "instagram", label: "Instagram", href: null },
    // Şimdilik Güven Hastanesi hesapları; G4'ün kendi hesabı verilirse değişecek (plan: K6).
    { channel: "x", label: "X", href: "https://x.com/guvenhastanesi" },
    { channel: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/guven-hastanesi" },
  ],
  stats: [
    { value: 858, kicker: "Memnuniyet Oranı", label: "Mutlu Müşteri" },
    { value: 650, kicker: "Tamamlanan Siparişler", label: "Sipariş" },
    { value: 567, kicker: "Ürün Çeşidi", label: "Ürün" },
    { value: 28, kicker: "Satılan Paketler", label: "Paket Satışı" },
  ],
};
