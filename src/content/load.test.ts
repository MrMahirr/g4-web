import { describe, expect, it } from "vitest";
import { loadContent } from "@/content/load";
import baseCategories from "../../content/base/categories.json";
import baseFaq from "../../content/base/faq.json";
import baseLegal from "../../content/base/legal.json";
import baseNews from "../../content/base/news.json";
import baseReferences from "../../content/base/references.json";
import baseServices from "../../content/base/services.json";
import baseProducts from "../../content/base/products.json";
import trCategories from "../../content/tr/categories.json";
import enCategories from "../../content/en/categories.json";
import trFaq from "../../content/tr/faq.json";
import enFaq from "../../content/en/faq.json";
import trLegal from "../../content/tr/legal.json";
import enLegal from "../../content/en/legal.json";
import trNews from "../../content/tr/news.json";
import enNews from "../../content/en/news.json";
import trReferences from "../../content/tr/references.json";
import enReferences from "../../content/en/references.json";
import trServices from "../../content/tr/services.json";
import enServices from "../../content/en/services.json";
import trProducts from "../../content/tr/products.json";
import enProducts from "../../content/en/products.json";

const entities = [
  [baseFaq, trFaq, enFaq],
  [baseLegal, trLegal, enLegal],
  [baseReferences, trReferences, enReferences],
  [baseCategories, trCategories, enCategories],
  [baseServices, trServices, enServices],
  [baseNews, trNews, enNews],
  [(baseProducts as { records: object }).records, trProducts, enProducts],
] as const;
describe("JSON content", () => {
  it("has a Turkish and English text entry for every base record", () => {
    for (const [base, tr, en] of entities) {
      for (const id of Object.keys(base)) {
        expect(tr).toHaveProperty(id);
        expect(en).toHaveProperty(id);
      }
    }
  });
  it("keeps translated entity keys aligned", () => {
    for (const [, tr, en] of entities) expect(Object.keys(en).sort()).toEqual(Object.keys(tr).sort());
  });
  it("loads validated Turkish and English catalogs", () => {
    expect(loadContent("tr").products).toHaveLength(68);
    expect(loadContent("en").products).toHaveLength(68);
  });
  it("uses English product and service text when English is requested", () => {
    const productEntry = Object.entries(enProducts).find(([key]) => key !== "_shared");
    const serviceEntry = Object.entries(enServices)[0];
    if (!productEntry || !serviceEntry || !("title" in productEntry[1])) throw new Error("Missing English content");

    const product = loadContent("en").products.find((item) => item.id === productEntry[0]);
    const service = loadContent("en").services.find((item) => item.id === serviceEntry[0]);

    expect(product?.title).toBe(productEntry[1].title);
    expect(service?.title).toBe(serviceEntry[1].title);
  });
});
