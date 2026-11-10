import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Temadaki özel yazı ölçeklerini (text-d1…) tailwind-merge'e tanıtır; yoksa renk sınıfı sanıp siler. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["d1", "d2", "d3", "lead"] }],
    },
  },
});

/** Koşullu sınıfları birleştirir, çakışan Tailwind sınıflarında sonuncuyu bırakır. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Tasarımın iki hareket eğrisi — motion geçişlerinde kullanılır (CSS karşılıkları: ease-soft, ease-curtain). */
export const EASE_SOFT = [0.16, 1, 0.3, 1] as const;
export const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;
