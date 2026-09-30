"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="bg-cream px-6 pb-28 pt-40 text-center">
      <h1 className="font-serif text-5xl">{t("title")}</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">{t("text")}</p>
      <Link href="/" className="mt-8 inline-flex h-12 items-center bg-ink px-6 text-[0.72rem] uppercase tracking-[0.2em] text-cream">
        {t("back")}
      </Link>
    </div>
  );
}
