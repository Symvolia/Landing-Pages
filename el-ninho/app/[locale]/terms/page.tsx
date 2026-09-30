import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { isLocale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "terms", "/terms");
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const meta = await getTranslations("meta");
  const paragraphs = (await getTranslations("legal")).raw("terms") as string[];

  return (
    <>
      <PageHero kicker="The Velvet Table" title={meta("termsTitle")} intro={meta("termsDescription")} />
      <Section>
        <div className="mx-auto max-w-2xl space-y-5 text-base leading-relaxed text-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>
    </>
  );
}
