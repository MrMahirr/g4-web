import type { ImageEntry, ImageKey } from "@/core/types";
import productImages from "@/data/g4-product-images.json";
import { categories } from "@/data/categories.data";
import { news } from "@/data/news.data";
import { products } from "@/data/products.data";
import { services } from "@/data/services.data";

/**
 * Görsel manifesti — sitedeki tüm fotoğrafların tek kaynağı.
 * Anahtar kuralı: "<klasör>/<slug>" → dosya public/images/<klasör>/<slug>.webp (orijinali gorsel-arsivi/ içinde; `npm run images` üretir)
 *   urunler/<ürün slug> · hero/kategori-<kategori slug> · hizmetler/<kısa ad>
 *   haberler/<haber slug>[-n] · hero/ana · ana/medikal-perde · menu/kurumsal · menu/hizmetler
 *   kurumsal/hakkimizda-1 · kurumsal/kariyer · kurumsal/sss · genel/404 · genel/og
 *
 * Faz 2'de (Unsplash) doldurulacak. Anahtarı burada olmayan görsel için bileşenler
 * "Görsel alanı" şablonunu çizer; site görselsiz de eksiksiz çalışır.
 */
export const images: Record<ImageKey, ImageEntry> = {
  "hero/ana": {
    src: "/images/hero/anasayfa.webp",
    alt: "Aydınlık, modern bir medikal teknoloji karşılama salonu",
    width: 2000,
    height: 1116,
  },
  "hero/hakkimizda": {
    src: "/images/hero/hakkimizda-stetoskop.webp",
    alt: "Beyaz bir masada mavi stetoskop ve dizüstü bilgisayar",
    width: 2000,
    height: 1276,
    credit: {
      site: "Pexels · Negative Space",
      photographer: "Negative Space",
      url: "https://www.pexels.com/photo/48604/",
    },
  },
  "hero/hakkimizda-salon": {
    src: "/images/hero/hakkimizda.webp",
    alt: "Ahşap ve beton detaylı, “Güven” yazılı aydınlık G4 medikal mağaza salonu",
    width: 2000,
    height: 1116,
  },
  "hero/iletisim": {
    src: "/images/hero/iletisim.webp",
    alt: "Aydınlık ve bitkilerle çevrili hastane karşılama alanı",
    width: 2000,
    height: 1116,
  },
  "hero/referanslar": {
    src: "/images/hero/referanslar-el-sikisma.webp",
    alt: "İki iş insanının el sıkışması",
    width: 2000,
    height: 1335,
    credit: {
      site: "Unsplash · Cytonn Photography",
      photographer: "Cytonn Photography",
      url: "https://unsplash.com/photos/two-people-shaking-hands-n95VMLxqM2I",
    },
  },
  "hero/haberler": {
    src: "/images/hero/haberler-ar-ge-laboratuvar.webp",
    alt: "Aydınlık, modern bir AR-GE laboratuvarında mikroskop ve test cihazları",
    width: 2000,
    height: 1333,
    credit: {
      site: "Unsplash · Trnava University in Trnava",
      photographer: "Trnava University in Trnava",
      url: "https://unsplash.com/photos/1602052577122-f73b9710adba",
    },
  },
  "hero/kariyer": {
    src: "/images/hero/kariyer.webp",
    alt: "Aydınlık, modern bir ofis koridorunda sohbet eden iş arkadaşları",
    width: 2000,
    height: 1125,
    credit: {
      site: "Unsplash · Vitaly Gariev",
      photographer: "Vitaly Gariev",
      url: "https://unsplash.com/photos/6hb3u7YOFFk",
    },
  },
  "hero/hizmetler": {
    src: "/images/hero/hizmetler-tansiyon.webp",
    alt: "Mavi önlüklü bir sağlık çalışanı hastanın koluna tansiyon ölçümü yapıyor",
    width: 2000,
    height: 1333,
    credit: {
      site: "Unsplash · Julia Taubitz",
      photographer: "Julia Taubitz",
      url: "https://unsplash.com/photos/vN5s_G5SPkY",
    },
  },
  "hero/hizmet-insaat": {
    src: "/images/hero/hizmetler-insaat-iskele.webp",
    alt: "Mavi gökyüzü altında kalıp ve iskele destekleriyle yükselen betonarme çok katlı yapı",
    width: 1648,
    height: 2000,
    credit: {
      site: "Unsplash · Tolu Olubode",
      photographer: "Tolu Olubode",
      url: "https://unsplash.com/photos/PlBsJ5MybGc",
    },
  },
  "hero/hizmet-arac-kiralama": {
    src: "/images/hero/hizmetler-arac-kiralama.webp",
    alt: "Kızıl kayalıklar arasında kıvrılan yolda ilerleyen gri SUV",
    width: 1333,
    height: 2000,
    credit: {
      site: "Unsplash · clement proust",
      photographer: "clement proust",
      url: "https://unsplash.com/photos/ms0G5L_wN4U",
    },
  },
  "hero/hizmet-hastane-tekstili": {
    src: "/images/hero/hizmetler-hastane-tekstili.webp",
    alt: "Beyaz çarşaflı, mavi örtülü ve pembe paravanlı sıralı hastane yatakları",
    width: 2000,
    height: 1251,
    credit: {
      site: "Unsplash · Adhy Savala",
      photographer: "Adhy Savala",
      url: "https://unsplash.com/photos/zbpgmGe27p8",
    },
  },
  "hero/hizmet-medikal": {
    src: "/images/hero/hizmetler-ameliyathane.webp",
    alt: "Ameliyat masası, tavan lambaları ve monitörlerle donatılmış aydınlık ameliyathane",
    width: 2000,
    height: 1333,
    credit: {
      site: "Unsplash · Marcel Scholte",
      photographer: "Marcel Scholte",
      url: "https://unsplash.com/photos/LPurJnihmQI",
    },
  },
  "hero/urunler": {
    src: "/images/hero/urunler.webp",
    alt: "Mavi steril örtü üzerinde dizili cerrahi pensler, neşter ve gazlı bez",
    width: 2000,
    height: 1333,
    credit: {
      site: "Unsplash · César Badilla Miranda",
      photographer: "César Badilla Miranda",
      url: "https://unsplash.com/photos/Z6sbbTdPJTY",
    },
  },
  "hero/kategori-bipolar-forceps": {
    src: "/images/hero/bipolar-forceps.webp",
    alt: "Mavi steril örtü üzerinde dizili bipolar forsepsler, penset uçları ve bağlantı kabloları",
    width: 2000,
    height: 1116,
  },
  "hero/kategori-gida-takviyesi-vitaminler": {
    src: "/images/hero/gidda-takviye.webp",
    alt: "Mutfak tezgâhında vitamin ve takviye şişeleri, kapsüller, portakal ve bitki çayları",
    width: 2000,
    height: 1116,
  },
  "hero/kategori-hastane-tekstili": {
    src: "/images/hero/hastane-tekstil.webp",
    alt: "Paslanmaz tezgâhta düzenli katlanmış hastane çarşafları, hasta önlükleri ve steril örtüler",
    width: 2000,
    height: 1116,
  },
  "hero/kategori-kozmetik-urunler": {
    src: "/images/hero/kozmetik.webp",
    alt: "Mermer yüzeyde far paleti, fondöten, ruj, makyaj fırçaları ve ayna",
    width: 2000,
    height: 1116,
  },
  "hero/kategori-temizlik-hijyen-grubu": {
    src: "/images/hero/temizlik-hijyen.webp",
    alt: "Temizlik arabası, dezenfektan şişeleri, mendiller, eldiven ve maske kutuları",
    width: 2000,
    height: 1116,
  },
  "hero/kategori-tibbi-cihazlar": {
    src: "/images/hero/tibbi-cigazlar.webp",
    alt: "Hasta monitörleri, defibrilatörler ve biyomedikal cihazların sergilendiği aydınlık showroom",
    width: 2000,
    height: 1116,
  },
  "hero/kategori-genel-tibbi-sarf-malzemeler": {
    src: "/images/hero/tibbi-sarf.webp",
    alt: "Tezgâhta nitril eldiven, cerrahi maske, gazlı bez, şırınga ve steril paketler",
    width: 2000,
    height: 1116,
  },
  "hero/sorular": {
    src: "/images/hero/sorular.webp",
    alt: "Medikal cihaz ve ürünlerin sergilendiği aydınlık showroom",
    width: 2000,
    height: 1116,
  },
  "hizmetler/medikal": {
    src: "/images/hero/medical.webp",
    alt: "Hastane odasında paslanmaz tezgâh üzerinde tansiyon aleti, stetoskop, eldiven, serum seti ve hasta monitörü",
    width: 2000,
    height: 1493,
  },
  "ana/medikal-perde": {
    src: "/images/hero/medical.webp",
    alt: "Hastane odasında paslanmaz tezgâh üzerinde tansiyon aleti, stetoskop, eldiven, serum seti ve hasta monitörü",
    width: 2000,
    height: 1493,
  },
  "hizmetler/insaat": {
    src: "/images/hizmetler/insaat.webp",
    alt: "Masa üzerinde mimari ve inşaat planları",
    width: 1200,
    height: 900,
    credit: {
      site: "Unsplash · Marina Zvada",
      photographer: "Marina Zvada",
      url: "https://unsplash.com/photos/architectural-blueprints-spread-out-on-a-surface-fNxmdlYHRm8",
    },
  },
  "hizmetler/hastane-tekstili": {
    src: "/images/hizmetler/hastane-tekstili-carsaf.webp",
    alt: "Perdeli hastane koğuşunda ön planda mavi hastane çarşafı, arkada yataklar",
    width: 1800,
    height: 1200,
    credit: {
      site: "Unsplash · Levi Meir Clancy",
      photographer: "Levi Meir Clancy",
      url: "https://unsplash.com/photos/ZCJHlRcoiH8",
    },
  },
  "referanslar/nba-guven": {
    src: "/images/referanslar/nba-guven.webp",
    alt: "Pencereli aydınlık bir bekleme salonunda sıralanmış kırmızı sandalyeler",
    width: 1500,
    height: 2000,
    representative: true,
    credit: {
      site: "Unsplash · Adhitya Sibikumar",
      photographer: "Adhitya Sibikumar",
      url: "https://unsplash.com/photos/three-red-chairs-in-a-waiting-room-by-window-2d3cHa8RMSY",
    },
  },
  "referanslar/guven-ayranci": {
    src: "/images/referanslar/guven-ayranci.webp",
    alt: "Cam cepheli, ağaçlarla çevrili modern bir hastane binası",
    width: 1360,
    height: 1334,
    representative: true,
    credit: {
      site: "Unsplash · Acton Crawford",
      photographer: "Acton Crawford",
      url: "https://unsplash.com/photos/brown-and-white-concrete-building-near-green-trees-under-blue-sky-during-daytime-8PB_TFEy2XQ",
    },
  },
  "referanslar/ufuk": {
    src: "/images/referanslar/ufuk.webp",
    alt: "Aydınlık bir hastane koridoru ve bekleme koltukları",
    width: 2000,
    height: 1500,
    representative: true,
    credit: {
      site: "Unsplash · Tasha Kostyuk",
      photographer: "Tasha Kostyuk",
      url: "https://unsplash.com/photos/empty-hospital-corridor-with-benches-and-doors-Pk-KuizxQv8",
    },
  },
  "referanslar/g4-spor": {
    src: "/images/referanslar/g4-spor.webp",
    alt: "Geniş pencereli, koşu bantlı modern spor salonu",
    width: 2000,
    height: 1125,
    representative: true,
    credit: {
      site: "Unsplash · Aalo Lens",
      photographer: "Aalo Lens",
      url: "https://unsplash.com/photos/modern-gym-with-treadmills-and-large-windows-uYnHRrm63uo",
    },
  },
  "referanslar/guven-evde-bakim": {
    src: "/images/referanslar/guven-evde-bakim.webp",
    alt: "Gülümseyen bir hemşire ve yaşlı hasta",
    width: 2000,
    height: 1414,
    representative: true,
    credit: {
      site: "Unsplash · Age Cymru",
      photographer: "Age Cymru",
      url: "https://unsplash.com/photos/nurse-smiling-with-elderly-patient-in-room-dMhB7w99ju8",
    },
  },
  "referanslar/g4-spa": {
    src: "/images/referanslar/g4-spa.webp",
    alt: "Loş ve sıcak ışıklı, taş bankları olan modern hamam–buhar odası",
    width: 2000,
    height: 1334,
    representative: true,
    credit: {
      site: "Unsplash · Dominik Neuner",
      photographer: "Dominik Neuner",
      url: "https://unsplash.com/photos/a-modern-steam-room-with-a-candle-and-ambient-lighting-9qYFu1NzpS8",
    },
  },
  "referanslar/electro-bismed": {
    src: "/images/referanslar/electro-bismed.webp",
    alt: "Cihaz ve cam malzemelerle dolu aydınlık bir laboratuvar tezgâhı",
    width: 1333,
    height: 2000,
    representative: true,
    credit: {
      site: "Unsplash · Mauro Romero",
      photographer: "Mauro Romero",
      url: "https://unsplash.com/photos/a-clean-laboratory-bench-with-scientific-equipment-and-glassware-HNtgzXa8dc8",
    },
  },
  "menu/kurumsal": {
    src: "/images/menu/kurumsal-merdiven.webp",
    alt: "Cam duvarlı, bitkili ve ışık dolu modern bir merdiven holü",
    width: 1639,
    height: 2000,
    credit: {
      site: "Unsplash · El S",
      photographer: "El S",
      url: "https://unsplash.com/photos/HaS2oee610Y",
    },
  },
  "urunler/bipolar-forceps": {
    src: "/images/urunler/bipolar-forceps.webp",
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
  "hizmetler/arac-kiralama": {
    src: "/images/hizmetler/arac-kiralama.webp",
    alt: "Yağmurlu havada park edilmiş koyu renkli otomobil",
    width: 1200,
    height: 900,
    credit: { site: "Unsplash · Andreas Rasmussen", photographer: "Andreas Rasmussen", url: "https://unsplash.com/photos/parked-black-vehicle-during-daytime-MBW3F1jEhh0" },
  },
  "menu/hizmetler": {
    src: "/images/menu/hizmetler.webp",
    alt: "Mavi ameliyat kıyafetli cerrahlar ameliyathanede çalışıyor",
    width: 900,
    height: 1100,
    credit: { site: "Unsplash · Ritu Chauhan", photographer: "Ritu Chauhan", url: "https://unsplash.com/photos/surgeons-in-blue-scrubs-operate-on-a-patient-with-monitors-displaying-medical-data-P9w9U_VyshQ" },
  },
};


// Hakkımızda kapağı: geometrik cepheli lisanslı bina fotoğrafı (eskiden kurumsal menüde de bu vardı).
images["kurumsal/hakkimizda-1"] = {
  src: "/images/menu/kurumsal.webp",
  alt: "Geometrik cepheli çağdaş kurumsal bina",
  width: 900,
  height: 1100,
  credit: {
    site: "Unsplash · Edgar",
    photographer: "Edgar",
    url: "https://unsplash.com/photos/modern-building-with-geometric-lines-and-glass-XALyj0z5bgw",
  },
};

// Mevcut G4 kataloğundaki görseller slug ile eşleştirilir.
for (const product of products) {
  const src = (productImages as Record<string, string>)[product.slug];
  if (src) images[product.imageKey] = { src, alt: product.name, width: 1000, height: 1000 };
}

// Haber görselleri: Güven Sağlık Grubu "Bizden Haberler" sayfasından (https://www.guven.com.tr/bizden-haberler).
const newsImageSizes: Record<string, [number, number]> = {
  "guven-gebe-okulu-nda-doguma-ve-ebeveynlige-hazirlik": [1920, 840],
  "peryon-networking-bulusmasinda-longevity-yi-prof-dr-pelin-aribal-ayral-dan-dinledik": [1920, 840],
  "peryon-ilk-networking-bulusmasi-guven-de": [1920, 840],
  "guven-gebe-okulu-nda-doguma-ve-ebeveynlige-hazirlik-gunu": [1920, 1080],
};
for (const item of news) {
  const size = newsImageSizes[item.slug];
  if (!size) continue;
  images[item.imageKey] = {
    src: `/images/${item.imageKey}.webp`,
    alt: item.title,
    width: size[0],
    height: size[1],
    credit: {
      site: "Güven Hastanesi",
      photographer: "Güven Hastanesi",
      url: `https://www.guven.com.tr/bizden-haberler/${item.slug}`,
    },
  };
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
