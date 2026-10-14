"use client";

import { useMemo } from "react";
import { useNow } from "@/lib/clock";
import { calculatePrayerTimes, lagosDateKey, nextDateKey, formatCountdown, formatGregorian, formatHijri, getNextPrayer, to12h } from "@/lib/prayer";
import { prayerCalculationConfig, calculationMethodNames, prayerLabels } from "@/content/prayer";

export function PrayerPanel({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const now = useNow();
  const dateKey = now === null ? null : lagosDateKey(now);
  const calculated = useMemo(() => {
    if (!dateKey) return null;
    try { return { today: calculatePrayerTimes(dateKey), tomorrow: calculatePrayerTimes(nextDateKey(dateKey)) }; }
    catch { return null; }
  }, [dateKey]);
  const next = now === null || !calculated ? null : getNextPrayer(calculated.today, calculated.tomorrow, now);
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
              Calculated prayer times
            </h2>
            <span className="rounded-full bg-emerald-900/5 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-900/15">Lagos · Africa/Lagos</span>
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">Next calculated prayer</p>
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
            <p className="mt-2 text-sm text-muted">{now === null ? "Calculating times…" : "Times unavailable. Please follow the mosque’s announcements."}</p>
          )}
        </div>
      </div>

      <div className="rule-gold my-6 opacity-50" />

      <ol className={`grid grid-cols-2 gap-2.5 sm:grid-cols-3 ${full ? "lg:grid-cols-6" : "md:grid-cols-6"}`}>
        {(calculated?.today ?? prayerLabels.map(label => ({ ...label, time: "", at: 0 }))).map((slot) => {
          const isNext = !next?.isTomorrow && next?.slot.key === slot.key;
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
              <p className={`font-display text-2xl tabular-nums ${full ? "md:text-3xl" : ""}`}>{slot.time ? to12h(slot.time) : "—"}</p>
              {isNext && <span className="sr-only">(next prayer)</span>}
            </li>
          );
        })}
      </ol>

      <p className="mt-5 text-sm text-muted">
        Calculated for Lagos city using {calculationMethodNames[prayerCalculationConfig.method]};
        {" "}{prayerCalculationConfig.asr === "hanafi" ? "Hanafi" : "standard (Maliki, Shafi‘i and Hanbali)"} Asr.
        Times update each day in Africa/Lagos. These are prayer start times, not HAQSLAM’s official Iqamah timetable.
        Please follow the mosque’s announcements for congregational and Jumu‘ah times.
      </p>
      <noscript><p className="mt-3 text-sm text-muted">Enable JavaScript to display daily calculated times and the countdown.</p></noscript>
    </section>
  );
}
