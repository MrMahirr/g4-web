import { z } from "zod";
import type { Locale } from "@/i18n/request";
import {
  categoryBaseSchema,
  categoryTextSchema,
  companyBaseSchema,
  companySchema,
  companyTextSchema,
  companyTextPartialSchema,
  faqBaseSchema,
  faqTextSchema,
  imageBaseSchema,
  imageSchema,
  imageTextSchema,
  legalBaseSchema,
  legalTextSchema,
  newsBaseSchema,
  newsTextSchema,
  productBaseSchema,
  productSchema,
  productTextPartialSchema,
  productsTextPartialFileSchema,
  productsTextFileSchema,
  productTextSchema,
  referenceBaseSchema,
  referenceTextSchema,
  serviceBaseSchema,
  serviceTextSchema,
} from "@/content/schema";
import baseCategories from "../../content/base/categories.json";
import baseCompany from "../../content/base/company.json";
import baseFaq from "../../content/base/faq.json";
import baseImages from "../../content/base/images.json";
import baseLegal from "../../content/base/legal.json";
import baseNews from "../../content/base/news.json";
import baseProducts from "../../content/base/products.json";
import baseReferences from "../../content/base/references.json";
import baseServices from "../../content/base/services.json";
import enCategories from "../../content/en/categories.json";
import enCompany from "../../content/en/company.json";
import enFaq from "../../content/en/faq.json";
import enImages from "../../content/en/images.json";
import enLegal from "../../content/en/legal.json";
import enNews from "../../content/en/news.json";
import enProducts from "../../content/en/products.json";
import enReferences from "../../content/en/references.json";
import enServices from "../../content/en/services.json";
import trCategories from "../../content/tr/categories.json";
import trCompany from "../../content/tr/company.json";
import trFaq from "../../content/tr/faq.json";
import trImages from "../../content/tr/images.json";
import trLegal from "../../content/tr/legal.json";
import trNews from "../../content/tr/news.json";
import trProducts from "../../content/tr/products.json";
import trReferences from "../../content/tr/references.json";
import trServices from "../../content/tr/services.json";

type EntityRecord = object;
type TextRecord = object;
type PartialableSchema<T extends TextRecord> = z.ZodType<T> & {
  partial: () => z.ZodType<Partial<T>>;
};

const cache = new Map<Locale, ReturnType<typeof buildContent>>();

/** Taban ve çeviri kayıtlarını alan bazlı Türkçe geri dönüşüyle birleştirir. */
function mergeEntity<B extends EntityRecord, T extends TextRecord>(
  name: string,
  base: Record<string, B>,
  trText: Record<string, T>,
  localeText: Record<string, Partial<T>>,
  baseSchema: z.ZodType<B>,
  textSchema: PartialableSchema<T>,
): Array<B & T> {
  return Object.entries(base).map(([id, rawBase]) => {
    try {
      const parsedBase = baseSchema.parse(rawBase);
      const parsedText = textSchema.parse({ ...trText[id], ...localeText[id] });
      return { ...parsedBase, ...parsedText };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Invalid content: ${name}/${id}: ${message}`);
    }
  });
}

/** Aynı sıradaki şirket metinlerini taban dizisiyle birleştirir. */
function mergeByIndex<B extends object, T extends object>(
  name: string,
  base: B[],
  trText: T[],
  localeText: Array<Partial<T>>,
): Array<B & T> {
  if (base.length !== trText.length || base.length !== localeText.length) {
    throw new Error(`Invalid content: ${name} array lengths must match.`);
  }

  return base.map((entry, index) => ({
    ...entry,
    ...trText[index],
    ...localeText[index],
  }));
}

function recordSchema<T extends object>(schema: z.ZodType<T>) {
  return z.record(z.string(), schema);
}

function companyFileSchema<T extends object>(schema: z.ZodType<T>) {
  return z.object({ company: schema });
}

function withoutShared<T extends object>(
  file: { _shared?: object } & Record<string, object | undefined>,
  schema: z.ZodType<T>,
): Record<string, T> {
  const records: Record<string, T> = {};
  for (const [key, value] of Object.entries(file)) {
    if (key !== "_shared") records[key] = schema.parse(value);
  }
  return records;
}

function loadEntity<B extends EntityRecord, T extends TextRecord>(
  name: string,
  baseJson: unknown,
  trJson: unknown,
  enJson: unknown,
  locale: Locale,
  baseSchema: z.ZodType<B>,
  textSchema: PartialableSchema<T>,
): Array<B & T> {
  const base = recordSchema(baseSchema).parse(baseJson);
  const trText = recordSchema(textSchema).parse(trJson);
  const localeText = recordSchema(textSchema.partial()).parse(locale === "en" ? enJson : trJson);
  return mergeEntity(name, base, trText, localeText, baseSchema, textSchema);
}

function buildContent(locale: Locale) {
  const productsFileSchema = z.object({
    records: recordSchema(productBaseSchema),
    homeFeaturedSlugs: z.array(z.string()),
  });
  const parsedProducts = productsFileSchema.parse(baseProducts);
  const parsedTrProducts = productsTextFileSchema.parse(trProducts);
  const parsedLocaleProducts = productsTextPartialFileSchema.parse(
    locale === "en" ? enProducts : trProducts,
  );
  const products = mergeEntity(
    "products",
    parsedProducts.records,
    withoutShared(parsedTrProducts, productTextSchema),
    withoutShared(parsedLocaleProducts, productTextPartialSchema),
    productBaseSchema,
    productTextSchema,
  ).map((product) =>
    productSchema.parse({
      ...product,
      description:
        productTextSchema.parse(product).description ??
        (product.descriptionKey === "contact"
          ? parsedLocaleProducts._shared?.contact ?? parsedTrProducts._shared.contact
          : undefined),
    }),
  );

  const parsedBaseCompany = companyFileSchema(companyBaseSchema).parse(baseCompany).company;
  const parsedTrCompany = companyFileSchema(companyTextSchema).parse(trCompany).company;
  const parsedLocaleCompany = companyFileSchema(companyTextPartialSchema).parse(
    locale === "en" ? enCompany : trCompany,
  ).company;
  const company = companySchema.parse({
    ...parsedBaseCompany,
    ...parsedTrCompany,
    ...parsedLocaleCompany,
    address: {
      ...parsedBaseCompany.address,
      ...parsedTrCompany.address,
      ...parsedLocaleCompany.address,
    },
    socials: mergeByIndex(
      "company.socials",
      parsedBaseCompany.socials,
      parsedTrCompany.socials,
      parsedLocaleCompany.socials ?? parsedTrCompany.socials,
    ),
    stats: mergeByIndex(
      "company.stats",
      parsedBaseCompany.stats,
      parsedTrCompany.stats,
      parsedLocaleCompany.stats ?? parsedTrCompany.stats,
    ),
  });

  const parsedBaseImages = recordSchema(imageBaseSchema).parse(baseImages);
  const parsedTrImages = recordSchema(imageTextSchema).parse(trImages);
  const parsedLocaleImages = recordSchema(imageTextSchema.partial()).parse(
    locale === "en" ? enImages : trImages,
  );
  const images: Record<string, z.infer<typeof imageSchema>> = {};
  for (const [key, image] of Object.entries(parsedBaseImages)) {
    images[key] = imageSchema.parse({
      ...image,
      ...parsedTrImages[key],
      ...parsedLocaleImages[key],
    });
  }

  return {
    company,
    services: loadEntity(
      "services", baseServices, trServices, enServices, locale, serviceBaseSchema, serviceTextSchema,
    ),
    categories: loadEntity(
      "categories", baseCategories, trCategories, enCategories, locale, categoryBaseSchema, categoryTextSchema,
    ),
    products,
    homeFeaturedSlugs: parsedProducts.homeFeaturedSlugs,
    references: loadEntity(
      "references", baseReferences, trReferences, enReferences, locale, referenceBaseSchema, referenceTextSchema,
    ),
    news: loadEntity("news", baseNews, trNews, enNews, locale, newsBaseSchema, newsTextSchema),
    faq: loadEntity("faq", baseFaq, trFaq, enFaq, locale, faqBaseSchema, faqTextSchema),
    legal: loadEntity("legal", baseLegal, trLegal, enLegal, locale, legalBaseSchema, legalTextSchema),
    images,
  };
}

/** İstenen dil için doğrulanmış içerik kataloğunu döndürür. */
export function loadContent(locale: Locale) {
  const existing = cache.get(locale);
  if (existing) return existing;

  const content = buildContent(locale);
  cache.set(locale, content);
  return content;
}
