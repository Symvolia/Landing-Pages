import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/Reveal";

export async function Services() {
  const t = await getTranslations("services");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section id="services" className="scroll-mt-24 border-t border-line py-24 md:py-32 dark:border-white/10">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-purple">{t("kicker")}</p>
          <h2 className="rule-cyan mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-navy dark:text-white sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted dark:text-slate-300">{t("lead")}</p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <article className="h-full rounded-3xl border border-line bg-paper p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan dark:border-white/10 dark:bg-white/5">
                <p className="font-mono text-xs text-cyan">0{index + 1}</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-navy dark:text-white">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted dark:text-slate-300">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
