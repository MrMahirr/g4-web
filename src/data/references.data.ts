import type { ReferenceItem } from "@/core/types";

/**
 * 7 referans kurum (vault: 03 - Referanslar).
 * Kurum logoları tescilli olduğu için stok görselle karşılanamaz; logolar gelene kadar
 * kurum adı tipografik gösterilir (plan: K2). Logo gelince `logoKey` doldurulur.
 */
export const references: ReferenceItem[] = [
  { id: "ref-nba-guven", title: "NBA Güven Tıp Merkezi", sectorLabel: "Tıp Merkezi", isFeaturedOnHome: true },
  { id: "ref-guven-ayranci", title: "Güven Ayrancı Sağlık Grubu", sectorLabel: "Sağlık Grubu", isFeaturedOnHome: true },
  {
    id: "ref-ufuk",
    title: "Ufuk Üniversitesi - Dr. Rıdvan Ege Hastanesi",
    sectorLabel: "Üniversite Hastanesi",
    isFeaturedOnHome: true,
  },
  { id: "ref-g4-spor", title: "G4 Sağlıklı Spor Kompleksi", sectorLabel: "Spor & Sağlıklı Yaşam" },
  {
    id: "ref-guven-evde-bakim",
    title: "Özel Güven Evde Bakım Sağlık Hizmetleri",
    sectorLabel: "Evde Bakım",
    isFeaturedOnHome: true,
  },
  { id: "ref-g4-spa", title: "G4 SPA, Güzellik Ve Estetik Merkezi", sectorLabel: "Güzellik & Estetik" },
  { id: "ref-electro-bismed", title: "Electro BISMED INSTRUMENTS", sectorLabel: "Medikal Üretici", isFeaturedOnHome: true },
];
