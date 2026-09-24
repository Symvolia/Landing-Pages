import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/Reveal";

export async function Process() {
  const t = await getTranslations("process");
  const steps = t.raw("steps") as { title: string; text: string }[];

  return (
    <section id="method" className="scroll-mt-24 bg-navy py-24 text-white md:py-32">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">{t("kicker")}</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-5xl">{t("title")}</h2>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">{t("lead")}</p>
        </Reveal>
        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 90}>
              <li className="relative h-full border-t border-white/15 pt-6">
                <span className="absolute -top-1.5 left-0 h-3 w-3 rounded-full bg-cyan" aria-hidden />
                <p className="font-mono text-xs text-cyan">0{index + 1}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-300">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
