import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from "adhan";
import { prayerCalculationConfig, prayerLabels, type PrayerSlot } from "@/content/prayer";

export const LAGOS_TZ = prayerCalculationConfig.timezone;
export function lagosDateKey(instant: number): string {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: LAGOS_TZ, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(instant);
  const get = (type: string) => parts.find(part => part.type === type)!.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}
export function nextDateKey(key: string): string {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + 1)).toISOString().slice(0, 10);
}
export function getCalculationParameters() {
  const config = prayerCalculationConfig;
  const params = CalculationMethod[config.method]();
  params.madhab = config.asr === "hanafi" ? Madhab.Hanafi : Madhab.Shafi;
  params.adjustments = { ...config.adjustments };
  return params;
}
export function calculatePrayerTimes(dateKey: string): PrayerSlot[] {
  const [year, month, day] = dateKey.split("-").map(Number);
  // Adhan reads local calendar fields then returns UTC prayer instants. Supply
  // Lagos's selected calendar date, independent of the visitor's timezone.
  const date = new Date(year, month - 1, day, 12);
  const config = prayerCalculationConfig;
  const params = getCalculationParameters();
  const times = new PrayerTimes(new Coordinates(config.cityCoordinates.latitude, config.cityCoordinates.longitude), date, params);
  return prayerLabels.map(label => {
    const at = times[label.key].getTime();
    if (!Number.isFinite(at)) throw new Error("Prayer calculation is unavailable for this date.");
    const time = new Intl.DateTimeFormat("en-GB", { timeZone: LAGOS_TZ, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(at);
    return { ...label, time, at };
  });
}
export type NextPrayer = { slot: PrayerSlot; msUntil: number; isTomorrow: boolean };
export function getNextPrayer(today: PrayerSlot[], tomorrow: PrayerSlot[], instant: number): NextPrayer {
  const next = today.find(slot => slot.isPrayer && slot.at > instant);
  const slot = next ?? tomorrow.find(slot => slot.key === "fajr")!;
  return { slot, msUntil: Math.max(0, slot.at - instant), isTomorrow: !next };
}
export function formatCountdown(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600), m = Math.floor((total % 3600) / 60), s = total % 60;
  return { h, m, s, label: `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s` };
}
export function to12h(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}
export function formatGregorian(instant: number) {
  return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: LAGOS_TZ }).format(instant);
}
export function formatHijri(instant: number) {
  try { return new Intl.DateTimeFormat("en-GB-u-ca-islamic-umalqura", { day: "numeric", month: "long", year: "numeric", timeZone: LAGOS_TZ }).format(instant); }
  catch { return null; }
}
