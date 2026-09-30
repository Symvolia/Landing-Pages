"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export function NewsletterForm() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, company: "" }),
      });
      if (!response.ok) throw new Error("request");
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
      <label className="sr-only" htmlFor="newsletter-email">
        {t("email")}
      </label>
      <div className="flex border-b border-white/30">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          autoComplete="email"
          placeholder={t("email")}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 w-full bg-transparent text-sm text-cream outline-none placeholder:text-cream/45"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="shrink-0 text-[0.68rem] uppercase tracking-[0.18em] text-gold disabled:opacity-50"
        >
          {status === "sending" ? t("sending") : t("subscribe")}
        </button>
      </div>
      {status === "done" ? (
        <p role="status" className="text-sm text-gold">
          {t("subscribed")}
        </p>
      ) : null}
      {status === "error" ? (
        <p role="alert" className="text-sm text-gold">
          {t("error")}
        </p>
      ) : null}
    </form>
  );
}
