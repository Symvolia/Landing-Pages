"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Logo } from "@/components/Logo";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const links = [
  ["about", "#about"],
  ["services", "#services"],
  ["work", "#work"],
  ["method", "#method"],
  ["notes", "#notes"],
] as const;

const labels: Record<Locale, string> = {
  it: "IT",
  en: "EN",
  de: "DE",
  pt: "PT",
  es: "ES",
};

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const ids = links.map(([key]) => key);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.15, 0.4] },
    );
    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("np-theme", next ? "dark" : "light");
    setDark(next);
  }

  function changeLocale(next: string) {
    router.replace(pathname, { locale: next as Locale });
    setOpen(false);
  }

  return (
    <header className={`sticky top-0 border-b border-white/10 bg-navy/80 text-white backdrop-blur-md ${open ? "z-[70]" : "z-40"}`}>
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[1200px] items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo className="h-11 w-11 shrink-0" />
          <span className="bg-gradient-to-r from-cyan to-purple-light bg-clip-text font-display text-sm font-semibold tracking-tight text-transparent">
            Nicolò Peruzzi
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {links.map(([key, href]) => (
            <a
              key={key}
              href={href}
              aria-current={active === key ? "true" : undefined}
              className={`text-sm transition hover:text-cyan ${
                active === key ? "text-cyan underline decoration-cyan decoration-2 underline-offset-8" : "text-white/80"
              }`}
            >
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="lang">
            {t("language")}
          </label>
          <select
            id="lang"
            value={locale}
            onChange={(event) => changeLocale(event.target.value)}
            className="h-11 rounded-full border border-white/20 bg-transparent px-3 text-sm text-white"
          >
            {routing.locales.map((code) => (
              <option key={code} value={code}>
                {labels[code]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={dark}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-cyan transition hover:border-cyan"
          >
            <span className="sr-only">{t("theme")}</span>
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href="#contact"
            className="hidden h-11 items-center rounded-full bg-lime px-4 text-sm font-semibold text-navy transition duration-300 hover:scale-105 sm:inline-flex"
          >
            {t("contact")}
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 lg:hidden"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t("close") : t("open")}</span>
            <span className="flex w-4 flex-col gap-1" aria-hidden>
              <span className="h-px bg-current" />
              <span className="h-px bg-current" />
              <span className="h-px bg-current" />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav
          className="absolute inset-x-0 top-full z-[70] max-h-[min(22rem,70vh)] overflow-y-auto border-b border-white/10 bg-navy px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.45)] lg:hidden"
          aria-label="Mobile"
        >
          {links.map(([key, href]) => (
            <a
              key={key}
              href={href}
              className="flex min-h-12 items-center rounded-xl px-4 text-lg font-medium text-white hover:bg-white/10 hover:text-cyan"
              onClick={() => setOpen(false)}
            >
              {t(key)}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-lime px-4 font-semibold text-navy"
            onClick={() => setOpen(false)}
          >
            {t("contact")}
          </a>
        </nav>
      ) : null}
    </header>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M16 3.2A8.5 8.5 0 1 0 20.8 14 7 7 0 0 1 16 3.2Z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
