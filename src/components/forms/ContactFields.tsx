"use client";

import { useWatch, type UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";
import { KvkkConsent } from "@/components/forms/KvkkConsent";
import { Button } from "@/components/ui/Button";
import { Field, Textarea, TextInput } from "@/components/ui/Field";
import type { ContactValues } from "@/lib/validations/contact";

type Props = {
  auto: boolean;
  form: UseFormReturn<ContactValues>;
};

export function ContactFields({ auto, form }: Props) {
  const t = useTranslations();
  const { register, setValue, formState, control } = form;
  const { errors, isSubmitting } = formState;
  const kvkkChecked = useWatch({ control, name: "kvkk" });
  return (
    <>
      {/* Küçük ekranda ad ve e-posta tam genişlik; telefon + konu yan yana. */}
      <Field id="iletisim-ad" label={`${t("form.name")}*`} error={errors.name?.message} className="col-span-full sm:col-span-1">
        <TextInput id="iletisim-ad" autoComplete="name" invalid={Boolean(errors.name)} {...register("name")} />
      </Field>
      <Field
        id="iletisim-eposta"
        label={`${t("form.email")}*`}
        error={errors.email?.message}
        className="col-span-full sm:col-span-1"
      >
        <TextInput
          id="iletisim-eposta"
          type="email"
          autoComplete="email"
          invalid={Boolean(errors.email)}
          {...register("email")}
        />
      </Field>
      <Field id="iletisim-telefon" label={`${t("form.phone")}*`} error={errors.phone?.message}>
        <TextInput
          id="iletisim-telefon"
          type="tel"
          autoComplete="tel"
          invalid={Boolean(errors.phone)}
          {...register("phone")}
        />
      </Field>
      <Field id="iletisim-konu" label={`${t("form.subject")}*`} error={errors.subject?.message}>
        <TextInput id="iletisim-konu" auto={auto} invalid={Boolean(errors.subject)} {...register("subject")} />
      </Field>
      <Field
        id="iletisim-mesaj"
        label={`${t("form.message")}*`}
        error={errors.message?.message}
        className="col-span-full"
      >
        <Textarea
          id="iletisim-mesaj"
          auto={auto}
          invalid={Boolean(errors.message)}
          className="min-h-[clamp(5.5rem,3.5rem+8.33vw,13.125rem)]"
          {...register("message")}
        />
      </Field>
      <KvkkConsent
        id="iletisim-kvkk"
        error={errors.kvkk?.message}
        checked={kvkkChecked}
        onChange={(value) => setValue("kvkk", value, { shouldValidate: true })}
      />
      <div className="col-span-full flex flex-wrap items-center gap-x-5 gap-y-2.5">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("form.submitting") : t("form.submit")}
        </Button>
        <span className="font-mono text-xs tracking-[0.04em] text-muted">{t("i18n.mail.sendHint")}</span>
      </div>
    </>
  );
}
