"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { heroImage } from "@/lib/content";

/**
 * Full-bleed hero: the room photo slowly pushes in as you scroll (the "walk through the door"
 * move from the reference), headline sits bottom-left in the display serif.
 */
export function Hero() {
  const t = useTranslations("hero");
  const h = useTranslations("home");
  const media = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = media.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      node.style.transform = `scale(${1.04 + progress * 0.16}) translate3d(0, ${progress * 4}%, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-cream">
      <div ref={media} className="absolute inset-0 origin-center will-change-transform" style={{ transform: "scale(1.04)" }}>
        <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink/80" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-10 pt-32 md:px-8 md:pb-14">
        <p className="text-[0.66rem] font-medium uppercase tracking-[0.32em] text-gold">{t("kicker")}</p>
        <h1 className="mt-4 max-w-5xl font-serif text-[3.4rem] leading-[0.92] tracking-[-0.015em] sm:text-7xl lg:text-[7.5rem]">
          {h("heroTitle")}
        </h1>
        <div className="mt-8 flex flex-col gap-6 border-t border-cream/25 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm leading-relaxed text-cream/80 sm:text-base">{t("subtitle")}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/reservations" className="pill pill-blush">
              {t("book")}
            </Link>
            <Link href="/menu" className="pill pill-line">
              {t("discover")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
