"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Page = { src: string; width: number; height: number };

/**
 * Page-by-page reader for the scanned books. One page is shown at a time;
 * neighbours are preloaded so turning pages feels instant on mobile data.
 * Keyboard: ← / → turn pages. Touch: swipe left or right.
 */
export function BookReader({ title, pages }: { title: string; pages: Page[] }) {
  const [index, setIndex] = useState(0);
  const [fitWidth, setFitWidth] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);
  const total = pages.length;
  const page = pages[index];

  const go = useCallback((delta: number) => setIndex((i) => Math.min(total - 1, Math.max(0, i + delta))), [total]);

  // Preload the neighbouring pages.
  useEffect(() => {
    for (const n of [index + 1, index + 2, index - 1]) {
      if (n >= 0 && n < total) {
        const img = new window.Image();
        img.src = pages[n].src;
      }
    }
  }, [index, pages, total]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    }
    function onFullscreen() {
      setFullscreen(document.fullscreenElement === containerRef.current);
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, [go]);

  function toggleFullscreen() {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.().catch(() => undefined);
  }

  const navButton =
    "size-12 items-center justify-center rounded-full bg-ivory text-emerald-900 shadow-md ring-1 ring-sand transition-all hover:bg-white disabled:pointer-events-none disabled:opacity-30";

  return (
    <div ref={containerRef} className={`bg-parchment ${fullscreen ? "flex h-full flex-col overflow-auto" : ""}`}>
      {/* Toolbar */}
      <div className={`z-30 border-b border-sand bg-ivory/95 backdrop-blur ${fullscreen ? "sticky top-0" : "sticky top-[4.5rem] md:top-20"}`}>
        <div className="container-page flex h-14 items-center gap-3">
          <Link href="/library" className="hidden items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:underline sm:inline-flex">
            <Icon name="chevronLeft" className="size-4" /> Library
          </Link>
          <p className="min-w-0 flex-1 truncate font-display text-lg text-emerald-900 sm:text-center">{title}</p>
          <label className="flex items-center gap-2 text-sm text-muted">
            <span className="sr-only sm:not-sr-only">Page</span>
            <select
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
              className="h-9 rounded-full bg-parchment px-3 text-sm font-semibold tabular-nums text-emerald-900 ring-1 ring-sand"
            >
              {pages.map((_, i) => (
                <option key={i} value={i}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className="tabular-nums">of {total}</span>
          </label>
          <button
            type="button"
            onClick={() => setFitWidth((v) => !v)}
            aria-pressed={fitWidth}
            className="hidden h-9 items-center rounded-full px-3 text-sm font-semibold text-emerald-800 ring-1 ring-sand hover:bg-parchment md:inline-flex"
          >
            {fitWidth ? "Fit page" : "Fit width"}
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex size-9 items-center justify-center rounded-full text-emerald-800 ring-1 ring-sand hover:bg-parchment"
          >
            <Icon name="expand" className="size-4" />
            <span className="sr-only">{fullscreen ? "Exit full screen" : "Full screen"}</span>
          </button>
        </div>
      </div>

      {/* Page */}
      <div className="relative flex-1">
        <div className="container-page flex items-center justify-center gap-4 py-6 md:py-8">
          <button type="button" onClick={() => go(-1)} disabled={index === 0} className={`${navButton} hidden md:inline-flex`}>
            <Icon name="chevronLeft" />
            <span className="sr-only">Previous page</span>
          </button>

          <figure
            className="relative touch-pan-y select-none"
            onPointerDown={(e) => {
              swipeStart.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (swipeStart.current === null) return;
              const dx = e.clientX - swipeStart.current;
              swipeStart.current = null;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            }}
          >
            <div className="overflow-hidden rounded-md bg-white shadow-[0_30px_60px_-30px_rgba(7,29,28,.55)] ring-1 ring-sand">
              <Image
                key={page.src}
                src={page.src}
                alt={`${title}, page ${index + 1} of ${total}`}
                width={page.width}
                height={page.height}
                unoptimized
                priority={index === 0}
                draggable={false}
                className={`animate-page-in block h-auto ${
                  fitWidth
                    ? "w-full max-w-5xl"
                    : fullscreen
                      ? "max-h-[calc(100dvh-9rem)] w-auto"
                      : "w-full md:max-h-[calc(100dvh-13rem)] md:w-auto"
                }`}
              />
            </div>
            <figcaption className="sr-only" aria-live="polite">
              Page {index + 1} of {total}
            </figcaption>
          </figure>

          <button type="button" onClick={() => go(1)} disabled={index === total - 1} className={`${navButton} hidden md:inline-flex`}>
            <Icon name="chevronRight" />
            <span className="sr-only">Next page</span>
          </button>
        </div>

        {/* Mobile controls */}
        <div className="container-page flex items-center justify-between pb-8 md:hidden">
          <button type="button" onClick={() => go(-1)} disabled={index === 0} className={`${navButton} inline-flex`}>
            <Icon name="chevronLeft" />
            <span className="sr-only">Previous page</span>
          </button>
          <p className="text-sm tabular-nums text-muted">
            {index + 1} / {total}
          </p>
          <button type="button" onClick={() => go(1)} disabled={index === total - 1} className={`${navButton} inline-flex`}>
            <Icon name="chevronRight" />
            <span className="sr-only">Next page</span>
          </button>
        </div>
        <p className="hidden pb-6 text-center text-xs text-muted md:block">Use ← and → to turn pages</p>
      </div>
    </div>
  );
}
