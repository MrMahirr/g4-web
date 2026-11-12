"use client";

import { useRef, type KeyboardEvent } from "react";

/** Bir kapsamdaki odaklanabilir sonuçlar arasında ok tuşlarıyla döngüsel gezinir. */
export function useListKeyboardNav<T extends HTMLElement>(selector: string) {
  const containerRef = useRef<T>(null);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const items = Array.from(containerRef.current?.querySelectorAll<HTMLElement>(selector) ?? []);
    if (!items.length) return;
    event.preventDefault();
    const current = items.indexOf(document.activeElement as HTMLElement);
    const step = event.key === "ArrowDown" ? 1 : -1;
    items[(current + step + items.length) % items.length]?.focus();
  };

  return { containerRef, onKeyDown };
}
