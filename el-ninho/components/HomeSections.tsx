import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { aboutImages, homeImages } from "@/lib/content";
import { site } from "@/lib/constants";

type Review = { quote: string; author: string };

/* ------------------------------------------------------------------ */
/* The house — short story block with the opening year as a numeral    */
/* ------------------------------------------------------------------ */
export async function StoryBlock({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "about" });
  const h = await getTranslations({ locale, namespace: "home" });
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="mx-auto grid max-w-[1440px] items-end gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="reveal lg:col-span-5">
          <p className="text-[0.66rem] font-medium uppercase tracking-[0.3em] text-copper">{h("since")}</p>
          <p className="mt-2 font-serif text-[9rem] leading-[0.8] text-wine md:text-[13rem]">2016</p>
        </div>
        <div className="reveal lg:col-span-7 lg:pb-4">
          <h2 className="font-serif text-5xl leading-[1] md:text-6xl">{t("title")}</h2>
          <div className="mt-6 grid gap-5 text-base leading-relaxed text-muted md:grid-cols-2">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
          </div>
          <Link href="/about" className="pill pill-line mt-8 text-ink">
            {t("more")}
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-16 grid max-w-[1440px] grid-cols-3 gap-3 px-5 md:px-8">
        {[aboutImages.chef, aboutImages.kitchen, aboutImages.room].map((src, i) => (
          <div key={src} className={`reveal relative overflow-hidden rounded-2xl bg-ink ${i === 1 ? "aspect-[3/4] md:-mt-10" : "aspect-[3/4]"}`}>
            <Image src={src} alt="" fill sizes="33vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Private dining — three cards that stack on top of each other        */
/* ------------------------------------------------------------------ */
export async function PrivateDining({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home" });
  const cardBase =
    "sticky mx-auto flex origin-top w-full max-w-[1100px] overflow-hidden rounded-3xl shadow-[0_30px_80px_-30px_rgba(34,17,15,0.45)]";

  return (
    <section className="bg-paper pb-24 pt-20 md:pb-32 md:pt-28">
      <p className="text-center text-[0.66rem] font-medium uppercase tracking-[0.3em] text-copper">{t("privateKicker")}</p>
      <div className="mt-10 flex flex-col gap-[14vh] px-4 md:gap-[26vh] md:px-8">
        {/* 1 — the room */}
        <article data-stack className={`${cardBase} top-24 isolate aspect-[4/5] origin-top items-start justify-center bg-ink text-cream sm:aspect-[16/10]`}>
          <Image src={homeImages.privateRoom} alt="" fill sizes="(min-width: 1100px) 1100px, 100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 via-ink/10 to-ink/40" />
          <h3 className="mt-10 max-w-3xl px-6 text-center font-serif text-5xl leading-[0.95] md:mt-14 md:text-7xl">{t("privateCard1")}</h3>
        </article>

        {/* 2 — the numbers */}
        <article data-stack className={`${cardBase} top-28 min-h-[62svh] flex-col justify-between gap-10 bg-wine p-8 text-cream sm:aspect-[16/10] sm:min-h-0 md:p-14`}>
          <h3 className="text-center font-serif text-6xl leading-none md:text-8xl">{t("privateCard2Title")}</h3>
          <div className="max-w-xl">
            <p className="text-sm leading-relaxed text-cream/85 md:text-base">{t("privateCard2Text")}</p>
            <Link href="/experiences#private" className="pill pill-blush mt-7">
              {t("privateCta")}
            </Link>
          </div>
        </article>

        {/* 3 — the cellar */}
        <article data-stack className={`${cardBase} top-32 isolate aspect-[4/5] origin-top items-end bg-ink p-8 text-cream sm:aspect-[16/10] md:p-14`}>
          <Image src={homeImages.privateWine} alt="" fill sizes="(min-width: 1100px) 1100px, 100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="max-w-xl font-serif text-5xl leading-[0.95] md:text-7xl">{t("privateCard3")}</h3>
            <Link href="/experiences#wine" className="pill pill-line shrink-0">
              {t("pairingLink")}
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Reviews — big count on the left, tilted wall of cards on the right  */
/* ------------------------------------------------------------------ */
export async function ReviewsWall({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home" });
  const reviews = t.raw("reviews") as Review[];
  const tiles = homeImages.tiles;

  // Three columns mixing quotes and photo tiles; each column is rendered twice for a seamless loop.
  const columns = [0, 1, 2].map((col) => {
    const items: ({ kind: "review"; review: Review } | { kind: "tile"; src: string })[] = [];
    reviews.forEach((review, i) => {
      if (i % 3 === col) items.push({ kind: "review", review });
    });
    items.splice(1, 0, { kind: "tile", src: tiles[col % tiles.length] });
    if (col === 1) items.push({ kind: "tile", src: tiles[3] });
    return items;
  });

  return (
    <section id="reviews" className="relative overflow-hidden bg-wine text-cream">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-20 md:px-8 lg:min-h-[90vh] lg:grid-cols-12 lg:py-0">
        <div className="relative z-10 lg:col-span-4">
          <p className="text-[0.66rem] font-medium uppercase tracking-[0.3em] text-gold">{t("reviewsKicker")}</p>
          <p className="mt-4 font-serif text-[7rem] leading-[0.85] md:text-[9rem]">{t("reviewsCount")}</p>
          <p className="mt-4 flex items-center gap-3 text-sm text-cream/85">
            <span aria-hidden className="tracking-[0.2em] text-blush">
              ●●●●◐
            </span>
            {t("reviewsRating")}
          </p>
          <a
            href={site.tripadvisor}
            className="mt-6 inline-block text-[0.66rem] uppercase tracking-[0.24em] underline decoration-gold underline-offset-[6px] hover:text-gold"
          >
            {t("reviewsLink")}
          </a>
          <p className="mt-10 text-xs text-cream/50">{t("reviewsNote")}</p>
        </div>

        <div
          className="reviews-wall relative h-[560px] lg:col-span-8 lg:h-[90vh]"
          style={{ maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)" }}
        >
          <div className="absolute -inset-x-10 -inset-y-24 grid rotate-[-9deg] grid-cols-2 gap-4 sm:grid-cols-3">
            {columns.map((items, col) => (
              <div key={col} className={`${col === 2 ? "hidden sm:block" : ""} overflow-hidden`}>
                <ul className={`flex flex-col gap-4 ${col % 2 === 0 ? "drift" : "drift-reverse"}`}>
                  {[...items, ...items].map((item, i) => (
                    <li key={i} aria-hidden={i >= items.length ? true : undefined}>
                      {item.kind === "review" ? (
                        <figure className="rounded-2xl bg-paper p-6 text-ink shadow-xl">
                          <blockquote className="font-serif text-xl leading-snug">“{item.review.quote}”</blockquote>
                          <figcaption className="mt-4 text-[0.62rem] uppercase tracking-[0.22em] text-muted">
                            {item.review.author}
                          </figcaption>
                        </figure>
                      ) : (
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink shadow-xl">
                          <Image src={item.src} alt="" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Closing — full-bleed night photo, "See you on Rua Garrett."         */
/* ------------------------------------------------------------------ */
export async function Closing({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home" });
  const hero = await getTranslations({ locale, namespace: "hero" });
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-cream">
      <div className="zoom-in-view absolute inset-0 -z-10">
        <Image src={homeImages.closing} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/30 via-ink/20 to-ink/85" />

      <div className="mx-auto w-full max-w-[1440px] px-5 pb-10 text-center md:px-8 md:pb-14">
        <Link href="/reservations" className="pill pill-blush">
          {hero("book")}
        </Link>
        <h2 className="mt-8 font-serif text-6xl leading-[0.92] tracking-[-0.015em] md:text-8xl lg:text-[8.5rem]">
          {t("closingTitle")}
        </h2>
        <div className="mt-10 grid gap-3 border-t border-cream/25 pt-6 text-[0.66rem] uppercase tracking-[0.24em] text-cream/80 sm:grid-cols-3">
          <a href={site.mapsUrl} className="hover:text-gold">
            {site.street}, {site.postal}
          </a>
          <p>{t("closingHours")}</p>
          <a href={site.phoneHref} className="hover:text-gold">
            {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
