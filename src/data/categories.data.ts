import type { ProductCategory, SarfSubGroup } from "@/core/types";

/** 7 ürün grubu — sıra, menüdeki ve anasayfa akordeonundaki sıradır. Ürün sayısı veriden hesaplanır. */
export const categories: ProductCategory[] = [
  {
    id: "cat-sarf",
    slug: "genel-tibbi-sarf-malzemeler",
    title: "Genel Tıbbi Sarf Malzemeler",
    imageKey: "hero/kategori-genel-tibbi-sarf-malzemeler",
    domain: "medical",
  },
  {
    id: "cat-tekstil",
    slug: "hastane-tekstili",
    title: "Hastane Tekstili",
    imageKey: "hero/kategori-hastane-tekstili",
    domain: "textile",
  },
  {
    id: "cat-hijyen",
    slug: "temizlik-hijyen-grubu",
    title: "Temizlik/Hijyen Grubu",
    imageKey: "hero/kategori-temizlik-hijyen-grubu",
    domain: "medical",
  },
  {
    id: "cat-cihaz",
    slug: "tibbi-cihazlar",
    title: "Tıbbi Cihazlar",
    imageKey: "hero/kategori-tibbi-cihazlar",
    domain: "medical",
  },
  {
    id: "cat-takviye",
    slug: "gida-takviyesi-vitaminler",
    title: "Gıda Takviyesi/Vitaminler",
    imageKey: "hero/kategori-gida-takviyesi-vitaminler",
    domain: "medical",
  },
  {
    id: "cat-kozmetik",
    slug: "kozmetik-urunler",
    title: "Kozmetik Ürünler",
    imageKey: "hero/kategori-kozmetik-urunler",
    domain: "medical",
  },
  {
    id: "cat-bipolar",
    slug: "bipolar-forceps",
    title: "Bipolar Forceps",
    imageKey: "hero/kategori-bipolar-forceps",
    domain: "medical",
  },
];

/** "Genel Tıbbi Sarf Malzemeler" içindeki alt grup filtreleri (gösterim sırasıyla). */
export const sarfSubGroups: { slug: SarfSubGroup; title: string }[] = [
  { slug: "siringa-igne", title: "Şırınga & İğne" },
  { slug: "sonda-kateter", title: "Sonda & Kateter" },
  { slug: "solunum-anestezi", title: "Solunum & Anestezi" },
  { slug: "cerrahi-pansuman", title: "Cerrahi & Pansuman" },
  { slug: "kardiyoloji-kagit", title: "Kardiyoloji & Kağıt" },
  { slug: "laboratuvar-tup", title: "Laboratuvar & Tüp" },
  { slug: "koruyucu-diger", title: "Koruyucu & Diğer" },
];

/** Alt grup filtresinin geçerli olduğu kategori. */
export const SARF_CATEGORY_SLUG = "genel-tibbi-sarf-malzemeler";
