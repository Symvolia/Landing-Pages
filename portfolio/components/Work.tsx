"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { projects, type ProjectCategory, type ProjectId } from "@/lib/projects";
import { Reveal } from "@/components/Reveal";

const filters = ["all", "restaurant", "hospitality", "legal", "fitness", "creative"] as const;

export function Work() {
  const t = useTranslations("work");
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [openId, setOpenId] = useState<ProjectId | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = projects.filter((project) => filter === "all" || project.category === filter);
  const openProject = projects.find((project) => project.id === openId);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openId && !dialog.open) dialog.showModal();
    if (!openId && dialog.open) dialog.close();
  }, [openId]);

  return (
    <section id="work" className="scroll-mt-24 border-t border-line bg-paper py-24 md:py-32 dark:border-white/10 dark:bg-[#0e1728]">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-purple">{t("kicker")}</p>
          <h2 className="rule-cyan mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-navy dark:text-white sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted dark:text-slate-300">{t("lead")}</p>
        </Reveal>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="toolbar" aria-label={t("kicker")}>
          {filters.map((key) => {
            const selected = filter === key;
            const label = key === "all" ? t("all") : t(`categories.${key as ProjectCategory}`);
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(key)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  selected
                    ? "bg-lime text-navy"
                    : "border border-line text-ink hover:border-cyan dark:border-white/15 dark:text-slate-200"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {visible.map((project, index) => (
            <Reveal key={project.id} delay={index * 60}>
              <article className="group h-full overflow-hidden rounded-3xl border-2 border-line bg-mist transition duration-300 hover:-translate-y-1 hover:border-cyan hover:shadow-[0_20px_50px_-24px_rgba(0,217,255,0.55)] dark:border-white/10 dark:bg-navy">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${t("preview")} ${project.title}`}
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-navy/90 px-3 py-1 text-xs font-medium text-cyan transition group-hover:bg-cyan group-hover:text-navy">
                    {t(`categories.${project.category}`)}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-semibold text-purple dark:text-purple-light">{project.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted dark:text-slate-300">
                    {t(`projects.${project.id}.description`)}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-white px-3 py-1 font-mono text-xs text-navy-2 dark:bg-white/10 dark:text-cyan"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 min-h-11 items-center rounded-full bg-lime px-5 text-sm font-semibold text-navy transition duration-300 group-hover:scale-105"
                    >
                      {t("view")}
                    </a>
                    <button
                      type="button"
                      onClick={() => setOpenId(project.id)}
                      className="inline-flex h-11 min-h-11 items-center rounded-full border border-navy px-5 text-sm font-semibold text-navy transition hover:border-cyan hover:text-purple dark:border-white/15 dark:text-white"
                    >
                      {t("case")}
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="case"
        onClose={() => setOpenId(null)}
        aria-labelledby="case-title"
      >
        {openProject ? (
          <div className="rounded-3xl bg-paper p-6 text-ink shadow-2xl sm:p-8 dark:bg-[#111c31] dark:text-slate-100">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
              {t(`categories.${openProject.category}`)}
            </p>
            <h3 id="case-title" className="mt-3 font-display text-3xl font-semibold text-navy dark:text-white">
              {openProject.title}
            </h3>
            <p className="mt-4 leading-relaxed">{t(`projects.${openProject.id}.case`)}</p>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-purple">{t("highlights")}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {(t.raw(`projects.${openProject.id}.highlights`) as string[]).map((item) => (
                <li key={item} className="rounded-full bg-mist px-3 py-1 text-sm dark:bg-white/10">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={openProject.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-full bg-lime px-5 text-sm font-semibold text-navy"
              >
                {t("view")}
              </a>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-semibold dark:border-white/15"
              >
                {t("close")}
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
