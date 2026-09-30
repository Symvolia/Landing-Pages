import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Hero } from "@/components/Hero";
import { RestaurantJsonLd } from "@/components/JsonLd";
import { ReservationForm } from "@/components/ReservationForm";
import { TeamGrid } from "@/components/TeamGrid";
import { Kicker, Section } from "@/components/ui";
import { isLocale, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { aboutImages, experiences, menuItems } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "home", "");
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return (
    <>
      <RestaurantJsonLd />
      <Hero />
      <AboutBlock locale={locale} />
      <Signature locale={locale} />
      <ExperiencesBlock locale={locale} />
      <GalleryBlock locale={locale} />
      <TeamBlock locale={locale} />
      <ReserveBlock locale={locale} />
    </>
  );
}

async function AboutBlock({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "about" });
  return (
    <Section id="casa">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="reveal">
          <Kicker>{t("kicker")}</Kicker>
          <h2 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">{t("title")}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
          </div>
          <Link href="/about" className="mt-8 inline-flex text-[0.72rem] uppercase tracking-[0.2em] text-ink underline decoration-copper underline-offset-8 hover:text-copper">
            {t("more")}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative col-span-1 row-span-2 min-h-80">
            <Image src={aboutImages.chef} alt={t("imageChef")} fill className="object-cover" sizes="30vw" />
          </div>
          <div className="relative min-h-40">
            <Image src={aboutImages.kitchen} alt={t("imageKitchen")} fill className="object-cover" sizes="20vw" />
          </div>
          <div className="relative min-h-40">
            <Image src={aboutImages.room} alt={t("imageRoom")} fill className="object-cover" sizes="20vw" />
          </div>
        </div>
      </div>
    </Section>
  );
}

async function Signature({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "signature" });
  const dishes = await getTranslations({ locale, namespace: "dishes" });
  const picks = menuItems.filter((item) => ["oyster", "turbot", "chocolate"].includes(item.id));

  return (
    <Section tone="paper">
      <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Kicker>{t("kicker")}</Kicker>
          <h2 className="mt-4 font-serif text-5xl md:text-6xl">{t("title")}</h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted">{t("text")}</p>
      </div>
      <ul className="mt-12 divide-y divide-line border-y border-line">
        {picks.map((item) => (
          <li key={item.id}>
            <Link href="/menu" className="group flex flex-col gap-2 py-7 transition duration-300 hover:text-copper sm:flex-row sm:items-baseline sm:justify-between">
              <span className="font-serif text-3xl">{dishes(`${item.id}.name`)}</span>
              <span className="max-w-md text-sm text-muted group-hover:text-copper">{dishes(`${item.id}.description`)}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/menu" className="mt-8 inline-flex text-[0.72rem] uppercase tracking-[0.2em] underline decoration-copper underline-offset-8">
        {t("link")}
      </Link>
    </Section>
  );
}

async function ExperiencesBlock({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "experiences" });
  return (
    <Section>
      <div className="reveal max-w-2xl">
        <Kicker>{t("kicker")}</Kicker>
        <h2 className="mt-4 font-serif text-5xl md:text-6xl">{t("title")}</h2>
        <p className="mt-5 text-muted">{t("intro")}</p>
      </div>
      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {experiences.map((item) => (
          <li key={item.id} className="reveal group">
            <Link href="/experiences" className="block">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                <Image src={item.image} alt="" fill sizes="33vw" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <h3 className="mt-5 font-serif text-3xl">{t(`${item.id}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t(`${item.id}.text`)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

async function GalleryBlock({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "gallery" });
  return (
    <Section tone="paper">
      <div className="reveal mb-10 flex items-end justify-between gap-6">
        <div>
          <Kicker>{t("kicker")}</Kicker>
          <h2 className="mt-4 font-serif text-5xl">{t("title")}</h2>
        </div>
      </div>
      <GalleryGrid preview />
    </Section>
  );
}

async function TeamBlock({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "team" });
  return (
    <Section id="team">
      <div className="reveal mb-12">
        <Kicker>{t("kicker")}</Kicker>
        <h2 className="mt-4 font-serif text-5xl md:text-6xl">{t("title")}</h2>
      </div>
      <TeamGrid />
    </Section>
  );
}

async function ReserveBlock({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "reservations" });
  return (
    <Section tone="paper" id="prenota">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker>{t("kicker")}</Kicker>
          <h2 className="mt-4 font-serif text-5xl leading-tight">{t("title")}</h2>
          <p className="mt-5 text-muted leading-relaxed">{t("intro")}</p>
        </div>
        <div className="lg:col-span-7">
          <ReservationForm />
        </div>
      </div>
    </Section>
  );
}
