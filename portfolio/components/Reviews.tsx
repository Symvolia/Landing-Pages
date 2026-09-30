"use client";

import { FormEvent, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { projects } from "@/lib/projects";

type Review = {
  id: string;
  name: string;
  rating: number;
  content: string;
  project: string;
};

type Errors = Partial<Record<"name" | "email" | "project" | "rating" | "content", string>>;

const fieldClass =
  "mt-2 h-12 w-full rounded-2xl border-2 border-navy/15 bg-mist px-4 outline-none transition focus:border-cyan focus:shadow-[0_0_0_4px_rgba(0,217,255,0.28)] dark:border-white/15 dark:bg-navy";

export function Reviews() {
  const t = useTranslations("reviews");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ready, setReady] = useState(false);
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [notice, setNotice] = useState<{ tone: "ok" | "bad"; text: string } | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let ignore = false;
    fetch("/api/reviews")
      .then((response) => response.json())
      .then((data: { reviews?: Review[] }) => {
        if (!ignore) setReviews(data.reviews ?? []);
      })
      .catch(() => {
        if (!ignore) setReviews([]);
      })
      .finally(() => {
        if (!ignore) setReady(true);
      });
    return () => {
      ignore = true;
    };
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") ?? "").trim()) {
      setNotice({ tone: "ok", text: t("success") });
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const project = String(data.get("project") ?? "").trim();
    const content = String(data.get("content") ?? "").trim();
    const next: Errors = {};
    if (name.length < 2) next.name = t("errors.name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t("errors.email");
    if (!project) next.project = t("errors.project");
    if (rating < 1) next.rating = t("errors.rating");
    if (content.length < 12) next.content = t("errors.content");
    setErrors(next);
    if (Object.keys(next).length) return;

    setSending(true);
    setNotice(null);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, project, content, rating, company: data.get("company") }),
      });
      if (response.status === 503) {
        setNotice({ tone: "bad", text: t("unavailable") });
        return;
      }
      if (response.status === 429) {
        setNotice({ tone: "bad", text: t("errors.limit") });
        return;
      }
      if (!response.ok) {
        setNotice({ tone: "bad", text: t("errors.content") });
        return;
      }
      form.reset();
      setRating(0);
      setNotice({ tone: "ok", text: t("success") });
    } catch {
      setNotice({ tone: "bad", text: t("unavailable") });
    } finally {
      setSending(false);
    }
  }

  return (
    <div id="reviews" className="mt-16 scroll-mt-28">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-purple">{t("kicker")}</p>
      <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy dark:text-white">{t("title")}</h3>
      <p className="mt-3 max-w-2xl text-muted dark:text-slate-300">{t("lead")}</p>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ul className="grid gap-4">
          {ready && reviews.length === 0 ? (
            <li className="review-in rounded-3xl border border-dashed border-line px-6 py-10 text-muted dark:border-white/15 dark:text-slate-300">
              {t("empty")}
            </li>
          ) : null}
          {reviews.map((review, index) => (
            <li
              key={review.id}
              className="review-in rounded-3xl border border-line bg-paper p-6 dark:border-white/10 dark:bg-[#0e1728]"
              style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-display text-lg font-semibold text-navy dark:text-white">{review.name}</p>
                <Stars value={review.rating} />
              </div>
              <p className="mt-3 leading-relaxed text-ink dark:text-slate-100">{review.content}</p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-purple">{review.project}</p>
            </li>
          ))}
        </ul>

        <form
          onSubmit={onSubmit}
          noValidate
          className="relative rounded-3xl border border-line bg-paper p-6 dark:border-white/10 dark:bg-[#111c31] sm:p-8"
        >
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="review-company">Company</label>
            <input id="review-company" name="company" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-purple">
              {t("name")}
              <input name="name" autoComplete="name" placeholder={t("placeholderName")} aria-invalid={Boolean(errors.name)} className={fieldClass} />
              {errors.name ? <span className="mt-2 block text-sm font-normal text-danger">{errors.name}</span> : null}
            </label>
            <label className="block text-sm font-medium text-purple">
              {t("email")}
              <input name="email" type="email" autoComplete="email" placeholder={t("placeholderEmail")} aria-invalid={Boolean(errors.email)} className={fieldClass} />
              {errors.email ? <span className="mt-2 block text-sm font-normal text-danger">{errors.email}</span> : null}
            </label>
          </div>
          <label className="mt-5 block text-sm font-medium text-purple">
            {t("project")}
            <select name="project" defaultValue="" aria-invalid={Boolean(errors.project)} className={fieldClass}>
              <option value="" disabled>
                {t("projectPlaceholder")}
              </option>
              {projects.map((project) => (
                <option key={project.id} value={project.title}>
                  {project.title}
                </option>
              ))}
            </select>
            {errors.project ? <span className="mt-2 block text-sm font-normal text-danger">{errors.project}</span> : null}
          </label>
          <fieldset className="mt-5">
            <legend className="text-sm font-medium text-purple">{t("rating")}</legend>
            <div className="mt-2 flex gap-2" role="radiogroup" aria-label={t("rating")}>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={rating === value}
                  onClick={() => setRating(value)}
                  className={`grid h-11 w-11 place-items-center rounded-full border-2 text-lg transition ${
                    value <= rating
                      ? "border-navy bg-lime text-navy"
                      : "border-navy/15 text-muted hover:border-cyan dark:border-white/15"
                  }`}
                >
                  <span aria-hidden>★</span>
                  <span className="sr-only">{value}</span>
                </button>
              ))}
            </div>
            {errors.rating ? <p className="mt-2 text-sm text-danger">{errors.rating}</p> : null}
          </fieldset>
          <label className="mt-5 block text-sm font-medium text-purple">
            {t("content")}
            <textarea
              name="content"
              rows={5}
              placeholder={t("placeholderContent")}
              aria-invalid={Boolean(errors.content)}
              className="mt-2 w-full resize-y rounded-2xl border-2 border-navy/15 bg-mist px-4 py-3 outline-none transition focus:border-cyan focus:shadow-[0_0_0_4px_rgba(0,217,255,0.28)] dark:border-white/15 dark:bg-navy"
            />
            {errors.content ? <span className="mt-2 block text-sm font-normal text-danger">{errors.content}</span> : null}
          </label>
          <button
            type="submit"
            disabled={sending}
            className="mt-6 inline-flex h-12 items-center rounded-full bg-lime px-6 text-sm font-semibold text-navy disabled:opacity-60"
          >
            {sending ? t("sending") : t("submit")}
          </button>
        </form>
      </div>

      {notice ? (
        <p
          role="status"
          className={`fixed bottom-5 left-1/2 z-50 w-[min(24rem,calc(100%-2rem))] -translate-x-1/2 rounded-2xl px-4 py-3 text-sm shadow-lg ${
            notice.tone === "ok" ? "bg-navy text-lime" : "bg-danger text-white"
          }`}
        >
          {notice.text}
        </p>
      ) : null}
    </div>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <p className="font-display tracking-wide text-purple" aria-label={`${value} / 5`}>
      {"★".repeat(value)}
      <span className="text-navy/20 dark:text-white/20">{"★".repeat(Math.max(0, 5 - value))}</span>
    </p>
  );
}
