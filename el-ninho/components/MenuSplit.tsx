"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { homeImages, menuGroups } from "@/lib/content";
import { cn } from "@/lib/utils";

type GroupId = (typeof menuGroups)[number]["id"];

/**
 * "Reservado." photo on the left, menu panel sliding in from the right.
 * Hovering / focusing a course group swaps the photo and opens the list of dishes.
 */
export function MenuSplit() {
  const t = useTranslations("home");
  const hero = useTranslations("hero");
  const dishes = useTranslations("dishes");
  const [active, setActive] = useState<GroupId | null>(null);
  const current = menuGroups.find((group) => group.id === active);

  return (
    <section id="menu-preview" className="bg-cream px-3 py-3 md:px-5 md:py-5">
      <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-3xl bg-paper lg:min-h-[88vh] lg:grid-cols-[1.45fr_1fr]">
        {/* Photo side */}
        <div className="relative isolate min-h-[70vh] overflow-hidden bg-ink text-cream lg:min-h-0">
          <Image src={homeImages.reserved} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
          {menuGroups.map((group) => (
            <Image
              key={group.id}
              src={group.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className={cn(
                "object-cover transition-[opacity,transform] duration-700 ease-out",
                active === group.id ? "scale-100 opacity-100" : "scale-105 opacity-0",
              )}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-ink/65 via-ink/15 to-transparent" />

          <div className="relative flex h-full min-h-[70vh] flex-col justify-between p-6 md:p-10 lg:min-h-0">
            <div>
              <p className="font-serif text-7xl italic leading-none md:text-8xl lg:text-[8.5rem]">{t("reserved")}</p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/85 md:text-base">{t("reservedText")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/reservations" className="pill pill-blush">
                  {hero("book")}
                </Link>
                <Link href="/menu" className="pill pill-line">
                  {t("menuLink")}
                </Link>
              </div>
            </div>
            <p className="text-[0.66rem] uppercase tracking-[0.3em] text-cream/75" aria-live="polite">
              {current ? t(`groups.${current.id}`) : t("menuNote")}
            </p>
          </div>
        </div>

        {/* Menu panel */}
        <div className="slide-in flex flex-col px-6 py-10 md:px-12 md:py-14">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-4xl md:text-5xl">{t("menuTitle")}</h2>
            <Link href="/menu" className="shrink-0 text-[0.62rem] uppercase tracking-[0.24em] text-copper hover:underline">
              {t("menuLink")}
            </Link>
          </div>
          <p className="mt-3 text-[0.66rem] uppercase tracking-[0.24em] text-muted">{t("menuNote")}</p>

          <ul className="mt-10 flex-1 border-t border-line lg:mt-auto" onMouseLeave={() => setActive(null)}>
            {menuGroups.map((group, index) => {
              const open = active === group.id;
              return (
                <li key={group.id} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`group-${group.id}`}
                    onMouseEnter={() => setActive(group.id)}
                    onFocus={() => setActive(group.id)}
                    onClick={() => setActive(open ? null : group.id)}
                    className="group flex w-full items-baseline gap-5 py-5 text-left"
                  >
                    <span className="w-6 text-[0.62rem] tracking-[0.2em] text-muted">{String(index + 1).padStart(2, "0")}</span>
                    <span
                      className={cn(
                        "font-serif text-3xl transition-colors duration-300 md:text-[2.1rem]",
                        open ? "italic text-copper" : "text-ink/80 group-hover:text-ink",
                      )}
                    >
                      {t(`groups.${group.id}`)}
                    </span>
                  </button>
                  <div
                    id={`group-${group.id}`}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <p className="overflow-hidden pb-0 pl-11 text-sm leading-relaxed text-muted">
                      <span className="block pb-5">{group.dishes.map((id) => dishes(`${id}.name`)).join(" · ")}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
