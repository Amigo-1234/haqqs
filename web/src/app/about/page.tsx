import { pageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/seo/PageSeo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EMBLEM_SRC } from "@/components/brand/Emblem";
import { ButtonLink, Eyebrow, Notice, Salawat, SectionHeading } from "@/components/ui/primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { founder } from "@/content/founder";
import { contact, partners, site } from "@/content/site";

export const metadata: Metadata = pageMetadata("/about", "About HAQSLAM", "Who we are: Haqiqat-s-Salam Society of Nigeria, its motto, locations, work and partner institutions.");

const work = [
  {
    title: "Worship & remembrance",
    body: "Daily Wasifat, Sunday Asalatu, Thursday Azikaru, Friday Wasifat-Kubural and monthly special prayers bring members together in devotion.",
    href: "/activities",
  },
  {
    title: "Learning",
    body: "Arabic studies are held through the week, and the society works alongside Markazul Ginaa, the educational institution led by our founder.",
    href: "/markaz",
  },
  {
    title: "Publishing",
    body: "The society publishes prayer books and collections of remembrance in Arabic, with transliteration, Yoruba and English in its prayer book.",
    href: "/library",
  },
  {
    title: "Annual Maolid Nabiyy",
    body: <>Each year the society celebrates the Prophet <Salawat /> with lectures and a public gathering, hosted by our founder.</>,
    href: "/activities#maolid",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageSeo path="/about" name={"About HAQSLAM"} />
      <PageHeader
        eyebrow="About HAQSLAM"
        arabic={site.arabicName}
        title="Haqiqat-s-Salam Society of Nigeria"
        intro="A society of worship, remembrance and learning in Ijaye-Ojokoro, Lagos, gathered under the testimony Laa ilaha illallah."
      />

      <section className="py-20 md:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionHeading eyebrow="Our identity" title="One testimony at the heart of the society" />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                <strong className="font-semibold text-emerald-900">HAQSLAM</strong> is the short name of Haqiqat-s-Salam
                Society of Nigeria. Its motto, printed on its programmes and publications, is the testimony of faith:{" "}
                <em>Laa ilaha illallah</em>.
              </p>
              <p>
                The society was founded by {founder.displayName}, {founder.title}, who hosts its Annual Maolid
                Nabiyy celebration.{" "}
                <Link href="/founder" className="text-emerald-800 underline decoration-gold/60 underline-offset-4">
                  Meet our founder
                </Link>
                .
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <figure className="rounded-[1.75rem] bg-parchment p-8 text-center ring-1 ring-sand">
              <Image
                src={EMBLEM_SRC}
                alt="The HAQSLAM emblem: a golden dome beneath a crescent and star, within an arch, above the HAQSLAM wordmark"
                width={454}
                height={543}
                sizes="12rem"
                className="mx-auto h-auto w-44"
              />
              <figcaption className="mt-6">
                <p lang="ar" dir="rtl" className="text-4xl text-emerald-900">
                  {site.motto.arabic}
                </p>
                <p className="mt-1 font-display italic text-gold-deep">{site.motto.transliteration}</p>
                <p className="mt-1 text-sm text-muted">{site.motto.english}</p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="bg-parchment py-20 md:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Our work" title="What the society does" />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {work.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <Link
                  href={w.href}
                  className="group flex h-full flex-col rounded-2xl bg-ivory p-7 ring-1 ring-sand transition-shadow hover:shadow-[0_24px_50px_-30px_rgba(7,29,28,.5)]"
                >
                  <span aria-hidden="true" className="size-2.5 rotate-45 bg-gold" />
                  <h3 className="mt-5 text-2xl text-emerald-900">{w.title}</h3>
                  <p className="mt-3 flex-1 text-ink-soft">{w.body}</p>
                  <span className="mt-5 text-sm font-semibold text-emerald-700 group-hover:underline">Learn more</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Where we are</Eyebrow>
            <h2 className="mt-4 text-3xl text-emerald-900 md:text-4xl">Locations</h2>
            <dl className="mt-8 space-y-6">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-deep">{contact.secretariat.label}</dt>
                <dd className="mt-1 text-lg text-emerald-900">{contact.secretariat.lines.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-[0.16em] text-gold-deep">{contact.branch.label}</dt>
                <dd className="mt-1 text-lg text-emerald-900">{contact.branch.lines.join(", ")}</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Working together</Eyebrow>
            <h2 className="mt-4 text-3xl text-emerald-900 md:text-4xl">Partner institutions</h2>
            <ul className="mt-8 space-y-6">
              <li>
                <p className="font-display text-xl text-emerald-900">{partners.markaz.fullName}</p>
                <p className="text-ink-soft">Educational institution led by our founder as Mudeer.</p>
              </li>
              <li>
                <p className="font-display text-xl text-emerald-900">
                  {partners.muassasat.name} ({partners.muassasat.division})
                </p>
                <p className="text-ink-soft">Co-host of the Annual Maolid Nabiyy celebration.</p>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page">
          <Reveal className="rounded-[1.75rem] bg-emerald-900 p-8 text-ivory md:p-12">
            <Eyebrow tone="dark">Our history</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-4xl">The society’s story is being documented</h2>
            <p className="mt-4 max-w-2xl text-ivory/75">
              We are gathering the history of HAQSLAM, including its founding and milestones, from the founder and senior
              members, so it can be told accurately. It will be published here once confirmed.
            </p>
            <div className="mt-6 max-w-2xl">
              <Notice tone="dark">Founding year and historical milestones have not yet been verified.</Notice>
            </div>
            <div className="mt-8">
              <ButtonLink href="/contact">Share history or photographs</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
