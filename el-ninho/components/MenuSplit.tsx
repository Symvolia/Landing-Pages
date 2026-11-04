"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import { homeImages, menuGroups } from "@/lib/content";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type GroupId = (typeof menuGroups)[number]["id"];

/**
 * "Reservado." → "Explore our menu", as one shot.
 * Desktop: the section pins; the photo starts full-bleed, then frames itself and shrinks to the left
 * while the menu panel pushes in from the right. The pin holds a little longer so the menu can be used.
 * Phones / reduced motion: photo and panel are simply stacked (final layout, no pin).
 * Hovering, focusing or tapping a course group swaps the photo and opens its dishes.
 */
export function MenuSplit() {
  const t = useTranslations("home");
  const hero = useTranslations("hero");
  const dishes = useTranslations("dishes");
  const [active, setActive] = useState<GroupId | null>(null);
  const current = menuGroups.find((group) => group.id === active);

  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(section.current, { height: "300vh" });
      gsap.set(frame.current, { top: 0, left: 0, right: 0, bottom: 0, borderRadius: 0 });
      gsap.set(photo.current, { width: "100%" });
      gsap.set(panel.current, { xPercent: 100 });

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
        })
        // 1. the photo frames itself below the header
        .to(frame.current, { top: 88, left: 20, right: 20, bottom: 20, borderRadius: 24, duration: 0.25, ease: "power1.inOut" }, 0)
        // 2. it slides aside while the menu pushes in
        .to(photo.current, { width: "59%", duration: 0.4, ease: "power2.inOut" }, 0.18)
        .to(panel.current, { xPercent: 0, duration: 0.4, ease: "power2.inOut" }, 0.18)
        // 3. hold: time to use the menu
        .to({}, { duration: 0.37 });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="menu-preview" className="relative bg-cream p-3 md:p-5 lg:p-0">
      <div className="lg:sticky lg:top-0 lg:h-[100svh] lg:overflow-hidden">
        <div
          ref={frame}
          className="relative overflow-hidden rounded-3xl bg-paper lg:absolute lg:bottom-5 lg:left-5 lg:right-5 lg:top-[88px]"
        >
          {/* Photo side */}
          <div
            ref={photo}
            className="relative isolate min-h-[78svh] overflow-hidden bg-ink text-cream lg:absolute lg:inset-y-0 lg:left-0 lg:min-h-0 lg:w-[59%]"
          >
            <Image src={homeImages.reserved} alt="" fill sizes="100vw" className="object-cover" />
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
            <div className="absolute inset-0 bg-gradient-to-br from-ink/70 via-ink/15 to-ink/30" />

            <div className="relative flex h-full min-h-[78svh] flex-col justify-between p-6 pt-8 md:p-10 lg:min-h-0">
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
          <div
            ref={panel}
            data-lenis-prevent
            className="flex flex-col px-6 py-10 md:px-12 md:py-14 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[41%] lg:overflow-y-auto lg:py-12"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-serif text-4xl md:text-5xl">{t("menuTitle")}</h2>
              <Link href="/menu" className="shrink-0 text-[0.62rem] uppercase tracking-[0.24em] text-copper hover:underline">
                {t("menuLink")}
              </Link>
            </div>
            <p className="mt-3 text-[0.66rem] uppercase tracking-[0.24em] text-muted">{t("menuNote")}</p>

            <ul className="mt-10 border-t border-line lg:mt-auto" onMouseLeave={() => setActive(null)}>
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
                      <p className="overflow-hidden pl-11 text-sm leading-relaxed text-muted">
                        <span className="block pb-5">{group.dishes.map((id) => dishes(`${id}.name`)).join(" · ")}</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
