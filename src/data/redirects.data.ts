/**
 * Eski siteden (g4.com.tr) kalan adreslerin kalıcı yönlendirmeleri — plan 8.3.
 * `next.config.ts` bu dosyayı doğrudan içeri aktarır; bu yüzden burada `@/` takma adı kullanılmaz.
 *
 * Kaynak: canlı sitenin sitemap.xml'i (130 adres, 11.11.2026) + vault Site Haritası.
 * Aynı yolda devam eden adresler (ürün, kategori, hizmet, haber, kurumsal sayfalar) burada yoktur.
 * Hepsi 308 (kalıcı) döner; arama motoru sıralamayı yeni adrese taşır.
 */

export type LegacyRedirect = { source: string; destination: string };

/** Eski sitedeki mükerrer ürün URL'leri → kanonik slug. */
export const legacyProductSlugs: Record<string, string> = {
  "dezenfektanlar-180": "dezenfektanlar",
};

/** Eski hizmet slug'ları → yeni slug. */
export const legacyServiceSlugs: Record<string, string> = {
  "g4-yatirim-insaat-ve-danismanlik-a-s": "g4-yatirim-ve-insaat-faaliyetleri",
};

export const legacyRedirects: LegacyRedirect[] = [
  { source: "/index.html", destination: "/" },

  // Sayfalama: yeni sitede tek sayfa (kategoride filtre ve arama var).
  { source: "/urunler/:sayfa(\\d+)", destination: "/urunler" },
  { source: "/haberler/:sayfa(\\d+)", destination: "/haberler" },
  { source: "/urun-kategori/:slug/:sayfa(\\d+)", destination: "/urun-kategori/:slug" },

  ...Object.entries(legacyProductSlugs).map(([from, to]) => ({ source: `/urun/${from}`, destination: `/urun/${to}` })),
  ...Object.entries(legacyServiceSlugs).map(([from, to]) => ({ source: `/hizmet/${from}`, destination: `/hizmet/${to}` })),

  // Referans detayları yok; tek sayfada ızgara.
  { source: "/referans/:slug", destination: "/referanslar" },

  // Projeler v1'de yok (plan K4).
  { source: "/projeler", destination: "/hizmetler" },
  { source: "/proje-kategori/:slug", destination: "/hizmetler" },
  { source: "/proje/:slug", destination: "/hizmetler" },

  // Şablondan kalan kurumsal sayfalar (yeni sitede karşılığı yok) → Hakkımızda.
  { source: "/belgelerimiz", destination: "/icerik/hakkimizda" },
  { source: "/ekibimiz", destination: "/icerik/hakkimizda" },
  { source: "/musteri-gorusleri", destination: "/icerik/hakkimizda" },

  // Fuar foto/video galerileri → Haberler.
  { source: "/foto-galeri", destination: "/haberler" },
  { source: "/foto/:slug", destination: "/haberler" },
  { source: "/video-galeri", destination: "/haberler" },
  { source: "/video/:slug", destination: "/haberler" },

  // E-ticaret şablonundan kalan sözleşmeler (sitede üyelik/sipariş yok) → en yakın yasal metin.
  { source: "/icerik/siparis-sozlesmesi", destination: "/icerik/kvkk-aydinlatma-metni" },
  { source: "/icerik/uyelik-sozlesmesi", destination: "/icerik/kvkk-aydinlatma-metni" },
  { source: "/icerik/ticari-elektronik-ileti-onay-metni", destination: "/icerik/kvkk-aydinlatma-metni" },
];
