import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { container, getCatalog } from "@/core/container";
import { sarfSubGroups } from "@/content/constants";
import { routes, sectionForPath } from "@/data/navigation.data";
import { legacyProductSlugs } from "@/data/redirects.data";
import { filterProducts } from "@/lib/catalog";
import { excerpt } from "@/lib/text";

const catalog = getCatalog("tr");
const products = catalog.products.getProducts();
const homeFeaturedSlugs = catalog.products.getHomeFeaturedProducts().map((product) => product.slug);

describe("ürün verisi", () => {
  it("68 tekil ürün içerir ve slug'lar benzersizdir", () => {
    expect(products).toHaveLength(68);
    expect(new Set(products.map((product) => product.slug)).size).toBe(68);
  });

  it("slug'lar URL'ye uygundur (küçük harf, rakam, tire)", () => {
    for (const product of products) expect(product.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("her ürün var olan bir kategoriye bağlıdır", () => {
    const known = new Set(catalog.products.getCategories().map((category) => category.slug));
    for (const product of products) {
      expect(product.categorySlugs.length).toBeGreaterThan(0);
      for (const slug of product.categorySlugs) expect(known.has(slug), `${product.slug} → ${slug}`).toBe(true);
    }
  });

  it("kategori ürün sayıları eski siteyle aynıdır (Dezenfektanlar iki kategoride)", () => {
    const counts = Object.fromEntries(
      catalog.products.getCategories().map((category) => [category.slug, category.productCount]),
    );
    expect(counts).toEqual({
      "genel-tibbi-sarf-malzemeler": 45,
      "hastane-tekstili": 4,
      "temizlik-hijyen-grubu": 7,
      "tibbi-cihazlar": 8,
      "gida-takviyesi-vitaminler": 0,
      "kozmetik-urunler": 0,
      "bipolar-forceps": 5,
    });
  });

  it("Genel Tıbbi Sarf'taki her ürünün alt grubu vardır ve alt grup toplamı 45'tir", () => {
    const groups = catalog.products.getSubGroups("genel-tibbi-sarf-malzemeler");
    expect(groups.map((group) => group.slug)).toEqual(sarfSubGroups.map((group) => group.slug));
    expect(groups.reduce((sum, group) => sum + group.productCount, 0)).toBe(45);
    for (const group of groups) expect(group.productCount, group.slug).toBeGreaterThan(0);
    expect(catalog.products.getSubGroups("tibbi-cihazlar")).toEqual([]);
  });

  it("bipolar forseps ürünlerinde Ref kodu ayrıştırılmış, ad kodsuzdur", () => {
    const bipolar = catalog.products.getProducts({ categorySlug: "bipolar-forceps" });
    for (const product of bipolar) {
      expect(product.code).toMatch(/^01-\d{3}V-\d{5}$/);
      expect(product.title).toContain(product.code as string);
      expect(product.name).not.toContain("Ref");
    }
  });

  it("anasayfa öne çıkanları 8 üründür ve hepsi vardır", () => {
    expect(catalog.products.getHomeFeaturedProducts().map((product) => product.slug)).toEqual(homeFeaturedSlugs);
    expect(homeFeaturedSlugs).toHaveLength(8);
  });

  it("eski mükerrer slug'lar var olan ürüne işaret eder ve kendisi ürün değildir", () => {
    for (const [legacy, canonical] of Object.entries(legacyProductSlugs)) {
      expect(catalog.products.getProductBySlug(legacy)).toBeNull();
      expect(catalog.products.getProductBySlug(canonical)).not.toBeNull();
    }
  });
});

describe("katalog sorguları", () => {
  it("benzer ürünler aynı ana kategoriden gelir ve ürünün kendisini içermez", () => {
    const related = catalog.products.getRelatedProducts("ekg-cihazi");
    expect(related).toHaveLength(4);
    for (const product of related) {
      expect(product.slug).not.toBe("ekg-cihazi");
      expect(product.categorySlugs).toContain("tibbi-cihazlar");
    }
    expect(catalog.products.getRelatedProducts("olmayan-urun")).toEqual([]);
  });

  it("arama Türkçe büyük/küçük harfe duyarsızdır ve Ref koduyla da bulur", () => {
    expect(filterProducts(products, { q: "İĞNE" }).map((product) => product.slug)).toContain("igneler");
    expect(filterProducts(products, { q: "ŞIRINGA" }).length).toBeGreaterThanOrEqual(9);
    expect(filterProducts(products, { q: "01-052V" })).toHaveLength(1);
    expect(filterProducts(products, { q: "   " })).toHaveLength(68);
  });

  it("A-Z sıralama Türkçe alfabeye göredir (Ç, C'den sonra; İ, I'dan sonra)", () => {
    const names = catalog.products
      .getProducts({ categorySlug: "genel-tibbi-sarf-malzemeler", sort: "az" })
      .map((product) => product.name);
    expect(names[0]).toBe("Alçı Altı Pamukları");
    expect(names.indexOf("İğneler")).toBeGreaterThan(names.indexOf("Hasta Alt Bezleri"));
    expect(names.indexOf("Üç Parçalı Şırıngalar")).toBeGreaterThan(names.indexOf("Trakeostomi Kanülü"));
    const reversed = catalog.products
      .getProducts({ categorySlug: "genel-tibbi-sarf-malzemeler", sort: "za" })
      .map((product) => product.name);
    expect(reversed).toEqual([...names].reverse());
  });

  it("alt grup filtresi yalnız o gruptaki ürünleri döndürür", () => {
    const syringes = catalog.products.getProducts({
      categorySlug: "genel-tibbi-sarf-malzemeler",
      subGroup: "siringa-igne",
    });
    expect(syringes).toHaveLength(11);
  });

  it("bilinmeyen slug'larda null döner", () => {
    expect(catalog.products.getProductBySlug("yok")).toBeNull();
    expect(catalog.products.getCategoryBySlug("yok")).toBeNull();
    expect(catalog.services.getServiceBySlug("yok")).toBeNull();
    expect(catalog.news.getNewsBySlug("yok")).toBeNull();
  });
});

describe("diğer içerik", () => {
  it("4 hizmet, 7 referans, 4 haber, 5 SSS", () => {
    expect(catalog.services.getServices()).toHaveLength(4);
    expect(catalog.references.getReferences()).toHaveLength(7);
    expect(catalog.references.getHomeReferences()).toHaveLength(5);
    expect(catalog.news.getNews()).toHaveLength(4);
    expect(catalog.site.getFaq()).toHaveLength(5);
  });

  it("iki yasal metin taslaktır ve hukuk onayı bekler", () => {
    expect(catalog.site.getLegalDocument("cerez-politikasi")?.approvalPending).toBe(true);
    expect(catalog.site.getLegalDocument("kvkk-aydinlatma-metni")?.approvalPending).toBe(true);
  });

  it("hizmetlerin ilgili kategorisi gerçekten vardır", () => {
    for (const service of catalog.services.getServices()) {
      if (service.relatedCategorySlug) {
        expect(catalog.products.getCategoryBySlug(service.relatedCategorySlug)).not.toBeNull();
      }
    }
  });

  it("haberler en yeniden eskiye sıralıdır ve özet kelime ortasında kesilmez", () => {
    const list = catalog.news.getNews();
    expect(list[0].slug).toBe("guven-gebe-okulu-nda-doguma-ve-ebeveynlige-hazirlik");
    expect(list.at(-1)?.slug).toBe("guven-gebe-okulu-nda-doguma-ve-ebeveynlige-hazirlik-gunu");
    const summary = excerpt(list[0].paragraphs[0] ?? "", 80);
    expect(summary.length).toBeLessThanOrEqual(81);
    expect(summary.endsWith("…")).toBe(true);
    expect(list[0].paragraphs[0].startsWith(summary.slice(0, -1))).toBe(true);
  });

  it("sosyal bağlantılar: hepsi https, Telegram yok", () => {
    const socials = Object.fromEntries(
      catalog.site.getCompany().socials.map((social) => [social.channel, social.href]),
    );
    expect(socials).not.toHaveProperty("telegram");
    for (const channel of ["whatsapp", "instagram", "x", "linkedin"]) expect(socials[channel]).toMatch(/^https:\/\//);
  });

  it("manifestte olmayan görsel için null döner; manifestteki yollar /images altındadır", () => {
    expect(catalog.images.getImage("urunler/yok")).toBeNull();
    expect(catalog.images.getImage(undefined)).toBeNull();
    for (const product of products) {
      expect(catalog.images.getImage(product.imageKey)?.src.startsWith("/images/")).toBe(true);
    }
  });

  it("manifestteki her görsel .webp ve public/ içinde var (orijinal gorsel-arsivi/ → npm run images)", () => {
    const missing = products.map((product) => [product.imageKey, catalog.images.getImage(product.imageKey)] as const)
      .filter(([, entry]) => !entry || !entry.src.endsWith(".webp") || !existsSync(join(process.cwd(), "public", entry.src)))
      .map(([key, entry]) => `${key} → ${entry?.src ?? "missing"}`);
    expect(missing).toEqual([]);
  });
});

describe("talep doğrulaması", () => {
  const inquiry = container.resolve("InquiryService");

  it("geçerli taslağı kabul eder; eksik ürün ve geçersiz miktarı reddeder", () => {
    expect(inquiry.validateDraft({ type: "bilgi", productSlug: "igneler", qty: 2, unit: "Kutu" })).toEqual({
      ok: true,
      value: { type: "bilgi", productSlug: "igneler", qty: 2, unit: "Kutu" },
    });
    expect(inquiry.validateDraft({ type: "soru", productSlug: "", qty: 0, unit: "Palet" })).toMatchObject({
      ok: false,
      issues: { productSlug: expect.any(String), qty: expect.any(String), unit: expect.any(String) },
    });
  });
});

describe("gezinme", () => {
  it("yol → menü bölümü", () => {
    expect(sectionForPath("/")).toBe("anasayfa");
    expect(sectionForPath(routes.about)).toBe("kurumsal");
    expect(sectionForPath(routes.newsItem("x"))).toBe("kurumsal");
    expect(sectionForPath(routes.service("x"))).toBe("hizmetler");
    expect(sectionForPath(routes.product("x"))).toBe("urunler");
    expect(sectionForPath(routes.category("x"))).toBe("urunler");
    expect(sectionForPath(routes.contact)).toBe("iletisim");
    expect(sectionForPath("/arama")).toBeNull();
  });
});
