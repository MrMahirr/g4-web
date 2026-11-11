import { describe, expect, it } from "vitest";
import { articleBlocks, formatShortDate, splitInTwo, splitSentences } from "./text";

describe("metin yardımcıları", () => {
  it("cümlelere böler, büyük harfle başlamayan devamı bölmez", () => {
    expect(splitSentences("Birinci cümle. İkinci cümle! Üçüncü mü? evet devam.")).toEqual([
      "Birinci cümle.",
      "İkinci cümle!",
      "Üçüncü mü? evet devam.",
    ]);
  });

  it("başlığı iki dengeli satıra böler; tek kelimede bölmez", () => {
    expect(splitInTwo("En İnovatif Şirket Ödülünü Kazandık")).toEqual(["En İnovatif Şirket", "Ödülünü Kazandık"]);
    expect(splitInTwo("Haberler")).toEqual(["Haberler"]);
  });

  it("tarihi tasarımdaki mono biçimde yazar (İstanbul saati)", () => {
    expect(formatShortDate("2020-02-18T14:05:00+03:00")).toBe("18 ŞUB 2020");
    expect(formatShortDate("2020-12-31T23:30:00+03:00")).toBe("31 ARA 2020");
  });

  it("haber gövdesi: giriş + paragraflar + görseller + alıntı", () => {
    const blocks = articleBlocks(["A bir. B iki.", "C üç. D dört. E beş. F altı."], 2);
    expect(blocks.map((block) => block.kind)).toEqual(["lead", "paragraph", "figure", "figure", "paragraph", "quote", "paragraph"]);
    expect(blocks[5]).toEqual({ kind: "quote", text: "D dört." });
    expect(blocks[6]).toEqual({ kind: "paragraph", text: "E beş. F altı." });
  });

  it("kısa paragrafta alıntı üretmez", () => {
    expect(articleBlocks(["Tek.", "İki cümle. Burada."], 0).map((block) => block.kind)).toEqual(["lead", "paragraph"]);
  });
});
