import deepmerge from "deepmerge";
import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import trMessages from "../../messages/tr.json";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];

/** Diziler birleştirilmez, çeviri dizisi Türkçenin yerine geçer (deepmerge varsayılanı uç uca ekler). */
const overwriteArrays = <T>(_target: T[], source: T[]) => source;

export default getRequestConfig(async () => {
  const value = (await cookies()).get("NEXT_LOCALE")?.value;
  const locale: Locale = value === "en" || value === "tr" ? value : "tr";

  if (locale === "tr") return { locale, messages: trMessages };

  // Türkçe taban, üstüne seçili dil: çeviride eksik kalan anahtar boş yerine Türkçe görünür.
  const localeMessages = (await import(`../../messages/${locale}.json`)).default;
  return {
    locale,
    messages: deepmerge(trMessages, localeMessages, { arrayMerge: overwriteArrays }),
  };
});
