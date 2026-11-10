import type { ImageEntry, ImageKey } from "@/core/types";
import productImages from "@/data/g4-product-images.json";
import categoryImages from "@/data/g4-category-images.json";
import { categories } from "@/data/categories.data";
import { news } from "@/data/news.data";
import { products } from "@/data/products.data";
import { services } from "@/data/services.data";

/**
 * Görsel manifesti — sitedeki tüm fotoğrafların tek kaynağı.
 * Anahtar kuralı: "<klasör>/<slug>" → dosya public/images/<klasör>/<slug>.jpg
 *   urunler/<ürün slug> · kategoriler/<kategori slug> · hizmetler/<kısa ad>
 *   haberler/<haber slug>[-n] · hero/ana · ana/medikal-perde · menu/kurumsal · menu/hizmetler
 *   kurumsal/hakkimizda-1 · kurumsal/kariyer · kurumsal/sss · genel/404 · genel/og
 *
 * Faz 2'de (Unsplash) doldurulacak. Anahtarı burada olmayan görsel için bileşenler
 * "Görsel alanı" şablonunu çizer; site görselsiz de eksiksiz çalışır.
 */
export const images: Record<ImageKey, ImageEntry> = {
  "hero/ana": {
    src: "/images/hero/ana.jpg",
    alt: "Temiz ve aydınlık bir hastane koridoru",
    width: 1200,
    height: 1500,
    credit: {
      site: "Unsplash · Tasha Kostyuk",
      photographer: "Tasha Kostyuk",
      url: "https://unsplash.com/photos/empty-hospital-corridor-with-benches-and-doors-Pk-KuizxQv8",
    },
  },
  "hizmetler/medikal": {
    src: "/images/hizmetler/medikal.jpg",
    alt: "Hastane odasında yatak ve medikal ekipmanlar",
    width: 1200,
    height: 900,
    credit: {
      site: "Unsplash · Annie Spratt",
      photographer: "Annie Spratt",
      url: "https://unsplash.com/photos/a-hospital-room-with-a-bed-and-medical-equipment-RfanFy_lHp8",
    },
  },
  "kategoriler/genel-tibbi-sarf-malzemeler": {
    src: "/images/kategoriler/genel-tibbi-sarf-malzemeler.jpg",
    alt: "Raf üzerinde sıralı tıbbi şırıngalar",
    width: 1000,
    height: 1000,
    credit: {
      site: "Unsplash · Ibrahim Boran",
      photographer: "Ibrahim Boran",
      url: "https://unsplash.com/photos/assorted-color-syringes-on-clear-glass-rack-zsKFQs2kDpM",
    },
  },
  "ana/medikal-perde": {
    src: "/images/hizmetler/medikal.jpg",
    alt: "Hastane odasında yatak ve medikal ekipmanlar",
    width: 1200,
    height: 900,
    credit: {
      site: "Unsplash · Annie Spratt",
      photographer: "Annie Spratt",
      url: "https://unsplash.com/photos/a-hospital-room-with-a-bed-and-medical-equipment-RfanFy_lHp8",
    },
  },
  "hizmetler/insaat": {
    src: "/images/hizmetler/insaat.jpg",
    alt: "Masa üzerinde mimari ve inşaat planları",
    width: 1200,
    height: 900,
    credit: {
      site: "Unsplash · Marina Zvada",
      photographer: "Marina Zvada",
      url: "https://unsplash.com/photos/architectural-blueprints-spread-out-on-a-surface-fNxmdlYHRm8",
    },
  },
  "menu/kurumsal": {
    src: "/images/menu/kurumsal.jpg",
    alt: "Geometrik cepheli çağdaş cam ofis binası",
    width: 900,
    height: 1100,
    credit: {
      site: "Unsplash · Edgar",
      photographer: "Edgar",
      url: "https://unsplash.com/photos/modern-building-with-geometric-lines-and-glass-XALyj0z5bgw",
    },
  },
  "urunler/bipolar-forceps": {
    src: "/images/urunler/bipolar-forceps.jpg",
    alt: "Mavi steril örtü üzerinde cerrahi makas ve aletler",
    width: 1000,
    height: 1000,
    representative: true,
    credit: {
      site: "Unsplash · Jonathan Borba",
      photographer: "Jonathan Borba",
      url: "https://unsplash.com/photos/a-pile-of-surgical-scissors-on-a-blue-cloth-ucnh3ldFKcE",
    },
  },
  "kategoriler/bipolar-forceps": {
    src: "/images/kategoriler/bipolar-forceps.jpg",
    alt: "Mavi steril örtü üzerinde cerrahi forseps ve makaslar (temsili)",
    width: 1000,
    height: 1000,
    representative: true,
    credit: { site: "Unsplash · Jonathan Borba", photographer: "Jonathan Borba", url: "https://unsplash.com/photos/a-pile-of-surgical-scissors-on-a-blue-cloth-ucnh3ldFKcE" },
  },
  "kategoriler/temizlik-hijyen-grubu": {
    src: "/images/kategoriler/temizlik-hijyen-grubu.jpg",
    alt: "Elde tutulan el antiseptiği şişesi",
    width: 1000,
    height: 1000,
    credit: { site: "Unsplash · Kelly Sikkema", photographer: "Kelly Sikkema", url: "https://unsplash.com/photos/hand-sanitizer-bottle-V_-vbcHMATA" },
  },
  "kategoriler/tibbi-cihazlar": {
    src: "/images/kategoriler/tibbi-cihazlar.jpg",
    alt: "Dalga biçimleri gösteren tıbbi hasta monitörü",
    width: 1000,
    height: 1000,
    credit: { site: "Unsplash · Jair Lázaro", photographer: "Jair Lázaro", url: "https://unsplash.com/photos/medical-monitor-displaying-vital-signs-0lrJo37r6Nk" },
  },
  "kategoriler/gida-takviyesi-vitaminler": {
    src: "/images/kategoriler/gida-takviyesi-vitaminler.jpg",
    alt: "Beyaz kapaklı şeffaf takviye kapsülü şişesi",
    width: 1000,
    height: 1000,
    credit: { site: "Unsplash · NutraSeller Manufacturing", photographer: "NutraSeller Manufacturing", url: "https://unsplash.com/photos/clear-bottle-filled-with-capsules-and-blank-label-4zAj4yrcAIc" },
  },
  "kategoriler/kozmetik-urunler": {
    src: "/images/kategoriler/kozmetik-urunler.jpg",
    alt: "Minimal bir sabun şişesi ve dağıtıcı",
    width: 1000,
    height: 1000,
    credit: { site: "Unsplash · Valeriia Miller", photographer: "Valeriia Miller", url: "https://unsplash.com/photos/a-bottle-of-soap-sitting-on-top-of-a-soap-dispenser-sBqXnldQ9ak" },
  },
  "hizmetler/arac-kiralama": {
    src: "/images/hizmetler/arac-kiralama.jpg",
    alt: "Yağmurlu havada park edilmiş koyu renkli otomobil",
    width: 1200,
    height: 900,
    credit: { site: "Unsplash · Andreas Rasmussen", photographer: "Andreas Rasmussen", url: "https://unsplash.com/photos/parked-black-vehicle-during-daytime-MBW3F1jEhh0" },
  },
  "menu/hizmetler": {
    src: "/images/menu/hizmetler.jpg",
    alt: "Mavi ameliyat kıyafetli cerrahlar ameliyathanede çalışıyor",
    width: 900,
    height: 1100,
    credit: { site: "Unsplash · Ritu Chauhan", photographer: "Ritu Chauhan", url: "https://unsplash.com/photos/surgeons-in-blue-scrubs-operate-on-a-patient-with-monitors-displaying-medical-data-P9w9U_VyshQ" },
  },
};


// Hakkımızda kapağı: kurumsal menüdeki lisanslı bina fotoğrafı (aynı Unsplash kaynağı).
images["kurumsal/hakkimizda-1"] = { ...images["menu/kurumsal"], alt: "Geometrik cepheli çağdaş kurumsal bina" };

// Mevcut G4 kataloğundaki görseller slug ile eşleştirilir.
for (const product of products) {
  const src = (productImages as Record<string, string>)[product.slug];
  if (src) images[product.imageKey] = { src, alt: product.name, width: 1000, height: 1000 };
}
for (const category of categories) {
  const src = (categoryImages as Record<string, string>)[category.slug];
  if (src) images[category.imageKey] = { src, alt: category.title, width: 1000, height: 1000 };
}

/** Tüm kullanılan görsel yuvalarının durumu. Eksik dosyalar açıkça şablon olarak işaretlenir. */
export type ImageSlotStatus = "available" | "representative" | "unavailable-template";
export const imageSlotStatus: Record<string, { status: ImageSlotStatus; note: string }> = {};
for (const [key, image] of Object.entries(images)) {
  imageSlotStatus[key] = {
    status: image.representative ? "representative" : "available",
    note: image.representative ? "Temsili stok görsel; birebir ürün fotoğrafı değildir." : "Dosya mevcut.",
  };
}
const expectedKeys = [
  ...categories.map((item) => item.imageKey),
  ...services.map((item) => item.imageKey),
  ...products.map((item) => item.imageKey),
  ...news.flatMap((item) => [item.imageKey, ...item.galleryKeys]),
  "ana/medikal-perde", "kurumsal/hakkimizda-1", "kurumsal/hakkimizda-2",
  "kurumsal/kariyer", "kurumsal/sss", "genel/404", "genel/og",
];
for (const key of expectedKeys) {
  if (!imageSlotStatus[key]) {
    imageSlotStatus[key] = {
      status: "unavailable-template",
      note: "Uygun ve doğrulanmış kaynak bulunamadı; arayüz görsel şablonu gösterir.",
    };
  }
}
