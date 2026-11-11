import { NextResponse, type NextRequest } from "next/server";
import { categories } from "@/data/categories.data";
import { legalDocuments } from "@/data/legal.data";
import { news } from "@/data/news.data";
import { products } from "@/data/products.data";
import { services } from "@/data/services.data";

/*
  Gerçek 404 (plan 8.3). Cache Components açıkken `dynamicParams = false` kullanılamıyor; bilinmeyen
  /urun/x adresi 404 sayfasını HTTP 200 ile döndürüyordu ("yumuşak 404"). Proxy, dinamik rotalarda
  slug veride yoksa isteği hiçbir rotaya uymayan bir yola yeniden yazar → Next not-found sayfasını
  404 durum koduyla çizer. Eski adreslerin yönlendirmeleri (next.config redirects) proxy'den önce çalışır.
*/

const known: Record<string, ReadonlySet<string>> = {
  urun: new Set(products.map((item) => item.slug)),
  "urun-kategori": new Set(categories.map((item) => item.slug)),
  hizmet: new Set(services.map((item) => item.slug)),
  haber: new Set(news.map((item) => item.slug)),
  // /icerik/hakkimizda statik rota; yasal metinler dinamik.
  icerik: new Set(["hakkimizda", ...legalDocuments.map((item) => item.slug)]),
};

/** Hiçbir rotaya uymayan iç yol; kök not-found sayfası 404 ile döner. */
const NOT_FOUND_PATH = "/_bulunamadi";

export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  if (section && slug && known[section] && !known[section].has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL(NOT_FOUND_PATH, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/urun/:slug", "/urun-kategori/:slug", "/hizmet/:slug", "/haber/:slug", "/icerik/:slug"],
};
