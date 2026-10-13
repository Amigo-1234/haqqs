/**
 * Weekly programme, carried over from the previous website. The whole schedule
 * awaits confirmation; two times on the old site looked like typing errors and
 * are shown as "to be confirmed" instead.
 */

export type WeeklyActivity = {
  name: string;
  when: string;
  time: string | null;
  note?: string;
  frequency: "daily" | "weekly" | "monthly";
};

export const weeklyProgramme: WeeklyActivity[] = [
  { name: "Wasifat", when: "Every day", time: "8:00 – 10:30 AM", frequency: "daily" },
  { name: "Asalatu", when: "Every Sunday", time: "9:00 AM – 1:00 PM", frequency: "weekly" },
  {
    name: "Azikaru",
    when: "Every Thursday",
    time: null,
    note: "Previously listed as 7:00 AM – 8:00 PM",
    frequency: "weekly",
  },
  { name: "Wasifat-Kubural", when: "Every Friday", time: "4:30 – 7:00 PM", frequency: "weekly" },
  {
    name: "Arabic Studies",
    when: "Monday – Thursday",
    time: "4:30 – 7:00 PM",
    note: "Saturday session time to be confirmed",
    frequency: "weekly",
  },
  {
    name: "Special Prayer",
    when: "First Thursday of each month",
    time: "8:00 – 9:00 PM",
    frequency: "monthly",
  },
  {
    name: "Special Prayer & Quran Day",
    when: "Second Sunday of each month",
    time: "8:45 AM – 2:00 PM",
    frequency: "monthly",
  },
];
