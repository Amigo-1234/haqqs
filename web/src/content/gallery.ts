import { annualEvents } from "./events";
import { founder } from "./founder";

/**
 * Photo collections. Only images supplied by the society are used. Collections
 * without approved photographs render an empty state rather than stock imagery.
 */

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  date?: string;
};

export type GalleryCollection = {
  slug: string;
  title: string;
  description: string;
  date?: string;
  images: GalleryImage[];
  /** A dedicated event gallery holding the full collection, when there is one. */
  href?: string;
  total?: number;
};

const [maolid2026, maolid2023] = annualEvents;

export const collections: GalleryCollection[] = [
  {
    slug: "maolid-2026",
    title: "Annual Maolid Nabiyy 2026",
    description: "Moments from our celebration, Sunday, October 11, 2026, Ojokoro, Lagos.",
    date: "October 2026",
    images: [
      ...(maolid2026.photos ?? []).slice(0, 5).map((p) => ({ ...p, date: "11 October 2026" })),
      { ...maolid2026.poster, caption: "Official programme flyer", date: "11 October 2026" },
    ],
    href: `/events/${maolid2026.slug}`,
    total: (maolid2026.photos?.length ?? 0) + 1,
  },
  {
    slug: "maolid-2023",
    title: "Symposium & Maolid 2023",
    description: "Two days of lectures and celebration at the National Secretariat.",
    date: "November 2023",
    images: [{ ...maolid2023.poster, caption: "Official programme flyer", date: "25–26 November 2023" }],
  },
  {
    slug: "founder",
    title: "Our Founder",
    description: founder.displayName,
    images: [{ ...founder.portrait, caption: `${founder.displayName}, ${founder.title}` }],
  },
  {
    slug: "secretariat",
    title: "The Mosque & Secretariat",
    description: "Ijaye-Ojokoro, Lagos.",
    images: [],
  },
  {
    slug: "gatherings",
    title: "Asalatu & Weekly Gatherings",
    description: "Remembrance and prayer through the week.",
    images: [],
  },
  {
    slug: "education",
    title: "Learning & Arabic Studies",
    description: "Classes and students.",
    images: [],
  },
];
