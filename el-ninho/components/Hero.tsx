"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { heroImage } from "@/lib/content";

export function Hero() {
  const t = useTranslations("hero");
  const media = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = media.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onScroll = () => {
      node.style.transform = `translate3d(0, ${window.scrollY * 0.18}px, 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-cream">
      <div ref={media} className="absolute inset-0 scale-110">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/45 to-ink/75" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1200px] flex-col items-center justify-end px-6 pb-24 pt-32 text-center md:pb-28 md:pt-36">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.32em] text-gold">{t("kicker")}</p>
        <h1 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[0.95] tracking-[0.02em] sm:text-7xl lg:text-8xl">
          {t("title")}
        </h1>
        <p className="mt-5 font-serif text-2xl italic text-cream/95 sm:text-3xl">{t("headline")}</p>
        <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-cream/85 sm:text-lg">{t("subtitle")}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/reservations"
            className="inline-flex h-12 items-center justify-center bg-cream px-8 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-ink transition duration-300 hover:bg-gold"
          >
            {t("book")}
          </Link>
          <Link
            href="/menu"
            className="inline-flex h-12 items-center justify-center border border-cream/80 px-8 text-[0.72rem] font-medium uppercase tracking-[0.22em] transition duration-300 hover:bg-cream hover:text-ink"
          >
            {t("discover")}
          </Link>
        </div>
        <a href="#casa" className="mt-14 text-[0.68rem] uppercase tracking-[0.28em] text-cream/70">
          {t("scroll")}
        </a>
      </div>
    </section>
  );
}
