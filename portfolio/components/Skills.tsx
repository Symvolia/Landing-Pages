import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/Reveal";

export async function Skills() {
  const t = await getTranslations("skills");
  const standards = await getTranslations("standards");
  const groups = t.raw("groups") as { title: string; items: string[] }[];
  const items = standards.raw("items") as { title: string; text: string }[];

  return (
    <section id="skills" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-purple">{t("kicker")}</p>
          <h2 className="rule-cyan mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-navy dark:text-white sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted dark:text-slate-300">{t("lead")}</p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 70}>
              <article className="h-full rounded-3xl border border-line bg-paper p-6 transition hover:border-cyan dark:border-white/10 dark:bg-white/5">
                <h3 className="font-display text-lg font-semibold text-navy dark:text-white">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-mist px-3 py-1 font-mono text-xs text-navy-2 transition hover:-translate-y-0.5 hover:bg-cyan/15 hover:text-navy dark:bg-white/10 dark:text-cyan"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-purple">{standards("kicker")}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-navy dark:text-white sm:text-4xl">
            {standards("title")}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <article key={item.title} className="rounded-3xl border border-line p-6 dark:border-white/10">
                <h3 className="font-display text-xl font-semibold text-navy dark:text-purple-light">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted dark:text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
