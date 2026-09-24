"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { projects } from "@/lib/projects";

export function Hero() {
  const t = useTranslations("hero");
  const layer = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const node = layer.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const shift = Math.min(window.scrollY, 700) * 0.16;
        node.style.transform = `translate3d(0, ${shift}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % projects.length);
    }, 4200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy to-indigo text-white">
      <div ref={layer} className="absolute inset-0 will-change-transform" aria-hidden>
        {projects.map((project, projectIndex) => (
          <Image
            key={project.id}
            src={project.image}
            alt=""
            fill
            priority={projectIndex === 0}
            loading={projectIndex === 0 ? "eager" : "lazy"}
            sizes="100vw"
            className={`object-cover object-top blur-[1.5px] transition-opacity duration-1000 ${
              projectIndex === index ? "opacity-30" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/88 to-indigo" />
        <div className="hero-grid absolute inset-0" />
        <div className="hero-glow absolute -left-16 top-16 h-56 w-56 rounded-full blur-2xl" />
        <div className="absolute right-[12%] top-24 h-px w-36 bg-cyan" />
        <div className="absolute right-[12%] top-24 h-24 w-px bg-cyan" />
      </div>
      <p className="sr-only">{t("reel")}</p>

      <div className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] w-full max-w-[1200px] flex-col justify-end px-6 pb-20 pt-24 md:pb-28">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">{t("eyebrow")}</p>
        <h1 className="mt-5 max-w-4xl bg-gradient-to-r from-white via-cyan to-purple-light bg-clip-text font-display text-4xl font-semibold leading-[1.05] tracking-tight text-transparent sm:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">{t("subtitle")}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#work"
            className="inline-flex h-12 min-h-11 items-center rounded-full bg-lime px-6 text-sm font-semibold text-navy shadow-[0_0_24px_rgba(204,255,0,0.35)] transition duration-300 hover:scale-105 hover:border-cyan hover:shadow-[0_0_28px_rgba(0,217,255,0.45)]"
          >
            {t("cta")}
          </a>
          <a
            href="#contact"
            className="inline-flex h-12 min-h-11 items-center rounded-full border border-cyan px-6 text-sm font-semibold text-cyan transition duration-300 hover:scale-105 hover:bg-cyan hover:text-navy"
          >
            {t("secondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
