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

  const whatsappText = encodeURIComponent("Ciao Nicolò, vorrei parlarti di un progetto.");
  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${whatsappText}`;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") ?? "").trim()) {
      setSent(true);
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
      return;
    }

    const subject = encodeURIComponent(`${type} — ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
    form.reset();
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
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-[#06210f] transition hover:-translate-y-0.5"
            >
              <WhatsAppIcon />
              {t("whatsapp")}
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
            className="mt-6 inline-flex h-12 items-center rounded-full bg-lime px-6 text-sm font-semibold text-navy transition duration-300 hover:scale-105"
          >
            {t("submit")}
          </button>
          <p className="mt-4 min-h-6 text-sm text-success" aria-live="polite">
            {sent ? t("success") : ""}
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

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 14.05c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.27.64-.39 1.02-.39.12 0 .23 0 .33.01.3.01.45-.07.7.54.26.63.89 2.18.97 2.34.08.16.13.35.03.56-.1.22-.15.35-.3.54-.14.18-.3.41-.43.55-.14.14-.29.3-.12.58.16.27.73 1.2 1.57 1.94 1.08.96 1.99 1.26 2.27 1.4.28.14.44.12.61-.07.16-.19.7-.81.89-1.09.19-.27.38-.23.64-.14.26.08 1.66.78 1.94.92.28.15.47.22.54.34.07.12.07.7-.17 1.38Z"
      />
    </svg>
  );
}
