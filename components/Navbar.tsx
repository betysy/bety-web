import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-teal transition group-hover:text-teal-light">
            Bety
          </span>
          <span className="font-arabic text-xl text-clay">بيتي</span>
        </Link>

        <nav className="hidden items-center gap-9 font-body text-sm font-medium text-ink-soft md:flex">
          <Link
            href="/search?listingType=sale"
            className="relative py-1 transition hover:text-teal after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-clay after:transition-all after:duration-300 hover:after:w-full"
          >
            Buy
          </Link>
          <Link
            href="/search?listingType=rent"
            className="relative py-1 transition hover:text-teal after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-clay after:transition-all after:duration-300 hover:after:w-full"
          >
            Rent
          </Link>
          <Link
            href="/search"
            className="relative py-1 transition hover:text-teal after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-clay after:transition-all after:duration-300 hover:after:w-full"
          >
            All listings
          </Link>
        </nav>

        <Link
          href="/search"
          className="rounded-full bg-teal px-5 py-2.5 font-body text-sm font-semibold text-cream shadow-sm transition duration-300 ease-smooth hover:bg-teal-light hover:shadow-md"
        >
          Search
        </Link>
      </div>
    </header>
  );
}
