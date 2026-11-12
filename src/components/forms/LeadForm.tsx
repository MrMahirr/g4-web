"use client";
import { useTranslations } from "next-intl";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Field, Textarea, TextInput } from "@/components/ui/Field";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import { createContactSchemas, type LeadValues } from "@/lib/validations/contact";
import { KvkkConsent } from "./KvkkConsent";

type Kind = "quote" | "career";

type Props = {
  kind: Kind;
  /** Alan id önekleri (sayfada benzersiz). */
  idPrefix: string;
  /** E-posta konusu; hizmet formunda "Konu" alanında salt okunur gösterilir. */
  subject: string;
  /** Alıcı e-posta. */
  email: string;
  /** Formun üstündeki etiket (İK formu). */
  tag?: string;
  className?: string;
};

function schemaFor(kind: Kind, t: ReturnType<typeof useTranslations>) {
  const schemas = createContactSchemas(t);
  switch (kind) {
    case "quote":
      return schemas.quoteRequestSchema;
    case "career":
      return schemas.careerSchema;
    default: {
      const exhaustive: never = kind;
      return exhaustive;
    }
  }
}

/**
 * Hizmet teklif formu (D4HizmetDetay) ve İK başvuru formu (D4Kariyer).
 * Gönderim: e-posta sağlayıcısı bilgisi gelene kadar (plan K7) e-posta uygulaması açılır.
 */
export function LeadForm({ kind, idPrefix, subject, email, tag, className }: Props) {
  const t = useTranslations();
  const { register, handleSubmit, formState, reset, control, setValue } = useForm<LeadValues>({
    resolver: zodResolver(schemaFor(kind, t)),
    defaultValues: { name: "", email: "", phone: "", message: "", kvkk: false },
  });
  const { errors, isSubmitting } = formState;
  const kvkkChecked = useWatch({ control, name: "kvkk" });
  const id = (field: string) => `${idPrefix}-${field}`;

  const onSubmit = (values: LeadValues) => {
    const body = [
      t("i18n.mail.name", { value: values.name }),
      t("i18n.mail.email", { value: values.email }),
      t("i18n.mail.phone", { value: values.phone }),
      "",
      values.message,
    ].join("\n");
    window.location.assign(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    toast.message(t("i18n.mail.opening"), { description: t("i18n.mail.prepared", { email }) });
    reset();
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={cn("grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] content-start gap-x-6 gap-y-7", className)}
    >
      {tag ? <Tag className="col-span-full">{tag}</Tag> : null}

      <Field id={id("ad")} label={`${t("form.name")} *`} error={errors.name?.message}>
        <TextInput id={id("ad")} autoComplete="name" invalid={Boolean(errors.name)} {...register("name")} />
      </Field>
      <Field id={id("eposta")} label={`${t("form.email")} *`} error={errors.email?.message}>
        <TextInput id={id("eposta")} type="email" autoComplete="email" invalid={Boolean(errors.email)} {...register("email")} />
      </Field>
      <Field id={id("telefon")} label={`${t("form.phone")} *`} error={errors.phone?.message}>
        <TextInput id={id("telefon")} type="tel" autoComplete="tel" invalid={Boolean(errors.phone)} {...register("phone")} />
      </Field>
      {kind === "quote" ? (
        <Field id={id("konu")} label={`${t("form.subject")} *`}>
          <TextInput id={id("konu")} value={subject} readOnly auto />
        </Field>
      ) : null}
      <Field
        id={id("mesaj")}
        label={kind === "quote" ? `${t("form.message")} *` : t("form.optionalMessage")}
        error={errors.message?.message}
        className="col-span-full"
      >
        <Textarea id={id("mesaj")} invalid={Boolean(errors.message)} {...register("message")} />
      </Field>

      <KvkkConsent
        id={id("kvkk")}
        error={errors.kvkk?.message}
        checked={kvkkChecked}
        onChange={(value) => setValue("kvkk", value, { shouldValidate: true })}
      />

      <div className="col-span-full">
        <Button type="submit" disabled={isSubmitting}>
          {t("form.submit")}
        </Button>
      </div>
    </form>
  );
}
