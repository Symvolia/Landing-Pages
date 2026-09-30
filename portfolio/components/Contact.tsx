"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { site } from "@/lib/site";

type Errors = Partial<Record<"name" | "email" | "type" | "message", string>>;

export function Contact() {
  const t = useTranslations("contact");
  const types = t.raw("types") as string[];
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sending, setSending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") ?? "").trim()) {
      setSent(true);
      setFailed(false);
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const type = String(data.get("type") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next: Errors = {};
    if (name.length < 2) next.name = t("errors.name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t("errors.email");
    if (!type) next.type = t("errors.type");
    if (message.length < 12) next.message = t("errors.message");
    setErrors(next);
    if (Object.keys(next).length) {
      setSent(false);
      setFailed(false);
      return;
    }

    setSending(true);
    setSent(false);
    setFailed(false);
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: `${type}\n\n${message}`,
          _subject: `${type} - ${name}`,
          _replyto: email,
          _captcha: "false",
          _template: "box",
        }),
      });
      const result = (await response.json()) as { success?: string | boolean };
      if (!response.ok || (result.success !== "true" && result.success !== true)) {
        setFailed(true);
        return;
      }
      setSent(true);
      form.reset();
      const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
      gtag?.("event", "contact_submit");
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-navy py-24 text-white md:py-32">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">{t("kicker")}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-5xl">{t("title")}</h2>
          <p className="mt-5 max-w-md text-lg text-slate-300">{t("subtitle")}</p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <a href={`mailto:${site.email}`} className="text-cyan underline-offset-4 hover:underline">
              {site.email}
            </a>
            <div className="mt-4 flex gap-4 text-sm">
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan">
                LinkedIn
              </a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan">
                GitHub
              </a>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="relative rounded-3xl bg-paper p-6 text-ink sm:p-8 dark:bg-[#111c31] dark:text-slate-100"
        >
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" name="company" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" name="name" label={t("name")} error={errors.name} placeholder={t("placeholderName")} />
            <Field
              id="email"
              name="email"
              type="email"
              label={t("email")}
              error={errors.email}
              placeholder={t("placeholderEmail")}
              autoComplete="email"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="type" className="text-sm font-medium text-purple">
              {t("type")}
            </label>
            <select
              id="type"
              name="type"
              defaultValue=""
              aria-invalid={Boolean(errors.type)}
              aria-describedby={errors.type ? "type-error" : undefined}
              className="mt-2 h-12 w-full rounded-2xl border-2 border-navy/15 bg-mist px-4 outline-none transition focus:border-cyan focus:shadow-[0_0_0_4px_rgba(0,217,255,0.28)] dark:border-white/15 dark:bg-navy"
            >
              <option value="" disabled>
                {t("typePlaceholder")}
              </option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type ? (
              <p id="type-error" className="mt-2 text-sm text-danger">
                {errors.type}
              </p>
            ) : null}
          </div>
          <div className="mt-5">
            <label htmlFor="message" className="text-sm font-medium text-purple">
              {t("message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder={t("placeholderMessage")}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="mt-2 w-full rounded-2xl border-2 border-navy/15 bg-mist px-4 py-3 outline-none transition focus:border-cyan focus:shadow-[0_0_0_4px_rgba(0,217,255,0.28)] dark:border-white/15 dark:bg-navy"
            />
            {errors.message ? (
              <p id="message-error" className="mt-2 text-sm text-danger">
                {errors.message}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={sending}
            className="mt-6 inline-flex h-12 items-center rounded-full bg-lime px-6 text-sm font-semibold text-navy transition duration-300 hover:scale-105 disabled:opacity-60"
          >
            {sending ? t("sending") : t("submit")}
          </button>
          <p className="mt-4 min-h-6 text-sm text-success" aria-live="polite">
            {sent ? t("success") : ""}
          </p>
          <p className="min-h-6 text-sm text-danger" aria-live="polite">
            {failed ? t("errors.send") : ""}
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  id,
  name,
  label,
  error,
  placeholder,
  type = "text",
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  error?: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-purple">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 h-12 w-full rounded-2xl border-2 border-navy/15 bg-mist px-4 outline-none transition focus:border-cyan focus:shadow-[0_0_0_4px_rgba(0,217,255,0.28)] dark:border-white/15 dark:bg-navy"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
