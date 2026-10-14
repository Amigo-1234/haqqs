import type { NextConfig } from "next";

/**
 * Old static-site URLs, mapped to their V2 equivalents so bookmarks and shared
 * links keep working. V2 is live: consolidate old public URLs with 308 redirects.
 */
const legacyRedirects: [string, string][] = [
  ["/index.html", "/"],
  ["/about.html", "/about"],
  ["/service.html", "/activities"],
  ["/prayer.html", "/prayer-times"],
  ["/prayer-countdown.html", "/prayer-times"],
  ["/donate.html", "/donate"],
  ["/contact.html", "/contact"],
  ["/interactive-book.html", "/library"],
  ["/azalatu.html", "/library/haqslam-prayer-book"],
  ["/night.html", "/library/kitab-al-adhkar"],
  ["/2nd.html", "/library/adiya-shahriyya"],
  ["/mua.html", "/library/muassasat-prayer-book"],
  ["/last.html", "/library/laylat-al-qadr"],
  ["/Quran.html", "/library"],
  // Public accounts are retired in V2. Firebase users are not touched.
  ["/signin.html", "/"],
  ["/signup.html", "/"],
  ["/profile.html", "/"],
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  poweredByHeader: false,
  // Catalogue lookups are local: resolve metadata before streaming so missing
  // entries return 404 and every crawler receives metadata in the HTML head.
  htmlLimitedBots: /.*/,
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
      {
        // The legacy site registered a cache-first service worker at this path.
        // V2 serves a self-destroying replacement; it must never be cached.
        source: "/service-worker.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
        ],
      },
    ];
  },
};

export default nextConfig;
