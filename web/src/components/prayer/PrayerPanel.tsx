"use client";

import { useNow } from "@/lib/clock";
import {
  formatCountdown,
  formatGregorian,
  formatHijri,
  getCurrentPrayer,
  getNextPrayer,
  isFriday,
  to12h,
} from "@/lib/prayer";
import { demoJumuah, demoPrayerTimes, PRAYER_TIMES_ARE_DEMO } from "@/content/prayer";

function DemoBadge() {
  if (!PRAYER_TIMES_ARE_DEMO) return null;
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-crimson/8 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-crimson ring-1 ring-crimson/20">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-crimson" />
      Demonstration times
    </span>
  );
}

export function PrayerPanel({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const now = useNow();
  const next = now === null ? null : getNextPrayer(demoPrayerTimes, now);
  const current = now === null ? null : getCurrentPrayer(demoPrayerTimes, now);
  const countdown = next ? formatCountdown(next.msUntil) : null;
  const hijri = now === null ? null : formatHijri(now);
  const full = variant === "full";

  return (
    <section
      aria-labelledby="prayer-heading"
      className="rounded-[1.75rem] bg-ivory p-5 shadow-[0_30px_80px_-40px_rgba(7,29,28,.55)] ring-1 ring-sand sm:p-7 md:p-9"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="prayer-heading" className="font-display text-2xl text-emerald-900 md:text-[1.75rem]">
              Prayer times today
            </h2>
            <DemoBadge />
          </div>
          <p className="mt-2 min-h-[1.6em] text-[0.95rem] text-muted">
            {now === null ? (
              <span className="inline-block h-4 w-56 animate-pulse rounded bg-sand/70 align-middle" />
            ) : (
              <>
                {formatGregorian(now)}
                {hijri && (
                  <>
                    <span aria-hidden="true" className="mx-2 text-gold">
                      ◆
                    </span>
                    {hijri} <span className="text-xs">(approx.)</span>
                  </>
                )}
              </>
            )}
          </p>
        </div>

        <div className="md:text-right" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">Next prayer</p>
          {next && countdown ? (
            <>
              <p className="mt-1 font-display text-3xl text-emerald-900">
                {next.slot.name}
                <span className="ml-2 text-lg text-muted">
                  {next.isTomorrow ? "tomorrow, " : ""}
                  {to12h(next.slot.time)}
                </span>
              </p>
              <p aria-hidden="true" className="mt-1 font-display text-[1.65rem] tabular-nums text-gold-deep">
                in {countdown.label}
              </p>
            </>
          ) : (
            <p className="mt-2 h-16 w-48 animate-pulse rounded-lg bg-sand/60 md:ml-auto" />
          )}
        </div>
      </div>

      <div className="rule-gold my-6 opacity-50" />

      <ol className={`grid grid-cols-2 gap-2.5 sm:grid-cols-3 ${full ? "lg:grid-cols-6" : "md:grid-cols-6"}`}>
        {demoPrayerTimes.map((slot) => {
          const isNext = next?.slot.key === slot.key;
          const isCurrent = current?.key === slot.key;
          return (
            <li
              key={slot.key}
              aria-current={isNext ? "time" : undefined}
              className={`relative rounded-2xl px-4 py-4 transition-colors duration-500 ${
                isNext
                  ? "bg-emerald-900 text-ivory shadow-lg"
                  : slot.isPrayer
                    ? "bg-parchment/70 text-ink"
                    : "bg-transparent text-muted ring-1 ring-inset ring-sand"
              }`}
            >
              <p lang="ar" dir="rtl" className={`text-right text-lg leading-none ${isNext ? "text-gold-light" : "text-gold-deep"}`}>
                {slot.arabic}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em]">{slot.name}</p>
              <p className={`font-display text-2xl tabular-nums ${full ? "md:text-3xl" : ""}`}>{to12h(slot.time)}</p>
              {isNext && <span className="sr-only">(next prayer)</span>}
              {isCurrent && !isNext && (
                <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-emerald-700">Current</p>
              )}
            </li>
          );
        })}
      </ol>

      {full && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-emerald-900/5 px-5 py-4 ring-1 ring-emerald-900/10">
          <p className="flex items-center gap-3">
            <span lang="ar" dir="rtl" className="text-xl text-gold-deep">
              {demoJumuah.arabic}
            </span>
            <span className="font-semibold text-emerald-900">{demoJumuah.name} prayer</span>
            {now !== null && isFriday(now) && (
              <span className="rounded-full bg-gold-light/50 px-2.5 py-0.5 text-xs font-semibold text-emerald-950">Today</span>
            )}
          </p>
          <p className="font-display text-2xl tabular-nums text-emerald-900">{to12h(demoJumuah.time)}</p>
        </div>
      )}

      {PRAYER_TIMES_ARE_DEMO && (
        <p className="mt-5 text-sm text-muted">
          These are sample times for design review only and are not the mosque’s official timetable. Official times will be
          published once confirmed by the mosque leadership.
        </p>
      )}
    </section>
  );
}
