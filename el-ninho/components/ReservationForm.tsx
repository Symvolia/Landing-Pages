"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import { reservationTimes } from "@/lib/constants";

type FormValues = {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  consent: boolean;
  company?: string;
};

function todayValue() {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function ReservationForm() {
  const t = useTranslations("reservations");
  const errors = useTranslations("errors");
  const locale = useLocale();
  const [serverError, setServerError] = useState(false);
  const [done, setDone] = useState<FormValues | null>(null);
  const today = todayValue();

  const schema = useMemo(
    () =>
      z
        .object({
          name: z.string().trim().min(2, errors("name")).max(80),
          email: z.email(errors("email")),
          date: z.string().min(1, errors("date")),
          time: z.string().min(1, errors("time")),
          guests: z.number().int().min(1, errors("guests")).max(12, errors("guests")),
          notes: z.string().max(500, errors("notes")).optional(),
          consent: z.boolean().refine((value) => value, { message: errors("consent") }),
          company: z.string().optional(),
        })
        .superRefine((value, ctx) => {
          if (!value.date) return;
          const chosen = new Date(`${value.date}T00:00:00`);
          const start = new Date(`${today}T00:00:00`);
          if (Number.isNaN(chosen.getTime()) || chosen < start) {
            ctx.addIssue({ code: "custom", path: ["date"], message: errors("datePast") });
          }
        }),
    [errors, today],
  );

  const {
    register,
    handleSubmit,
    formState: { errors: fieldErrors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { guests: 2, consent: false, notes: "", company: "" },
  });

  async function onSubmit(values: FormValues) {
    setServerError(false);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!response.ok) throw new Error("request");
      setDone(values);
      reset();
    } catch {
      setServerError(true);
    }
  }

  if (done) {
    return (
      <div role="status" className="border border-line bg-paper p-8 md:p-10">
        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-copper">{t("successTitle")}</p>
        <p className="mt-4 font-serif text-3xl leading-snug">
          {t("success", {
            name: done.name,
            guests: t("guestCount", { count: Number(done.guests) }),
            date: done.date,
            time: done.time,
          })}
        </p>
        <button
          type="button"
          className="mt-8 h-11 border border-ink px-5 text-[0.72rem] uppercase tracking-[0.18em]"
          onClick={() => setDone(null)}
        >
          {t("another")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <Field label={t("name")} error={fieldErrors.name?.message} id="booking-name">
        <input id="booking-name" autoComplete="name" className={inputClass} aria-invalid={Boolean(fieldErrors.name)} {...register("name")} />
      </Field>
      <Field label={t("email")} error={fieldErrors.email?.message} id="booking-email">
        <input id="booking-email" type="email" autoComplete="email" className={inputClass} aria-invalid={Boolean(fieldErrors.email)} {...register("email")} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label={t("date")} error={fieldErrors.date?.message} id="booking-date">
          <input id="booking-date" type="date" min={today} className={inputClass} aria-invalid={Boolean(fieldErrors.date)} {...register("date")} />
        </Field>
        <Field label={t("time")} error={fieldErrors.time?.message} id="booking-time">
          <select id="booking-time" className={inputClass} defaultValue="" aria-invalid={Boolean(fieldErrors.time)} {...register("time")}>
            <option value="" disabled>
              —
            </option>
            {reservationTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("guests")} error={fieldErrors.guests?.message} id="booking-guests">
          <select id="booking-guests" className={inputClass} aria-invalid={Boolean(fieldErrors.guests)} {...register("guests", { valueAsNumber: true })}>
            {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {t("guestCount", { count })}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label={t("notes")} error={fieldErrors.notes?.message} id="booking-notes" hint={t("notesHint")}>
        <textarea id="booking-notes" rows={4} className={inputClass} aria-invalid={Boolean(fieldErrors.notes)} {...register("notes")} />
      </Field>
      <div className="hidden" aria-hidden>
        <label htmlFor="booking-company">{t("honeypot")}</label>
        <input id="booking-company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed">
          <input type="checkbox" className="mt-1" aria-invalid={Boolean(fieldErrors.consent)} {...register("consent")} />
          <span>
            {t("consent")}{" "}
            <Link href="/privacy" className="underline decoration-copper underline-offset-4 hover:text-copper">
              {t("privacy")}
            </Link>
          </span>
        </label>
        {fieldErrors.consent ? <p className="mt-2 text-sm text-copper">{fieldErrors.consent.message}</p> : null}
      </div>
      {serverError ? (
        <p role="alert" className="text-sm text-copper">
          {t("error")}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-12 bg-ink px-6 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-cream transition duration-300 hover:bg-copper disabled:opacity-60"
      >
        {isSubmitting ? t("sending") : t("submit")}
      </button>
    </form>
  );
}

const inputClass =
  "w-full border border-line bg-paper px-3 py-3 text-sm outline-none transition duration-300 focus:border-copper";

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.72rem] uppercase tracking-[0.16em] text-muted">
        {label}
      </label>
      {children}
      {hint ? <p className="mt-2 text-xs text-muted">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-copper">
          {error}
        </p>
      ) : null}
    </div>
  );
}
