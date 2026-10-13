/**
 * DEMONSTRATION prayer times for the UI phase only.
 *
 * These are not the mosque's official timetable. The calculation method and
 * iqamah times must be approved by the mosque leadership before real times
 * are published (see docs/CONTENT-STATUS.md).
 */

export const PRAYER_TIMES_ARE_DEMO = true;

export type PrayerSlot = {
  key: "fajr" | "sunrise" | "dhuhr" | "asr" | "maghrib" | "isha";
  name: string;
  arabic: string;
  time: string; // "HH:MM", 24-hour, Lagos time
  isPrayer: boolean;
};

export const demoPrayerTimes: PrayerSlot[] = [
  { key: "fajr", name: "Fajr", arabic: "الفجر", time: "05:15", isPrayer: true },
  { key: "sunrise", name: "Sunrise", arabic: "الشروق", time: "06:30", isPrayer: false },
  { key: "dhuhr", name: "Dhuhr", arabic: "الظهر", time: "12:35", isPrayer: true },
  { key: "asr", name: "Asr", arabic: "العصر", time: "15:50", isPrayer: true },
  { key: "maghrib", name: "Maghrib", arabic: "المغرب", time: "18:40", isPrayer: true },
  { key: "isha", name: "Isha", arabic: "العشاء", time: "19:50", isPrayer: true },
];

export const demoJumuah = { name: "Jumuʿah", arabic: "الجمعة", time: "13:30" };
