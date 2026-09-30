import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/Reveal";

export async function Intro() {
  const t = await getTranslations("intro");
  const specs = t.raw("specs") as string[];
  const methods = t.raw("methods") as { title: string; text: string }[];

  return (
    <section id="about" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-purple">{t("kicker")}</p>
          <h2 className="rule-cyan mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-navy dark:text-white sm:text-5xl">
            {t("title")}
          </h2>
          <div className="mt-6 max-w-3xl space-y-5 text-lg leading-relaxed text-muted dark:text-slate-300">
            {(t.raw("bio") as string[]).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              <span className="font-semibold text-navy dark:text-white">{t("togetherTitle")}</span> {t("together")}
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex h-12 min-h-11 items-center rounded-full bg-lime px-6 text-sm font-semibold text-navy transition duration-300 hover:scale-105"
              >
                {t("formCta")}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12" delay={80}>
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-navy dark:text-purple-light">
            {t("specsTitle")}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {specs.map((spec) => (
              <li
                key={spec}
                className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-navy dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                {spec}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {methods.map((method, index) => (
            <Reveal key={method.title} delay={index * 80}>
              <article className="h-full rounded-3xl border border-line bg-paper p-6 transition hover:-translate-y-1 hover:border-cyan dark:border-white/10 dark:bg-white/5">
                <p className="font-mono text-xs text-purple">0{index + 1}</p>
                <h3 className="mt-4 font-display text-xl font-semibold text-navy dark:text-white">{method.title}</h3>
                <p className="mt-3 leading-relaxed text-muted dark:text-slate-300">{method.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
