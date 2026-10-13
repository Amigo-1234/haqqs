import pages from "./library-pages.json";

/**
 * The Islamic library. Titles are transcribed from each book's cover; page
 * images are web copies of the original scans (originals stay in /haqslam).
 * Regenerate pages with: python3 -I web/scripts/prepare_assets.py <uploads>
 */

export type BookCategory = "Prayer & Devotion" | "Adhkar & Supplications" | "Sacred Occasions";

export type Book = {
  slug: keyof typeof pages;
  title: string;
  arabicTitle?: string;
  subtitle: string;
  category: BookCategory;
  publisher: string;
  credit?: string;
  edition?: string;
  languages: string[];
  legacyName: string;
  available: boolean;
};

export const books: Book[] = [
  {
    slug: "haqslam-prayer-book",
    title: "HAQSLAM Prayer Book",
    arabicTitle: "كتاب الصلاة",
    subtitle: "Kitab as-Salah",
    category: "Prayer & Devotion",
    publisher: "Haqiqatu-Salam Society of Nigeria",
    edition: "Second edition",
    languages: ["Arabic", "Transliteration", "Yoruba", "English"],
    legacyName: "Azalatu book",
    available: true,
  },
  {
    slug: "kitab-al-adhkar",
    title: "Kitab al-Adhkar al-Mukhtarat",
    arabicTitle: "كتاب الأذكار المختارات",
    subtitle: "The Book of Selected Remembrances",
    category: "Adhkar & Supplications",
    publisher: "Haqiqat-s-Salam Society",
    credit: "Compiled and arranged by Fadilat Sheikh Alhaji AbdulGhani Daud Hamzat Olohunkemi",
    languages: ["Arabic"],
    legacyName: "Night Prayer Book",
    available: true,
  },
  {
    slug: "adiya-shahriyya",
    title: "Adʿiya Shahriyya",
    arabicTitle: "أدعية شهرية",
    subtitle: "Monthly Supplications",
    category: "Adhkar & Supplications",
    publisher: "Haqiqat-s-Salam Society of Nigeria",
    edition: "First edition · Muharram 1439 / 2017",
    languages: ["Arabic"],
    legacyName: "Second Sunday book",
    available: true,
  },
  {
    slug: "muassasat-prayer-book",
    title: "Prayer Book",
    subtitle: "Muassasatu Nasrul Ilm of Nigeria",
    category: "Prayer & Devotion",
    publisher: "Muassasatu Nasrul Ilm of Nigeria, Ogba, Lagos",
    credit: "Under the auspices of Maolana Sheikh Imam Hasan Alli Cisse (R.T.A)",
    languages: ["Arabic"],
    legacyName: "Muassasatu book",
    available: true,
  },
  {
    slug: "laylat-al-qadr",
    title: "Laylat al-Qadr",
    arabicTitle: "ليلة القدر",
    subtitle: "Night of Majesty",
    category: "Sacred Occasions",
    publisher: "Haqiqat-s-Salam Society of Nigeria",
    languages: [],
    legacyName: "Book 4",
    available: false,
  },
];

export function getBook(slug: string) {
  const book = books.find((b) => b.slug === slug);
  if (!book) return null;
  return { ...book, ...pages[book.slug] };
}

export function bookCover(slug: Book["slug"]) {
  return pages[slug].cover;
}

export function pageCount(slug: Book["slug"]) {
  return pages[slug].pages.length;
}

export const externalResources = [
  {
    id: "quran",
    title: "The Noble Quran",
    arabicTitle: "القرآن الكريم",
    description: "Read and listen to the Quran with translations and tafsir on Quran.com, an independent resource.",
    href: "https://quran.com",
  },
] as const;
