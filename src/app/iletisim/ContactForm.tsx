"use client";

import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ContactFields } from "@/components/forms/ContactFields";
import { useContactSender } from "@/components/forms/ContactSenderProvider";
import { InquiryNote } from "@/components/forms/InquiryNote";
import { Reveal } from "@/components/motion/Reveal";
import { isOrderInquiry } from "@/core/inquiry";
import { useInquiryLines } from "@/hooks/useInquiryLines";
import { composeContactBody } from "@/lib/contact/compose";
import { buildInquiryDraft } from "@/lib/inquiry-draft";
import { createContactSchemas, type ContactValues } from "@/lib/validations/contact";
import type { QuoteProductInfo } from "@/types/catalog-view";

type Props = {
  email: string;
  products: QuoteProductInfo[];
};

/**
 * İletişim formu (tasarım: D4Iletisim). Ürün sayfasından gelen talep (sipariş listesi veya tek ürün sorusu)
 * forma bilgi şeridi olarak eklenir; Konu ve Mesaj otomatik doldurulur, kullanıcı değiştirebilir.
 * Gönderim: IContactSender üzerinden kullanıcının e-posta uygulaması açılır.
 */
export function ContactForm({ email, products }: Props) {
  const t = useTranslations();
  const sender = useContactSender();
  const inquiry = useInquiryLines(products);
  const draft = useMemo(() => {
    return buildInquiryDraft({
      type: inquiry.type,
      lines: inquiry.lines,
      products: inquiry.bySlug,
      legacyProduct: inquiry.legacyProduct,
      labels: {
        hello: t("i18n.mail.hello"),
        thanks: t("i18n.mail.thanks"),
        subject: {
          siparis: t("inquiry.subjects.siparis"),
          bilgi: t("inquiry.subjects.bilgi"),
          soru: t("inquiry.subjects.soru"),
        },
        intro: {
          siparis: t("inquiry.intros.siparis"),
          bilgi: t("inquiry.intros.bilgi"),
          soru: t("inquiry.intros.soru"),
        },
        countSuffix: t("product.countSuffix"),
      },
    });
  }, [inquiry, t]);
  const form = useForm<ContactValues>({
    resolver: zodResolver(createContactSchemas(t).contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "", kvkk: false },
  });
  const { handleSubmit, setValue, getFieldState } = form;
  useEffect(() => {
    if (!getFieldState("subject").isDirty) setValue("subject", draft?.subject ?? "");
    if (!getFieldState("message").isDirty) setValue("message", draft?.message ?? "");
  }, [draft, getFieldState, setValue]);
  const onSubmit = (values: ContactValues) => {
    sender.send({
      to: email,
      subject: values.subject,
      body: composeContactBody(values, values.message, {
        name: (value) => t("i18n.mail.name", value),
        email: (value) => t("i18n.mail.email", value),
        phone: (value) => t("i18n.mail.phone", value),
      }),
    });
    toast.message(t("i18n.mail.opening"), { description: t("i18n.mail.prepared", { email }) });
  };
  const auto = Boolean(draft);

  return (
    <Reveal className="h-full">
      <form
        id="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid h-full scroll-mt-28 grid-cols-[repeat(auto-fit,minmax(min(13.75rem,100%),1fr))] content-start gap-x-6 gap-y-[1.875rem] rounded-card bg-white p-[clamp(1.75rem,4vw,3.5rem)]"
      >
        <h2 className="col-span-full font-display text-[clamp(2rem,3.4vw,3.25rem)] leading-none font-bold tracking-[-0.04em]">
          {t("nav.contact")}
        </h2>
        {inquiry.type && (inquiry.lines.length > 0 || inquiry.legacyProduct) ? (
          <InquiryNote
            type={inquiry.type}
            lines={inquiry.lines}
            bySlug={inquiry.bySlug}
            legacyProduct={inquiry.legacyProduct}
            onRemove={(slug) => {
              inquiry.removeLine(slug);
              if (isOrderInquiry(inquiry.type)) toast.message(t("quote.removed"));
            }}
          />
        ) : null}
        <ContactFields auto={auto} form={form} />
      </form>
    </Reveal>
  );
}
