import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BookReader } from "@/components/library/BookReader";
import { ButtonLink, Eyebrow, Notice } from "@/components/ui/primitives";
import { books, getBook } from "@/content/library";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/library/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: "Book not found" };
  return {
    title: book.title,
    description: `${book.title}${book.subtitle ? `: ${book.subtitle}` : ""}. ${book.publisher}.`,
  };
}

export default function BookPage({ params }: PageProps<"/library/[slug]">) {
  return (
    <Suspense fallback={<ReaderSkeleton />}>
      <Book params={params} />
    </Suspense>
  );
}

async function Book({ params }: { params: PageProps<"/library/[slug]">["params"] }) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  return (
    <>
      <section className="border-b border-sand bg-ivory">
        <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between md:py-14">
          <div>
            <Eyebrow>{book.category}</Eyebrow>
            {book.arabicTitle && (
              <p lang="ar" dir="rtl" className="mt-5 text-left text-3xl text-gold-deep md:text-4xl">
                {book.arabicTitle}
              </p>
            )}
            <h1 className="mt-2 text-4xl text-emerald-900 md:text-5xl">{book.title}</h1>
            <p className="mt-2 text-lg text-ink-soft">{book.subtitle}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm md:text-right">
            <dt className="text-muted">Publisher</dt>
            <dd className="text-emerald-900">{book.publisher}</dd>
            {book.edition && (
              <>
                <dt className="text-muted">Edition</dt>
                <dd className="text-emerald-900">{book.edition}</dd>
              </>
            )}
            {book.languages.length > 0 && (
              <>
                <dt className="text-muted">Languages</dt>
                <dd className="text-emerald-900">{book.languages.join(", ")}</dd>
              </>
            )}
            {book.pages.length > 0 && (
              <>
                <dt className="text-muted">Pages</dt>
                <dd className="tabular-nums text-emerald-900">{book.pages.length}</dd>
              </>
            )}
          </dl>
        </div>
        {book.credit && <p className="container-page -mt-4 pb-8 text-sm text-muted md:-mt-8">{book.credit}</p>}
      </section>

      {book.available && book.pages.length > 0 ? (
        <BookReader title={book.title} pages={book.pages} />
      ) : (
        <section className="bg-parchment py-16 md:py-24">
          <div className="container-page grid items-center gap-10 md:grid-cols-[16rem_1fr]">
            <Image
              src={book.cover.src}
              alt={`Cover of ${book.title}`}
              width={book.cover.width}
              height={book.cover.height}
              sizes="16rem"
              className="mx-auto h-auto w-56 rounded-[3px_8px_8px_3px] shadow-[0_24px_40px_-20px_rgba(7,29,28,.55)]"
            />
            <div>
              <h2 className="text-3xl text-emerald-900">This book is coming soon</h2>
              <p className="mt-3 max-w-lg text-ink-soft">
                The cover has been preserved, and the pages will be added once the full book has been scanned.
              </p>
              <div className="mt-6 max-w-lg">
                <Notice>Only the cover of this book was available in the previous website’s files.</Notice>
              </div>
              <div className="mt-8">
                <ButtonLink href="/library" variant="emerald">
                  Back to the library
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function ReaderSkeleton() {
  return (
    <div className="container-page py-14" aria-busy="true">
      <div className="h-6 w-40 animate-pulse rounded bg-sand/70" />
      <div className="mt-4 h-12 w-80 max-w-full animate-pulse rounded bg-sand/70" />
      <div className="mx-auto mt-12 aspect-[3/4] w-full max-w-md animate-pulse rounded-md bg-parchment" />
      <span className="sr-only">Loading book…</span>
    </div>
  );
}
