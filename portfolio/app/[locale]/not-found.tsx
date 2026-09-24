"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="px-6 py-32 text-center">
      <h1 className="font-display text-5xl font-semibold text-navy dark:text-white">{t("title")}</h1>
      <p className="mx-auto mt-4 max-w-md text-muted dark:text-slate-300">{t("text")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center rounded-full bg-lime px-6 text-sm font-semibold text-navy"
      >
        {t("back")}
      </Link>
    </div>
  );
}
