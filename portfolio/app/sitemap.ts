import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/privacy"];

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "monthly" : "yearly",
      priority: path === "" ? (locale === routing.defaultLocale ? 1 : 0.8) : 0.4,
    })),
  );
}
