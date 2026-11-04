import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Closing, PrivateDining, ReviewsWall, StoryBlock } from "@/components/HomeSections";
import { RestaurantJsonLd } from "@/components/JsonLd";
import { MenuSplit } from "@/components/MenuSplit";
import { isLocale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "home", "");
}

/*
  Home, redesigned on an editorial restaurant layout:
  hero → "Reservado." + menu split → story (2016) → private dining stack → reviews wall → closing.
  Team, gallery and the booking form keep their own pages.
*/
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return (
    <>
      <RestaurantJsonLd />
      <Hero />
      <MenuSplit />
      <StoryBlock locale={locale} />
      <PrivateDining locale={locale} />
      <ReviewsWall locale={locale} />
      <Closing locale={locale} />
    </>
  );
}
