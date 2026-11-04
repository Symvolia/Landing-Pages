"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "@/i18n/navigation";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Smooth scroll (Lenis) driven by GSAP's ticker, so ScrollTrigger scenes stay in sync.
 * Native scroll is kept underneath: sticky, anchors and the browser's scroll restoration keep working.
 * Touch devices keep native scrolling (Lenis only smooths the wheel by default).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ autoRaf: false, anchors: { offset: -80 }, lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add("lenis");
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);
  return null;
}

/**
 * Generic scroll animations, set up again on every route:
 * - .reveal        fades up once when it enters the viewport
 * - .zoom-in-view  image wrapper that pushes in (scale 1.2 → 1) while the section scrolls in
 * - [data-stack]   cards that recede (scale + dim) while the next card slides over them
 * Without JS or with reduced motion everything simply stays in its final state.
 */
export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".zoom-in-view").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.22 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom bottom", scrub: true } },
        );
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-stack]");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card, {
          scale: 0.92,
          filter: "brightness(0.55)",
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 30%", scrub: true },
        });
      });
    });
    // Images and fonts change heights after load: recompute trigger positions.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
