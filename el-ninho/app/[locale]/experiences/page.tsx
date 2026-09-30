import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { isLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { experiences } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "experiences", "/experiences");
}

export default async function ExperiencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("experiences");
  const book = await getTranslations("hero");

  return (
    <>
      <PageHero kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <div className="bg-cream">
        {experiences.map((item, index) => (
          <article key={item.id} id={item.id} className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 py-16 md:px-10 lg:grid-cols-2 lg:py-24">
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <div className="relative aspect-[5/4] overflow-hidden bg-ink">
                <Image src={item.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            </div>
            <div className="reveal">
              <h2 className="font-serif text-5xl">{t(`${item.id}.title`)}</h2>
              <p className="mt-5 text-base leading-relaxed text-muted">{t(`${item.id}.long`)}</p>
              <Link href="/reservations" className="mt-8 inline-flex h-12 items-center border border-ink px-6 text-[0.72rem] uppercase tracking-[0.2em] transition duration-300 hover:bg-ink hover:text-cream">
                {book("book")}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
