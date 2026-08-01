"use server";

import { cookies } from "next/headers";

import { DEFAULTS } from "@/config";
import { COOKIE_KEYS, LocaleOption } from "@/constants";

export async function getClientLocale() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(COOKIE_KEYS.locale);
  return localeCookie?.value || DEFAULTS.locale;
}

export async function setClientLocale(locale: LocaleOption) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_KEYS.locale, locale);
}
