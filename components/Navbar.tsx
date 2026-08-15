import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-teal/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold text-teal">
            Bety
          </span>
          <span className="font-arabic text-xl text-clay">بيتي</span>
        </Link>

        <nav className="hidden items-center gap-8 font-body text-sm font-medium text-ink/80 md:flex">
          <Link href="/search?listingType=sale" className="hover:text-teal">
            Buy
          </Link>
          <Link href="/search?listingType=rent" className="hover:text-teal">
            Rent
          </Link>
          <Link href="/search" className="hover:text-teal">
            All listings
          </Link>
        </nav>

        <Link
          href="/search"
          className="rounded-full bg-teal px-5 py-2 font-body text-sm font-semibold text-cream transition hover:bg-teal-light"
        >
          Search
        </Link>
      </div>
    </header>
  );
}
