import Image from "next/image";
import Link from "next/link";
import { MaolidShowcase } from "@/components/events/MaolidShowcase";
import { Hero } from "@/components/home/Hero";
import { BookCard } from "@/components/library/BookCard";
import { PrayerPanel } from "@/components/prayer/PrayerPanel";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { DonationCard } from "@/components/sections/DonationCard";
import { FounderFeature } from "@/components/sections/FounderFeature";
import { MaolidFeature } from "@/components/sections/MaolidFeature";
import { MarkazFeature } from "@/components/sections/MarkazFeature";
import { WeeklyProgramme } from "@/components/sections/WeeklyProgramme";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink, PhotoPlaceholder, Salawat, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { annualEvents, latestEventWithPhotos } from "@/content/events";
import { founder } from "@/content/founder";
import { books } from "@/content/library";
import { site } from "@/content/site";

const facts = [
  { label: "National Secretariat", value: "Ijaye-Ojokoro, Lagos" },
  { label: "Branch", value: "Adiyan, Ogun State" },
  { label: "Weekly gatherings", value: "Asalatu, Wasifat, Azikaru" },
  { label: "Languages", value: "Arabic · Yoruba · English" },
];

export default function HomePage() {
  const shelf = books.filter((b) => b.available);
  const [latestEvent] = annualEvents;
  const showcaseEvent = latestEventWithPhotos();

  return (
    <>
      <Hero />

      {/* Prayer times, overlapping the hero */}
      <div className="container-page relative z-10 -mt-24 lg:-mt-28">
        <Reveal>
          <PrayerPanel />
        </Reveal>
        <p className="mt-4 text-right">
          <ButtonLink href="/prayer-times" variant="text" icon="arrowRight">
            Full prayer timetable
          </ButtonLink>
        </p>
      </div>

      {showcaseEvent && (
        <div className="mt-20 md:mt-28">
          <MaolidShowcase event={showcaseEvent} />
        </div>
      )}

      {/* About */}
      <section aria-labelledby="about-heading" className="py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="about-heading"
              eyebrow="About HAQSLAM"
              title="A society gathered around one testimony"
            />
            <p lang="ar" dir="rtl" className="mt-8 text-left text-5xl leading-snug text-gold-deep md:text-6xl">
              {site.motto.arabic}
            </p>
            <p className="mt-2 font-display italic text-muted">“{site.motto.english}”</p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                <strong className="font-semibold text-emerald-900">Haqiqat-s-Salam Society of Nigeria</strong>, known as
                HAQSLAM, brings Muslims together for worship, the remembrance of Allah and the pursuit of sacred knowledge.
                Its motto, <em>Laa ilaha illallah</em>, is the testimony at the heart of every gathering.
              </p>
              <p>
                From its National Secretariat in Ijaye-Ojokoro and its branch in Adiyan, the society holds daily and weekly
                devotions and Arabic studies, hosts an Annual Maolid Nabiyy celebration with lectures, and publishes
                devotional books in Arabic, Yoruba and English.
              </p>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-sand ring-1 ring-sand">
              {facts.map((f) => (
                <div key={f.label} className="bg-ivory p-5">
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">{f.label}</dt>
                  <dd className="mt-1.5 font-display text-lg text-emerald-900">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <ButtonLink href="/about" variant="outline-dark">
                More about the society
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <FounderFeature />

      {/* Activities */}
      <section aria-labelledby="activities-heading" className="py-20 md:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="activities-heading"
              eyebrow="Our activities"
              title="Gatherings that shape the week and the year"
              intro={<>Daily devotions, weekly remembrance and Arabic studies, and an annual celebration of the Prophet <Salawat /> that brings the wider community together.</>}
            />
          </Reveal>
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-6">
              <h3 className="mb-5 text-2xl text-emerald-900">The weekly programme</h3>
              <WeeklyProgramme />
            </Reveal>
            <Reveal delay={120} className="lg:col-span-6">
              <h3 className="mb-5 text-2xl text-emerald-900">The Annual Maolid Nabiyy</h3>
              <p className="-mt-3 mb-5 text-sm text-muted">Most recently celebrated on Sunday, October 11, 2026.</p>
              <MaolidFeature event={latestEvent} />
              <p className="mt-5">
                <ButtonLink href="/activities" variant="text">
                  All activities and past events
                </ButtonLink>
              </p>
            </Reveal>
          </div>
          <Reveal className="mt-14 grid gap-4 sm:grid-cols-3">
            <div className="sm:hidden">
              <PhotoPlaceholder title="Photographs of our gatherings" className="min-h-36" />
            </div>
            {["Lectures & symposiums", "Asalatu gatherings", "Arabic studies"].map((title) => (
              <div key={title} className="hidden sm:block">
                <PhotoPlaceholder title={title} className="h-full min-h-44" />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <MarkazFeature />

      {/* Library */}
      <section aria-labelledby="library-heading" className="py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                id="library-heading"
                eyebrow="Islamic library"
                arabic="المكتبة"
                title="Devotional books, page by page"
                intro="Prayer books and collections of remembrance published by the society and its partners, digitised from the original prints and readable on any device."
              />
            </Reveal>
            <Reveal delay={100} className="shrink-0">
              <ButtonLink href="/library" variant="emerald">
                Browse the library
              </ButtonLink>
            </Reveal>
          </div>
          <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
            {shelf.map((book, i) => (
              <Reveal as="li" key={book.slug} delay={i * 90}>
                <BookCard book={book} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery preview */}
      <section aria-labelledby="gallery-heading" className="bg-parchment py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading id="gallery-heading" eyebrow="Gallery" title="Moments from our gatherings" />
            </Reveal>
            <Reveal delay={100}>
              <ButtonLink href="/gallery" variant="outline-dark">
                Open the gallery
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-4 md:auto-rows-[13rem] md:grid-cols-4">
            <Link href="/gallery#founder" className="group relative col-span-1 row-span-2 overflow-hidden rounded-2xl bg-emerald-950">
              <Image
                src={founder.portrait.src}
                alt={founder.portrait.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
            {annualEvents.map((e) => (
              <Link
                key={e.slug}
                href={`/gallery#${e.slug}`}
                className="group relative col-span-1 row-span-1 overflow-hidden rounded-2xl bg-emerald-950 md:row-span-2"
              >
                <Image
                  src={e.poster.src}
                  alt={e.poster.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950/90 to-transparent p-4 pt-10 text-sm text-ivory">
                  {e.title}
                </span>
              </Link>
            ))}
            <PhotoPlaceholder title="The mosque & secretariat" className="col-span-2 row-span-1 md:col-span-1 md:row-span-2" />
          </Reveal>
        </div>
      </section>

      {/* Donate */}
      <section aria-labelledby="donate-heading" className="py-20 md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="donate-heading"
              eyebrow="Support"
              arabic="صدقة"
              title="Support the work of HAQSLAM"
              intro="Your support sustains the society’s gatherings, classes and publications. Contributions are received by bank transfer."
            />
            <div className="mt-8">
              <ButtonLink href="/donate" variant="outline-dark">
                Ways to give
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <DonationCard />
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section aria-labelledby="contact-heading" className="bg-parchment py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              id="contact-heading"
              eyebrow="Visit & contact"
              title="You are welcome among us"
              intro="Join us for prayer and our gatherings, or get in touch with the society."
            />
            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <Icon name="pin" className="size-4 text-gold" /> Ijaye-Ojokoro, Lagos State, Nigeria
            </p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-8">
            <ContactDetails />
          </Reveal>
        </div>
      </section>
    </>
  );
}
