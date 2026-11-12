import { describe, expect, it } from "vitest";
import { getCatalog } from "@/core/container";
import { countByType, searchEntries, trLower } from "@/lib/catalog";
import { buildSearchIndex } from "@/lib/search-index";

const catalog = getCatalog("tr");
const labels = {
  productFallback: "G4 Ürünleri",
  productGroup: "Ürün grubu · {number}",
  service: "Hizmet · {number}",
  productRef: "Ref: {code}",
};
const index = buildSearchIndex(catalog, labels);

describe("site içi arama", () => {
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
