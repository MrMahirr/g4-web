# Görsel arşivi

Sitedeki tüm fotoğrafların **orijinalleri** burada durur. Bu klasör sitede sunulmaz.

Site, `npm run images` komutunun buradan ürettiği küçültülmüş WebP kopyaları kullanır:

```
gorsel-arsivi/<klasör>/<ad>.jpg|png   →   public/images/<klasör>/<ad>.webp
```

## Yeni görsel eklemek
1. Orijinal dosyayı doğru klasöre koy (ör. `gorsel-arsivi/urunler/foley-sonda-cesitleri.jpg`).
2. `npm run images` çalıştır (yalnız yeni/değişen dosyalar işlenir).
3. `src/data/images.manifest.ts` içinde `src: "/images/urunler/foley-sonda-cesitleri.webp"` olarak kullan.

`public/images` içine elle dosya koyma. `npm test`, manifestteki her yolun `.webp` olduğunu ve dosyanın var olduğunu denetler.

## Ayarlar (`scripts/optimize-images.mjs`)
- Uzun kenar en fazla 2000 px, WebP kalite 80, şeffaf PNG'lerde alfa kayıpsız.
- Hepsini yeniden üretmek: `npm run images -- --force`
- Arşivde karşılığı kalmayan WebP'leri silmek: `npm run images -- --prune`
