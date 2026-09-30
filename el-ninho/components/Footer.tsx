import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/constants";
import { NewsletterForm } from "./NewsletterForm";

export async function Footer() {
  const t = await getTranslations("footer");
  const contact = await getTranslations("contact");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-6 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-4">
          <p className="font-serif text-4xl leading-tight">The Velvet Table</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/75">{t("newsletterText")}</p>
        </div>
        <div className="md:col-span-4">
          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-gold">{t("newsletterTitle")}</p>
          <div className="mt-5">
            <NewsletterForm />
          </div>
        </div>
        <div className="md:col-span-4 md:text-right">
          <p className="text-sm leading-relaxed text-cream/80">
            {site.street}
            <br />
            {site.postal}
            <br />
            {site.country}
          </p>
          <p className="mt-4 text-sm">
            <a className="hover:text-gold" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
            <br />
            <a className="hover:text-gold" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p className="mt-4 text-sm text-cream/70">
            {contact("tue")} {contact("tueHours")}
            <br />
            {contact("sun")} {contact("sunHours")}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-6 text-xs text-cream/65 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            © {year} The Velvet Table. {t("rights")}
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label={t("follow")}>
            <a href={site.instagram} className="hover:text-gold">
              {t("instagram")}
            </a>
            <a href={site.facebook} className="hover:text-gold">
              {t("facebook")}
            </a>
            <a href={site.tripadvisor} className="hover:text-gold">
              {t("tripadvisor")}
            </a>
            <Link href="/privacy" className="hover:text-gold">
              {t("privacy")}
            </Link>
            <Link href="/terms" className="hover:text-gold">
              {t("terms")}
            </Link>
          </nav>
        </div>
        <p className="px-6 pb-8 text-center text-[0.7rem] text-cream/40 md:px-10">{t("credits")}</p>
      </div>
    </footer>
  );
}
