import type { Metadata } from "next";
import { MaolidFeature } from "@/components/sections/MaolidFeature";
import { WeeklyProgramme } from "@/components/sections/WeeklyProgramme";
import { Eyebrow, PhotoPlaceholder, Salawat, SectionHeading } from "@/components/ui/primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { annualEvents, formatEventDate } from "@/content/events";

export const metadata: Metadata = {
  title: "Activities & Events",
  description: "The HAQSLAM weekly programme, the Annual Maolid Nabiyy celebration and past symposiums.",
};

export default function ActivitiesPage() {
  const [current, ...past] = annualEvents;
  return (
    <>
      <PageHeader
        eyebrow="Activities & events"
        title="Gatherings through the week and the year"
        intro="From daily devotions to the Annual Maolid Nabiyy, these are the occasions that bring the HAQSLAM community together."
      />

      <section aria-labelledby="weekly" className="py-20 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading id="weekly" eyebrow="Every week" title="The weekly programme" />
            <p className="mt-6 text-ink-soft">
              Members and visitors are welcome at the society’s regular gatherings of prayer, remembrance and study.
            </p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-8">
            <WeeklyProgramme />
          </Reveal>
        </div>
      </section>

      <section id="maolid" aria-labelledby="maolid-heading" className="bg-parchment py-20 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="maolid-heading"
              eyebrow="Every year"
              arabic="المولد النبوي"
              title="The Annual Maolid Nabiyy"
              intro={<>A public celebration of the Prophet <Salawat />, with lectures, hosted by our founder together with partner institutions.</>}
            />
          </Reveal>
          <Reveal className="mt-12">
            <MaolidFeature event={current} detailed />
          </Reveal>

          {past.map((event) => (
            <Reveal key={event.slug} className="mt-16">
              <Eyebrow>Past edition · {event.year}</Eyebrow>
              <h3 className="mt-3 text-3xl text-emerald-900">{event.title}</h3>
              <ol className="mt-8 grid gap-5 md:grid-cols-2">
                {event.programme.map((day) => (
                  <li key={day.day} className="rounded-2xl bg-ivory p-6 ring-1 ring-sand md:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-deep">
                      {day.day} · {formatEventDate(day.date)}
                    </p>
                    <p className="mt-2 font-display text-2xl text-emerald-900">{day.title}</p>
                    <p className="mt-1 text-sm text-muted">
                      {day.time} · {day.venue}
                    </p>
                    {day.topics && (
                      <ul className="mt-5 space-y-4 border-t border-sand pt-5">
                        {day.topics.map((t) => (
                          <li key={t.speaker}>
                            <p className="font-semibold text-emerald-900">{t.speaker}</p>
                            <ul className="mt-1 space-y-0.5 text-ink-soft">
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
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="photos-heading" className="py-20 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="photos-heading"
              eyebrow="In pictures"
              title="Photographs from our gatherings"
              intro="Photographs of lectures, Asalatu, Arabic classes and outreach will appear here once permission has been confirmed."
            />
          </Reveal>
          <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <PhotoPlaceholder title="Lectures & symposiums" className="aspect-[4/5]" />
            <PhotoPlaceholder title="Asalatu gatherings" className="aspect-[4/5]" />
            <PhotoPlaceholder title="Arabic studies" className="aspect-[4/5]" />
            <PhotoPlaceholder title="Community outreach" className="aspect-[4/5]" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
