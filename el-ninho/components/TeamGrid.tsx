import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { team } from "@/lib/content";

export async function TeamGrid() {
  const t = await getTranslations("team");

  return (
    <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {team.map((member) => {
        const name = t(`${member.id}.name`);
        return (
          <li key={member.id} className="reveal">
            <div className="relative aspect-[3/4] overflow-hidden bg-ink">
              <Image src={member.image} alt={name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <h3 className="mt-5 font-serif text-3xl">{name}</h3>
            <p className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-copper">{t(`${member.id}.role`)}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t(`${member.id}.bio`)}</p>
            <p className="mt-4 flex gap-4 text-xs uppercase tracking-[0.14em]">
              <a href={member.instagram} className="hover:text-copper" aria-label={t("instagram", { name })}>
                Instagram
              </a>
              <a href={member.linkedin} className="hover:text-copper" aria-label={t("linkedin", { name })}>
                LinkedIn
              </a>
            </p>
          </li>
        );
      })}
    </ul>
  );
}
