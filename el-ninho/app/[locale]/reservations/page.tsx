import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { ReservationForm } from "@/components/ReservationForm";
import { Section } from "@/components/ui";
import { isLocale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "reservations", "/reservations");
}

export default async function ReservationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("reservations");

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <ReservationForm />
        </div>
      </Section>
    </>
  );
}
