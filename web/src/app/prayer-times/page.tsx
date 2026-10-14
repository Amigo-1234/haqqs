import { prayerCalculationConfig, calculationMethodNames } from "@/content/prayer";
import { getCalculationParameters } from "@/lib/prayer";
import { pageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/seo/PageSeo";
import type { Metadata } from "next";
import { PrayerPanel } from "@/components/prayer/PrayerPanel";
import { WeeklyProgramme } from "@/components/sections/WeeklyProgramme";
import { Eyebrow } from "@/components/ui/primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata("/prayer-times", "Prayer Times", `Automatically calculated daily prayer times for Lagos, Nigeria, using ${calculationMethodNames[prayerCalculationConfig.method]} in Africa/Lagos. Mosque Iqamah times are confirmed separately.`);

export default function PrayerTimesPage() {
  const calculation = getCalculationParameters();
  return (
    <>
      <PageSeo path="/prayer-times" name={"Prayer Times"} />
      <PageHeader
        eyebrow="Prayer times"
        arabic="مواقيت الصلاة"
        title="Daily prayers"
        intro="Daily calculated prayer start times for Lagos, Nigeria, with a countdown to the next prayer. These are not the mosque’s official Iqamah times."
      />
      <div className="container-page relative z-10 -mt-10 md:-mt-14">
        <PrayerPanel variant="full" />
      </div>

      <section className="py-20 md:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>How times are set</Eyebrow>
            <h2 className="mt-4 text-3xl text-emerald-900 md:text-4xl">About these calculated times</h2>
            <div className="mt-6 space-y-4 text-ink-soft">
              <p>
                Prayer times change through the year. This page calculates them each day using the {calculationMethodNames[prayerCalculationConfig.method]}
                method: Fajr at {calculation.fajrAngle}° and Isha at {calculation.ishaAngle}° below the horizon, with {prayerCalculationConfig.asr} Asr. The calculation method and
                time adjustments can be changed when the mosque leadership supplies its preferences.
              </p>
              <p>
                The calculation uses a Lagos city reference point, not a verified mosque pin. Please follow announcements
                at the mosque for Iqamah and Jumu‘ah times; no congregational timetable has been published here.
              </p>
              <p className="text-sm text-muted">References: <a href="https://github.com/batoulapps/adhan-js/blob/develop/METHODS.md" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Calculation methods<span className="sr-only"> (opens in a new tab)</span></a> · <a href="https://www.geonames.org/2332453/lagos.html" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Lagos city location (GeoNames)<span className="sr-only"> (opens in a new tab)</span></a>.</p>
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
