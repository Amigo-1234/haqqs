import Image from "next/image";
import Link from "next/link";
import { bookCover, pageCount, type Book } from "@/content/library";

export function BookCard({ book, priority = false }: { book: Book; priority?: boolean }) {
  const cover = bookCover(book.slug);
  const pages = pageCount(book.slug);
  // Fit every cover inside the same 5:7 frame, standing on a shared baseline.
  const widthPct = Math.min(100, (cover.width / cover.height / (5 / 7)) * 100);
  return (
    <Link href={`/library/${book.slug}`} className="group block focus-visible:outline-offset-8">
      <div className="relative mx-auto flex aspect-[5/7] w-full max-w-[15rem] items-end justify-center [perspective:1200px]">
        <div style={{ width: `${widthPct}%` }} className="relative transition-transform duration-500 ease-[var(--ease-gentle)] group-hover:-translate-y-2 group-hover:[transform:rotateY(-8deg)]">
          <Image
            src={cover.src}
            alt=""
            width={cover.width}
            height={cover.height}
            priority={priority}
            sizes="(min-width: 1024px) 15rem, (min-width: 640px) 40vw, 70vw"
            className="h-auto w-full rounded-[3px_8px_8px_3px] shadow-[0_24px_40px_-20px_rgba(7,29,28,.55),0_2px_6px_rgba(7,29,28,.2)]"
          />
          {/* spine shading */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-4 rounded-l-[3px] bg-[linear-gradient(90deg,rgba(0,0,0,.28),rgba(255,255,255,.18)_45%,transparent)]"
          />
          {!book.available && (
            <span className="absolute inset-x-3 bottom-3 rounded-full bg-emerald-950/85 py-1.5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-gold-light backdrop-blur">
              Coming soon
            </span>
          )}
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-[15rem]">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">{book.category}</p>
        {book.arabicTitle && (
          <p lang="ar" dir="rtl" className="mt-2 text-left text-xl text-emerald-800">
            {book.arabicTitle}
          </p>
        )}
        <h3 className="mt-1 text-xl text-emerald-900 transition-colors group-hover:text-emerald-700">{book.title}</h3>
        <p className="text-sm text-muted">
          {book.subtitle}
          {book.available && pages > 0 && <> · {pages} pages</>}
        </p>
      </div>
    </Link>
  );
}
