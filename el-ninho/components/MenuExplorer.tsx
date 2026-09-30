"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { menuItems, type MenuCategory, type MenuItem } from "@/lib/content";
import { cn } from "@/lib/utils";

const categories: MenuCategory[] = ["tasting", "carte", "wines"];

export function MenuExplorer() {
  const t = useTranslations("menu");
  const dishes = useTranslations("dishes");
  const allergens = useTranslations("allergens");
  const [category, setCategory] = useState<MenuCategory>("tasting");
  const [active, setActive] = useState<MenuItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const items = menuItems.filter((item) => item.category === category);

  function openItem(item: MenuItem) {
    setActive(item);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
    setActive(null);
  }

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
        <div role="tablist" aria-label={t("tabs")} className="flex flex-wrap gap-2">
          {categories.map((item) => {
            const selected = item === category;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={selected}
                className={cn(
                  "h-11 border px-4 text-[0.72rem] uppercase tracking-[0.16em] transition duration-300",
                  selected ? "border-ink bg-ink text-cream" : "border-line bg-transparent hover:border-copper",
                )}
                onClick={() => setCategory(item)}
              >
                {t(item)}
              </button>
            );
          })}
        </div>
        {category === "tasting" ? (
          <p className="font-serif text-3xl">
            €{t("tastingPrice")} <span className="text-base text-muted">{t("perPerson")}</span>
          </p>
        ) : null}
      </div>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
        {category === "tasting" ? t("tastingNote") : null}
        {category === "wines" ? t("wineNote") : null}
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => openItem(item)}
              className="group flex h-full w-full flex-col border border-line bg-paper p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-copper hover:shadow-[0_18px_40px_rgba(26,26,26,0.06)]"
            >
              <span className="flex items-start justify-between gap-4">
                <span className="font-serif text-2xl leading-tight">{dishes(`${item.id}.name`)}</span>
                {item.price ? <span className="shrink-0 text-sm tracking-wide text-copper">€{item.price}</span> : null}
              </span>
              <span className="mt-3 text-sm leading-relaxed text-muted">{dishes(`${item.id}.description`)}</span>
              <span className="mt-5 flex flex-wrap gap-2">
                {item.allergens.length === 0 ? (
                  <span className="text-[0.68rem] uppercase tracking-[0.14em] text-muted">{t("none")}</span>
                ) : (
                  item.allergens.map((allergen) => (
                    <span
                      key={allergen}
                      className="border border-line px-2 py-1 text-[0.65rem] uppercase tracking-[0.14em] text-muted"
                    >
                      {allergens(allergen)}
                    </span>
                  ))
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dialogRef} className="menu-dialog" onClose={() => setActive(null)}>
        {active ? (
          <div className="p-7 md:p-10">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-copper">{t("details")}</p>
            <h2 className="mt-3 font-serif text-4xl">{dishes(`${active.id}.name`)}</h2>
            {active.price ? <p className="mt-3 text-copper">€{active.price}</p> : null}
            <p className="mt-5 text-base leading-relaxed">{dishes(`${active.id}.detail`)}</p>
            <p className="mt-6 text-[0.72rem] uppercase tracking-[0.18em] text-muted">{t("allergens")}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {active.allergens.length === 0 ? (
                <li className="text-sm text-muted">{t("none")}</li>
              ) : (
                active.allergens.map((allergen) => (
                  <li key={allergen} className="border border-line px-2 py-1 text-xs">
                    {allergens(allergen)}
                  </li>
                ))
              )}
            </ul>
            <button
              type="button"
              onClick={close}
              className="mt-8 h-11 border border-ink px-5 text-[0.72rem] uppercase tracking-[0.18em] hover:bg-ink hover:text-cream"
            >
              {t("close")}
            </button>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
