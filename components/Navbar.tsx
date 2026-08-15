import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="group">
          <span className="font-display text-2xl font-bold tracking-tight text-teal transition group-hover:text-teal-light">
            بيتي
          </span>
        </Link>

        <nav className="hidden items-center gap-9 font-body text-sm font-medium text-ink-soft md:flex">
          <Link
            href="/search?listingType=sale"
            className="relative py-1 transition hover:text-teal after:absolute after:-bottom-1 after:right-0 after:h-px after:w-0 after:bg-clay after:transition-all after:duration-300 hover:after:w-full"
          >
            للبيع
          </Link>
          <Link
            href="/search?listingType=rent"
            className="relative py-1 transition hover:text-teal after:absolute after:-bottom-1 after:right-0 after:h-px after:w-0 after:bg-clay after:transition-all after:duration-300 hover:after:w-full"
          >
            للإيجار
          </Link>
          <Link
            href="/search"
            className="relative py-1 transition hover:text-teal after:absolute after:-bottom-1 after:right-0 after:h-px after:w-0 after:bg-clay after:transition-all after:duration-300 hover:after:w-full"
          >
            كل العقارات
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/list-property"
            className="hidden rounded-full border border-clay px-5 py-2.5 font-body text-sm font-semibold text-clay transition duration-300 ease-smooth hover:bg-clay hover:text-cream md:block"
          >
            أضف عقارك
          </Link>
          <Link
            href="/search"
            className="rounded-full bg-teal px-5 py-2.5 font-body text-sm font-semibold text-cream shadow-sm transition duration-300 ease-smooth hover:bg-teal-light hover:shadow-md"
          >
            بحث
          </Link>
        </div>
      </div>
    </header>
  );
}
