import { site } from "@/content/site";
import { founder } from "@/content/founder";
import { verifiedLocation } from "@/content/location";
import type { AnnualEvent } from "@/content/events";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

export const entityIds = {
  organization: `${SITE_URL}/#organization`, mosque: `${SITE_URL}/#mosque`,
  founder: `${SITE_URL}/#founder`, website: `${SITE_URL}/#website`,
};
const ref = (id: string) => ({ "@id": id });
export function organizationGraph() {
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", "@id": entityIds.organization,
      name: site.name, alternateName: site.shortName, url: absoluteUrl("/"), description: site.description,
      logo: absoluteUrl("/brand/haqslam-emblem-2023-reference.png"), founder: ref(entityIds.founder), location: ref(entityIds.mosque) },
    { "@type": "Mosque", "@id": entityIds.mosque, name: "HAQSLAM Mosque", url: absoluteUrl("/contact"),
      address: { "@type": "PostalAddress", ...(verifiedLocation ? {
        streetAddress: verifiedLocation.streetAddress, addressLocality: verifiedLocation.addressLocality,
        addressRegion: verifiedLocation.addressRegion, addressCountry: verifiedLocation.addressCountry,
      } : { addressLocality: "Ijaye-Ojokoro", addressRegion: "Lagos", addressCountry: "NG" }) },
      ...(verifiedLocation ? { hasMap: verifiedLocation.mapsUrl } : {}) },
    { "@type": "Person", "@id": entityIds.founder, name: founder.displayName,
      alternateName: founder.formalName, url: absoluteUrl("/founder"), image: absoluteUrl(founder.portrait.src) },
    { "@type": "WebSite", "@id": entityIds.website, name: site.shortName,
      alternateName: site.name, url: absoluteUrl("/"), inLanguage: "en-NG", publisher: ref(entityIds.organization) },
  ] };
}

export function pageGraph(path: string, name: string, parent?: { path: string; name: string }) {
  const crumbs = [{ path: "/", name: "Home" }, ...(parent ? [parent] : []), ...(path === "/" ? [] : [{ path, name }])];
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${absoluteUrl(path)}#page`, url: absoluteUrl(path), name,
      inLanguage: "en-NG", isPartOf: ref(entityIds.website), publisher: ref(entityIds.organization),
      ...(path === "/founder" ? { about: ref(entityIds.founder) } : {}),
      ...(path === "/contact" ? { about: ref(entityIds.mosque) } : {}),
      ...(path !== "/" ? { breadcrumb: ref(`${absoluteUrl(path)}#breadcrumb`) } : {}) },
    ...(path === "/" ? [] : [{ "@type": "BreadcrumbList", "@id": `${absoluteUrl(path)}#breadcrumb`,
      itemListElement: crumbs.map((crumb, i) => ({ "@type": "ListItem", position: i + 1, name: crumb.name, item: absoluteUrl(crumb.path) })) }]),
  ] };
}

export function eventGraph(event: AnnualEvent) {
  const url = absoluteUrl(`/events/${event.slug}`);
  return { "@context": "https://schema.org", "@graph": event.programme.map((day, i) => ({
    "@type": "Event", "@id": `${url}#programme-${i + 1}`, name: `${day.title} ${event.year}`,
    url, description: event.summary, startDate: day.startDate ?? day.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: ref(entityIds.organization),
    // Historical venue printed on the flyer; never substitute the disputed mosque address.
    location: { "@type": "Place", ...(day.venue.startsWith("HAQSLAM National Secretariat") ? { "@id": entityIds.mosque } : {}), name: day.venue },
    image: [absoluteUrl(event.poster.src), ...(event.photos?.slice(0, 1).map(photo => absoluteUrl(photo.src)) ?? [])],
  })) };
}
