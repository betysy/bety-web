import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-center gap-1.5">
          <span className="font-body text-2xl font-extrabold text-primary">
            بيتي
          </span>
        </Link>

        <nav className="hidden items-center gap-7 font-body text-sm font-bold text-ink/80 md:flex">
          <Link href="/search?listingType=sale" className="hover:text-primary">
            للبيع
          </Link>
          <Link href="/search?listingType=rent" className="hover:text-primary">
            للإيجار
          </Link>
          <Link href="/search" className="hover:text-primary">
            كل العقارات
          </Link>
        </nav>

        <Link
          href="/search"
          className="rounded-full bg-primary px-5 py-2 font-body text-sm font-bold text-white transition hover:bg-primary-dark"
        >
          بحث
        </Link>
      </div>
    </header>
  );
}
