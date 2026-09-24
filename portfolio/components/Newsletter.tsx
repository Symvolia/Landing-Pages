"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";

export function Newsletter() {
  const t = useTranslations("newsletter");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t("error"));
      return;
    }
    setError("");
    const subject = encodeURIComponent("Newsletter");
    const body = encodeURIComponent(email);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8 max-w-md">
      <h3 className="font-display text-2xl font-semibold text-white">{t("title")}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{t("text")}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">
          {t("placeholder")}
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t("placeholder")}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="h-12 min-w-0 flex-1 rounded-full border-2 border-white/15 bg-white/5 px-4 text-white outline-none focus:border-cyan"
        />
        <button type="submit" className="h-12 shrink-0 rounded-full bg-lime px-5 text-sm font-semibold text-navy">
          {t("submit")}
        </button>
      </div>
      <p id="newsletter-error" className="mt-2 min-h-5 text-sm text-danger" aria-live="polite">
        {error}
      </p>
    </form>
  );
}
