import { z } from "zod";

const imageKeySchema = z.string();

export const serviceDomainSchema = z.enum(["medical", "construction", "textile", "fleet"]);
export const sarfSubGroupSchema = z.enum([
  "siringa-igne", "sonda-kateter", "solunum-anestezi", "cerrahi-pansuman",
  "kardiyoloji-kagit", "laboratuvar-tup", "koruyucu-diger",
]);

export const serviceBaseSchema = z.object({
  id: z.string(), slug: z.string(), imageKey: imageKeySchema, domain: serviceDomainSchema,
  relatedCategorySlug: z.string().optional(), isFeaturedOnHome: z.boolean().optional(),
});
export const serviceTextSchema = z.object({
  title: z.string(), shortDescription: z.string(), paragraphs: z.array(z.string()),
});
export const serviceSchema = serviceBaseSchema.extend(serviceTextSchema.shape);

export const categoryBaseSchema = z.object({
  id: z.string(), slug: z.string(), imageKey: imageKeySchema, domain: serviceDomainSchema,
});
export const categoryTextSchema = z.object({ title: z.string() });
export const categorySchema = categoryBaseSchema.extend(categoryTextSchema.shape);

export const productBaseSchema = z.object({
  id: z.string(), slug: z.string(), code: z.string().optional(), categorySlugs: z.array(z.string()),
  subGroup: sarfSubGroupSchema.optional(), imageKey: imageKeySchema,
  galleryKeys: z.array(imageKeySchema).optional(), isFeaturedOnHome: z.boolean().optional(),
  descriptionKey: z.string().optional(),
});
export const productTextSchema = z.object({
  title: z.string(), name: z.string(), description: z.string().optional(),
});
export const productTextPartialSchema = productTextSchema.partial();
export const productSchema = productBaseSchema.extend(productTextSchema.shape).extend({
  description: z.string(),
});
export const productsTextFileSchema = z
  .object({ _shared: z.object({ contact: z.string() }) })
  .catchall(productTextSchema);
export const productsTextPartialFileSchema = z
  .object({ _shared: z.object({ contact: z.string().optional() }).optional() })
  .catchall(productTextPartialSchema);

export const referenceBaseSchema = z.object({
  id: z.string(), imageKey: imageKeySchema.optional(), logoKey: imageKeySchema.optional(),
  isFeaturedOnHome: z.boolean().optional(),
});
export const referenceTextSchema = z.object({ title: z.string(), sectorLabel: z.string() });
export const referenceSchema = referenceBaseSchema.extend(referenceTextSchema.shape);

export const newsBaseSchema = z.object({
  id: z.string(), slug: z.string(), publishedAt: z.string(), imageKey: imageKeySchema,
  galleryKeys: z.array(imageKeySchema),
});
export const newsTextSchema = z.object({ title: z.string(), paragraphs: z.array(z.string()) });
export const newsSchema = newsBaseSchema.extend(newsTextSchema.shape);

export const faqBaseSchema = z.object({ id: z.string() });
export const faqTextSchema = z.object({ question: z.string(), answer: z.string() });
export const faqSchema = faqBaseSchema.extend(faqTextSchema.shape);

export const legalBaseSchema = z.object({
  slug: z.enum(["cerez-politikasi", "kvkk-aydinlatma-metni"]), approvalPending: z.boolean(),
});
export const legalTextSchema = z.object({ title: z.string(), paragraphs: z.array(z.string()) });
export const legalSchema = legalBaseSchema.extend(legalTextSchema.shape);

export const imageBaseSchema = z.object({
  src: z.string(), width: z.number(), height: z.number(), representative: z.boolean().optional(),
  credit: z.object({ site: z.string(), photographer: z.string(), url: z.string() }).optional(),
});
export const imageTextSchema = z.object({ alt: z.string() });
export const imageSchema = imageBaseSchema.extend(imageTextSchema.shape);

const addressBaseSchema = z.object({ mapsUrl: z.string(), mapsEmbedUrl: z.string() });
const addressTextSchema = z.object({
  full: z.string(), street: z.string(), district: z.string(), city: z.string(),
});
const socialBaseSchema = z.object({
  channel: z.enum(["whatsapp", "telegram", "instagram", "x", "linkedin"]),
  label: z.string(), href: z.string().nullable(),
});
const socialTextSchema = z.object({ label: z.string() });
/** Sayaçlar: base'de yalnız dile bağlı olmayan kimlik ve sayı; etiketler content/{locale}/company.json'da. */
const statBaseSchema = z.object({
  id: z.enum(["customers", "orders", "products", "packages"]),
  value: z.number(),
});
const statTextSchema = z.object({ kicker: z.string(), label: z.string() });

export const companyBaseSchema = z.object({
  legalName: z.string(), shortName: z.string(), address: addressBaseSchema,
  phone: z.object({ display: z.string(), tel: z.string() }), email: z.string(), whatsappUrl: z.string(),
  socials: z.array(socialBaseSchema), stats: z.array(statBaseSchema),
});
export const companyTextSchema = z.object({
  address: addressTextSchema, socials: z.array(socialTextSchema), stats: z.array(statTextSchema),
});
export const companyTextPartialSchema = z.object({
  address: addressTextSchema.partial().optional(),
  socials: z.array(socialTextSchema.partial()).optional(),
  stats: z.array(statTextSchema.partial()).optional(),
});
export const companySchema = companyBaseSchema.extend({
  address: addressBaseSchema.extend(addressTextSchema.shape),
  socials: z.array(socialBaseSchema.extend(socialTextSchema.shape)),
  stats: z.array(statBaseSchema.extend(statTextSchema.shape)),
});

export type ServiceItemSchema = z.infer<typeof serviceSchema>;
export type ProductCategorySchema = z.infer<typeof categorySchema>;
export type ProductItemSchema = z.infer<typeof productSchema>;
export type ReferenceItemSchema = z.infer<typeof referenceSchema>;
export type NewsItemSchema = z.infer<typeof newsSchema>;
export type FaqItemSchema = z.infer<typeof faqSchema>;
export type LegalDocumentSchema = z.infer<typeof legalSchema>;
export type CompanyInfoSchema = z.infer<typeof companySchema>;
export type ImageEntrySchema = z.infer<typeof imageSchema>;
