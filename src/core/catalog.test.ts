import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { container } from "@/core/container";
import { sarfSubGroups } from "@/data/categories.data";
import { images } from "@/data/images.manifest";
import { routes, sectionForPath } from "@/data/navigation.data";
import { homeFeaturedSlugs, legacyProductSlugs, products } from "@/data/products.data";
import { countByType, filterProducts, searchEntries, trLower } from "@/lib/catalog";

const catalog = container.resolve("CatalogService");

describe("ürün verisi", () => {
  it("68 tekil ürün içerir ve slug'lar benzersizdir", () => {
    expect(products).toHaveLength(68);
    expect(new Set(products.map((product) => product.slug)).size).toBe(68);
  });

  it("slug'lar URL'ye uygundur (küçük harf, rakam, tire)", () => {
    for (const product of products) expect(product.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("her ürün var olan bir kategoriye bağlıdır", () => {
    const known = new Set(catalog.getCategories().map((category) => category.slug));
    for (const product of products) {
      expect(product.categorySlugs.length).toBeGreaterThan(0);
      for (const slug of product.categorySlugs) expect(known.has(slug), `${product.slug} → ${slug}`).toBe(true);
    }
  });

  it("kategori ürün sayıları eski siteyle aynıdır (Dezenfektanlar iki kategoride)", () => {
    const counts = Object.fromEntries(catalog.getCategories().map((category) => [category.slug, category.productCount]));
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
    const groups = catalog.getSubGroups("genel-tibbi-sarf-malzemeler");
    expect(groups.map((group) => group.slug)).toEqual(sarfSubGroups.map((group) => group.slug));
    expect(groups.reduce((sum, group) => sum + group.productCount, 0)).toBe(45);
    for (const group of groups) expect(group.productCount, group.slug).toBeGreaterThan(0);
    expect(catalog.getSubGroups("tibbi-cihazlar")).toEqual([]);
  });

  it("bipolar forseps ürünlerinde Ref kodu ayrıştırılmış, ad kodsuzdur", () => {
    const bipolar = catalog.getProducts({ categorySlug: "bipolar-forceps" });
    for (const product of bipolar) {
      expect(product.code).toMatch(/^01-\d{3}V-\d{5}$/);
      expect(product.title).toContain(product.code as string);
      expect(product.name).not.toContain("Ref");
    }
  });

  it("anasayfa öne çıkanları 8 üründür ve hepsi vardır", () => {
    expect(catalog.getHomeFeaturedProducts().map((product) => product.slug)).toEqual(homeFeaturedSlugs);
    expect(homeFeaturedSlugs).toHaveLength(8);
  });

  it("eski mükerrer slug'lar var olan ürüne işaret eder ve kendisi ürün değildir", () => {
    for (const [legacy, canonical] of Object.entries(legacyProductSlugs)) {
      expect(catalog.getProductBySlug(legacy)).toBeNull();
      expect(catalog.getProductBySlug(canonical)).not.toBeNull();
    }
  });
});

describe("katalog sorguları", () => {
  it("benzer ürünler aynı ana kategoriden gelir ve ürünün kendisini içermez", () => {
    const related = catalog.getRelatedProducts("ekg-cihazi");
    expect(related).toHaveLength(4);
    for (const product of related) {
      expect(product.slug).not.toBe("ekg-cihazi");
      expect(product.categorySlugs).toContain("tibbi-cihazlar");
    }
    expect(catalog.getRelatedProducts("olmayan-urun")).toEqual([]);
  });

  it("arama Türkçe büyük/küçük harfe duyarsızdır ve Ref koduyla da bulur", () => {
    expect(filterProducts(products, { q: "İĞNE" }).map((product) => product.slug)).toContain("igneler");
    expect(filterProducts(products, { q: "ŞIRINGA" }).length).toBeGreaterThanOrEqual(9);
    expect(filterProducts(products, { q: "01-052V" })).toHaveLength(1);
    expect(filterProducts(products, { q: "   " })).toHaveLength(68);
  });

  it("A-Z sıralama Türkçe alfabeye göredir (Ç, C'den sonra; İ, I'dan sonra)", () => {
    const names = catalog.getProducts({ categorySlug: "genel-tibbi-sarf-malzemeler", sort: "az" }).map((p) => p.name);
    expect(names[0]).toBe("Alçı Altı Pamukları");
    expect(names.indexOf("İğneler")).toBeGreaterThan(names.indexOf("Hasta Alt Bezleri"));
    expect(names.indexOf("Üç Parçalı Şırıngalar")).toBeGreaterThan(names.indexOf("Trakeostomi Kanülü"));
    const reversed = catalog.getProducts({ categorySlug: "genel-tibbi-sarf-malzemeler", sort: "za" }).map((p) => p.name);
    expect(reversed).toEqual([...names].reverse());
  });

  it("alt grup filtresi yalnız o gruptaki ürünleri döndürür", () => {
    const syringes = catalog.getProducts({ categorySlug: "genel-tibbi-sarf-malzemeler", subGroup: "siringa-igne" });
    expect(syringes).toHaveLength(11);
  });

  it("bilinmeyen slug'larda null döner", () => {
    expect(catalog.getProductBySlug("yok")).toBeNull();
    expect(catalog.getCategoryBySlug("yok")).toBeNull();
    expect(catalog.getServiceBySlug("yok")).toBeNull();
    expect(catalog.getNewsBySlug("yok")).toBeNull();
  });
});

describe("diğer içerik", () => {
  it("4 hizmet, 7 referans, 4 haber, 5 SSS", () => {
    expect(catalog.getServices()).toHaveLength(4);
    expect(catalog.getHomeServices()).toHaveLength(2);
    expect(catalog.getReferences()).toHaveLength(7);
    expect(catalog.getHomeReferences()).toHaveLength(5);
    expect(catalog.getNews()).toHaveLength(4);
    expect(catalog.getFaq()).toHaveLength(5);
  });

  it("iki yasal metin taslaktır ve hukuk onayı bekler", () => {
    expect(catalog.getLegalDocument("cerez-politikasi")?.approvalPending).toBe(true);
    expect(catalog.getLegalDocument("kvkk-aydinlatma-metni")?.approvalPending).toBe(true);
  });

  it("hizmetlerin ilgili kategorisi gerçekten vardır", () => {
    for (const service of catalog.getServices()) {
      if (service.relatedCategorySlug) expect(catalog.getCategoryBySlug(service.relatedCategorySlug)).not.toBeNull();
    }
  });

  it("haberler en yeniden eskiye sıralıdır ve özet kelime ortasında kesilmez", () => {
    const list = catalog.getNews();
    expect(list[0].slug).toBe("yeni-ar-ge-merkezimiz-faaliyete-gecti");
    expect(list.at(-1)?.slug).toBe("yeni-urun-lansmanimiz-gerceklesti");
    const excerpt = catalog.getNewsExcerpt(list[0], 80);
    expect(excerpt.length).toBeLessThanOrEqual(81);
    expect(excerpt.endsWith("…")).toBe(true);
    expect(list[0].paragraphs[0].startsWith(excerpt.slice(0, -1))).toBe(true);
  });

  it("sosyal bağlantılar: Telegram ve Instagram henüz boş, diğerleri https", () => {
    const socials = Object.fromEntries(catalog.getCompany().socials.map((social) => [social.channel, social.href]));
    expect(socials.telegram).toBeNull();
    expect(socials.instagram).toBeNull();
    for (const channel of ["whatsapp", "x", "linkedin"]) expect(socials[channel]).toMatch(/^https:\/\//);
  });

  it("manifestte olmayan görsel için null döner; manifestteki yollar /images altındadır", () => {
    expect(catalog.getImage("urunler/yok")).toBeNull();
    expect(catalog.getImage(undefined)).toBeNull();
    for (const entry of Object.values(images)) expect(entry.src.startsWith("/images/")).toBe(true);
  });

  it("manifestteki her görsel .webp ve public/ içinde var (orijinal gorsel-arsivi/ → npm run images)", () => {
    const missing = Object.entries(images)
      .filter(([, entry]) => !entry.src.endsWith(".webp") || !existsSync(join(process.cwd(), "public", entry.src)))
      .map(([key, entry]) => `${key} → ${entry.src}`);
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

describe("site içi arama", () => {
  const index = catalog.getSearchIndex();

  it("dizin 68 ürün + 7 ürün grubu + 4 hizmet içerir", () => {
    expect(index).toHaveLength(79);
  });

  it("eşleşen kısmı ayırır ve türlere göre sayar", () => {
    const hits = searchEntries(index, "tekstil");
    const counts = countByType(hits);
    expect(counts.all).toBe(hits.length);
    expect(counts.urun).toBe(1);
    expect(counts.grup).toBe(1);
    expect(counts.hizmet).toBe(1);
    const hit = hits.find((item) => item.entry.type === "grup");
    expect(`${hit?.pre}|${hit?.hit}|${hit?.post}`).toBe("Hastane |Tekstil|i");
  });

  it("Ref koduyla bulur; eşleşme adda değilse vurgu boş kalır", () => {
    const hits = searchEntries(index, "01-040v");
    expect(hits).toHaveLength(2);
    expect(hits[0].hit).toBe("");
    expect(hits[0].pre).toBe(hits[0].entry.name);
  });

  it("boş sorguda sonuç dönmez", () => {
    expect(searchEntries(index, "  ")).toEqual([]);
  });

  it("trLower Türkçe İ/I dönüşümünü doğru yapar", () => {
    expect(trLower("IŞIK İĞNE")).toBe("ışık iğne");
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
