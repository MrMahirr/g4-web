import { z } from "zod";

type Translate = (key: `form.errors.${"nameShort" | "required" | "email" | "phone" | "kvkk" | "messageShort"}`) => string;
const phonePattern = /^\+?[\d\s()-]+$/;

/** Creates validation schemas with messages from the active next-intl locale. */
export function createContactSchemas(t: Translate) {
  const personFields = {
    name: z.string().trim().min(2, t("form.errors.nameShort")),
    email: z.string().trim().min(1, t("form.errors.required")).pipe(z.email(t("form.errors.email"))),
    phone: z.string().trim().min(1, t("form.errors.required")).refine(
      (value) => phonePattern.test(value) && value.replace(/\D/g, "").length >= 10,
      t("form.errors.phone"),
    ),
    kvkk: z.boolean().refine((value) => value, t("form.errors.kvkk")),
  };
  const requiredMessage = z.string().trim().min(10, t("form.errors.messageShort"));
  const contactSchema = z.object({ ...personFields, subject: z.string().trim().min(2, t("form.errors.required")), message: requiredMessage });
  const quoteRequestSchema = z.object({ ...personFields, message: requiredMessage });
  const careerSchema = z.object({ ...personFields, message: z.string().trim() });
  return { contactSchema, quoteRequestSchema, careerSchema };
}

export type ContactValues = z.infer<ReturnType<typeof createContactSchemas>["contactSchema"]>;
export type LeadValues = z.infer<ReturnType<typeof createContactSchemas>["careerSchema"]>;
