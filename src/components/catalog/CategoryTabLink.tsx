"use client";

import Link from "next/link";
import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

/**
 * Sekme geçişinden sonra odağın verileceği yol. Yalnız istemcide yazılır.
 * Chromium, tıklanan (odaklı) bağlantı sayfa değişirken kaldırılınca sayfayı başa kaydırıyor
 * (scroll={false} olsa da). Bu yüzden tıklamada odak bırakılır, geçişten sonra yeni seçili sekmeye
 * kaydırmadan geri verilir (klavye kullanıcısı yerini kaybetmez).
 */
let focusAfterNavigation: string | null = null;

type Props = Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "scroll"> & {
  href: string;
  current: boolean;
};

/** Ürün kategorisi sekmesi: geçişte sayfa kaydırması korunur. */
export function CategoryTabLink({ href, current, onClick, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (current && focusAfterNavigation === href) {
      focusAfterNavigation = null;
      ref.current?.focus({ preventScroll: true });
    }
  }, [current, href]);

  return (
    <Link
      {...rest}
      ref={ref}
      href={href}
      scroll={false}
      aria-current={current ? "page" : undefined}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || current) return;
        focusAfterNavigation = href;
        event.currentTarget.blur();
      }}
    />
  );
}
