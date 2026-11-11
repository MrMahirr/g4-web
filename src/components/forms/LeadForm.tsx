"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Field, Textarea, TextInput } from "@/components/ui/Field";
import { Tag } from "@/components/ui/Tag";
import { tr } from "@/dictionaries/tr";
import { cn } from "@/lib/utils";
import { careerSchema, quoteRequestSchema, type LeadValues } from "@/lib/validations/contact";
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

function schemaFor(kind: Kind) {
  switch (kind) {
    case "quote":
      return quoteRequestSchema;
    case "career":
      return careerSchema;
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
  const { register, handleSubmit, formState, reset } = useForm<LeadValues>({
    resolver: zodResolver(schemaFor(kind)),
    defaultValues: { name: "", email: "", phone: "", message: "", kvkk: false },
  });
  const { errors, isSubmitting } = formState;
  const id = (field: string) => `${idPrefix}-${field}`;

  const onSubmit = (values: LeadValues) => {
    const body = [`Ad Soyad: ${values.name}`, `E-posta: ${values.email}`, `Telefon: ${values.phone}`, "", values.message].join("\n");
    window.location.assign(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    toast.message("E-posta uygulamanız açılıyor", { description: `Mesajınız ${email} adresine hazırlandı.` });
    reset();
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={cn("grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] content-start gap-x-6 gap-y-7", className)}
    >
      {tag ? <Tag className="col-span-full">{tag}</Tag> : null}

      <Field id={id("ad")} label={`${tr.form.name} *`} error={errors.name?.message}>
        <TextInput id={id("ad")} autoComplete="name" invalid={Boolean(errors.name)} {...register("name")} />
      </Field>
      <Field id={id("eposta")} label={`${tr.form.email} *`} error={errors.email?.message}>
        <TextInput id={id("eposta")} type="email" autoComplete="email" invalid={Boolean(errors.email)} {...register("email")} />
      </Field>
      <Field id={id("telefon")} label={`${tr.form.phone} *`} error={errors.phone?.message}>
        <TextInput id={id("telefon")} type="tel" autoComplete="tel" invalid={Boolean(errors.phone)} {...register("phone")} />
      </Field>
      {kind === "quote" ? (
        <Field id={id("konu")} label={`${tr.form.subject} *`}>
          <TextInput id={id("konu")} value={subject} readOnly auto />
        </Field>
      ) : null}
      <Field
        id={id("mesaj")}
        label={kind === "quote" ? `${tr.form.message} *` : tr.form.optionalMessage}
        error={errors.message?.message}
        className="col-span-full"
      >
        <Textarea id={id("mesaj")} invalid={Boolean(errors.message)} {...register("message")} />
      </Field>

      <KvkkConsent id={id("kvkk")} error={errors.kvkk?.message} registration={register("kvkk")} />

      <div className="col-span-full">
        <Button type="submit" disabled={isSubmitting}>
          {tr.form.submit}
        </Button>
      </div>
    </form>
  );
}
