/**
 * Annual events, transcribed from the society's official flyers.
 *
 * To publish photographs for an event, prepare a manifest (see
 * scripts/prepare_maolid_2026.py) and attach it as `photos`. The event then
 * gets its own gallery at /events/<slug> with no other frontend changes.
 */
import maolid2026Photos from "./events/maolid-2026-photos.json";

export type EventPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export type EventProgramme = {
  day: string;
  title: string;
  date: string; // ISO date, Lagos local
  time: string;
  venue: string;
  people?: { role: string; name: string; note?: string }[];
  topics?: { speaker: string; titles: string[] }[];
};

export type AnnualEvent = {
  slug: string;
  year: number;
  title: string;
  poster: { src: string; width: number; height: number; alt: string };
  partners: string[];
  programme: EventProgramme[];
  /** ISO date of the main day; used to order events and mark them completed. */
  date: string;
  status: "upcoming" | "completed";
  summary: string;
  photos?: EventPhoto[];
  photoCredit?: string;
};

export const annualEvents: AnnualEvent[] = [
  {
    slug: "maolid-2026",
    year: 2026,
    title: "Annual Maolid Nabiyy Celebration 2026",
    date: "2026-10-11",
    status: "completed",
    summary:
      "The society’s annual celebration of the Prophet’s birth, held on Sunday, October 11, 2026 at Best Glorious Event Center, Ifako-Ijaiye, Ojokoro, Lagos.",
    photos: maolid2026Photos,
    photoCredit: "MC Larios TV",
    poster: {
      src: "/photos/events/maolid-2026-flyer.webp",
      width: 1032,
      height: 1080,
      alt: "Official flyer for the 2026 Annual Maolid Nabiyy celebration, with portraits of the host, chief host, guest lecturer and other dignitaries",
    },
    partners: [
      "Markazu-l-Ginaa Litaaleemideeni Wa Dunaa",
      "Muassasat Nasrul Ilm Wa Da'awat (Ojokoro Division 1)",
    ],
    programme: [
      {
        day: "Day 2",
        title: "Annual Maolid Nabiyy Celebration",
        date: "2026-10-11",
        time: "10:00 AM prompt",
        venue: "Best Glorious Event Center, Orilawe Street, Ifako-Ijaiye, Ojokoro, Lagos",
        people: [
          { role: "Host", name: "Fad. Sheikh Alh. Abd. Ganiyy Abiodun Daud Hamzat Olohunkemi", note: "Khalifatu Khulafahi Ojokoro" },
          { role: "Chief Host", name: "Fad. Sheikh Adebayo Usman Giwa" },
          { role: "Guest Lecturer", name: "Fad. Shaykh Abdur Raheem Alli Akewukewe Al-Hamaawiy" },
          { role: "Baba Adini, HAQSLAM Society", name: "Alh. Prince Waliyullah Ademola Adunola" },
        ],
      },
    ],
  },
  {
    slug: "maolid-2023",
    year: 2023,
    title: "Symposium & Annual Maolid Nabiyy 2023",
    date: "2023-11-26",
    status: "completed",
    summary:
      "Two days at the National Secretariat: a symposium of lectures on Saturday, November 25, 2023, followed by the Annual Maolid Nabiyy celebration.",
    poster: {
      src: "/photos/events/maolid-2023-flyer.webp",
      width: 1080,
      height: 662,
      alt: "Official flyer for the 2023 HAQSLAM symposium and Annual Maolid Nabiyy celebration, with speaker portraits",
    },
    partners: ["Muassasat Nasiru Ilm Wada'wat (Ojokoro Division 1)"],
    programme: [
      {
        day: "Day 1",
        title: "Symposium",
        date: "2023-11-25",
        time: "10:00 AM prompt",
        venue: "HAQSLAM National Secretariat, Ijaye-Ojokoro, Lagos",
        topics: [
          {
            speaker: "Fad. Sheikh Abd. Hammed Babalola (Oppa)",
            titles: ["Who is truly a man of God", "Importance of Sheikh Ibrahim Niyass (R.T.A)"],
          },
          { speaker: "Mr Abolarin Afeez O. (Abu Tijani)", titles: ["Current economic issues, possible solution"] },
          { speaker: "Al-Imam Abd. Azeez Mosaku Olamilekan", titles: ["The future of our youths in Nigeria"] },
        ],
      },
      {
        day: "Day 2",
        title: "Annual Maolid Nabiyy Celebration",
        date: "2023-11-26",
        time: "10:00 AM prompt",
        venue: "HAQSLAM National Secretariat, Ijaye-Ojokoro, Lagos",
      },
    ],
  },
];

export function formatEventDate(iso: string): string {
  // Dates are calendar dates; format at noon UTC so no timezone can shift the day.
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T12:00:00Z`));
}

export function getEvent(slug: string) {
  return annualEvents.find((e) => e.slug === slug) ?? null;
}

/** The most recent completed event that has photographs. */
export function latestEventWithPhotos() {
  return [...annualEvents]
    .filter((e) => e.status === "completed" && e.photos?.length)
    .sort((a, b) => b.date.localeCompare(a.date))[0];
}
