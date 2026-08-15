import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { getFeaturedListings } from "@/lib/listings";

export const revalidate = 60;

export default async function HomePage() {
  const featured = await getFeaturedListings(6);

  return (
    <>
      <section className="relative overflow-hidden bg-teal">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 h-full w-[520px] opacity-90 arch-frame-wide"
          style={{
            background:
              "linear-gradient(160deg, #E8DCC8 0%, #B5502A 60%, #8F3C1E 100%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="font-arabic text-lg text-sand">بيتك يبدأ من هون</p>
          <h1 className="mt-3 max-w-xl font-display text-5xl font-medium leading-[1.05] text-cream md:text-6xl">
            Find your next home, across Syria.
          </h1>
          <p className="mt-5 max-w-md font-body text-cream/70">
            Bety brings buyers, renters, and sellers together in one place —
            apartments, villas, and land, listed by people who live there.
          </p>

          <div className="mt-10 max-w-3xl">
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-arabic text-clay">أحدث العقارات</p>
            <h2 className="font-display text-3xl text-ink">
              Newest listings
            </h2>
          </div>
          <a
            href="/search"
            className="hidden font-body text-sm font-semibold text-teal hover:underline md:block"
          >
            View all →
          </a>
        </div>

        {featured.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-teal/20 bg-sand-light p-12 text-center">
            <p className="font-display text-xl text-teal">
              No listings yet
            </p>
            <p className="mt-2 text-sm text-ink/60">
              Once properties are added in PocketBase, they'll appear here
              automatically.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
