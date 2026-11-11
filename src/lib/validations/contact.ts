import { z } from "zod";
import { tr } from "@/dictionaries/tr";

const errors = tr.form.errors;

/** Türkiye ve uluslararası numaralar için esnek kontrol: rakam, boşluk, +, (, ), - ve en az 10 rakam. */
const phonePattern = /^\+?[\d\s()-]+$/;

/** Tüm formlarda ortak kişi alanları + KVKK onayı. */
const personFields = {
  name: z.string().trim().min(2, errors.nameShort),
  email: z.string().trim().min(1, errors.required).pipe(z.email(errors.email)),
  phone: z
    .string()
    .trim()
    .min(1, errors.required)
    .refine((value) => phonePattern.test(value) && value.replace(/\D/g, "").length >= 10, errors.phone),
  kvkk: z.boolean().refine((value) => value, errors.kvkk),
};

const requiredMessage = z.string().trim().min(10, errors.messageShort);

/** İletişim formu (konu kullanıcıdan). */
export const contactSchema = z.object({
  ...personFields,
  subject: z.string().trim().min(2, errors.required),
  message: requiredMessage,
});
export type ContactValues = z.infer<typeof contactSchema>;

/** Hizmet teklif formu (konu sabit, mesaj zorunlu). */
export const quoteRequestSchema = z.object({ ...personFields, message: requiredMessage });

/** İK başvuru formu (mesaj isteğe bağlı; T.C. kimlik no istenmez — plan Ç10). */
export const careerSchema = z.object({ ...personFields, message: z.string().trim() });

export type LeadValues = z.infer<typeof careerSchema>;
