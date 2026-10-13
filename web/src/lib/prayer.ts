import type { PrayerSlot } from "@/content/prayer";

/** Lagos is UTC+1 all year (no daylight saving). */
const LAGOS_OFFSET_MS = 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export const LAGOS_TZ = "Africa/Lagos";

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Milliseconds since Lagos midnight for a given instant. */
function lagosMsOfDay(instant: number) {
  return (((instant + LAGOS_OFFSET_MS) % DAY_MS) + DAY_MS) % DAY_MS;
}

export type NextPrayer = {
  slot: PrayerSlot;
  msUntil: number;
  isTomorrow: boolean;
};

/** The next obligatory prayer after `instant`; after Isha this is tomorrow's Fajr. */
export function getNextPrayer(slots: PrayerSlot[], instant: number): NextPrayer {
  const prayers = slots.filter((s) => s.isPrayer);
  const msOfDay = lagosMsOfDay(instant);
  for (const slot of prayers) {
    const at = toMinutes(slot.time) * 60_000;
    if (at > msOfDay) return { slot, msUntil: at - msOfDay, isTomorrow: false };
  }
  const first = prayers[0];
  return { slot: first, msUntil: DAY_MS - msOfDay + toMinutes(first.time) * 60_000, isTomorrow: true };
}

/** The prayer whose time has most recently started (null before Fajr). */
export function getCurrentPrayer(slots: PrayerSlot[], instant: number): PrayerSlot | null {
  const msOfDay = lagosMsOfDay(instant);
  let current: PrayerSlot | null = null;
  for (const slot of slots.filter((s) => s.isPrayer)) {
    if (toMinutes(slot.time) * 60_000 <= msOfDay) current = slot;
  }
  return current;
}

export function formatCountdown(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return { h, m, s, label: `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s` };
}

/** "13:30" -> "1:30 PM" */
export function to12h(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatGregorian(instant: number) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: LAGOS_TZ,
  }).format(instant);
}

/** Umm al-Qura Hijri date. Local moon sighting may differ by a day. */
export function formatHijri(instant: number) {
  try {
    return new Intl.DateTimeFormat("en-GB-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: LAGOS_TZ,
    }).format(instant);
  } catch {
    return null;
  }
}

export function isFriday(instant: number) {
  return new Date(instant + LAGOS_OFFSET_MS).getUTCDay() === 5;
}
