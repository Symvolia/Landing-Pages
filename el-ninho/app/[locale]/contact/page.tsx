import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui";
import { isLocale } from "@/i18n/routing";
import { site } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "contact", "/contact");
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="text-[0.72rem] uppercase tracking-[0.2em] text-copper">{t("address")}</h2>
              <p className="mt-3 font-serif text-3xl leading-snug">
                {site.street}
                <br />
                {site.postal}
                <br />
                {site.country}
              </p>
              <a href={site.mapsUrl} className="mt-4 inline-flex text-sm underline decoration-copper underline-offset-4">
                {t("visit")}
              </a>
            </div>
            <div>
              <h2 className="text-[0.72rem] uppercase tracking-[0.2em] text-copper">{t("hours")}</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-6 border-b border-line pb-3">
                  <dt>{t("tue")}</dt>
                  <dd>{t("tueHours")}</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-line pb-3">
                  <dt>{t("sun")}</dt>
                  <dd>{t("sunHours")}</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-line pb-3">
                  <dt>{t("mon")}</dt>
                  <dd>{t("monHours")}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h2 className="text-[0.72rem] uppercase tracking-[0.2em] text-copper">{t("phone")}</h2>
              <a href={site.phoneHref} className="mt-3 block font-serif text-3xl hover:text-copper">
                {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="mt-2 inline-flex text-sm hover:text-copper">
                {site.email}
              </a>
            </div>
          </div>
          <iframe title={t("map")} src={site.mapsEmbed} className="h-[420px] w-full border border-line" loading="lazy" />
        </div>
      </Section>
    </>
  );
}
