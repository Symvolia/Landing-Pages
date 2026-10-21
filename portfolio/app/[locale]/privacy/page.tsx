import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { languageAlternates, localePath } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  const pageUrl = localePath(locale, "/privacy");

  return {
    title: t("title"),
    description: t("lead"),
    alternates: {
      canonical: pageUrl,
      languages: languageAlternates("/privacy"),
    },
    openGraph: {
      title: t("title"),
      description: t("lead"),
      url: pageUrl,
      type: "website",
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacy");
  const back = await getTranslations("notFound");
  const sections = t.raw("sections") as { title: string; text: string }[];

  return (
    <article className="mx-auto w-full max-w-[760px] px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-purple">{t("title")}</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-navy dark:text-white">{t("title")}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted dark:text-slate-300">{t("lead")}</p>
      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-2xl font-semibold text-navy dark:text-white">{section.title}</h2>
            <p className="mt-2 leading-relaxed text-muted dark:text-slate-300">{section.text}</p>
          </section>
        ))}
      </div>
      <Link href="/" className="mt-12 inline-flex h-12 items-center rounded-full bg-lime px-6 text-sm font-semibold text-navy">
        {back("back")}
      </Link>
    </article>
  );
}
