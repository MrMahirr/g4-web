# G4 Web (g4.com.tr)

G4 kurumsal sitesi. Next.js 16 (App Router) + React 19 + Tailwind CSS 4 + TypeScript.

## Komutlar

```bash
npm run dev     # geliştirme sunucusu (http://localhost:3000)
npm run build   # üretim derlemesi
npm run start   # derlenmiş siteyi çalıştırır
npm run lint    # ESLint
npm run typecheck  # TypeScript tip kontrolü
npm run test       # Vitest
```

## Docker ile yayın

`next.config.ts` içinde `output: "standalone"` açık; imaj çok aşamalı derlenir ve yalnızca gereken dosyaları içerir (Node 24 Alpine, root olmayan kullanıcı, healthcheck).

```bash
docker compose up -d --build          # derle + arka planda çalıştır (http://localhost:3000)
docker compose logs -f web            # günlükler
docker compose down                   # durdur
```

| Değişken | Ne zaman | Varsayılan | Açıklama |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | derleme | `https://g4.com.tr` | Kanonik adres, sitemap, OG. Koda gömülür; değişirse imaj yeniden derlenir. |
| `PORT` | çalışma | `3000` | Sunucudaki dış port (`PORT=8080 docker compose up -d`). |

Compose kullanmadan:

```bash
docker build -t g4-web --build-arg NEXT_PUBLIC_SITE_URL=https://g4.com.tr .
docker run -d --name g4-web -p 3000:3000 --restart unless-stopped g4-web
```

Not: Yerelde `npm run dev` 3000 portunu tutuyorsa konteyneri başka portta açın (`PORT=3100`). Konteyner HTTP sunar; HTTPS için önüne Nginx / Caddy / Traefik gibi bir ters vekil konur.

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
