"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { galleryImages } from "@/lib/content";

export function GalleryGrid({ preview = false }: { preview?: boolean }) {
  const t = useTranslations("gallery");
  const images = preview ? galleryImages.slice(0, 4) : galleryImages;
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function open(next: number) {
    setIndex(next);
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
    setIndex(null);
  }

  function shift(direction: number) {
    setIndex((current) => {
      if (current === null) return current;
      return (current + direction + images.length) % images.length;
    });
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const total = images.length;
    const onKey = (event: KeyboardEvent) => {
      if (!dialog.open) return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const direction = event.key === "ArrowRight" ? 1 : -1;
      setIndex((current) => (current === null ? current : (current + direction + total) % total));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length]);

  const current = index === null ? null : images[index];

  return (
    <>
      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((image, imageIndex) => {
          const label = t(`alts.${image.id}`);
          return (
            <li key={image.id} className="mb-4 break-inside-avoid">
              <button
                type="button"
                onClick={() => open(imageIndex)}
                className="group relative block w-full overflow-hidden bg-ink"
                aria-label={t("open", { label })}
              >
                <Image
                  src={image.src}
                  alt={label}
                  width={900}
                  height={image.tall ? 1200 : 760}
                  loading="lazy"
                  className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </button>
            </li>
          );
        })}
      </ul>

      <dialog ref={dialogRef} className="lightbox-dialog" onClose={() => setIndex(null)}>
        {current ? (
          <div className="relative">
            <Image src={current.src} alt={t(`alts.${current.id}`)} width={1400} height={1000} className="max-h-[78vh] w-full object-contain" />
            <div className="mt-3 flex items-center justify-between gap-3 text-cream">
              <button type="button" className="text-xs uppercase tracking-[0.18em]" onClick={() => shift(-1)}>
                {t("prev")}
              </button>
              <p className="text-sm">{t(`alts.${current.id}`)}</p>
              <div className="flex gap-4">
                <button type="button" className="text-xs uppercase tracking-[0.18em]" onClick={() => shift(1)}>
                  {t("next")}
                </button>
                <button type="button" className="text-xs uppercase tracking-[0.18em]" onClick={close}>
                  {t("close")}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
