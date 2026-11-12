"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { setLocale } from "@/i18n/actions";
import type { Locale } from "@/i18n/request";
import { cn, EASE_SOFT } from "@/lib/utils";

const options: Locale[] = ["tr", "en"];

function useLanguage() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [current, update] = useOptimistic(locale, (_, next: Locale) => next);

  const select = (next: Locale) => {
    if (next === current) return;
    startTransition(async () => {
      update(next);
      await setLocale(next);
      router.refresh();
    });
  };

  return { current, pending, select };
}

/** Dil kodu kısaltması (TR / EN); tam dil adı aria-label ile verilir. */
const code = (locale: Locale) => locale.toUpperCase();

/** Masaüstü: yalnız dil kodunu gösteren küçük açılır menü. */
export function LanguageToggle() {
  const t = useTranslations();
  const reduceMotion = useReducedMotion();
  const { current, pending, select } = useLanguage();

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        aria-label={`${t("language.label")}: ${t(current === "tr" ? "language.turkish" : "language.english")}`}
        className="inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-full px-2.5 font-mono text-[12px] tracking-[0.06em] text-ink transition-colors duration-300 hover:bg-ink/7 data-[state=open]:bg-ink/7"
      >
        {code(current)}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={10}
          className="z-[120] min-w-[168px] origin-(--radix-dropdown-menu-content-transform-origin) rounded-[8px] border border-line bg-white p-1.5 shadow-[0_24px_48px_-24px_rgb(30_48_64/0.4)] data-[state=closed]:animate-mega-out data-[state=open]:animate-mega-in motion-reduce:animate-none"
        >
          {options.map((option, index) => (
            <DropdownMenu.Item key={option} asChild onSelect={() => select(option)}>
              <motion.button
                type="button"
                disabled={pending}
                aria-label={t(option === "tr" ? "language.turkish" : "language.english")}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE_SOFT, delay: 0.04 * index }}
                className="flex h-10 w-full cursor-pointer items-center gap-3 rounded-btn px-3 text-left text-[14px] font-medium text-ink outline-none data-[highlighted]:bg-ink/7 data-[disabled]:cursor-wait"
              >
                <span className="flex-1 font-mono tracking-[0.06em]">{code(option)}</span>
                {current === option ? <Check size={15} aria-hidden="true" className="text-ember-d" /> : null}
              </motion.button>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

/** Mobil: hamburger menünün en altında bayraklı iki seçenek. */
export function LanguageList() {
  const t = useTranslations();
  const { current, pending, select } = useLanguage();

  return (
    <div role="radiogroup" aria-label={t("language.label")} className="mt-8 grid grid-cols-2 gap-2 border-t border-ink/10 pt-6">
      {options.map((option) => {
        const active = current === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={pending}
            aria-label={t(option === "tr" ? "language.turkish" : "language.english")}
            onClick={() => select(option)}
            className={cn(
              "flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-btn border px-3 text-[15px] font-medium transition-colors duration-300 disabled:cursor-wait",
              active ? "border-ember-d bg-ember/10 text-ink" : "border-ink/12 text-muted hover:bg-ink/5",
            )}
          >
            <span className="font-mono tracking-[0.06em]">{code(option)}</span>
          </button>
        );
      })}
    </div>
  );
}
