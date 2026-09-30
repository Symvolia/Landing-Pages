"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Reviews } from "@/components/Reviews";

type Stat = { value: number; prefix: string; suffix: string; label: string };

export function Stats() {
  const t = useTranslations("stats");
  const items = t.raw("items") as Stat[];
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-purple">{t("kicker")}</p>
        <h2 className="rule-cyan mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-navy dark:text-white sm:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-muted dark:text-slate-300">{t("lead")}</p>

        <div ref={ref} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.label}
              className="rounded-3xl border border-line bg-paper p-6 dark:border-white/10 dark:bg-white/5"
            >
              <p className="font-display text-5xl font-semibold tracking-tight text-navy dark:text-cyan">
                <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} active={active} />
              </p>
              <p className="mt-3 text-sm leading-snug text-muted dark:text-slate-300">{item.label}</p>
            </article>
          ))}
        </div>

        <Reviews />
      </div>
    </section>
  );
}

function Counter({
  value,
  prefix,
  suffix,
  active,
}: {
  value: number;
  prefix: string;
  suffix: string;
  active: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrent(value);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1100);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return (
    <span>
      {prefix}
      {current}
      {suffix}
    </span>
  );
}
