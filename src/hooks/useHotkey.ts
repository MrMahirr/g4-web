"use client";

import { useEventListener } from "usehooks-ts";

type Options = {
  mod?: boolean;
};

/** Klavye kısayolunu pencereye bağlar; mod seçeneği Ctrl ve ⌘ tuşlarını kapsar. */
export function useHotkey(key: string, handler: () => void, options: Options = {}) {
  useEventListener("keydown", (event) => {
    const matchesModifier = !options.mod || event.ctrlKey || event.metaKey;
    if (!matchesModifier || event.key.toLowerCase() !== key.toLowerCase()) return;
    event.preventDefault();
    handler();
  });
}
