import { routing } from "@/i18n/routing";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://npdevelopment.xyz"
).replace(/\/$/, "");

export const site = {
  name: "Nicolò Peruzzi",
  role: "Web Designer & Developer",
  email: "neecoproduction@gmail.com",
  linkedin: "https://www.linkedin.com/in/nicoloperuzzi",
  github: "https://github.com/Symvolia",
  url: SITE_URL,
};

export const localeTags: Record<string, string> = {
  it: "it_IT",
  en: "en_US",
  de: "de_DE",
  pt: "pt_PT",
  es: "es_ES",
};

/** Absolute URL for a locale path, e.g. localePath("en", "/privacy") */
export function localePath(locale: string, path = ""): string {
  const suffix = !path || path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}/${locale}${suffix}`;
}

/** hreflang map for all locales + x-default (default locale) */
export function languageAlternates(path = ""): Record<string, string> {
  const languages = Object.fromEntries(
    routing.locales.map((code) => [code, localePath(code, path)]),
  );
  return { ...languages, "x-default": localePath(routing.defaultLocale, path) };
}
