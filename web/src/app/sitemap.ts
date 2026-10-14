import type { MetadataRoute } from "next";
import { publicPages, absoluteUrl } from "@/lib/seo";
import { annualEvents } from "@/content/events";
import { books, bookCover } from "@/content/library";

/** Catalogues and public navigation are the publication sources. No private-route discovery. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...publicPages.map(page => ({ url: absoluteUrl(page.href) })),
    ...annualEvents.map(event => ({ url: absoluteUrl(`/events/${event.slug}`),
      images: [absoluteUrl(event.poster.src), ...(event.photos?.map(photo => absoluteUrl(photo.src)) ?? [])] })),
    ...books.filter(book => book.available).map(book => ({ url: absoluteUrl(`/library/${book.slug}`), images: [absoluteUrl(bookCover(book.slug).src)] })),
  ];
}
