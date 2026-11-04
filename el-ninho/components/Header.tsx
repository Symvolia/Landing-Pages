"use client";

import { useEffect, useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { locales, navItems, primaryNav, site } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const menuId = useId();
  const langId = useId();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Every page opens on a dark surface (photo hero on home, wine hero inside):
  // the bar starts transparent with light text and turns into a light bar on scroll, as in the reference.
  const light = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
  }, [pathname, locale]);

  function switchLocale(next: Locale) {
    router.replace(pathname, { locale: next });
    setLangOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-500",
        // No backdrop-filter while the mobile menu is open: it would become the containing block of the fixed overlay.
        open
          ? "border-b border-line bg-paper text-ink"
          : light
            ? "border-b border-line/80 bg-paper/90 text-ink backdrop-blur-md"
            : "border-b border-transparent bg-transparent text-cream",
      )}
    >
      <div className="mx-auto grid h-[4.5rem] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 md:px-8">
        {/* Left: primary nav (desktop) / burger (mobile) */}
        <div className="flex items-center">
          <nav className="hidden items-center gap-7 lg:flex" aria-label={t("primary")}>
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-[0.66rem] font-medium uppercase tracking-[0.22em] opacity-90 transition hover:opacity-100",
                    active && "underline decoration-1 underline-offset-[6px]",
                  )}
                >
                  {item.label ?? t(item.key)}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t("close") : t("open")}</span>
            <span className="flex w-5 flex-col gap-1.5" aria-hidden>
              <span className={cn("h-px bg-current transition", open && "translate-y-[3.5px] rotate-45")} />
              <span className={cn("h-px bg-current transition", open && "-translate-y-[3.5px] -rotate-45")} />
            </span>
          </button>
        </div>

        {/* Center: wordmark */}
        <Link href="/" className="flex flex-col items-center text-center leading-none" aria-label="The Velvet Table">
          <span className="whitespace-nowrap font-serif text-[1rem] uppercase tracking-[0.12em] sm:text-[1.4rem] sm:tracking-[0.18em]">The Velvet Table</span>
          <span className="mt-1 text-[0.5rem] font-medium uppercase tracking-[0.42em] opacity-75">Chiado · Lisboa</span>
        </Link>

        {/* Right: phone, language, book */}
        <div className="flex items-center justify-end gap-1 sm:gap-3">
          <a
            href={site.phoneHref}
            className="hidden text-[0.66rem] font-medium uppercase tracking-[0.18em] opacity-90 hover:opacity-100 xl:inline"
          >
            {site.phoneDisplay}
          </a>
          <div className="relative">
            <button
              type="button"
              className="flex h-10 items-center gap-1.5 px-2 text-[0.66rem] font-medium uppercase tracking-[0.18em]"
              aria-expanded={langOpen}
              aria-controls={langId}
              aria-label={t("language")}
              onClick={() => setLangOpen((value) => !value)}
            >
              {locale}
              <span aria-hidden className="text-[0.55rem]">
                ▾
              </span>
            </button>
            {langOpen ? (
              <ul
                id={langId}
                className="absolute right-0 top-11 min-w-40 overflow-hidden rounded-xl border border-line bg-paper py-2 text-ink shadow-lg"
              >
                {locales.map((item) => (
                  <li key={item.code}>
                    <button
                      type="button"
                      className={cn(
                        "block w-full px-4 py-2 text-left text-sm hover:text-copper",
                        item.code === locale && "text-copper",
                      )}
                      lang={item.code}
                      onClick={() => switchLocale(item.code)}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <Link href="/reservations" className="pill pill-line hidden !h-10 sm:inline-flex">
            {t("book")}
          </Link>
        </div>
      </div>

      {open ? (
        <nav
          id={menuId}
          className="fixed inset-0 top-[4.5rem] overflow-y-auto bg-wine text-cream lg:hidden"
          aria-label={t("primary")}
        >
          <ul className="flex flex-col px-6 py-8">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-white/10">
                <Link
                  href={item.href}
                  className="block py-4 font-serif text-4xl"
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 px-6 pb-12">
            <Link href="/reservations" className="pill pill-blush w-full">
              {t("book")}
            </Link>
            <a href={site.phoneHref} className="text-center text-sm tracking-wide text-cream/80">
              {site.phoneDisplay}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
