import type { ReferenceItem } from "@/core/types";

/**
 * 7 referans kurum (vault: 03 - Referanslar).
 * Kurum logoları tescilli olduğu için kullanılmaz; her kurum için sektörünü temsil eden Unsplash
 * fotoğrafı (`imageKey`) gösterilir. Logo gelirse `logoKey` doldurulur ve logo öncelik alır.
 */
export const references: ReferenceItem[] = [
  {
    id: "ref-nba-guven",
    imageKey: "referanslar/nba-guven",
    title: "NBA Güven Tıp Merkezi",
    sectorLabel: "Tıp Merkezi",
    isFeaturedOnHome: true,
  },
  {
    id: "ref-guven-ayranci",
    imageKey: "referanslar/guven-ayranci",
    title: "Güven Ayrancı Sağlık Grubu",
    sectorLabel: "Sağlık Grubu",
    isFeaturedOnHome: true,
  },
  {
    id: "ref-ufuk",
    imageKey: "referanslar/ufuk",
    title: "Ufuk Üniversitesi - Dr. Rıdvan Ege Hastanesi",
    sectorLabel: "Üniversite Hastanesi",
    isFeaturedOnHome: true,
  },
  {
    id: "ref-g4-spor",
    imageKey: "referanslar/g4-spor",
    title: "G4 Sağlıklı Spor Kompleksi",
    sectorLabel: "Spor & Sağlıklı Yaşam",
  },
  {
    id: "ref-guven-evde-bakim",
    imageKey: "referanslar/guven-evde-bakim",
    title: "Özel Güven Evde Bakım Sağlık Hizmetleri",
    sectorLabel: "Evde Bakım",
    isFeaturedOnHome: true,
  },
  {
    id: "ref-g4-spa",
    imageKey: "referanslar/g4-spa",
    title: "G4 SPA, Güzellik Ve Estetik Merkezi",
    sectorLabel: "Güzellik & Estetik",
  },
  {
    id: "ref-electro-bismed",
    imageKey: "referanslar/electro-bismed",
    title: "Electro BISMED INSTRUMENTS",
    sectorLabel: "Medikal Üretici",
    isFeaturedOnHome: true,
  },
];
