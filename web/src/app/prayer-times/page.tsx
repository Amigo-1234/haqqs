import type { Metadata } from "next";
import { PrayerPanel } from "@/components/prayer/PrayerPanel";
import { WeeklyProgramme } from "@/components/sections/WeeklyProgramme";
import { Eyebrow } from "@/components/ui/primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Prayer Times",
  description: "Daily prayer times and the next prayer at HAQSLAM, Ijaye-Ojokoro, Lagos.",
};

export default function PrayerTimesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Prayer times"
        arabic="مواقيت الصلاة"
        title="Daily prayers"
        intro="Today’s prayer times in Ijaye-Ojokoro, Lagos, with a countdown to the next prayer."
      />
      <div className="container-page relative z-10 -mt-10 md:-mt-14">
        <PrayerPanel variant="full" />
      </div>

      <section className="py-20 md:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>How times are set</Eyebrow>
            <h2 className="mt-4 text-3xl text-emerald-900 md:text-4xl">An official timetable is coming</h2>
            <div className="mt-6 space-y-4 text-ink-soft">
              <p>
                Prayer times change through the year. The official timetable will use the calculation method and
                congregation (iqamah) times approved by the mosque leadership.
              </p>
              <p>
                Until then, the times above are a demonstration of how the timetable will look. Please follow the
                announcements at the mosque for congregational times.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <Eyebrow>Gatherings</Eyebrow>
            <h2 className="mb-6 mt-4 text-3xl text-emerald-900 md:text-4xl">Weekly programme</h2>
            <WeeklyProgramme />
          </Reveal>
        </div>
      </section>
    </>
  );
}
