import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["it", "en", "pt", "es"],
  defaultLocale: "it",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}
