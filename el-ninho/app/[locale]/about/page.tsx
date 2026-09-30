import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { TeamGrid } from "@/components/TeamGrid";
import { Kicker, Section } from "@/components/ui";
import { isLocale } from "@/i18n/routing";
import { aboutImages } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "about", "/about");
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const team = await getTranslations("team");

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} intro={t("p1")} />
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative min-h-[420px]">
            <Image src={aboutImages.room} alt={t("imageRoom")} fill className="object-cover" sizes="50vw" />
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted">
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>
        </div>
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <div className="relative min-h-72">
            <Image src={aboutImages.chef} alt={t("imageChef")} fill className="object-cover" sizes="50vw" />
          </div>
          <div className="relative min-h-72">
            <Image src={aboutImages.kitchen} alt={t("imageKitchen")} fill className="object-cover" sizes="50vw" />
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-y border-line py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Kicker>{t("awardTitle")}</Kicker>
            <p className="mt-3 max-w-xl font-serif text-3xl leading-snug">{t("awardText")}</p>
          </div>
          <p className="font-serif text-6xl text-copper" aria-hidden>
            ★
          </p>
        </div>
      </Section>
      <Section id="team" tone="paper">
        <div className="mb-12">
          <Kicker>{team("kicker")}</Kicker>
          <h2 className="mt-4 font-serif text-5xl">{team("title")}</h2>
        </div>
        <TeamGrid />
      </Section>
    </>
  );
}
