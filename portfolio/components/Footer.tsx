import { getTranslations } from "next-intl/server";
import { Newsletter } from "@/components/Newsletter";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy text-slate-300">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-white">{site.name}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed">{t("note")}</p>
          <Newsletter />
        </div>
        <div className="flex flex-col gap-3 text-sm sm:items-end">
          <div className="flex gap-3">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-full border-2 border-cyan text-xs font-semibold text-cyan transition hover:bg-cyan hover:text-navy"
            >
              in
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-full border-2 border-cyan text-xs font-semibold text-cyan transition hover:bg-cyan hover:text-navy"
            >
              GH
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="grid h-11 w-11 place-items-center rounded-full border-2 border-cyan text-xs font-semibold text-cyan transition hover:bg-cyan hover:text-navy"
            >
              @
            </a>
          </div>
          <p className="text-slate-400">
            © {year} {site.name}. {t("rights")}
          </p>
          <Link href="/privacy" className="text-sm text-cyan hover:underline">
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
