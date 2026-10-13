import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/source-sans-3/index.css";
import "@fontsource/amiri/400.css";
import "@fontsource/amiri/700.css";
import "./globals.css";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: {
    default: `${site.shortName} | ${site.name}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.shortName,
  openGraph: {
    type: "website",
    siteName: site.shortName,
    title: `${site.shortName} | ${site.name}`,
    description: site.description,
    locale: "en_NG",
  },
};

export const viewport: Viewport = {
  themeColor: "#071d1c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        {/* Marks JS as available so scroll reveals may start hidden; content stays visible without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
