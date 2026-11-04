"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import { heroImage, homeImages } from "@/lib/content";
import { site } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

// Motion allowed? Read from the media query; on the server (and during hydration) assume "no scene".
const query = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const motionAllowed = () => !window.matchMedia(query).matches;

/**
 * Intro "through the door".
 * You start on a Lisbon street; the dining room is visible inside an arched doorway in the middle.
 * Scrolling opens the doorway until the room fills the screen, then the headline comes in.
 *
 * Without JS or with reduced motion the section renders its final state (room + headline), 100svh tall.
 */
export function Hero() {
  const t = useTranslations("hero");
  const h = useTranslations("home");
  const section = useRef<HTMLElement>(null);
  const street = useRef<HTMLDivElement>(null);
  const door = useRef<HTMLDivElement>(null);
  const room = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const scene = useSyncExternalStore(subscribe, motionAllowed, () => false);

  useEffect(() => {
    if (!scene) return;
    const ctx = gsap.context(() => {
      const narrow = window.innerWidth < 768;
      // Doorway: an arch centred slightly low, wider on phones.
      const side = narrow ? 24 : 38; // % cut from left/right
      // The clip-path string is built by hand: browsers shorten "inset(a b c b)" and GSAP would
      // then pair the wrong numbers. p = 0 → closed arch, p = 1 → fully open.
      const doorState = { p: 0 };
      const drawDoor = () => {
        const k = 1 - doorState.p;
        const radius = Math.round(999 * k * k);
        if (door.current) {
          door.current.style.clipPath = `inset(${24 * k}% ${side * k}% ${8 * k}% ${side * k}% round ${radius}px ${radius}px 0px 0px)`;
        }
      };
      drawDoor();
      gsap.set(room.current, { scale: 1.35 });
      gsap.set(content.current, { autoAlpha: 0, y: 40 });

      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
        })
        .to(intro.current, { autoAlpha: 0, y: -30, duration: 0.18 }, 0)
        .to(street.current, { scale: 1.45, duration: 0.7 }, 0)
        .to(doorState, { p: 1, duration: 0.7, ease: "power1.in", onUpdate: drawDoor }, 0)
        .to(room.current, { scale: 1, duration: 0.8 }, 0)
        .to(content.current, { autoAlpha: 1, y: 0, duration: 0.25, ease: "power2.out" }, 0.62)
        .to({}, { duration: 0.13 }); // short hold before the next section
    }, section);
    const node = door.current;
    return () => {
      ctx.revert();
      if (node) node.style.clipPath = "";
    };
  }, [scene]);

  return (
    <section ref={section} className={scene ? "relative h-[260svh] bg-ink" : "relative h-[100svh] bg-ink"}>
      <div className="sticky top-0 h-[100svh] overflow-hidden text-cream">
        {/* Outside: the street */}
        <div ref={street} className="absolute inset-0 origin-[50%_62%]" aria-hidden={!scene}>
          {scene ? <Image src={homeImages.street} alt="" fill priority sizes="100vw" className="object-cover" /> : null}
          <div className="absolute inset-0 bg-ink/45" />
        </div>

        {/* Inside: the room, clipped by the doorway */}
        <div ref={door} className="absolute inset-0 overflow-hidden will-change-[clip-path]">
          <div ref={room} className="absolute inset-0 will-change-transform">
            <Image src={heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink/85" />
        </div>

        {/* Before entering: address above the door */}
        {scene ? (
          <div ref={intro} className="absolute inset-x-0 top-[13%] text-center">
            <p className="font-serif text-4xl md:text-6xl">{site.street}</p>
            <p className="mt-3 text-[0.62rem] uppercase tracking-[0.34em] text-cream/80">{h("enter")}</p>
          </div>
        ) : null}

        {/* Inside: headline */}
        <div ref={content} className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1440px] px-5 pb-10 md:px-8 md:pb-14">
            <p className="text-[0.66rem] font-medium uppercase tracking-[0.32em] text-gold">{t("kicker")}</p>
            <h1 className="mt-4 max-w-5xl font-serif text-[3.2rem] leading-[0.92] tracking-[-0.015em] sm:text-7xl lg:text-[7.5rem]">
              {h("heroTitle")}
            </h1>
            <div className="mt-8 flex flex-col gap-6 border-t border-cream/25 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm leading-relaxed text-cream/80 sm:text-base">{t("subtitle")}</p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/reservations" className="pill pill-blush">
                  {t("book")}
                </Link>
                <Link href="/menu" className="pill pill-line">
                  {t("discover")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
