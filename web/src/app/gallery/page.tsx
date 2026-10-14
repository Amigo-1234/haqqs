import { pageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/seo/PageSeo";
import type { Metadata } from "next";
import { Gallery } from "@/components/gallery/Gallery";
import { ButtonLink, Eyebrow, PhotoPlaceholder } from "@/components/ui/primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { collections } from "@/content/gallery";

export const metadata: Metadata = pageMetadata("/gallery", "Gallery", "Photographs and official programmes from HAQSLAM gatherings and events.");

export default function GalleryPage() {
  const filled = collections.filter((c) => c.images.length > 0);
  const awaiting = collections.filter((c) => c.images.length === 0);

  return (
    <>
      <PageSeo path="/gallery" name={"Gallery"} />
      <PageHeader
        eyebrow="Gallery"
        title="Moments from our gatherings"
        intro="Photographs and official programmes from the society’s events. Select any image to view it full screen."
      >
        <nav aria-label="Collections">
          <ul className="flex flex-wrap gap-2">
            {filled.map((c) => (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  className="inline-flex min-h-10 items-center rounded-full px-4 text-sm text-ivory/85 ring-1 ring-ivory/20 transition-colors hover:bg-ivory/10"
                >
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {filled.map((c, i) => (
        <section
          key={c.slug}
          id={c.slug}
          aria-labelledby={`${c.slug}-title`}
          className={i % 2 ? "bg-parchment py-16 md:py-20" : "py-16 md:py-20"}
        >
          <div className="container-page grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              {c.date && <Eyebrow>{c.date}</Eyebrow>}
              <h2 id={`${c.slug}-title`} className="mt-3 text-3xl text-emerald-900 md:text-4xl">
                {c.title}
              </h2>
              <p className="mt-3 text-ink-soft">{c.description}</p>
              <p className="mt-2 text-sm text-muted">
                {c.href ? `${c.total} images` : `${c.images.length} ${c.images.length === 1 ? "image" : "images"}`}
              </p>
              {c.href && (
                <div className="mt-6">
                  <ButtonLink href={c.href} variant="emerald">
                    View all photos
                  </ButtonLink>
                </div>
              )}
            </Reveal>
            <Reveal delay={100} className="lg:col-span-8">
              <Gallery images={c.images} title={c.title} />
            </Reveal>
          </div>
        </section>
      ))}

      <section aria-labelledby="awaiting-title" className="bg-emerald-950/[0.03] py-16 md:py-20">
        <div className="container-page">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Coming soon</Eyebrow>
              <h2 id="awaiting-title" className="mt-3 text-3xl text-emerald-900 md:text-4xl">
                More collections on the way
              </h2>
              <p className="mt-3 max-w-xl text-ink-soft">
                Authentic photographs are being gathered from the society and will be published with permission.
              </p>
            </div>
            <ButtonLink href="/contact" variant="outline-dark">
              Share your photographs
            </ButtonLink>
          </Reveal>
          <Reveal className="mt-10 grid gap-4 sm:grid-cols-3">
            {awaiting.map((c) => (
              <PhotoPlaceholder key={c.slug} title={c.title} note={c.description} className="aspect-[4/3]" />
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
