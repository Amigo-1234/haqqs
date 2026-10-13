import type { Metadata } from "next";
import { BookCard } from "@/components/library/BookCard";
import { GirihPattern } from "@/components/ui/GirihPattern";
import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { books, externalResources, type BookCategory } from "@/content/library";

export const metadata: Metadata = {
  title: "Islamic Library",
  description: "Prayer books and collections of remembrance published by HAQSLAM and its partners, readable page by page.",
};

const categories: { name: BookCategory; blurb: string }[] = [
  { name: "Prayer & Devotion", blurb: "Prayer books used in the society’s gatherings." },
  { name: "Adhkar & Supplications", blurb: "Collections of remembrance and monthly supplications." },
  { name: "Sacred Occasions", blurb: "Books for special nights and seasons." },
];

export default function LibraryPage() {
  const [quran] = externalResources;
  return (
    <>
      <PageHeader
        eyebrow="Islamic library"
        arabic="المكتبة"
        title="Devotional books, page by page"
        intro="These books are reproduced from the original printed editions. Open any book to read it page by page on your phone, tablet or computer."
      />

      {categories.map((cat, ci) => {
        const items = books.filter((b) => b.category === cat.name);
        return (
          <section key={cat.name} aria-labelledby={`cat-${ci}`} className={ci % 2 ? "bg-parchment py-16 md:py-20" : "py-16 md:py-20"}>
            <div className="container-page">
              <Reveal className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <Eyebrow>{String(ci + 1).padStart(2, "0")}</Eyebrow>
                  <h2 id={`cat-${ci}`} className="mt-3 text-3xl text-emerald-900 md:text-4xl">
                    {cat.name}
                  </h2>
                </div>
                <p className="max-w-sm text-ink-soft md:text-right">{cat.blurb}</p>
              </Reveal>
              <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
                {items.map((book, i) => (
                  <Reveal as="li" key={book.slug} delay={i * 90}>
                    <BookCard book={book} priority={ci === 0 && i < 2} />
                    {book.credit && <p className="mx-auto mt-2 max-w-[15rem] text-xs text-muted">{book.credit}</p>}
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section id="quran" aria-labelledby="quran-heading" className="pb-24 pt-4">
        <div className="container-page">
          <Reveal className="relative overflow-hidden rounded-[1.75rem] bg-emerald-900 p-8 text-ivory md:p-12">
            <GirihPattern className="text-gold opacity-[0.08]" />
            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p lang="ar" dir="rtl" className="text-left text-4xl text-gold-light md:text-5xl">
                  {quran.arabicTitle}
                </p>
                <h2 id="quran-heading" className="mt-2 text-3xl md:text-4xl">
                  {quran.title}
                </h2>
                <p className="mt-3 max-w-xl text-ivory/75">{quran.description}</p>
              </div>
              <ButtonLink href={quran.href} external>
                Open Quran.com
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
