import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/Reveal";

export async function Notes() {
  const t = await getTranslations("notes");
  const items = t.raw("items") as { date: string; title: string; text: string }[];

  return (
    <section id="notes" className="scroll-mt-24 border-t border-line bg-paper py-24 md:py-32 dark:border-white/10 dark:bg-[#0e1728]">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-purple">{t("kicker")}</p>
          <h2 className="rule-cyan mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-navy dark:text-white sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted dark:text-slate-300">{t("lead")}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <article className="flex h-full flex-col rounded-3xl border border-line bg-mist p-6 dark:border-white/10 dark:bg-navy">
                <time className="font-mono text-xs uppercase tracking-[0.14em] text-purple">{item.date}</time>
                <h3 className="mt-4 font-display text-2xl font-semibold text-navy dark:text-white">{item.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted dark:text-slate-300">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
