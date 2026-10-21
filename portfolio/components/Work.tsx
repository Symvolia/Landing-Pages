"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { projects, type ProjectCategory, type ProjectId } from "@/lib/projects";
import { Reveal } from "@/components/Reveal";

const filters = ["all", "restaurant", "hospitality", "legal", "fitness", "creative"] as const;

type ProjectCopy = {
  description: string;
  highlights: string[];
  case: string;
  what?: string;
  why?: string;
  role?: string;
  stack?: string;
  techChoices?: string[];
  challenges?: string[];
};

type WorkT = ReturnType<typeof useTranslations<"work">>;

function CaseBody({
  project,
  t,
  onClose,
}: {
  project: (typeof projects)[number];
  t: WorkT;
  onClose: () => void;
}) {
  const copy = t.raw(`projects.${project.id}`) as ProjectCopy;
  const structured = Boolean(copy.what || copy.why || copy.role || copy.stack);
  const viewLabel = project.type === "concept" || project.id === "synth" ? t("viewDemo") : t("view");

  return (
    <div className="max-h-[min(90vh,840px)] overflow-y-auto rounded-3xl bg-paper p-6 text-ink shadow-2xl sm:p-8 dark:bg-[#111c31] dark:text-slate-100">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">{t(`categories.${project.category}`)}</p>
        {project.type === "concept" ? (
          <span className="rounded-full bg-lime px-3 py-1 text-xs font-semibold text-navy">{t("badgeConcept")}</span>
        ) : null}
      </div>
      <h3 id="case-title" className="mt-3 font-display text-3xl font-semibold text-navy dark:text-white">
        {project.title}
      </h3>

      {project.type === "concept" ? (
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-purple">{t("conceptGoal")}</p>
      ) : null}

      {structured ? (
        <div className="mt-4 space-y-5">
          {copy.what ? (
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-purple">{t("caseWhat")}</p>
              <p className="mt-2 leading-relaxed">{copy.what}</p>
            </div>
          ) : null}
          {copy.why ? (
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-purple">{t("caseWhy")}</p>
              <p className="mt-2 leading-relaxed">{copy.why}</p>
            </div>
          ) : null}
          {copy.role ? (
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-purple">{t("caseRole")}</p>
              <p className="mt-2 leading-relaxed">{copy.role}</p>
            </div>
          ) : null}
          {copy.stack ? (
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-purple">{t("caseStack")}</p>
              <p className="mt-2 leading-relaxed">{copy.stack}</p>
            </div>
          ) : null}
          {copy.techChoices?.length ? (
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-purple">{t("caseTech")}</p>
              <ul className="mt-2 list-disc space-y-2 pl-5 leading-relaxed">
                {copy.techChoices.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {copy.challenges?.length ? (
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-purple">{t("caseChallenges")}</p>
              <ul className="mt-2 list-disc space-y-2 pl-5 leading-relaxed">
                {copy.challenges.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : (
        <p className={`leading-relaxed ${project.type === "concept" ? "mt-3" : "mt-4"}`}>{copy.case}</p>
      )}

      <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-purple">{t("highlights")}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {copy.highlights.map((item) => (
          <li key={item} className="rounded-full bg-mist px-3 py-1 text-sm dark:bg-white/10">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center rounded-full bg-lime px-5 text-sm font-semibold text-navy"
        >
          {viewLabel}
        </a>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-semibold dark:border-white/15"
        >
          {t("close")}
        </button>
      </div>
    </div>
  );
}

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
          {visible.map((project, index) => {
            const isConcept = project.type === "concept";
            const viewLabel = isConcept || project.id === "synth" ? t("viewDemo") : t("view");

            return (
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
                    <div className="absolute left-3 right-3 top-3 flex flex-wrap gap-2 sm:left-4 sm:right-4 sm:top-4">
                      <span className="rounded-full bg-navy/90 px-3 py-1 text-xs font-medium text-cyan transition group-hover:bg-cyan group-hover:text-navy">
                        {t(`categories.${project.category}`)}
                      </span>
                      {isConcept ? (
                        <span className="rounded-full bg-lime px-3 py-1 text-xs font-semibold text-navy shadow-sm">
                          {t("badgeConcept")}
                        </span>
                      ) : null}
                    </div>
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
                        {viewLabel}
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
            );
          })}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="case"
        onClose={() => setOpenId(null)}
        aria-labelledby="case-title"
      >
        {openProject ? (
          <CaseBody
            project={openProject}
            t={t}
            onClose={() => dialogRef.current?.close()}
          />
        ) : null}
      </dialog>
    </section>
  );
}
