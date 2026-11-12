"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { markCalmNavigation } from "./calmNavigation";

type Props = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & { href: string };

/** Kardeş sayfaya giden bağlantı: hedef sayfanın hero girişi sade bir belirmeyle oynar. */
export function CalmLink({ href, onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      href={href}
      onClick={(event) => {
        markCalmNavigation(href);
        onClick?.(event);
      }}
    />
  );
}
