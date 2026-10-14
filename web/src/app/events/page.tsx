import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { annualEvents, formatEventDate } from "@/content/events";

export const metadata: Metadata = {
  title: "Events",
  description: "HAQSLAM events and their photo collections, including the Annual Maolid Nabiyy celebration.",
};

export default function EventsPage() {
  const events = [...annualEvents].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHeader
        eyebrow="Events"
        arabic="المناسبات"
        title="Our gatherings and celebrations"
        intro="Programmes and photographs from the society’s annual events."
      />
      <section className="py-16 md:py-24">
        <div className="container-page">
          <ul className="grid gap-8 md:grid-cols-2">
            {events.map((event, i) => {
              const cover = event.photos?.[0] ?? event.poster;
              return (
                <Reveal as="li" key={event.slug} delay={i * 100}>
                  <Link
                    href={`/events/${event.slug}`}
                    className="group block overflow-hidden rounded-[1.75rem] bg-ivory ring-1 ring-sand transition-shadow hover:shadow-[0_30px_60px_-35px_rgba(7,29,28,.6)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-emerald-950">
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        sizes="(min-width: 768px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      {event.status === "completed" && (
                        <span className="absolute left-4 top-4 rounded-full bg-emerald-950/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold-light backdrop-blur">
                          {i === 0 ? "Latest · completed" : "Completed"}
                        </span>
                      )}
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">{formatEventDate(event.date)}</p>
                      <h2 className="mt-2 text-2xl text-emerald-900 md:text-3xl">{event.title}</h2>
                      <p className="mt-3 text-ink-soft">{event.summary}</p>
                      <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                        {event.photos?.length ? `View ${event.photos.length} photographs` : "View programme"}
                        <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
