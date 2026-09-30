"use client";

import { useEffect, useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { locales, navItems } from "@/lib/constants";
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
  const home = pathname === "/";
  const solid = !home || scrolled || open;

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
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "bg-ink/95 text-cream backdrop-blur-md" : "bg-transparent text-cream",
      )}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" className="relative z-10 shrink-0" aria-label="The Velvet Table">
          <span className="flex flex-col leading-none">
            <span className="mb-1.5 h-px w-7 bg-gold" />
            <span className="font-serif text-[1.05rem] font-medium leading-tight tracking-[0.03em] sm:text-[1.35rem]">
              The Velvet Table
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label={t("primary")}>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 hover:text-gold",
                  active && "text-gold",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <button
              type="button"
              className="flex h-10 items-center gap-2 px-2 text-[0.72rem] font-medium uppercase tracking-[0.18em]"
              aria-expanded={langOpen}
              aria-controls={langId}
              aria-label={t("language")}
              onClick={() => setLangOpen((value) => !value)}
            >
              {locale}
              <span aria-hidden className="text-[0.6rem]">
                ▾
              </span>
            </button>
            {langOpen ? (
              <ul
                id={langId}
                className="absolute right-0 top-11 min-w-40 border border-line bg-paper py-2 text-ink shadow-lg"
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

          <Link
            href="/reservations"
            className="hidden h-10 items-center border border-current px-4 text-[0.68rem] font-medium uppercase tracking-[0.2em] transition duration-300 hover:bg-cream hover:text-ink sm:inline-flex"
            aria-label={t("book")}
          >
            {t("book")}
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center xl:hidden"
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
      </div>

      {open ? (
        <nav id={menuId} className="fixed inset-0 top-20 overflow-y-auto bg-cream text-ink xl:hidden" aria-label={t("primary")}>
          <ul className="flex flex-col px-6 py-8">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link href={item.href} className="block py-4 font-serif text-4xl" aria-current={pathname === item.href ? "page" : undefined}>
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
