import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { MenuExplorer } from "@/components/MenuExplorer";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { isLocale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "menu", "/menu");
}

export default async function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("menu");

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <Section>
        <MenuExplorer />
      </Section>
    </>
  );
}
