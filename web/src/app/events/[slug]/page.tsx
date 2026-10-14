import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Gallery } from "@/components/gallery/Gallery";
import { GirihPattern } from "@/components/ui/GirihPattern";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow, Notice } from "@/components/ui/primitives";
import { annualEvents, formatEventDate, getEvent } from "@/content/events";

export function generateStaticParams() {
  return annualEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Event not found" };
  const cover = event.photos?.[0] ?? event.poster;
  return {
    title: event.title,
    description: event.summary,
    openGraph: { title: event.title, description: event.summary, images: [{ url: cover.src }] },
  };
}

export default function EventPage({ params }: PageProps<"/events/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-emerald-950" aria-busy="true" />}>
      <EventContent params={params} />
    </Suspense>
  );
}

async function EventContent({ params }: { params: PageProps<"/events/[slug]">["params"] }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const photos = event.photos ?? [];
  const hero = photos[0];
  const main = event.programme[event.programme.length - 1];
  const galleryImages = [
    ...photos,
    { ...event.poster, caption: "Official programme flyer" },
  ];

  return (
    <>
      {/* Photographic introduction */}
      <section className="relative isolate overflow-hidden bg-emerald-950 text-ivory">
        {hero ? (
          <>
            <Image
              src={hero.src}
              alt=""
              fill
              priority
              sizes="100vw"
              className="animate-slow-zoom -z-10 object-cover object-[50%_25%] opacity-45"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-950/30" />
          </>
        ) : (
          <GirihPattern className="-z-10 text-gold opacity-[0.07]" />
        )}
        <div className="container-page pb-14 pt-10 md:pb-20 md:pt-14">
          <Link href="/events" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-light hover:underline">
            <Icon name="chevronLeft" className="size-4" /> All events
          </Link>
          <div className="mt-16 max-w-3xl md:mt-28">
            <Eyebrow tone="dark">
              {event.status === "completed" ? "Completed event" : "Upcoming event"} · {event.year}
            </Eyebrow>
            <p lang="ar" dir="rtl" className="mt-5 text-left text-3xl text-gold-light md:text-4xl">
              المولد النبوي
            </p>
            <h1 className="mt-2 text-[2.5rem] font-normal leading-[1.05] md:text-6xl">{event.title}</h1>
            <p className="mt-5 text-lg text-ivory/80 md:text-xl">{formatEventDate(event.date)}</p>
            <p className="mt-2 max-w-2xl text-ivory/65">{main.venue}</p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Photographs</Eyebrow>
              <h2 className="mt-3 text-3xl text-emerald-900 md:text-4xl">
                {photos.length ? `${photos.length} photographs from the day` : "Official programme"}
              </h2>
              <p className="mt-2 max-w-2xl text-ink-soft">{event.summary}</p>
            </div>
            {event.photoCredit && <p className="text-sm text-muted">Photography: {event.photoCredit}</p>}
          </div>

          <div className="mt-10">
            <Gallery images={galleryImages} title={event.title} />
          </div>

          {photos.length > 0 && (
            <div className="mt-10 max-w-2xl">
              <Notice title="About these photographs">
                Captions describe each scene only. Guests are not named until identities are confirmed by the society.
                Photographs showing children are not published.
              </Notice>
            </div>
          )}
        </div>
      </section>

      <section className="bg-parchment py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Programme</Eyebrow>
            <h2 className="mt-3 text-3xl text-emerald-900">From the official flyer</h2>
            <p className="mt-3 text-sm text-muted">In conjunction with {event.partners.join(" and ")}.</p>
          </div>
          <ol className="grid gap-5 lg:col-span-8">
            {event.programme.map((day) => (
              <li key={day.day} className="rounded-2xl bg-ivory p-6 ring-1 ring-sand md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
                  {day.day} · {formatEventDate(day.date)} · {day.time}
                </p>
                <p className="mt-2 font-display text-2xl text-emerald-900">{day.title}</p>
                <p className="mt-1 text-sm text-muted">{day.venue}</p>
                {day.people && (
                  <ul className="mt-5 space-y-2 border-t border-sand pt-5 text-sm">
                    {day.people.map((p) => (
                      <li key={p.name}>
                        <span className="font-semibold text-gold-deep">{p.role}: </span>
                        <span className="text-emerald-900">{p.name}</span>
                        {p.note && <span className="text-muted"> ({p.note})</span>}
                      </li>
                    ))}
                  </ul>
                )}
                {day.topics && (
                  <ul className="mt-5 space-y-3 border-t border-sand pt-5">
                    {day.topics.map((t) => (
                      <li key={t.speaker}>
                        <p className="font-semibold text-emerald-900">{t.speaker}</p>
                        <ul className="text-ink-soft">
                          {t.titles.map((title) => (
                            <li key={title}>“{title}”</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="container-page py-12">
        <Link href="/events" className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 hover:underline">
          <Icon name="chevronLeft" className="size-4" /> Back to all events
        </Link>
      </div>
    </>
  );
}
