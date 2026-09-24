import { getTranslations } from "next-intl/server";
import { site } from "@/lib/site";

export async function Faq() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as { q: string; a: string }[];
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
    url: site.url,
  };

  return (
    <section id="faq" className="scroll-mt-24 py-24 md:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-purple">{t("kicker")}</p>
        <h2 className="rule-cyan mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-navy dark:text-white sm:text-5xl">
          {t("title")}
        </h2>
        <div className="mt-10 divide-y divide-line border-y border-line dark:divide-white/10 dark:border-white/10">
          {items.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="cursor-pointer list-none font-display text-xl font-semibold text-navy marker:content-none dark:text-white [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span className="text-cyan transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted dark:text-slate-300">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
