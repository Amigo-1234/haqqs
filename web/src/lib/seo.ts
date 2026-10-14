import type { Metadata } from "next";
import { site } from "@/content/site";
import { fullNav } from "@/content/navigation";

// Explicit production origin: never derive canonicals from request/preview hosts.
export const SITE_URL = "https://haqqs.vercel.app";
export const absoluteUrl = (path: string) => path === "/" ? SITE_URL : new URL(path, `${SITE_URL}/`).href;
export const publicPages = [{ href: "/", label: "Home" }, ...fullNav];
export const SOCIAL_IMAGE = {
  url: absoluteUrl("/social/haqslam.png"), width: 1200, height: 630,
  alt: "HAQSLAM — Haqiqat-s-Salam Society of Nigeria, Ijaye-Ojokoro, Lagos",
};

type ShareImage = { src: string; width: number; height: number; alt: string };
export function pageMetadata(path: string, title: string, description: string, image?: ShareImage, index = true): Metadata {
  const share = image ? { url: absoluteUrl(image.src), width: image.width, height: image.height, alt: image.alt } : SOCIAL_IMAGE;
  const shareTitle = path === "/" ? title : `${title} | ${site.shortName}`;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index, follow: true },
    openGraph: { type: "website", siteName: site.shortName, locale: "en_NG", url: absoluteUrl(path), title: shareTitle, description, images: [share] },
    twitter: { card: "summary_large_image", title: shareTitle, description, images: [{ url: share.url, alt: share.alt }] },
  };
}
