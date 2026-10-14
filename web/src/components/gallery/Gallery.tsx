"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { GalleryImage } from "@/content/gallery";

/**
 * Responsive image grid with a full-screen viewer. Uses the native <dialog>,
 * which provides focus containment and Escape-to-close. In the viewer, arrow
 * keys and left/right swipes move between images.
 */
export function Gallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : images[active];
  const swipeStart = useRef<number | null>(null);

  function open(i: number) {
    setActive(i);
    dialogRef.current?.showModal();
  }
  function step(delta: number) {
    setActive((i) => (i === null ? i : (i + delta + images.length) % images.length));
  }

  useEffect(() => {
    if (active === null || images.length < 2) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length]);

  return (
    <>
      <ul className={`gap-4 ${images.length === 1 ? "max-w-xl" : "columns-1 sm:columns-2 lg:columns-3"}`}>
        {images.map((img, i) => (
          <li key={img.src} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => open(i)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-emerald-950 text-left"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950/90 to-transparent p-4 pt-12 text-sm text-ivory opacity-95">
                {img.caption}
                {img.date && <span className="block text-xs text-gold-light">{img.date}</span>}
              </span>
              <span className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-emerald-950/70 text-ivory opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Icon name="expand" className="size-4" />
              </span>
              <span className="sr-only">View full screen</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${title}: image viewer`}
        onClose={() => setActive(null)}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-emerald-950/97 p-0 text-ivory backdrop:bg-black/70"
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="truncate text-sm text-ivory/70">
                {title}
                {images.length > 1 && (
                  <span className="ml-2 tabular-nums">
                    {active! + 1} / {images.length}
                  </span>
                )}
              </p>
              <button
                type="button"
                autoFocus
                onClick={() => dialogRef.current?.close()}
                className="inline-flex size-11 items-center justify-center rounded-full ring-1 ring-ivory/25 hover:bg-ivory/10"
              >
                <Icon name="close" />
                <span className="sr-only">Close viewer</span>
              </button>
            </div>
            <figure
              className="relative flex min-h-0 flex-1 touch-pan-y select-none flex-col items-center justify-center px-4 pb-6 sm:px-16"
              onPointerDown={(e) => {
                swipeStart.current = e.clientX;
              }}
              onPointerUp={(e) => {
                if (swipeStart.current === null || images.length < 2) return;
                const dx = e.clientX - swipeStart.current;
                swipeStart.current = null;
                if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              }}
            >
              <div className="relative h-full w-full">
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="100vw"
                  draggable={false}
                  className="animate-page-in object-contain"
                />
              </div>
              <figcaption className="mt-4 text-center">
                <p className="font-display text-lg">{current.caption}</p>
                {current.date && <p className="text-sm text-gold-light">{current.date}</p>}
              </figcaption>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute left-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 hover:bg-ivory/20 sm:left-4"
                  >
                    <Icon name="chevronLeft" />
                    <span className="sr-only">Previous image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute right-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-ivory/10 hover:bg-ivory/20 sm:right-4"
                  >
                    <Icon name="chevronRight" />
                    <span className="sr-only">Next image</span>
                  </button>
                </>
              )}
            </figure>
          </div>
        )}
      </dialog>
    </>
  );
}
