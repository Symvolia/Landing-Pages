import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

const pages = [
  "home",
  "menu",
  "experiences",
  "about",
  "gallery",
  "reservations",
  "contact",
  "privacy",
  "terms",
] as const;

export type PageKey = (typeof pages)[number];

export async function buildMetadata(locale: Locale, page: PageKey, path: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const canonical = `${base}/${locale}${path}`;

  return {
    title: t(`${page}Title`),
    description: t(`${page}Description`),
    alternates: {
      canonical,
      languages: Object.fromEntries(routing.locales.map((item) => [item, `${base}/${item}${path}`])),
    },
    openGraph: {
      title: `${t(`${page}Title`)} · The Velvet Table`,
      description: t(`${page}Description`),
      locale,
      type: "website",
      siteName: "The Velvet Table",
      url: canonical,
    },
  };
}
