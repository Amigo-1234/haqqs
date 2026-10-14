import { pageMetadata } from "@/lib/seo";
import { PageSeo } from "@/components/seo/PageSeo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FounderRoles } from "@/components/sections/FounderFeature";
import { MaolidFeature } from "@/components/sections/MaolidFeature";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { GirihPattern } from "@/components/ui/GirihPattern";
import { ButtonLink, Eyebrow, Notice } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { founder } from "@/content/founder";
import { bookCover } from "@/content/library";

export const metadata: Metadata = pageMetadata("/founder", `Our Founder: ${founder.displayName}`, `${founder.displayName}: verified roles as HAQSLAM founder, author and Mudeer of Markazul Ginaa. A full biography is in preparation.`);

export default function FounderPage() {
  const cover = bookCover("kitab-al-adhkar");
  return (
    <>
      <PageSeo path="/founder" name={`Our Founder: ${founder.displayName}`} />
      <section className="relative isolate overflow-hidden bg-emerald-950 text-ivory">
        <GirihPattern className="text-gold opacity-[0.07]" />
        <div className="container-page relative grid items-end gap-12 pb-20 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-16 lg:pb-24">
          <div className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <ArchFrame className="aspect-[3/4]" outline="text-gold-light/45">
              <Image
                src={founder.portrait.src}
                alt={founder.portrait.alt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="animate-slow-zoom object-cover object-[50%_10%]"
              />
            </ArchFrame>
          </div>
          <div className="lg:col-span-7 lg:pb-8">
            <Eyebrow tone="dark">Our founder</Eyebrow>
            <p lang="ar" dir="rtl" className="mt-6 text-left text-2xl leading-relaxed text-gold-light md:text-3xl">
              {founder.arabicName}
            </p>
            <h1 className="mt-3 text-[2.6rem] font-normal leading-[1.05] md:text-6xl">{founder.displayName}</h1>
            <p className="mt-5 font-display text-2xl italic text-gold-light">{founder.title}</p>
            <p className="mt-3 max-w-xl text-ivory/65">Styled on official programmes as {founder.formalName}.</p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Roles</Eyebrow>
            <h2 className="mt-4 text-3xl text-emerald-900 md:text-4xl">Founder, teacher and host</h2>
            <div className="mt-8">
              <FounderRoles />
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <div className="rounded-[1.75rem] bg-parchment p-7 ring-1 ring-sand md:p-9">
              <Eyebrow>Biography</Eyebrow>
              <h2 className="mt-4 text-2xl text-emerald-900 md:text-3xl">A fuller biography is in preparation</h2>
              <p className="mt-4 text-ink-soft">
                The founder’s biography, including education, teachers and service to the community, is being prepared
                with the society so that every detail is accurate. It will be published here once confirmed.
              </p>
              <div className="mt-6">
                <Notice>Only roles stated on official material or by the founder are shown on this page.</Notice>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-parchment py-20 md:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Link href="/library/kitab-al-adhkar" className="group mx-auto block max-w-[15rem]">
              <Image
                src={cover.src}
                alt="Cover of Kitab al-Adhkar al-Mukhtarat"
                width={cover.width}
                height={cover.height}
                sizes="15rem"
                className="h-auto w-full rounded-[3px_8px_8px_3px] shadow-[0_24px_40px_-20px_rgba(7,29,28,.55)] transition-transform duration-500 group-hover:-translate-y-1"
              />
            </Link>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-8">
            <Eyebrow>Published work</Eyebrow>
            <p lang="ar" dir="rtl" className="mt-5 text-left text-3xl text-gold-deep">
              كتاب الأذكار المختارات
            </p>
            <h2 className="mt-2 text-3xl text-emerald-900 md:text-4xl">Kitab al-Adhkar al-Mukhtarat</h2>
            <p className="mt-4 max-w-xl text-lg text-ink-soft">
              A collection of selected remembrances for the society, compiled and arranged (al-jamʿ wa al-tartīb) by
              the founder, as printed on its cover.
            </p>
            <div className="mt-8">
              <ButtonLink href="/library/kitab-al-adhkar" variant="emerald" icon="book">
                Read the book
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-page">
          <Reveal>
            <Eyebrow>Hosting the community</Eyebrow>
            <h2 className="mb-10 mt-4 text-3xl text-emerald-900 md:text-4xl">The Annual Maolid Nabiyy</h2>
            <MaolidFeature detailed />
          </Reveal>
        </div>
      </section>
    </>
  );
}
