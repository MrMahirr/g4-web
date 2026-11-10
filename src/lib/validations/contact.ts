import { z } from "zod";
import { tr } from "@/dictionaries/tr";

const errors = tr.form.errors;

/** Türkiye ve uluslararası numaralar için esnek kontrol: rakam, boşluk, +, (, ), - ve en az 10 rakam. */
const phonePattern = /^\+?[\d\s()-]+$/;

export const contactSchema = z.object({
  name: z.string().trim().min(2, errors.nameShort),
  email: z.string().trim().min(1, errors.required).pipe(z.email(errors.email)),
  phone: z
    .string()
    .trim()
    .min(1, errors.required)
    .refine((value) => phonePattern.test(value) && value.replace(/\D/g, "").length >= 10, errors.phone),
  subject: z.string().trim().min(2, errors.required),
  message: z.string().trim().min(10, errors.messageShort),
  kvkk: z.boolean().refine((value) => value, errors.kvkk),
});

export type ContactValues = z.infer<typeof contactSchema>;
