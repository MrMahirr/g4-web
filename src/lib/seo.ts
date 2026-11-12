import type { Metadata } from "next";

/**
 * Sitenin canlı adresi. Yayında `NEXT_PUBLIC_SITE_URL` ile değiştirilebilir (ör. önizleme ortamı).
 * Sonunda "/" olmaz.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://g4.com.tr").replace(/\/+$/, "");

export const siteTitle = "G4";
// Site açıklaması dile bağlıdır: messages → i18n.siteDescription (layout ve anasayfa generateMetadata).

/** Sitedeki bir yolu tam adrese çevirir: "/urunler" → "https://g4.com.tr/urunler". */
export function absoluteUrl(path: string): string {
  return new URL(path, `${siteUrl}/`).toString();
}

/** Kökteki `app/opengraph-image.tsx` çıktısı; kendi görseli olmayan sayfalar bunu paylaşır. */
const defaultShareImage = { url: "/opengraph-image", width: 1200, height: 630, alt: siteTitle };

type PageMetadataInput = {
  title: string;
  description?: string;
  /** Sayfanın kanonik yolu ("/urun/foley-sonda"). */
  path: string;
  /** Paylaşım görseli; verilmezse kökteki `opengraph-image` kullanılır. */
  image?: { src: string; alt?: string; width?: number; height?: number } | null;
  type?: "website" | "article";
  noindex?: boolean;
};

/**
 * Sayfa metadata'sı. Next, alt sayfadaki `openGraph` nesnesini üst nesneyle birleştirmez, tamamen değiştirir;
 * bu yüzden site adı ve dil her sayfada burada yeniden verilir.
 */
export function pageMetadata({ title, description, path, image, type = "website", noindex }: PageMetadataInput): Metadata {
  const images = image
    ? [{ url: image.src, alt: image.alt ?? title, width: image.width, height: image.height }]
    : [defaultShareImage];
  const shareTitle = title === siteTitle ? title : `${title} · G4`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, locale: "tr_TR", siteName: "G4", url: path, title: shareTitle, description, images },
    twitter: { card: "summary_large_image", title: shareTitle, description, images },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
