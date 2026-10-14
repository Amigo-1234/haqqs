import Image from "next/image";
import Link from "next/link";
import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import type { AnnualEvent } from "@/content/events";

/**
 * Editorial photo showcase for a completed event: one prominent photograph and
 * a handful of supporting ones, linking to the event's full gallery.
 */
export function MaolidShowcase({ event, count = 5 }: { event: AnnualEvent; count?: number }) {
  const photos = (event.photos ?? []).slice(0, count);
  if (photos.length === 0) return null;
  const [lead, ...rest] = photos;
  const href = `/events/${event.slug}`;
  const total = event.photos?.length ?? 0;

  return (
    <section aria-labelledby="maolid-showcase-heading" className="relative overflow-hidden bg-emerald-950 py-20 text-ivory md:py-28">
      <div aria-hidden="true" className="absolute -right-40 top-0 size-[40rem] rounded-full bg-emerald-700/20 blur-3xl" />
      <div className="container-page relative">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow tone="dark">Latest celebration</Eyebrow>
            <p lang="ar" dir="rtl" className="mt-5 text-left text-3xl text-gold-light md:text-4xl">
              المولد النبوي
            </p>
            <h2 id="maolid-showcase-heading" className="mt-2 text-4xl font-medium md:text-5xl">
              Maolid Nabiyy 2026
            </h2>
            <p className="mt-3 max-w-xl text-lg text-ivory/75">Moments from our celebration — Sunday, October 11, 2026.</p>
          </div>
          <ButtonLink href={href} className="shrink-0">
            View all photos
          </ButtonLink>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
          <Reveal className="col-span-2 row-span-2">
            <ShowcaseTile href={href} photo={lead} sizes="(min-width: 1024px) 50vw, 100vw" priority className="aspect-[4/5] lg:aspect-auto lg:h-full" />
          </Reveal>
          {rest.map((photo, i) => (
            <Reveal key={photo.src} delay={80 * (i + 1)}>
              <ShowcaseTile href={href} photo={photo} sizes="(min-width: 1024px) 25vw, 50vw" className="aspect-[4/5]" />
            </Reveal>
          ))}
        </div>

        <p className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-ivory/55">
          <span>
            {total} photographs{event.photoCredit && <> · Photography: {event.photoCredit}</>}
          </span>
          <Link href={href} className="text-gold-light underline decoration-gold-light/40 underline-offset-4 hover:decoration-gold-light">
            Open the full gallery
          </Link>
        </p>
      </div>
    </section>
  );
}

function ShowcaseTile({
  href,
  photo,
  sizes,
  priority = false,
  className = "",
}: {
  href: string;
  photo: { src: string; width: number; height: number; alt: string; caption: string };
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`group relative block h-full overflow-hidden rounded-2xl bg-emerald-900 ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={75}
        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-gentle)] group-hover:scale-[1.04]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent p-4 pt-16 text-sm text-ivory opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
      >
        {photo.caption}
      </span>
    </Link>
  );
}
