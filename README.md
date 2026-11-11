# G4 Web (g4.com.tr)

G4 kurumsal sitesi. Next.js 16 (App Router, Cache Components) + React 19 + Tailwind CSS 4 + TypeScript.

## Komutlar

```bash
npm run dev     # geliştirme sunucusu (http://localhost:3000)
npm run build   # üretim derlemesi
npm run start   # derlenmiş siteyi çalıştırır
npm run lint    # ESLint
```

## Kaynaklar

| Ne | Nerede |
|---|---|
| Uygulama planı (Faz 0–8) ve kararlar | Obsidian vault: `../../g4/10 - Yapılacak Planlar/` |
| Tasarım (Tasarım D · Şifa) | `../tasarim-D-sifa-acik/*.dc.html`, `../assets/d4.css` |
| Metinler ve ürün listesi | Vault: `03 - İçerik/` |

## Klasör yapısı

```text
src/
├── app/            # route'lar (App Router)
├── components/     # ui · shared · sections · layout
├── core/           # interfaces · repositories · services · container (IoC)
├── data/           # tip güvenli içerik dosyaları
├── store/          # Redux Toolkit
├── hooks/          # custom hook'lar
├── lib/            # yardımcılar, zod şemaları
└── dictionaries/   # arayüz metinleri (tr)
public/
├── logo/           # G4 logosu
└── images/         # stok görseller (Faz 2)
scripts/            # yardımcı betikler (görsel indirme vb.)
```

## Kurallar

- Kod yazmadan önce `node_modules/next/dist/docs/` altındaki ilgili Next.js 16 dokümanı okunur (`AGENTS.md`).
- Görseller yerel dosyadır (`public/images`); `g4.com.tr` adresinden görsel bağlanmaz.
- Bileşenler veriyi `src/core` servisleri üzerinden alır, `src/data` dosyalarını doğrudan içe aktarmaz.
