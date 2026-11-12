"use server";

import { cookies } from "next/headers";
import type { Locale } from "./request";

export async function setLocale(locale: Locale) {
  if (locale !== "tr" && locale !== "en") return;

  (await cookies()).set("NEXT_LOCALE", locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
}
