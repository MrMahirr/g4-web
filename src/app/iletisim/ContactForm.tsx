"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { QuoteProductInfo } from "@/components/layout/types";
import { KvkkConsent } from "@/components/forms/KvkkConsent";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Field, Textarea, TextInput } from "@/components/ui/Field";
import { Tag } from "@/components/ui/Tag";
import type { InquiryType, QuoteLine } from "@/core/types";
import { routes } from "@/data/navigation.data";
import { tr } from "@/dictionaries/tr";
import { useInquiry } from "@/hooks/useInquiry";
import { useQuoteCart } from "@/hooks/useQuoteCart";
import { EASE_SOFT } from "@/lib/utils";
import { contactSchema, type ContactValues } from "@/lib/validations/contact";

type Props = {
  email: string;
  products: QuoteProductInfo[];
};

const noteActionClass =
  "inline-flex min-h-10 cursor-pointer items-center rounded-tag px-3.5 font-mono text-xs tracking-[0.06em] uppercase no-underline";

/**
 * İletişim formu (tasarım: D4Iletisim). Ürün sayfasından gelen talep (sipariş listesi veya tek ürün sorusu)
 * forma bilgi şeridi olarak eklenir; Konu ve Mesaj otomatik doldurulur, kullanıcı değiştirebilir.
 * Gönderim: e-posta sağlayıcısı bilgisi gelene kadar (plan K7) kullanıcının e-posta uygulaması açılır.
 */
export function ContactForm({ email, products }: Props) {
  const params = useSearchParams();
  const reduceMotion = useReducedMotion();
  const { inquiry, clear: clearInquiry } = useInquiry();
  const cart = useQuoteCart();
  const legacyProduct = params.get("product_name");

  const bySlug = useMemo(() => new Map(products.map((product) => [product.slug, product])), [products]);
  const type: InquiryType | null = inquiry.type ?? (legacyProduct ? "bilgi" : null);
  const lines: QuoteLine[] = useMemo(() => {
    switch (inquiry.type) {
      case "siparis":
        return cart.lines;
      case "bilgi":
      case "soru":
        return inquiry.product ? [inquiry.product] : [];
      default:
        return [];
    }
  }, [inquiry, cart.lines]);

  const draft = useMemo(() => {
    if (!type) return null;
    const described = lines.map((line) => {
      const product = bySlug.get(line.productSlug);
      const name = product?.name ?? line.productSlug;
      const code = product?.code ? ` (Ref: ${product.code})` : "";
      return type === "siparis" ? `- ${name}${code} – ${line.qty} ${line.unit}` : `- ${name}${code}`;
    });
    if (!described.length && legacyProduct) described.push(`- ${legacyProduct}`);
    if (!described.length) return null;

    const single = lines.length === 1 ? bySlug.get(lines[0].productSlug) : undefined;
    const suffix = single ? ` – ${single.code ?? single.name}` : lines.length > 1 ? ` – ${lines.length} ürün` : "";
    return {
      subject: `${tr.inquiry.subjects[type]}${suffix}`,
      message: ["Merhaba,", "", tr.inquiry.intros[type], "", ...described, "", "Teşekkürler."].join("\n"),
    };
  }, [type, lines, bySlug, legacyProduct]);

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "", kvkk: false },
  });
  const { register, handleSubmit, setValue, getFieldState, formState } = form;
  const { errors, isSubmitting } = formState;

  // Talep değişince (ürün eklendi/kaldırıldı) kullanıcı elle değiştirmediyse Konu ve Mesaj'ı yeniden yaz.
  useEffect(() => {
    if (!getFieldState("subject").isDirty) setValue("subject", draft?.subject ?? "");
    if (!getFieldState("message").isDirty) setValue("message", draft?.message ?? "");
  }, [draft, getFieldState, setValue]);

  const removeLine = (slug: string) => {
    if (inquiry.type === "siparis") {
      cart.remove(slug);
      if (lines.length <= 1) clearInquiry();
    } else {
      clearInquiry();
    }
  };

  const onSubmit = (values: ContactValues) => {
    const body = [
      `Ad Soyad: ${values.name}`,
      `E-posta: ${values.email}`,
      `Telefon: ${values.phone}`,
      "",
      values.message,
    ].join("\n");
    window.location.assign(`mailto:${email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`);
    toast.message("E-posta uygulamanız açılıyor", { description: `Mesajınız ${email} adresine hazırlandı.` });
  };

  const auto = Boolean(draft);

  return (
    <Reveal>
      <form
        id="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="grid scroll-mt-28 grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] content-start gap-x-6 gap-y-[30px] rounded-card bg-white p-[clamp(28px,4vw,56px)]"
      >
        <div className="col-span-full flex flex-col gap-3.5">
          <Tag>{tr.common.requestInfo}</Tag>
          <h2 className="font-display text-[clamp(32px,3.4vw,52px)] leading-none font-bold tracking-[-0.04em]">İletişim Formu</h2>
        </div>

        {type && (lines.length > 0 || legacyProduct) ? (
          <motion.div
            className="col-span-full grid grid-cols-[auto_minmax(0,1fr)] items-start gap-5 rounded-card bg-tint p-[22px] max-row:grid-cols-1"
            initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.8, ease: EASE_SOFT }}
          >
            <span className="flex size-[52px] items-center justify-center rounded-full bg-ember text-white">
              <ShoppingBag size={22} aria-hidden="true" />
            </span>
            <div className="flex min-w-0 flex-col gap-3">
              <span className="font-mono text-[11px] tracking-[0.08em] text-ember-d uppercase">
                {tr.inquiry.labels[type]} · {tr.inquiry.addedToForm}
              </span>
              {lines.length > 0 ? (
                <ul className="m-0 flex list-none flex-col gap-3 p-0">
                  {lines.map((line) => {
                    const product = bySlug.get(line.productSlug);
                    return (
                      <li key={line.productSlug} className="flex flex-wrap items-center justify-between gap-3">
                        <span className="flex min-w-0 flex-col gap-1">
                          <strong className="text-[15px] leading-[1.4]">{product?.name ?? line.productSlug}</strong>
                          <span className="font-mono text-xs tracking-[0.04em] text-muted">
                            {product?.code ? `REF: ${product.code}` : "G4 ÜRÜNLERİ"}
                            {type === "siparis" ? ` · MİKTAR: ${line.qty} ${line.unit.toLocaleUpperCase("tr-TR")}` : ""}
                          </span>
                        </span>
                        <span className="flex gap-2">
                          <Link href={routes.product(line.productSlug)} className={`${noteActionClass} bg-white text-ink`}>
                            {tr.inquiry.edit}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeLine(line.productSlug)}
                            className={`${noteActionClass} border border-ink/30 bg-transparent text-ink`}
                          >
                            {tr.inquiry.removeFromForm}
                          </button>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <strong className="text-[15px] leading-[1.4]">{legacyProduct}</strong>
              )}
            </div>
          </motion.div>
        ) : null}

        <Field id="iletisim-ad" label={`${tr.form.name}*`} error={errors.name?.message}>
          <TextInput id="iletisim-ad" autoComplete="name" invalid={Boolean(errors.name)} {...register("name")} />
        </Field>
        <Field id="iletisim-eposta" label={`${tr.form.email}*`} error={errors.email?.message}>
          <TextInput id="iletisim-eposta" type="email" autoComplete="email" invalid={Boolean(errors.email)} {...register("email")} />
        </Field>
        <Field id="iletisim-telefon" label={`${tr.form.phone}*`} error={errors.phone?.message}>
          <TextInput id="iletisim-telefon" type="tel" autoComplete="tel" invalid={Boolean(errors.phone)} {...register("phone")} />
        </Field>
        <Field id="iletisim-konu" label={`${tr.form.subject}*`} error={errors.subject?.message}>
          <TextInput id="iletisim-konu" auto={auto} invalid={Boolean(errors.subject)} {...register("subject")} />
        </Field>
        <Field id="iletisim-mesaj" label={`${tr.form.message}*`} error={errors.message?.message} className="col-span-full">
          <Textarea id="iletisim-mesaj" auto={auto} invalid={Boolean(errors.message)} className="min-h-[210px]" {...register("message")} />
        </Field>

        <KvkkConsent id="iletisim-kvkk" error={errors.kvkk?.message} registration={register("kvkk")} />

        <div className="col-span-full flex flex-wrap items-center gap-5">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? tr.form.submitting : tr.form.submit}
          </Button>
          <span className="font-mono text-xs tracking-[0.04em] text-muted">Gönder: e-posta uygulamanız açılır.</span>
        </div>
      </form>
    </Reveal>
  );
}
