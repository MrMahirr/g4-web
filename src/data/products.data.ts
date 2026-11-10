import type { ProductItem, SarfSubGroup } from "@/core/types";

/**
 * 68 tekil ürün — ad ve slug'lar mevcut siteden birebir (vault: Ürün Kataloğu).
 * Eski sitede 69 kayıt vardı: "Dezenfektanlar" iki kategoride iki ayrı URL ile açılmıştı
 * (`dezenfektanlar` ve `dezenfektanlar-180`). Burada tek kayıt, iki kategori.
 */

const SARF = "genel-tibbi-sarf-malzemeler";
const TEKSTIL = "hastane-tekstili";
const HIJYEN = "temizlik-hijyen-grubu";
const CIHAZ = "tibbi-cihazlar";
const BIPOLAR = "bipolar-forceps";

/** Eski sitede Sarf ve Tekstil ürünlerinin tamamında kullanılan açıklama. */
const CONTACT_DESCRIPTION = "İhtiyaçlarınıza en uygun ürünleri bulmak için bizimle iletişime geçebilirsiniz.";

type Seed = {
  slug: string;
  /** Eski sitedeki tam başlık. */
  title: string;
  /** Listede gösterilecek ad; verilmezse başlıkla aynıdır. */
  name?: string;
  code?: string;
  categories: string[];
  subGroup?: SarfSubGroup;
  featured?: boolean;
};

const bipolar = (slug: string, title: string, name: string, code: string): Seed => ({
  slug,
  title,
  name,
  code,
  categories: [BIPOLAR],
  featured: true,
});

const sarf = (slug: string, title: string, subGroup: SarfSubGroup, extra: Partial<Seed> = {}): Seed => ({
  slug,
  title,
  categories: [SARF],
  subGroup,
  ...extra,
});

const simple = (category: string) => (slug: string, title: string): Seed => ({ slug, title, categories: [category] });
const tekstil = simple(TEKSTIL);
const hijyen = simple(HIJYEN);
const cihaz = simple(CIHAZ);

const seeds: Seed[] = [
  // ---- Bipolar Forceps (5) — anasayfadaki sırayla ----
  bipolar(
    "20-cm-bayonet-bipolar-forseps-1-0-mm-uc-kablolu-valleylab-fisli-ref-01-110v-20010",
    "20 cm Bayonet Bipolar Forseps, 1,0 mm Uç, Kablolu - Valleylab Fişli, Ref: 01-110V-20010",
    "20 cm Bayonet Bipolar Forseps, 1,0 mm Uç, Kablolu - Valleylab Fişli",
    "01-110V-20010",
  ),
  bipolar(
    "20-cm-bayonet-bipolar-forseps-1-0-mm-uc-ve-kablolu-valleylab-fisli-ref-01-110v-20010-1-0-mm-yapismaz",
    "20 cm Bayonet Bipolar Forseps, 1,0 mm Uç ve Kablolu - Valleylab Fişli, Ref: 01-110V-20010, 1,0 mm Yapışmaz",
    "20 cm Bayonet Bipolar Forseps, 1,0 mm Uç ve Kablolu - Valleylab Fişli, 1,0 mm Yapışmaz",
    "01-110V-20010",
  ),
  bipolar(
    "12-cm-adson-bipolar-penset-1-0-mm-uc-kablolu-valleylab-fisli-ref-01-040v-12010",
    "12 cm Adson Bipolar Penset, 1,0 mm Uç, Kablolu - Valleylab Fişli, Ref: 01-040V-12010",
    "12 cm Adson Bipolar Penset, 1,0 mm Uç, Kablolu - Valleylab Fişli",
    "01-040V-12010",
  ),
  bipolar(
    "12-cm-adson-bipolar-forseps-1-0-mm-uc-kablolu-valleylab-fisli-ref-01-040v-12010-tirtikli",
    "12 cm Adson Bipolar Forseps, 1,0 mm Uç, Kablolu - Valleylab Fişli, Ref: 01-040V-12010, Tırtıklı",
    "12 cm Adson Bipolar Forseps, 1,0 mm Uç, Kablolu - Valleylab Fişli, Tırtıklı",
    "01-040V-12010",
  ),
  bipolar(
    "15-cm-duz-bipolar-forseps-1-0-mm-acili-uc-ve-kablo-valleylab-fisli-ref-01-052v-15010",
    "15 cm Düz Bipolar Forseps, 1,0 mm Açılı Uç ve Kablo - Valleylab Fişli (Ref: 01-052V-15010)",
    "15 cm Düz Bipolar Forseps, 1,0 mm Açılı Uç ve Kablo - Valleylab Fişli",
    "01-052V-15010",
  ),

  // ---- Genel Tıbbi Sarf Malzemeler (45) ----
  sarf("alci-alti-pamuklari", "Alçı Altı Pamukları", "cerrahi-pansuman", { featured: true }),
  sarf("alcili-sargi", "Alçılı Sargı", "cerrahi-pansuman"),
  sarf("ambu-setleri", "Ambu Setleri", "solunum-anestezi", { featured: true }),
  sarf("anestezi-solunum-devreleri", "Anestezi Solunum Devreleri", "solunum-anestezi"),
  sarf("asi-siringalari", "Aşı Şırıngaları", "siringa-igne"),
  sarf("aspirasyon-sondalari", "Aspirasyon Sondaları", "sonda-kateter"),
  sarf("bandaj-cesitleri", "Bandaj Çeşitleri", "cerrahi-pansuman"),
  sarf("beslenme-siringasi", "Beslenme Şırıngası", "siringa-igne"),
  sarf("bisturi-ucu-cesitleri", "Bistüri Ucu Çeşitleri", "cerrahi-pansuman"),
  sarf("cerrahi-sutur-cesitleri", "Cerrahi Sütur Çeşitleri", "cerrahi-pansuman", { featured: true }),
  sarf("defibrilator-pedi", "Defibrilatör Pedi", "kardiyoloji-kagit"),
  sarf("dental-siringalar", "Dental Şırıngalar", "siringa-igne"),
  sarf("dezenfektanlar", "Dezenfektanlar", "koruyucu-diger", { categories: [SARF, HIJYEN] }),
  sarf("eeg-elektrodu", "EEG Elektrodu", "kardiyoloji-kagit"),
  sarf("ekg-elektrodu", "EKG Elektrodu", "kardiyoloji-kagit"),
  sarf("ekg-kagidi", "EKG Kağıdı", "kardiyoloji-kagit"),
  sarf("eldiven-cesitleri", "Eldiven Çeşitleri", "koruyucu-diger"),
  sarf("elektrokoter-uclari", "Elektrokoter Uçları", "cerrahi-pansuman"),
  sarf("endotrakeal-entubasyon-tupleri", "Endotrakeal Entübasyon Tüpleri", "solunum-anestezi"),
  sarf("enteral-beslenme-sondalari", "Enteral Beslenme Sondaları", "sonda-kateter"),
  sarf("flaster-cesitleri", "Flaster Çeşitleri", "cerrahi-pansuman"),
  sarf("foley-sonda-cesitleri", "Foley Sonda Çeşitleri", "sonda-kateter"),
  sarf("hasta-alt-bezleri", "Hasta Alt Bezleri", "koruyucu-diger"),
  sarf("idrar-torbasi-cesitleri", "İdrar Torbası Çeşitleri", "sonda-kateter"),
  sarf("igneler", "İğneler", "siringa-igne"),
  sarf("iki-parcali-siringalar", "İki Parçalı Şırıngalar", "siringa-igne"),
  sarf("insulin-siringalari", "İnsülin Şırıngaları", "siringa-igne"),
  sarf("jel-cesitleri", "Jel Çeşitleri", "koruyucu-diger"),
  sarf("kan-alma-setleri", "Kan Alma Setleri", "koruyucu-diger"),
  sarf("kan-gazi-siringasi", "Kan Gazı Şırıngası", "siringa-igne"),
  sarf("kilitli-siringalar-luer-lock-siringalar", "Kilitli Şırıngalar (Luer Lock) Şırıngalar", "siringa-igne"),
  sarf("mezoterapi-igneleri", "Mezoterapi İğneleri", "siringa-igne"),
  sarf("nazogastrik-sonda-cesitleri", "Nazogastrik Sonda Çeşitleri", "sonda-kateter"),
  sarf("nebulizator-maskeleri", "Nebülizatör Maskeleri", "solunum-anestezi"),
  sarf("nst-kagidi", "NST Kağıdı", "kardiyoloji-kagit"),
  sarf("numune-tupleri", "Numune Tüpleri", "laboratuvar-tup"),
  sarf("oksijen-maskesi", "Oksijen Maskesi", "solunum-anestezi"),
  sarf("oral-airway", "Oral Airway", "solunum-anestezi"),
  sarf("pipet-uclari", "Pipet Uçları", "laboratuvar-tup"),
  sarf("santrifuj-tupleri", "Santrifüj Tüpleri", "laboratuvar-tup"),
  sarf("serum-setleri", "Serum Setleri", "koruyucu-diger"),
  sarf("sterilizasyon-rulosu", "Sterilizasyon Rulosu", "koruyucu-diger"),
  sarf("trakeostomi-kanulu", "Trakeostomi Kanülü", "solunum-anestezi"),
  sarf("uc-parcali-siringalar", "Üç Parçalı Şırıngalar", "siringa-igne"),
  sarf("veteriner-siringalari", "Veteriner Şırıngaları", "siringa-igne"),

  // ---- Hastane Tekstili (4) ----
  tekstil("disposable-ortu-setleri", "Disposable Örtü Setleri"),
  tekstil("hastane-kiyafetleri", "Hastane Kıyafetleri"),
  tekstil("hastane-tekstili", "Hastane Tekstili"),
  tekstil("onluk-cesitleri", "Önlük Çeşitleri"),

  // ---- Temizlik/Hijyen Grubu (6 + ortak "Dezenfektanlar") ----
  hijyen("el-hijyeni-urunleri", "El Hijyeni Ürünleri"),
  hijyen("genel-temizlik-malzemeleri", "Genel Temizlik Malzemeleri"),
  hijyen("hijyen-ekipmanlari-ve-dispenserler", "Hijyen Ekipmanları ve Dispenserler"),
  hijyen("tibbi-alet-dezenfektanlari", "Tıbbi Alet Dezenfektanları"),
  hijyen("tibbi-atik-yonetim-urunleri", "Tıbbi Atık Yönetim Ürünleri"),
  // Eski sitedeki yazım ("Dezenfektaları") düzeltildi; slug eski URL ile aynı kaldı.
  hijyen("yuzey-dezenfektalari", "Yüzey Dezenfektanları"),

  // ---- Tıbbi Cihazlar (8) ----
  cihaz("aspirator-cihazi", "Aspiratör Cihazı"),
  cihaz("boy-olcer-tarti-cesitleri", "Boy Ölçer / Tartı Çeşitleri"),
  cihaz("ekg-cihazi", "EKG Cihazı"),
  cihaz("hasta-basi-monitoru", "Hasta Başı Monitörü"),
  cihaz("holter-cihazi", "Holter Cihazı"),
  cihaz("infuzyon-pompasi", "İnfüzyon Pompası"),
  cihaz("koter-cihazlari", "Koter Cihazları"),
  cihaz("pulse-oksimetre", "Pulse Oksimetre"),
];

/** Eski sitedeki kural: Sarf ve Tekstil ürünlerinde iletişim çağrısı, diğerlerinde ürün adının kendisi. */
function describe(seed: Seed): string {
  const primary = seed.categories[0];
  switch (primary) {
    case SARF:
    case TEKSTIL:
      return CONTACT_DESCRIPTION;
    default:
      return seed.title;
  }
}

export const products: ProductItem[] = seeds.map((seed) => ({
  id: `prd-${seed.slug}`,
  slug: seed.slug,
  title: seed.title,
  name: seed.name ?? seed.title,
  code: seed.code,
  categorySlugs: seed.categories,
  subGroup: seed.subGroup,
  imageKey: `urunler/${seed.slug}`,
  description: describe(seed),
  isFeaturedOnHome: seed.featured,
}));

/** Eski sitedeki mükerrer ürün URL'leri → kanonik slug (Faz 8'de yönlendirme olarak kullanılır). */
export const legacyProductSlugs: Record<string, string> = {
  "dezenfektanlar-180": "dezenfektanlar",
};

/** Anasayfadaki "Öne Çıkan Ürünlerimiz" sırası (tasarım: D4Main). Değiştirmek için bu listeyi düzenleyin. */
export const homeFeaturedSlugs: string[] = [
  "20-cm-bayonet-bipolar-forseps-1-0-mm-uc-kablolu-valleylab-fisli-ref-01-110v-20010",
  "20-cm-bayonet-bipolar-forseps-1-0-mm-uc-ve-kablolu-valleylab-fisli-ref-01-110v-20010-1-0-mm-yapismaz",
  "12-cm-adson-bipolar-penset-1-0-mm-uc-kablolu-valleylab-fisli-ref-01-040v-12010",
  "12-cm-adson-bipolar-forseps-1-0-mm-uc-kablolu-valleylab-fisli-ref-01-040v-12010-tirtikli",
  "15-cm-duz-bipolar-forseps-1-0-mm-acili-uc-ve-kablo-valleylab-fisli-ref-01-052v-15010",
  "cerrahi-sutur-cesitleri",
  "ambu-setleri",
  "alci-alti-pamuklari",
];
