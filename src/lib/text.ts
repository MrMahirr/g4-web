/** Metin yardımcıları (Türkçe). */

/** Paragrafı cümlelere böler: nokta/ünlem/soru + boşluk + büyük harf. */
export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+(?=[A-ZÇĞİÖŞÜ0-9])/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

/** Başlığı iki dengeli satıra böler (tasarım: "En İnovatif Şirket / Ödülünü Kazandık"). */
export function splitInTwo(title: string): [string, string] | [string] {
  const words = title.split(" ");
  if (words.length < 2) return [title];
  const half = Math.ceil(words.length / 2);
  return [words.slice(0, half).join(" "), words.slice(half).join(" ")];
}

const intlLocales = { tr: "tr-TR", en: "en-GB" } as const;

const dateFormats = Object.fromEntries(
  Object.entries(intlLocales).map(([locale, tag]) => [
    locale,
    new Intl.DateTimeFormat(tag, { day: "2-digit", month: "short", year: "numeric", timeZone: "Europe/Istanbul" }),
  ]),
) as Record<keyof typeof intlLocales, Intl.DateTimeFormat>;

/** "18 ŞUB 2020" / "18 FEB 2020" (tasarımdaki mono tarih biçimi). */
export function formatShortDate(iso: string, locale: keyof typeof intlLocales): string {
  return dateFormats[locale].format(new Date(iso)).replace(".", "").toLocaleUpperCase(intlLocales[locale]);
}

/** Haber/hizmet gövdesi için blok listesi: ilk cümle giriş, ilk paragraftan sonra görseller, sonraki paragraflarda ikinci cümle alıntı. */
export type ArticleBlock =
  | { kind: "lead"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "figure"; index: number };

export function articleBlocks(paragraphs: string[], figureCount: number, withQuote = true): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  paragraphs.forEach((paragraph, paragraphIndex) => {
    const sentences = splitSentences(paragraph);
    if (paragraphIndex === 0) {
      const [lead, ...rest] = sentences;
      if (lead) blocks.push({ kind: "lead", text: lead });
      rest.forEach((text) => blocks.push({ kind: "paragraph", text }));
      for (let index = 0; index < figureCount; index += 1) blocks.push({ kind: "figure", index });
      return;
    }
    if (withQuote && sentences.length >= 3) {
      blocks.push({ kind: "paragraph", text: sentences[0] });
      blocks.push({ kind: "quote", text: sentences[1] });
      blocks.push({ kind: "paragraph", text: sentences.slice(2).join(" ") });
      return;
    }
    blocks.push({ kind: "paragraph", text: paragraph });
  });
  return blocks;
}
