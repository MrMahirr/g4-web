"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import legalDocuments from "../../../content/tr/legal.json";
import { routes } from "@/data/navigation.data";
import { cn } from "@/lib/utils";

type Props = { id: string; error?: string; checked: boolean; onChange: (checked: boolean) => void };

const kvkk = legalDocuments["kvkk-aydinlatma-metni"];

/**
 * KVKK onayı — tüm formlarda zorunlu. Kutu işaretlenmek istendiğinde aydınlatma metni popup olarak açılır;
 * kutu yalnızca metnin altındaki "Okudum, onaylıyorum" ile işaretlenir. İşaretsiz form gönderilemez (zod).
 */
export function KvkkConsent({ id, error, checked, onChange }: Props) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const toggle = () => (checked ? onChange(false) : setOpen(true));
  const confirm = () => {
    onChange(true);
    setOpen(false);
  };

  return (
    <div className="col-span-full flex flex-col gap-2">
      <div className="flex items-start gap-3 text-sm leading-[1.6] text-muted">
        <button
          type="button"
          role="checkbox"
          id={id}
          aria-checked={checked}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${id}-hata` : undefined}
          onClick={toggle}
          className={cn(
            "mt-0.5 grid size-5 flex-none cursor-pointer place-items-center rounded-[0.25rem] border transition-colors duration-300",
            checked ? "border-ember-d bg-ember-d text-white" : "border-ink/30 bg-white",
            error && !checked && "border-ember-d",
          )}
        >
          {checked ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : null}
        </button>
        <span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="cursor-pointer font-semibold text-ink underline-offset-2 hover:underline"
          >
            {t("form.kvkkLink")}
          </button>
          {t("form.kvkkRest")}
        </span>
      </div>

      {error ? (
        <p id={`${id}-hata`} role="alert" className="text-[0.8125rem] text-ember-d">
          {error}
        </p>
      ) : null}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[210] bg-ink/50 backdrop-blur-[0.125rem]" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed top-1/2 left-1/2 z-[220] flex max-h-[min(85dvh,40rem)] w-[calc(100%-2rem)] max-w-[35rem] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-card bg-white shadow-[0_2.5rem_5rem_-1.875rem_rgb(30_48_64/0.5)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-6 py-4">
              <Dialog.Title className="font-display text-[1.25rem] font-semibold tracking-[-0.02em] text-ink">
                {kvkk?.title ?? t("form.kvkkLink")}
              </Dialog.Title>
              <Dialog.Close
                aria-label={t("common.close")}
                className="grid size-10 flex-none cursor-pointer place-items-center rounded-full text-ink hover:bg-ink/7"
              >
                <X size={18} aria-hidden="true" />
              </Dialog.Close>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5 leading-[1.75] text-pretty text-muted">
              {kvkk?.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <Link href={routes.kvkk} target="_blank" className="inline-block font-semibold text-ink underline underline-offset-2">
                {t("form.kvkkFull")}
              </Link>
            </div>

            <div className="border-t border-ink/10 bg-white px-6 py-4">
              <button
                type="button"
                onClick={confirm}
                className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-btn bg-ember px-5 font-medium text-white transition-colors duration-300 hover:bg-ember-d"
              >
                <Check size={18} aria-hidden="true" />
                {t("form.kvkkConfirm")}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
