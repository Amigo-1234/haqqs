import Image from "next/image";
import Link from "next/link";
import { GirihPattern } from "@/components/ui/GirihPattern";
import { Icon } from "@/components/ui/Icon";
import { annualEvents, formatEventDate, type AnnualEvent } from "@/content/events";

export function MaolidFeature({ event = annualEvents[0], detailed = false }: { event?: AnnualEvent; detailed?: boolean }) {
  const main = event.programme[event.programme.length - 1];
  return (
    <article className="relative overflow-hidden rounded-[1.75rem] bg-emerald-900 text-ivory shadow-[0_40px_90px_-50px_rgba(7,29,28,.8)]">
      <GirihPattern className="text-gold opacity-[0.08]" />
      <div className="relative grid gap-0 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Link
          href={`/gallery#${event.slug}`}
          className="group relative block aspect-square overflow-hidden bg-emerald-950 md:aspect-auto md:min-h-full"
        >
          <Image
            src={event.poster.src}
            alt={event.poster.alt}
            fill
            sizes="(min-width: 768px) 30vw, 100vw"
            className="object-contain p-3 transition-transform duration-700 group-hover:scale-[1.02] md:p-4"
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-emerald-950/80 px-3 py-1 text-xs text-ivory/85 backdrop-blur">
            Official programme
          </span>
        </Link>
        <div className="p-6 sm:p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Annual Maolid Nabiyy · {event.year}</p>
          <h3 className="mt-3 text-3xl text-ivory md:text-4xl">{event.title}</h3>
          <dl className="mt-6 space-y-3 text-[0.98rem]">
            <div className="flex gap-3">
              <dt className="sr-only">Date</dt>
              <Icon name="calendar" className="mt-1 size-4 shrink-0 text-gold-light" />
              <dd>
                {main.day} · {formatEventDate(main.date)} · {main.time}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="sr-only">Venue</dt>
              <Icon name="pin" className="mt-1 size-4 shrink-0 text-gold-light" />
              <dd>{main.venue}</dd>
            </div>
          </dl>
          {main.people && (
            <ul className="mt-6 space-y-2 border-t border-ivory/10 pt-5 text-sm">
              {(detailed ? main.people : main.people.slice(0, 3)).map((p) => (
                <li key={p.name}>
                  <span className="text-gold-light">{p.role}: </span>
                  <span className="text-ivory/85">{p.name}</span>
                  {p.note && <span className="text-ivory/55"> ({p.note})</span>}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-5 text-sm text-ivory/60">In conjunction with {event.partners.join(" and ")}.</p>
        </div>
      </div>
    </article>
  );
}
